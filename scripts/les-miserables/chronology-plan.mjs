import assert from 'node:assert/strict'
import fs from 'node:fs'
import {enrichedReview}from './build-enrichment-audit.mjs'

// A relative clock, not a Gregorian calendar enabled in the reader. ISO dates
// below are reference coordinates for the editor: unspecified days/months are
// explicitly approximate. They must not be presented as dates supplied by Hugo.
const DAY=86400000,origin=Date.UTC(1815,9,1)
export function relativeDay(reference){
  const iso=reference.length===10?reference+'T00:00:00Z':reference
  const value=Date.parse(iso)
  assert.ok(Number.isFinite(value)&&new Date(value).toISOString().slice(0,19)===iso.slice(0,19),`Invalid reference coordinate: ${reference}`)
  return (value-origin)/DAY
}

// Each source chapter has an explicit narrative frame. Digressive history is
// positioned in the surrounding account, not dated by every year it mentions.
// The local interval is an editorial reading aid, never a measured duration.
export const chronologyFrames=[
 [1,14,'1815-10-01','1815-10-01','The bishop’s 1815 portrait frames undated anecdotes and habits.'],
 [15,19,'1815-10-01T17:00:00Z','1815-10-02T00:00:00Z','An early-October evening; October 1 is an editorial reference day only.'],
 [20,23,'1815-10-02T02:00:00Z','1815-10-02T02:00:00Z','The waking frame encloses separate retrospects specified below.'],
 [24,25,'1815-10-02T02:00:00Z','1815-10-02T04:00:00Z','The waking and theft resume the same night; later clock strokes are uncertain.'],
 [26,26,'1815-10-02T06:00:00Z','1815-10-02T09:00:00Z','The following sunrise and morning; hours editorial.'],
 [27,27,'1815-10-02T16:00:00Z','1815-10-03T03:00:00Z','The encounter near sunset and subsequent night.'],
 [28,29,'1817-08-01','1817-08-01','The year 1817 and summer outing; August 1 is only a reference.'],
 [30,36,'1817-08-02T05:00:00Z','1817-08-02T20:00:00Z','A summer Sunday; date editorial, afternoon clock and sunset inconsistency retained.'],
 [37,38,'1818-05-01','1818-05-02','Spring 1818 encounter; evening/midday and ten-month accounts conflict.'],
 [39,39,'1818-06-01','1821-05-01','Reported demands and servitude span years, not one gathering.'],
 [40,42,'1818-05-01','1820-12-01','Retrospective account of manufacturing success, with distinct appointments below.'],
 [43,43,'1820-01-01','1820-01-03','The newspaper announcement is placed at the source’s beginning of 1820.'],
 [44,44,'1821-01-01','1821-01-01','Toward 1821 within an account spanning six or seven years.'],
 [45,45,'1818-06-01','1818-06-01','Editorial placement before the mayoral appointment, not a supplied accident date.'],
 [46,46,'1818-06-02','1818-06-02','The next morning, followed by an explicit return to Fantine’s arrival.'],
 [47,48,'1820-02-01','1821-09-01','Dismissal and poverty unfold over unstated months; these endpoints are approximate.'],
 [49,50,'1822-01-01','1822-04-01','An intervening winter and worsening poverty; source spans do not establish exact dates.'],
 [51,52,'1823-01-01T18:00:00Z','1823-01-01T23:00:00Z','Snowy evening toward the first of January; day and intervening hours editorial.'],
 [53,53,'1823-01-02','1823-02-14','First infirmary night, letters and worsening condition over weeks.'],
 [54,54,'1823-02-14T09:00:00Z','1823-02-14T12:00:00Z','About six weeks later; exact February day not furnished.'],
 [55,57,'1823-02-14T14:00:00Z','1823-02-15T03:00:00Z','Preparations and the night of deliberation before the Arras journey.'],
 [58,59,'1823-02-15T03:00:00Z','1823-02-15T20:00:00Z','Early departure and February journey, with conflicting travel calculations retained.'],
 [60,60,'1823-02-15T06:00:00Z','1823-02-15T20:00:00Z','Parallel waiting at Montreuil during the journey.'],
 [61,65,'1823-02-15T20:00:00Z','1823-02-16T00:30:00Z','The evening trial, awaiting the one-o’clock return mail.'],
 [66,67,'1823-02-16T06:00:00Z','1823-02-16T06:15:00Z','Return and bedside conversation; exact intervening minutes editorial.'],
 [68,68,'1823-02-16T00:30:00Z','1823-02-16T06:00:00Z','Parallel retrospect to Javert’s departure and arrival a little before six.'],
 [69,69,'1823-02-16T06:15:00Z','1823-02-16T06:30:00Z','The bedside confrontation follows arrival; minutes editorial.'],
 [70,70,'1823-02-16T18:00:00Z','1823-02-16T23:00:00Z','The search returns to the evening of the arrest.'],
 [71,72,'1861-05-01','1861-05-01','The narrator’s May 1861 visit frames the battlefield description.'],
 [73,76,'1815-06-18T05:00:00Z','1815-06-18T16:00:00Z','The battle account returns to June 18, 1815.'],
 [77,78,'1815-06-18T01:00:00Z','1815-06-18T16:00:00Z','The account deliberately returns to Napoleon’s night and morning.'],
 [79,81,'1815-06-18T16:00:00Z','1815-06-18T19:00:00Z','Charge and deployments, with embedded earlier reports.'],
 [82,85,'1815-06-18T20:00:00Z','1815-06-18T21:00:00Z','The Guard, collapse and final square toward twilight.'],
 [86,88,'1815-06-18T21:00:00Z','1815-06-18T21:00:00Z','Historical argument held at the battle frame, not dated by every allusion.'],
 [89,89,'1815-06-18T22:00:00Z','1815-06-19T01:00:00Z','The night after Waterloo.'],
 [90,90,'1823-07-25','1823-07-25','The dated newspaper report frames later financial comparisons.'],
 [91,91,'1823-11-01','1823-12-23','Undated digging and evening investigations before Christmas; interval editorial.'],
 [92,92,'1823-10-25','1823-11-17','Harbour episode and subsequent dated printed report; not one continuous day.'],
 [93,100,'1823-12-24T17:00:00Z','1823-12-25T03:00:00Z','Christmas Eve and the night after midnight mass; chapter 98’s Christmas Day wording is retained.'],
 [101,103,'1823-12-25T05:00:00Z','1823-12-25T18:00:00Z','Departure before dawn and arrival after nightfall; chapter 103 opens with an earlier escape retrospect.'],
 [104,104,'1823-12-25','1823-12-25','House history is held at the 1823 arrival frame despite earlier/later allusions.'],
 [105,106,'1823-12-25T18:00:00Z','1824-01-15','Arrival night, next day and successive weeks.'],
 [107,108,'1824-02-20','1824-03-01T20:00:00Z','Last winter days through discovery and departure; unstated days editorial.'],
 [109,117,'1824-03-01T22:00:00Z','1824-03-02T03:00:00Z','One night’s flight and refuge; March is explicit but day chosen for reference.'],
 [118,118,'1824-03-01T18:00:00Z','1824-03-02T06:00:00Z','Parallel account of Javert’s pursuit, including an earlier transfer report.'],
 [119,137,'1824-03-02','1824-03-02','Convent history and argument interrupt the refuge story; they do not elapse nineteen days.'],
 [138,146,'1824-03-02T06:00:00Z','1824-03-04T12:00:00Z','Refuge, burial arrangements and formal admission; intermediate clock positions editorial.'],
 [147,158,'1832-02-03','1832-02-03','The Paris street-child portrait is contextual, not one identified daily outing.'],
 [159,159,'1832-02-03','1832-02-03','The later boy and household are eight or nine years beyond the convent account.'],
 [160,167,'1831-01-01','1831-01-01','Gillenormand’s explicit 1831 portrait includes remembered earlier family history.'],
 [168,170,'1817-01-01','1817-01-01','The early-Restoration salon and father’s separation.'],
 [171,175,'1827-06-01','1827-06-14','Marius is seventeen in 1827; precise fortnight is editorial.'],
 [176,181,'1827-12-01','1827-12-14','New student friendships and winter discussions; exact days editorial.'],
 [182,185,'1827-12-15','1830-12-01','Poverty, three years’ search and Mabeuf’s losses after July 1830.'],
 [186,187,'1831-06-15','1831-06-16','Middle of 1831 and the substitute’s proposal.'],
 [188,196,'1831-05-01','1831-09-01','Repeated garden visits and seasonal descriptions; May/summer language does not yield a consistent day-by-day calendar.'],
 [197,200,'1832-02-03','1832-02-03','The criminal milieu is described retrospectively across 1830–1835.'],
 [201,201,'1831-09-01','1831-09-01','The September letter episode precedes the winter encounter.'],
 [202,202,'1832-02-02T18:00:00Z','1832-02-02T20:00:00Z','February 2 is explicit.'],
 [203,212,'1832-02-03T08:00:00Z','1832-02-03T13:00:00Z','The next morning through the one-o’clock departure.'],
 [213,217,'1832-02-03T13:00:00Z','1832-02-03T18:00:00Z','Preparations before the six-o’clock appointment.'],
 [218,221,'1832-02-03T18:00:00Z','1832-02-03T21:00:00Z','The ambush and arrest on February 3.'],
 [222,222,'1832-02-04T18:00:00Z','1832-02-04T18:00:00Z','The evening following the ambush.'],
 [223,228,'1832-03-01','1832-03-01T13:00:00Z','Political analysis and an undated Wednesday errand discussion; March day editorial, not a weekday claim.'],
 [229,229,'1832-04-01','1832-04-01','Later isolation at the meadow, opening with a separately anchored ambush-night retrospect.'],
 [230,230,'1832-02-25','1832-03-04','Late February and roughly a week later, not an exact release date.'],
 [231,232,'1832-04-20','1832-04-24','A garden visit followed some days later by a Monday; exact April days editorial, not asserted weekdays.'],
 [233,236,'1829-10-01','1829-10-01','The Rue Plumet household’s earlier establishment, with later habits.'],
 [237,239,'1831-06-01','1831-09-01','Growing recognition and separation before the October chain-gang outing.'],
 [240,240,'1831-10-01','1831-10-02','October 1831 dawn and the next day’s public festivities; day editorial.'],
 [241,242,'1832-02-04','1832-04-15','The wound and subsequent March–April encounters; repeated visits are not one day.'],
 [243,248,'1832-04-01','1832-04-30','April watch nights, letter and meeting, with relative nights separately anchored below.'],
 [249,251,'1832-04-27T18:00:00Z','1832-04-28T06:00:00Z','A spring Friday night and following escape; chosen day only a reference, not the novel’s supplied date.'],
 [252,255,'1832-04-28','1832-04-28','Slang and social argument pause the surrounding narrative clock.'],
 [256,258,'1832-05-01','1832-05-31','Repeated evening meetings during May 1832.'],
 [259,261,'1832-06-03T20:00:00Z','1832-06-03T23:00:00Z','June 3 nightfall and the gate confrontation.'],
 [262,262,'1832-06-03T20:00:00Z','1832-06-03T23:00:00Z','Editorial plot placement follows the adjoining sequence; the printed June 24 conflict is preserved in the chronology notes.'],
 [263,263,'1832-06-04T08:00:00Z','1832-06-04T16:00:00Z','Morning warning and afternoon preparations; relative date reconstructed from the move.'],
 [264,264,'1832-06-05T21:00:00Z','1832-06-05T21:00:00Z','Forty-eight hours after the June 3 meeting.'],
 [265,265,'1832-06-04','1832-06-05T16:00:00Z','June 4 and June 5 are explicit.'],
 [266,270,'1832-06-05T08:00:00Z','1832-06-05T21:00:00Z','Funeral, rising and evening street fighting on June 5.'],
 [271,276,'1832-06-05T13:00:00Z','1832-06-05T19:00:00Z','A parallel account of the march and recruits, returning to earlier hours.'],
 [277,277,'1832-06-05T09:00:00Z','1832-06-05T09:00:00Z','Corinthe’s history is held at the approaching meeting frame.'],
 [278,284,'1832-06-05T09:00:00Z','1832-06-05T22:00:00Z','Morning gathering, construction and nighttime recognition.'],
 [285,287,'1832-06-05T21:00:00Z','1832-06-05T22:00:00Z','Marius’s approach is parallel to the barricade preparations.'],
 [288,294,'1832-06-05T22:00:00Z','1832-06-06T00:00:00Z','Flag, first assault and the approach of midnight.'],
 [295,295,'1832-06-04T19:00:00Z','1832-06-05T08:00:00Z','The move to Rue de l’Homme Armé returns to the preceding evening and morning.'],
 [296,298,'1832-06-05T23:00:00Z','1832-06-06T01:00:00Z','Parallel letter delivery and departure; the eleven-o’clock stroke is not silently reconciled with midnight.'],
 [299,299,'1832-06-06T01:00:00Z','1832-06-06T01:00:00Z','The comparative barricade description frames the last night.'],
 [300,307,'1832-06-06T02:00:00Z','1832-06-06T05:00:00Z','Night discussion and artillery pressure before dawn; intermediate hours editorial.'],
 [308,313,'1832-06-06T05:00:00Z','1832-06-06T10:30:00Z','Dawn through the ammunition expedition.'],
 [314,315,'1832-06-06T11:00:00Z','1832-06-06T11:30:00Z','Parallel garden and grandfather accounts near eleven.'],
 [316,322,'1832-06-06T12:00:00Z','1832-06-06T14:00:00Z','Noon deadline, final assault and underground refuge; end hour editorial.'],
 [323,328,'1832-06-06T14:00:00Z','1832-06-06T14:00:00Z','The sewer history pauses the escape’s contextual clock.'],
 [329,336,'1832-06-06T14:00:00Z','1832-06-06T20:00:00Z','Underground escape and parallel shore pursuit during the afternoon; intermediate hours editorial.'],
 [337,340,'1832-06-06T20:00:00Z','1832-06-07T00:00:00Z','Twilight exit, carriage journey and household alarm.'],
 [341,341,'1832-06-07T00:00:00Z','1832-06-07T02:00:00Z','The post note is dated June 7 at about one; later minutes editorial.'],
 [342,342,'1832-06-07','1832-06-07','A subsequent morning at the clearing; its exact offset is unspecified.'],
 [343,343,'1832-06-07','1832-09-07','Convalescence ends at the source’s September 7; the claimed four months are inconsistent.'],
 [344,346,'1832-09-07','1832-09-15','Recovery conversations, household reunion and the fortune; unstated days editorial.'],
 [347,349,'1832-12-01','1833-02-15','December preparations and inquiries before the February wedding.'],
 [350,353,'1833-02-16T08:00:00Z','1833-02-17T06:00:00Z','The wedding date and following night are retained as printed, without correcting the carnival calendar.'],
 [354,355,'1833-02-17T12:00:00Z','1833-02-17T16:00:00Z','The confession shortly after midday and Marius’s interpretation.'],
 [356,357,'1833-02-18T18:00:00Z','1833-03-31','The next evening and subsequent visits.'],
 [358,358,'1833-04-01','1833-04-02','An early-April day and the following day; day numbers editorial.'],
 [359,360,'1833-05-01','1833-06-15','Late spring and early summer, repeated diminishing walks and estrangement.'],
 [361,361,'1833-06-16','1833-06-25','Decline over successive days and a week; dates editorial.'],
 [362,364,'1833-06-26T18:00:00Z','1833-06-27T01:00:00Z','One final evening; June day chosen only as a relative reference, not a claimed death date.'],
 [365,365,'1862-10-18','1862-10-18','The nameless grave is narrated years later; the appended letter supplies October 18, 1862.'],
]

// These corrections keep important intra-chapter returns from being flattened
// into their enclosing frame. Exactness applies only where the source says so.
export const chronologyOverrides=[
 [1,4,'1804-12-01',true,'Around the coronation, not a supplied day of the encounter.'],
 [1,11,'1806-01-01',true,'Installation year explicit; day and month are reference coordinates.'],
 [11,3,'1811-06-15',true,'Synod opened June 15; the particular attended sitting remains undated.'],
 [20,'start','1815-10-02T02:00:00Z',false,'The waking belongs to the bishop-house night, before the family retrospect.'],
 [20,1,'1795-01-01',true,'Family history precedes the theft; spans years rather than one gathering.'],
 [20,7,'1795-12-01',true,'Hard winter of 1795; the exact Sunday is not given.'],
 [20,8,'1796-01-01',true,'Reported sentencing before the dated collar incident.'],
 [20,10,'1796-04-22',true,'The Bicêtre courtyard date is explicit.'],
 [20,11,'1796-04-22',true,'An account beginning with imprisonment and spanning nineteen years, not one dated prison visit.'],
 [21,'start','1805-01-01',true,'Long prison reflection; midpoint is only a contextual reference.'],
 [21,16,'1805-01-01',true,'Repeated schooling and impulses, not a dated classroom event.'],
 [23,'start','1815-10-01',true,'After release, before reaching the bishop; exact release-day relation is relative.'],
 [23,2,'1815-10-01',true,'The day after release is a recalled event, not a new escape.'],
 [27,84,'1815-10-03T03:00:00Z',false,'The carrier’s nighttime sighting remains qualified as to identity.'],
 [30,4,'1817-08-02T10:00:00Z',false,'The approximate ten-o’clock departure is explicit.'],
 [31,10,'1817-08-02T15:00:00Z',false,'About three that afternoon.'],
 [32,'start','1817-08-02T16:30:00Z',false,'Half-past four is printed alongside inconsistent sunset language.'],
 [40,13,'1815-12-01',true,'Arrival on a December evening in late 1815; exact day unknown.'],
 [41,6,'1819-01-01',true,'Appointment refusals in 1819; no exact day implied.'],
 [41,12,'1820-01-01',true,'Accepted appointment in 1820, distinct from the earlier refusals.'],
 [46,3,'1818-05-01',true,'Explicit return to Fantine’s arrival in 1818.'],
 [56,69,'1823-02-14T20:30:00Z',false,'Half-past eight in the evening.'],
 [57,62,'1823-02-15T00:00:00Z',false,'Midnight in the deliberation.'],
 [58,29,'1823-02-15T05:00:00Z',false,'Actual arrival about five, not the requested half-past four.'],
 [60,55,'1823-02-15T19:30:00Z',false,'Between seven and eight while the trial journey proceeds elsewhere.'],
 [74,'start','1815-06-18T05:00:00Z',true,'Daybreak portrait of the battlefield.'],
 [75,'start','1815-06-18T11:35:00Z',false,'Colville’s first-shot time is retained as the cited account, not reconciled with other start times.'],
 [76,'start','1815-06-18T16:00:00Z',false,'Toward four in the afternoon.'],
 [77,9,'1861-05-01',false,'The narrator returns to observations of the surviving field in 1861.'],
 [78,'start','1815-06-18T16:00:00Z',true,'Return from the surviving-field description to the afternoon battle.'],
 [80,20,'1815-06-19',false,'The remembered visit is the day after the battle.'],
 [80,21,'1815-06-18T17:00:00Z',true,'Return from the next-day account to Wellington’s five-o’clock watch.'],
 [81,'start','1815-06-18T05:00:00Z',true,'Prussian departure is a parallel return to daybreak.'],
 [81,6,'1815-06-18T12:00:00Z',true,'Midday deployment retrospect.'],
 [81,7,'1815-06-18T17:00:00Z',false,'Order at five, followed by deployment.'],
 [89,11,'1815-06-19T00:00:00Z',false,'Toward midnight on the battlefield.'],
 [92,32,'1823-11-17',false,'Printed November 17 report describes the fall as yesterday.'],
 [94,'start','1823-12-24T17:00:00Z',false,'Innkeeper portraits held at the Christmas Eve frame.'],
 [95,'start','1823-12-24T17:00:00Z',false,'The water errand begins during the evening; hour editorial.'],
 [96,'start','1823-12-24T17:00:00Z',false,'The doll display belongs to the same departure frame.'],
 [97,'start','1823-12-24T17:15:00Z',false,'The walk to the spring occurs before the stranger’s arrival; exact minute editorial.'],
 [99,'start','1823-12-24T18:00:00Z',false,'Return from the parallel approach to the meeting in the dark.'],
 [100,'start','1823-12-24T18:30:00Z',false,'The inn scene begins before midnight mass; exact arrival hour editorial.'],
 [98,'start','1823-12-24T14:00:00Z',true,'Parallel approach; Christmas Day wording conflicts with the Eve frame and is retained.'],
 [98,10,'1823-12-24T16:15:00Z',false,'Poster read at quarter-past four, then half-past-four coach.'],
 [98,22,'1823-12-24T18:00:00Z',false,'Toward six in the evening.'],
 [100,186,'1823-12-25T02:00:00Z',false,'Return after midnight mass, then another hour.'],
 [103,'start','1823-11-16',true,'The chapter opens by explaining the earlier escape.'],
 [103,4,'1823-12-25T18:00:00Z',false,'Return to the arrival after Montfermeil.'],
 [105,8,'1823-12-26T09:00:00Z',false,'Broad daylight after arrival night; hour editorial.'],
 [106,15,'1823-12-24',true,'Rental on Christmas Eve precedes the arrival described before it.'],
 [109,9,'1824-03-01T23:00:00Z',false,'Eleven strikes during the flight.'],
 [115,'start','1824-03-02T01:30:00Z',false,'Between one and two is inferred from the wind, not a clock reading.'],
 [118,'start','1823-12-01',true,'Earlier transfer and December reading of the death report.'],
 [118,11,'1824-03-01T18:00:00Z',true,'Parallel pursuit in March 1824.'],
 [118,40,'1824-03-02T06:00:00Z',false,'Search ends at daybreak; hour editorial.'],
 [229,'start','1832-02-03T21:00:00Z',true,'Marius leaves the ambush at nine.'],
 [229,24,'1832-04-01',false,'The meadow description belongs to the subsequent repeated isolation, not that departure morning.'],
 [233,5,'1829-10-01',true,'House establishment in October 1829.'],
 [234,4,'1831-01-01',true,'The 1831 census is distinct from the household’s 1829 arrival.'],
 [240,7,'1831-10-01T06:00:00Z',true,'October dawn; exact day and hour editorial.'],
 [240,34,'1831-10-02',false,'Return home followed by the next day’s festival; not a new chain-gang departure.'],
 [241,'start','1832-02-03',true,'The chapter recalls the charity visit before its consequences.'],
 [241,8,'1832-03-01',false,'Reported March and April period, not a precisely dated meeting.'],
 [250,325,'1832-04-28T04:00:00Z',false,'The hour before dawn after the spring night.'],
 [259,8,'1832-06-03T22:00:00Z',false,'About ten on June 3.'],
 [263,9,'1832-06-04T08:00:00Z',true,'The narrator returns to that morning’s warning.'],
 [265,14,'1832-06-04',false,'June 4 is explicit.'],
 [265,15,'1832-06-05T08:00:00Z',false,'June 5 morning, followed by the afternoon.'],
 [268,3,'1832-06-04T18:00:00Z',true,'Retrospect to the evening before the funeral.'],
 [268,4,'1832-06-05T08:00:00Z',false,'Return to June 5.'],
 [269,13,'1832-06-05T17:00:00Z',false,'By five in the evening.'],
 [269,16,'1832-06-05T18:00:00Z',false,'About six and the subsequent half-hour under fire.'],
 [278,69,'1832-06-05T14:00:00Z',false,'By two in the afternoon.'],
 [281,9,'1832-06-05T21:00:00Z',false,'Deepening twilight; exact hour editorial.'],
 [295,9,'1832-06-05T08:00:00Z',false,'Return to the morning after the move.'],
 [300,17,'1832-06-06T02:00:00Z',false,'Strength counted about two in the morning.'],
 [314,19,'1832-06-06T11:00:00Z',false,'About eleven on June 6.'],
 [316,6,'1832-06-06T12:00:00Z',false,'Noon.'],
 [331,'start','1832-06-06T16:00:00Z',true,'Parallel shore pursuit during the afternoon; hour editorial.'],
 [341,62,'1832-06-07T01:00:00Z',false,'The signed note’s date and approximate hour.'],
 [343,4,'1832-09-07',false,'September 7 is retained; the contradictory four-month interval is not used as arithmetic.'],
 [350,'start','1833-02-16T08:00:00Z',false,'The source wedding date; no astronomical or carnival correction.'],
 [353,37,'1833-02-16T23:00:00Z',false,'Wedding night through dawn, not the next noon.'],
 [354,'start','1833-02-17T12:30:00Z',false,'Shortly after midday on the following day.'],
 [365,5,'1862-10-18',false,'Authorial letter outside the story, dated October 18, 1862.'],
]

export const chronologyNote='The story follows one narrative order, including recollections, parallel accounts and historical digressions. Its relative day clock uses an editorial early-October 1815 reference; it is not an absolute calendar. Unspecified months, days, hours and intervals are approximate reading aids, and descriptions of habits or history are held at their surrounding narrative frame. The printed dates remain in the text. The spring 1818 evening/midday and ten-month accounts, Christmas Eve/Christmas Day wording, May/summer garden descriptions, June 24 beside the June 3–5 sequence, eleven-o’clock/midnight accounts, September 7 called four months after June 7, and the February 16 carnival date are not silently rewritten. The final letter belongs to October 18, 1862, outside the characters’ last evening.'

export function buildChronologyPlan(review=enrichedReview()){
  const frames=new Map(),overrides=new Map()
  for(const [first,last,start,end,reason]of chronologyFrames){
    const from=relativeDay(start),to=relativeDay(end)
    assert.ok(first<=last&&from<=to&&reason.trim())
    for(let n=first;n<=last;n++){
      assert.ok(!frames.has(n),`Repeated chronological frame: ${n}`)
      const width=(to-from)/(last-first+1)
      frames.set(n,{from:from+width*(n-first),to:from+width*(n-first+1),reason,block:first})
    }
  }
  for(const [chapter,at,reference,isFlashback,reason]of chronologyOverrides){
    assert.ok(review.get(chapter)?.some(row=>row.at===at),`Stale chronological cut: ${chapter}/${at}`)
    const key=`${chapter}:${at}`
    assert.ok(!overrides.has(key),`Repeated chronological override: ${key}`)
    overrides.set(key,{inWorldTime:relativeDay(reference),isFlashback,reason})
  }
  const records=new Map();let previous=null,previousBlock=null
  for(const[chapter,rows]of review){
    const frame=frames.get(chapter)
    assert.ok(frame,`Missing chronological frame: ${chapter}`)
    const anchors=rows.flatMap((row,index)=>{
      const point=overrides.get(`${chapter}:${row.at}`)
      return point?[{index,time:point.inWorldTime}]:[]
    })
    if(!anchors.length||anchors[0].index!==0)anchors.unshift({index:0,time:
      previousBlock===frame.block&&previous!==null?Math.max(frame.from,previous):frame.from})
    if(anchors.at(-1).index!==rows.length-1)anchors.push({index:rows.length-1,time:Math.max(frame.to,anchors.at(-1).time)})
    for(const[index,row]of rows.entries()){
      const override=overrides.get(`${chapter}:${row.at}`)
      const before=anchors.findLast(point=>point.index<=index),after=anchors.find(point=>point.index>=index)
      const inWorldTime=override?.inWorldTime??(before.index===after.index?before.time:
        before.time+(after.time-before.time)*(index-before.index)/(after.index-before.index))
      const isFlashback=override?.isFlashback??(previous!==null&&inWorldTime<previous)
      records.set(`${chapter}-${index+1}`,{inWorldTime,travelDays:0,isFlashback,
        basis:override?.reason??frame.reason,sourceTimeHint:row.timeHint??null,
        precision:'relative editorial coordinate; source wording governs historical precision'})
      previous=inWorldTime
    }
    previousBlock=frame.block
  }
  return records
}

if(process.argv[1]&&import.meta.url.endsWith(process.argv[1].replace(/\\/g,'/'))){
 const scenes=[...buildChronologyPlan()].map(([scene,values])=>({scene,...values}))
 fs.writeFileSync(new URL('./CHRONOLOGY_REVIEW.json',import.meta.url),JSON.stringify({
  scope:'Relative editorial plan; not an enabled absolute calendar; final reading/playback review pending',
  note:chronologyNote,scenes,
 },null,2)+'\n')
 console.log(`${scenes.length} relative editorial chronology records`)
}
