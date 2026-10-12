from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont
import hashlib, json, math

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'library'/'persuasion'
GEN=OUT/'art'/'generated'
MAPS=OUT/'maps'
GEN.mkdir(parents=True,exist_ok=True); MAPS.mkdir(parents=True,exist_ok=True)
sources={
 'cover':Path(r'F:/CodexData/.codex/generated_images/01a122a5-b3bf-77d1-b375-60ed5f31c9fa/exec-664e6f9c-877d-4736-9d7e-f7e0279778f1.png'),
 'people':Path(r'F:/CodexData/.codex/generated_images/01a122a5-b3bf-77d1-b375-60ed5f31c9fa/exec-3da308e1-5ce6-4ab4-a1bb-88d7672988ac.png'),
 'mixed':Path(r'F:/CodexData/.codex/generated_images/01a122a5-b3bf-77d1-b375-60ed5f31c9fa/exec-968bb8aa-eea7-4f27-b6d8-01ec036195d2.png'),
 'places':Path(r'F:/CodexData/.codex/generated_images/01a122a5-b3bf-77d1-b375-60ed5f31c9fa/exec-517b78f4-f958-40f7-a8f0-e499c89d0f60.png')}
Image.open(sources['cover']).convert('RGB').resize((1024,1536),Image.Resampling.LANCZOS).save(GEN/'cover.jpg',quality=92,optimize=True)

def crop_grid(src,names,folder):
 im=Image.open(src).convert('RGB'); w,h=im.size
 for i,name in enumerate(names):
  if not name: continue
  r,c=divmod(i,4); box=(round(c*w/4)+5,round(r*h/4)+5,round((c+1)*w/4)-5,round((r+1)*h/4)-5)
  tile=im.crop(box).resize((768,768),Image.Resampling.LANCZOS)
  p=GEN/folder; p.mkdir(exist_ok=True)
  tile.save(p/f'{name}.jpg',quality=91,optimize=True)

crop_grid(sources['people'],['anne-elliot','frederick-wentworth','sir-walter-elliot','elizabeth-elliot','lady-russell','mary-musgrove','charles-musgrove','mr-musgrove','mrs-musgrove','louisa-musgrove','henrietta-musgrove','admiral-croft','sophia-croft','william-elliot','mrs-clay','mr-shepherd'],'characters')
crop_grid(sources['mixed'],['captain-harville','mrs-harville','captain-benwick','mrs-smith','charles-hayter','little-charles-musgrove','walter-musgrove',None,'kellynch-hall','uppercross-great-house','uppercross-cottage','uppercross-lanes','lyme-cobb','harville-lodgings','camden-place','white-hart-inn'],'mixed')
crop_grid(sources['places'],['kellynch-hall-library','kellynch-hall-drawing-room','kellynch-hall-garden','lyme-inn','westgate-buildings','milsom-street','bath-concert-rooms','gravel-walk','baronetage','wentworth-letter','vinaigrette','naval-sword','portrait-locket','travel-trunk','royal-navy','uppercross-family'],'mixed2')

FONT='C:/Windows/Fonts/georgia.ttf'; BOLD='C:/Windows/Fonts/georgiab.ttf'
def font(size,bold=False): return ImageFont.truetype(BOLD if bold else FONT,size)
def parchment():
 im=Image.new('RGB',(1600,1000),(225,215,185)); px=im.load()
 for y in range(1000):
  for x in range(1600):
   v=int(8*math.sin(x/83)+5*math.cos(y/61)+3*math.sin((x+y)/29))
   px[x,y]=(max(0,225+v),max(0,215+v),max(0,185+v))
 return im.filter(ImageFilter.GaussianBlur(1.2))
def map_base(title,subtitle):
 im=parchment();d=ImageDraw.Draw(im)
 d.rectangle((24,24,1576,976),outline=(79,64,42),width=5)
 d.text((70,55),title,font=font(42,True),fill=(55,48,38)); d.text((72,108),subtitle,font=font(20),fill=(82,72,55))
 # compass and scale styling
 d.ellipse((1440,60,1530,150),outline=(72,61,43),width=2);d.line((1485,72,1485,138),fill=(72,61,43),width=3);d.polygon([(1485,66),(1477,88),(1493,88)],fill=(72,61,43));d.text((1477,42),'N',font=font(18,True),fill=(72,61,43))
 return im,d
def save_map(key,title,subtitle,roads,water,contours,labels):
 im,d=map_base(title,subtitle)
 for pts in contours:d.line(pts,fill=(157,139,96),width=2)
 for pts in water:d.line(pts,fill=(72,119,138),width=14,joint='curve')
 for pts in roads:
  d.line(pts,fill=(104,76,47),width=9,joint='curve');d.line(pts,fill=(211,183,128),width=4,joint='curve')
 for name,(x,y) in labels.items():
  yy=1000-y; d.ellipse((x-8,yy-8,x+8,yy+8),fill=(122,49,40),outline=(250,239,202),width=2);d.text((x+13,yy-14),name,font=font(18,True),fill=(49,43,34),stroke_width=3,stroke_fill=(230,219,188))
 im.save(MAPS/f'{key}.png',optimize=True)

save_map('southwest-england','Southwest England','Somerset, Dorset, Bath and the naval south coast',[[ (330,390),(650,410),(845,350),(1000,430),(1190,670)]],[[(100,760),(300,730),(500,700),(705,610),(900,650),(1120,730),(1500,710)]],[[(250,y),(1350,y-80)] for y in range(220,620,65)],{'Kellynch district':(650,590),'Lyme Regis':(705,390),'Bath':(845,650),'Portsmouth harbour':(1190,330)})
save_map('somerset','Kellynch and Uppercross','Interpretive topography from the novel’s relative routes',[[ (420,350),(650,410),(860,490),(1020,510),(1270,610)],[(420,350),(500,300),(720,360),(965,545)]],[[(250,780),(520,760),(820,690),(1150,720),(1440,650)]],[[(180,y),(1420,y+int(30*math.sin(y)))] for y in range(230,820,55)],{'Kellynch Hall':(420,650),'Uppercross Cottage':(965,455),'Uppercross Great House':(1090,535),'Winthrop':(1270,390)})
save_map('lyme','Lyme Regis','Coast, Cobb, inn and Harville lodgings',[[ (410,530),(560,690),(720,610),(840,435),(1040,530)]],[[(120,810),(350,760),(560,690),(770,760),(1100,700),(1480,750)],[(560,690),(500,610),(530,500)]],[[(650,y),(1450,y-30)] for y in range(180,640,55)],{'Lyme Cobb':(560,310),'Lyme inn':(840,565),'Harville lodgings':(1040,470)})
save_map('bath','Bath','Georgian streets used by the winter narrative',[[ (300,240),(520,360),(700,320),(790,490),(775,590),(690,790)],[(520,360),(700,320),(820,420),(1040,760)],[(600,760),(690,790),(1040,760)]],[[(300,180),(460,230),(620,190),(790,250),(980,210),(1300,270)]],[[(200,y),(1400,y+20)] for y in range(180,850,70)],{'Camden Place':(1040,760),'Rivers Street':(600,760),'Westgate Buildings':(520,360),'Milsom Street':(775,590),'Concert rooms':(715,715),'White Hart Inn':(700,320),'Gravel walk':(820,420)})

# Replace the three real-world layers with archived OpenTopoMap-backed
# topographic mosaics. The fictional Somerset detail remains interpretive.
exec((Path(__file__).with_name('render-topographic-maps.py')).read_text(encoding='utf-8'))
OUT=ROOT/'library'/'persuasion'

# Additional place cards are unique close cartographic studies, retaining the
# same bottom-origin geography as their parent layers.
place_cards={'kellynch-district':('southwest-england',650,410),'lyme-regis':('southwest-england',705,610),'bath':('southwest-england',845,350),'portsmouth-harbour':('southwest-england',1190,670),'uppercross':('somerset',1020,510),'winthrop':('somerset',1270,610),'winthrop-fields':('somerset',1180,570),'road-from-lyme':('southwest-england',685,535),'road-to-bath':('southwest-england',760,410),'rivers-street':('bath',600,240),'bath-streets':('bath',790,510),'bath-assembly-rooms':('bath',690,210)}
pc=GEN/'places';pc.mkdir(exist_ok=True)
for name,(key,x,y) in place_cards.items():
 im=Image.open(MAPS/f'{key}.png').convert('RGB'); left=max(0,min(1088,x-256)); top=max(0,min(488,y-256))
 tile=im.crop((left,top,left+512,top+512)).resize((768,768),Image.Resampling.LANCZOS)
 d=ImageDraw.Draw(tile);d.rectangle((18,680,750,750),fill=(230,219,188),outline=(79,64,42),width=3);d.text((36,696),name.replace('-',' ').title(),font=font(25,True),fill=(55,48,38))
 tile.save(pc/f'{name}.jpg',quality=91,optimize=True)

assets=[]
for p in sorted(OUT.rglob('*')):
 if p.suffix.lower() in ('.jpg','.png'):
  im=Image.open(p); assets.append({'path':p.relative_to(ROOT).as_posix(),'width':im.width,'height':im.height,'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'source':'OpenAI ImageGen' if 'generated' in p.parts else 'Original editorial cartography rendered with Pillow'})
(OUT/'ARTWORK_MANIFEST.json').write_text(json.dumps({'assets':assets},indent=2)+'\n',encoding='utf-8',newline='\n')
print(f'Rendered {len(assets)} assets')
