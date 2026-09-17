import { describe, it, expect } from 'vitest'

/**
 * Lore is written to the reader, not to whoever built the world. **EX-010.**
 *
 * The Lore screen is where a reader goes to ask what the rules of this world
 * are, so a page that is really a build note answers somebody else's question
 * in front of them. A reader run flagged the shape; measuring it found two
 * mechanical faults in 570 pages across 41 books, and nothing else:
 *
 * - **six sentences naming a file that only exists beside the generator** —
 *   *"Asset identities and prompts are recorded in
 *   scripts/iliad/asset-manifest.json"*. Whoever downloaded the `.pwk` has no
 *   such file, so the pointer is a dead link written out in prose and offered
 *   as a source.
 * - **one page about what the world file does not contain** — *Intentional
 *   Feature Decisions*, which told a reader of *The Call of the Wild* that
 *   *"no map regions, floor groups, cross-timeline artifacts, annotations, or
 *   writing logs are added"*.
 *
 * Both halves below are paired with a presence, because both faults have an
 * over-reaching fix that would pass an absence-only test: deleting the six
 * colophons outright, and purging every page that mentions a timeline. The
 * pages named in the presence halves are the near neighbours that were checked
 * one by one and kept — a colophon is front matter, and for openly licensed
 * artwork its attribution is a condition of use; a page explaining why this
 * book has two timelines answers a question the companion itself raises.
 *
 * Read through `import.meta.glob` rather than `node:fs`, which passes vitest
 * and then fails `tsc -b` for want of node types.
 */

const worldFiles = import.meta.glob('../library/*.pwk', {
  eager: true, query: '?raw', import: 'default',
}) as Record<string, string>

interface Lore { id: string; title: string; body?: string }
interface World { lorePages?: Lore[] }

const parsed = Object.entries(worldFiles).map(([path, text]) =>
  [path.slice(path.lastIndexOf('/') + 1).replace('.pwk', ''), JSON.parse(text) as World] as const)

const pages = parsed.flatMap(([book, w]) =>
  (w.lorePages ?? []).map((p) => ({ book, title: p.title, body: p.body ?? '' })))

/** Sentences, near enough: the bodies are plain prose with no abbreviations. */
const sentences = (body: string) => body.split(/(?<=[.!?])\s+/)

/**
 * A path into the repository that builds this library — `scripts/…`, or a bare
 * filename with a source extension, or one of the build documents by name. A
 * reader has none of these.
 */
const REPO_PATH = /\bscripts\/|\b[\w-]+\.(?:json|md|mjs|ts|js)\b|\bMAP-REVIEW\b|\bSOURCES\.md\b/

/**
 * A sentence inventorying the world file rather than describing the story: it
 * names a PlotWeave object type *and* says whether one was put in. Measured
 * across every shipped page, this caught the two sentences it was written for
 * and nothing else — "Apparition snapshots represent the governess's perceived
 * presence" and "Both timelines share one absolute day axis" are about the book
 * and stay clear of it.
 */
const OBJECT = /\b(map regions?|floor groups?|cross-timeline artifacts?|annotations?|writing logs?|timelines?|snapshots?|lore pages?|knowledge facts?|plot threads?|motifs?|character goals?|travel modes?)\b/i
const INVENTORY = /\b(?:are|is|were|was) (?:not )?(?:added|included|created|used|modelled|modeled|recorded|omitted|left out)\b|\bno .{0,80}\b(?:are|is) (?:added|included|created|used)\b|\bis sufficient\b/i

describe('the voice of the shipped lore', () => {
  it('has worlds to check, and lore inside them', () => {
    // Without this every rule below passes on an empty glob, which is how a
    // fixture test quietly stops testing.
    expect(parsed.length).toBeGreaterThan(20)
    expect(pages.length).toBeGreaterThan(400)
    expect(pages.filter((p) => p.body.length > 0).length).toBeGreaterThan(400)
  })

  it('never sends a reader to a file that ships with the generator, not the book', () => {
    const dead = pages.flatMap(({ book, title, body }) =>
      sentences(body).filter((s) => REPO_PATH.test(s)).map((s) => `${book} — ${title}\n    ${s.trim()}`))
    expect(dead, `these name a file the reader does not have:\n${dead.join('\n')}`).toEqual([])
  })

  it('still carries the colophons those pointers were attached to', () => {
    /*
      The presence half. Every one of the six sentences above sat at the end of
      a page that is otherwise exactly right for a reader — which edition, whose
      engravings, which maps are invented and must not be trusted. Deleting the
      page is the fix that passes the test above and loses the reader more than
      the dead link ever cost them, so it fails here.
    */
    const required: [string, string, RegExp][] = [
      ['journey-to-the-west', 'The Chapter Titles', /the couplets are the author’s own/],
      ['journey-to-the-west', 'The Text Behind This World', /Chinese Wikisource/],
      ['journey-to-the-west', 'The Pictures in This World', /1592 Shidetang Hall imprint/],
      ['the-iliad', 'Artwork and Map Provenance', /interpretive reader reconstructions/],
      ['the-name-of-the-wind', 'About the Local Maps', /not surveyed or author-approved geography/],
      ['the-wise-man-s-fear', 'About the Local Maps', /not official maps or surveyed geography/],
    ]
    for (const [book, title, keeps] of required) {
      const page = pages.find((p) => p.book === book && p.title === title)
      expect(page, `${book} lost its "${title}" page`).toBeDefined()
      expect(page!.body, `${book} — ${title} lost what it was for`).toMatch(keeps)
    }
  })

  it('never writes a page about what the world file does or does not contain', () => {
    const notes = pages.flatMap(({ book, title, body }) =>
      sentences(body)
        .filter((s) => OBJECT.test(s) && INVENTORY.test(s))
        .map((s) => `${book} — ${title}\n    ${s.trim()}`))
    expect(notes, `these inventory the export rather than the story:\n${notes.join('\n')}`).toEqual([])
  })

  it('keeps the pages that explain the book’s own shape', () => {
    /*
      The presence half, and the reason the rule above is two conditions rather
      than "mentions a timeline". A reader looking at two timeline tabs, or at
      two character cards for one man, has a question the companion itself put
      in their head, and these are the pages that answer it.
    */
    const required: [string, string][] = [
      ['journey-to-the-west', 'Why There Are Two Timelines'],
      ['the-woman-in-white', 'A Novel Made of Testimony'],
      ['strange-case-of-dr-jekyll-and-mr-hyde', 'Jekyll and Hyde Are One Embodied Person'],
      ['the-turn-of-the-screw', 'Reported Sight Is Not Confirmed Knowledge'],
      ['the-iliad', 'Timeline and Event Granularity'],
    ]
    for (const [book, title] of required) {
      expect(pages.find((p) => p.book === book && p.title === title),
        `${book} lost its "${title}" page, which a reader needs`).toBeDefined()
    }
  })
})
