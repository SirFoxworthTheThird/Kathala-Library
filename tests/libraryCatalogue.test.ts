import { describe, it, expect } from 'vitest'
import { parseLibraryIndex } from '../contract/app'
import rawIndex from '../library/index.json'

/** Every shipped `.pwk`, read through Vite so this stays browser-typed. */
const worldFiles = import.meta.glob('../library/*.pwk', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

const bundledImages = import.meta.glob('../library/**/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})

function worldFor(data: string): Record<string, unknown> {
  const key = Object.keys(worldFiles).find((k) => k.endsWith(`/${data}`))
  if (!key) throw new Error(`No shipped file for ${data}`)
  return JSON.parse(worldFiles[key]) as Record<string, unknown>
}

/**
 * Guards on the catalogue that actually ships, rather than on the code that
 * reads it. A broken manifest or a stray file would only show up as an empty
 * dialog in production.
 */

const index = parseLibraryIndex(rawIndex)

/**
 * What a book carrying prose has to say about where the prose came from.
 *
 * This replaces a guard that asked for the phrase `original scene drafts`,
 * `original prose` or `public-domain translation`. Those were the words the
 * first few worlds happened to use. The convention moved to naming the source
 * edition — "the complete narrative text of Project Gutenberg eBook #345" — and
 * 27 of the 32 prose-carrying books then failed a rule that had only ever been
 * matching a turn of phrase. They were left failing, which is how a guard stops
 * being read at all.
 *
 * So: substance rather than wording, and the substance is already written down.
 * EX-007 asks that the exact edition, the public-domain status and the source
 * appear in the notice, not only in Lore. These two are that rule.
 *
 * Every shipped prose world is built from Project Gutenberg, so that is what
 * `SOURCE_EDITION` demands. A book drawn from somewhere else — Wikisource, a
 * scan of a 19th-century printing — will fail here, and should: where prose
 * came from is a decision to make in the open, not a pattern to widen quietly.
 */
const PUBLIC_DOMAIN_BASIS = /public[- ]domain|domínio público/i
const SOURCE_EDITION = /Project Gutenberg\b[^;]{0,60}?\d{1,6}/i

/**
 * And what a book carrying no prose has to say instead.
 *
 * The pair is the point. A rule written only for the prose books can be
 * satisfied by a catalogue that has none, and it would read as coverage while
 * asking nothing — so the books that carry no prose are held to the opposite
 * claim in the same run, and `both kinds of book are present` below keeps
 * either half from being satisfied by an empty set.
 */
const DECLARES_NO_PROSE = /no text from the book is included|not the novel['’]s prose/i

describe('the published library catalogue', () => {
  it('is valid and not empty', () => {
    expect(index.entries.length).toBeGreaterThan(0)
  })

  it('uses unique slugs and unique world ids', () => {
    // Two entries sharing a world id would silently overwrite each other on
    // download, since import reuses the id in the file.
    const ids = index.entries.map((e) => e.id)
    const worldIds = index.entries.map((e) => e.worldId)
    expect(new Set(ids).size).toBe(ids.length)
    expect(new Set(worldIds).size).toBe(worldIds.length)
  })

  it('ships both kinds of book, so the provenance rule is exercised both ways', () => {
    // Each book is asked either to name its source or to declare it has no
    // prose, and neither question is asked of the other kind. If the catalogue
    // ever held only one kind, half the rule would go untested while still
    // reporting green.
    const withProse = index.entries.filter(
      (e) => ((worldFor(e.data).sceneTexts as unknown[] | undefined) ?? []).length > 0,
    )
    expect(withProse.length, 'books carrying prose').toBeGreaterThan(0)
    expect(index.entries.length - withProse.length, 'books carrying none').toBeGreaterThan(0)
  })

  it('keeps the Odyssey manuscript cover readable without a cross-origin request', () => {
    const entry = index.entries.find((candidate) => candidate.id === 'the-odyssey')
    expect(entry?.cover).toBe('library/the-odyssey/art/cover.png')
    expect(Object.keys(bundledImages).some((path) => path.endsWith('/the-odyssey/art/cover.png'))).toBe(true)
  })

  for (const entry of index.entries) {
    describe(entry.title, () => {
      it('ships the file the manifest points at', () => {
        expect(() => worldFor(entry.data)).not.toThrow()
      })

      it('names the author and carries an attribution notice', () => {
        expect(entry.author.trim()).not.toBe('')
        expect(entry.notice).toMatch(/unofficial/i)
      })

      it('says where its prose came from, or says it has none', () => {
        // EX-007, on the catalogue side: a public-domain book may reproduce
        // prose when the notice declares that basis and names the edition it
        // was built from. A book still in copyright stays a structural
        // reference, and says so.
        const world = worldFor(entry.data)
        const sceneTexts = (world.sceneTexts ?? []) as Array<{ eventId: string }>
        const events = world.events as Array<{ id: string }>
        if (sceneTexts.length > 0) {
          expect(entry.notice, 'declares a public-domain basis').toMatch(PUBLIC_DOMAIN_BASIS)
          expect(entry.notice, 'names the source edition').toMatch(SOURCE_EDITION)
          // Every draft resolves uniquely to a modeled event, so no passage is
          // orphaned and none is shown twice.
          expect(sceneTexts).toHaveLength(events.length)
          expect(new Set(sceneTexts.map((scene) => scene.eventId)).size).toBe(events.length)
        } else {
          expect(entry.notice, 'says it carries no prose').toMatch(DECLARES_NO_PROSE)
        }
        expect(world.sceneRevisions ?? [], 'sceneRevisions').toEqual([])
      })

      it('advertises a cover only where the world really links one', () => {
        // The manifest is hand-maintained, so a cover could drift from the
        // world it claims to belong to, or outlive one that was swapped for an
        // uploaded image. Both would put the wrong book on the card.
        const world = worldFor(entry.data) as Record<string, unknown>
        const coverId = (world.world as Record<string, unknown> | undefined)?.coverImageId
        const blobs = (world.blobs ?? []) as Array<Record<string, unknown>>
        const linked = coverId ? blobs.find((b) => b.id === coverId)?.url : undefined

        if (entry.cover === undefined) {
          // No claim made. Fine — but not because the world had one to give
          // that we forgot to list.
          expect(linked ?? null, 'world links a cover the manifest omits').toBeNull()
        } else {
          expect(entry.cover).toBe(linked)
          /*
            Either a link out to the web, or a file this app ships. W23-7 moved
            the project's own artwork from `raw.githubusercontent.com/…` to a
            path resolved against `import.meta.env.BASE_URL`, so a cover is no
            longer necessarily absolute — but it must still be one of the two
            shapes, never a bare filename or an accidental empty string.
          */
          expect(entry.cover).toMatch(/^(https:\/\/|library\/)/)
        }
      })

      it('declares counts that match what is in the file', () => {
        if (!entry.counts) return
        const world = worldFor(entry.data) as Record<string, unknown[]>
        if (entry.counts.characters !== undefined) {
          expect(world.characters.length).toBe(entry.counts.characters)
        }
        if (entry.counts.chapters !== undefined) {
          expect(world.chapters.length).toBe(entry.counts.chapters)
        }
        if (entry.counts.events !== undefined) {
          expect(world.events.length).toBe(entry.counts.events)
        }
        if (entry.counts.locations !== undefined) {
          expect(world.locationMarkers.length).toBe(entry.counts.locations)
        }
      })

      it('arrives in reading mode', () => {
        // A library world is a reference to someone else's book. It should be
        // spoiler-gated the moment it lands, not after the reader finds a
        // setting they had no reason to look for.
        const world = worldFor(entry.data) as { world: { readingMode?: boolean } }
        expect(world.world.readingMode).toBe(true)
      })

      it('states the world id the file actually carries', () => {
        const world = worldFor(entry.data) as { world: { id: string } }
        expect(world.world.id).toBe(entry.worldId)
      })
    })
  }
})

/**
 * `hasProse` is the shelf's sharpest division, and it is derived.
 *
 * A reader opening the Library wants the books they can read; a writer wants to
 * see how a world is assembled. Those are opposite halves of the same shelf,
 * and until this field existed the catalogue could not tell them apart — the
 * app had to download a world to find out whether it had any text in it.
 *
 * Asserted against the files rather than against itself: a hand-edited entry,
 * or a book whose prose was dropped in a regeneration, is exactly the drift
 * `dataBytes` suffered three times before it was derived.
 */
describe('which books carry the text', () => {
  it('says so for every entry, and agrees with the world file', () => {
    expect(index.entries.length).toBeGreaterThan(40)
    for (const entry of index.entries) {
      const world = worldFor(entry.data)
      const scenes = (world.sceneTexts ?? []) as unknown[]
      expect(entry.hasProse, `${entry.id} does not say whether it carries prose`)
        .toBe(scenes.length > 0)
    }
  })

  /*
    The census. Both halves have to be real for the division to mean anything:
    a shelf where every book carries prose needs no split, and one where none
    does has nothing to read. The seven without are the books still in
    copyright, plus Journey to the West, which is a reference rather than an
    edition — so this also fails if a copyrighted novel ever acquires a
    `sceneTexts` row, which is the one way this repository could do real harm.
  */
  it('has books on both sides of the division', () => {
    const withProse = index.entries.filter((e) => e.hasProse)
    const structureOnly = index.entries.filter((e) => !e.hasProse)
    expect(withProse.length).toBeGreaterThan(30)
    expect(structureOnly.length).toBeGreaterThan(3)
    expect(withProse.length + structureOnly.length).toBe(index.entries.length)
    for (const entry of structureOnly) {
      expect(entry.notice, `${entry.id} carries no prose but its notice does not say so`)
        .toMatch(/no text from the book|not the novel’s prose|structural/i)
    }
  })
})
