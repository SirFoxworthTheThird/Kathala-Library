"""Arrange unmodified app screenshot strips for human crop review."""
import json
from pathlib import Path
from PIL import Image

book = Path(__file__).resolve().parent
report = json.loads((book / 'qa/avatar-review.json').read_text(encoding='utf-8'))
sheet = Image.new('RGB', (850, 105 * len(report['checks'])), '#181510')
for index, row in enumerate(report['checks']):
    with Image.open(book / row['screenshot']) as opened:
        assert opened.size == (850, 105)
        sheet.paste(opened.convert('RGB'), (0, index * 105))
sheet.save(book / 'qa/avatar-contact-sheet.png')
