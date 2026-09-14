import fs from 'node:fs'

export const sourceUrl = 'https://www.gutenberg.org/ebooks/175'
export const sourceEdition = 'The Phantom of the Opera, translated by Alexander Teixeira de Mattos, Project Gutenberg eBook #175 (2025 UTF-8 text)'

const raw = fs.readFileSync(new URL('./source/pg175.txt', import.meta.url), 'utf8').replace(/\r\n/g, '\n')
const start = raw.indexOf('\nPrologue\n', raw.indexOf('*** START OF THE PROJECT GUTENBERG EBOOK')) + 1
const end = raw.indexOf('\n*** END OF THE PROJECT GUTENBERG EBOOK')
if (start < 0 || end < 0) throw new Error('Project Gutenberg narrative boundaries were not found')

export const narrativeText = raw.slice(start, end).trim()
const headingPattern = /^(Prologue|Chapter [IVX]+(?:\s+[^\n]*)?|Epilogue\.)\s*$/gm
const matches = [...narrativeText.matchAll(headingPattern)]
if (matches.length !== 28) throw new Error(`Expected 28 structural divisions, found ${matches.length}`)

export const sourceTitles = [
  'Prologue',
  'Is It the Ghost?', 'The New Margarita', 'The Mysterious Reason', 'Box Five',
  'The Enchanted Violin', 'A Visit to Box Five', 'Faust and What Followed',
  'The Mysterious Brougham', 'At the Masked Ball', "Forget the Name of the Man's Voice",
  'Above the Trap-Doors', "Apollo's Lyre", 'A Master-Stroke of the Trap-Door Lover',
  'The Singular Attitude of a Safety-Pin', 'Christine! Christine!',
  "Mme. Giry's Astounding Revelations as to Her Personal Relations with the Opera Ghost",
  'The Safety-Pin Again', 'The Commissary, the Viscount and the Persian',
  'The Viscount and the Persian', 'In the Cellars of the Opera',
  'Interesting and Instructive Vicissitudes of a Persian in the Cellars of the Opera',
  'In the Torture Chamber', 'The Tortures Begin', 'Barrels! Barrels! Any Barrels to Sell?',
  'The Scorpion or the Grasshopper: Which?', "The End of the Ghost's Love Story", 'Epilogue',
]

export const sourceSections = matches.map((match, index) => {
  const sectionEnd = index + 1 < matches.length ? matches[index + 1].index : narrativeText.length
  return {
    number: index + 1,
    title: sourceTitles[index],
    sourceHeading: match[0].trim(),
    text: narrativeText.slice(match.index, sectionEnd).trim(),
  }
})

export function splitSection(text, parts) {
  const paragraphs = text.split(/\n{2,}/)
  const total = paragraphs.reduce((sum, paragraph) => sum + paragraph.length, 0)
  const result = []
  let current = []
  let used = 0
  for (const paragraph of paragraphs) {
    current.push(paragraph)
    used += paragraph.length
    const remainingParts = parts - result.length - 1
    const target = total * (result.length + 1) / parts
    if (remainingParts > 0 && used >= target) {
      result.push(current.join('\n\n'))
      current = []
    }
  }
  result.push(current.join('\n\n'))
  if (result.length !== parts) throw new Error(`Could not split section into ${parts} scenes`)
  return result
}
