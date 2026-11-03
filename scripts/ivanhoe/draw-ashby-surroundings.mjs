import fs from 'node:fs'
const out=new URL('./map-originals/',import.meta.url)
const defs=`<defs><g id="tree"><circle r="27" fill="#82965f"/><circle cx="-13" cy="-11" r="19" fill="#a3b37a"/><path d="M0 8v20m0-15-14-14m14 14L14-2" stroke="#63704d" stroke-width="3"/></g><pattern id="paving" width="45" height="25" patternUnits="userSpaceOnUse"><rect width="45" height="25" fill="#b9ac92"/><path d="M0 0h45v25H0Zm22 0v25" stroke="#9c9078" fill="none"/></pattern></defs>`
const plate=(title,subtitle,body,notes)=>`<svg xmlns="http://www.w3.org/2000/svg" width="1500" height="1050" viewBox="0 0 1500 1050">${defs}<rect width="1500" height="1050" fill="#eee3cb"/><g font-family="Georgia,serif" fill="#382f25"><text x="65" y="65" font-size="35">${title}</text><text x="65" y="105" font-size="18">${subtitle}</text>${body}<path d="M65 895H1435" stroke="#b9a57e"/>${notes.map((s,i)=>`<text x="65" y="${935+i*28}" font-size="16">${s}</text>`).join('')}</g></svg>`
let body=`<rect x="70" y="160" width="1360" height="685" rx="25" fill="#bac58d"/>
<path d="M90 340Q310 210 570 310t300-70q190-100 520 10V180H90Z" fill="#cbd09a"/>
<g fill="none" stroke="#99a375" stroke-width="3"><path d="M900 320q170-170 450-25M930 340q170-170 420-25M960 360q150-155 390-25M990 380q140-140 360-25"/></g>
<path d="M115 425q190-200 415-80t140 350Q410 840 140 720Z" fill="#8d9e69"/>
<path d="M750 845q-45-160 35-310t-15-170" fill="none" stroke="#8a8562" stroke-width="125"/>
<path d="M750 845q-45-160 35-310t-15-170" fill="none" stroke="#c7b58b" stroke-width="64"/>
<g stroke="#948568" stroke-width="3"><path d="m750 810 25-7m-36-42 26 5m-14-70 22 10m-9-57 28 10m-4-55 25 7m-14-55 25 10m-16-60 24-2"/></g>
<ellipse cx="420" cy="480" rx="195" ry="135" fill="#c4ce96" stroke="#a5b078" stroke-width="3"/>
<path d="M780 420q-70-80-180-50t-180 110M420 480q-90-180 130-225t570 70" fill="none" stroke="#b4a17a" stroke-width="15" stroke-dasharray="14 9"/>
${[[150,420],[200,640],[290,705],[565,690],[615,575],[600,370],[310,325],[110,590],[865,550],[865,690],[890,790],[680,625],[675,735],[700,460]].map(([x,y])=>`<use href="#tree" x="${x}" y="${y}"/>`).join('')}
<path d="M980 845v-125m-25 125V720m-25 125V720" stroke="#af9b75" stroke-width="8"/>
<text x="990" y="765" font-size="22">Avenue near the outskirts</text>
<text x="815" y="600" font-size="20">Rutted lane</text><text x="815" y="630" font-size="17">Hazel and holly banks</text>
<text x="420" y="450" text-anchor="middle" font-size="24">Woodland opening</text><text x="420" y="482" text-anchor="middle" font-size="18">Moonlit grass within the thicket</text>
<text x="1120" y="235" text-anchor="middle" font-size="24">Open heath and rise</text><text x="1120" y="265" text-anchor="middle" font-size="18">A view toward the lists below</text>
<text x="300" y="800" font-size="19">Thicket between lane and common</text>
<text x="110" y="195" font-size="17">Relative terrain · no compass or measured scale</text>`
fs.writeFileSync(new URL('ashby-woods.svg',out),plate('The wooded approaches outside Ashby','X.71; XI.3–8,49,57–58 · lane, thicket, opening and heath',body,[
'The opening lies beyond the lane’s left-hand bank, within the thicket between the lane and common. The heath rises to a view of the lists.',
'Relief strokes show relative slopes only. Shape, extent, path bends, vegetation and orientation are reconstructed; no surveyed heights are claimed.',
'Dashed paths indicate interpretive connections between narrated places. The avenue’s exact connection and the road back to the pavilions are unstated.'
]))
body=`<rect x="85" y="190" width="745" height="630" fill="#c7b795" stroke="#78634a" stroke-width="14"/>
<text x="455" y="240" text-anchor="middle" font-size="25">Banqueting hall</text>
<rect x="290" y="330" width="330" height="355" rx="7" fill="#d2c3a2" stroke="#8d7251" stroke-width="6"/>
<rect x="315" y="350" width="280" height="315" fill="#e1d4b8"/>
${[375,455,535,615].map(y=>`<circle cx="345" cy="${y}" r="10" fill="#ab9164"/><circle cx="565" cy="${y}" r="10" fill="#ab9164"/>`).join('')}
<path d="M235 340v335m440-335v335" stroke="#9e8059" stroke-width="20"/>
<text x="455" y="760" text-anchor="middle" font-size="18">A table for the assembled guests</text>
<rect x="925" y="190" width="490" height="235" fill="#c9b99a" stroke="#78634a" stroke-width="12"/>
<text x="1170" y="265" text-anchor="middle" font-size="24">Inner hall</text><text x="1170" y="300" text-anchor="middle" font-size="18">Separate narrated room detail</text>
<rect x="925" y="490" width="490" height="220" fill="#c3b092" stroke="#78634a" stroke-width="12"/>
<text x="1170" y="565" text-anchor="middle" font-size="24">Interior apartment</text><text x="1170" y="600" text-anchor="middle" font-size="18">Exact floor and position unknown</text>
<text x="930" y="780" font-size="18">No connecting corridor or door is asserted.</text><text x="930" y="810" font-size="18">These panels are room details, not one footprint.</text>`
fs.writeFileSync(new URL('ashby-castle.svg',out),plate('Ashby · the earlier castle rooms','XIV.3–52; XV.6–28 · the story distinguishes this castle from the later Hastings ruins',body,[
'The banquet room, inner hall and interior apartment are distinct narrated spaces. Their floor assignments, dimensions and exact connections are unstated.',
'Room shapes, table placement, seating, decoration and orientation are illustrative reconstruction; this is not a measured historic plan.',
'The room-detail panels provide navigation without identifying the inner hall with the banquet hall or placing an unseen speaker in the listener’s room.'
]))
console.log('Wrote Ashby woodland and castle SVG plans')
