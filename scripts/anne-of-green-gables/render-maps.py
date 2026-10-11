import json, math, random
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT=Path(__file__).resolve().parents[2]; OUT=ROOT/'library'/'anne-of-green-gables'/'maps'; OUT.mkdir(parents=True,exist_ok=True)
W,H=1600,1000; TITLE=ImageFont.truetype('C:/Windows/Fonts/georgiab.ttf',44); SUB=ImageFont.truetype('C:/Windows/Fonts/georgiai.ttf',20); LABEL=ImageFont.truetype('C:/Windows/Fonts/georgiab.ttf',19); SMALL=ImageFont.truetype('C:/Windows/Fonts/georgia.ttf',17); TINY=ImageFont.truetype('C:/Windows/Fonts/georgia.ttf',14)
INK='#3d3024'; WATER='#6e98a4'; LAND='#a7b27a'; PAPER='#eadfc5'
def p(x,bottom_y): return x,H-bottom_y
def base(title,subtitle):
 random.seed(title); im=Image.new('RGB',(W,H),PAPER); d=ImageDraw.Draw(im)
 for _ in range(16000):
  x,y=random.randrange(W),random.randrange(H); d.point((x,y),fill=random.choice(('#e6d9bc','#efe6d1','#dfd0af')))
 d.rounded_rectangle((22,22,W-22,H-22),8,outline='#6e5a3d',width=4); d.rounded_rectangle((31,31,W-31,H-31),6,outline='#b29768',width=1)
 d.rectangle((42,42,W-42,112),fill='#e5d7b8',outline='#9c835c',width=2); d.text((65,49),title,font=TITLE,fill=INK); d.text((67,93),subtitle,font=SUB,fill='#6c5840'); return im,d
def finish(d,note,scale):
 d.line((55,906,W-55,906),fill='#9c835c',width=2); d.text((65,922),note,font=SMALL,fill='#574633'); box=d.textbbox((0,0),scale,font=TINY); d.text((W-68-box[2],926),scale,font=TINY,fill='#756044')
def compass(d,x=1460,y=170):
 d.ellipse((x-35,y-35,x+35,y+35),outline='#806947',width=2); d.polygon([(x,y-44),(x-8,y+7),(x,y),(x+8,y+7)],fill=INK); d.line((x-28,y,x+28,y),fill='#806947',width=2); d.text((x-7,y-68),'N',font=LABEL,fill=INK)
def label(d,xy,text,anchor='mm'):
 x,y=xy; box=d.textbbox((x,y),text,font=LABEL,anchor=anchor); d.rounded_rectangle((box[0]-8,box[1]-5,box[2]+8,box[3]+5),7,fill='#f2ead7',outline='#a58c64'); d.text((x,y),text,font=LABEL,fill=INK,anchor=anchor)
def pin(d,x,bottom_y,text,dx=0,dy=-26):
 x,y=p(x,bottom_y); d.ellipse((x-8,y-8,x+8,y+8),fill='#7f3129',outline='#f5edd8',width=3); label(d,(x+dx,y+dy),text)
def road(d,points,width=11):
 pts=[p(x,y) for x,y in points]; d.line(pts,fill='#734131',width=width+5,joint='curve'); d.line(pts,fill='#d3a66b',width=width,joint='curve'); d.line(pts,fill='#edd0a0',width=max(2,width//3),joint='curve')
def contour(d,cx,bottom_y,rx,ry,count=4):
 cy=H-bottom_y
 for i in range(count):
  pts=[]
  for deg in range(0,361,5):
   a=math.radians(deg); wobble=1+.035*math.sin(a*5+i*1.7); pts.append((cx+math.cos(a)*(rx+i*15)*wobble,cy+math.sin(a)*(ry+i*10)*wobble))
  d.line(pts,fill='#aa986f',width=2)
def tree(d,x,bottom_y,s=1):
 x,y=p(x,bottom_y); d.rectangle((x-3*s,y,x+3*s,y+18*s),fill='#685338'); d.ellipse((x-15*s,y-26*s,x+15*s,y+8*s),fill='#617749',outline='#3f5438')
def building(d,x,bottom_y,w,h,fill='#c2a676'):
 x,y=p(x,bottom_y); d.rectangle((x-w/2,y-h/2,x+w/2,y+h/2),fill=fill,outline='#594a35',width=3); d.line((x-w/2,y,x+w/2,y),fill='#8c734e',width=2)

# Geographic island overview using the archived Natural Earth coastline.
im,d=base('Prince Edward Island','A geographic overview of Anne’s island journeys')
for x in range(140,1500,180): d.line((x,145,x,875),fill='#d2c29f')
for y in range(175,876,110): d.line((80,y,1520,y),fill='#d2c29f')
data=json.loads((Path(__file__).parent/'map-source'/'pei-natural-earth.geojson').read_text(encoding='utf8')); coords=data['features'][0]['geometry']['coordinates']; rings=coords if isinstance(coords[0][0][0],(int,float)) else [ring for poly in coords for ring in poly]
flat=[pt for ring in rings for pt in ring]; xs=[pt[0] for pt in flat]; ys=[pt[1] for pt in flat]; minx,maxx,miny,maxy=min(xs),max(xs),min(ys),max(ys); scale=min(1400/(maxx-minx),590/(maxy-miny))
def project(pt): return 100+(pt[0]-minx)*scale,790-(pt[1]-miny)*scale
for ring in rings: d.polygon([project(pt) for pt in ring],fill=LAND,outline='#43543b',width=5)
for x,y,ang in [(300,560,-18),(430,520,-22),(570,480,-12),(740,455,-16),(910,425,-10),(1080,390,-18),(1240,360,-12)]:
 for j in range(-3,4):
  yy=y+j*9; d.line((x-24,yy,x+24,yy+math.tan(math.radians(ang))*48),fill='#6e7b50',width=2)
road(d,[(520,610),(650,650),(940,405)],8); road(d,[(650,650),(1110,560)],7)
pin(d,650,650,'Avonlea',0,-34); pin(d,520,610,'Bright River',-18,35); pin(d,940,405,'Charlottetown',20,-34); pin(d,1110,560,'White Sands',35,34); compass(d)
finish(d,'Natural Earth coastline; fictional communities and travel lines are interpretive.','ISLAND OVERVIEW · NORTH AT TOP'); im.save(OUT/'prince-edward-island.png')

# Fictional Avonlea rendered as a useful rural topographic sheet.
im,d=base('Avonlea and its roads','An interpretive topographic map reconstructed from the novel')
for cx,cy,rx,ry in [(250,700,130,55),(470,760,120,45),(1180,720,170,65),(1260,300,150,60),(350,260,125,48)]: contour(d,cx,cy,rx,ry)
for box in [(80,180,330,360),(360,150,620,330),(1040,150,1370,350),(1180,620,1510,850),(120,610,390,840)]:
 d.rectangle(box,outline='#b7a478',width=2)
 for y in range(box[1]+18,box[3],22): d.line((box[0]+8,y,box[2]-8,y),fill='#d1c096')
d.ellipse((820,360,1040,520),fill=WATER,outline='#486f78',width=4); d.line([(120,820),(300,760),(500,690),(680,610),(820,500)],fill='#4f7f8e',width=14,joint='curve')
road(d,[(360,620),(500,455),(760,560),(925,525),(1080,610)],12); road(d,[(760,560),(720,330)],10); road(d,[(720,330),(585,315),(500,270)],8); road(d,[(760,560),(680,665),(850,700),(930,690)],8); road(d,[(925,525),(900,470),(1040,650)],7)
for x,y in [(1180,735),(1220,690),(1280,750),(1320,700),(1380,760),(1120,690)]: tree(d,x,y,.85)
for x,y,t,dx,dy in [(760,560,'Green Gables',0,-38),(500,455,'Lynde’s Hollow',-35,36),(1080,610,'Orchard Slope',35,-34),(925,525,'Lake of Shining Waters',60,42),(360,620,'White Way of Delight',0,-35),(720,330,'Avonlea school',30,34),(930,690,'Haunted Wood',45,-30)]: pin(d,x,y,t,dx,dy)
compass(d); finish(d,'Relative roads, water, farms and woods follow the story; distances are editorial.','FICTIONAL DISTRICT · NORTH AT TOP'); im.save(OUT/'avonlea.png')

# Green Gables estate plan; room, orchard and yard features align to overlay pins.
im,d=base('Green Gables house and grounds','A late nineteenth-century estate plan inferred from the novel')
for cx,cy,rx,ry in [(250,760,130,45),(1330,760,150,52),(1280,260,160,55),(300,220,150,50)]: contour(d,cx,cy,rx,ry,3)
for x,y in [(250,700),(320,690),(380,650),(430,720),(300,610),(465,630),(200,620),(420,585)]: tree(d,x,y,.9)
d.line([(70,770),(220,740),(350,775),(500,720)],fill=WATER,width=15,joint='curve'); road(d,[(760,80),(760,270),(700,360),(680,470)],10)
d.polygon([(520,220),(1185,220),(1185,760),(520,760)],fill='#c7ab79',outline='#4b3d2c',width=7); d.polygon([(520,220),(850,145),(1185,220)],fill='#776548',outline='#4b3d2c'); d.line((850,220,850,760),fill='#6c573b',width=4); d.line((520,500,1185,500),fill='#6c573b',width=4)
d.rectangle((600,520,805,690),outline='#8f744e',width=3); d.rectangle((895,245,1145,430),outline='#8f744e',width=3); d.rectangle((535,250,815,470),outline='#8f744e',width=3); d.rectangle((1240,610,1450,790),fill='#a98454',outline='#4b3d2c',width=5)
for x in range(610,930,55): d.line((x,745,x+40,770),fill='#cfbd91',width=2)
for x,y,t,dx,dy in [(740,405,'Kitchen',-45,0),(620,570,'Parlour',0,-35),(1120,720,'East gable',0,-35),(380,650,'Orchard',-30,-35),(760,270,'Farmyard',0,38)]: pin(d,x,y,t,dx,dy)
label(d,p(1345,700),'Barn'); compass(d); finish(d,'House, orchard, brook and farmyard are interpretive; pins align to Kathala coordinates.','ESTATE PLAN · NORTH AT TOP'); im.save(OUT/'green-gables.png')

# Charlottetown harbour plan with story sites aligned to their overlay pins.
im,d=base('Charlottetown','Historic harbour city and the novel’s story locations')
d.polygon([(0,760),(170,745),(360,785),(550,750),(760,800),(960,770),(1180,825),(1390,790),(1600,820),(1600,1000),(0,1000)],fill=WATER); d.line([(0,760),(170,745),(360,785),(550,750),(760,800),(960,770),(1180,825),(1390,790),(1600,820)],fill='#395f69',width=5)
streets_y=[190,315,450,585,705]; streets_x=[170,360,565,760,965,1180,1380]
for y in streets_y: d.line((90,y,1510,y+random.randint(-12,12)),fill='#9f8a65',width=9)
for x in streets_x: d.line((x,150,x+random.randint(-18,18),760),fill='#9f8a65',width=9)
for ix in range(len(streets_x)-1):
 for iy in range(len(streets_y)-1):
  if (ix+iy)%2: building(d,(streets_x[ix]+streets_x[ix+1])//2,H-(streets_y[iy]+streets_y[iy+1])//2,105,54)
for x in (260,470,720,1000,1310): d.line((x,730,x+20,845),fill='#765f42',width=8)
for x,y,t,dx,dy in [(610,720,'Beechwood',0,-34),(760,525,'Queen’s Academy',45,-36),(1120,390,'Exhibition grounds',40,-34)]: pin(d,x,y,t,dx,dy)
label(d,(1290,860),'Hillsborough Harbour'); compass(d); finish(d,'Shoreline and street pattern are approximate; story-site pins align to Kathala coordinates.','CITY PLAN · NORTH AT TOP'); im.save(OUT/'charlottetown.png')
print('Rendered four period-inspired topographic maps at 1600 × 1000.')
