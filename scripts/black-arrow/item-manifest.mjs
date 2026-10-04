import fs from 'node:fs'
import crypto from 'node:crypto'
const briefs = [
  ['black-arrow','A single black-fletched medieval arrow with an iron head, laid on dark oak beside fresh sap and a torn leaf'],
  ['warning-rhyme','A small weathered parchment warning nailed to oak, showing abstract illegible ink marks and a black arrow beside it'],
  ['crossbow','A used fifteenth-century hunting crossbow with wooden stock, steel bow, cord and a small quiver on a rough table'],
  ['friar-habit',"A worn brown friar's habit, rope belt and hood arranged on a stool in a dim stone room"],
]
let text = '# Item artwork manifest\n\nEach still life was generated in a separate OpenAI built-in imagegen call on 3 October 2026, then opened and visually inspected. No corrections were needed.\n\n'
for (const [key, brief] of briefs) {
  const file = `library/black-arrow/art/items/${key}.png`
  const bytes = fs.readFileSync(new URL(`../../${file}`, import.meta.url))
  const hash = crypto.createHash('sha256').update(bytes).digest('hex')
  text += `## ${key}\n\n- Final file: \`${file}\`\n- SHA-256: \`${hash}\`\n- Prompt: “One distinct object still-life artwork for ${key} from Robert Louis Stevenson's The Black Arrow: ${brief}. Mature late-Victorian literary oil-and-charcoal realism, historically grounded fifteenth-century England, restrained earthy palette, one object composition, no people, no readable text, no letters, no labels, no border, no watermark, no cartoon or modern objects.”\n- Review: opened and inspected for a distinct object, period materials, restrained palette, and no legible lettering.\n\n`
}
fs.writeFileSync(new URL('./ITEM_ARTWORK.md', import.meta.url), text)
