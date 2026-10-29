"""Encode selected map originals without resizing; visual acceptance is separate."""
from pathlib import Path
import hashlib
import json
from PIL import Image, __version__, features

ROOT = Path(__file__).resolve().parent

def main():
    images = []
    for source in sorted((ROOT / 'map-image-sources').glob('*.png')):
        target = ROOT / 'map-staging' / f'{source.stem}-illustrated.webp'
        with Image.open(source) as image:
            dimensions = list(image.size)
            image.convert('RGB').save(target, 'WEBP', quality=90, method=6, exact=True)
        with Image.open(target) as encoded:
            if list(encoded.size) != dimensions:
                raise ValueError('Map dimensions changed during encoding')
        images.append(dict(key=source.stem,source=source.relative_to(ROOT).as_posix(),
            image=target.name,dimensions=dimensions,quality=90,
            sourceBytes=source.stat().st_size,encodedBytes=target.stat().st_size,
            sourceSha256=hashlib.sha256(source.read_bytes()).hexdigest(),
            encodedSha256=hashlib.sha256(target.read_bytes()).hexdigest()))
    report=dict(pillow=__version__,libwebp=features.version('webp'),images=images)
    (ROOT/'MAP_ENCODING.json').write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8')
    print(json.dumps(report,indent=2))

if __name__ == '__main__':
    main()
