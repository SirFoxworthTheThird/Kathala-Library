import fs from 'node:fs'
import crypto from 'node:crypto'
const origins = {
  region:'exec-934e9d36-7009-405d-9bc6-91bc1a281128.png',
  village:'exec-d5a95ab8-8987-4689-a640-8808c03a9550.png',
  forest:'exec-1541b26d-45f8-4fa8-8cb8-59470012677d.png',
  moat:'exec-3dd85bd5-130a-41cd-9398-7fe03beaebef.png',
  shoreby:'exec-92ab02ee-77b1-46b5-8385-0f142b84c952.png',
  ship:'exec-1ab76055-377f-49fa-8588-28f53b22feff.png',
  'shoreby-house':'exec-1bf123fb-eb9b-486c-9b75-190aeef26a9a.png',
  'shoreby-abbey':'exec-91aaa198-2eb2-455e-b27b-f9a826d8b5ee.png',
  holywood:'exec-338e2b7b-b04b-486a-bbd7-bf84234bdcf5.png',
}
const lines=['','<!-- GENERATED HASHES -->','| Final file | Generation source | SHA-256 |','| --- | --- | --- |']
for(const [key,origin] of Object.entries(origins)) {
  const file=new URL(`../../library/black-arrow/maps/illustrated/${key}.png`,import.meta.url)
  const digest=crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')
  lines.push(`| \`${key}.png\` | \`${origin}\` | \`${digest}\` |`)
}
const manifest=new URL('./MAP_ARTWORK.md',import.meta.url)
const base=fs.readFileSync(manifest,'utf8').split('<!-- GENERATED HASHES -->')[0].trimEnd()
fs.writeFileSync(manifest,base+lines.join('\n')+'\n')
