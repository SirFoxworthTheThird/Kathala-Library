import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

// library/ remains the authoritative source. Only the generated deployment
// surface is copied: its library/ prefix keeps every existing image URL valid.
export function stageSite(root) {
  root = path.resolve(root)
  const output = path.resolve(root, '.netlify-publish')
  if (path.dirname(output) !== root || fs.existsSync(output) && fs.lstatSync(output).isSymbolicLink()) throw Error('Unsafe site output directory')
  for (const name of ['index.html', '_headers', 'library']) if (!fs.existsSync(path.join(root, name))) throw Error(`Missing public source: ${name}`)
  fs.rmSync(output, {recursive: true, force: true})
  fs.mkdirSync(output)
  for (const name of ['index.html', '_headers', '_redirects', 'robots.txt', 'favicon.ico', 'library']) {
    const source = path.join(root, name)
    if (fs.existsSync(source)) fs.cpSync(source, path.join(output, name), {recursive: true})
  }
  return output
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log(`stage-site: ${stageSite(fileURLToPath(new URL('../', import.meta.url)))}`)
}
