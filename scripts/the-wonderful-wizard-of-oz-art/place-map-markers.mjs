import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const bookPath = path.join(root, 'library/the-wonderful-wizard-of-oz.pwk');
const book = JSON.parse(fs.readFileSync(bookPath, 'utf8'));

const newMaps = [
  ['oz-map-eastern-road', 'oz-image-map-eastern-road', 'The Eastern Road', 'The route from Munchkin Country through the woods, two ditches, river and poppy field toward the Emerald City.', 'eastern-road.png'],
  ['oz-map-southern-road', 'oz-image-map-southern-road', 'The Road South to Glinda', 'Dorothy’s road from the fighting trees through the China Country, marshes, forest and Hammer-Heads to Glinda.', 'southern-road.png'],
];
const parent = book.mapLayers.find((layer) => layer.id === 'oz-map-oz');
const sourceBlob = book.blobs.find((blob) => blob.id === parent.imageId);
for (const [id, imageId, name, description, filename] of newMaps) {
  if (!book.mapLayers.some((layer) => layer.id === id)) {
    book.mapLayers.push({ ...parent, id, parentMapId: parent.id, name, description, imageId, imageWidth: 2048, imageHeight: 1117 });
  }
  if (!book.blobs.some((blob) => blob.id === imageId)) {
    book.blobs.push({ ...sourceBlob, id: imageId, url: `library/the-wonderful-wizard-of-oz/maps/generated/${filename}` });
  }
}
for (const id of ['oz-map-china-country', 'oz-map-glinda-castle']) {
  book.mapLayers.find((layer) => layer.id === id).parentMapId = 'oz-map-southern-road';
}
book.locationMarkers.find((marker) => marker.id === 'oz-location-landing-site').linkedMapLayerId = 'oz-map-eastern-road';
book.locationMarkers.find((marker) => marker.id === 'oz-location-fighting-trees').linkedMapLayerId = 'oz-map-southern-road';

// Pixel positions on the seven actual map images. The main map follows the
// first book: Munchkin Country east, Winkie Country west, Quadling Country
// south, and the Emerald City at the centre. Rooms use their local floor plans.
const positions = {
  'oz-map-oz': {
    'oz-location-landing-site': [888, 300],
    'oz-location-emerald-city': [512, 283],
    'oz-location-west-country': [306, 261],
    'oz-location-yellow-castle': [168, 289],
    'oz-location-fighting-trees': [530, 358],
  },
  'oz-map-eastern-road': {
    'oz-location-boq-house': [1720, 380],
    'oz-location-cornfield': [1600, 438],
    'oz-location-forest-road': [1490, 450],
    'oz-location-woodman-cottage': [1360, 450],
    'oz-location-lion-road': [1230, 508],
    'oz-location-night-camp': [1100, 488],
    'oz-location-first-gulf': [920, 580],
    'oz-location-kalidah-gulf': [840, 620],
    'oz-location-river-crossing': [600, 704],
    'oz-location-poppy-field': [450, 734],
    'oz-location-mice-field': [330, 774],
    'oz-location-green-farmhouse': [210, 836],
  },
  'oz-map-southern-road': {
    'oz-location-china-country': [990, 380],
    'oz-location-marshes': [1060, 510],
    'oz-location-great-forest': [960, 640],
    'oz-location-hammerhead-hill': [1100, 760],
    'oz-location-quadling-farm': [1130, 870],
    'oz-location-glinda-castle': [1270, 948],
  },
  'oz-map-kansas': {
    'oz-location-kansas-farmhouse': [430, 498],
    'oz-location-kansas-cellar': [617, 550],
    'oz-location-kansas-barnyard': [879, 500],
    'oz-location-kansas-prairie': [1040, 794],
    'oz-location-kansas-new-house': [430, 782],
  },
  'oz-map-emerald-city': {
    'oz-location-great-gate': [908, 338],
    'oz-location-guardian-room': [858, 321],
    'oz-location-green-streets': [254, 231],
    'oz-location-palace-of-oz': [518, 355],
    'oz-location-launching-ground': [485, 140],
  },
  'oz-map-palace': {
    'oz-location-palace-gates': [188, 240],
    'oz-location-waiting-hall': [395, 284],
    'oz-location-throne-room': [580, 258],
    'oz-location-back-chamber': [838, 411],
    'oz-location-guest-corridor': [679, 386],
    'oz-location-dorothy-room': [580, 465],
  },
  'oz-map-yellow-castle': {
    'oz-location-castle-doorstep': [1165, 510],
    'oz-location-great-kitchen': [330, 705],
    'oz-location-iron-yard': [764, 729],
    'oz-location-winkie-workshops': [425, 412],
    'oz-location-cupboard-room': [1550, 460],
    'oz-location-watching-door': [1370, 245],
  },
  'oz-map-china-country': {
    'oz-location-high-wall': [502, 448],
    'oz-location-milkmaid-farm': [400, 211],
    'oz-location-princess-meadow': [645, 212],
    'oz-location-joker-corner': [548, 271],
    'oz-location-china-church': [490, 317],
    'oz-location-low-wall': [444, 133],
  },
  'oz-map-glinda-castle': {
    'oz-location-castle-gates': [115, 274],
    'oz-location-outer-court': [255, 279],
    'oz-location-tiring-room': [805, 135],
    'oz-location-ruby-throne-room': [507, 271],
  },
};

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
fs.writeFileSync(bookPath, JSON.stringify(book) + '\n');
console.log(`Placed ${seen.size} locations on ${book.mapLayers.length} maps.`);
