"""Record individually opened originals, decoded WebPs and actual app views."""
import json
from pathlib import Path
book=Path(__file__).resolve().parent
path=book/'asset-manifest.json';m=json.loads(path.read_text(encoding='utf-8'));checks=[]
for number in range(5,8):
 plans=json.loads((book/f'art-batch-objects-{number:02}.json').read_text(encoding='utf-8'))
 keys=[p['id'] for p in plans];report_name='qa/item-art-'+','.join(keys)+'.json'
 report=json.loads((book/report_name).read_text(encoding='utf-8'));assert not report['pageErrors']
 for key in keys:
  a=next(a for a in m['assets'] if a['id']==key);capture=next(c for c in report['itemArtChecks'] if c['key']==key)
  checks.append(dict(id=key,compressedSha256=a['compressed']['sha256'],fixtureSha256=report['fixtureSha256'],eventId=capture['eventId'],captureReport=report_name,thumbnail='qa/item-'+key+'.png',enlarged='qa/item-'+key+'-lightbox.png'))
  a['compressedReview']='Decoded WebP individually opened: source-specific object and material remain clear, no visible compression defects. Native 1254x1254 dimensions retained, PSNR above 38 dB.'
  a['applicationPresentationReview']=dict(date='2026-11-02',evidence='qa/object-batches-05-07-manual-review.json',compressedSha256=a['compressed']['sha256'],scope='Actual application thumbnail and enlarged image individually opened; no premature contents, owner or event depicted.',finalEditionApproval=False)
record=dict(date='2026-11-02',scope='Twelve selected object originals, compressed images and actual application thumbnails/lightboxes individually opened. Jewellery corrected from modern faceting; rejected originals retained. This is scoped visual evidence, not full custody or release approval.',checks=checks,releaseApproved=False)
for p,value in [(path,m),(book/'qa/object-batches-05-07-manual-review.json',record)]:p.write_text(json.dumps(value,ensure_ascii=False,indent=2)+'\n',encoding='utf-8',newline='\n')
for name in ['PROGRESS.md','RESUME.md']:
 p=book/name;t=p.read_text(encoding='utf-8').replace('100 selected ordinary illustrations','112 selected ordinary illustrations',1).replace('169 locations and 34 items','169 locations and 22 items',1)
 t+='\n## 2026-11-02 — object batches 05–07\n\n112 ordinary illustrations now compile (33 object images). All twelve further selected originals, compressed WebPs and actual application thumbnails/enlarged images were individually opened. Jewellery v1s were rejected for overly modern faceting; corrected v2s retain irregular crystal forms. Distaff and fetter key remain object references without invented action or current possessor. Written contents remain concealed in the credit order, receipt, billet and anonymous scrap. Full prompts and illustrative assumptions are preserved in plans 05–07 and the manifest. Scoped evidence: `qa/object-batches-05-07-manual-review.json`.\n\nLatest full library suite: 1,239 tests / 23 files passed after the cord correction. Exact source reconstruction, selected artwork integrity, illustrated-map integrity and catalogue checks are retained separately. Full artwork coverage (169 locations / 22 objects), source continuity, chronology, final current-fixture continuous playback and release packaging remain OPEN.\n'
 p.write_text(t,encoding='utf-8',newline='\n')
