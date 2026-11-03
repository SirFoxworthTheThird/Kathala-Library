"""Integrate individually reviewed originals; retain the rejected feather background."""
import json
from pathlib import Path
book=Path(__file__).resolve().parent
path=book/'asset-manifest.json'
m=json.loads(path.read_text(encoding='utf-8'))
plans=json.loads((book/'art-batch-objects-02.json').read_text(encoding='utf-8'))
correction=json.loads((book/'art-object-feather-correction.json').read_text(encoding='utf-8'))
reviews={
 'palmer-reliquary':'Opened original: small smooth creamy ivory box, lid closed. No exposed contents or invented religious device. Simple box shape is illustrative; source specifies small ivory box.',
 'brian-chain':'Opened original: separate linked gold chain on oak, no pendant or later owner. Link design and simple clasp illustrative, not source specifications.',
 'locksley-feather':'Opened corrected v2: single grey-brown feather on stump, distant unsupported castle removed. Species, colour and presentation setting illustrative; source specifies only a cap feather. No later owner or identity depicted.',
 'hut-key':'Opened original: small plain forged iron key at timber threshold edge. Source establishes hiding beneath the threshold; this is an object reference, not a depicted completed discovery. Shape and metal illustrative.'}
for p in plans:
 if any(a['id']==p['id'] for a in m['assets']):continue
 a=dict(id=p['id'],original='scripts/ivanhoe/art-originals/'+p['id']+'-v1.png',source=p['source'],prompt=p['prompt'],generator='built-in image_gen',originalReview=reviews[p['id']],appReviewed=False)
 if p['id']=='locksley-feather':
  a['rejectedVariant']=a['original'];a['original']='scripts/ivanhoe/art-originals/locksley-feather-v2.png';a['editPrompt']=correction['prompt']
 m['assets'].append(a)
m['status']='92 selected ordinary illustrations; location/item coverage and final application review incomplete'
path.write_text(json.dumps(m,ensure_ascii=False,indent=2)+'\n',encoding='utf-8',newline='\n')
ledger=book/'item-ledger.mjs';text=ledger.read_text(encoding='utf-8')
for p in plans:
 line="items.find(i=>i.key==='"+p['id']+"').portraitAsset='"+p['id']+"'"
 if line not in text:text+='\n'+line+'\n'
ledger.write_text(text,encoding='utf-8',newline='\n')
