import { sceneModel } from './scene-model.mjs'
export const eventTitles=new Map([...sceneModel].map(([chapter,rows])=>[chapter,rows.map(r=>r.title)]))
