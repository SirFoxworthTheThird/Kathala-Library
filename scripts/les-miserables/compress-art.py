"""Encode accepted original artwork for local staging; never publishes a world."""
import hashlib
import json
from pathlib import Path
from PIL import Image, __version__ as pillow_version, features

ROOT = Path(__file__).resolve().parent


def main():
    results = []
    report_path = ROOT / 'ART_ENCODING.json'
    previous = json.loads(report_path.read_text(encoding='utf-8')) if report_path.exists() else {}
    same_encoder = previous.get('pillow') == pillow_version and previous.get('libwebp') == features.version('webp')
    cached = {row['source']: row for row in previous.get('images', [])} if same_encoder else {}
    for source in sorted((ROOT / 'image-sources').rglob('*.png')):
        relative = source.relative_to(ROOT / 'image-sources')
        target = (ROOT / 'art-staging' / relative).with_suffix('.webp')
        target.parent.mkdir(parents=True, exist_ok=True)
        source_hash = hashlib.sha256(source.read_bytes()).hexdigest()
        source_name = source.relative_to(ROOT).as_posix()
        old = cached.get(source_name)
        with Image.open(source) as image:
            # Preserve the generated composition and dimensions. Lossy encoding
            # is the only operation; visual inspection of the result is separate.
            dimensions = list(image.size)
            reusable = old and old.get('sourceSha256') == source_hash and old.get('dimensions') == dimensions \
                and old.get('quality') == 88 and target.exists() \
                and old.get('encodedSha256') == hashlib.sha256(target.read_bytes()).hexdigest()
            if not reusable:
                image.convert('RGB').save(target, 'WEBP', quality=88, method=6, exact=True)
        results.append({
            'source': source.relative_to(ROOT).as_posix(),
            'target': target.relative_to(ROOT).as_posix(),
            'dimensions': dimensions,
            'quality': 88,
            'sourceBytes': source.stat().st_size,
            'encodedBytes': target.stat().st_size,
            'sourceSha256': source_hash,
            'encodedSha256': hashlib.sha256(target.read_bytes()).hexdigest(),
        })
    report = {'pillow': pillow_version, 'libwebp': features.version('webp'), 'images': results}
    (ROOT / 'ART_ENCODING.json').write_text(json.dumps(report, indent=2) + '\n', encoding='utf-8')
    print(json.dumps(report, indent=2))


if __name__ == '__main__':
    main()
