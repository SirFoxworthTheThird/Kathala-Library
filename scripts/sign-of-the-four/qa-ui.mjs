import { createRequire } from 'node:module'
import { spawn } from 'node:child_process'
import { join } from 'node:path'
import { mkdirSync } from 'node:fs'

const app = process.env.KATHALA_APP_DIR
if (!app) throw Error('Set KATHALA_APP_DIR to the current application checkout before running UI QA')
const require = createRequire(join(app, 'package.json'))
const { chromium } = require('playwright')
const port = 5175
const base = `http://127.0.0.1:${port}/`
const output = new URL('./qa/', import.meta.url)
mkdirSync(output, { recursive: true })
const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', '--host', '127.0.0.1', '--port', String(port)], {
  cwd: app, env: { ...process.env, VITE_E2E: '1' }, stdio: 'ignore',
})
let browser
try {
  for (let attempt = 0; attempt < 100; attempt++) {
    try { if ((await fetch(base)).ok) break } catch {}
    if (attempt === 99) throw Error('Vite did not start')
    await new Promise(resolve => setTimeout(resolve, 300))
  }
  browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' })
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  const errors = []
  page.on('pageerror', error => errors.push(error.stack ?? String(error)))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  await page.goto(base)
  await page.waitForLoadState('networkidle')
  console.log(JSON.stringify({ title: await page.title(), url: page.url(), text: (await page.locator('body').innerText()).slice(0, 3000), errors }, null, 2))
  await page.screenshot({ path: new URL('./qa/home.png', import.meta.url).pathname.replace(/^\/(\w:)/, '$1'), fullPage: true })
  await page.getByRole('button', { name: 'Library' }).click()
  await page.waitForLoadState('networkidle')
  console.log(JSON.stringify({ stage: 'library', url: page.url(), text: (await page.locator('body').innerText()).slice(0, 4000), errors }, null, 2))
  await page.screenshot({ path: new URL('./qa/library.png', import.meta.url).pathname.replace(/^\/(\w:)/, '$1'), fullPage: true })
  const signTitle = page.getByText('The Sign of the Four', { exact: true })
  console.log(JSON.stringify({ stage: 'sign-card', count: await signTitle.count(), html: (await signTitle.first().locator('..').locator('..').evaluate(el => el.outerHTML)).slice(0, 2400) }, null, 2))
  const card = signTitle.locator('xpath=../../../..')
  console.log(JSON.stringify({ stage: 'sign-card-actions', cardCount: await card.count(), buttons: await card.getByRole('button').allTextContents(), html: (await card.evaluate(el => el.outerHTML)).slice(-1600) }, null, 2))
  await card.getByRole('button', { name: /Download/ }).click()
  await page.waitForTimeout(1500)
  console.log(JSON.stringify({ stage: 'download', url: page.url(), text: (await page.locator('body').innerText()).slice(-2600), errors }, null, 2))
  await page.screenshot({ path: new URL('./qa/download.png', import.meta.url).pathname.replace(/^\/(\w:)/, '$1'), fullPage: true })
  console.log(JSON.stringify({ stage: 'navigation', links: await page.locator('a').allTextContents(), buttons: (await page.getByRole('button').allTextContents()).slice(0, 25) }, null, 2))
  await page.getByRole('link', { name: 'Book' }).click()
  await page.waitForTimeout(700)
  console.log(JSON.stringify({ stage: 'book-menu', url: page.url(), text: (await page.locator('body').innerText()).slice(0, 2600), links: await page.locator('a').allTextContents(), errors }, null, 2))
  await page.screenshot({ path: new URL('./qa/book.png', import.meta.url).pathname.replace(/^\/(\w:)/, '$1'), fullPage: true })
  for (const name of ['Characters', 'Maps', 'Calendar', 'Items', 'Relations', 'Arc', 'Lore', 'Factions', 'Knowledge', 'Settings']) {
    await page.getByRole('link', { name, exact: true }).click()
    await page.waitForTimeout(500)
    const badImages = await page.locator('img').evaluateAll(images => images.filter(image => !image.complete || image.naturalWidth === 0).map(image => image.src))
    console.log(JSON.stringify({ stage: name, url: page.url(), text: (await page.locator('main').innerText()).slice(0, 850), badImages, errors: errors.slice(-5) }))
    await page.screenshot({ path: new URL(`./qa/${name.toLowerCase()}.png`, import.meta.url).pathname.replace(/^\/(\w:)/, '$1') })
  }
  await page.getByRole('button', { name: /Ch\.1 · Holmes at Rest/ }).click()
  await page.waitForTimeout(300)
  console.log(JSON.stringify({ stage: 'cursor-menu', text: (await page.locator('body').innerText()).slice(-2600), buttons: (await page.getByRole('button').allTextContents()).slice(-35), errors }))
  await page.screenshot({ path: new URL('./qa/cursor-menu.png', import.meta.url).pathname.replace(/^\/(\w:)/, '$1') })
  let reachedChase = false
  for (let step = 0; step < 87; step++) {
    await page.getByRole('button', { name: 'Next moment' }).click()
    const title = await page.locator('button[title*="(open timeline)"]').getAttribute('title')
    if (title?.includes('The Aurora Runs')) { reachedChase = true; break }
  }
  if (!reachedChase) throw Error('Could not reach The Aurora Runs through playback cursor')
  await page.getByRole('link', { name: 'Characters' }).click()
  await page.waitForTimeout(400)
  const before = await page.locator('main').innerText()
  console.log(JSON.stringify({ stage: 'before-tonga-reveal', masked: before.includes('The bare-footed accomplice'), tonga: before.includes('Tonga'), text: before.slice(0, 650), errors }))
  await page.screenshot({ path: new URL('./qa/before-tonga-reveal.png', import.meta.url).pathname.replace(/^\/(\w:)/, '$1') })
  await page.getByRole('button', { name: 'Next moment' }).click()
  await page.getByRole('button', { name: 'Next moment' }).click()
  await page.waitForTimeout(500)
  const after = await page.locator('main').innerText()
  console.log(JSON.stringify({ stage: 'after-tonga-reveal', masked: after.includes('The bare-footed accomplice'), tonga: after.includes('Tonga'), text: after.slice(0, 650), errors }))
  await page.screenshot({ path: new URL('./qa/after-tonga-reveal.png', import.meta.url).pathname.replace(/^\/(\w:)/, '$1') })
  if (!before.includes('The bare-footed accomplice') || before.includes('Tonga') || !after.includes('Tonga') || after.includes('The bare-footed accomplice')) throw Error('The timed Tonga name reveal is incorrect')
  if (before.includes('The old sailor') || after.includes('The old sailor')) throw Error('The old sailor still has a separate card after being revealed as Holmes')
  await page.getByRole('link', { name: 'Maps' }).click()
  await page.waitForTimeout(500)
  await page.mouse.move(900, 120)
  console.log(JSON.stringify({ stage: 'all-maps', text: (await page.locator('main').innerText()).slice(0, 1000), errors }))
  await page.screenshot({ path: new URL('./qa/all-maps.png', import.meta.url).pathname.replace(/^\/(\w:)/, '$1') })
  for (const layer of ['London and Upper Norwood', 'Baker Street Rooms', 'Pondicherry Lodge', 'The Thames']) {
    const target = page.getByText(layer, { exact: true })
    console.log(JSON.stringify({ stage: 'map-layer-control', layer, count: await target.count(), html: (await target.last().evaluate(el => el.parentElement?.outerHTML ?? '')).slice(0, 550) }))
  }
  for (const [key, layer] of [['london', 'London and Upper Norwood'], ['baker-street', 'Baker Street Rooms'], ['pondicherry', 'Pondicherry Lodge'], ['thames', 'The Thames']]) {
    await page.locator(`[data-layer-drop="sign-four-map-${key}"]`).click()
    await page.waitForTimeout(500)
    await page.mouse.move(950, 100)
    const badImages = await page.locator('img').evaluateAll(images => images.filter(image => !image.complete || image.naturalWidth === 0).map(image => image.src))
    console.log(JSON.stringify({ stage: 'map-layer', layer, heading: (await page.locator('body').innerText()).slice(0, 140), badImages, errors: errors.slice(-4) }))
    await page.screenshot({ path: new URL(`./qa/map-${key}.png`, import.meta.url).pathname.replace(/^\/(\w:)/, '$1') })
  }
  await page.locator('[data-layer-drop="sign-four-map-pondicherry"]').click()
  await page.waitForTimeout(300)
  for (const label of ['Ground floor', 'Upper floor', 'Roof']) {
    await page.getByRole('button', { name: label, exact: true }).click()
    await page.waitForTimeout(450)
    await page.mouse.move(950, 100)
    const badImages = await page.locator('img').evaluateAll(images => images.filter(image => !image.complete || image.naturalWidth === 0).map(image => image.src))
    console.log(JSON.stringify({ stage: 'lodge-level', label, selected: await page.getByRole('button', { name: label, exact: true }).getAttribute('aria-current'), text: (await page.locator('main').innerText()).slice(0, 450), badImages, errors: errors.slice(-4) }))
    await page.screenshot({ path: new URL(`./qa/lodge-${label.toLowerCase().replace(/ /g, '-')}.png`, import.meta.url).pathname.replace(/^\/(\w:)/, '$1') })
  }
  await page.locator('[data-layer-drop="sign-four-map-london"]').click()
  await page.locator('button[aria-expanded]').filter({ hasText: 'LOCATIONS' }).click()
  await page.locator('[data-sidebar-section-body="Locations"] button').filter({ hasText: 'Baker Street' }).first().click()
  await page.waitForTimeout(250)
  console.log(JSON.stringify({ stage: 'gateway-panel', text: (await page.locator('main').innerText()).slice(-950), buttons: (await page.getByRole('button').allTextContents()).slice(-20), errors }))
  for (const [name, expected] of [['Baker Street', 'Baker Street Rooms'], ['Pondicherry Lodge', 'Pondicherry Lodge'], ['The Thames', 'The Thames']]) {
    await page.locator('[data-layer-drop="sign-four-map-london"]').click()
    await page.waitForTimeout(900)
    await page.locator('[data-sidebar-section-body="Locations"] button').filter({ hasText: name }).first().click()
    await page.getByRole('button', { name: 'Open Sub-map' }).click()
    await page.waitForTimeout(900)
    const heading = (await page.locator('body').innerText()).slice(0, 100)
    console.log(JSON.stringify({ stage: 'gateway', name, heading, expected, passed: heading.includes(expected), errors: errors.slice(-4) }))
    if (!heading.includes(expected)) throw Error(`Gateway ${name} opened the wrong layer`)
  }
  await page.getByRole('button', { name: /Playback speed:/ }).click()
  await page.locator('button[title="Play story on the map"]').click()
  const observedMaps = new Set(['The Thames'])
  for (let sample = 0; sample < 35; sample++) {
    const header = (await page.locator('body').innerText()).slice(0, 145)
    for (const name of ['The Thames', 'London and Upper Norwood', 'Baker Street Rooms']) if (header.includes(`/\n${name}\n`)) observedMaps.add(name)
    await page.waitForTimeout(750)
  }
  console.log(JSON.stringify({ stage: 'playback-cross-map', observedMaps: [...observedMaps], passed: observedMaps.has('London and Upper Norwood') && observedMaps.has('Baker Street Rooms'), errors: errors.slice(-4) }))
  if (!observedMaps.has('London and Upper Norwood') || !observedMaps.has('Baker Street Rooms')) throw Error('Playback did not follow the Thames-to-Camberwell-to-Baker transition')
  await page.locator('button[title="Pause"]').click()
  const nextMoment = page.getByRole('button', { name: 'Next moment' })
  for (let step = 0; step < 87 && !(await nextMoment.isDisabled()); step++) await nextMoment.click()
  const finalCursor = await page.locator('button[title*="(open timeline)"]').getAttribute('title')
  console.log(JSON.stringify({ stage: 'final-cursor', finalCursor, errors: errors.slice(-4) }))
  await page.getByRole('link', { name: 'Book' }).click()
  await page.waitForTimeout(600)
  for (const view of ['Narrative', 'Chronological']) {
    await page.getByRole('button', { name: view, exact: true }).click()
    await page.waitForTimeout(450)
    console.log(JSON.stringify({ stage: 'book-view', view, text: (await page.locator('main').innerText()).slice(0, 330), errors: errors.slice(-4) }))
    await page.screenshot({ path: new URL(`./qa/book-${view.toLowerCase()}.png`, import.meta.url).pathname.replace(/^\/(\w:)/, '$1') })
  }
  await page.getByRole('button', { name: 'Narrative', exact: true }).click()
  await page.waitForTimeout(500)
  for (const view of ['Cards', 'Read']) {
    await page.getByRole('button', { name: view, exact: true }).click()
    await page.waitForTimeout(450)
    if (view === 'Cards') {
      await page.locator('main').getByText('Ch. 12 — Chapter XII — The Strange Story of Jonathan Small', { exact: true }).click()
      await page.waitForTimeout(450)
    }
    const text = await page.locator('main').innerText()
    console.log(JSON.stringify({ stage: 'book-view', view, lastScene: text.includes('After the Case'), text: text.slice(-350), errors: errors.slice(-4) }))
    await page.screenshot({ path: new URL(`./qa/book-${view.toLowerCase()}.png`, import.meta.url).pathname.replace(/^\/(\w:)/, '$1') })
    if (!text.includes('After the Case')) throw Error(`Book ${view} omitted the final scene`)
  }
  await page.goto(`${base}#/worlds/sign-of-the-four-world/maps`)
  await page.waitForTimeout(700)
  const locationPanelClose = page.getByRole('button', { name: 'Close location panel' })
  if (await locationPanelClose.count()) await locationPanelClose.click()
  for (const [key, label] of [['london','London and Upper Norwood'],['baker-street','Baker Street Rooms'],['pondicherry','Pondicherry Lodge'],['thames','The Thames']]) {
    await page.locator(`[data-layer-drop="sign-four-map-${key}"]`).click()
    await page.waitForTimeout(950)
    const badImages = await page.locator('img').evaluateAll(images => images.filter(image => !image.complete || image.naturalWidth === 0).map(image => image.src))
    console.log(JSON.stringify({ stage: 'final-map-markers', layer: label, badImages, errors: errors.slice(-4) }))
    await page.screenshot({ path: new URL(`./qa/final-map-${key}.png`, import.meta.url).pathname.replace(/^\/(\w:)/, '$1') })
    if (badImages.length) throw Error(`${label} has broken images at final cursor`)
  }
  await page.locator('[data-layer-drop="sign-four-map-pondicherry"]').click()
  for (const label of ['Ground floor','Upper floor','Roof']) {
    await page.getByRole('button', { name: label, exact: true }).click()
    await page.waitForTimeout(950)
    const badImages = await page.locator('img').evaluateAll(images => images.filter(image => !image.complete || image.naturalWidth === 0).map(image => image.src))
    console.log(JSON.stringify({ stage: 'final-floor-markers', label, badImages, errors: errors.slice(-4) }))
    await page.screenshot({ path: new URL(`./qa/final-floor-${label.toLowerCase().replace(/ /g, '-')}.png`, import.meta.url).pathname.replace(/^\/(\w:)/, '$1') })
    if (badImages.length) throw Error(`${label} has broken images at final cursor`)
  }
  await page.goto(`${base}#/worlds/sign-of-the-four-world/settings`)
  await page.getByRole('button', { name: 'Turn off reading mode' }).click()
  await page.goto(`${base}#/worlds/sign-of-the-four-world/maps`)
  await page.locator('[data-layer-drop="sign-four-map-baker-street"]').click()
  await page.waitForTimeout(950)
  const allBakerLocations = await page.locator('main').innerText()
  console.log(JSON.stringify({ stage: 'all-baker-markers', watsonRoom: allBakerLocations.includes('Watson’s room'), errors: errors.slice(-4) }))
  await page.screenshot({ path: new URL('./qa/all-baker-markers.png', import.meta.url).pathname.replace(/^\/(\w:)/, '$1') })
  if (!allBakerLocations.includes('Watson’s room')) throw Error('Watson’s invented room marker is absent in editor mode')
  if (errors.length) throw Error(`Browser console/page errors: ${errors.join(' | ')}`)
} finally {
  await browser?.close()
  server.kill()
}
