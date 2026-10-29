// People needed by reported history, documents or explanatory passages. A
// record in this list is not evidence of physical presence at any scene.
export const referenceCharacterIntroductions = `
abbe-banes|The Abbé Banés|The elderly chaplain whom the convent pupils can see through the choir grating.
ansiaux|Monsieur Ansiaux|The drawing-master whom the convent pupils know as Monsieur Anciot.
bachelu|Bachelu|A French commander named among the forces engaged around Hougomont.
baloup|Baloup|The wheelwright whose employment of the accused is discussed in the Arras proceedings.
baronne-de-t|The Baronne de T——|The hostess of an old royalist salon frequented by Gillenormand.
bauduin|Bauduin|A French commander among those involved in the fighting at Hougomont.
blackmann|Blackmann|An officer recalled in the account of the fighting in Hougomont’s orchard.
blucher|Blücher|The Prussian commander whose army bears on the course of Waterloo.
boischevron|Madame de Boischevron|The correspondent to whom Baptistine describes her brother’s household.
bulow|Bülow|The Prussian commander approaching the Waterloo battlefield through the eastern roads.
bulow-shepherd-guide|Bülow’s shepherd guide|The local guide credited with directing the Prussians toward the battlefield.
chasse|Chassé|An allied commander whose forces are described in the disposition of the army.
colville|Colville|An allied commander named in the account of the battle’s first phase.
dehaze|Dehaze|The man to whom the narrator attributes an account of the field after the battle.
delort|Delort|A French cavalry commander in the attack on the Mont-Saint-Jean plateau.
dornberg|Dornberg|A commander associated with the allied cavalry on the plateau.
duchesse-choiseul|The Duchesse de Choiseul|An aristocratic visitor admitted to the convent community.
duchesse-serent|The Duchesse de Sérent|Another duchess whose visits form part of the convent’s history.
duhesme|Duhesme|A French general mentioned in the account of the army’s collapse.
duplat|Duplat|An officer recalled in the history of the struggle around Hougomont.
fantine-furniture-dealer|Fantine’s furniture dealer|The second-hand dealer to whom Fantine owes money for her room’s furniture.
fantine-landlord|Fantine’s landlord|The landlord to whom Fantine owes rent as her means of earning diminish.
fantine-musician-lover|The musician|An itinerant musician with whom Fantine is said to have shared her distress for a time.
favourite-actor-neighbour|Favourite’s actor neighbor|The actor Favourite speaks of in her conversation about love.
foy|Foy|A French general named in the account of the forces fighting near Hougomont.
friant|Friant|A commander among the French Guard’s officers at Waterloo.
grouchy|Grouchy|The French marshal whose expected arrival occupies Napoleon’s calculations.
guillaume-van-kylsom|Guillaume van Kylsom|A witness associated with the account of the well at Hougomont.
guilleminot|Guilleminot|A French commander recalled in the Hougomont fighting.
harlet|Harlet|An officer named in the account of the Guard at Waterloo.
haxo|Haxo|The general receiving Napoleon’s observations about the guns before the battle.
infirmary-yard-girl|The girl in the infirmary yard|A child whose presence is reported during Fantine’s stay at the infirmary.
jerome-bonaparte|Jérôme Bonaparte|Napoleon’s brother, commanding troops in the fighting at Hougomont.
kellermann|Kellermann|A French cavalry commander named in the Waterloo account.
kempt|Kempt|An allied commander whose forces form part of the defense described by the narrator.
lafayette|Lafayette|A political figure whose public standing appears in the account of France’s changing regime.
lamarque|General Lamarque|The public figure whose illness and funeral draw attention in Paris.
lamothe-valois|The Comte de Lamothe-Valois|An elderly man admitted to Madame de T.’s salon, where his association with the necklace affair is whispered about.
lefebvre-desnouettes|Lefebvre-Desnouettes|A French cavalry commander participating in the operations at Waterloo.
legros|Legros|A combatant remembered in the story of the assault at Hougomont.
lobau|Lobau|A French commander involved in the forces meeting the Prussian advance.
louis-philippe|Louis Philippe|The king whose political position the narrator examines after the revolution of July.
madame-genlis|Madame de Genlis|The writer seeking admission to Petit-Picpus while editing a periodical.
mademoiselle-vaubois|Mademoiselle de Vaubois|A woman whose rigid rectitude belongs to the portrait of the elder Gillenormand daughter’s circle.
mallet|Mallet|An officer among those named in the Guard’s last struggle.
marie-claude|Marie-Claude|A farmer’s wife at Faverolles who supplies milk to the hungry children across the lane.
mestienne|Mestienne|The gravedigger whose circumstances matter to Fauchelevent’s intended arrangements at Vaugirard.
michel|Michel|An officer in the narrator’s account of the Guard at Waterloo.
milhaud|Milhaud|The French cavalry commander involved in the attack toward the plateau.
montreuil-cure|The curé of Montreuil|The parish priest responsible for arrangements affecting Fantine’s burial.
montreuil-public-writer|The public letter-writer|The person writing the letters Fantine cannot compose herself.
paulin-musebois|Paulin Musebois|The locksmith whom Magloire proposes calling to restore the bolts on the bishop’s door.
petit-picpus-exit-sentinel|The blind-alley sentinel|The man posted at the street exit during the police pursuit.
picton|Picton|An allied commander whose position is named in the battlefield’s arrangement.
poret-de-morvan|Poret de Morvan|An officer recalled among the French Guard’s commanders.
prince-orange|The Prince of Orange|The allied commander responsible for the center of the position.
reille|Reille|A French commander whose troops take part in the Hougomont fighting.
roguet|Roguet|An officer named in the account of the Guard’s resistance.
royal-bookseller|Royal|An old bookseller at the Porte-Saint-Jacques and a friend of Mabeuf.
sister-agatha|Sister Agatha|The busy convent portress, recognizable by her bunch of keys.
sister-euphrasie|Sister Euphrasie|A woman of the religious community described in the Petit-Picpus portraits.
somerset|Somerset|A cavalry commander named in the allied dispositions on the plateau.
soye|Soye|A French commander mentioned among the forces engaged at Hougomont.
trip|Trip|A cavalry commander appearing in the account of the plateau’s defenders.
uxbridge|Uxbridge|The allied cavalry commander whose forces enter the struggle at Waterloo.
wathier|Wathier|A French cavalry commander in the movement toward Mont-Saint-Jean.
wilda|Wilda|A Hanoverian lieutenant mentioned in the account of the fighting at Hougomont’s farmhouse door.
`.trim().split('\n').map(line => {
  const [key, name, description] = line.split('|')
  return [key, { key, name, description }]
})
