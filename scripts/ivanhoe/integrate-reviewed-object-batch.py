"""Integrate only assets with an explicit individual original review in their plan."""
import json,sys
from pathlib import Path
book=Path(__file__).resolve().parent
plan=(book/sys.argv[1]).resolve()
assert plan.is_relative_to(book)
plans=json.loads(plan.read_text(encoding='utf-8'))
path=book/'asset-manifest.json';m=json.loads(path.read_text(encoding='utf-8'))
ledger=book/'item-ledger.mjs';text=ledger.read_text(encoding='utf-8')
for p in plans:
 assert p.get('originalReview'),p['id']
 original='scripts/ivanhoe/art-originals/'+p['id']+'-'+p.get('selectedVariant','v1')+'.png'
 assert (book.parents[1]/original).exists(),original
 if not any(a['id']==p['id'] for a in m['assets']):
  asset=dict(id=p['id'],original=original,source=p['source'],prompt=p['prompt'],generator='built-in image_gen',originalReview=p['originalReview'],appReviewed=False)
  if p.get('editPrompt'):asset['editPrompt']=p['editPrompt']
  if p.get('selectedVariant','v1')!='v1':asset['rejectedVariant']='scripts/ivanhoe/art-originals/'+p['id']+'-v1.png'
  m['assets'].append(asset)
 line="items.find(i=>i.key==='"+p['id']+"').portraitAsset='"+p['id']+"'"
 if line not in text:text+='\n'+line+'\n'
m['status']=str(len(m['assets']))+' selected ordinary illustrations; location/item coverage and final application review incomplete'
path.write_text(json.dumps(m,ensure_ascii=False,indent=2)+'\n',encoding='utf-8',newline='\n')
ledger.write_text(text,encoding='utf-8',newline='\n')
