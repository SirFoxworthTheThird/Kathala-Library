"""Integrity and decoded-compression checks; visual approval remains separate."""
import hashlib
import json
import math
import sys
from pathlib import Path
from PIL import Image, ImageChops, ImageStat

BOOK=Path(__file__).resolve().parent
ROOT=BOOK.parents[1]
manifest=json.loads((BOOK/'asset-manifest.json').read_text(encoding='utf-8'))
world=json.loads((BOOK/'authoring-review.pwk').read_text(encoding='utf-8'))
blobs={b['id']:b for b in world['blobs']}
seen_ids=set();seen_hashes=set();checks=[]
for asset in manifest['assets']:
    assert asset['id'] not in seen_ids, f"Duplicate asset ID {asset['id']}"
    seen_ids.add(asset['id'])
    original=(ROOT/asset['original']).resolve()
    compressed=(ROOT/asset['compressed']['path']).resolve()
    assert original.is_relative_to(BOOK/'art-originals')
    assert compressed.is_relative_to(BOOK/'art-reviewed')
    assert hashlib.sha256(original.read_bytes()).hexdigest()==asset['originalSha256']
    digest=hashlib.sha256(compressed.read_bytes()).hexdigest()
    assert digest==asset['compressed']['sha256']
    assert digest not in seen_hashes, f"Repeated selected illustration {asset['id']}"
    seen_hashes.add(digest)
    with Image.open(original) as image: source=image.convert('RGB')
    with Image.open(compressed) as image:
        assert image.format=='WEBP'
        decoded=image.convert('RGB')
    assert source.size==decoded.size==(asset['compressed']['width'],asset['compressed']['height'])
    rms=ImageStat.Stat(ImageChops.difference(source,decoded)).rms
    mse=sum(v*v for v in rms)/len(rms)
    psnr=99.0 if not mse else 20*math.log10(255/math.sqrt(mse))
    assert psnr>=38, f"Compression fidelity {asset['id']}: {psnr}"
    assert abs(round(psnr,3)-asset['compressed']['psnrDb'])<=0.001
    assert original.stat().st_size==asset['compressed']['originalBytes']
    assert compressed.stat().st_size==asset['compressed']['compressedBytes']
    import re,base64
    image_id='ivanhoe-image-'+re.sub('[^a-zA-Z0-9-]','-',asset['compressed']['path'])
    assert image_id in blobs, f"Selected art not referenced {asset['id']}"
    assert (ROOT / blobs[image_id]['url']).read_bytes()==compressed.read_bytes()
    assert asset.get('originalReview'), f"Original review missing {asset['id']}"
    checks.append({'asset':asset['id'],'sha256':digest,'decodedPsnrDb':round(psnr,3),'finalApplicationApproved':asset.get('appReviewed',False)})
missing={
    'characters':[c['id'] for c in world['characters'] if not c.get('portraitImageId')],
    'locations':[p['id'] for p in world['locationMarkers'] if not p.get('imageId')],
    'items':[i['id'] for i in world['items'] if not i.get('imageId')],
}
coverage='COVERAGE INCOMPLETE' if any(missing.values()) else 'ALL ENTITY SLOTS COVERED'
report={'status':f'PASSED SELECTED ART INTEGRITY ONLY; {coverage}; MANUAL READING-ORDER APPROVAL RECORDED SEPARATELY','checks':checks,'missing':missing}
(BOOK/'qa'/'artwork-integrity.json').write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8',newline='\n')
print(json.dumps({'status':report['status'],'selected':len(checks),'missing':{k:len(v) for k,v in missing.items()}}))
if '--release' in sys.argv:
    assert not any(missing.values()), 'Release blocked: missing required illustrations'
    assert all(c['finalApplicationApproved'] for c in checks), 'Release blocked: final application artwork approval incomplete'
