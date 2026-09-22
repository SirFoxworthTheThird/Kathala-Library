// Cuts are reviewed zero-based paragraph boundaries in the retained Gutenberg text.
// Every section starts at paragraph 0 so its authorial heading remains in the scene draft.
export const chapterPlans = [
  [{cut:0,title:'The Case Presented',description:'An editor introduces Doctor Hesselius’s papers and the careful testimony of a woman who has since died.',location:'hesselius-study',cast:['editor'],items:['case-manuscript'],tension:1}],
  [
    {cut:0,title:'A Solitary Schloss',description:'Laura describes her Styrian home, household, and the ruined Karnstein estate nearby.',location:'schloss',cast:['laura','father','perrodon','lafontaine'],items:[],tension:1},
    {cut:13,title:'The Visitor in the Nursery',description:'Six-year-old Laura wakes beside a beautiful stranger and feels two sharp punctures at her breast.',location:'nursery',cast:['young-laura','carmilla','nurse','housekeeper'],items:[],tension:4},
    {cut:17,title:'Comfort and Prayer',description:'A doctor, Laura’s father, and an elderly priest try to settle the terrified child after the apparition.',location:'nursery',cast:['young-laura','father','doctor','priest','nurse'],items:[],tension:2},
  ],
  [
    {cut:0,title:'Spielsdorf’s Letter',description:'A summer walk is darkened by news that the General’s ward has died after a mysterious illness.',location:'lime-walk',cast:['laura','father'],items:['spielsdorf-letter'],tension:2},
    {cut:16,title:'Moonlight at the Drawbridge',description:'Laura’s household lingers outside while unease gathers beneath a peaceful summer evening.',location:'drawbridge',cast:['laura','father','perrodon','lafontaine'],items:[],tension:2},
    {cut:29,title:'The Carriage Overturns',description:'A noblewoman’s carriage crashes before the schloss, leaving her daughter stunned on the road.',location:'drawbridge',cast:['laura','father','perrodon','lafontaine','carmilla','countess'],items:['carriage'],tension:4},
    {cut:41,title:'A Daughter Entrusted',description:'Laura persuades her father to shelter the injured traveler while the girl’s mother continues an urgent journey.',location:'drawbridge',cast:['laura','father','carmilla','countess','perrodon'],items:['carriage'],tension:3},
  ],
  [
    {cut:0,title:'The Stranger Brought Inside',description:'The household carries its unexpected guest across the drawbridge and prepares a room for her.',location:'great-hall',cast:['laura','father','perrodon','lafontaine','carmilla'],items:[],tension:2},
    {cut:15,title:'Questions by Candlelight',description:'The household compares troubling impressions of the carriage party and the secrecy demanded by its lady.',location:'drawing-room',cast:['laura','father','perrodon','lafontaine'],items:[],tension:2},
    {cut:34,title:'Recognition at the Bedside',description:'After the physician departs, Laura recognizes the guest as the woman from her childhood terror.',location:'carmilla-room',cast:['laura','carmilla','doctor'],items:[],tension:4},
    {cut:45,title:'Corresponding Dreams',description:'Carmilla claims that she too dreamed of Laura twelve years earlier, and their mutual alarm becomes intimacy.',location:'carmilla-room',cast:['laura','carmilla'],items:[],tension:3},
    {cut:61,title:'Companions by Daylight',description:'Laura finds her guest beautiful and charming in daylight despite a residue of unease.',location:'breakfast-room',cast:['laura','carmilla'],items:[],tension:2},
  ],
  [
    {cut:0,title:'Three Disclosures',description:'Carmilla offers only her name, noble birth, and western home while refusing every useful detail.',location:'schloss',cast:['laura','carmilla'],items:[],tension:2},
    {cut:14,title:'Tenderness and Fear',description:'Carmilla’s passionate embraces leave Laura divided between attraction, embarrassment, and dread.',location:'lime-walk',cast:['laura','carmilla'],items:[],tension:3},
    {cut:27,title:'The Passing Funeral',description:'A village funeral hymn provokes Carmilla’s anger and a sudden seizure beneath the trees.',location:'lime-walk',cast:['laura','carmilla'],items:[],tension:4},
    {cut:47,title:'The Hunchback’s Charms',description:'A traveling mountebank sells protections against the oupire and notices Carmilla’s pointed tooth.',location:'courtyard',cast:['laura','carmilla','mountebank'],items:['amulets','tooth-tools'],tension:3},
    {cut:61,title:'Illness in the District',description:'Laura’s father and the doctor discuss spreading deaths while Carmilla rejects prayerful explanations.',location:'drawing-room',cast:['laura','father','carmilla','doctor'],items:[],tension:3},
  ],
  [
    {cut:0,title:'The Restored Portraits',description:'Newly cleaned family pictures are unpacked in the great hall.',location:'great-hall',cast:['laura','father','carmilla','restorer'],items:['mircalla-portrait'],tension:1},
    {cut:7,title:'Mircalla Karnstein',description:'A portrait dated 1698 bears Carmilla’s exact likeness and the name of Countess Mircalla Karnstein.',location:'great-hall',cast:['laura','father','carmilla','restorer'],items:['mircalla-portrait'],tension:4},
    {cut:19,title:'Moonlit Confession',description:'On the drawbridge Carmilla’s declaration of love intensifies into language of possession and death.',location:'drawbridge',cast:['laura','carmilla'],items:[],tension:4},
    {cut:36,title:'A Passing Faintness',description:'Carmilla recovers from a strange lapse and dismisses Laura’s concern about the local sickness.',location:'drawbridge',cast:['laura','carmilla'],items:[],tension:3},
  ],
  [
    {cut:0,title:'No Address to Give',description:'Laura’s father asks how Carmilla’s mother can be reached, but the guest remains bound to secrecy.',location:'drawing-room',cast:['laura','father','carmilla'],items:[],tension:2},
    {cut:9,title:'A Cruel Love',description:'Preparing for bed, Carmilla speaks of vows, sacrifice, and an old illness she remembers like drowning.',location:'carmilla-room',cast:['laura','carmilla'],items:[],tension:3},
    {cut:26,title:'The Locked Bedroom',description:'Alarmed by deaths in the district, Laura locks her door and keeps a light burning beside her.',location:'laura-room',cast:['laura'],items:['amulet'],tension:2},
    {cut:31,title:'The Black Creature',description:'Laura dreams awake as a catlike shape crosses her bed, strikes her breast, and becomes a woman at the door.',location:'laura-room',cast:['laura','carmilla'],items:[],tension:5},
  ],
  [
    {cut:0,title:'The Morning After',description:'Laura conceals the night’s terror and hears that a woman has been seen walking below Carmilla’s window.',location:'breakfast-room',cast:['laura','perrodon','lafontaine'],items:[],tension:3},
    {cut:11,title:'Carmilla’s Explanation',description:'Carmilla professes fear for Laura and attributes the frightening night to natural causes.',location:'lime-walk',cast:['laura','carmilla'],items:['amulet'],tension:2},
    {cut:25,title:'Three Weeks of Decline',description:'Laura’s strength ebbs through recurring dreams and sensations while she refuses to admit that she is ill.',location:'laura-room',cast:['laura','carmilla','father'],items:[],tension:4},
    {cut:39,title:'The Warning Voice',description:'A voice naming itself as Laura’s mother warns her of an assassin and a light reveals Carmilla at her bed.',location:'laura-room',cast:['laura','carmilla'],items:[],tension:5},
    {cut:43,title:'A Door Forced Open',description:'Laura and the household find Carmilla’s locked bedroom silent and apparently empty.',location:'carmilla-room',cast:['laura','perrodon','lafontaine','servants'],items:[],tension:5},
  ],
  [
    {cut:0,title:'The Empty Room',description:'A search of the sealed chamber and the entire schloss produces no trace of Carmilla.',location:'carmilla-room',cast:['laura','father','perrodon','lafontaine','servants'],items:[],tension:4},
    {cut:5,title:'Carmilla Reappears',description:'At one o’clock Laura finds Carmilla sitting calmly in the room that had been searched.',location:'carmilla-room',cast:['laura','carmilla','father','perrodon','lafontaine'],items:[],tension:4},
    {cut:13,title:'The Sleepwalking Theory',description:'Laura’s father proposes that Carmilla unlocked the door in her sleep and later returned unseen.',location:'carmilla-room',cast:['laura','father','carmilla','perrodon'],items:[],tension:2},
  ],
  [
    {cut:0,title:'Precautions at Night',description:'A servant is posted outside Carmilla’s room before the doctor comes to examine Laura.',location:'library',cast:['laura','father','perrodon','doctor'],items:[],tension:3},
    {cut:13,title:'The Blue Mark',description:'The doctor makes Laura expose a small discolored spot below her throat and privately alarms her father.',location:'library',cast:['laura','father','doctor'],items:[],tension:4},
    {cut:34,title:'Strict Instructions',description:'The doctor orders constant companionship for Laura and arranges to inspect Carmilla that evening.',location:'library',cast:['laura','father','perrodon','doctor'],items:[],tension:3},
    {cut:42,title:'A Journey Hastened',description:'A delayed letter from General Spielsdorf sends Laura, her father, and Madame Perrodon toward Karnstein.',location:'drawing-room',cast:['laura','father','perrodon'],items:['spielsdorf-letter'],tension:3},
    {cut:57,title:'The General on the Road',description:'The carriage meets General Spielsdorf riding toward the ruins, and he joins their journey.',location:'forest-road',cast:['laura','father','perrodon','spielsdorf'],items:['carriage'],tension:3},
  ],
  [
    {cut:0,title:'A Changed Man',description:'Laura sees how grief has altered the General since the death of his ward.',location:'forest-road',cast:['laura','father','perrodon','spielsdorf'],items:['carriage'],tension:2},
    {cut:2,title:'Proof of the Marvelous',description:'Spielsdorf promises an account that overturned his skepticism, while Laura’s father listens with concealed urgency.',location:'forest-road',cast:['laura','father','perrodon','spielsdorf'],items:['carriage'],tension:3},
    {cut:12,title:'Business at Karnstein',description:'The General reveals that he means to open a grave among the extinct Karnsteins.',location:'forest-road',cast:['laura','father','perrodon','spielsdorf'],items:['carriage'],tension:4},
    {cut:23,title:'The Road Divides',description:'At the Drunstall turning the travelers continue toward the ruins and the General begins his promised story.',location:'drunstall-turn',cast:['laura','father','perrodon','spielsdorf'],items:['carriage'],tension:3},
  ],
  [
    {cut:0,title:'The Grand Duke’s Masquerade',description:'Spielsdorf recalls the brilliant masked ball where his ward first met a fascinating young stranger.',location:'masquerade-hall',cast:['spielsdorf','bertha','carmilla','countess'],items:['masks'],tension:2},
    {cut:10,title:'An Old Acquaintance Masked',description:'The stranger’s mother claims to know the General but uses the masquerade’s license to conceal her identity.',location:'masquerade-hall',cast:['spielsdorf','bertha','carmilla','countess'],items:['masks'],tension:3},
    {cut:29,title:'A Summons in Black',description:'A pale gentleman interrupts the masked Countess with urgent private news.',location:'masquerade-hall',cast:['spielsdorf','bertha','carmilla','countess','pale-man'],items:['masks'],tension:3},
  ],
  [
    {cut:0,title:'The Countess’s Petition',description:'The Countess asks Spielsdorf to shelter her daughter while she undertakes a secret journey.',location:'masquerade-hall',cast:['spielsdorf','bertha','carmilla','countess'],items:['masks'],tension:3},
    {cut:9,title:'Millarca Entrusted',description:'The mother gives final instructions, departs without looking back, and leaves Millarca with the General.',location:'masquerade-hall',cast:['spielsdorf','bertha','carmilla','countess','pale-man'],items:['masks','carriage'],tension:3},
    {cut:23,title:'Lost After the Ball',description:'Millarca disappears amid the crowded rooms and cannot be found before daylight.',location:'masquerade-hall',cast:['spielsdorf','bertha','carmilla'],items:['masks'],tension:3},
    {cut:29,title:'A Message and Return',description:'A servant’s message leads Spielsdorf to Millarca, whose explanation secures her place in his household.',location:'masquerade-hall',cast:['spielsdorf','bertha','carmilla','servant'],items:[],tension:2},
  ],
  [
    {cut:0,title:'Bertha’s Decline',description:'Spielsdorf recounts his ward’s dreams, spectral visitor, punctures, and rapidly failing health.',location:'spielsdorf-schloss',cast:['spielsdorf','bertha','carmilla'],items:[],tension:5},
    {cut:6,title:'Karnstein in Sight',description:'Laura recognizes her own symptoms as the carriage enters the abandoned village beneath the ruined chateau.',location:'ruined-village',cast:['laura','father','perrodon','spielsdorf'],items:['carriage'],tension:4},
    {cut:17,title:'A Vow of Vengeance',description:'Inside the roofless chapel, the General declares that he has come to destroy the creature responsible.',location:'karnstein-chapel',cast:['laura','father','perrodon','spielsdorf'],items:[],tension:4},
    {cut:26,title:'The Woodman’s Account',description:'An old woodman explains how vampires emptied the village and how a Moravian nobleman hid Mircalla’s tomb.',location:'karnstein-chapel',cast:['laura','father','perrodon','spielsdorf','woodman'],items:['woodman-axe'],tension:4},
  ],
  [
    {cut:0,title:'The Learned Physician',description:'Spielsdorf tells how a doctor from Gratz diagnosed Bertha’s nightly visitor when ordinary medicine failed.',location:'spielsdorf-schloss',cast:['spielsdorf','bertha','gratz-doctor','doctor'],items:['physician-note'],tension:4},
    {cut:12,title:'The Watch in Darkness',description:'Armed with the physician’s warning, the General hides beside Bertha’s room and sees a black shape attack her.',location:'bertha-room',cast:['spielsdorf','bertha','carmilla'],items:['sword'],tension:5},
    {cut:19,title:'Waiting in the Chapel',description:'The General’s story ends; Laura rests among the monuments while her father studies the physician’s letter.',location:'karnstein-chapel',cast:['laura','father','perrodon','spielsdorf'],items:['physician-note'],tension:3},
    {cut:22,title:'The Meeting at the Door',description:'Carmilla enters the chapel smiling until Spielsdorf recognizes her and attacks with his sword.',location:'karnstein-chapel',cast:['laura','carmilla','spielsdorf','perrodon'],items:['sword'],tension:5},
    {cut:25,title:'Three Names',description:'After Carmilla vanishes through an unseen passage, the General identifies Carmilla, Millarca, and Mircalla as one person.',location:'karnstein-chapel',cast:['laura','perrodon','spielsdorf'],items:[],tension:5},
  ],
  [
    {cut:0,title:'Baron Vordenburg Arrives',description:'The descendant of the man who hid Mircalla’s grave reaches the chapel with the evidence needed to find it.',location:'karnstein-chapel',cast:['laura','father','spielsdorf','vordenburg','woodman'],items:['vordenburg-papers'],tension:3},
    {cut:4,title:'The Tomb Disclosed',description:'The woodman clears growth from Mircalla’s concealed monument and the party prepares a lawful examination.',location:'karnstein-chapel',cast:['laura','father','spielsdorf','vordenburg','woodman'],items:['woodman-axe','vordenburg-papers'],tension:4},
    {cut:10,title:'Nightly Protection',description:'Laura returns home with a priest, and Carmilla’s disappearance ends the nocturnal attacks.',location:'schloss',cast:['laura','father','perrodon','priest'],items:['amulet'],tension:3},
    {cut:17,title:'The Imperial Inquisition',description:'A commission opens Mircalla’s grave, applies the accepted tests, and carries out the prescribed destruction.',location:'karnstein-chapel',cast:['father','spielsdorf','vordenburg','commissioner'],items:['mircalla-portrait','commission-report'],tension:5},
  ],
  [
    {cut:0,title:'A Narrative Recollected',description:'Laura admits that writing the case has revived the terror rather than quieted it.',location:'hesselius-study',cast:['laura'],items:['case-manuscript'],tension:2},
    {cut:2,title:'Vordenburg’s Lore',description:'The Baron explains how his ancestor’s papers and his own research revealed the vampire’s habits and resting place.',location:'schloss-library',cast:['laura','father','vordenburg'],items:['vordenburg-papers'],tension:3},
    {cut:8,title:'The Hidden Monument',description:'Vordenburg recounts the old stratagem that preserved Mircalla’s grave from discovery until his arrival.',location:'schloss-library',cast:['father','vordenburg'],items:['vordenburg-papers'],tension:3},
    {cut:15,title:'Italy and After',description:'Laura travels through Italy to recover, yet memory leaves Carmilla’s image divided between companion and monster.',location:'italy',cast:['laura','father'],items:[],tension:2},
  ],
]

export function withCuts(section, plans) {
  const paragraphCount = section.text.split(/\n{2,}/).length
  if (!plans?.length || plans[0].cut !== 0) throw new Error(`Missing opening cut for ${section.title}`)
  for (let i = 0; i < plans.length; i++) {
    if (plans[i].cut < 0 || plans[i].cut >= paragraphCount) throw new Error(`Bad cut ${plans[i].cut} in ${section.title}`)
    if (i && plans[i].cut <= plans[i - 1].cut) throw new Error(`Unordered cuts in ${section.title}`)
  }
  return plans
}
