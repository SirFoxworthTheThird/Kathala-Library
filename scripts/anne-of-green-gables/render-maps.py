"""Deterministic literary atlas sheets. Maps are native cartography, not scenes."""
import json, math, random, runpy
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter
HERE=Path(__file__).parent; ROOT=HERE.parents[1]; OUT=ROOT/'library/anne-of-green-gables/maps';OUT.mkdir(parents=True,exist_ok=True)
G=runpy.run_path(str(HERE/'map-geometry.py'))
W,H=1600,1000
TITLE=ImageFont.truetype('C:/Windows/Fonts/georgiab.ttf',38)
SUB=ImageFont.truetype('C:/Windows/Fonts/georgiai.ttf',18)
LABEL=ImageFont.truetype('C:/Windows/Fonts/georgia.ttf',19)
SMALL=ImageFont.truetype('C:/Windows/Fonts/georgia.ttf',16)
INK='#483d2d';PAPER='#eee4ce';LAND='#d6d5aa';WATER='#abc7ce'
def p(x,y):return x,H-y
def base(title,subtitle):
 random.seed(title);im=Image.new('RGB',(W,H),PAPER);d=ImageDraw.Draw(im)
 for _ in range(18000):d.point((random.randrange(W),random.randrange(H)),fill=random.choice(('#e5dac0','#f5eddf','#e9dfc8')))
 d.rectangle((24,24,1576,976),outline='#8a7955',width=3);d.rectangle((33,33,1567,967),outline='#b8a578')
 d.text((65,46),title,font=TITLE,fill=INK);d.text((66,97),subtitle,font=SUB,fill='#726347');d.line((60,129,1540,129),fill='#ac9b75',width=2)
 return im,d
def footer(d,text):
 d.rectangle((44,914,1556,956),fill=PAPER);d.line((60,914,1540,914),fill='#aa9670');d.text((65,929),text,font=SMALL,fill=INK)
def compass(d):
 x,y=1475,210;d.ellipse((x-36,y-36,x+36,y+36),outline='#897653',width=2)
 for dx,dy in ((0,-1),(1,0),(0,1),(-1,0)):d.polygon([(x+dx*42,y+dy*42),(x-dy*8,y+dx*8),(x,y),(x+dy*8,y-dx*8)],fill='#625338')
 d.text((x,y-66),'N',font=LABEL,fill=INK,anchor='mm')
def label(d,x,y,text,dx=0,dy=-28):
 x,y=p(x,y);lx,ly=x+dx,y+dy
 if dx or dy:d.line((x,y,lx,ly),fill='#84714e',width=1)
 b=d.textbbox((lx,ly),text,font=LABEL,anchor='mm');d.rounded_rectangle((b[0]-7,b[1]-4,b[2]+7,b[3]+4),4,fill=PAPER)
 d.text((lx,ly),text,font=LABEL,fill=INK,anchor='mm');d.ellipse((x-5,y-5,x+5,y+5),fill='#814d39',outline=PAPER,width=2)
def road(d,ps,width=7):
 ps=[p(x,y) for x,y in ps];d.line(ps,fill='#97754e',width=width+3,joint='curve');d.line(ps,fill='#e7c999',width=width,joint='curve')
def stream(d,ps,width=9):d.line([p(x,y) for x,y in ps],fill='#6f9ca8',width=width,joint='curve')
def tree(d,x,y,size=10):
 x,y=p(x,y);d.ellipse((x-size,y-size*1.4,x+size,y+size*.7),fill='#79905c',outline='#5d754d');d.line((x,y+3,x,y+size),fill='#796642',width=2)
def wood(d,box,count):
 x0,y0,x1,y1=box
 for _ in range(count):tree(d,random.randint(x0,x1),random.randint(y0,y1),random.randint(5,10))
def house(d,x,y,w=35,h=22):
 x,y=p(x,y);d.rectangle((x-w/2+4,y-h/2+4,x+w/2+4,y+h/2+4),fill='#a69a79');d.rectangle((x-w/2,y-h/2,x+w/2,y+h/2),fill='#eee2c5',outline='#67543b',width=2);d.line((x-w/2,y,x+w/2,y),fill='#8a795a',width=2)
def fields(d,box):
 x0,y0,x1,y1=box
 for x in range(x0,x1,75):
  for y in range(y0,y1,70):
   c=random.choice(('#d8d5aa','#c7cb9c','#e0d9b6','#c9cfa4'));d.polygon([(x,y),(x+68,y+8),(x+70,y+62),(x-4,y+54)],fill=c,outline='#b2b48a')
def contours(d,box,mask=None):
 # Smooth analytic slopes are deliberately interpretive, not surveyed heights.
 x0,y0,x1,y1=box;step=18
 def f(x,y):return .8*math.sin(x/230)+.55*math.cos(y/150)+.3*math.sin((x+y)/170)+.12*math.cos((2*x-y)/93)
 for level in [i*.18 for i in range(-10,11)]:
  for x in range(x0,x1-step,step):
   for y in range(y0,y1-step,step):
    corners=[(x,y),(x+step,y),(x+step,y+step),(x,y+step)];vals=[f(*q) for q in corners];hits=[]
    for i in range(4):
     j=(i+1)%4
     if (vals[i]<level)!=(vals[j]<level):
      t=(level-vals[i])/(vals[j]-vals[i]);hits.append((corners[i][0]+t*(corners[j][0]-corners[i][0]),corners[i][1]+t*(corners[j][1]-corners[i][1])))
    for i in range(0,len(hits)-1,2):
     a,b=hits[i],hits[i+1]
     if mask is None or all(mask.getpixel((round(q[0]),round(q[1])))==255 for q in (a,b)):d.line((a,b),fill='#b4aa80')

# Geographic sheet: every marker and route is derived from the same projection.
im,d=base('Prince Edward Island','Natural Earth coastline · approximate story journeys · north at top')
d.rectangle((44,142,1556,904),fill='#dce5df')
for y in range(155,901,22):
 pts=[(x,y+2*math.sin(x/35)) for x in range(45,1557,9)];d.line(pts,fill='#cbd8d6')
for poly in G['polygons']:d.polygon(poly,fill=LAND,outline='#67734e',width=3)
contours(d,(300,190,1280,850),G['land'])
for lon in (-64.2,-63.8,-63.4,-63.0,-62.6,-62.2):
 x,_=G['project'](lon,46.3);d.line((x,150,x,891),fill='#c1c8b7');d.text((x,879),str(abs(lon))+'°W',font=SMALL,fill='#65756a',anchor='mm')
for lat in (46.1,46.4,46.7,47.0):
 _,y=G['project'](-63.0,lat);d.line((50,y,1385,y),fill='#c1c8b7');d.text((65,y-13),str(lat)+'°N',font=SMALL,fill='#65756a')
for pts in G['routes'].values():road(d,[(x,H-y) for x,y in pts],4)
for name,dx,dy in [('Avonlea district',-10,-92),('Bright River',-90,45),('White Sands',155,-25),('White Sands Hotel',155,35),('Charlottetown',75,45)]:
 x,y=G['locations'][name];label(d,x,H-y,name.replace(' district',''),dx,dy)
compass(d);footer(d,'Coastline: public-domain Natural Earth. Fictional sites and land travel paths are editorial approximations.');im.save(OUT/'prince-edward-island.png')

# District sheet: red-earth farms, actual navigable tracks and small-scale terrain.
im,d=base('Avonlea and its roads','Interpretive rural topography · relative positions from the novel')
fields(d,(70,170,1490,865));contours(d,(75,165,1500,870))
wood(d,(920,650,1240,825),85);wood(d,(130,650,390,820),65);wood(d,(1300,220,1490,500),60)
stream(d,[(790,590),(720,535),(605,505),(500,455),(370,365),(180,310)],9)
d.polygon([p(x,y) for x,y in [(875,555),(960,575),(1020,555),(1040,510),(1015,455),(955,435),(895,452),(865,500)]],fill=WATER,outline='#668b95',width=3)
road(d,[(360,620),(500,455),(760,560),(800,530),(820,450),(900,470),(1045,500),(1080,610)],8)
road(d,[(500,455),(400,385),(260,320)],7);road(d,[(760,560),(710,480),(720,330),(585,315),(500,270)],7)
road(d,[(760,560),(680,665),(850,700),(930,690)],4);road(d,[(1080,610),(1040,650)],4);road(d,[(1080,610),(1130,510),(1170,420)],4)
for x,y in [(760,560),(500,455),(1080,610),(720,330),(585,315),(500,270),(260,320)]:house(d,x,y)
for x in range(700,811,28):
 for y in range(600,650,25):tree(d,x,y,6)
for x,y,t,dx,dy in [(760,560,'Green Gables',0,-35),(500,455,'Lynde’s Hollow',-10,-35),(1080,610,'Orchard Slope',65,-36),(925,525,'Lake of Shining Waters',170,35),(360,620,'White Way of Delight',0,-35),(720,330,'Avonlea school',45,32),(585,315,'Church',0,-30),(500,270,'Manse',-10,30),(930,690,'Haunted Wood',0,-45),(680,665,'Lover’s Lane',-90,-20),(850,700,'Idlewild',-10,-65),(900,470,'Pond bridge',-10,35),(1040,650,'Diana’s playhouse',80,-65),(260,320,'Carmody',0,40),(1170,420,'Graveyard',30,40)]:label(d,x,y,t,dx,dy)
compass(d);footer(d,'Farms, woods, contours and local distances are interpretive. Roads cross the pond only at the bridge.');im.save(OUT/'avonlea.png')

# Estate sheet: useful top-down plan, keeping the yard outside the house.
im,d=base('Green Gables house and grounds','Interpretive estate plan · upper rooms shown in an inset within the house')
fields(d,(70,180,1450,875));contours(d,(75,165,1500,870))
stream(d,[(60,440),(200,465),(350,420),(480,390)],10)
for x in range(220,470,46):
 for y in range(560,760,46):tree(d,x,y,11)
road(d,[(760,85),(760,270),(700,330),(695,375)],9);road(d,[(700,330),(550,360),(460,470),(410,610)],4)
d.rectangle((530,205,1200,655),fill='#d8c5a1',outline='#5b4d38',width=5)
# Ground-floor rooms use source-consistent marker locations; upstairs is labelled.
for box in [(555,355,760,485),(660,525,820,643),(900,370,1175,620)]:d.rectangle(box,fill='#efe5d1',outline='#9e8963',width=3)
d.rectangle((870,220,1190,342),fill='#e7dbbd',outline='#86724e',width=2);d.line((1035,220,1035,342),fill='#86724e',width=2)
d.text((1030,198),'UPPER ROOMS',font=SMALL,fill=INK,anchor='mm')
house(d,1330,380,175,120)
d.rectangle((650,678,855,775),fill='#d6bd8c',outline='#a38961',width=2)
for x,y,t,dx,dy in [(740,405,'Kitchen',-30,12),(620,570,'Parlour',10,-25),(1120,720,'East gable',0,35),(980,720,'Marilla’s room',0,35),(380,650,'Orchard',-20,95),(760,270,'Farmyard',55,22)]:label(d,x,y,t,dx,dy)
d.text(p(1330,300),'Barn',font=LABEL,fill=INK,anchor='mm');compass(d);footer(d,'The house plan is inferred, not a surveyed historic floor plan. Outdoor contours and fields are interpretive.');im.save(OUT/'green-gables.png')

# City sheet uses the historic harbour-and-square vocabulary without claiming
# fictional Beechwood or the story's Academy has a surveyed street address.
im,d=base('Charlottetown','Interpretive harbour-city plan · story sites are representative placements')
d.rectangle((44,142,1556,904),fill='#dedbbd')
shore=[(44,760),(170,770),(310,795),(520,800),(690,760),(900,770),(1070,810),(1240,865),(1556,850)]
d.polygon(shore+[(1556,904),(44,904)],fill=WATER);d.line(shore,fill='#5e8b96',width=4)
for y in (200,300,390,480,600,700):d.line((90,y,1460,y-18),fill='#b39c72',width=12);d.line((90,y,1460,y-18),fill='#f0e3c6',width=7)
for x in (190,360,520,760,940,1180,1360):d.line((x,165,x-20,755),fill='#b39c72',width=12);d.line((x,165,x-20,755),fill='#f0e3c6',width=7)
for x in range(120,1410,48):
 for y in range(220,731,48):
  if 675<x<850 and 410<y<535:continue
  if random.random()>.15:house(d,x,1000-y,random.randint(15,27),random.randint(12,24))
d.rectangle((680,405,850,535),fill='#c1c99f',outline='#82926e',width=2)
for x in (720,795):tree(d,x,540,9)
for x in (270,470,710,960,1130):d.rectangle((x,760,x+22,850),fill='#92734c',outline='#65543b')
for x,y,t,dx,dy in [(610,720,'Beechwood',0,-35),(760,525,'Queen’s Academy',55,-48),(1120,390,'Exhibition grounds',15,40),(650,610,'Anne’s lodging',-30,30)]:label(d,x,y,t,dx,dy)
compass(d);footer(d,'Harbour-city form inspired by nineteenth-century Charlottetown; addresses and blocks remain interpretive.');im.save(OUT/'charlottetown.png')
print('Rendered four atlas maps with one island projection and land-safe roads.')
