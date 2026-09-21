from PIL import Image,ImageDraw
from pathlib import Path
root=Path('library/the-thirty-nine-steps')
out=Path('scripts/the-thirty-nine-steps/qa');out.mkdir(parents=True,exist_ok=True)
for group,folder in [('characters',root/'art/characters'),('items',root/'art/items'),('locations-a',root/'art/locations'),('maps',root/'maps')]:
 files=sorted(folder.glob('*.png'))
 if group=='locations-a':
  chunks=[files[:20],files[20:]]
 else: chunks=[files]
 for ci,chunk in enumerate(chunks):
  if not chunk: continue
  thumbw,thumbh=240,190; cols=4; rows=(len(chunk)+cols-1)//cols
  sheet=Image.new('RGB',(cols*thumbw,rows*(thumbh+30)),(235,229,215));d=ImageDraw.Draw(sheet)
  for i,p in enumerate(chunk):
   im=Image.open(p).convert('RGB');im.thumbnail((thumbw,thumbh))
   x=(i%cols)*thumbw+(thumbw-im.width)//2;y=(i//cols)*(thumbh+30)+(thumbh-im.height)//2
   sheet.paste(im,(x,y));d.text(((i%cols)*thumbw+6,(i//cols)*(thumbh+30)+thumbh+5),p.stem,fill=(20,20,20))
  name=group if len(chunks)==1 else f'locations-{ci+1}'
  sheet.save(out/f'{name}.jpg',quality=88)
