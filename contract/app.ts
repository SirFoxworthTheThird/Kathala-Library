/**
 * The parts of Kathala a shipped world has to agree with.
 *
 * These values are defined by the application, not here — a world cannot invent
 * a theme, and a catalogue cannot invent a field. They are restated in this
 * repository because the books are validated without the app present, and a
 * test that cannot name the rule cannot enforce it.
 *
 * **So this file can drift, and drift silently.** It is the one place in this
 * repository that is a copy of something else. When the app adds a theme or
 * changes the catalogue's shape, this has to follow, and nothing here will say
 * so. Treat a mismatch as a bug in this file first.
 *
 * Source of truth: `src/lib/themes.ts` and `src/lib/library.ts` in
 * SirFoxworthTheThird/Kathala.
 */

/** Theme ids the app defines, from `APP_THEMES` in `src/lib/themes.ts`. */
export const APP_THEME_IDS = [
  'default', 'fantasy', 'scifi', 'cyberpunk', 'horror', 'western', 'action',
  'noir', 'gothic', 'mystery', 'mythic', 'adventure', 'dystopian', 'historical',
  'cosy', 'paper', 'romance',
] as const

/**
 * How a theme id is written into a world record.
 *
 * The app applies it as a CSS class, so a world stores `theme-gothic` rather
 * than `gothic`; `default` stores nothing at all. A bare id matches no rule and
 * the book renders in the default slate with nothing saying why — which is
 * exactly what *Os Maias* did.
 */
export function themeClass(id: string): string | null {
  return id === 'default' ? null : `theme-${id}`
}

/** Every value a world's `theme` field is allowed to hold. */
export const KNOWN_THEME_CLASSES: ReadonlySet<string> = new Set(
  APP_THEME_IDS.map(themeClass).filter((c): c is string => !!c),
)

export interface LibraryEntry {
  id: string
  worldId: string
  title: string
  author: string
  blurb: string
  data: string
  notice: string
  dataBytes: number
  images?: string
  imagesBytes?: number
  cover?: string
  counts?: { characters?: number; chapters?: number; events?: number; locations?: number }
  /**
   * Whether the world carries the book's text.
   *
   * Derived, never written by hand: `sceneTexts` is either there or it is not,
   * and it is the same question the app asks itself — `useHasProse` counts the
   * same rows — so the shelf and the opened world cannot disagree about which
   * books can be read.
   *
   * It is the sharpest division in the catalogue. Thirty-nine books hold the
   * complete public-domain text and can be read in the app; seven hold
   * structure only, because the novel is still in copyright or the world was
   * built as a reference rather than an edition. A reader looking for something
   * to read and a writer looking at how a world is put together want opposite
   * halves of that.
   *
   * Optional, because a catalogue published before this field existed has none,
   * and an app reading one must not conclude that every book lacks prose.
   */
  hasProse?: boolean
  /**
   * The oldest Kathala that can open this book, as `major.minor.patch`.
   *
   * Optional, and almost no book needs it. It exists because the books are
   * published independently of the app now: a desktop install from a year ago
   * fetches a catalogue written today. A book relying on something genuinely
   * new says so, and an app too old to give it tells the reader on the card
   * instead of importing into a world that silently lacks it.
   *
   * An app released before the field existed ignores it, so it protects only
   * versions that already know to look — which is why it was added before any
   * book needed it rather than when one did.
   */
  minAppVersion?: string
}

export interface LibraryIndex {
  version: number
  entries: LibraryEntry[]
}

/**
 * Reject a catalogue that is not the shape the app expects, rather than
 * shipping one it will half-render.
 *
 * Mirrors `parseLibraryIndex` in the app. The app keeps its own copy and should:
 * it is parsing a file fetched from a repository it does not control, so
 * checking the shape before rendering matters more after the split, not less.
 * The two are not duplication — the app asks "can I safely render this", and
 * this asks "is this fit to publish".
 */
export function parseLibraryIndex(raw: unknown): LibraryIndex {
  if (typeof raw !== 'object' || raw === null) throw new Error('Library index is not an object')
  const obj = raw as Record<string, unknown>
  if (typeof obj.version !== 'number') throw new Error('Library index is missing a version')
  if (!Array.isArray(obj.entries)) throw new Error('Library index is missing its entries')

  const entries = obj.entries.map((value, i) => {
    const e = value as Record<string, unknown>
    for (const field of ['id', 'worldId', 'title', 'author', 'blurb', 'data', 'notice'] as const) {
      if (typeof e[field] !== 'string' || !e[field]) {
        throw new Error(`Library entry ${i} is missing ${field}`)
      }
    }
    if (typeof e.dataBytes !== 'number') throw new Error(`Library entry ${i} is missing dataBytes`)
    if (e.hasProse !== undefined && typeof e.hasProse !== 'boolean') {
      throw new Error(`Library entry ${i} has a hasProse that is not a boolean`)
    }
    if (e.minAppVersion !== undefined && !/^\d+(\.\d+)*$/.test(String(e.minAppVersion).trim())) {
      // The app ignores a requirement it cannot read rather than hiding a book,
      // which is right at runtime and wrong here: publishing one means the
      // requirement silently does nothing.
      throw new Error(
        `Library entry ${i} has a minAppVersion that is not a version: ${JSON.stringify(e.minAppVersion)}`,
      )
    }
    if (e.cover !== undefined && !(typeof e.cover === 'string' && isAllowedCover(e.cover))) {
      throw new Error(`Library entry ${i} has a cover that is neither an absolute http(s) URL nor a path under library/`)
    }
    return e as unknown as LibraryEntry
  })

  return { version: obj.version, entries }
}

/**
 * A cover is either somebody else's host or a file this repository ships.
 *
 * Checked for traversal explicitly rather than by resolving, because the value
 * is data from a file and the answer should not depend on where the document
 * happens to be.
 */
function isAllowedCover(cover: string): boolean {
  if (/^https?:\/\//i.test(cover)) return true
  if (!cover.startsWith('library/')) return false
  return !cover.includes('..') && !cover.includes('\\') && !/^[a-z][a-z0-9+.-]*:/i.test(cover)
}
