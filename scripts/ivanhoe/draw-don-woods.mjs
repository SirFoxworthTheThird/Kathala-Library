import fs from 'node:fs'
const panel=(x,y,w,h,title,body)=>`<g transform="translate(${x} ${y})"><rect width="${w}" height="${h}" rx="18" fill="#bdca98" stroke="#a7b27f" stroke-width="3"/><text x="25" y="38" font-size="26">${title}</text>${[0,1,2].map(i=>`<path d="M25 ${110+i*35}Q${w/2} ${20+i*45} ${w-25} ${150+i*50}" fill="none" stroke="#9eae7c" stroke-width="3"/>`).join('')}${body}</g>`
const trees=(points)=>points.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="25" fill="#899b64"/><circle cx="${x-5}" cy="${y-8}" r="18" fill="#a7b67d"/>`).join('')
let body=panel(70,160,1230,690,'Woodland ways toward Rotherwood',`
<path d="M80 545Q220 400 400 440T700 430M700 430L1110 430M700 430L700 200M700 430L700 620" fill="none" stroke="#ad9970" stroke-width="20"/>
<ellipse cx="220" cy="285" rx="125" ry="80" fill="#cbd29f" stroke="#a1b17b" stroke-width="4"/>
${Array.from({length:7},(_,i)=>{const a=i*Math.PI*2/7;return `<rect x="${220+80*Math.cos(a)-8}" y="${280+42*Math.sin(a)-15}" width="16" height="30" rx="3" fill="#8b8876"/>`}).join('')}
<path d="M70 365Q210 410 355 350" fill="none" stroke="#8cabb0" stroke-width="13"/><rect x="315" y="350" width="28" height="20" fill="#858273"/>
<text x="220" y="205" text-anchor="middle" font-size="21">Seven standing stones</text><text x="80" y="590" font-size="19">Woodland vista</text>
<path d="M700 410v-35m-12 12h24" stroke="#80775f" stroke-width="7"/><text x="745" y="400" font-size="21">Sunken Cross</text>
<path d="M930 300Q870 410 950 550M1010 320Q960 420 1030 550" fill="none" stroke="#86a8ae" stroke-width="13"/><ellipse cx="965" cy="450" rx="85" ry="85" fill="none" stroke="#8ea47a" stroke-width="3" stroke-dasharray="6 6"/>
<text x="900" y="600" font-size="19">Marshy crossings</text><text x="1060" y="370" font-size="20">Wide avenue</text><text x="1080" y="510" font-size="19">Rotherwood</text>
${trees([[100,100],[400,160],[525,275],[120,460],[475,570],[1100,155],[830,230]])}
<text x="30" y="655" font-size="17">Only narrated junctions and the marsh route are connected. Other path lengths and directions are reconstructed.</text>`)
body+=panel(1340,160,790,690,'Toward Sheffield',`
<path d="M100 550Q250 450 360 390T650 260" fill="none" stroke="#ad9970" stroke-width="22"/>
${trees([[130,180],[290,220],[410,140],[650,480],[240,560]])}<circle cx="360" cy="390" r="45" fill="#879961"/>
<text x="50" y="610" font-size="21">Paths beyond the postern</text><text x="370" y="450" font-size="20">Boundary oak</text>
<path d="M535 235q70-75 150-20m-160 35q80-80 170-20" fill="none" stroke="#8e9d71" stroke-width="4"/><text x="410" y="170" font-size="21">Rise overlooking Sheffield</text>
<text x="30" y="655" font-size="17">Sequence and broad ascent only; no measured route.</text>`)
body+=panel(70,895,1230,700,'Saint Withold’s country',`
<path d="M110 190Q330 170 550 320T1080 460" fill="none" stroke="#ad9970" stroke-width="24"/>
<rect x="70" y="105" width="160" height="90" fill="#b5a27c" stroke="#7d6b4d" stroke-width="7"/><text x="55" y="240" font-size="22">Convent and gate</text>
<ellipse cx="390" cy="245" rx="40" ry="25" fill="#91b2b7"/><text x="300" y="205" font-size="20">Roadside spring</text>
<text x="585" y="275" font-size="20">Forest-edge road</text><text x="555" y="400" font-size="19">Roadside halt</text>
<path d="M870 200Q810 350 900 570" fill="none" stroke="#8aa9ae" stroke-width="20"/><path d="M800 220Q750 360 825 570M945 220Q890 360 960 570" fill="none" stroke="#9eae7c" stroke-width="4"/>
<text x="850" y="625" font-size="21">Narrow brook crossing</text>${trees([[300,95],[700,120],[1080,170],[500,530],[650,550],[1100,570]])}
<text x="460" y="600" font-size="20">Thicket</text><path d="M500 530Q350 490 180 510" fill="none" stroke="#ad9970" stroke-width="15" stroke-dasharray="12 8"/><circle cx="180" cy="510" r="45" fill="#879961"/><text x="45" y="585" font-size="22">Separate gathering oak</text><text x="40" y="650" font-size="17">Spring and roadside halt precede the descending brook pass; exact local directions remain unknown.</text>`)
body+=panel(1340,895,790,700,'Road toward Coningsburgh',`
<path d="M80 280Q300 300 380 420T700 530" fill="none" stroke="#ad9970" stroke-width="24"/>
<ellipse cx="350" cy="370" rx="150" ry="115" fill="#c9d0a0"/>${trees([[120,120],[280,175],[500,210],[600,620],[120,550],[390,390]])}
<text x="30" y="270" font-size="21">Woodland road</text><text x="440" y="350" font-size="21">Opening and oak</text><text x="440" y="390" font-size="18">Thicket along the path</text>
<circle cx="640" cy="520" r="40" fill="#8e9f67"/><text x="400" y="590" font-size="21">Another oak rendezvous</text>
<text x="25" y="650" font-size="17">Separate woodland sequence; not a surveyed continuation.</text>`)
fs.writeFileSync(new URL('./map-originals/don-woods.svg',import.meta.url),`<svg xmlns="http://www.w3.org/2000/svg" width="2200" height="1800" viewBox="0 0 2200 1800"><rect width="2200" height="1800" fill="#eee3cc"/><g font-family="Georgia,serif" fill="#392f25"><text x="65" y="65" font-size="36">The Don country · woodland route details</text><text x="65" y="110" font-size="21">I–II; VI; XVIII–XIX; XL–XLI · separate local panels, without a continuous surveyed itinerary</text>${body}<path d="M65 1640h2070" stroke="#b8a17b"/><text x="65" y="1680" font-size="19">Hill, brook, thicket, junction and relative route features follow the narrated passages. Contours indicate qualitative relief only.</text><text x="65" y="1715" font-size="19">Panel spacing, vegetation, path geometry and distances are reconstructed. Separate panels are not geographic neighbours; no north arrow or metric scale is claimed.</text><text x="65" y="1750" font-size="19">The regional map provides the Don-country context between Sheffield and Doncaster. Unstated connecting routes remain unstated.</text></g></svg>`)
