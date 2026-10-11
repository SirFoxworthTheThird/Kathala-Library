import assert from 'node:assert/strict'
import crypto from 'node:crypto'
import fs from 'node:fs'
import zlib from 'node:zlib'
import { cantos, retainedText, stanzaCount, verseLineCount, wordCount } from './source-text.mjs'

const expected = new Map([
  [77660, ['7554f5cebb4f1d4ab224728374fe3f2104145e3110d3c339e3e8d189ab77359a', 327626]],
  [77661, ['3b7e54d94128ab1dc35b3a8b6ccb077bd6414591b44a8204a1b2509544f32f18', 268867]],
])
for (const [number, [digest, length]] of expected) {
  const bytes = zlib.gunzipSync(fs.readFileSync(new URL(`./source/pg${number}.txt.gz`, import.meta.url)))
  assert.equal(bytes.length, length)
  assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'), digest)
}
assert.equal(stanzaCount, 1102)
assert.equal(verseLineCount, 8816)
assert.equal(wordCount(retainedText), 65812)
assert.equal(crypto.createHash('sha256').update(retainedText).digest('hex'), '55a4b46f721432b8abfe6947b80fc7bd49c397ac8ac8f0b522c19645a4f01135')
assert.deepEqual(cantos.map(canto => canto.stanzas.length), [106,113,143,104,100,99,87,99,95,156])
assert.equal(cantos[0].stanzas[0].text.split('\n')[0], 'The feats of Arms, and famed heroick Host,')
assert.equal(cantos[9].stanzas.at(-1).text.split('\n').at(-1), 'who of Achilles envy ne’er shall own.')
console.log(`PASS: Burton source, ${cantos.length} cantos, ${stanzaCount} numbered stanzas, ${verseLineCount} verse lines, ${wordCount(retainedText)} words`)
