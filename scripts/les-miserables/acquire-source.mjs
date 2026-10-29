import fs from 'node:fs'
import { createHash } from 'node:crypto'
import { gzipSync } from 'node:zlib'

const url = 'https://www.gutenberg.org/cache/epub/135/pg135.txt'
const expected = '6cf3b9d6fc5e6f733737425267d3af296d7f99f9b9fd1d255a3ab7689a6346ab'
const response = await fetch(url)
if (!response.ok) throw new Error(`Source download failed: ${response.status}`)
const bytes = Buffer.from(await response.arrayBuffer())
const hash = createHash('sha256').update(bytes).digest('hex')
if (hash !== expected) throw new Error(`Source revision changed: ${hash}; review before updating the pin`)
fs.mkdirSync(new URL('./source/', import.meta.url), { recursive: true })
fs.writeFileSync(new URL('./source/pg135.txt.gz', import.meta.url), gzipSync(bytes, { level: 9, mtime: 0 }))
console.log(JSON.stringify({ url, rawBytes: bytes.length, sha256: hash, compression: 'gzip; original CRLF bytes preserved' }, null, 2))
