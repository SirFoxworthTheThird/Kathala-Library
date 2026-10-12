import json, math, runpy
from pathlib import Path
HERE=Path(__file__).parent;G=runpy.run_path(str(HERE/'map-geometry.py'))
world=json.loads((HERE.parents[1]/'library/anne-of-green-gables.pwk').read_text(encoding='utf8'))
for marker in world['locationMarkers']:
 if marker['mapLayerId']=='anne-map-island':
  x,y=round(marker['x']),round(1000-marker['y'])
  assert G['land'].getpixel((x,y))==255,f"Offshore marker: {marker['name']}"
for route in world['mapRoutes']:
 if route['mapLayerId']=='anne-map-island':
  points=[(r['x'],1000-r['y']) for r in route['waypoints']]
  assert all(G['on_land'](a,b) for a,b in zip(points,points[1:])),f"Road crosses water: {route['name']}"
for point in [(650,350),(520,390),(1110,440)]:
 # The old offshore pins must fail the very same land test.
 assert G['land'].getpixel(point)==0,'Negative control no longer represents offshore water'
print('PASS: all six island markers on land; all three road paths sampled entirely on land; old offshore negative controls rejected.')
