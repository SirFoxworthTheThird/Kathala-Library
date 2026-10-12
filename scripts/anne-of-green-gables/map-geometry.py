"""One projection for coastline, story pins and land-constrained travel paths."""
import json, math, heapq
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

HERE=Path(__file__).parent
feature=json.loads((HERE/'map-source/pei-natural-earth.geojson').read_text(encoding='utf8'))['features'][0]
coords=feature['geometry']['coordinates']
rings=coords if isinstance(coords[0][0][0],(int,float)) else [r for poly in coords for r in poly]
flat=[p for ring in rings for p in ring]
minx,maxx=min(p[0] for p in flat),max(p[0] for p in flat)
miny,maxy=min(p[1] for p in flat),max(p[1] for p in flat)
# Longitude degrees shrink with latitude. This local equirectangular
# projection uses the island's central latitude to preserve physical aspect.
coslat=math.cos(math.radians((miny+maxy)/2))
scale=min(1400/((maxx-minx)*coslat),620/(maxy-miny))
origin_x=(1600-(maxx-minx)*coslat*scale)/2
def project(lon,lat):return (origin_x+(lon-minx)*coslat*scale,820-(lat-miny)*scale)
land=Image.new('L',(1600,1000)); draw=ImageDraw.Draw(land)
polygons=[[project(*p) for p in ring] for ring in rings]
for poly in polygons:draw.polygon(poly,fill=255)
safe=land.filter(ImageFilter.MinFilter(9))
def interior(lon,lat):
 x,y=project(lon,lat); x,y=round(x),round(y)
 if safe.getpixel((x,y))==255:return x,y
 for radius in range(1,65):
  candidates=[(x+dx,y+dy) for dx in range(-radius,radius+1) for dy in (-radius,radius)]+[(x+dx,y+dy) for dy in range(-radius+1,radius) for dx in (-radius,radius)]
  valid=[q for q in candidates if 0<=q[0]<1600 and 0<=q[1]<1000 and safe.getpixel(q)==255]
  if valid:return min(valid,key=lambda q:(q[0]-x)**2+(q[1]-y)**2)
 raise ValueError('Requested story point is not close to island land')
locations={
 'Avonlea district':interior(-63.374,46.475),
 'Bright River':interior(-63.510,46.425),
 'White Sands':interior(-63.275,46.475),
 'White Sands Hotel':interior(-63.278,46.478),
 'Charlottetown':interior(-63.1311,46.2382),
 'Prince Edward Island':interior(-63.500,46.380),
}
def on_land(a,b):
 n=max(1,math.ceil(math.dist(a,b)))
 return all(safe.getpixel((round(a[0]+(b[0]-a[0])*i/n),round(a[1]+(b[1]-a[1])*i/n)))==255 for i in range(n+1))
def path(a,b):
 # A* explores pixels, so a road cannot shortcut a coastal bay or inlet.
 queue=[(math.dist(a,b),0,a)]; previous={a:None}; costs={a:0}
 while queue:
  _,cost,u=heapq.heappop(queue)
  if cost!=costs[u]:continue
  if u==b:break
  for dx,dy in ((1,0),(-1,0),(0,1),(0,-1),(1,1),(-1,1),(1,-1),(-1,-1)):
   v=u[0]+dx,u[1]+dy
   if not (0<=v[0]<1600 and 0<=v[1]<1000):continue
   if safe.getpixel(v)!=255 or safe.getpixel((u[0]+dx,u[1]))!=255 or safe.getpixel((u[0],u[1]+dy))!=255:continue
   nc=cost+math.hypot(dx,dy)
   if nc<costs.get(v,float('inf')):costs[v]=nc;previous[v]=u;heapq.heappush(queue,(nc+math.dist(v,b),nc,v))
 if b not in previous:raise ValueError('No land path')
 points=[];u=b
 while u is not None:points.append(u);u=previous[u]
 points.reverse();reduced=[points[0]];i=0
 while i<len(points)-1:
  j=len(points)-1
  while j>i+1 and not on_land(points[i],points[j]):j-=1
  reduced.append(points[j]);i=j
 return reduced
routes={
 'bright-river-road':path(locations['Bright River'],locations['Avonlea district']),
 'white-sands-road':path(locations['Avonlea district'],locations['White Sands']),
 'charlottetown-road':path(locations['Avonlea district'],locations['Charlottetown']),
}
geometry={'projection':{'centralLatitude':(miny+maxy)/2,'longitudeScale':coslat,'scale':scale,'originTop':[origin_x,820]},'locations':{k:{'x':x,'y':1000-y} for k,(x,y) in locations.items()},'routes':{k:[{'x':x,'y':1000-y} for x,y in ps] for k,ps in routes.items()}}
(HERE/'map-geometry.json').write_bytes((json.dumps(geometry,ensure_ascii=False,indent=2)+'\n').encode('utf8'))
if __name__=='__main__':print('Projected six island markers and three entirely on-land routes.')
