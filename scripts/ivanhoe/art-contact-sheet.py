"""Produce review thumbnails only; never modify the original or shipped assets."""
import json
import math
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

book = Path(__file__).resolve().parent
root = book.parents[1]
manifest = json.loads((book / 'asset-manifest.json').read_text(encoding='utf-8'))
assets = manifest['assets']
columns = min(4, len(assets))
cell_width, cell_height = 320, 510
sheet = Image.new('RGB', (columns * cell_width, math.ceil(len(assets) / columns) * cell_height), '#e9e2d5')
draw = ImageDraw.Draw(sheet)
font = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 18)
for index, asset in enumerate(assets):
    x, y = index % columns * cell_width, index // columns * cell_height
    with Image.open(root / asset['compressed']['path']) as opened:
        thumbnail = opened.convert('RGB')
        thumbnail.thumbnail((300, 450), Image.Resampling.LANCZOS)
        sheet.paste(thumbnail, (x + (cell_width - thumbnail.width) // 2, y + 10))
    draw.text((x + 10, y + 467), asset['id'], fill='#27251f', font=font)
    draw.text((x + 10, y + 489), 'Final app review pending', fill='#6b5141', font=font)
destination = book / 'qa' / 'art-selected-contact-sheet.jpg'
destination.parent.mkdir(exist_ok=True)
sheet.save(destination, quality=95, subsampling=0)
print(destination)
