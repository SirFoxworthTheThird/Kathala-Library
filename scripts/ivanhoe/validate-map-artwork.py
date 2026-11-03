"""Verify pinned map inputs, lossless images and embedded fixture references.

This integrity check cannot approve source interpretation or application QA.
--release additionally refuses schematic substitutes and unfinished approvals.
"""
import base64
import hashlib
import json
import re
import sys
from pathlib import Path
from PIL import Image, ImageChops

BOOK = Path(__file__).resolve().parent
ROOT = BOOK.parents[1]
manifest = json.loads((BOOK / 'map-manifest.json').read_text(encoding='utf-8'))
world = json.loads((BOOK / 'authoring-review.pwk').read_text(encoding='utf-8'))
blobs = {blob['id']: blob for blob in world['blobs']}
layers = {layer['id']: layer for layer in world['mapLayers']}
seen_ids, seen_hashes, checks = set(), set(), []

def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

for row in manifest['maps']:
    key = row['id']
    assert key not in seen_ids, f'Duplicate map ID: {key}'
    seen_ids.add(key)
    original = (ROOT / row['original']).resolve()
    vector = (ROOT / row['vectorSource']).resolve()
    compressed = (ROOT / row['compressed']['path']).resolve()
    assert original.is_relative_to(BOOK / 'map-originals')
    assert vector.is_relative_to(BOOK / 'map-originals')
    assert compressed.is_relative_to(BOOK / 'map-reviewed')
    assert digest(original) == row['originalSha256'], key
    assert digest(vector) == row['vectorSha256'], key
    encoded_hash = digest(compressed)
    assert encoded_hash == row['compressed']['sha256'], key
    assert encoded_hash not in seen_hashes, f'Repeated map image: {key}'
    seen_hashes.add(encoded_hash)
    with Image.open(original) as image:
        source = image.convert('RGB')
    with Image.open(compressed) as image:
        assert image.format == 'WEBP', key
        decoded = image.convert('RGB')
    dimensions = (row['compressed']['width'], row['compressed']['height'])
    assert source.size == decoded.size == dimensions, key
    assert ImageChops.difference(source, decoded).getbbox() is None, key
    assert row['compressed']['lossless'] is True, key
    assert original.stat().st_size == row['compressed']['originalBytes'], key
    assert compressed.stat().st_size == row['compressed']['compressedBytes'], key
    image_id = 'ivanhoe-image-' + re.sub('[^a-zA-Z0-9-]', '-', row['compressed']['path'])
    assert (ROOT / blobs[image_id]['url']).read_bytes() == compressed.read_bytes(), key
    layer = layers['ivanhoe-map-' + key]
    assert layer['imageId'] == image_id, key
    assert (layer['imageWidth'], layer['imageHeight']) == dimensions, key
    assert row.get('originalReview') and row.get('compressedReview'), key
    illustrated = row.get('illustration', {}).get('selected') is True
    if illustrated:
        assert original != (ROOT / row['schematicReference']['original']).resolve(), key
        assert digest(ROOT / row['schematicReference']['original']) == row['schematicReference']['originalSha256'], key
        assert digest(vector) == row['schematicReference']['vectorSha256'], key
        assert (ROOT / row['illustration']['promptFile']).is_file(), key
        assert tuple(row['illustration']['dimensions']) == dimensions, key
    checks.append({'map': key, 'illustrated': illustrated, 'sha256': encoded_hash,
                   'dimensions': dimensions, 'exactDecodedRgb': True,
                   'finalApplicationApproved': row.get('appReviewed', False)})

pending = [row['map'] for row in checks if not row['illustrated']]
report = {'scope': 'Map file integrity only; not source or application approval',
          'maps': len(checks), 'illustrated': len(checks) - len(pending),
          'awaitingIllustrations': pending, 'checks': checks}
(BOOK / 'qa/map-artwork-integrity.json').write_text(
    json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8', newline='\n')
print(json.dumps({key: value for key, value in report.items() if key != 'checks'}, indent=2))
if '--release' in sys.argv:
    assert not pending, 'Release blocked: schematic map substitutes remain'
    assert all(row.get('coordinatesReviewed') and row.get('gatewaysReviewed')
               and row.get('appReviewed') for row in manifest['maps']), 'Release blocked: final map approvals incomplete'
