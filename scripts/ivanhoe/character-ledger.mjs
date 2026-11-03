import {revealGates} from './reveal-gates.mjs'

// First-encounter descriptions only. Later outcomes and concealed connections
// belong to event-gated records, never these permanently visible biographies.
const definitions=[
['gurth','Gurth','A swineherd wearing a brass thrall collar, a patched hide garment and a ram’s horn at his belt.','I.9'],
['wamba','Wamba','Cedric’s jester wears purple, a short crimson cloak, a belled bag-cap and a silver thrall collar.','I.10'],
['fangs','Fangs','Gurth’s ragged lurcher limps while trying to gather the swine; the forest law has disabled his forefeet.','I.12'],
['aymer','The churchman','A well-fed rider on an ornamented mule, dressed in unusually fine monastic cloth and fur.','II.4–5'],
['brian','The armed traveller','A tall, sun-darkened traveller with a scarred brow, black moustaches and mail beneath a scarlet mantle.','II.6–8'],
['hamet','An eastern attendant','One of the two eastern attendants travelling with the armed rider, wearing a white turban, embroidered garments and silver ornaments.','II.9–10,51'],
['abdalla','The other eastern attendant','One of the armed rider’s two eastern attendants, equipped for the road with a sabre, dagger and saddle-bow javelins.','II.9–10,51'],
['hugo','Hugo','A lance-bearing member of the travelling retinue whom the armed rider addresses at Sunken Cross.','II.56'],
['palmer','The guide at Sunken Cross','A solitary traveller at the cross who knows a safe route to Rotherwood through the marshy wood.','II.57–61'],
['cedric','Cedric the Saxon','The broad-shouldered landholder of Rotherwood, proud of his ancestry and impatient at the delay of supper.','III.7–9'],
['balder','Balder','Cedric’s favoured old wolf-dog, who rests his shaggy head against the master’s knee.','III.10'],
['oswald','Oswald','A household officer attending Cedric in Rotherwood’s hall.','III.11–17'],
['elgitha','The handmaid','A handmaid attending Rowena who answers Cedric’s questions about her mistress.','III.11–17'],
['hundebert','Hundebert','Cedric’s major-domo carries a white wand and arranges hospitality for arriving travellers.','III.22'],
['rotherwoodwarder','The warder of Rotherwood','A gate attendant who brings the travellers’ request for lodging into the hall.','III.21'],
['rowena','Rowena','Cedric’s ward enters the hall with attendants, long gem-braided curled locks and a bearing of quiet authority.','IV.26–30'],
['isaac','Isaac of York','An elderly traveller seeking shelter, wearing a rain-worn russet cloak, purple tunic and yellow cap.','V.14–16'],
['ambrose','Brother Ambrose','A member of the Prior’s company entrusted with the ivory reliquary for safekeeping.','V.54'],
['anwold','Anwold','A Rotherwood servant who conducts the Palmer toward Rowena’s rooms.','VI.3–6'],
['edwina','The waiting-maid','A handmaid encountered among the attendants outside Rowena’s chamber.','VI.6'],
['wyvil','William de Wyvil','One of the marshals charged with order and ceremony at the Ashby tournament.','VII.13'],
['martival','Stephen de Martival','A marshal officiating at the Passage of Arms at Ashby.','VII.13'],
['rebecca','Rebecca','Isaac’s daughter, watchful beside him at the lists, wearing a yellow turban and richly worked dress.','VII.16–22'],
['yeoman','The yeoman in green','A composed archer whose blunt replies draw Prince John’s displeasure at the tournament.','VII.17–21'],
['john','Prince John','Richard’s brother presides over the Ashby gathering with lavish display and an impatient temper.','VII.17 onward'],
['athelstane','Athelstane of Coningsburgh','A large Saxon nobleman attending the tournament with Cedric’s company.','VII.21–29'],
['debracy','De Bracy','The leader of a company of hired soldiers, attending Prince John at Ashby.','VII.30–38'],
['fitzurse','Waldemar Fitzurse','A calculating nobleman among Prince John’s advisers at the tournament.','VIII.3–24'],
['frontdeboeuf','Reginald Front-de-Boeuf','A formidable challenger at Ashby, known among Cedric’s neighbouring Norman landholders.','II.44; VIII.24 onward'],
['malvoisin','Sir Malvoisin','A Norman challenger whose pavilion stands among the five at the southern end of the lists.','VIII.24 onward'],
['grantmesnil','Sir Hugh de Grantmesnil','One of the five knights maintaining the challenge at Ashby.','VIII.24 onward'],
['vipont','Ralph de Vipont','A Hospitaller among the five challengers awaiting opponents at Ashby.','VIII.24 onward'],
['disinherited','The Disinherited Knight','An anonymous armoured challenger on a black horse, bearing an uprooted young oak on his shield.','VIII.40–47'],
['alicia','Alicia','A lady in the tournament galleries whose companions hope she will receive the day’s honour.','IX.20 onward'],
['unknownsquire','The concealed squire','The Disinherited Knight’s private attendant keeps his face hidden beneath a Norman bonnet.','X.3'],
['baldwin','Baldwin','Brian’s squire brings the equipment forfeited by his master at the tournament.','X.5–14'],
['reuben','Reuben','An attendant serving the household in which Isaac and Rebecca lodge near Ashby.','X.70; XXVIII.3 onward'],
['outlawcaptain','The masked captain','The leader of the band that stops Gurth on his return through the dark lane.','XI.8 onward'],
['miller','The miller','A powerful staff-fighter among the men who intercept Gurth outside Ashby.','XI.46 onward'],
['blackknight','The Black Knight','A large knight on a black charger, with black armour and no device on his shield.','XII.34'],
['richard','Richard of England','The king whose captivity and absence form the background to the unrest in England.','I.4'],
['ivanhoe','Ivanhoe','The young knight revealed beneath the victor’s helmet, pale from blood loss and wounded in the side.','XII.45–49'],
['debigot','De Bigot','A Norman guest among Prince John’s company when the wounded victor is discussed.','XIII.13'],
['locksley','Locksley','A self-possessed yeoman archer who faces Prince John’s threats without surrendering his bow.','XIII.38–43'],
['hubert','Hubert','A forester in Malvoisin’s service whose shooting wins the first round of the archery contest.','XIII.45'],
['guarddogs','The guard dogs','Two large shaggy dogs, described as half greyhound and half mastiff, held back when the hut door opens.','XVI.25–27'],
['hermit','The hermit','The solitary occupant of a woodland hut beside a ruined chapel and spring.','XVI.12 onward'],
['waltheoff','Waltheoff','The abbot at Saint Withold’s who receives Cedric’s returning party.','XVIII.17'],
['urfried','The old spinner','An elderly woman spinning hemp in Torquilstone’s turret chamber, resentful of being displaced.','XXIV.3–6'],
['maskedvisitor','The muffled visitor','A tall man enters Rebecca’s turret chamber with his cap and mantle concealing his face.','XXIV.24'],
['engelred','Engelred','A domestic in Torquilstone sent to obtain the chaplain’s writing materials.','XXV.35–42'],
['giles','Giles','A castle attendant who announces the verified arrival of the Prior’s messenger.','XXVII.95–101'],
['seth','Seth','One of the attendants ordered to bear the wounded knight in Isaac’s litter.','XXVIII.3–11'],
['unseenvoice','The voice beside the bed','An unseen speaker challenges the wounded Baron from beside his couch.','XXX.21–30'],
['gilbert','Gilbert','A member of Locksley’s company at the distribution of the spoils.','XXXII.70'],
['clementoutlaw','Clement of the outlaws','One of the forest company called upon during the gathering after the siege.','XXXII.89'],
['winkelbrand','Winkelbrand','De Bracy’s lieutenant, whom Fitzurse says he has ordered to ride to Torquilstone.','XXXIV.13'],
['hughbardon','Hugh Bardon','A follower who brings Prince John intelligence about the travellers and receives another watching task.','XXXIV.67–77'],
['nathan','Nathan Ben Israel','Isaac’s friend and host in an unnamed town near the Preceptory of Templestowe.','XXXV.3 onward'],
['beaumanoir','Lucas de Beaumanoir','The elderly Grand Master of the Temple, austere in dress and resolute about the Order’s discipline.','XXXV.19 onward'],
['conrade','Conrade of Mont-Fitchet','A preceptor attending the Grand Master during his visitation of Templestowe.','XXXV.19 onward'],
['damian','Damian','The Preceptory’s gate officer who carries news of Isaac’s request for an audience.','XXXV.30–37'],
['albert','Albert de Malvoisin','The Preceptor of Templestowe, anxious to manage the Grand Master’s unexpected scrutiny.','XXXVI.3 onward'],
['herman','Herman of Goodalricke','A preceptor attending the tribunal in Templestowe’s great hall.','XXXVII.18 onward'],
['higg','The witness on crutches','A man using crutches who comes forward to describe the treatment Rebecca gave him.','XXXVII.24–29'],
['bensamuel','Rabbi Ben Samuel','A physician who accompanies Isaac near Templestowe and helps when he collapses.','XXXVIII.38–41'],
['botolphprior','The Prior of Saint Botolph’s','The hospitable prior of the small religious house where Ivanhoe recuperates.','XL.3 onward'],
['diggory','Father Diggory','A friar at Saint Botolph’s whose toothache interferes with his breakfast.','XL.31'],
['blueknight','The Blue Knight','An armoured leader who hangs back during the attack on the forest road before striking at the black charger.','XL.98'],
['scathlock','Scathlock','A member of Robin’s company entrusted with a concealed horn signal.','XLI.21'],
['coningsburghsteward','The steward of Coningsburgh','An officer in black with a white wand who escorts distinguished guests from the crowded court.','XLI.44'],
['edith','Edith','Athelstane’s mother, dressed in mourning and receiving visitors in the small oratory.','XLII.9–11'],
['dennet','Dennet','An elderly spectator who repeats the story circulating about Coningsburgh.','XLIII.8 onward'],
['minstrel','The minstrel of Sherwood','A finely dressed musician wearing a silver chain, harp-key and Sherwood badge.','XLIII.10'],
['herald','The herald at Templestowe','An officer who carries the tribunal’s questions and proclaims the challenge in the lists.','XLIII.44 onward'],
['arrivingknight','The arriving knight','An exhausted mounted challenger approaches the lists on a spent horse and offers to defend Rebecca. His name has not yet been given.','XLIII.68–70'],
['bohun','Henry Bohun','The Earl of Essex who arrives among Richard’s armed followers.','XLIV.8–12'],
['executionattendants','The four fuel attendants','Four enslaved Black men stand beside the prepared fuel at the western end of the lists. One directs the others as they move the wood.','XLIII.6–7'],
]

export const workingCharacterKey={oldspinner:'urfried',ulrica:'urfried',goodalricke:'herman'}
export const characters=definitions.map(([key,name,description,source])=>({key,name,description,source,aliases:[],nameChanges:[],aliasesFrom:[],portraitAsset:['gurth','wamba','cedric','rowena','rebecca','brian','aymer','isaac','fangs','palmer'].includes(key)?key:null}))
const byKey=key=>{const row=characters.find(c=>c.key===key);if(!row)throw Error(`Unknown person ${key}`);return row}
// Same embodied archer after his public name is given; never assign this face
// to the masked captain before the source links that separate encounter.
byKey('yeoman').portraitAsset='yeoman'
byKey('locksley').portraitAsset='yeoman'
byKey('athelstane').portraitAsset='athelstane'
const rename=(key,gate,name)=>byKey(key).nameChanges.push({eventId:revealGates[gate].eventId,name})
rename('aymer','aymer','Prior Aymer')
rename('hamet','attendants','Hamet')
rename('abdalla','attendants','Abdalla')
rename('edwina','edwina','Edwina')
rename('higg','higgName','Higg')
rename('elgitha','elgitha','Elgitha')
rename('debracy','maurice','Maurice de Bracy')
rename('brian','brian','Brian')
rename('brian','brianSurname','Brian de Bois-Guilbert')
rename('palmer','palmer','The Palmer')
rename('urfried','urfried','Urfried')
rename('urfried','ulrica','Ulrica')
rename('locksley','robinHood','Robin Hood')
rename('hermit','friarTuck','Friar Tuck')
rename('hermit','clerk','The Clerk of Copmanhurst')
rename('minstrel','allanADale','Allan-a-Dale')
for(const [key,head,gate] of [['unknownsquire','gurth','squireGurth'],['disinherited','ivanhoe','disinheritedIvanhoe'],['yeoman','locksley','locksley'],['blueknight','fitzurse','blueKnightFitzurse'],['blackknight','richard','blackKnightRichard'],['maskedvisitor','brian','maskedVisitorBrian'],['unseenvoice','urfried','unseenVoiceUlrica'],['outlawcaptain','locksley','captainVoice'],['palmer','ivanhoe','palmerIvanhoe'],['arrivingknight','ivanhoe','arrivingKnightIvanhoe']])byKey(key).revealedAs={key:head,eventId:revealGates[gate].eventId}
for(const [key,alias,gate] of [['locksley','Robert Locksley','robertLocksley'],['locksley','Cleave-the-Wand','robertLocksley'],['locksley','Diccon Bend-the-Bow','diccon'],['locksley','Locksley','locksley'],['urfried','Urfried','urfried']]){
  byKey(key).aliases.push(alias);byKey(key).aliasesFrom.push({alias,eventId:revealGates[gate].eventId})
}

// Authoring blockers, not permission to ship independent duplicated people.
// Completed authoring tasks: SOURCE_REVIEW.md and qa/departure-witness-review.json. Final release still requires hash-bound approval.
export const unresolvedIdentities=[]
for(const character of characters)character.nameChanges.sort((a,b)=>{
  const order=eventId=>{const match=eventId.match(/source-(\d+)-p(\d+)$/);if(!match)throw Error(`Bad source event ${eventId}`);return Number(match[1])*1_000_000+Number(match[2])}
  return order(a.eventId)-order(b.eventId)
})

export function canonicalCast(scene){
  const seen=new Set()
  return Object.entries(scene.cast).map(([workingKey,status])=>{
    const key=workingCharacterKey[workingKey]??workingKey
    if(!characters.some(c=>c.key===key))throw Error(`Unknown character ${workingKey}`)
    if(seen.has(key))throw Error(`Duplicate embodied person ${key}`)
    seen.add(key)
    // Explicit null means the destination is unknown. Nullish fallback would
    // falsely leave a departing person in the event's room.
    const location=Object.hasOwn(scene.places??{},workingKey)?scene.places[workingKey]:scene.location
    const fate=scene.fates?.[workingKey]
    if(fate&&typeof fate.isAlive!=='boolean')throw Error(`Invalid direct fate ${workingKey}`)
    return {key,status,location,...(fate?{isAlive:fate.isAlive,fateEvidence:fate.source}:{})}
  })
}

byKey('blackknight').portraitAsset='blackknight'

byKey('john').portraitAsset='john'

byKey('beaumanoir').portraitAsset='beaumanoir'

byKey('balder').portraitAsset='balder'

byKey('hundebert').portraitAsset='hundebert'

byKey('oswald').portraitAsset='oswald'

byKey('ivanhoe').portraitAsset='ivanhoe'

byKey('disinherited').portraitAsset='disinherited'

byKey('urfried').portraitAsset='urfried'

byKey('higg').portraitAsset='higg'

byKey('conrade').portraitAsset='conrade'

// One collective actor preserves the explicitly numbered pair without inventing names or individual actions.
byKey('guarddogs').tags=['Two dogs']

byKey('hamet').portraitAsset='hamet'

byKey('abdalla').portraitAsset='abdalla'

byKey('guarddogs').portraitAsset='guarddogs'

// Individually source-reviewed portraits; unspecified appearance is illustrative.
byKey('hugo').portraitAsset='hugo'
byKey('elgitha').portraitAsset='elgitha'
byKey('ambrose').portraitAsset='ambrose'

byKey('anwold').portraitAsset='anwold'

byKey('edwina').portraitAsset='edwina'

byKey('rotherwoodwarder').portraitAsset='rotherwoodwarder'

byKey('debracy').portraitAsset='debracy'

byKey('fitzurse').portraitAsset='fitzurse'

byKey('frontdeboeuf').portraitAsset='frontdeboeuf'

// Source-grounded portraits; unknown appearance stays an illustrative choice.
byKey('wyvil').portraitAsset='wyvil'
byKey('martival').portraitAsset='martival'
byKey('unknownsquire').portraitAsset='unknownsquire'
byKey('hermit').portraitAsset='hermit'

byKey('malvoisin').portraitAsset='malvoisin'
byKey('grantmesnil').portraitAsset='grantmesnil'
byKey('vipont').portraitAsset='vipont'
byKey('alicia').portraitAsset='alicia'

byKey('baldwin').portraitAsset='baldwin'
byKey('reuben').portraitAsset='reuben'
byKey('outlawcaptain').portraitAsset='outlawcaptain'
byKey('miller').portraitAsset='miller'

byKey('hubert').portraitAsset='hubert'
byKey('debigot').portraitAsset='debigot'
byKey('waltheoff').portraitAsset='waltheoff'
byKey('maskedvisitor').portraitAsset='maskedvisitor'

byKey('engelred').portraitAsset='engelred'
byKey('giles').portraitAsset='giles'
byKey('seth').portraitAsset='seth'
byKey('unseenvoice').portraitAsset='unseenvoice'

byKey('gilbert').portraitAsset='gilbert'
byKey('clementoutlaw').portraitAsset='clementoutlaw'
byKey('hughbardon').portraitAsset='hughbardon'
byKey('nathan').portraitAsset='nathan'

byKey('damian').portraitAsset='damian'
byKey('albert').portraitAsset='albert'
byKey('herman').portraitAsset='herman'
byKey('bensamuel').portraitAsset='bensamuel'

byKey('botolphprior').portraitAsset='botolphprior'
byKey('diggory').portraitAsset='diggory'
byKey('blueknight').portraitAsset='blueknight'
byKey('scathlock').portraitAsset='scathlock'

byKey('coningsburghsteward').portraitAsset='coningsburghsteward'
byKey('edith').portraitAsset='edith'
byKey('dennet').portraitAsset='dennet'
byKey('minstrel').portraitAsset='minstrel'

byKey('herald').portraitAsset='herald'
byKey('arrivingknight').portraitAsset='arrivingknight'
byKey('bohun').portraitAsset='bohun'
byKey('richard').portraitAsset='richard'
byKey('winkelbrand').portraitAsset='winkelbrand'
byKey('executionattendants').portraitAsset='execution-attendants'
