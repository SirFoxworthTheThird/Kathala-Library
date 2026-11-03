"""Persist generated originals and generation receipts; performs no image review."""
import json
import shutil
import sys
from pathlib import Path

root = Path(__file__).resolve().parent
receipt_path = root / 'generation-receipts' / (sys.argv[1] + '.json')
receipt = json.loads(receipt_path.read_text(encoding='utf-8'))
destination = root / 'art-originals' / (receipt['id'] + '-v1.png')
if destination.exists():
    raise RuntimeError('Refusing to overwrite existing original: ' + str(destination))
shutil.copyfile(receipt['generated'], destination)
receipt['original'] = destination.relative_to(root.parent.parent).as_posix()
receipt['status'] = 'generated-unreviewed'
receipt['reviewStatus'] = 'DEFERRED until all remaining illustrations are generated'
receipt_path.write_text(json.dumps(receipt, ensure_ascii=False, indent=2) + '\n', encoding='utf-8', newline='\n')
plan_path = root / 'art-batch-places-remaining.json'
plan = json.loads(plan_path.read_text(encoding='utf-8'))
for asset in plan:
    if asset['id'] == receipt['id']:
        asset.update(receipt)
        break
else:
    raise RuntimeError('Receipt absent from generation plan')
plan_path.write_text(json.dumps(plan, ensure_ascii=False, indent=2) + '\n', encoding='utf-8', newline='\n')
print(receipt['id'] + ': original saved, review deferred')
