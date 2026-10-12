import json, hashlib
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
root=Path(__file__).resolve().parents[2]
base=root/'library'/'anne-of-green-gables'
assets=[]
prompts={r['path']:r for r in json.loads((Path(__file__).parent/'art-prompts.json').read_text(encoding='utf8'))}
for p in sorted((base/'art'/'generated').rglob('*.png')):
    with Image.open(p) as im: size=list(im.size)
    rel=p.relative_to(root).as_posix(); category=p.parent.name if p.name!='cover.png' else 'world'
    subject=p.stem.replace('-',' ')
    request=prompts[rel]
    prompt=request['prompt']
    assets.append({'id':f'{category}:{p.stem}','category':category,'subject':subject,'path':rel,'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'width':size[0],'height':size[1],'generator':'OpenAI ImageGen','prompt':prompt,'inspection':'Pending visual inspection of current bytes'})
for p in sorted((base/'maps').glob('*.png')):
    with Image.open(p) as im: size=list(im.size)
    rel=p.relative_to(root).as_posix()
    assets.append({'id':f'map:{p.stem}','category':'maps','subject':p.stem.replace('-',' '),'path':rel,'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'width':size[0],'height':size[1],'generator':'Pillow via render-maps.py','prompt':'Reproducible topographic cartography using the documented geographic or interpretive source and the novel’s relative geography.','inspection':'Pending visual inspection of current bytes'})
manifest={'version':1,'styleDirection':'Mature late nineteenth-century realism rooted in Prince Edward Island; distinct subject-specific compositions.','provenance':'Raster illustrations generated with OpenAI ImageGen in this authoring session and copied once into the Library single-copy layout. Maps are deterministically rendered by scripts/anne-of-green-gables/render-maps.py.','corrections':['Rejected the first Green Gables floor-grid and Charlottetown generic-grid maps; replaced both with contextual topographic/cartographic compositions.','Corrected the Prince Edward Island overview so fictional roads do not cross water and real coastline geometry controls marker placement.'],'assets':assets}
manifest['promptEvidence']='Every illustration prompt is the exact generation request, recovered from the authoring log or recorded during the correction pass. Map briefs describe deterministic cartography, not an ImageGen request.'
manifest['corrections']=['Rebuilt all map layers after the independent audit found offshore markers and water-crossing roads. The coastline, pins and island routes now use one latitude-corrected projection; every route segment is sampled against its land mask.','Moved the farmyard outside the house footprint, added Marilla’s room, and separated upper rooms from the ground-floor plan.','Added independently generated portraits and location illustrations for the source-grounded scene corrections.','Replaced the unsupported sealed scholarship envelope with the posted examination-results sheet.']
for a in assets:
    if a['category']!='maps':a['requestEvidence']=prompts[a['path']].get('requestId',prompts[a['path']]['recovery'])
with (base/'ARTWORK_MANIFEST.json').open('w',encoding='utf-8',newline='\n') as handle:
    handle.write(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
review=json.loads((Path(__file__).parent/'art-review.json').read_text(encoding='utf8')) if (Path(__file__).parent/'art-review.json').exists() else {}
for a in assets:
    r=review.get(a['path'],{})
    a['inspection']=r.get('notes','Pending visual inspection') if r.get('sha256')==a['sha256'] else 'Pending visual inspection of current bytes'
manifest['assets']=assets
with (base/'ARTWORK_MANIFEST.json').open('w',encoding='utf-8',newline='\n') as handle:
    handle.write(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
# contact sheets for inspection evidence
font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',18)
for cat in ['characters','items','locations','factions']:
    files=sorted((base/'art'/'generated'/cat).glob('*.png'))
    thumbs=[]
    for p in files:
        im=Image.open(p).convert('RGB'); im.thumbnail((300,200)); thumbs.append((p,im.copy()))
    cols=4; rows=(len(thumbs)+cols-1)//cols
    sheet=Image.new('RGB',(cols*320,rows*240),'#eee7d7'); d=ImageDraw.Draw(sheet)
    for i,(p,im) in enumerate(thumbs):
        x=(i%cols)*320+10; y=(i//cols)*240+10; sheet.paste(im,(x,y)); d.text((x,y+205),p.stem,font=font,fill='#2e2a24')
    qa=Path(__file__).parent/'qa'; qa.mkdir(exist_ok=True)
    out=qa/f'contact-sheet-{cat}.jpg'; sheet.save(out,quality=88)
print(f'Wrote manifest for {len(assets)} assets and 4 contact sheets.')
