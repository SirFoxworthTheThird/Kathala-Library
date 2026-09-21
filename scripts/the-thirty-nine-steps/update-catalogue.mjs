import { readFileSync, writeFileSync } from 'node:fs'

const path = 'library/index.json'
const index = JSON.parse(readFileSync(path, 'utf8'))
const entry = {
  id: 'the-thirty-nine-steps',
  title: 'The Thirty-Nine Steps',
  author: 'John Buchan',
  blurb: 'A murdered agent’s cipher sends Richard Hannay from a London flat across the Galloway hills and back toward a secret waiting above the Kent coast.',
  data: 'the-thirty-nine-steps.pwk',
  notice: 'Unofficial reading-mode edition of a public-domain novel. Scene drafts reproduce the complete narrative text of John Buchan’s original English 1915 novel from Project Gutenberg eBook #558 (UTF-8 text updated 7 April 2021), including the dedication and all ten author-supplied chapter headings. Gutenberg packaging, duplicated title and contents, illustration placeholder, delimiters, and licence are excluded. Event divisions, intermediate chronology, maps, summaries, and all 77 original generated illustrations are editorial and documented in SOURCES.md and Lore.',
  cover: 'library/the-thirty-nine-steps/art/world.png',
  dataBytes: 542261,
  worldId: 'thirty-nine-steps-world',
  counts: {
    characters: 21,
    chapters: 10,
    events: 72,
    locations: 39,
  },
}

const previous = index.entries.findIndex(({ id }) => id === entry.id)
if (previous >= 0) index.entries.splice(previous, 1)
index.entries.push(entry)
const sortKey = ({ title }) => title.replace(/^(the|a|an)\s+/i, '').toLocaleLowerCase()
index.entries.sort((a, b) => sortKey(a).localeCompare(sortKey(b)))
writeFileSync(path, `${JSON.stringify(index, null, 2)}\n`, 'utf8')
console.log(`Catalogue contains ${index.entries.length} entries.`)
