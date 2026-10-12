import { sceneModel } from './scene-model.mjs'
export const chapterSynopses=[...sceneModel.values()].map(rows=>rows[0].description)
