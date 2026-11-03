"""Lossless WebP for linework: retain every decoded RGB pixel and dimension."""
import hashlib
import json
from pathlib import Path
from PIL import Image, ImageChops, __version__

book = Path(__file__).resolve().parent
root = book.parents[1]
path = book / 'map-manifest.json'
manifest = json.loads(path.read_text(encoding='utf-8'))
destination = book / 'map-reviewed'
destination.mkdir(exist_ok=True)
for row in manifest['maps']:
    original = (root / row['original']).resolve()
    vector = (root / row['vectorSource']).resolve()
    if not original.is_relative_to(book / 'map-originals') or not vector.is_relative_to(book / 'map-originals'):
        raise ValueError('Map originals must remain inside this book')
    if not row['id'].replace('-', '').isalnum():
        raise ValueError('Unsafe map id')
    output = destination / (row['id'] + '.webp')
    with Image.open(original) as opened:
        image = opened.convert('RGB')
    image.save(output, 'WEBP', lossless=True, method=6, exact=True)
    with Image.open(output) as opened:
        decoded = opened.convert('RGB')
    assert image.size == decoded.size
    assert ImageChops.difference(image, decoded).getbbox() is None
    row['originalSha256'] = hashlib.sha256(original.read_bytes()).hexdigest()
    row['vectorSha256'] = hashlib.sha256(vector.read_bytes()).hexdigest()
    row['compressed'] = {
        'path': output.relative_to(root).as_posix(),
        'sha256': hashlib.sha256(output.read_bytes()).hexdigest(),
        'width': image.width, 'height': image.height, 'lossless': True,
        'method': 6, 'pillow': __version__,
        'originalBytes': original.stat().st_size, 'compressedBytes': output.stat().st_size,
        'exactRgbComparison': 'passed',
    }
    print(row['id'], json.dumps(row['compressed']))
path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8', newline='\n')
