import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const out = path.join(root, 'library/the-wonderful-wizard-of-oz/maps/generated');
fs.mkdirSync(out, {recursive: true});

const title = (text) => `<text x="512" y="38" text-anchor="middle" class="title">${text}</text><path d="M270 46H754" stroke="#8b7352" stroke-width="1"/>`;
const label = (x,y,text,size=17) => `<text x="${x}" y="${y}" text-anchor="middle" class="label" font-size="${size}">${text}</text>`;
const small = (x,y,text) => `<text x="${x}" y="${y}" text-anchor="middle" class="small">${text}</text>`;
const room = (x,y,w,h,fill,name) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${fill}" stroke="#765b42" stroke-width="4"/>${label(x+w/2,y+h/2+5,name,16)}`;
const tree = (x,y,s=1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 7V32" stroke="#65583a" stroke-width="5"/><path d="M0-27 C-25-22-26 7 0 10 C26 7 25-22 0-27Z" fill="#6a8b65" stroke="#506647" stroke-width="2"/></g>`;
const house = (x,y,fill='#dfc381') => `<g transform="translate(${x} ${y})"><path d="M-24 0L0-20L24 0V28H-24Z" fill="${fill}" stroke="#715b45" stroke-width="2"/><path d="M-27 1L0-24L27 1" fill="none" stroke="#715b45" stroke-width="3"/><rect x="-5" y="10" width="10" height="18" fill="#765b42"/></g>`;
const castle = (x,y,fill='#ceb76d') => `<g transform="translate(${x} ${y})"><path d="M-38 26V-14H-26V-30H-12V-14H12V-38H26V-14H38V26Z" fill="${fill}" stroke="#755b43" stroke-width="3"/><path d="M-42-14L-31-33L-21-14M8-38L19-57L30-38" fill="${fill}" stroke="#755b43" stroke-width="3"/><path d="M-7 26V7A7 7 0 0 1 7 7V26" fill="#735941"/></g>`;
const frame = (w,h,heading,body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 1024 559" preserveAspectRatio="none">
<defs><radialGradient id="paper"><stop offset="0" stop-color="#f7efd8"/><stop offset="1" stop-color="#e9d9b6"/></radialGradient><pattern id="dots" width="23" height="23" patternUnits="userSpaceOnUse"><circle cx="3" cy="5" r="1" fill="#876f4e" opacity=".12"/></pattern></defs>
<rect width="1024" height="559" fill="url(#paper)"/><rect width="1024" height="559" fill="url(#dots)"/>
<rect x="11" y="11" width="1002" height="537" rx="12" fill="none" stroke="#7a6145" stroke-width="3"/><rect x="19" y="19" width="986" height="521" rx="7" fill="none" stroke="#b79a70" stroke-width="1"/>
<style>.title{font:small-caps 27px Georgia,serif;letter-spacing:3px;fill:#55432f}.label{font-family:Georgia,serif;fill:#40392d}.small{font:italic 13px Georgia,serif;fill:#5d5141}</style>
${title(heading)}${body}
<path d="M43 514h60m-30-25v50" stroke="#826948" stroke-width="2"/><text x="73" y="484" text-anchor="middle" class="small">N</text>
</svg>`;

const oz = `
<defs><clipPath id="ozShape"><ellipse cx="512" cy="294" rx="473" ry="225"/></clipPath></defs>
<ellipse cx="512" cy="294" rx="485" ry="238" fill="#d8b77f" stroke="#9d7653" stroke-width="3"/>
<g clip-path="url(#ozShape)"><rect x="37" y="70" width="950" height="450" fill="#d5e0c8"/>
<path d="M37 156 Q255 111 414 223L480 350Q364 467 70 520Z" fill="#e9d993"/>
<path d="M987 120 Q738 109 621 210L570 365Q762 471 987 470Z" fill="#bdcfe2"/>
<path d="M55 520Q295 414 502 342Q716 399 987 506Z" fill="#dfa9a1"/>
<path d="M53 205Q272 138 404 223M650 176Q795 105 981 210M250 465Q525 406 792 484" fill="none" stroke="#9eaa8d" stroke-width="3" opacity=".65"/>
<path d="M905 301C845 272 804 291 774 290S726 258 695 278S649 303 620 320S580 357 550 336S519 300 512 286" fill="none" stroke="#9b7c37" stroke-width="14" stroke-linecap="round"/>
<path d="M905 301C845 272 804 291 774 290S726 258 695 278S649 303 620 320S580 357 550 336S519 300 512 286" fill="none" stroke="#f0d169" stroke-width="10" stroke-linecap="round"/>
<path d="M492 304C403 320 275 295 174 294M516 305C529 330 537 347 530 352S485 380 490 387S453 410 465 420S500 442 503 444S550 463 548 463S599 446 596 451S641 475 640 480" fill="none" stroke="#907b58" stroke-width="4" stroke-dasharray="10 9"/>
<path d="M629 307q-12 22-17 41M617 306q-12 22-17 41" stroke="#819fb0" stroke-width="5" fill="none"/>
<path d="M682 259l-6 24m-18-5-5 24" stroke="#705c48" stroke-width="5"/>
<path d="M577 343q20 19 10 42q-25-12-40 5" fill="#d6a1a5" opacity=".8"/>
${tree(235,191,.75)}${tree(283,397,.7)}${tree(741,204,.6)}${tree(800,373,.6)}${tree(408,414,.7)}${tree(532,357,.45)}${tree(502,440,.5)}
${house(849,283,'#c8d9e9')}${castle(168,290,'#d4b552')}${castle(529,278,'#92bd9c')}${castle(640,465,'#d8938d')}
</g><ellipse cx="512" cy="294" rx="473" ry="225" fill="none" stroke="#785e46" stroke-width="3"/>
${label(516,105,'Northern Country',18)}${label(225,367,'Winkie Country',19)}${label(810,393,'Munchkin Country',19)}${label(515,481,'Quadling Country',19)}
${small(512,320,'Emerald City')}${small(895,335,'The Eastern Road')}${small(174,332,'Yellow Castle')}${small(640,504,'Glinda')}
${small(512,520,'The Deadly Desert surrounds Oz • First-book places only')}`;

const emerald = `
<path d="M78 110Q512 62 935 109L955 393Q515 530 72 394Z" fill="#c8dbb8" stroke="#5c8869" stroke-width="16"/>
<path d="M107 138Q510 91 912 139L925 369Q512 490 102 369Z" fill="#dce8ce" stroke="#abc29b" stroke-width="4"/>
<path d="M902 337L979 337" stroke="#e5c65a" stroke-width="15"/><path d="M912 337C792 305 675 351 517 354" fill="none" stroke="#b6cda7" stroke-width="30"/>
<path d="M912 337C792 305 675 351 517 354" fill="none" stroke="#e9e3b5" stroke-width="18"/>
<path d="M514 355Q453 270 490 138M515 352Q363 336 250 229" fill="none" stroke="#e9e3b5" stroke-width="18"/>
${[tree(198,206,.9),tree(300,167,.7),tree(738,180,.8),tree(777,427,.6),tree(330,419,.6)].join('')}
${castle(518,359,'#80b58c')}${house(254,228,'#9aca9d')}${house(751,217,'#9aca9d')}${house(338,417,'#9aca9d')}
<rect x="894" y="315" width="32" height="46" fill="#ead78e" stroke="#5c8869" stroke-width="4"/>
${label(512,92,'One City • One Great Gate',19)}${small(904,394,'The Great Gate')}${small(517,413,'Palace of Oz')}${small(484,135,'Balloon Ground')}${small(245,471,'Green Streets and Spectacles')}`;

const palace = `
<path d="M113 174H923V468H113Z" fill="#d6e5cd" stroke="#55745a" stroke-width="8"/>
<path d="M135 241H397V283H500M506 284H700V389H845V429" fill="none" stroke="#efe5c8" stroke-width="31" stroke-linecap="round" stroke-linejoin="round"/>
${room(112,191,153,99,'#d7d1aa','Palace Gate')}${room(302,217,186,137,'#c5d9b6','Waiting Hall')}
${room(485,178,197,163,'#a9cbab','Throne Room')}${room(745,349,184,122,'#dbc6a7','Wizard’s Chamber')}
${room(600,351,148,95,'#d0dec8','Guest Corridor')}${room(494,418,175,94,'#d6e9d0','Dorothy’s Room')}
<circle cx="580" cy="215" r="20" fill="#599c78" stroke="#3b765c" stroke-width="4"/><path d="M580 195V185" stroke="#e8dc8b" stroke-width="6"/>
${small(512,87,'A book-faithful interpretation of the rooms Dorothy visits')}`;

const yellow = `
<path d="M92 104H932V484H92Z" fill="#ead99f" stroke="#a47e43" stroke-width="9"/>
<path d="M567 263H680V330H355V333M570 261H245V215M569 264H745V228" fill="none" stroke="#f8ecc8" stroke-width="30" stroke-linejoin="round"/>
${room(105,145,214,125,'#e0c97f','Winkie Workshops')}${room(72,281,186,150,'#e8d392','Great Kitchen')}
${room(267,294,230,142,'#e9d9a4','Iron-Fenced Yard')}${room(502,186,160,141,'#f2e1aa','Front Door')}
${room(665,154,221,153,'#ead294','Cupboard Room')}${room(595,78,180,89,'#eedba1','Watching Door')}
<path d="M283 303V427M317 303V427M351 303V427M385 303V427M419 303V427" stroke="#786c4c" stroke-width="3" opacity=".7"/>
`;

const china = `
<path d="M89 150Q511 85 939 150L925 423Q502 497 88 422Z" fill="#e6e9e6" stroke="#8ca7b2" stroke-width="11"/>
<path d="M104 171Q501 111 920 171L906 406Q511 471 105 406Z" fill="#f4f0e6"/>
<path d="M110 394Q515 468 916 391M110 154Q515 89 916 156" fill="none" stroke="#d3e2e5" stroke-width="12"/>
<path d="M502 383L502 420M444 144L444 118" stroke="#8ca7b2" stroke-width="17"/>
${house(400,210,'#d8e4e8')}${house(490,316,'#d8e4e8')}${house(645,215,'#ecd9d5')}${house(548,268,'#ece2c6')}
<path d="M250 353C387 321 612 365 764 334" fill="none" stroke="#bdd3d9" stroke-width="13"/>
${label(502,85,'Dainty China Country',20)}${small(373,261,'Milkmaid’s Farm')}${small(667,265,'Princess’s Meadow')}${small(504,363,'China Church')}${small(521,460,'High Wall')}${small(444,124,'Low Wall')}`;

const glinda = `
<path d="M69 145H930V456H69Z" fill="#f2d8cb" stroke="#b5716a" stroke-width="9"/>
<path d="M62 275H215V279H508V271H820V129" fill="none" stroke="#f8ede1" stroke-width="35" stroke-linejoin="round"/>
${room(42,214,146,125,'#eec9bb','Castle Gates')}${room(174,205,164,149,'#efd5c6','Outer Court')}
${room(383,165,249,215,'#edc4bd','Ruby Throne Room')}${room(703,75,202,129,'#f2dcd0','Tiring Room')}
<path d="M507 205L527 249L507 289L487 249Z" fill="#b73451" stroke="#832b41" stroke-width="4"/>
${[tree(263,402,.8),tree(753,399,.75),tree(854,375,.7)].join('')}
${small(512,91,'Glinda’s southern castle • no later-book chambers')}`;

const easternRoad = `
<path d="M55 105H969V493H55Z" fill="#cbd9bd" stroke="#866c4e" stroke-width="4"/>
<path d="M550 108H969V490H550Z" fill="#c8d9e2" opacity=".7"/>
<path d="M289 108H555V490H289Z" fill="#8ca983" opacity=".55"/>
<path d="M55 108H289V490H55Z" fill="#e6d5ac" opacity=".7"/>
<path d="M944 199C863 181 822 226 761 224S667 202 616 255S511 216 460 293S354 270 303 352S194 362 101 414" fill="none" stroke="#937842" stroke-width="25" stroke-linecap="round"/>
<path d="M944 199C863 181 822 226 761 224S667 202 616 255S511 216 460 293S354 270 303 352S194 362 101 414" fill="none" stroke="#e8ce6b" stroke-width="17" stroke-linecap="round"/>
<path d="M330 105Q299 304 285 493M310 105Q279 304 265 493" fill="none" stroke="#779bac" stroke-width="6"/>
<path d="M440 263l-18 64m-8-65-18 64" stroke="#715b49" stroke-width="9"/>
<path d="M221 367q-20-31-54-24q-19 19-14 55q33-10 68-31" fill="#cf969e" opacity=".8"/>
${[tree(686,170,.8),tree(635,344,.7),tree(577,185,.9),tree(530,382,.7),tree(506,159,.6)].join('')}
${house(935,197,'#c8d9e9')}${house(858,180,'#c8d9e9')}${house(106,428,'#d9dfc5')}
${small(843,126,'Munchkin fields')}${small(499,126,'Forest and ravines')}${small(270,139,'River')}${small(150,485,'Poppies and meadow')}
${small(897,469,'from Dorothy’s landing')}${small(127,155,'toward the Emerald City')}`;

const southernRoad = `
<path d="M130 89H900V505H130Z" fill="#d5dfc8" stroke="#866c4e" stroke-width="4"/>
<path d="M136 311H894V502H136Z" fill="#e4c3bb" opacity=".72"/>
<path d="M523 105C485 145 479 171 497 194S555 227 531 254S451 287 478 318S580 343 555 381S500 415 566 449S619 458 635 477" fill="none" stroke="#917553" stroke-width="15" stroke-linecap="round" stroke-dasharray="10 8"/>
<path d="M431 181Q486 160 552 178L575 224Q492 235 423 219Z" fill="#e9e7dd" stroke="#8ca7b2" stroke-width="6"/>
<path d="M420 193H559M445 207H546" stroke="#b1c8cb" stroke-width="3"/>
<path d="M472 245q-35 16-7 33m63-29q27 16-3 37" fill="none" stroke="#8da4a0" stroke-width="8"/>
${[tree(439,122,.7),tree(567,115,.7),tree(401,306,.7),tree(626,314,.8),tree(445,362,.7)].join('')}
<path d="M548 347l-29 48l29-11l23 11Z" fill="#9e997d" stroke="#756b5b" stroke-width="4"/>
${house(565,425,'#e3b5ac')}${castle(635,472,'#d8938d')}
${small(705,128,'south from the Emerald City')}${small(335,194,'China Country')}${small(350,269,'marshes')}${small(348,355,'great forest')}${small(745,379,'Hammer-Heads')}${small(737,477,'Glinda’s country')}`;

const files = [
  ['oz', 1024, 559, 'The Land of Oz', oz],
  ['emerald-city', 1024, 559, 'The Emerald City', emerald],
  ['palace', 1024, 559, 'The Palace of Oz', palace],
  ['yellow-castle', 2048, 1117, 'The Yellow Castle of the West', yellow],
  ['china-country', 1024, 559, 'The Dainty China Country', china],
  ['glinda-castle', 1024, 559, 'Glinda’s Castle', glinda],
  ['eastern-road', 2048, 1117, 'The Eastern Road', easternRoad],
  ['southern-road', 2048, 1117, 'The Road South to Glinda', southernRoad],
];
for (const [name,w,h,heading,body] of files) {
  fs.writeFileSync(path.join(out, `${name}.svg`), frame(w,h,heading,body));
  console.log(`${name}.svg ${w}x${h}`);
}
