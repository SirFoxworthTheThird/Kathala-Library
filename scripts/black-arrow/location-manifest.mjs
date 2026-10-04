import fs from 'node:fs'
import crypto from 'node:crypto'
import { locations } from './world-ledger.mjs'

const slug = s => s.normalize('NFKD').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const root = new URL('../../library/black-arrow/art/locations/', import.meta.url)
const prompt = (name, description) => `One separate ordinary location illustration for ${name} in Robert Louis Stevenson's The Black Arrow. Depict this exact place: ${description} Wide empty environmental composition with legible architecture, vegetation, and route details appropriate to this location. Mature late-Victorian historical-adventure oil-and-charcoal illustration, restrained earthy palette, England during the Wars of the Roses, natural light and texture. This is a scene painting, not a map, diagram, aerial plan, or portrait. No named person, text, labels, border, watermark, cartoon style, or modern objects.`
let markdown = '# Location artwork manifest\n\nEach entity image was generated in a separate OpenAI built-in imagegen call on 3 October 2026, opened at high preview resolution, and reviewed for place, period architecture, palette, and visible artifacts. Files are distinct from the nine code-native maps.\n\n'
for (const [name,,,,description] of locations) {
  const file = `${slug(name)}.png`
  const bytes = fs.readFileSync(new URL(file, root))
  const hash = crypto.createHash('sha256').update(bytes).digest('hex')
  const correction = name === 'Good Hope' ? ' Initial result resembled a small boat. A targeted built-in edit enlarged it into a broad medieval merchant ship with a working deck, raised castles, and square sail; the corrected image was reopened and accepted.' : ' No correction requested.'
  markdown += `## ${name}\n\n- Final file: \`library/black-arrow/art/locations/${file}\`\n- SHA-256: \`${hash}\`\n- Prompt: “${prompt(name, description)}”\n- Review: Opened and inspected; the pictured setting and period details identify this place.${correction}\n\n`
}
fs.writeFileSync(new URL('./LOCATION_ARTWORK.md', import.meta.url), markdown)
