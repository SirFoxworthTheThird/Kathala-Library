import { describe, it, expect } from 'vitest'

/**
 * A world that names its chapters says where the names came from.
 *
 * **R1.** A blind reader run reported the shipped worlds inventing chapter
 * titles. It is far narrower than that. Of the 39 shipped worlds, 35 carry
 * descriptive chapter titles and four number them as the book does
 * (*Frankenstein*, *Neuromancer*, *Pride and Prejudice*, *The Picture of Dorian
 * Gray*); of the 35, the great majority are the author's own — *Dracula*'s
 * document headings included, which look invented and are not, and *Journey to
 * the West*'s couplets, which are the novel's.
 *
 * Four are editorial: *Jane Eyre* and *Wuthering Heights*, whose chapters the
 * Brontës numbered and did not name, and *The Iliad* and *The Odyssey*, whose
 * books carry numbers in the Greek and acquire names only from translators.
 * `EX-006` already requires an editorial reconstruction to be identified in Lore
 * and its assumptions explained — the rule these worlds' calendars and maps
 * already follow — and this is that rule applied to the chapter titles.
 *
 * *The Woman in White* joined them after a blind reader run typed a half-
 * remembered name into the search box at chapter 9 and was handed *Fosco: The
 * Confession* and *Conclusion II: Fosco's Death in Paris*. Collins numbered his
 * chapters within each narrative and named none of them; the epochs and the
 * named narratives here are his, and the tails after the colon were supplied
 * for this edition. That is EX-008, and the tails that stated an outcome rather
 * than naming the chapter were EX-009 as well.
 *
 * **The list is hand-kept, and that is the weak point.** Nothing in the data
 * distinguishes a title an author wrote from one an example author supplied, so
 * no rule can derive it. It went stale exactly as you would expect: *The Iliad*
 * and *Wuthering Heights* were added to the Library declaring their titles
 * editorial in Lore, and nobody extended the list, so the rule quietly stopped
 * covering half the worlds it was about. The second test is what keeps the list
 * from outliving the thing it describes, by checking the half that *can* be
 * derived — that a world named here really does carry descriptive titles.
 *
 * **And the declaration is matched on substance, not on wording.** This asked
 * for the literal phrase "editorial signpost" until *The Odyssey* failed it
 * while saying the same thing in its own words: "the descriptive book names and
 * exact calendar values used here are editorial aids." A guard that matches a
 * turn of phrase fails the worlds that comply and passes nothing extra. What it
 * asks now is that one sentence of Lore ties the words *editorial*, *names or
 * titles*, and *chapters or books* together — which is the claim EX-006 wants a
 * reader to be able to find.
 */

const worldFiles = import.meta.glob('../library/*.pwk', {
  eager: true, query: '?raw', import: 'default',
}) as Record<string, string>

interface World {
  lorePages?: { title: string; body: string }[]
  chapters?: { number: number; title?: string }[]
}

const worldsBySlug = new Map(Object.entries(worldFiles).map(([path, text]) => {
  const file = path.slice(path.lastIndexOf('/') + 1)
  return [file.replace(/\.pwk$/, ''), JSON.parse(text) as World] as const
}))

/** Worlds whose chapter names were written for the example, not by the author. */
const EDITORIAL_TITLES = [
  'jane-eyre', 'the-iliad', 'the-odyssey', 'the-woman-in-white', 'wuthering-heights',
]

/**
 * Does one sentence of this page say the chapter names are editorial?
 *
 * Sentence-scoped on purpose. A page that happens to use the word "editorial"
 * somewhere and the word "chapter" somewhere else is most of these pages, and a
 * rule that accepted that would pass on every world whether or not it made the
 * claim.
 */
function declaresEditorialTitles(body: string): boolean {
  return body
    .split(/(?<=[.!?])\s+/)
    .some((sentence) =>
      /editorial/i.test(sentence) &&
      /\b(?:names?|titles?|named|titled)\b/i.test(sentence) &&
      /\b(?:chapters?|books?)\b/i.test(sentence))
}

/** A heading that is only a number or a structural label, e.g. "Chapter IV". */
const STRUCTURAL = /^(chapter|letter|book|part|canto|prologue|epilogue|interlude)\b[\s\dIVXLC.:—-]*$/i

describe('editorial chapter titles', () => {
  it('has worlds to check', () => {
    // Without this both rules pass on an empty glob.
    expect(worldsBySlug.size).toBeGreaterThan(20)
  })

  it.each(EDITORIAL_TITLES)('%s says in Lore that its chapter names are editorial', (slug) => {
    const world = worldsBySlug.get(slug)
    expect(world, `${slug} should be a shipped world`).toBeDefined()
    const said = (world!.lorePages ?? []).some((p) => declaresEditorialTitles(p.body))
    expect(said, 'a reader should be able to find out that these names are not the author’s').toBe(true)
  })

  /*
    The half that keeps the list above honest. Renumber one of these worlds to
    the book's own "Chapter 1" and it no longer belongs here — the note would
    then describe titles that are gone, which is the quiet way a claim in a
    fixture outlives the thing it was about.
  */
  it.each(EDITORIAL_TITLES)('%s really does carry descriptive chapter titles', (slug) => {
    const chapters = worldsBySlug.get(slug)?.chapters ?? []
    expect(chapters.length).toBeGreaterThan(5)
    const descriptive = chapters.filter((c) => c.title && !STRUCTURAL.test(c.title))
    expect(descriptive.length).toBeGreaterThan(chapters.length * 0.6)
  })

  it('does not claim the same of a world whose titles are the author’s own', () => {
    /*
      Presence beside absence, and the reason the list is a list rather than a
      rule applied to everything: Alice's chapter titles are Carroll's, and
      telling a reader they were invented for this example would be a new
      untruth in place of the old one.
    */
    const alice = worldsBySlug.get('alice-in-wonderland')
    expect(alice, 'Alice should be a shipped world').toBeDefined()
    expect((alice!.chapters ?? []).filter((c) => c.title && !STRUCTURAL.test(c.title)).length)
      .toBeGreaterThan(5)
    expect((alice!.lorePages ?? []).some((p) => declaresEditorialTitles(p.body))).toBe(false)
  })
})
