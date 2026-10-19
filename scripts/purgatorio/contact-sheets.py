from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
root=Path(__file__).resolve().parents[2]
out=Path(__file__).parent/'qa';out.mkdir(exist_ok=True)
groups={'characters':root/'library/purgatorio/art/characters','locations':root/'library/purgatorio/art/locations','maps':root/'library/purgatorio/maps','items':root/'library/purgatorio/art/items'}
for group,folder in groups.items():
 files=sorted(folder.glob('*.png')); thumb=(220,150); cols=4; rows=(len(files)+cols-1)//cols
 sheet=Image.new('RGB',(cols*thumb[0],rows*190),(25,23,20));d=ImageDraw.Draw(sheet)
 for i,file in enumerate(files):
  im=Image.open(file).convert('RGB');im.thumbnail(thumb);x=(i%cols)*thumb[0]+(thumb[0]-im.width)//2;y=(i//cols)*190
  sheet.paste(im,(x,y));d.text(((i%cols)*thumb[0]+6,y+154),file.stem,fill=(235,220,180))
 sheet.save(out/f'{group}-contact.jpg',quality=90)
