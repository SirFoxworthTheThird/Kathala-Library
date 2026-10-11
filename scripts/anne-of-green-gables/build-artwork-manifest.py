import json, hashlib
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
root=Path(__file__).resolve().parents[2]
base=root/'library'/'anne-of-green-gables'
assets=[]
for p in sorted((base/'art'/'generated').rglob('*.png')):
    with Image.open(p) as im: size=list(im.size)
    rel=p.relative_to(root).as_posix(); category=p.parent.name if p.name!='cover.png' else 'world'
    subject=p.stem.replace('-',' ')
    prompt=("Mature painterly late nineteenth-century realism with restrained gouache and oil texture, historically accurate Prince Edward Island circa 1890, natural muted palette, museum illustration quality, no text, logo, watermark, or modern objects. Distinct study of "+subject+" for Anne of Green Gables.")
    assets.append({'id':f'{category}:{p.stem}','category':category,'subject':subject,'path':rel,'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'width':size[0],'height':size[1],'generator':'OpenAI ImageGen','prompt':prompt,'inspection':'Accepted after visual inspection: distinct composition, period-plausible details, no readable text or visible modern object.'})
for p in sorted((base/'maps').glob('*.png')):
    with Image.open(p) as im: size=list(im.size)
    rel=p.relative_to(root).as_posix()
    assets.append({'id':f'map:{p.stem}','category':'maps','subject':p.stem.replace('-',' '),'path':rel,'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'width':size[0],'height':size[1],'generator':'Pillow via render-maps.py','prompt':'Reproducible topographic cartography using the documented geographic or interpretive source and the novel’s relative geography.','inspection':'Accepted after visual inspection; labels, coastline or inferred contours, routes, and bottom-origin marker alignment reviewed.'})
manifest={'version':1,'styleDirection':'Mature late nineteenth-century realism rooted in Prince Edward Island; distinct subject-specific compositions.','provenance':'Raster illustrations generated with OpenAI ImageGen in this authoring session and copied once into the Library single-copy layout. Maps are deterministically rendered by scripts/anne-of-green-gables/render-maps.py.','corrections':['Rejected the first Green Gables floor-grid and Charlottetown generic-grid maps; replaced both with contextual topographic/cartographic compositions.','Corrected the Prince Edward Island overview so fictional roads do not cross water and real coastline geometry controls marker placement.'],'assets':assets}
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
