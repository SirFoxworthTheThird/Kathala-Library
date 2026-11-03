"""Integrate individually inspected location portraits; maps stay separate."""
import json,sys
from pathlib import Path

book=Path(__file__).resolve().parent
plan=(book/sys.argv[1]).resolve()
assert plan.is_relative_to(book)
plans=json.loads(plan.read_text(encoding='utf-8'))
path=book/'asset-manifest.json'
manifest=json.loads(path.read_text(encoding='utf-8'))
for row in plans:
 assert row.get('originalReview'),row['id']
 assert row['entity'].startswith('place:')
 original='scripts/ivanhoe/art-originals/'+row['id']+'-'+row.get('selectedVariant','v1')+'.png'
 assert (book.parents[1]/original).exists(),original
 assert not any(a.get('entity')==row['entity'] for a in manifest['assets']),row['entity']
 asset=dict(id=row['id'],entity=row['entity'],original=original,source=row['source'],prompt=row['prompt'],generator='built-in image_gen',originalReview=row['originalReview'],appReviewed=False)
 if row.get('editPrompt'):asset['editPrompt']=row['editPrompt']
 if row.get('selectedVariant','v1')!='v1':asset['rejectedVariant']='scripts/ivanhoe/art-originals/'+row['id']+'-v1.png'
 manifest['assets'].append(asset)
manifest['status']=str(len(manifest['assets']))+' selected ordinary illustrations; location coverage and final application review incomplete'
path.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8',newline='\n')
