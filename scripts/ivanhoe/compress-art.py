"""Compress only Ivanhoe's manifested originals, preserving dimensions.

WebP follows current repository conventions. Start quality 90/method 6,
increase until decoded RGB PSNR >= 38 dB; use lossless if necessary. Keep
every original. Metrics and decoding are not substitutes for visual QA.
"""
import hashlib
import json
import math
import sys
from pathlib import Path
from PIL import Image, ImageChops, ImageStat, __version__

BOOK=Path(__file__).resolve().parent
ROOT=BOOK.parents[1]
MANIFEST=BOOK/'asset-manifest.json'
manifest=json.loads(MANIFEST.read_text(encoding='utf-8'))
selected=set(sys.argv[1:])
unknown=selected-{asset['id'] for asset in manifest['assets']}
if unknown:
    raise ValueError(f'Unknown asset IDs: {sorted(unknown)}')
outdir=BOOK/'art-reviewed'
outdir.mkdir(exist_ok=True)
for asset in manifest['assets']:
    if selected and asset['id'] not in selected:
        continue
    source=(ROOT/asset['original']).resolve()
    if not source.is_relative_to(BOOK/'art-originals'):
        raise ValueError('Original must remain inside this book')
    if not asset['id'].replace('-','').isalnum():
        raise ValueError('Unsafe asset ID')
    destination=outdir/(asset['id']+'.webp')
    with Image.open(source) as opened:
        original=opened.convert('RGB')
    quality=90
    while True:
        original.save(destination,'WEBP',quality=quality,method=6,exact=True)
        with Image.open(destination) as opened:
            decoded=opened.convert('RGB')
        assert decoded.size==original.size
        rms=ImageStat.Stat(ImageChops.difference(original,decoded)).rms
        mse=sum(x*x for x in rms)/len(rms)
        psnr=99.0 if not mse else 20*math.log10(255/math.sqrt(mse))
        if psnr>=38 or quality==100:
            break
        quality+=1
    if psnr<38:
        original.save(destination,'WEBP',lossless=True,method=6,exact=True)
        with Image.open(destination) as opened:
            assert ImageChops.difference(original,opened.convert('RGB')).getbbox() is None
        quality='lossless'
        psnr=99.0
    asset['originalSha256']=hashlib.sha256(source.read_bytes()).hexdigest()
    asset['compressed']={
        'path':destination.relative_to(ROOT).as_posix(),
        'sha256':hashlib.sha256(destination.read_bytes()).hexdigest(),
        'width':original.width,'height':original.height,'quality':quality,
        'method':6,'psnrDb':round(psnr,3),'pillow':__version__,
        'originalBytes':source.stat().st_size,'compressedBytes':destination.stat().st_size,
    }
    print(asset['id'],json.dumps(asset['compressed']))
MANIFEST.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8',newline='\n')
