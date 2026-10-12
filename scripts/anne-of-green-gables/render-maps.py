"""Compose reviewed illustrated terrain with deterministic Kathala overlays."""
import runpy
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

HERE=Path(__file__).parent; ROOT=HERE.parents[1]
OUT=ROOT/'library/anne-of-green-gables/maps'; BASES=HERE/'map-art-source'; OUT.mkdir(parents=True,exist_ok=True)
G=runpy.run_path(str(HERE/'map-geometry.py')); W,H=1600,1000; CONTENT=(44,142,1556,904)
TITLE=ImageFont.truetype('C:/Windows/Fonts/georgiab.ttf',38); SUB=ImageFont.truetype('C:/Windows/Fonts/georgiai.ttf',18)
LABEL=ImageFont.truetype('C:/Windows/Fonts/georgia.ttf',19); SMALL=ImageFont.truetype('C:/Windows/Fonts/georgia.ttf',16)
INK,PAPER='#392f24','#eee4ce'

def p(x,y): return x,H-y
def fitted(name):
 im=Image.open(BASES/name).convert('RGB');tw,th=CONTENT[2]-CONTENT[0],CONTENT[3]-CONTENT[1];scale=max(tw/im.width,th/im.height)
 im=im.resize((round(im.width*scale),round(im.height*scale)),Image.Resampling.LANCZOS);left,top=(im.width-tw)//2,(im.height-th)//2
 return im.crop((left,top,left+tw,top+th))
def frame(im,title,subtitle):
 d=ImageDraw.Draw(im);d.rectangle((24,24,1576,976),outline='#766447',width=3);d.rectangle((33,33,1567,967),outline='#b29c70')
 d.rectangle((44,36,1556,141),fill=PAPER);d.text((65,46),title,font=TITLE,fill=INK);d.text((66,97),subtitle,font=SUB,fill='#6b5b43');d.line((60,129,1540,129),fill='#9e8a61',width=2)
 return d
def sheet(title,subtitle,base_name):
 im=Image.new('RGB',(W,H),PAPER);im.paste(fitted(base_name),CONTENT[:2]);return im,frame(im,title,subtitle)
def footer(d,text):
 d.rectangle((44,904,1556,956),fill=PAPER);d.line((60,914,1540,914),fill='#9e8a61');d.text((65,929),text,font=SMALL,fill=INK)
def compass(d):
 x,y=1475,210;d.ellipse((x-36,y-36,x+36,y+36),fill='#eee4ce',outline='#6f5d40',width=2)
 for dx,dy in ((0,-1),(1,0),(0,1),(-1,0)):d.polygon([(x+dx*42,y+dy*42),(x-dy*8,y+dx*8),(x,y),(x+dy*8,y-dx*8)],fill='#55452f')
 d.text((x,y-66),'N',font=LABEL,fill=INK,anchor='mm')
def label(d,x,y,text,dx=0,dy=-28):
 x,y=p(x,y);lx,ly=x+dx,y+dy
 if dx or dy:d.line((x,y,lx,ly),fill='#6a5136',width=2)
 b=d.textbbox((lx,ly),text,font=LABEL,anchor='mm');d.rounded_rectangle((b[0]-7,b[1]-4,b[2]+7,b[3]+4),4,fill='#f1e7d1',outline='#a58d64')
 d.text((lx,ly),text,font=LABEL,fill=INK,anchor='mm');d.ellipse((x-6,y-6,x+6,y+6),fill='#913f2d',outline='#f4ead5',width=2)
def road(d,points,width=5):
 points=[p(x,y) for x,y in points];d.line(points,fill='#5f4932',width=width+4,joint='curve');d.line(points,fill='#d6995e',width=width,joint='curve')

# The island relief is clipped to the verified Natural Earth coastline.
island_source=Image.open(BASES/'prince-edward-island-base.png').convert('RGB')
# Sample open water from the generated plate so only the verified coastline reads as land.
sea=island_source.crop((520,0,1100,260)).resize((CONTENT[2]-CONTENT[0],CONTENT[3]-CONTENT[1]),Image.Resampling.LANCZOS).filter(ImageFilter.GaussianBlur(2))
im=Image.new('RGB',(W,H),PAPER);im.paste(sea,CONTENT[:2])
mask=Image.new('L',(W,H),0);md=ImageDraw.Draw(mask)
for poly in G['polygons']:md.polygon(poly,fill=255)
tex=Image.new('RGB',(W,H));tex.paste(fitted('prince-edward-island-base.png'),CONTENT[:2]);im.paste(tex,(0,0),mask);d=frame(im,'Prince Edward Island','Natural Earth coastline · illustrated relief · north at top')
for poly in G['polygons']:d.line(poly+[poly[0]],fill='#4f5b3f',width=4)
for pts in G['routes'].values():road(d,[(x,H-y) for x,y in pts],4)
for name,dx,dy in [('Avonlea district',-10,-92),('Bright River',-90,45),('White Sands',155,-25),('White Sands Hotel',155,35),('Charlottetown',75,45)]:
 x,y=G['locations'][name];label(d,x,H-y,name.replace(' district',''),dx,dy)
compass(d);footer(d,'Verified Natural Earth coastline; illustrated relief and fictional story sites are interpretive.');im.save(OUT/'prince-edward-island.png')

im,d=sheet('Avonlea and its roads','Illustrated rural topography · relative positions from the novel','avonlea-base.png')
for points in [[(360,620),(500,455),(760,560),(800,530),(820,450),(900,470),(1045,500),(1080,610)],[(500,455),(400,385),(260,320)],[(760,560),(710,480),(720,330),(585,315),(500,270)],[(760,560),(680,665),(850,700),(930,690)],[(1080,610),(1040,650)],[(1080,610),(1130,510),(1170,420)]]:road(d,points,5)
for x,y,t,dx,dy in [(760,560,'Green Gables',0,-35),(500,455,'Lynde’s Hollow',-10,-35),(1080,610,'Orchard Slope',65,-36),(925,525,'Lake of Shining Waters',170,35),(360,620,'White Way of Delight',0,-35),(720,330,'Avonlea school',45,32),(585,315,'Church',0,-30),(500,270,'Manse',-10,30),(930,690,'Haunted Wood',0,-45),(680,665,'Lover’s Lane',-90,-20),(850,700,'Idlewild',-10,-65),(900,470,'Pond bridge',-10,35),(1040,650,'Diana’s playhouse',80,-65),(260,320,'Carmody',0,40),(1170,420,'Graveyard',30,40)]:label(d,x,y,t,dx,dy)
compass(d);footer(d,'Roads, farms, woods and contours are interpretive; the marked route crosses the pond at the bridge.');im.save(OUT/'avonlea.png')

im,d=sheet('Green Gables house and grounds','Illustrated estate plan · rooms shown in a transparent architectural inset','green-gables-base.png')
overlay=Image.new('RGBA',(W,H),(0,0,0,0));od=ImageDraw.Draw(overlay)
od.rounded_rectangle((530,205,1200,655),12,fill=(238,226,199,175),outline=(87,70,49,255),width=5)
for box in [(555,355,760,485),(660,525,820,643),(900,370,1175,620)]:od.rectangle(box,fill=(247,238,219,150),outline=(146,123,87,255),width=3)
od.rectangle((870,220,1190,342),fill=(232,217,185,175),outline=(128,105,71,255),width=2);od.line((1035,220,1035,342),fill=(128,105,71,255),width=2)
im=Image.alpha_composite(im.convert('RGBA'),overlay).convert('RGB');d=ImageDraw.Draw(im);d.text((1030,198),'UPPER ROOMS',font=SMALL,fill=INK,anchor='mm')
for x,y,t,dx,dy in [(740,405,'Kitchen',-30,12),(620,570,'Parlour',10,-25),(1120,720,'East gable',0,35),(980,720,'Marilla’s room',0,35),(380,650,'Orchard',-20,95),(760,270,'Farmyard',55,22)]:label(d,x,y,t,dx,dy)
compass(d);footer(d,'Estate terrain is interpretive; the room inset is inferred from the novel, not a surveyed floor plan.');im.save(OUT/'green-gables.png')

im,d=sheet('Charlottetown','Illustrated nineteenth-century harbour plan · representative story sites','charlottetown-base.png')
for x,y,t,dx,dy in [(610,720,'Beechwood',0,-35),(760,525,'Queen’s Academy',55,-48),(1120,390,'Exhibition grounds',15,40),(650,610,'Anne’s lodging',-30,30)]:label(d,x,y,t,dx,dy)
compass(d);footer(d,'Historic harbour-city form is grounded in period references; story addresses and blocks remain interpretive.');im.save(OUT/'charlottetown.png')
print('Rendered four illustrated topographic maps with deterministic labels, routes, and coordinates.')
