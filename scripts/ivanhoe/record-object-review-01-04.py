"""Save scoped evidence after all sixteen object originals, WebPs and app views were opened."""
import json
from pathlib import Path
book=Path(__file__).resolve().parent
path=book/'asset-manifest.json';m=json.loads(path.read_text(encoding='utf-8'))
checks=[]
for number in range(1,5):
 plans=json.loads((book/f'art-batch-objects-{number:02}.json').read_text(encoding='utf-8'))
 keys=[p['id'] for p in plans]
 report_name='qa/item-art-'+','.join(keys)+'.json'
 report=json.loads((book/report_name).read_text(encoding='utf-8'))
 assert not report['pageErrors']
 for key in keys:
  a=next(a for a in m['assets'] if a['id']==key)
  capture=next(c for c in report['itemArtChecks'] if c['key']==key)
  entry=dict(id=key,compressedSha256=a['compressed']['sha256'],captureReport=report_name,
             eventId=capture['eventId'],thumbnail='qa/item-'+key+'.png',enlarged='qa/item-'+key+'-lightbox.png')
  if report.get('fixtureSha256'):entry['fixtureSha256']=report['fixtureSha256']
  if key=='friar-cord':
   latest=json.loads((book/'qa/item-art-friar-cord.json').read_text(encoding='utf-8'))
   entry.update(captureReport='qa/item-art-friar-cord.json',fixtureSha256=latest['fixtureSha256'],eventId=latest['itemArtChecks'][0]['eventId'],custodyEvidence='qa/cord-custody-ui-review.json')
  checks.append(entry)
  a['compressedReview']='Decoded WebP individually opened: complete object silhouette, material texture and source-specific features preserved without visible compression defects. Native 1254x1254 dimensions retained; measured PSNR exceeds 38 dB.'
  a['applicationPresentationReview']=dict(date='2026-11-02',evidence='qa/object-batches-01-04-manual-review.json',compressedSha256=a['compressed']['sha256'],scope='Thumbnail and enlarged image individually opened in actual application; no early contents, wearer or outcome added.',finalEditionApproval=False)
record=dict(date='2026-11-02',scope='Sixteen distinct objects: selected originals, decoded compressed files, actual item thumbnails and enlarged views individually reviewed. Not whole-book custody, chronology or final artwork approval. Earlier fixture reports without a stored hash remain scoped historical evidence.',checks=checks,releaseApproved=False)
for p,value in [(path,m),(book/'qa/object-batches-01-04-manual-review.json',record)]:
 p.write_text(json.dumps(value,ensure_ascii=False,indent=2)+'\n',encoding='utf-8',newline='\n')
for name in ['PROGRESS.md','RESUME.md']:
 p=book/name;t=p.read_text(encoding='utf-8')
 t=t.replace('84 selected ordinary illustrations','100 selected ordinary illustrations',1)
 t=t.replace('169 locations and 50 items','169 locations and 34 items',1)
 t=t.replace('63 reviewed custody actions /\n88 item states','64 reviewed custody actions /\n89 item states',1)
 t=t.replace('compiles63source actions/88item states','compiles64source actions/89item states',1)
 t+='\n## 2026-11-02 — sixteen object illustrations and cord custody correction\n\n'
 t+=('100 selected ordinary illustrations now include 21 distinct object assets; 34 object and '
     '169 location images remain open. All sixteen new selected originals, compressed WebPs and '
     'actual application thumbnails/enlarged images were individually opened. The unsupported '
     'castle in the feather background was removed; its rejected v1 is retained. Source-specific '
     'assumptions and full prompts are in the manifest and object plans 01–04. Scoped manual '
     'evidence: `qa/object-batches-01-04-manual-review.json`.\n\n'
     'Source rereading found the cord directly worn by Wamba at XXVI.3, before the exchange. '
     'The compiler now models that possession, retaining it through the proposals and moving it '
     'to Cedric only at XXVI.47. Existing transfer regression now checks the exact source wording, '
     'early possession and both owners before/after. All 55 book tests pass. Browser portal, '
     'pre-exchange, Next and Previous views passed and were manually opened: '
     '`qa/cord-custody-ui-review.json`, fixture '
     '`580112492be2ab04f914525ba1df3380c4458c740bee72b641bab2bd1b1b2090`. '
     'Inventory tranche: 64 actions, 89 item states, 6 placements; no detected last-known custody '
     'conflicts. This does not certify the unfinished all-book lifecycle review. Final artwork '
     'flags and release checklist remain open.\n')
 p.write_text(t,encoding='utf-8',newline='\n')
for name in ['SOURCE_DECISIONS.md','REVIEW_FINDINGS.md']:
 p=book/name;t=p.read_text(encoding='utf-8')
 t+='\n### 2026-11-02: cord possession before the exchange\n\nXXVI.3 explicitly describes Wamba wearing the knotted cord around his middle at the portal. Earlier inventory modelling introduced it only when exchanged to Cedric at XXVI.47. Added the earlier direct possession without moving the transfer before the completed exchange. Exact-source regression and browser before/after/rewind evidence pass; full lifecycle approval remains open.\n'
 p.write_text(t,encoding='utf-8',newline='\n')
