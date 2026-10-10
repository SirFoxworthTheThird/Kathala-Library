"""Deterministic, navigable maritime charts for Os Lusíadas.

Natural Earth 1:110m land polygons are public domain. Coordinates are WGS84;
the projection is equirectangular and each view has a documented extent.
Markers in the world generator must use bottom-edge y = H - top-edge y.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import json
import math

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
DATA = HERE / 'map-source' / 'ne_110m_land.geojson'
OUT = ROOT / 'library' / 'os-lusiadas' / 'maps'
OUT.mkdir(parents=True, exist_ok=True)
FEATURES = json.loads(DATA.read_text(encoding='utf-8'))['features']

FONT_SERIF = Path('C:/Windows/Fonts/georgia.ttf')
FONT_SANS = Path('C:/Windows/Fonts/arial.ttf')
def font(path, size):
    return ImageFont.truetype(str(path), size) if path.exists() else ImageFont.load_default()

NAVY=(27,49,61); SEA=(38,65,74); LAND=(201,188,155)
INK=(41,54,56); CREAM=(241,230,205); GOLD=(177,131,70)

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
  'route':[(69,6),(72,7),(75.27,12.02),(75.72,11.40),(75.78,11.26)],
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

def draw_chart(name,spec):
    size=spec['size']; extent=spec['extent']; w,h=size
    im=Image.new('RGB',size,SEA); d=ImageDraw.Draw(im)
    # Restrained stipple and graticule: decoration never replaces coastline.
    for y in range(0,h,7):
        d.line((0,y,w,y),fill=(40,68,77),width=1)
    west,east,south,north=extent
    lon_step=10 if east-west>40 else (5 if east-west>18 else 2)
    lat_step=10 if north-south>40 else (5 if north-south>18 else 2)
    for lon in range(math.ceil(west/lon_step)*lon_step,math.floor(east/lon_step)*lon_step+1,lon_step):
        x,_=project(lon,south,extent,size)
        d.line((x,60,x,h-60),fill=(60,83,89),width=2)
    for lat in range(math.ceil(south/lat_step)*lat_step,math.floor(north/lat_step)*lat_step+1,lat_step):
        _,y=project(west,lat,extent,size)
        d.line((60,y,w-60,y),fill=(60,83,89),width=2)
    for feature in FEATURES:
        for poly in polygons(feature):
            outer=[project(lon,lat,extent,size) for lon,lat,*_ in poly[0]]
            if len(outer)>=3:
                d.polygon(outer,fill=LAND)
                d.line(outer+[outer[0]],fill=(124,112,90),width=3,joint='curve')
    route=spec['route']
    if route:
        pts=[project(lon,lat,extent,size) for lon,lat in route]
        d.line(pts,fill=(16,44,54),width=12,joint='curve')
        d.line(pts,fill=GOLD,width=5,joint='curve')
        for i in range(1,len(pts)):
            if i%3:continue
            x1,y1=pts[i-1];x2,y2=pts[i]
            angle=math.atan2(y2-y1,x2-x1)
            a=16
            d.polygon([(x2,y2),(x2-a*math.cos(angle-0.48),y2-a*math.sin(angle-0.48)),(x2-a*math.cos(angle+0.48),y2-a*math.sin(angle+0.48))],fill=GOLD)
    label_font=font(FONT_SANS,27 if w>=1700 else 25)
    for label,lon,lat,side in spec['places']:
        x,y=project(lon,lat,extent,size)
        d.ellipse((x-8,y-8,x+8,y+8),fill=GOLD,outline=CREAM,width=2)
        if label not in STATIC_LABELS[name]: continue
        bbox=d.textbbox((0,0),label,font=label_font)
        tw=bbox[2]-bbox[0]
        override=LABEL_OFFSETS.get(name,{}).get(label)
        tx=x+override[0] if override else (x+15 if side=='right' else x-15-tw)
        ty=y+override[1] if override else y-32
        d.rounded_rectangle((tx-7,ty-4,tx+tw+7,ty+31),radius=5,fill=(31,54,62))
        d.text((tx,ty),label,fill=CREAM,font=label_font)
    d.rectangle((23,68,w-24,h-68),outline=GOLD,width=2)
    d.rectangle((0,0,w,62),fill=NAVY)
    d.text((68,12),spec['title'],fill=CREAM,font=font(FONT_SERIF,37))
    d.rectangle((0,h-58,w,h),fill=NAVY)
    d.text((68,h-46),spec['subtitle'],fill=(217,198,160),font=font(FONT_SANS,25))
    out=OUT/(name+'.png');im.save(out,optimize=True)
    print(f'{name}: {w} × {h} -> {out}')
    return {label:{'x':round(project(lon,lat,extent,size)[0]),'y':round(h-project(lon,lat,extent,size)[1])} for label,lon,lat,_ in spec['places']}

def draw_schematic(name,title,subtitle,coast,roads,places,visible_labels=None):
    """Narrated relative movement only; no surveying or geodetic claim."""
    w,h=1600,1400
    im=Image.new('RGB',(w,h),SEA);d=ImageDraw.Draw(im)
    for y in range(0,h,7): d.line((0,y,w,y),fill=(40,68,77),width=1)
    d.polygon(coast,fill=LAND)
    d.line(coast+[coast[0]],fill=(124,112,90),width=4,joint='curve')
    for road in roads:
        d.line(road,fill=(118,102,77),width=14,joint='curve')
        d.line(road,fill=(225,210,176),width=7,joint='curve')
    d.rectangle((23,68,w-24,h-68),outline=GOLD,width=2)
    marker_font=font(FONT_SANS,26)
    for label,x,y,dx,dy in places:
        d.ellipse((x-9,y-9,x+9,y+9),fill=GOLD,outline=CREAM,width=2)
        if visible_labels is not None and label not in visible_labels: continue
        tw=d.textbbox((0,0),label,font=marker_font)[2]
        tx=x+dx;ty=y+dy
        d.line((x,y,tx+(0 if dx>0 else tw),ty+15),fill=INK,width=3)
        d.rounded_rectangle((tx-8,ty-4,tx+tw+8,ty+34),radius=5,fill=NAVY)
        d.text((tx,ty),label,fill=CREAM,font=marker_font)
    d.rectangle((0,0,w,62),fill=NAVY)
    d.text((68,12),title,fill=CREAM,font=font(FONT_SERIF,37))
    d.rectangle((0,h-58,w,h),fill=NAVY)
    d.text((68,h-46),subtitle,fill=(217,198,160),font=font(FONT_SANS,25))
    out=OUT/(name+'.png');im.save(out,optimize=True)
    print(f'{name}: {w} × {h} -> {out}')
    return {label:{'x':x,'y':h-y} for label,x,y,_,_ in places}

if __name__=='__main__':
    marker_coords={name:draw_chart(name,spec) for name,spec in MAPS.items()}
    marker_coords['divine']=draw_schematic(
      'divine','DIVINE SETTINGS','Mythic domains in the poem · a conceptual chart',
      [(130,160),(390,115),(650,210),(850,150),(1160,260),(1470,430),(1440,1150),(1190,1270),(650,1190),(220,1270),(100,900)],
      [[(450,310),(600,350),(850,500)],[(850,500),(900,760),(1130,990)],[(450,310),(300,980)]],
      [('Olympus',450,310,-140,-85),('Council hall',600,350,50,-70),
       ('High air',850,500,55,-70),('Night sky',700,750,-210,20),
       ('Wind quarter',300,980,30,25),('Sea surface',900,760,45,20),
       ('Undersea hall',1130,990,-100,45)],{'Olympus'})
    marker_coords['calicut-city']=draw_schematic(
      'calicut-city','CALICUT IN THE POEM','Narrated places · relative layout, not a surveyed city plan',
      [(430,65),(520,200),(480,390),(540,600),(490,860),(570,1100),(540,1335),(1575,1335),(1575,65)],
      [[(510,830),(720,780),(920,720),(1190,540)],[(720,780),(940,975),(1140,1100)],[(920,720),(790,470)]],
      [('Fleet roadstead',260,760,-160,-72),('Landing beach',500,830,-260,30),
       ('Fishing harbor',480,1100,-325,30),('Shrine',790,470,-95,-90),
       ('Official’s lodging',920,720,-140,-100),('Royal court',1190,540,40,-36),
       ('Merchant quarter',940,975,35,-35),('Warehouse',1140,1100,35,-25),
       ('Monçaide’s house',730,1000,-200,30),('City route',900,620,25,-30)],
       {'Fleet roadstead','Landing beach','Fishing harbor'})
    marker_coords['island']=draw_schematic(
      'island','THE ISLAND OF LOVE','Allegorical terrain from the poem · no earthly coordinates',
      [(440,250),(650,170),(920,230),(1180,160),(1410,300),(1510,530),(1480,880),(1360,1130),(1000,1240),(690,1170),(410,1050),(270,800),(300,520)],
      [[(400,900),(650,800),(820,730),(1040,740)],[(820,730),(930,500),(1190,340)]],
      [('Arrival beach',420,900,-250,42),('Wooded grove',650,800,-210,-86),
       ('Southern path',800,1010,-190,35),('Open terrace',1040,740,35,-40),
       ('Island height',1190,340,-115,-90)])
    (HERE/'map-marker-coordinates.json').write_text(json.dumps(marker_coords,indent=2)+'\n',encoding='utf-8')
