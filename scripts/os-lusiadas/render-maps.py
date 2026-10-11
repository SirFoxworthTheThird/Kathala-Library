"""Deterministic, navigable maritime charts for Os Lusíadas.

Natural Earth 1:10m land polygons and shaded relief are public domain.
Coordinates are WGS84; the projection is equirectangular and each view
has a documented extent.
Markers in the world generator must use bottom-edge y = H - top-edge y.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps
import json
import math
import io
import zipfile

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
DATA = HERE / 'map-source' / 'ne_10m_land.geojson'
OUT = ROOT / 'library' / 'os-lusiadas' / 'maps'
OUT.mkdir(parents=True, exist_ok=True)
FEATURES = json.loads(DATA.read_text(encoding='utf-8'))['features']
Image.MAX_IMAGE_PIXELS = 140_000_000  # audited 16,200 × 8,100 official raster
with zipfile.ZipFile(HERE / 'map-source' / 'SR_LR.zip') as relief_archive:
    RELIEF = Image.open(io.BytesIO(relief_archive.read('SR_LR.tif'))).convert('L')

FONT_SERIF = Path('C:/Windows/Fonts/georgia.ttf')
FONT_SANS = Path('C:/Windows/Fonts/arial.ttf')
def font(path, size):
    return ImageFont.truetype(str(path), size) if path.exists() else ImageFont.load_default()

NAVY=(28,49,63); SEA=(225,239,241); LAND=(232,226,207)
INK=(38,58,68); CREAM=(250,248,239); GOLD=(166,92,54)

MAPS = {
 'ocean': {
  'size':(2048,1280), 'extent':(-28,88,-43,48),
  'title':'THE OCEAN ROAD TO INDIA', 'subtitle':'Atlantic and Indian Ocean · voyage of 1497–1499',
  'places':[
   ('Lisbon',-9.14,38.72,'right'),('Cape Verde',-23.6,15.1,'right'),
   ('St Helena Bay',18.0,-32.75,'left'),('Cape of Good Hope',18.5,-34.36,'right'),
   ('Mozambique',40.73,-15.03,'left'),('Mombasa',39.67,-4.05,'left'),
   ('Melinde',40.12,-3.22,'right'),('Indian Ocean crossing',56,2,'right'),
   ('Atlantic passage',-19,-4,'right'),('Calicut',75.78,11.26,'right'),
   ('Southern trade shore',22.15,-34.18,'right'),('Southern coast',30,-29,'right'),
   ('Suez',32.55,29.97,'right'),('Jeddah',39.18,21.49,'right')],
  'route':[(-9.14,38.72),(-23.6,15.1),(-19,-4),(-6,-23),(13,-35),(18.5,-34.36),(28,-31),(34,-20),(40.73,-15.03),(39.67,-4.05),(40.12,-3.22),(56,2),(75.78,11.26)],
 },
 'iberia': {
  'size':(1700,1300), 'extent':(-12.8,1.6,34.1,44.6),
  'title':'PORTUGAL AND THE TAGUS', 'subtitle':'Departure and remembered kingdoms · approximate historical sites',
  'places':[
   ('Lisbon / Belém',-9.20,38.69,'right'),('Coimbra',-8.43,40.21,'right'),
   ('Ourique',-8.22,37.65,'right'),('Aljubarrota',-8.93,39.57,'left'),
   ('Badajoz',-6.97,38.88,'right'),('Ceuta',-5.32,35.89,'right'),
   ('Porto',-8.61,41.15,'right'),('Guimarães',-8.30,41.44,'right'),
   ('Salado',-5.62,36.10,'right'),('Portuguese heartland',-8.1,39.4,'right'),
   ('Évora',-7.91,38.57,'right'),('Beja',-7.86,38.02,'right'),
   ('Santarém',-8.68,39.24,'right'),('Silves',-8.44,37.19,'right')],
  'route':[],
 },
 'east-africa': {
  'size':(1600,1500), 'extent':(29.5,48.5,-27.5,7.0),
  'title':'THE EAST AFRICAN COAST', 'subtitle':'Ports on the passage toward India',
  'places':[
   ('Sofala',34.89,-20.16,'right'),('Mozambique',40.73,-15.03,'right'),
   ('Kilwa',39.51,-8.96,'right'),('Mombasa',39.67,-4.05,'left'),
   ('Melinde',40.12,-3.22,'right'),('River of good signs',36.89,-17.88,'right')],
  'route':[(34.89,-20.16),(38,-17),(40.73,-15.03),(41,-11),(39.51,-8.96),(40.5,-6),(39.67,-4.05),(40.12,-3.22)],
 },
 'malabar': {
  'size':(1600,1500), 'extent':(68,82,5,21),
  'title':'THE MALABAR APPROACH', 'subtitle':'First Indian landfall and Calicut roadstead',
  'places':[
   ('Calicut',75.78,11.26,'right'),('Cannanore',75.37,11.87,'right'),
   ('Cochin',76.27,9.93,'right')],
  'route':[(69,6),(72,7),(74.8,10.9),(75.55,11.25)],
 },
 'england': {
  'size':(1500,1400), 'extent':(-10.7,6.0,49.2,56.6),
  'title':'ENGLAND AND FLANDERS', 'subtitle':'Veloso’s tale during the Indian Ocean crossing',
  'places':[('English court',-0.13,51.51,'left'),('Channel crossing',-1.0,50.0,'left'),
   ('Flanders',4.4,51.0,'left')],
  'route':[],
 },
}

# Kathala reveals location-marker labels at first appearance. Text burned into
# an image cannot be gated, so static labels are limited to names available
# when the chart first appears in reading mode.
STATIC_LABELS = {
 'ocean':{'Lisbon'},
 'iberia':{'Lisbon / Belém'},
 'east-africa':{'Mozambique'},
 'malabar':set(),
 'england':{'English court'},
}

# Offsets move only typography; the geographic marker remains at its WGS84
# coordinate. These were adjusted after visual inspection of all five charts.
LABEL_OFFSETS = {
 'ocean': {
   'St Helena Bay':(-185,-70),'Cape of Good Hope':(22,9),
   'Mombasa':(-168,-49),'Melinde':(15,5),
 },
 'malabar': {
   'Cannanore':(18,-55),'Calicut':(20,19),
 },
}

def polygons(feature):
    geom=feature['geometry']
    if geom['type']=='Polygon': return [geom['coordinates']]
    if geom['type']=='MultiPolygon': return geom['coordinates']
    return []

def project(lon,lat,extent,size,margin=75):
    west,east,south,north=extent; width,height=size
    return (margin+(lon-west)/(east-west)*(width-2*margin),
            margin+(north-lat)/(north-south)*(height-2*margin))

def terrain_crop(extent,size):
    west,east,south,north=extent
    rw,rh=RELIEF.size
    box=(round((west+180)/360*rw),round((90-north)/180*rh),
         round((east+180)/360*rw),round((90-south)/180*rh))
    gray=RELIEF.crop(box).resize((size[0]-150,size[1]-150),Image.Resampling.LANCZOS)
    return ImageOps.colorize(gray,black=(135,143,126),white=(250,245,224))

def draw_chart(name,spec):
    size=spec['size']; extent=spec['extent']; w,h=size
    im=Image.new('RGB',size,SEA); d=ImageDraw.Draw(im)
    # Ordinary atlas grammar: geographic base, graticule, route, then gated pins.
    west,east,south,north=extent
    lon_step=10 if east-west>40 else (5 if east-west>18 else 2)
    lat_step=10 if north-south>40 else (5 if north-south>18 else 2)
    for lon in range(math.ceil(west/lon_step)*lon_step,math.floor(east/lon_step)*lon_step+1,lon_step):
        x,_=project(lon,south,extent,size)
        d.line((x,66,x,h-66),fill=(194,214,217),width=2)
        d.text((x+7,78),f'{abs(lon)}°'+('W' if lon<0 else 'E'),fill=(91,119,128),font=font(FONT_SANS,20))
    for lat in range(math.ceil(south/lat_step)*lat_step,math.floor(north/lat_step)*lat_step+1,lat_step):
        _,y=project(west,lat,extent,size)
        d.line((30,y,w-30,y),fill=(194,214,217),width=2)
        if 92<y<h-92:
            d.text((29,y-25),f'{abs(lat)}°'+('S' if lat<0 else 'N'),fill=(91,119,128),font=font(FONT_SANS,20))
    mask=Image.new('L',size,0);md=ImageDraw.Draw(mask)
    for feature in FEATURES:
        for poly in polygons(feature):
            outer=[project(lon,lat,extent,size) for lon,lat,*_ in poly[0]]
            if len(outer)>=3:
                md.polygon(outer,fill=255)
                for hole in poly[1:]:
                    inner=[project(lon,lat,extent,size) for lon,lat,*_ in hole]
                    if len(inner)>=3:
                        md.polygon(inner,fill=0)
    terrain=Image.new('RGB',size,LAND)
    terrain.paste(terrain_crop(extent,size),(75,75))
    im.paste(terrain,(0,0),mask);d=ImageDraw.Draw(im)
    for feature in FEATURES:
        for poly in polygons(feature):
            outer=[project(lon,lat,extent,size) for lon,lat,*_ in poly[0]]
            if len(outer)>=3:
                d.line(outer+[outer[0]],fill=(126,145,137),width=2,joint='curve')
                for hole in poly[1:]:
                    inner=[project(lon,lat,extent,size) for lon,lat,*_ in hole]
                    if len(inner)>=3:d.line(inner+[inner[0]],fill=(126,145,137),width=2)
    route=spec['route']
    if route:
        pts=[project(lon,lat,extent,size) for lon,lat in route]
        d.line(pts,fill=CREAM,width=12,joint='curve')
        d.line(pts,fill=GOLD,width=6,joint='curve')
        for i in range(1,len(pts)):
            if i%3:continue
            x1,y1=pts[i-1];x2,y2=pts[i]
            angle=math.atan2(y2-y1,x2-x1)
            a=16
            d.polygon([(x2,y2),(x2-a*math.cos(angle-0.48),y2-a*math.sin(angle-0.48)),(x2-a*math.cos(angle+0.48),y2-a*math.sin(angle+0.48))],fill=GOLD)
    label_font=font(FONT_SANS,27 if w>=1700 else 25)
    for label,lon,lat,side in spec['places']:
        x,y=project(lon,lat,extent,size)
        d.ellipse((x-10,y-10,x+10,y+10),fill=GOLD,outline=CREAM,width=4)
        if label not in STATIC_LABELS[name]: continue
        bbox=d.textbbox((0,0),label,font=label_font)
        tw=bbox[2]-bbox[0]
        override=LABEL_OFFSETS.get(name,{}).get(label)
        tx=x+override[0] if override else (x+15 if side=='right' else x-15-tw)
        ty=y+override[1] if override else y-32
        d.rounded_rectangle((tx-7,ty-4,tx+tw+7,ty+31),radius=5,fill=CREAM,outline=(141,156,149),width=1)
        d.text((tx,ty),label,fill=INK,font=label_font)
    d.rectangle((23,68,w-24,h-68),outline=(151,171,170),width=2)
    d.rectangle((0,0,w,66),fill=NAVY)
    d.text((68,14),spec['title'],fill=CREAM,font=font(FONT_SERIF,36))
    d.rectangle((0,h-64,w,h),fill=CREAM)
    d.line((0,h-64,w,h-64),fill=(151,171,170),width=2)
    d.text((68,h-48),spec['subtitle'],fill=INK,font=font(FONT_SANS,24))
    out=OUT/(name+'.png');im.save(out,optimize=True)
    print(f'{name}: {w} × {h} -> {out}')
    return {label:{'x':round(project(lon,lat,extent,size)[0]),'y':round(h-project(lon,lat,extent,size)[1])} for label,lon,lat,_ in spec['places']}

def draw_schematic(name,title,subtitle,coast,roads,places,visible_labels=None):
    """Interpretive terrain only: these places have no surveyed coordinates."""
    w,h=1600,1400
    im=Image.new('RGB',(w,h),SEA);d=ImageDraw.Draw(im)
    # A repeatable relief field makes the invented layers readable as terrain.
    # Its contour intervals are visual, never claimed elevations.
    sw,sh=400,350
    peaks={
      'island':[(1190,340,1.0,390,270),(650,720,.45,410,360)],
      'divine':[(450,310,1.0,340,300),(700,640,.45,520,440)],
      'calicut-city':[(1280,320,.55,680,500),(1150,900,.22,480,420)],
    }[name]
    vals=[]
    for gy in range(sh):
        row=[]; y=gy*4
        for gx in range(sw):
            x=gx*4
            z=sum(a*math.exp(-((x-cx)/sx)**2-((y-cy)/sy)**2)
                  for cx,cy,a,sx,sy in peaks)
            z+=.015*math.sin(x/48)*math.sin(y/57)
            row.append(max(0,min(1,z)))
        vals.append(row)
    relief=Image.new('RGB',(sw,sh));px=relief.load()
    for gy in range(sh):
        for gx in range(sw):
            z=vals[gy][gx]
            light=(vals[max(gy-1,0)][gx]-vals[min(gy+1,sh-1)][gx])*90
            v=max(-35,min(25,light))
            tone=(int(237-42*z+v),int(232-43*z+v),int(211-42*z+v))
            if gx>0 and gy>0 and (int(z*12)!=int(vals[gy-1][gx]*12) or int(z*12)!=int(vals[gy][gx-1]*12)):
                tone=(157,156,131)
            px[gx,gy]=tuple(max(0,min(255,c)) for c in tone)
    mask=Image.new('L',(w,h),0);ImageDraw.Draw(mask).polygon(coast,fill=255)
    im.paste(relief.resize((w,h),Image.Resampling.BICUBIC),(0,0),mask)
    d=ImageDraw.Draw(im)
    d.line(coast+[coast[0]],fill=(124,112,90),width=4,joint='curve')
    for road in roads:
        d.line(road,fill=(118,102,77),width=14,joint='curve')
        d.line(road,fill=(225,210,176),width=7,joint='curve')
    d.rectangle((23,68,w-24,h-68),outline=(151,171,170),width=2)
    marker_font=font(FONT_SANS,26)
    for label,x,y,dx,dy in places:
        d.ellipse((x-9,y-9,x+9,y+9),fill=GOLD,outline=CREAM,width=2)
        if visible_labels is not None and label not in visible_labels: continue
        tw=d.textbbox((0,0),label,font=marker_font)[2]
        tx=x+dx;ty=y+dy
        d.line((x,y,tx+(0 if dx>0 else tw),ty+15),fill=INK,width=3)
        d.rounded_rectangle((tx-8,ty-4,tx+tw+8,ty+34),radius=5,fill=CREAM,outline=(141,156,149),width=1)
        d.text((tx,ty),label,fill=INK,font=marker_font)
    d.rectangle((0,0,w,66),fill=NAVY)
    d.text((68,12),title,fill=CREAM,font=font(FONT_SERIF,37))
    d.rectangle((0,h-64,w,h),fill=CREAM)
    d.line((0,h-64,w,h-64),fill=(151,171,170),width=2)
    d.text((68,h-48),subtitle,fill=INK,font=font(FONT_SANS,24))
    out=OUT/(name+'.png');im.save(out,optimize=True)
    print(f'{name}: {w} × {h} -> {out}')
    return {label:{'x':x,'y':h-y} for label,x,y,_,_ in places}

def island_coast():
    # A smooth, irregular allegorical shore rather than a geometric polygon.
    return [(round(900+(620+34*math.sin(5*t)+18*math.sin(11*t))*math.cos(t)),
             round(700+(525+23*math.sin(7*t+1)+11*math.sin(13*t))*math.sin(t)))
            for t in (i*2*math.pi/180 for i in range(180))]

def city_coast():
    shore=[(round(490+35*math.sin(y/210)+15*math.sin(y/65)),y)
           for y in range(70,1331,15)]
    return shore+[(1575,1330),(1575,70)]

if __name__=='__main__':
    marker_coords={name:draw_chart(name,spec) for name,spec in MAPS.items()}
    marker_coords['divine']=draw_schematic(
      'divine','DIVINE SETTINGS','Mythic domains in the poem · a conceptual chart',
      [(90,80),(1500,80),(1460,150),(1380,250),(1290,330),(1150,400),(1080,510),
       (950,610),(820,690),(750,800),(650,870),(570,1000),(450,1120),(380,1330),(90,1330)],
      [],
      [('Olympus',450,310,-140,-85),('Council hall',600,350,50,-70),
       ('High air',850,500,55,-70),('Night sky',700,750,-210,20),
       ('Wind quarter',300,980,30,25),('Sea surface',900,760,45,20),
       ('Undersea hall',1130,990,-100,45)],{'Olympus'})
    marker_coords['calicut-city']=draw_schematic(
      'calicut-city','CALICUT IN THE POEM','Narrated places · relative layout, not a surveyed city plan',
      city_coast(),
      [[(510,830),(720,780),(920,720),(1190,540)],[(720,780),(940,975),(1140,1100)],[(920,720),(790,470)]],
      [('Fleet roadstead',260,760,-160,-72),('Landing beach',500,830,-260,30),
       ('Fishing harbor',410,1100,-325,30),('Shrine',790,470,-95,-90),
       ('Official’s lodging',920,720,-140,-100),('Royal court',1190,540,40,-36),
       ('Merchant quarter',940,975,35,-35),('Warehouse',1140,1100,35,-25),
       ('Monçaide’s house',730,1000,-200,30),('City route',900,620,25,-30)],
       {'Fleet roadstead','Landing beach','Fishing harbor'})
    marker_coords['island']=draw_schematic(
      'island','THE ISLAND OF LOVE','Allegorical terrain from the poem · no earthly coordinates',
      island_coast(),
      [[(400,900),(650,800),(820,730),(1040,740)],[(820,730),(930,500),(1190,340)]],
      [('Arrival beach',420,900,-250,42),('Wooded grove',650,800,-210,-86),
       ('Southern path',800,1010,-190,35),('Open terrace',1040,740,35,-40),
       ('Island height',1190,340,-115,-90)])
    (HERE/'map-marker-coordinates.json').write_bytes((json.dumps(marker_coords,indent=2)+'\n').encode('utf-8'))
