import fs from 'node:fs';
import path from 'node:path';

const root=path.resolve(import.meta.dirname,'../..');
const slug='twenty-thousand-leagues-under-the-seas';
const world=JSON.parse(fs.readFileSync(path.join(root,'library',`${slug}.pwk`),'utf8'));
const style='Original editorial illustration for Jules Verne’s Twenty Thousand Leagues Under the Seas. Circa 1868–1870 scientific adventure, faithful to the novel rather than any film adaptation. Painterly color over fine nineteenth-century engraved line work; deep marine teal, oxidized brass, ivory and coral highlights; believable period clothing, ships and machinery. Nemo’s Nautilus is a long dark riveted iron electric submarine with a tapered ram, observation windows and a low platform, not a modern military submarine. Clear focal subject, varied composition, researched geographic setting. No text, letters, logos, border, collage or anachronistic equipment.';
const character={
  aronnax:'Thoughtful middle-aged French naturalist with field notebook and museum-trained curiosity.',
  conseil:'Calm young Flemish servant and natural-history classifier in modest Victorian clothing.',
  ned:'Strong Canadian harpooner with practical seaman’s dress and a forged harpoon, intent on escape.',
  nemo:'Severe dark-haired Captain Nemo, brilliant and grief-stricken, in plain dark nineteenth-century naval clothing; no movie costume.',
  farragut:'Determined American naval commander aboard the steam frigate Abraham Lincoln.',
  'papuan-chief':'Dignified leader of New Guinea islanders defending their shore, historically grounded Melanesian appearance and material culture, no caricature or fantasy costume.',
  'pearl-diver':'Working South Asian pearl diver in the Gulf of Mannar, diving for oysters, treated with dignity.',
  'crete-diver':'Cretan swimmer receiving aid near the Nautilus, Mediterranean setting, treated with dignity.'
};
const item={
  'narwhal-tusk':'A supposed narwhal horn imagined as the cause of a clean puncture in an iron ship hull; scientific specimen display.',
  harpoon:'Ned Land’s period forged iron harpoon on an American steam frigate deck.',
  'diving-suit':'Nineteenth-century Rouquayrol-Denayrouze compressed-air diving suit with copper helmet and air apparatus, no modern scuba.',
  'electric-rifle':'Nemo’s nineteenth-century pneumatic underwater rifle with charged glass projectiles, period mechanical design.',
  'nautilus-plans':'Detailed engineering drawings of a long double-hulled electric submarine on a brass drafting table, no readable labels.',
  library:'Nautilus library with thousands of books, brass lamps, dark wood and portholes, no modern fixtures.',
  organ:'Captain Nemo’s pipe organ in the Nautilus grand salon, solitary and elegiac.',
  pearl:'Extraordinarily large natural pearl inside a giant oyster on the Ceylon seabed.',
  'gold-chest':'Recovered Spanish bullion in an old ironbound sea chest near an Atlantic wreck.',
  'nemo-flag':'Plain black flag with one simple golden capital N planted on ice-bound polar shore; this is the only asset where exact text N is required.',
  'ice-picks':'Heavy ice picks and period boiling apparatus used by divers trapped under Antarctic ice.',
  axe:'Period boarding axe laid on the Nautilus deck after the giant squid battle, no gore.',
  'escape-note':'Folded handwritten note fixing an escape time, writing deliberately illegible.',
  'nemo-portrait':'Small framed family portrait in Nemo’s sparse cabin, faces warm and human, no readable text.',
  'maelstrom-dinghy':'Detachable narrow iron boat escaping beside a colossal Norwegian whirlpool.',
  'specimen-notes':'Aronnax’s natural-history field notebook with small marine sketches, no readable writing.',
  'air-reservoir':'Portable nineteenth-century compressed-air tanks and hoses for underwater exploration.',
  'electric-bullet':'Single clear glass charged projectile beside mechanical underwater rifle on dark velvet.'
};
const jobs=[{folder:'',file:'cover',prompt:`${style} Vertical cover image only, without typography: the tapered iron Nautilus gliding beneath a vast blue-green ocean, coral reef and luminous marine life below, tiny diver silhouettes beside it, a ship far above the surface, awe and danger in balanced composition.`}];
for(const [array,folder,prefix,special] of [[world.characters,'characters',`${slug}-char-`,character],[world.items,'items',`${slug}-item-`,item],[world.locationMarkers.filter(x=>!x.id.endsWith('route-one-entrance')&&!x.id.endsWith('route-two-entrance')),'locations',`${slug}-loc-`,{}]]){
  for(const entity of array){const file=entity.id.slice(prefix.length);const kind=folder==='characters'?'Character portrait':folder==='items'?'Focused object plate':'Distinct landscape or interior scene of this exact named place';jobs.push({folder,file,prompt:`${style} ${kind}: ${entity.name}. ${entity.description} ${special[file]||''} Make the named subject unmistakable.`})}
}
jobs.find(j=>j.folder==='characters'&&j.file==='papuan-chief').prompt="Single full-bleed original oil-and-engraving portrait for Jules Verne's Twenty Thousand Leagues Under the Seas: a dignified coastal Melanesian elder and community leader on a wooded New Guinea island shoreline, circa 1870, standing with fellow islanders far behind and the Nautilus grounded offshore. Historically grounded simple woven barkcloth and practical ornaments, natural hair; NO feather headdress, no face paint, no theatrical tribal costume, no spear pose, no caricature. Human expression of determination while defending home. Deep marine teal, warm earth and ivory. One continuous scene, no panels, no text.";
jobs.find(j=>j.folder==='items'&&j.file==='electric-rifle').prompt="Single full-bleed nineteenth-century editorial object illustration of Captain Nemo's electric underwater rifle from Jules Verne's Twenty Thousand Leagues Under the Seas. One elegant brass and dark-wood pneumatic rifle with a small charged glass projectile laid on a dark blue cloth inside the Nautilus, observation window behind showing fish and reef. Clear focused still life, plausible 1860s mechanism. ONE image, ONE scene, no inset diagrams, no panels, no collage, no captions, no text, no modern gun design. Painterly color over fine engraved line, marine teal and oxidized brass.";
jobs.find(j=>j.folder==='locations'&&j.file==='new-york').prompt="Original painterly nineteenth-century engraved illustration of NEW YORK HARBOR circa 1866 for Jules Verne's Twenty Thousand Leagues Under the Seas. The lower Manhattan waterfront with wooden piers, warehouses, church steeples, small sail vessels and steam frigate Abraham Lincoln preparing to depart; Professor Aronnax and a few period-dressed travelers on the quay. Historically accurate pre-skyscraper, pre-Brooklyn Bridge skyline. NO Brooklyn Bridge, no suspension bridge, no Statue of Liberty, no modern buildings, no text. Marine teal, oxidized brass and ivory, one coherent wide scene.";
jobs.find(j=>j.folder==='locations'&&j.file==='chart-one-cemetery').prompt="Original painterly nineteenth-century engraved underwater scene for Jules Verne's Twenty Thousand Leagues Under the Seas: Nemo's secret CORAL CEMETERY on the seabed. A small solemn grave marked by a simple coral cross amid branching coral, six divers in period copper helmets and Rouquayrol-Denayrouze suits gently lowering a shrouded sailor; Nautilus visible in the distance. Clear burial ground, NOT a shipwreck, no wrecked hull, no guns, no treasure. Deep blue-green water, coral and soft shafts of light, humane restraint, one coherent scene, no text.";
jobs.find(j=>j.folder==='locations'&&j.file==='nautilus-entrance').prompt="Original painterly nineteenth-century engraved exterior illustration of Captain Nemo's NAUTILUS submarine for Jules Verne's Twenty Thousand Leagues Under the Seas. Full side view of the long dark riveted iron electric submarine with tapered ram, low upper platform, retractable pilot house, observation windows, and small detachable boat, gliding underwater above a coral reef; tiny divers give scale. Faithful to the 1860s novel, not a modern submarine or film version. The whole vessel is the focal subject, no interior salon, no text, one coherent scene. Marine teal and oxidized brass.";
fs.writeFileSync(path.join(import.meta.dirname,'prompts.json'),JSON.stringify(jobs,null,2)+'\n');
fs.writeFileSync(path.join(import.meta.dirname,'PROMPTS.md'),'# Twenty Thousand Leagues Under the Seas illustration prompts\n\n'+jobs.map((j,i)=>`## ${i+1}. ${j.folder?j.folder+' / ':''}${j.file}\n\n${j.prompt}\n`).join('\n'));
console.log(`Prepared ${jobs.length} distinct prompts; two route-chart markers retain their historical map images.`);
