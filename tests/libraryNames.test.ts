import { describe, it, expect } from 'vitest'
// The same gate the revision scripts use, so the rule and the fixes cannot drift apart.
import { readerTexts, sortKeys, firstSeen } from '../scripts/lib/reader-gate.mjs'

/**
 * Names over the book (EX-405, EX-409).
 *
 * A character can be called different things at different points
 * (`nameChanges`: from a scene, the book calls them something else) and learn
 * aliases partway through (`aliasesFrom`: an alias is known only from a scene).
 * A reader sees the name in effect where they are, and only the aliases learned
 * by then. Eighteen worlds use them: the stranger who becomes the Invisible Man
 * and then Griffin, Laura Fairlie who becomes Lady Glyde, the Opera Ghost who
 * turns out to be Erik.
 *
 * The schedule only helps if nothing else says the name first. The Invisible
 * Man's world called him Griffin in forty texts a reader saw before he gives
 * the name in chapter 17; A Tale of Two Cities named the Evrémondes in twenty
 * places Dickens keeps nameless until Book Two's end. So the rule here: a name a
 * character is given after they first appear does not occur in any text a
 * reader sees before it is given. A name the book's own title gives is no
 * secret — the Count of Monte Cristo — and is not held to it.
 */

const worldFiles = import.meta.glob('../library/*.pwk', {
  eager: true, query: '?raw', import: 'default',
}) as Record<string, string>
const catalogue = JSON.parse(
  (import.meta.glob('../library/index.json', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>)['../library/index.json'],
) as { entries: Array<{ data: string; title: string }> }

interface Character {
  id: string
  name: string
  aliases?: string[]
  nameChanges?: Array<{ eventId: string; name: string }>
  aliasesFrom?: Array<{ alias: string; eventId: string }>
}
interface World {
  world: { description?: string }
  characters?: Character[]
  events?: Array<{ id: string }>
  [table: string]: unknown
}

const books = Object.entries(worldFiles).map(([path, text]) => {
  const file = path.slice(path.lastIndexOf('/') + 1)
  return {
    book: file.replace('.pwk', ''),
    title: catalogue.entries.find((e) => e.data === file)?.title ?? '',
    w: JSON.parse(text) as World,
  }
})

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

describe('names over the book', () => {
  it('are used, so the rules below are about something', () => {
    const scheduled = books.flatMap(({ book, w }) => (w.characters ?? [])
      .flatMap((c) => [
        ...(c.nameChanges ?? []).map((n) => `${book}: ${c.name} → ${n.name}`),
        ...(c.aliasesFrom ?? []).map((a) => `${book}: ${c.name} + ${a.alias}`),
      ]))
    // One from each kind of book this rule was written against.
    expect(scheduled).toEqual(expect.arrayContaining([
      'the-invisible-man: Griffin → Griffin',
      'the-woman-in-white: Laura Fairlie → Lady Glyde',
      'the-fellowship-of-the-ring: Aragorn → Strider',
      'the-fellowship-of-the-ring: Aragorn + Elessar',
      'neuromancer: Armitage + Colonel Willis Corto',
      'a-tale-of-two-cities: Charles Darnay + Charles Evrémonde',
      'the-hound-of-the-baskervilles: Jack Stapleton + Rodger Baskerville',
      'the-scarlet-pimpernel: Sir Percy Blakeney + The Scarlet Pimpernel',
      'journey-to-the-west: Sun Wukong → The Handsome Monkey King',
      'dracula: Lucy Westenra + The Bloofer Lady',
    ]))
  })

  it('name scenes the world contains, and aliases it lists', () => {
    const wrong: string[] = []
    for (const { book, w } of books) {
      const key = sortKeys(w)
      for (const c of w.characters ?? []) {
        const scenes = new Set<string>()
        for (const n of c.nameChanges ?? []) {
          if (!key.has(n.eventId)) wrong.push(`${book}: ${c.name} → ${n.name} at missing scene ${n.eventId}`)
          if (scenes.has(n.eventId)) wrong.push(`${book}: ${c.name} has two name changes at ${n.eventId}`)
          scenes.add(n.eventId)
        }
        for (const a of c.aliasesFrom ?? []) {
          if (!key.has(a.eventId)) wrong.push(`${book}: ${c.name} + ${a.alias} at missing scene ${a.eventId}`)
          if (!(c.aliases ?? []).includes(a.alias)) wrong.push(`${book}: ${c.name} learns "${a.alias}", which is not among their aliases`)
        }
      }
    }
    expect(wrong).toEqual([])
  })

  it('never shows a name before the book gives it', () => {
    const early: string[] = []
    let checked = 0
    for (const { book, title, w } of books) {
      const key = sortKeys(w)
      const met = firstSeen(w)
      const texts = readerTexts(w)
      const later: Array<{ who: string; name: string; at: number }> = []
      for (const c of w.characters ?? []) {
        const first = met.get(c.id) ?? -Infinity
        for (const n of c.nameChanges ?? []) later.push({ who: c.name, name: n.name, at: key.get(n.eventId)! })
        for (const a of c.aliasesFrom ?? []) later.push({ who: c.name, name: a.alias, at: key.get(a.eventId)! })
        // A name in effect when the character is first met is how the reader meets them, not a reveal.
        for (let i = later.length - 1; i >= 0 && later[i].who === c.name; i--) if (!(later[i].at > first)) later.splice(i, 1)
      }
      for (const { who, name, at } of later) {
        if (title.toLowerCase().includes(name.toLowerCase())) continue
        checked++
        const rx = new RegExp(`\\b${escape(name)}\\b`, 'i')
        if (rx.test(w.world.description ?? '')) early.push(`${book}: "${name}" (${who}) in the world description`)
        for (const t of texts) {
          if (t.from === undefined || t.from >= at) continue
          const record = ((w[t.table] as Array<Record<string, unknown>>) ?? []).find((r) => r.id === t.id)
          const text = record?.[t.field]
          if (typeof text === 'string' && rx.test(text)) early.push(`${book}: "${name}" (${who}) in ${t.table} ${t.id}.${t.field}`)
        }
      }
    }
    expect(checked).toBeGreaterThan(30)
    expect(early).toEqual([])
  })
})
