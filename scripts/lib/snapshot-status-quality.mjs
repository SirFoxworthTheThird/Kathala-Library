import { applyAuthoredSnapshotStates } from './authored-snapshot-states.mjs'

const escapeRegExp = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const directTitlePatterns = title => {
  const escaped = escapeRegExp(title)
  return [
    new RegExp(`[“\u201d\ufffd"]${escaped}([,;:]?)[“\u201d\ufffd"]`, 'g'),
    new RegExp(`\\b(?:during|through|in)\\s+${escaped}(?=[.!?]|$)`, 'g'),
  ]
}

function removeDirectTitle(value, title) {
  const escaped = escapeRegExp(title)
  return value
    .replace(new RegExp(`[“\u201d\ufffd"]${escaped}([,;:]?)[“\u201d\ufffd"]`, 'g'), '$1')
    .replace(new RegExp(`\\b(?:during|through|in)\\s+${escaped}(?=[.!?]|$)`, 'g'), '')
}

export function directlyInterpolatesSceneTitle(note, title) {
  if (!note?.trim() || !title?.trim()) return false
  return directTitlePatterns(title).some(pattern => pattern.test(note))
}

function cleanEnglish(note) {
  return note
    .replace(/^During\s+[,;:]?\s*/i, '')
    .replace(/\s+during\s+(?=[,.;:]|$)/gi, ' ')
    .replace(/\s+during\s+from\b/gi, ' from')
    .replace(/\s+through\s+(?=[,.;:]|$)/gi, ' ')
    .replace(/\s+in\s+(?=[,.;:]|$)/gi, ' ')
    .replace(/[.,]\s*specifically as\s+/gi, ' while ')
    .replace(/,\s*where\s+/gi, ' while ')
    .replace(/shares the danger of\s+while\b/gi, 'shares the danger while')
    .replace(/immediate position in\s*:/gi, 'immediate position:')
    .replace(/\s+([,.;:])/g, '$1')
    .replace(/\.{2,}/g, '.')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

function cleanPortuguese(note) {
  return note
    .replace(/\benfrenta\s+(?=preservando)/i, '')
    .replace(/\bpreserva\s+preservando\b/i, 'preserva')
    .replace(/^(.+?)\s+preservando\b/i, '$1 preserva')
    .replace(/\breage a\s*:/i, 'reage ao momento:')
    .replace(/\bcumpre em\s+(?=a responsabilidade)/i, 'cumpre ')
    .replace(/\batravessa\s+(?=dominado|dominada)/i, 'atravessa o momento ')
    .replace(/\bage em\s+(?=segundo|segundo a)/i, 'age ')
    .replace(/,\s*em\s*,\s*/i, ', ')
    .replace(/\s+([,.;:])/g, '$1')
    .replace(/\.{2,}/g, '.')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

export function repairSnapshotStatus(note, event, characterName) {
  if (!directlyInterpolatesSceneTitle(note, event?.title)) return note

  let repaired = note
  repaired = removeDirectTitle(repaired, event.title)
  repaired = cleanPortuguese(cleanEnglish(repaired))

  if (!repaired || repaired === characterName || /acts at the center of|narrates and endures|distinct (?:part|position)|physically present|central action/i.test(repaired)) {
    throw new Error(`An individual authored state is required for ${event.id}: ${characterName}`)
  }

  return repaired.replace(/\s+([,.;:])/g, '$1').replace(/\.{2,}/g, '.').trim()
}

export function repairWorldSnapshotStatuses(world) {
  const authored = applyAuthoredSnapshotStates(world)
  if (authored !== null) return authored
  const events = new Map((world.events ?? []).map(event => [event.id, event]))
  const characters = new Map((world.characters ?? []).map(character => [character.id, character]))
  let changed = 0

  for (const snapshot of world.characterSnapshots ?? []) {
    const event = events.get(snapshot.eventId)
    const character = characters.get(snapshot.characterId)
    if (!event || !character) continue
    const repaired = repairSnapshotStatus(snapshot.statusNotes, event, character.name)
    if (repaired !== snapshot.statusNotes) {
      snapshot.statusNotes = repaired
      changed += 1
    }
  }

  return changed
}
