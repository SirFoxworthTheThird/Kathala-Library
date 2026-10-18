import {reviewedBooks} from './reviewed-scenes.mjs'

export const bookPlans=reviewedBooks.map(book=>book.map(scene=>[scene.title,scene.description??`${scene.title}: ${Object.values(scene.states).join(' ')}`,scene.location,Object.keys(scene.states).join(' '),scene.tension]))

export const characterNames = {
  azazel:'Azazel',mulciber:'Mulciber',nisroch:'Nisroch',uzziel:'Uzziel',
  poet:'The Poet', satan:'Satan', beelzebub:'Beelzebub', moloch:'Moloch', belial:'Belial', mammon:'Mammon',
  sin:'Sin', death:'Death', chaos:'Chaos', night:'Night', god:'God', son:'The Son', uriel:'Uriel', adam:'Adam', eve:'Eve',
  gabriel:'Gabriel', ithuriel:'Ithuriel', zephon:'Zephon', raphael:'Raphael', abdiel:'Abdiel', michael:'Michael',
}

