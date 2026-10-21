from pathlib import Path
import json, hashlib
from PIL import Image, ImageDraw, ImageFont

ROOT=Path(__file__).resolve().parents[2]
BASE=ROOT/'library'/'little-women'/'maps'
layout=json.loads((Path(__file__).with_name('map-layout.json')).read_text(encoding='utf-8'))
names={
 'departurePort':'Departure port','delectableHill':'Delectable Mountain','laurenceHall':'Hall & stairs','dovecoteDining':'Dining room','dovecoteHall':'Hall & stairs','dovecoteGarden':'Garden',
 'concordGateway':'Concord','newYork':'New York','washington':'Washington','seaside':'The seaside','europeGateway':'Europe',
 'marchGateway':'March house','laurenceGateway':'Laurence estate','dovecoteGateway':'Dovecote','auntMarchHouse':'Aunt March','town':'Town','river':'River','longmeadow':'Longmeadow','moffatHouse':'Moffat house','fairHall':'Fair hall','plumfield':'Plumfield',
 'marchParlor':'Parlor','marchBedrooms':'Bedrooms','marchKitchen':'Kitchen','marchDining':'Dining room','marchHall':'Hall','marchStudy':'Study','marchYard':'Yard','marchGarret':'Garret',
 'laurenceLibrary':'Library','laurenceParlor':'Music room','laurenceDining':'Dining room','laurieRoom':'Laurie’s rooms','laurenceGrounds':'Grounds & gate',
 'dovecoteParlor':'Parlor','dovecoteKitchen':'Kitchen','dovecoteNursery':'Nursery',
 'london':'London','paris':'Paris','germany':'Rhine & Heidelberg','nice':'Nice','valrosa':'Valrosa','vevay':'Vevay','vienna':'Vienna'
}
font_path='C:/Windows/Fonts/georgiab.ttf'
small_path='C:/Windows/Fonts/georgia.ttf'
font=ImageFont.truetype(font_path,22); small=ImageFont.truetype(small_path,18)
for map_key, points in layout.items():
    source=BASE/f'{map_key}-base.png'; dest=BASE/f'{map_key}.png'
    image=Image.open(source).convert('RGB').resize((1400,900),Image.Resampling.LANCZOS)
    draw=ImageDraw.Draw(image,'RGBA')
    for key,(x,y) in points.items():
        label=names[key]; bbox=draw.textbbox((0,0),label,font=small); tw=bbox[2]-bbox[0]; th=bbox[3]-bbox[1]
        left=max(8,min(1392-tw-20,x-tw/2-10)); top=max(8,min(872-th,y+12))
        draw.ellipse((x-7,y-7,x+7,y+7),fill=(117,52,48,245),outline=(255,244,213,255),width=2)
        draw.rounded_rectangle((left,top,left+tw+20,top+th+10),radius=5,fill=(246,236,209,225),outline=(83,63,45,235),width=1)
        draw.text((left+10,top+3),label,font=small,fill=(51,40,31,255))
    image.save(dest,optimize=True)
    digest=hashlib.sha256(dest.read_bytes()).hexdigest()
    print(f'{dest.relative_to(ROOT)} {digest}')
