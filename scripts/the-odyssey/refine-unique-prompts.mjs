import fs from 'node:fs';
import path from 'node:path';

const file = path.join(import.meta.dirname, 'unique-art-plan.json');
const plan = JSON.parse(fs.readFileSync(file, 'utf8'));
const scenes = {
  'odyssey-char-menelaus': 'Composition: seated inside the prosperous hall of Sparta among painted columns and bronze vessels, with a warm terracotta mantle and no sea, ship, blue cloak, or balcony.',
  'odyssey-char-helen': 'Composition: Helen beside a richly patterned loom in the Spartan hall, poised and thoughtful, warm ivory and saffron fabric; no harbor or ship.',
  'odyssey-char-antiphates': 'Composition: towering Laestrygonian king on the stone heights above a trapped narrow harbor, enormous scale conveyed by tiny ships below.',
  'odyssey-char-eurylochus': 'Composition: weathered senior sailor on the deck of a battered ship at dusk, hands on rigging, plain dark red tunic and salt-worn expression.',
  'odyssey-char-elpenor': 'Composition: lonely young shade beside an unburied grave mound in the underworld, muted gray and asphodel; no gore or heroic armor.',
  'odyssey-char-philoetius': 'Composition: humble loyal cowherd among cattle in an Ithacan pasture, rough ochre work clothes, reassuring and sturdy.',
  'odyssey-char-antinous': 'Composition: insolent young noble at a feast table in the occupied Ithacan hall, rich crimson clothing and overturned cups; no bow contest.',
  'odyssey-char-eurymachus': 'Composition: calculating young suitor in ochre and bronze speaking from the palace colonnade; focused political expression, distinct from Antinous.',
  'odyssey-char-argos': 'Composition: the old neglected hunting dog alone at the palace gate on a quiet Ithacan afternoon; poignant animal portrait, no human figures.',
  'odyssey-char-phemius': 'Composition: anxious Ithacan bard with a lyre in the dim palace hall, dressed plainly and clearly distinct from Demodocus.',
  'odyssey-char-medon': 'Composition: aging palace herald carrying a staff and urgent message across a sunlit Ithacan courtyard, plain linen clothing.',
  'odyssey-char-melanthius': 'Composition: disloyal goatherd on a rocky Ithacan hillside with restless goats, narrow-eyed and rough in dark brown working clothes.',
  'odyssey-char-melantho': 'Composition: sharp-tongued young palace servant in a lamp-lit corridor, holding a bronze water jug, assertive posture, no noble jewelry.',
  'odyssey-char-amphinomus': 'Composition: restrained and troubled suitor standing apart from a distant feast beside a single palace column, gray-green tunic.',
  'odyssey-char-theoclymenus': 'Composition: fugitive prophet on an Ithacan ridge at dusk, reading a dark flock of birds over the palace; spare gray cloak.',
  'odyssey-char-pisistratus': 'Composition: young son of Nestor beside a Bronze Age chariot on the road from Pylos, considerate expression, sandy gold light.',
  'odyssey-char-proteus': 'Composition: ancient shape-changing sea prophet emerging from the surf by Pharos, seal forms suggested in the water, no trident.',
  'odyssey-char-ino': 'Composition: benevolent sea goddess rising from a breaking wave to offer a pale veil, silver-blue water, no storm god.',
  'odyssey-char-helios': 'Composition: sun god in a radiant chariot above the island of his sacred cattle, warm gold dawn, no Zeus-like throne.',
  'odyssey-char-agamemnon': 'Composition: subdued royal shade in worn bronze armor among the asphodel of Hades, reflective grief rather than battle.',
  'odyssey-char-achilles': 'Composition: once-mighty warrior as a sober shade beside dark underworld water, spear lowered, rejecting the splendor of war.',
  'odyssey-char-scylla': 'Composition: six long serpentine heads emerging from a sheer sea cliff above a small passing ship; make the creature the focus, distinct from the existing wide strait map, without gore.',
  'odyssey-lore-1': 'Composition: a single storyteller at a Phaeacian hearth recounting an earlier voyage, with the memory of a ship suggested in the firelight.',
  'odyssey-lore-2': 'Composition: Ithaca seen at dawn from the sea, a small returning ship approaching a humble home rather than a heroic triumph.',
  'odyssey-lore-3': 'Composition: Athena and Poseidon as opposing presences on opposite sides of one small ship, intelligence against turbulent sea.',
  'odyssey-lore-4': 'Composition: a divine thundercloud over a crew choosing to approach forbidden cattle, human decision visible beneath divine judgment.',
  'odyssey-lore-5': 'Composition: a host offering bread and a seat to an unknown traveler in a Bronze Age hall, the ethics of welcome made visible.',
  'odyssey-lore-6': 'Composition: the Ithacan household as a working home with loom, hearth, stores, servants and family, no suitor feast.',
  'odyssey-lore-7': 'Composition: a beautifully built Phaeacian ship launched at sunrise beside singers and artisans on shore, hospitality and safe passage.',
  'odyssey-lore-8': 'Composition: Odysseus facing a field of faint heroic shades beside dark water, prophecy and mortality, no horror gore.',
  'odyssey-lore-9': 'Composition: the bow and rooted olive-wood bed share one intimate Ithacan chamber, two recognizable objects for public and private proof.',
  'odyssey-lore-10': 'Composition: the old dog Argos recognizing a disguised returning master at the palace gate, an intimate quiet moment.',
  'odyssey-faction-household': 'Composition: Penelope, Telemachus, and faithful servants maintaining the Ithacan home around its hearth; no suitors.',
  'odyssey-faction-phaeacians': 'Composition: a group of skilled Phaeacian sailors and hosts preparing a guest ship at the harbor, distinct from the palace interior.',
  'odyssey-faction-olympians': 'Composition: several distinct gods in council high above the Aegean with Athena, Zeus and Poseidon recognizable; no Roman imagery.',
  'odyssey-faction-loyalists': 'Composition: Eumaeus, Philoetius and a few faithful servants quietly gathering at the swineherd’s hut, no suitor feast.',
};
for (const slot of plan.slots) {
  const scene = scenes[slot.objectId];
  if (!scene || slot.status === 'retained') continue;
  if (!slot.prompt.includes(scene)) slot.prompt = `${slot.prompt} ${scene}`;
}
fs.writeFileSync(file, JSON.stringify(plan, null, 2) + '\n');
console.log(`Refined ${Object.keys(scenes).length} scene directions.`);
