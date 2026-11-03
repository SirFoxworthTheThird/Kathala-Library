"""Reproducible regional reference terrain, not a medieval boundary survey.
Run with numpy 2.3.4 / matplotlib 3.10.7. Inputs are retained alongside this file.
"""
import csv
import json
from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.colors import LinearSegmentedColormap, LightSource
import numpy as np

HERE = Path(__file__).resolve().parent
OUT = HERE / 'map-originals'
OUT.mkdir(exist_ok=True)
plt.rcParams.update({'font.family': 'DejaVu Sans', 'svg.hashsalt': 'ivanhoe-region-v1'})
with (HERE / 'map-source/etopo1-region.csv').open() as stream:
    rows = list(csv.reader(stream))[2:]
values = np.array([[float(v) for v in r] for r in rows if len(r) == 3])
lats = np.unique(values[:, 0])
lons = np.unique(values[:, 1])
terrain = np.full((len(lats), len(lons)), np.nan)
terrain[np.searchsorted(lats, values[:, 0]), np.searchsorted(lons, values[:, 1])] = values[:, 2]
assert np.isfinite(terrain).all()
fig = plt.figure(figsize=(16, 14), dpi=100, facecolor='#f2ead7')
ax = fig.add_axes([.05, .07857143, .5625, .82857143])
cmap = LinearSegmentedColormap.from_list('terrain', ['#d9e3bb', '#c1cf9c', '#a9b782', '#a49d77', '#cec4ab', '#eee9da'])
rgb = LightSource(azdeg=315, altdeg=45).shade(terrain, cmap=cmap, vert_exag=1, dx=1100, dy=1850, vmin=0, vmax=650, blend_mode='soft')
ax.imshow(rgb, origin='lower', extent=[lons[0], lons[-1], lats[0], lats[-1]], aspect='auto', interpolation='bilinear')
ax.contour(lons, lats, terrain, levels=[100, 200, 300, 400, 500, 600], colors='#736b53', linewidths=.35, alpha=.4)
for filename in ['natural-earth-rivers-main.geojson', 'natural-earth-rivers-europe.geojson']:
    data = json.loads((HERE / 'map-source' / filename).read_text(encoding='utf-8'))
    for feature in data['features']:
        geom = feature['geometry']
        if not geom or geom['type'] not in ('LineString', 'MultiLineString'):
            continue
        lines = [geom['coordinates']] if geom['type'] == 'LineString' else geom['coordinates']
        for line in lines:
            xy = np.array(line)[:, :2]
            if ((xy[:, 0] >= -2.6) & (xy[:, 0] <= -.4) & (xy[:, 1] >= 52.5) & (xy[:, 1] <= 54.2)).any():
                ax.plot(xy[:, 0], xy[:, 1], color='#497c99', lw=1.4, clip_on=True)
# Author-generalised Don course through named settlements. Not surveyed meanders.
don = np.array([[-1.76,53.52],[-1.63,53.48],[-1.56,53.44],[-1.47,53.39],[-1.41,53.42],[-1.35,53.43],[-1.29,53.49],[-1.23,53.48],[-1.13,53.52],[-1.03,53.60],[-.87,53.66]])
ax.plot(don[:, 0], don[:, 1], color='#356f92', lw=2, linestyle=(0,(4,2)))
ax.text(-1.12,53.58,'Don',color='#285f80',fontsize=12,rotation=25)
ax.text(-2.19,53.65,'PENNINE\nUPLANDS',color='#625c43',fontsize=15,ha='center',linespacing=1.6)
ax.text(-1.65,52.94,'MIDLANDS',color='#625c43',fontsize=15,ha='center')
for name,lon,lat,dx,dy in [('York',-1.083333,53.95,8,8),('Ashby',-1.476111,52.746111,8,8),('Coningsburgh',-1.22606,53.4843,8,-18),('Sheffield',-1.470278,53.380833,-70,-16),('Doncaster',-1.1325,53.522778,8,8)]:
    ax.plot(lon,lat,marker='o',ms=3,color='#4a3527')
    ax.annotate(name,(lon,lat),xytext=(dx,dy),textcoords='offset points',fontsize=12,color='#3b3024')
ax.set(xlim=(-2.6,-.4),ylim=(52.5,54.2),xlabel='Longitude (negative = west)',ylabel='Latitude north')
ax.tick_params(labelsize=9,colors='#685f4d')
for spine in ax.spines.values():
    spine.set_color('#857451')
fig.text(.05,.945,'YORKSHIRE & THE MIDLANDS',fontsize=27,color='#392e22',weight='bold')
fig.text(.05,.918,'Regional relief reference for Ivanhoe',fontsize=15,color='#61533e')
fig.text(.67,.86,'READING THE TERRAIN',fontsize=17,color='#392e22',weight='bold')
fig.text(.67,.82,'Lowland green → upland stone\nContours every 100 metres\nBlue: generalised waterways\nDashed blue: schematic Don',va='top',fontsize=13,linespacing=1.7,color='#514b3c')
fig.text(.67,.65,'RELIEF, NOT A PERIOD SURVEY',fontsize=14,color='#392e22',weight='bold')
fig.text(.67,.615,'Modern elevation describes the land.\nRiver courses are generalised.\nNo precise medieval forest limits,\nroads or political borders are claimed.',va='top',fontsize=12,linespacing=1.7,color='#514b3c')
fig.text(.67,.51,'UNLOCATED STORY SITES',fontsize=16,color='#392e22',weight='bold')
fig.text(.67,.475,'Gateway index — positions below\nare not geographic coordinates.\nNames appear in the application.',va='top',fontsize=12,linespacing=1.6,color='#514b3c')
for y in [.38,.305,.23,.155,.08]:
    fig.add_artist(plt.Line2D([.68,.94],[y,y],transform=fig.transFigure,color='#baa985',lw=1))
fig.text(.05,.026,'Terrain: NOAA ETOPO1 • Rivers: Natural Earth (public domain) • Don: author-generalised settlement sequence',fontsize=10,color='#61533e')
fig.savefig(OUT/'england.png',dpi=100,facecolor=fig.get_facecolor())
fig.savefig(OUT/'england.svg',metadata={'Date':None},facecolor=fig.get_facecolor())
print('Rendered england.png and england.svg, 1600 × 1400')


