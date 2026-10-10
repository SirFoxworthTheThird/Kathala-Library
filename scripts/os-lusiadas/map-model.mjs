import fs from 'node:fs'

const coords=JSON.parse(fs.readFileSync(new URL('./map-marker-coordinates.json',import.meta.url),'utf8'))
export const mapDefs=[
  ['ocean',null,'Ocean road to India','The Atlantic turn around Africa and the Indian Ocean crossing, set on a geographically scaled chart.'],
  ['iberia','ocean','Portugal and the Tagus','The departure coast and the places of the monarchy recalled in Gama’s account.'],
  ['east-africa','ocean','East African coast','The ports and coastal approaches between Sofala and Melinde.'],
  ['malabar','ocean','Malabar approach','The coast reached by the fleet after its Indian Ocean crossing.'],
  ['calicut-city','malabar','Calicut narrated places','A schematic plan of the landing, royal audience, and trading sites.'],
  ['england',null,'England and Flanders','The English court and a continental stop in Veloso’s shipboard tale.'],
  ['island',null,'The Island of Love','An allegorical island, drawn from the poem without earthly coordinates.'],
  ['divine',null,'Divine settings','A conceptual chart of the poem’s divine councils, high air, and sea.'],
]

// [key,map,printed-label,name,description,child-map]. Printed labels are
// geometric references; reading-mode entity names come from this ledger.
export const placeDefs=[
  ['lisbon-sea','ocean','Lisbon','Lisbon','The Tagus mouth from which the fleet’s long sea road begins.','iberia'],
  ['east-african-coast','ocean','Mozambique','East African coast','An island coast ahead of the fleet, before its name is learned.'],
  ['atlantic-passage','ocean','Atlantic passage','South Atlantic passage','The open-water turn west of Africa before the cape.'],
  ['ocean-crossing','ocean','Indian Ocean crossing','Indian Ocean crossing','The long open-sea passage between East Africa and the coast of India.'],
  ['cape-verde','ocean','Cape Verde','Cape Verde waters','The Atlantic islands west of Africa passed early in the outward voyage.'],
  ['st-helena','ocean','St Helena Bay','St Helena Bay','A sheltered bay on the west coast of southern Africa where the fleet pauses.'],
  ['southern-bay','ocean','St Helena Bay','Southern bay','A sheltered bay on the southern African coast where the crew lands and measures the sun.'],
  ['cape','ocean','Cape of Good Hope','Cape of Good Hope','The headland at Africa’s southern turn, where Atlantic and Indian Ocean passage meet.'],
  ['southern-cape-approach','ocean','Cape of Good Hope','Southern headland','A dark southern headland approached by the fleet before the apparition explains its place.'],
  ['southern-trade-shore','ocean','Southern trade shore','Southern trade shore','A shore beyond the cape where people greet the fleet with music and trade.'],
  ['southern-coast','ocean','Southern coast','Southern coast','The long coast north and east of the cape where currents slow the ships.'],
  ['suez','ocean','Suez','Suez','The head of the Red Sea invoked when the poem explains the trading network opposing the fleet.'],
  ['jeddah','ocean','Jeddah','Jeddah','The Red Sea port from which large trading ships sail to Malabar in the poem’s account.'],
  ['mozambique-sea','ocean','Mozambique','Mozambique coast','An island and channel on the East African coast where the fleet first makes sustained contact.','east-africa'],
  ['mombasa-sea','ocean','Mombasa','Mombasa','A Swahili coast city reached after the Mozambique passage.'],
  ['melinde-sea','ocean','Melinde','Melinde','A northern East African port and roadstead.'],
  ['calicut-sea','ocean','Calicut','Calicut coast','The Malabar landfall toward which the fleet has crossed the Indian Ocean.','malabar'],

  ['lisbon','iberia','Lisbon / Belém','Lisbon and Belém','The Tagus shore where the ships are prepared and families gather for the departure.'],
  ['coimbra','iberia','Coimbra','Coimbra','The Mondego city associated with the remembered court and Inês’s story.'],
  ['ourique','iberia','Ourique','Ourique','Southern Portuguese ground associated in the poem with Afonso Henriques’s battle.'],
  ['aljubarrota','iberia','Aljubarrota','Aljubarrota','The field near Batalha where John’s forces meet the Castilian army.'],
  ['badajoz','iberia','Badajoz','Badajoz','A fortified border city in the account of the first king’s campaigns.'],
  ['ceuta','iberia','Ceuta','Ceuta','The North African city reached by Portuguese ships during John I’s reign.'],
  ['porto','iberia','Porto','Porto','The northern Portuguese city on the Douro in the poem’s homeland survey.'],
  ['guimaraes','iberia','Guimarães','Guimarães','The northern stronghold where Afonso is besieged in Gama’s account.'],
  ['salado','iberia','Salado','Salado','The southern battle ground where Portuguese and Castilian forces meet.'],
  ['portugal-heartland','iberia','Portuguese heartland','Portuguese heartland','The central region standing for broad kingdom-wide passages without a single named site.'],
  ['evora','iberia','Évora','Évora','The inland city taken through Giraldo’s daring in the poem’s historical account.'],
  ['beja','iberia','Beja','Beja','The southern city where the poem describes violence after Afonso’s victory.'],
  ['santarem','iberia','Santarém','Santarém','The Tagus-side town where Sancho is besieged before his father comes to help.'],
  ['silves','iberia','Silves','Silves','The Algarve stronghold besieged by Sancho with aid from a passing fleet.'],

  ['sofala','east-africa','Sofala','Sofala','A southern East African port named among the coast’s trading settlements.'],
  ['mozambique','east-africa','Mozambique','Mozambique Island','The island harbor where the Portuguese question visitors and seek a pilot.'],
  ['mozambique-shore','east-africa','Mozambique','Mozambique shore','The landing and watering shore beside the island anchorage.'],
  ['kilwa','east-africa','Kilwa','Kilwa','An island city farther north on the East African passage.'],
  ['mombasa','east-africa','Mombasa','Mombasa harbor','The harbor mouth and city approached after Mozambique.'],
  ['mombasa-shore','east-africa','Mombasa','Mombasa shore','The city shore facing the fleet’s anchorage.'],
  ['melinde','east-africa','Melinde','Melinde roadstead','The anchorage where the local ruler welcomes the fleet and asks for its story.'],
  ['melinde-shore','east-africa','Melinde','Melinde shore','The landing and royal gathering place beside the roadstead.'],
  ['good-signs-river','east-africa','River of good signs','River of good signs','The East African river where the fleet finds speakers of Arabic and raises a stone marker; its precise identification is editorial.'],

  ['calicut','malabar','Calicut','Calicut','The trading city named by fishermen as the Portuguese fleet draws near.','calicut-city'],
  ['cannanore','malabar','Cannanore','Cannanore','A port north of Calicut named in the Indian coastal setting.'],
  ['cochin','malabar','Cochin','Cochin','A trading port farther south on the Malabar coast.'],

  ['roadstead','calicut-city','Fleet roadstead','Calicut roadstead','Open water off the city where the Portuguese ships lie at anchor.'],
  ['landing','calicut-city','Landing beach','Calicut landing','A shore landing from which Gama enters the city.'],
  ['fishing-harbor','calicut-city','Fishing harbor','Fishing harbor','The working waterfront used by local fishing boats.'],
  ['shrine','calicut-city','Shrine','Calicut shrine','A place of local worship encountered on the way inland.'],
  ['official-lodging','calicut-city','Official’s lodging','Official’s lodging','A residence used by a court official during the Portuguese visit.'],
  ['royal-court','calicut-city','Royal court','Royal court','The ruler’s audience place within Calicut.'],
  ['merchant-quarter','calicut-city','Merchant quarter','Merchant quarter','A district of traders whose goods and counsel shape the port’s business.'],
  ['warehouse','calicut-city','Warehouse','Shore warehouse','A place for cargo and merchants near the city’s trade routes.'],
  ['moncaide-house','calicut-city','Monçaide’s house','Monçaide’s house','The resident’s home where he offers the Portuguese messenger rest and a meal.'],
  ['city-route','calicut-city','City route','City route','The streets and gardens crossed between the landing and royal audience.'],

  ['england-court','england','English court','English court','A courtly setting for the challenge described in Veloso’s tale.'],
  ['channel','england','Channel crossing','Channel crossing','The sea passage between continental Europe and England in the tale.'],
  ['flanders','england','Flanders','Flanders','The Low Countries region where Magriço pauses on his overland way and later remains.'],

  ['olympus','divine','Olympus','Olympus','The luminous height where the gods assemble to debate human voyages.'],
  ['divine-council','divine','Council hall','Olympian council','The divine gathering place presided over by Jupiter.'],
  ['high-air','divine','High air','High air','The mythic sky through which gods carry messages and warnings.'],
  ['night-sky','divine','Night sky','Night sky','The darkened air above a sleeping captain and his fleet.'],
  ['wind-quarter','divine','Wind quarter','Domain of the winds','The allegorical quarter from which Aeolus releases opposing winds.'],
  ['sea-surface','divine','Sea surface','Mythic sea','The sea surface where nymphs and ships meet in the poem’s divine action.'],
  ['undersea','divine','Undersea hall','Neptune’s hall','A hall beneath the sea where the sea gods are called to counsel.'],

  ['island-beach','island','Arrival beach','Island beach','A sheltered landing at the wooded island.'],
  ['island-grove','island','Wooded grove','Island grove','Trees and paths inland from the landing beach.'],
  ['island-path','island','Southern path','Southern path','A winding path through the island’s low ground.'],
  ['island-terrace','island','Open terrace','Island terrace','An open height large enough for the company to gather.'],
  ['island-height','island','Island height','Island height','High ground overlooking the sea and the island below.'],
]

export const places=placeDefs.map(([key,map,label,name,description,child])=>{
  const point=coords[map]?.[label]
  if(!point) throw Error(`No bottom-edge coordinate for ${map}/${label}`)
  return {key,map,name,description,x:point.x,y:point.y,child:child??null}
})
