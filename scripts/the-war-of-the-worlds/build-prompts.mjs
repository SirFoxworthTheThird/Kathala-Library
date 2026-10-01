import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const world = JSON.parse(fs.readFileSync(path.join(root, 'library/the-war-of-the-worlds.pwk'), 'utf8'));
const style = 'Original editorial illustration for H. G. Wells’s 1898 The War of the Worlds. Late Victorian England, historically plausible dress, streets, buildings and technology. Painterly ink and gouache with fine engraved detail, restrained sepia, slate blue and oxidized red palette, atmospheric natural light. Visually specific, cinematic composition, clear focal subject. No text, no letters, no logos, no borders, no collage, no modern vehicles, no modern film-adaptation tripod design.';
const details = {
  'the-narrator': 'Thoughtful thirty-something English philosophical writer, dark suit and waistcoat, observant anxious eyes, Woking home and smoky horizon beyond.',
  'the-narrators-wife': 'Capable late Victorian English woman in practical travel dress and hat, composed amid hurried evacuation to Leatherhead.',
  'the-narrators-brother': 'Young London medical student in rumpled Victorian jacket, bicycle nearby, alert to the refugee panic.',
  'ogilvy': 'Middle-aged astronomer with field telescope and notebook, studying an enormous embedded metal cylinder on Horsell Common.',
  'henderson': 'Victorian journalist with notebook and dark coat at the smoking cylinder on the common.',
  'stent': 'Distinguished older Astronomer Royal in formal Victorian clothes, approaching the cylinder with a white flag delegation.',
  'the-curate': 'Disheveled frightened Victorian clergyman in black clerical clothing, sheltering in a ruined house.',
  'the-artilleryman': 'Weathered British artillery soldier in 1890s field uniform, dusty and determined, broken gun emplacement behind.',
  'mrs-elphinstone': 'Victorian refugee woman in bonnet and travel cloak, weary and worried beside horse carriage.',
  'miss-elphinstone': 'Determined Victorian woman holding carriage reins on crowded Essex road.',
  'the-spotted-dog-innkeeper': 'Victorian Surrey innkeeper in waistcoat and rolled sleeves outside a village inn, alarmed by distant advancing machine.',
  'the-martians': 'Wells’s original Martian creature: large round head, dark eyes, tentacles around mouth, delicate body, glimpsed emerging from a cylinder; eerie, intelligent, biologically alien, not humanoid.',
  'the-london-refugees': 'Collective portrait of late Victorian London civilians fleeing with bundles and carts, families and classes mingled, humane restraint.',
  'the-thunder-child-crew': 'British Victorian sailors aboard low ironclad torpedo ram HMS Thunder Child, braced for battle offshore, steam and spray.',
  'martian-cylinder': 'Huge scorched metallic interplanetary cylinder half buried in sandy Horsell Common crater, unscrewing end cap, curious onlookers far away.',
  'heat-ray': 'Wells’s invisible Martian Heat-Ray apparatus: polished parabolic mirror and projector atop a fighting machine, a line of burning trees shows the beam path; no visible laser.',
  'black-smoke': 'Martian canister releasing dense black chemical smoke that sinks into a Victorian rural lane, ominous but no graphic victims.',
  'fighting-machine': 'Wells’s three-legged Martian fighting machine, colossal flexible metallic tripod with hood, tentacles, and heat-ray apparatus striding over Victorian Surrey; original literary design.',
  'handling-machine': 'Compact Martian handling machine in a crater, many jointed limbs and dexterous tentacles manipulating machinery, mechanically plausible Victorian science fiction.',
  'red-weed': 'Scarlet Martian red weed choking an English canal and brick embankment, vivid branching growth against deserted Victorian landscape.',
  'revolver': 'Period correct late Victorian revolver on a worn leather satchel, refugee road visible behind, still life.',
  'bicycle': '1890s safety bicycle leaning against London brick wall, abandoned amid newspaper litter and distant fleeing crowd.',
  'pony-cart': 'Small Victorian pony cart with modest luggage traveling Surrey lane toward Leatherhead, clear horse and two wheels.',
  'torpedo-ram': 'HMS Thunder Child, low black Victorian ironclad torpedo ram with smoke stacks, charging towering Martian tripod machines in coastal waters.'
};
const jobs = [{file:'cover', folder:'', prompt:`${style} Book cover image only, no title or typography: a Martian tripod rising beyond dark Victorian London rooftops, red Mars in a smoky sky, tiny fleeing people below, arresting vertical composition.`}];
for (const [array, folder, prefix] of [[world.characters,'characters','war-of-the-worlds-char-'],[world.items,'items','war-of-the-worlds-item-'],[world.locationMarkers,'locations','war-of-the-worlds-loc-']]) {
  for (const entity of array) {
    const file = entity.id.slice(prefix.length);
    const special = details[file] || '';
    const kind = folder === 'characters' ? 'Character portrait' : folder === 'items' ? 'Object study' : 'Distinct environmental landscape of this exact named place';
    jobs.push({file, folder, prompt:`${style} ${kind}: ${entity.name}. ${entity.description} ${special} Full-bleed illustration; make the named subject unmistakable.`});
  }
}
const heatRay = jobs.find(job => job.folder === 'items' && job.file === 'heat-ray');
heatRay.prompt = 'Original editorial illustration for H. G. Wells\'s 1898 The War of the Worlds. Object study of the Martian Heat-Ray projector: polished parabolic mirror and mechanically mounted focusing apparatus atop a looming three-legged Martian fighting machine in Victorian Surrey. The destructive beam itself is completely INVISIBLE, no red or orange light ray, no laser, no glowing line. Show its path only through sharply igniting trees and scorched earth far from the projector. Painterly ink and gouache with fine engraved detail, restrained sepia, slate blue and oxidized red. No text, no letters, no logos, no modern film design.';
fs.writeFileSync(path.join(import.meta.dirname,'prompts.json'),JSON.stringify(jobs,null,2)+'\n');
fs.writeFileSync(path.join(import.meta.dirname,'PROMPTS.md'),'# The War of the Worlds illustration prompts\n\n'+jobs.map((j,i)=>`## ${i+1}. ${j.folder ? j.folder+' / ' : ''}${j.file}\n\n${j.prompt}\n`).join('\n'));
console.log(`Prepared ${jobs.length} distinct prompts`);
