"""Arrange captured Current State panels for review; no source artwork changes."""
from pathlib import Path
import sys
from PIL import Image, ImageDraw

root = Path(__file__).resolve().parent / 'qa' / (sys.argv[1] if len(sys.argv)>1 else 'source-corrections-ui')
files = sorted(path for path in root.glob('*.png') if path.stem != 'failure')
for start in range(0, len(files), 3):
    group = files[start:start + 3]
    sheet = Image.new('RGB', (1600, 470 * len(group)), '#e8dfcd')
    draw = ImageDraw.Draw(sheet)
    for index, path in enumerate(group):
        draw.text((10, index * 470 + 3), path.stem, fill='black')
        panel = Image.open(path).convert('RGB').crop((0, 50, 1600, 500))
        sheet.paste(panel, (0, index * 470 + 20))
    sheet.save(root / f'contact-{start // 3 + 1}.jpg', quality=95)
