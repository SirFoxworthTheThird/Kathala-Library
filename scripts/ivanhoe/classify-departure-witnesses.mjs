import fs from 'node:fs'
import assert from 'node:assert/strict'
import {reviewedChapters} from './scene-review.mjs'
import {canonicalCast} from './character-ledger.mjs'

// Manual decisions after reading the complete candidate paragraphs in the
// pinned source. This concordance is one review scope, not proof that a keyword
// search found every movement in the novel.
const notes=`
1.9|Clothing leaves knees bare; no departure.
1.13|Collar cannot be removed; no actual custody or travel change.
2.40|Travellers withdraw after the directions; the encounter ends, not an arrival at the house.
3.9|Clothing exposes the knee; no departure.
3.23|Hundebert leaves to execute orders; explicit state added with unknown endpoint.
3.29|Elgitha leaves to deliver the message; explicit state added with unknown endpoint.
4.6|The Palmer withdraws to a settle under the hall chimney, remaining inside the hall.
4.37|Aymer leaves weaker liquor to his lay brother; a choice of drink, not a bodily exit.
4.50|Oswald leaves the hall after arranging accommodation; endpoint cleared.
5.27|Wamba's hypothetical advice that Richard should have left the crusade to the Knights is not an actual journey.
5.33|Brian withdraws his fingers from his sword; he does not leave the hall.
5.57|Cedric and Rowena retire by separate doors; states added with unknown destinations.
6.11|The maidens retire further within the room, not out of it.
6.36|Figurative pressure in dialogue; no bodily removal.
6.51|Gurth is asked to fetch mounts and leaves; the next scene does not invent him beside the wicket speakers.
6.58|The riders disappear under trees; endpoint unknown until later account.
7.17|Isaac would have withdrawn but does not do so.
7.50|John resumes his circuit after the money exchange; no early gallery or banquet arrival.
8.21|Rules describe who shall have borne himself best tomorrow; no present removal or premature future award.
8.23|Heralds withdraw; marshals retain their distinct functions.
8.30|Challengers retire between rounds and return in the same scene; no final departure is inferred.
8.47|Shield removed; object action, not bodily departure.
8.49|Opposite end stations after the first course; northern knight endpoint corrected.
8.62|Vipont is carried off alive, destination unknown; no invented infirmary or death.
9.19|Figurative change in vanity, not travel.
9.45|Tournament arrangements and withdrawal concern the closing company, not an early banquet arrival.
9.51|John rides away with his train; endpoint unknown.
9.52|The victor actually retires to the lent pavilion; its established endpoint is retained as the onlookers disperse.
10.14|Baldwin has departed after the interview; unknown endpoint retained.
10.28|Gurth has left the pavilion; route not inferred from his later appearance.
10.63|Gurth has left Isaac's room; no assumed continuing room presence.
10.65|Rebecca's unnoticed departure is reported; offstage location fact clears stale room state.
11.45|Proposed release is not yet the actual release of Gurth.
11.57|Release and guidance occur in the scene; the heath endpoint follows the narrated route.
12.17|Anonymous ceremonial heralds retire; no invented named departure state.
12.19|Both marshals withdraw before the onset; unknown endpoints, Martival state restored.
12.20|Anonymous wounded men are removed; do not assign every named combatant a new room.
12.37|Aggregate wounded departures do not establish individual destinations or deaths.
12.40|Absent black-armoured victor reported gone; location-clearing fact added without a bodily snapshot.
12.44|Rowena descends to the actual queen's steps.
12.45|Helmet removed; identity reveal follows the source rather than an earlier alias.
13.11|Fitzurse reports Ivanhoe taken away; location-clearing fact added without invented presence.
13.18|John is about to signal retirement but is interrupted; no completed exit.
13.27|Wish about dismissing commons; no completed departure.
13.30|Retrospective crowd account; no new named physical state.
13.31|Anonymous archers withdraw; no fabricated individual actor.
13.50|Target removed; object movement.
13.52|Arrow leaves bowstring; object movement.
13.63|Locksley cuts a willow and sets it up in the continuing scene; do not stop him in an invented wood location.
13.72|Signal to retire closes the field episode; no specific banquet arrival is narrated here.
14.41|Cedric and Athelstane leave the banquet; both endpoints unknown.
14.42|John comments on their prior departure; no fresh presence for the Saxons.
15.16|Fitzurse reports the Saxons' earlier exit; they are absent.
15.23|De Bracy leaves; next location unknown.
15.27|Fitzurse looks after De Bracy; no corresponding exit by Fitzurse.
16.3|Knight ends at an unnamed hostelry; road pin cleared.
16.4|West Riding is a broad region; no precise road coordinate invented.
16.20|Hermit's proposed route is advice, not a completed journey or established ford.
16.32|Knight fetches his horse and returns in the same paragraph; hut endpoint remains supported.
17.14|Song about a crusader, not actual present journey.
18.12|Earlier movement recalled; not a fresh disembarkation.
18.18|Dog and cavalcade at the gate; later road movement belongs to later scene.
18.19|Gate-side preparations and departure; no prematurely reached road destination.
19.5|Isaac reports mercenaries' flight; absent men get no physical snapshots.
20.15|Anonymous messengers disperse; principal rescue party's later clearing arrival is narrated separately.
20.24|Banquet apparatus removed; object movement, not an exit by the hut company.
22.3|Narrator leaves the Saxon strand for Isaac; no bodily transfer by the narrator's subjects.
22.7|Bolts withdraw as the Baron and attendants enter the dungeon; actual arrival.
22.10|One unnamed attendant retires to a corner within the dungeon; do not invent which named attendant moved.
22.56|Baron and attendants leave; all three endpoints unknown.
24.8|Anonymous guard leaves; Rebecca and Ulrica remain.
24.18|Ulrica leaves; endpoint unknown.
25.66|Wamba leaves the oak on his mission; no early castle arrival.
26.59|A plea not to leave is not itself an actual departure.
27.30|Figurative emotional support, not a bodily transfer.
27.59|Cedric strides outside the outwork into open field; endpoint unknown, Baron remains behind.
27.72|Baron recalls dismissing Cedric; no fresh Cedric presence.
27.101|Prisoners are removed as Ambrose arrives; Wamba's passing remark restored, both prisoner endpoints unknown.
28.17|Earlier treatment and transport recalled; not repeated as present-time movement.
29.8|Rebecca returns to the sickroom then reaches the window in this scene; endpoint follows the later action.
29.17|Possible withdrawal of bridge is hypothetical at this beat.
29.40|Rebecca returns to the window after retiring briefly; final window endpoint supported.
30.42|Ulrica leaves, destination unknown; Baron's calls do not create absent allies' presence.
31.20|Followers retreat to the outwork; named attackers have crossed, De Bracy remains above.
31.71|Wamba and Athelstane escape into the court, where Brian is mounted; all three court endpoints corrected.
32.9|Miller's party hastens away to search; exact endpoint unknown.
32.37|De Bracy steps back, without leaving the assembly.
32.38|Saxon party departs; no early Coningsburgh arrival.
32.46|Funeral preparations concern the man believed dead; no new living Athelstane snapshot.
32.70|Friar reports prior cellar rescue; no replayed transfer or new absent-person appearance.
32.98|Generic released prisoners reported; Aymer's actual arrival is separately represented.
33.53|Glory departed is figurative.
33.67|Locksley reports earlier abduction; Rebecca is not physically present in this conversation.
33.105|Isaac sets out; unknown endpoint until Nathan's house is actually established.
34.58|Fitzurse leaves John; destination unknown.
34.64|De Bracy actually walks the castle antechamber; broad York Castle endpoint remains supported.
34.65|Prior departure is reported; no new De Bracy appearance beside John and Bardon.
34.77|Bardon retires after instructions; exact destination unknown.
35.3|Isaac reaches Nathan's house in the unnamed town; no invented geographic pin.
35.9|A departed vow is figurative, not a physical movement.
35.24|Abstract religious rules do not establish actual arrivals or departures.
35.36|Damian leaves and returns in the paragraph, then retires by the scene end; unknown final endpoint retained.
36.23|Albert leaves Master and finds Brian; endpoint follows the actual later conversation, not the intermediate exit.
37.10|Religious exhortation to remove evil is not an actual physical departure.
37.33|Higg withdraws into the crowd, remaining on the public floor.
37.35|Rebecca removes a veil, not herself from the tribunal.
38.55|Isaac and Ben Samuel part on separate roads; endpoints cleared while Higg remains watching.
39.58|Brian leaves Rebecca's cell; endpoint unknown.
39.66|Albert's discussion of possible flight is hypothetical; no actual gate visit.
39.72|Brian leaves and Albert follows; both subsequent exact rooms unknown.
40.3|Knight reaches Botolph's; earlier transport is reported, not replayed as fresh Gurth/Wamba presence.
40.12|Knight and Wamba vanish along the forest road; Ivanhoe returns inside the priory.
40.122|A name borne abroad is figurative, not bodily movement.
41.34|Historical future commentary; no contemporary cast or premature death state.
42.8|Visitors follow Cedric to the chapel; actual arrival represented.
42.12|Guests withdraw after meeting Edith; knight and Ivanhoe endpoints unknown before next upstairs scene.
42.41|Athelstane's departed spirit is a mistaken belief; he has returned alive.
42.70|Ivanhoe's departure after calling Gurth is reported; both stale locations cleared through offstage facts, no invented travel snapshots.
43.8|Dennet's supernatural abduction rumour is not factual Athelstane movement.
43.24|Friar recounts prior transport; no new Athelstane appearance at Templestowe.
43.34|Procession approaches actual lists; route follows narrated movement.
43.37|Procession circles, halts and dismounts in the lists; subsequent stations separate.
43.49|Herald carries answer east but returns west by paragraph51 in the same scene; west endpoint retained.
43.80|Master signals from eastern tribunal; herald withdraws to an unspecified side, endpoint cleared.
44.24|Master leads Templars off the ground; endpoint unknown.
44.34|Isaac and Rebecca have reached Nathan's house by paragraph33; endpoint corrected, no continued lists presence.
44.55|Elgitha withdraws; final visitor chamber location is itself unknown and remains unpinned.
44.82|Closing literary quotation, not a fresh bodily departure or death.
`.trim().split('\n').map(line=>{const [point,...text]=line.split('|');return [point,text.join('|')]})
const decisions=new Map(notes)
assert.equal(decisions.size,notes.length,'Duplicate manual decision')
const candidates=JSON.parse(fs.readFileSync(new URL('./qa/departure-candidates.json',import.meta.url),'utf8'))
assert.equal(candidates.candidates.length,decisions.size,'Changed source concordance requires review')
const review=candidates.candidates.map(row=>{
 const point=`${row.chapter}.${row.paragraph}`
 assert.ok(decisions.has(point),`Unreviewed departure witness ${point}`)
 const scenes=reviewedChapters.find(c=>c.chapter===row.chapter).scenes.filter(s=>s.from<=row.paragraph&&(s.to>row.paragraph||(s.to===row.paragraph&&(s.toOffset??0)>0)))
 return {point,decision:decisions.get(point),sceneEndpoints:scenes.map(s=>({from:s.from,cast:canonicalCast(s).map(p=>({key:p.key,location:p.location}))}))}
})
fs.writeFileSync(new URL('./qa/departure-witness-review.json',import.meta.url),JSON.stringify({scope:'Manual pinned-source departure concordance; does not substitute for complete scene, inventory or final browser review',sourceSha256:candidates.sourceSha256,reviewed:review.length,decisions:review},null,2)+'\n')
console.log(`${review.length}/${candidates.candidates.length} departure-word paragraphs classified`)
