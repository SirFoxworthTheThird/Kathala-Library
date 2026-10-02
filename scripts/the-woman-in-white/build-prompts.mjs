import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const world = JSON.parse(fs.readFileSync(path.join(root,'library/the-woman-in-white.pwk'),'utf8'));
const style = 'Original atmospheric editorial illustration for Wilkie Collins’s The Woman in White, set in mid-Victorian England around 1850. Painterly oil and fine wood-engraving detail, muted ivory, ink black, mist blue and dark bottle green, natural gaslight or overcast daylight. Period-correct dress, architecture, papers and travel. Psychological mystery, human realism, no ghosts or supernatural effects. No words, lettering, logos, watermarks, borders, collage, or modern objects.';
const character = {
  walter:'Earnest young English drawing master carrying a sketchbook, observant gaze, modest dark coat.',
  laura:'Gentle fair-haired young English heiress in pale Victorian gown, poised yet vulnerable; clearly distinct from Anne.',
  marian:'Resolute dark-haired Victorian woman with intelligent unsentimental expression, writing in a diary by lamplight.',
  anne:'Frail anxious young woman in plain white dress and cloak on a moonlit London road; living person, no ghostly transparency.',
  percival:'Tense English baronet in immaculate but severe dark Victorian suit, concealed desperation behind authority.',
  fosco:'Large charismatic Italian count in fine dark Victorian clothing, watchful eyes, pet white mice and canaries as subtle details.',
  'madame-fosco':'Composed middle-aged woman in elaborate Victorian gown, restrained and deferential beside a shadowed room.',
  fairlie:'Fastidious wealthy invalid in elegant indoor clothes, reclining amid art treasures and books, bothered by noise.',
  pesca:'Small exuberant Italian language professor in Victorian London, warm spirited expression.',
  gilmore:'Middle-aged family solicitor with careful bearing, legal papers in Chancery Lane office.',
  'mrs-catherick':'Proud stern older woman in dark provincial Victorian dress, guarded expression.',
  'mrs-clements':'Kind sturdy older working woman shielding a vulnerable younger companion in white.',
  michelson:'Conscientious Victorian housekeeper in dark dress with keys, standing in Blackwater Park corridor.',
  fanny:'Young loyal maid in plain mid-Victorian servant clothing, carrying a sealed message.',
  kyrle:'Cautious Victorian solicitor at desk surrounded by documentary evidence.',
  hester:'Modest domestic servant in London sickroom, observant and uneasy.',
  goodricke:'Victorian physician with medical case and sober expression, no modern medical devices.',
  jane:'Working woman connected to burial preparations, respectful and grave, mid-Victorian dress.'
};
const item = {
  'white-dress':'Plain white mid-Victorian woman’s dress and cloak hanging in lamplit room; tangible garment, not ghost.',
  'warning-letter':'Anonymous folded warning letter with unreadable marks, wax and envelope on dark writing desk; no legible text.',
  settlement:'Bound marriage settlement on solicitor’s desk, sealing wax and quill, monetary stakes suggested without readable writing.',
  'marian-diary':'Well-used leather diary open beside ink bottle and candle, handwritten pages deliberately illegible.',
  'vestry-key':'Heavy old iron vestry key in a gloved hand before a church door, clear silhouette.',
  'church-register':'Aged parish marriage register in old church vestry, one suspicious altered entry but no legible letters.',
  'death-certificate':'Official Victorian death certificate with embossed seal and unreadable script beside mourning gloves.',
  'grave-marker':'Weathered stone grave marker in Limmeridge churchyard, carved name deliberately illegible, pale flowers.',
  'fosco-confession':'Signed confession papers spread across a lamplit table, ink and broken wax seal, writing unreadable.',
  'brotherhood-mark':'Discreet Italian political brotherhood emblem engraved into a small metal token, historically plausible, no letters.'
};
const jobs=[{file:'cover',folder:'',prompt:`${style} Dramatic vertical book-cover image without typography: a living woman in a plain white cloak on a moonlit Victorian road, looking back toward a dark country house; a second similar-looking woman seen faintly in a distant lit window, suggesting mistaken identity without supernatural effects. Restrained suspense, strong silhouette.`}];
for(const [array,folder,prefix,special] of [[world.characters,'characters','woman-in-white-character-',character],[world.items,'items','woman-in-white-item-',item],[world.locationMarkers,'locations','woman-in-white-location-',{}]]){
  for(const entity of array){const file=entity.id.slice(prefix.length);const kind=folder==='characters'?'Character portrait':folder==='items'?'Focused object study':'Distinct environmental view of this named place';jobs.push({file,folder,prompt:`${style} ${kind}: ${entity.name}. ${entity.description} ${special[file]||''} Give this subject a unique composition and clear focal point.`});}
}
jobs.find(j=>j.file==='paris-seine').prompt="Original atmospheric editorial landscape for Wilkie Collins's The Woman in White, mid-nineteenth-century PARIS, FRANCE. Wide view along the River Seine with its stone quays and bridges and the unmistakable twin square towers and flying buttresses of Notre-Dame cathedral on the Ile de la Cite. Period Paris rooftops, barges and people, no London landmarks, no Big Ben, no Westminster, no St Paul's dome. Painterly oil and fine wood engraving, muted ivory, ink black, mist blue and dark bottle green. The city and river are the focal subject; no foreground heroine. No text or lettering.";
jobs.find(j=>j.file==='paris-morgue').prompt="Original atmospheric editorial illustration for Wilkie Collins's The Woman in White, mid-nineteenth-century PARIS, FRANCE. The public Paris Morgue beside the River Seine on the Ile de la Cite, a sober stone civic building and riverside quay, with the twin square towers of Notre-Dame cathedral visible beyond. Historically plausible Paris street architecture, restrained psychological mystery, no bodies shown. Absolutely no London landmarks, no Big Ben, no Westminster, no St Paul's dome. Painterly oil and fine wood engraving, muted ivory, ink black, mist blue and dark bottle green. The morgue building is the clear focal subject, no foreground heroine, no text or lettering.";
fs.writeFileSync(path.join(import.meta.dirname,'prompts.json'),JSON.stringify(jobs,null,2)+'\n');
fs.writeFileSync(path.join(import.meta.dirname,'PROMPTS.md'),'# The Woman in White illustration prompts\n\n'+jobs.map((j,i)=>`## ${i+1}. ${j.folder?j.folder+' / ':''}${j.file}\n\n${j.prompt}\n`).join('\n'));
console.log(`Prepared ${jobs.length} distinct prompts`);
