import { sceneModel } from './scene-model.mjs'
export const chapterState=new Map([...sceneModel].map(([chapter,rows])=>[chapter,rows.map(r=>[r.place,Object.keys(r.notes)])]))
