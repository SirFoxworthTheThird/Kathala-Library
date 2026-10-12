// Editorial day 152 is early June in year zero. The novel does not supply
// historical years; 365-day editorial years avoid inventing a dated setting.
export const chapterDays=[152,152.25,152.6,153,153.5,153.65,153.8,154,168,169,175,180,218,222,245,274,277,380,410,517,547,578,585,640,710,790,850,935,985,1060,1250,1610,1650,1700,1730,1975,1977,2000]
// Named scenes anchor time changes within chapters covering several terms.
const days={
 'The Journey to Town':986,'The Exhibition':987,'Coming Home':989,'The Best Part of the Visit':989.8,
 'Departure for Queen’s':1712,'The First Day at Queen’s':1713,'Homesick at Twilight':1713.7,'Josie Finds Anne':1713.8,

 'Matthew Hears the Accusation':223,'Marilla Demands the Truth':223.2,'A Confession Made for the Picnic':224,'A Dismal Dinner':224.4,'The Brooch in the Shawl':224.5,'Marilla Admits Her Mistake':224.6,'The Picnic Report':224.9,
 'Gilbert’s Return Is Expected':266,'Gilbert Returns':266.2,'Carrots':266.5,'Standing Before the Class':266.6,'Punishment Beside Gilbert':267,'Anne Refuses the Classroom':267.5,'Marilla Meets Stubbornness':267.6,'Marilla Visits Rachel':267.8,'Borrowed Trouble':271,
 'The Bottle Is Identified':276,'Marilla Reports the Refusal':276.5,'Mrs. Barry’s Judgment':276.6,'No Farewell Allowed':276.8,
 'Anne Chooses School Again':280,'Lessons as Refuge':280.2,'School’s Welcome Is Reported':280.8,'Gifts Across the Classroom':281,'Determination and Geometry':300,
 'The Doctor Finds the Danger Past':381.125,'Home After the Vigil':381.3,'The Barrys Give Thanks':381.65,'A Happy Return':381.8,
 'Matthew Holds His Ground':411,'A Night at Orchard Slope':411.7,'Miss Barry Is Startled':411.96,'The News at Green Gables':412.3,'Diana’s Fear for the Lessons':412.5,'A Confession in the Spare Room':412.6,'The New Friend Is Discussed':443,
 'The Haunted Wood':517.8,'The Wood Must Be Crossed':517.9,'The Errand Is Finished':517.95,
 'Mrs. Allan at Avonlea':552,'Preparing for Tea':557,'The Liniment Cake':559,'Mrs. Allan Comforts Anne':559.1,'A New Day':559.8,
 'Convalescence at Green Gables':586,
 'Rehearsals for Christmas':700,'Matthew’s Encouragement':700.8,
 'Matthew’s Shopping Ordeal':711,'Twenty Pounds of Brown Sugar':711.8,'Mrs. Lynde Makes the Dress':712,'Marilla Learns the Secret':724,'Puffed Sleeves on Christmas Morning':724.3,'Aunt Josephine’s Slippers':724.4,'The Christmas Concert':724.7,'The Walk After the Concert':724.9,'Education Is Considered':724.95,
 'Anne’s First Story':791,'The Story Club':798,'Stories and Dishes':804,
 'The Long Washing':851,'After the Haircut':860,
 'The Queen’s Group Studies':1243,'Books Away for Summer':1243.8,'Rachel Assesses Anne’s Growth':1244,
 'Books and a New Dress':1340,'The Queen’s Class at Work':1341,'Marilla Faces the Coming Change':1550,'The Spring Before Entrance':1551,
 'A Letter from Entrance Week':1616,'Waiting for the Pass List':1619,'The Pass List':1640,'The Household Hears the Results':1640.7,'Thankfulness Before Sleep':1640.9,
 'The Scholarship Race':1826,'Visits to Beechwood':1900,'The Spring Examinations Approach':1950,
 'Avery Scholarship and Gold Medal':1976,'Home After Queen’s':1976.8,'Health and the Abbey Bank':1977,'A Daughter Rather Than Boys':1977.8,
 'Matthew Falls':1978,'The Doctor Confirms the Death':1978.1,'Diana Offers Company':1978.85,'Grief in the East Gable':1979.05,'A Rose for Matthew':1980.7,'Marilla and Anne Together':1999.8,
 'Matthew’s Coffin in the Parlour':1978.7,'Martin Fetches Medical Help':1978.01,'Rachel Checks Matthew’s Heart':1978.02,
 'Anne Thinks Through Her Duty':2000.9,'Green Gables May Be Sold':2006,'A Different Ambition':2006.1,'Rachel Brings the School News':2009.8,'The Evening at Matthew’s Grave':2010.75,'Gilbert’s Offer and the Bend in the Road':2010.8,'Friends at Last':2010.85,'Quiet Happiness at the Window':2010.95,
}
export function dayFor(chapter,index,title){return days[title]??chapterDays[chapter-1]+index*.02}
export const chronologyEvidence=[
 {chapter:1,anchor:'early June',day:152,reason:'Opening explicitly places Rachel’s observation in early June.'},
 {chapter:20,anchor:'the day I came to Green Gables',day:517,reason:'First June anniversary, one editorial year after arrival.'},
 {chapter:25,anchor:'She’s only thirteen in March',day:724,reason:'Second Christmas; the following March is Anne’s thirteenth birthday.'},
 {chapter:26,anchor:'I’m thirteen years old today',day:790,reason:'March in editorial year two.'},
 {chapter:30,anchor:'three years ago',day:1244,reason:'Rachel explicitly places her first visit three years before this end-of-term visit.'},
 {chapter:31,anchor:'four years before',day:1550,reason:'Matthew recalls the arrival during the final entrance-preparation year.'},
 {chapter:36,anchor:'First Class License in one year',day:1977,reason:'One Academy year follows the entrance summer.'},
 {chapter:38,anchor:'sixteen and a half',day:2006,reason:'The ending falls about five editorial years after arrival; ages are rounded in dialogue.'},
]
