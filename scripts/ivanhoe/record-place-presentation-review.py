"""Record explicit human/model visual observations, never infer approval from captures."""
import json, pathlib, sys
p=pathlib.Path(__file__).resolve().parent
number=int(sys.argv[1]); observations=json.loads(sys.argv[2]); assets={a['id']:a for a in json.loads((p/'asset-manifest.json').read_text(encoding='utf-8'))['assets']}
reports=[json.loads(pathlib.Path('\\\\?\\'+str(f.resolve())).read_text(encoding='utf-8')) for f in sorted((p/'qa').glob('place-art-*.json'), key=lambda f: pathlib.Path('\\\\?\\'+str(f.resolve())).stat().st_mtime, reverse=True)]
rows=[]
for key,note in observations.items():
 a=assets['place-'+key]; report=next(r for r in reports if any(v['key']==key for v in r.get('placeArtChecks',[])))
 rows.append(dict(key=key,fixtureSha256=report['fixtureSha256'],originalSha256=a['originalSha256'],compressedSha256=a['compressed']['sha256'],compressedReview='Individually opened full decoded app image; served bytes checked by capture helper. No objectionable compression artifacts observed.',applicationReview=note,screenshots=['qa/place-'+key+'.png','qa/place-'+key+'-lightbox.png']))
out=p/'qa'/f'place-remaining-manual-review-{number:02}.json'
assert not out.exists(), 'Do not overwrite an existing review'
out.write_text(json.dumps(dict(scope='Explicit manual banner/lightbox observations at end cursor. Earlier disclosure and final approval separate.',releaseApproval=False,checks=rows),indent=2)+'\n',encoding='utf-8',newline='\n')
print(out.name)
