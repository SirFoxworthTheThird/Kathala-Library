"""Copy versioned correction candidates without selecting or approving them."""
import json
import shutil
from pathlib import Path

book = Path(__file__).resolve().parent
for receipt_path in (book / 'generation-receipts').glob('*.json'):
    receipt = json.loads(receipt_path.read_text(encoding='utf-8'))
    if 'variant' not in receipt:
        continue
    destination = book / 'art-originals' / (receipt['id'] + '-' + receipt['variant'] + '.png')
    if not destination.exists():
        shutil.copyfile(receipt['generated'], destination)
    receipt['original'] = destination.relative_to(book.parent.parent).as_posix()
    receipt_path.write_text(json.dumps(receipt, ensure_ascii=False, indent=2) + '\n', encoding='utf-8', newline='\n')
print('Versioned candidates saved; selection and review remain separate.')
