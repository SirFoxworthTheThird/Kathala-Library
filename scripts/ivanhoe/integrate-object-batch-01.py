"""Integrate the four individually inspected object originals, before compression."""
import json
from pathlib import Path

book = Path(__file__).resolve().parent
path = book / 'asset-manifest.json'
manifest = json.loads(path.read_text(encoding='utf-8'))
plans = json.loads((book/'art-batch-objects-01.json').read_text(encoding='utf-8'))
reviews = {
    'gurth-collar': 'Opened original: continuous broad brass ring with solder seam, no clasp or opening. Fine decorative incisions are illustrative marks, not a reconstruction of the Saxon inscription. No readable letters or future liberation depicted.',
    'wamba-collar': 'Opened original: distinct cool silver neck band on purple wool, no jewels or attached chain. Small incised decorative marks stand for unreadable engraving; they do not reproduce the source inscription.',
    'gurth-staff': 'Opened original: single long stout blunt wooden staff lying on woodland grass. Entire length visible, no spearhead or invented action. Wood species and finish are illustrative.',
    'john-warder': 'Opened original: single plain short wooden baton on ochre cloth. No crown, royal arms or fabricated ceremonial metalwork. Source specifies a warder but not its material or shape; these are restrained illustrative choices.'}
for plan in plans:
    if any(a['id']==plan['id'] for a in manifest['assets']):
        continue
    manifest['assets'].append(dict(id=plan['id'], original='scripts/ivanhoe/art-originals/'+plan['id']+'-v1.png',
        source=plan['source'], prompt=plan['prompt'], generator='built-in image_gen',
        originalReview=reviews[plan['id']], appReviewed=False))
manifest['status']='88 selected ordinary illustrations; location/item coverage and final application review incomplete'
path.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8',newline='\n')
ledger=book/'item-ledger.mjs'
text=ledger.read_text(encoding='utf-8')
for plan in plans:
    line="items.find(i=>i.key==='"+plan['id']+"').portraitAsset='"+plan['id']+"'"
    if line not in text:
        text+='\n'+line+'\n'
ledger.write_text(text,encoding='utf-8',newline='\n')
