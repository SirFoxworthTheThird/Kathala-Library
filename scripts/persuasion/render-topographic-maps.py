from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
import math,urllib.request,json,ssl

HERE=Path(__file__).resolve().parent; ROOT=HERE.parents[1]; CACHE=HERE/'map-source'; CACHE.mkdir(exist_ok=True); OUT=ROOT/'library'/'persuasion'/'maps';OUT.mkdir(parents=True,exist_ok=True)
UA='Kathala-Library-Persuasion/1.0 (+https://github.com/SirFoxworthTheThird/Kathala-Library)'
def worldpx(lon,lat,z):
 n=2**z*256; x=(lon+180)/360*n; lat=max(-85.0511,min(85.0511,lat)); y=(1-math.asinh(math.tan(math.radians(lat)))/math.pi)/2*n; return x,y
def render(key,bounds,z,points):
 west,south,east,north=bounds;x0,y0=worldpx(west,north,z);x1,y1=worldpx(east,south,z)
 tx0,ty0=int(x0//256),int(y0//256);tx1,ty1=int(x1//256),int(y1//256)
 mosaic=Image.new('RGB',((tx1-tx0+1)*256,(ty1-ty0+1)*256))
 for ty in range(ty0,ty1+1):
  for tx in range(tx0,tx1+1):
   p=CACHE/f'{z}-{tx}-{ty}.png'
   if not p.exists():
    req=urllib.request.Request(f'https://tile.opentopomap.org/{z}/{tx}/{ty}.png',headers={'User-Agent':UA});p.write_bytes(urllib.request.urlopen(req,timeout=30,context=ssl._create_unverified_context()).read())
   mosaic.paste(Image.open(p).convert('RGB'),((tx-tx0)*256,(ty-ty0)*256))
 crop=mosaic.crop((round(x0-tx0*256),round(y0-ty0*256),round(x1-tx0*256),round(y1-ty0*256))).resize((1600,1000),Image.Resampling.LANCZOS)
 d=ImageDraw.Draw(crop); font=ImageFont.truetype('C:/Windows/Fonts/georgiab.ttf',18); small=ImageFont.truetype('C:/Windows/Fonts/georgia.ttf',15)
 coords={}
 for name,(lon,lat) in points.items():
  xp,yp=worldpx(lon,lat,z);x=(xp-x0)/(x1-x0)*1600;top=(yp-y0)/(y1-y0)*1000;y=1000-top;coords[name]={'x':round(x,1),'y':round(y,1)}
  d.ellipse((x-7,top-7,x+7,top+7),fill=(139,44,35),outline='white',width=2);d.text((x+10,top-12),name,font=font,fill=(45,35,28),stroke_width=3,stroke_fill=(245,239,215))
 d.rectangle((12,954,850,994),fill=(246,241,218));d.text((22,965),'Map data © OpenStreetMap contributors; relief style © OpenTopoMap (CC BY-SA)',font=small,fill=(45,40,32))
 crop.save(OUT/f'{key}.png',optimize=True);return coords

allcoords={}
allcoords['england']=render('southwest-england',(-3.55,50.48,-0.85,51.72),8,{'Kellynch district':(-3.10,51.05),'Lyme Regis':(-2.934,50.726),'Bath':(-2.359,51.381),'Portsmouth harbour':(-1.087,50.800),'Road from Lyme':(-2.75,50.86),'Road to Bath':(-2.66,51.20)})
allcoords['lyme']=render('lyme',(-2.955,50.713,-2.915,50.739),15,{'Lyme Cobb':(-2.939,50.719),'Lyme inn':(-2.936,50.725),'Harville lodgings':(-2.930,50.723)})
allcoords['bath']=render('bath',(-2.385,51.365,-2.335,51.397),15,{'Camden Place':(-2.353,51.390),'Rivers Street':(-2.365,51.386),'Westgate Buildings':(-2.365,51.378),'Milsom Street':(-2.361,51.384),'Bath streets':(-2.360,51.380),'Bath assembly rooms':(-2.363,51.386),'Bath concert rooms':(-2.363,51.386),'White Hart Inn':(-2.359,51.377),'Gravel walk':(-2.351,51.381)})
(HERE/'map-coordinates.json').write_text(json.dumps(allcoords,indent=2)+'\n',newline='\n')
print('Rendered 3 OpenTopoMap-backed geographic layers')
