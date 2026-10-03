import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const bookPath = path.join(root, 'library/the-wonderful-wizard-of-oz.pwk');
const book = JSON.parse(fs.readFileSync(bookPath, 'utf8'));

const newMaps = [
  ['oz-map-eastern-road', 'oz-image-map-eastern-road', 'The Eastern Road', 'The route from Munchkin Country through the woods, two ditches, river and poppy field toward the Emerald City.', 'eastern-road.jpg'],
  ['oz-map-southern-road', 'oz-image-map-southern-road', 'The Road South to Glinda', 'Dorothy’s road from the fighting trees through the China Country, marshes, forest and Hammer-Heads to Glinda.', 'southern-road.jpg'],
];
const parent = book.mapLayers.find((layer) => layer.id === 'oz-map-oz');
const sourceBlob = book.blobs.find((blob) => blob.id === parent.imageId);
for (const [id, imageId, name, description, filename] of newMaps) {
  if (!book.mapLayers.some((layer) => layer.id === id)) {
    book.mapLayers.push({ ...parent, id, parentMapId: parent.id, name, description, imageId, imageWidth: 1672, imageHeight: 941 });
  }
  if (!book.blobs.some((blob) => blob.id === imageId)) {
    book.blobs.push({ ...sourceBlob, id: imageId, url: `library/the-wonderful-wizard-of-oz/maps/generated/${filename}`, mimeType: 'image/jpeg' });
  }
}
for (const id of ['oz-map-china-country', 'oz-map-glinda-castle']) {
  book.mapLayers.find((layer) => layer.id === id).parentMapId = 'oz-map-southern-road';
}
book.locationMarkers.find((marker) => marker.id === 'oz-location-landing-site').linkedMapLayerId = 'oz-map-eastern-road';
book.locationMarkers.find((marker) => marker.id === 'oz-location-fighting-trees').linkedMapLayerId = 'oz-map-southern-road';

// Pixel positions on nine painted 1672 × 941 maps. These follow the landmarks
// visible in the finished art rather than the earlier schematic SVG geometry.
const positions = {
  'oz-map-oz': {
    'oz-location-landing-site': [1440, 411],
    'oz-location-emerald-city': [830, 347],
    'oz-location-west-country': [265, 468],
    'oz-location-yellow-castle': [350, 348],
    'oz-location-fighting-trees': [750, 574],
  },
  'oz-map-eastern-road': {
    'oz-location-boq-house': [1544, 243],
    'oz-location-cornfield': [1560, 365],
    'oz-location-forest-road': [1370, 481],
    'oz-location-woodman-cottage': [945, 355],
    'oz-location-lion-road': [1260, 465],
    'oz-location-night-camp': [1080, 371],
    'oz-location-first-gulf': [1320, 552],
    'oz-location-kalidah-gulf': [1130, 540],
    'oz-location-river-crossing': [655, 472],
    'oz-location-poppy-field': [249, 378],
    'oz-location-mice-field': [260, 650],
    'oz-location-green-farmhouse': [112, 172],
  },
  'oz-map-southern-road': {
    'oz-location-china-country': [595, 170],
    'oz-location-marshes': [870, 342],
    'oz-location-great-forest': [496, 493],
    'oz-location-hammerhead-hill': [1164, 537],
    'oz-location-quadling-farm': [350, 762],
    'oz-location-glinda-castle': [1450, 734],
  },
  'oz-map-kansas': {
    'oz-location-kansas-farmhouse': [390, 360],
    'oz-location-kansas-cellar': [551, 416],
    'oz-location-kansas-barnyard': [1070, 465],
    'oz-location-kansas-prairie': [1450, 700],
    'oz-location-kansas-new-house': [275, 694],
  },
  'oz-map-emerald-city': {
    'oz-location-great-gate': [1500, 530],
    'oz-location-guardian-room': [1400, 500],
    'oz-location-green-streets': [520, 520],
    'oz-location-palace-of-oz': [822, 277],
    'oz-location-launching-ground': [900, 137],
  },
  'oz-map-palace': {
    'oz-location-palace-gates': [145, 418],
    'oz-location-waiting-hall': [473, 332],
    'oz-location-throne-room': [850, 305],
    'oz-location-back-chamber': [1460, 283],
    'oz-location-guest-corridor': [1120, 570],
    'oz-location-dorothy-room': [865, 758],
  },
  'oz-map-yellow-castle': {
    'oz-location-castle-doorstep': [851, 433],
    'oz-location-great-kitchen': [275, 533],
    'oz-location-iron-yard': [965, 682],
    'oz-location-winkie-workshops': [470, 184],
    'oz-location-cupboard-room': [1326, 259],
    'oz-location-watching-door': [862, 89],
  },
  'oz-map-china-country': {
    'oz-location-high-wall': [835, 813],
    'oz-location-milkmaid-farm': [435, 279],
    'oz-location-princess-meadow': [1265, 269],
    'oz-location-joker-corner': [1340, 512],
    'oz-location-china-church': [848, 537],
    'oz-location-low-wall': [842, 106],
  },
  'oz-map-glinda-castle': {
    'oz-location-castle-gates': [170, 642],
    'oz-location-outer-court': [615, 474],
    'oz-location-tiring-room': [1390, 247],
    'oz-location-ruby-throne-room': [1005, 271],
  },
};

for (const layer of book.mapLayers) {
  layer.imageWidth = 1672;
  layer.imageHeight = 941;
  const blob = book.blobs.find((entry) => entry.id === layer.imageId);
  if (!blob) throw new Error(`Missing map image blob: ${layer.id}`);
  const filename = layer.id === 'oz-map-kansas' ? 'maps/kansas.jpg' : `maps/generated/${layer.id.slice('oz-map-'.length)}.jpg`;
  blob.url = `library/the-wonderful-wizard-of-oz/${filename}`;
  blob.mimeType = 'image/jpeg';
  if (!fs.existsSync(path.join(root, blob.url))) throw new Error(`Missing map artwork: ${blob.url}`);
}

const seen = new Set();
for (const layer of book.mapLayers) {
  const layerPositions = positions[layer.id];
  if (!layerPositions) throw new Error(`No positions for ${layer.id}`);
  for (const [id, [x, y]] of Object.entries(layerPositions)) {
    const marker = book.locationMarkers.find((entry) => entry.id === id);
    if (!marker) throw new Error(`Unknown marker ${id}`);
    marker.mapLayerId = layer.id;
    if (!(x >= 0 && x < layer.imageWidth && y >= 0 && y < layer.imageHeight)) throw new Error(`Out of bounds: ${id}`);
    marker.x = x;
    marker.y = y;
    seen.add(id);
  }
}
if (seen.size !== 55 || book.locationMarkers.some((marker) => !seen.has(marker.id))) throw new Error('Every Oz location needs one placement');
book.lorePages.find((page) => page.id === 'oz-lore-maps').body = 'Baum published no measured map with the 1900 book, so these nine painted layers are editorial interpretations. They follow the first story’s broad geography: blue Munchkin East, yellow Winkie West, red Quadling South, one Emerald City gate, Kansas, and the places Dorothy visits on her eastern and southern journeys. The interactive markers sit on visible landmarks. Exact distances and interior layouts are not canonical.';
fs.writeFileSync(bookPath, JSON.stringify(book) + '\n');
console.log(`Placed ${seen.size} locations on ${book.mapLayers.length} maps.`);
