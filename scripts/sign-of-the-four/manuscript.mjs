import { sections, retainedText, normalize, wordCount } from './source-text.mjs'
import { cuts } from './scene-cuts.mjs'

export const worldId = 'sign-of-the-four-world'
export const timelineId = 'sign-of-the-four-timeline'
export const stamp = { worldId, createdAt: Date.UTC(2026, 9, 4), updatedAt: Date.UTC(2026, 9, 4) }
export const chapters = [], events = [], sceneTexts = []
let sortOrder = 0
for (const section of sections) {
  const chapterId = `sign-four-chapter-${section.number}`
  chapters.push({ ...stamp, id: chapterId, timelineId, number: section.number, title: section.heading, synopsis: '', notes: 'Source chapter heading retained.', wordGoal: wordCount(section.text) })
  const paragraphs = section.text.split(/\n{2,}/)
  const beats = cuts[section.number - 1]
  if (!beats?.length || beats[0][0] !== 0 || beats.some(([start], index) => start < 0 || start >= paragraphs.length || (index && start <= beats[index - 1][0]))) throw Error(`Invalid cuts in chapter ${section.number}`)
  for (let index = 0; index < beats.length; index++) {
    const [start, title, description] = beats[index]
    const eventId = `sign-four-event-${section.number}-${index + 1}`
    const text = paragraphs.slice(start, beats[index + 1]?.[0] ?? paragraphs.length).join('\n\n')
    events.push({ ...stamp, id: eventId, chapterId, timelineId, title, description, locationMarkerId: null, involvedCharacterIds: [], mentionedCharacterIds: [], involvedItemIds: [], threadIds: [], motifIds: [], sortOrder: sortOrder++, travelDays: 0, inWorldTime: 0, tension: 1, tags: [], structureBeat: null, status: 'draft', povCharacterId: null, isFlashback: false })
    sceneTexts.push({ ...stamp, id: `sign-four-scene-${section.number}-${index + 1}`, eventId, text, wordCount: wordCount(text) })
  }
}
if (normalize(sceneTexts.map(scene => scene.text).join('\n\n')) !== normalize(retainedText)) throw Error('Manuscript reconstruction failed')
if (sceneTexts.reduce((sum, scene) => sum + scene.wordCount, 0) !== wordCount(retainedText)) throw Error('Manuscript word count differs from source')
