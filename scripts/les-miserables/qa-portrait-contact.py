"""Render a selected portrait batch for visual QA; never alters artwork."""
import json
import sys
from pathlib import Path
from PIL import Image, ImageDraw

root = Path(__file__).resolve().parent
batch = sys.argv[1]
app = '--app' in sys.argv[2:]
items = '--items' in sys.argv[2:]
places = '--places' in sys.argv[2:]
prefix = 'location-art' if places else 'item-art' if items else 'portrait'
folder = 'locations' if places else 'items' if items else 'characters'
app_folder = 'place-ui' if places else 'item-ui' if items else 'art-ui'
rows = json.loads((root / f'{prefix}-batch-{batch}-selected.json').read_text(encoding='utf-8'))['selected']
for start in range(0, len(rows), 5):
    group = rows[start:start + 5]
    sheet = Image.new('RGB', (400 * len(group), 570), '#e8dfcd')
    draw = ImageDraw.Draw(sheet)
    for index, (key, _) in enumerate(group):
        source = root / 'qa' / f'{app_folder}-{batch}' / f'{"location-" if places else ""}{key}.png' if app else root / 'art-staging' / folder / f'{key}.webp'
        image = Image.open(source).convert('RGB')
        image.thumbnail((392, 530))
        sheet.paste(image, (index * 400 + (400 - image.width) // 2, 25))
        draw.text((index * 400 + 5, 5), key, fill='black')
    sheet.save(root / 'qa' / f'{prefix}-{"app" if app else "encoding"}-{batch}-{start // 5 + 1}.jpg', quality=92)
