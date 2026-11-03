"""Apply explicit human original selections; never infer missing approvals."""
import json
from pathlib import Path

book = Path(__file__).resolve().parent
review_path = book / 'qa/location-original-review-selections.json'
reviews = json.loads(review_path.read_text(encoding='utf-8'))
for addition in sorted((book / 'qa').glob('location-original-review-additions-*.json')):
    reviews['assets'].update(json.loads(addition.read_text(encoding='utf-8')))
plan_path = book / 'art-batch-places-remaining.json'
plan = json.loads(plan_path.read_text(encoding='utf-8'))
known = {row['entity'].split(':', 1)[1] for row in plan}
assert not set(reviews['assets']) - known
for asset in plan:
    key = asset['entity'].split(':', 1)[1]
    if key not in reviews['assets']:
        continue
    variant, note = reviews['assets'][key]
    assert (book / 'art-originals' / (asset['id'] + '-' + variant + '.png')).exists()
    asset['selectedVariant'] = variant
    asset['originalReview'] = 'Individually opened full-resolution original: ' + note
    asset['reviewStatus'] = 'Original reviewed; compression and actual app review OPEN'
    if variant != 'v1':
        receipt = json.loads((book / 'generation-receipts' / (asset['id'] + '-' + variant + '.json')).read_text(encoding='utf-8'))
        asset['editPrompt'] = receipt['prompt']
for path, value in [(review_path, reviews), (plan_path, plan)]:
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n', encoding='utf-8', newline='\n')
print(str(len(reviews['assets'])) + '/145 individual original selections; compressed/app review OPEN')
