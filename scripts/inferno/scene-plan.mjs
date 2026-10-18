import {reviewedCantos} from './reviewed-scenes.mjs'

export const cantoPlans=reviewedCantos.map(canto=>canto.map(scene=>[
 scene.title,
 scene.description??Object.values(scene.states).join(' '),
 scene.location,
 Object.keys(scene.states).join(' '),
 scene.tension,
]))

export const characterNames={
 dante:'Dante',virgil:'Virgil',beatrice:'Beatrice',charon:'Charon',homer:'Homer',minos:'Minos',francesca:'Francesca da Rimini',paolo:'Paolo Malatesta',
 cerberus:'Cerberus',ciacco:'Ciacco',plutus:'Plutus',phlegyas:'Phlegyas',filippo:'Filippo Argenti',messenger:'The Heavenly Messenger',farinata:'Farinata degli Uberti',
 cavalcante:'Cavalcante de’ Cavalcanti',minotaur:'The Minotaur',chiron:'Chiron',nessus:'Nessus',pier:'Pier delle Vigne',lano:'Lano da Siena',jacopo:'Jacopo da Sant’ Andrea',
 capaneus:'Capaneus',brunetto:'Brunetto Latini',guidoGuerra:'Guido Guerra',geryon:'Geryon',venedico:'Venedico Caccianemico',jason:'Jason',nicholas:'Pope Nicholas III',manto:'Manto',
 malacoda:'Malacoda',malebranche:'The Malebranche',ciampolo:'Ciampolo of Navarre',catalano:'Catalano dei Malavolti',loderingo:'Loderingo degli Andalò',vanni:'Vanni Fucci',
 cacus:'Cacus',agnello:'Agnello Brunelleschi',cianfa:'Cianfa Donati',buoso:'Buoso Donati',guercio:'Guercio Cavalcanti',ulysses:'Ulysses',diomedes:'Diomedes',companions:'Ulysses’ Companions',
 guidoMontefeltro:'Guido da Montefeltro',boniface:'Pope Boniface VIII',mahomet:'Mahomet',pierMedicina:'Pier da Medicina',curio:'Curio',mosca:'Mosca dei Lamberti',bertran:'Bertran de Born',
 griffolino:'Griffolino d’Arezzo',capocchio:'Capocchio',gianni:'Gianni Schicchi',myrrha:'Myrrha',masterAdam:'Master Adam',sinon:'Sinon',nimrod:'Nimrod',ephialtes:'Ephialtes',
 antaeus:'Antaeus',bocca:'Bocca degli Abati',ugolino:'Count Ugolino',ruggieri:'Archbishop Ruggieri',children:'Ugolino’s Children',alberigo:'Fra Alberigo',lucifer:'Lucifer',
}
