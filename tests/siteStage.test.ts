import {afterEach, expect, it} from 'vitest'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import {stageSite} from '../scripts/stage-site.mjs'

const roots: string[] = []
afterEach(() => roots.splice(0).forEach(root => fs.rmSync(root, {recursive: true, force: true})))
function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'kathala-site-'))
  roots.push(root)
  for (const [name, body] of Object.entries({'index.html':'homepage', '_headers':'/library/*\n  Access-Control-Allow-Origin: *', 'library/index.json':'catalogue', 'library/book.pwk':'complete world', 'library/book/art/portrait.webp':'reviewed image', 'scripts/book/art-originals/portrait.png':'large authoring original', 'node_modules/private.txt':'dependency'})) {
    fs.mkdirSync(path.dirname(path.join(root,name)), {recursive:true})
    fs.writeFileSync(path.join(root,name), body)
  }
  return root
}

it('publishes the homepage, CORS policy and unchanged Library URLs without authoring originals', () => {
  const root=fixture(), output=stageSite(root)
  for(const name of ['index.html','_headers','library/index.json','library/book.pwk','library/book/art/portrait.webp']) expect(fs.readFileSync(path.join(output,name))).toEqual(fs.readFileSync(path.join(root,name)))
  expect(fs.existsSync(path.join(output,'scripts'))).toBe(false)
  expect(fs.existsSync(path.join(output,'node_modules'))).toBe(false)
})

it('removes stale generated files while preserving the authoritative source', () => {
  const root=fixture(), output=stageSite(root)
  fs.writeFileSync(path.join(output,'stale.pwk'),'retired')
  stageSite(root)
  expect(fs.existsSync(path.join(output,'stale.pwk'))).toBe(false)
  expect(fs.readFileSync(path.join(root,'library/book.pwk'),'utf8')).toBe('complete world')
})
