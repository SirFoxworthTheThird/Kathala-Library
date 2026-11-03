import fs from 'node:fs'
import {createHash} from 'node:crypto'
import {createRequire} from 'node:module'
import {fileURLToPath} from 'node:url'

const app=process.env.KATHALA_APP??'F:/Projects/WorldBreaker/Kathala-ivanhoe-qa'
const require=createRequire(`${app}/package.json`)
const {chromium}=require('playwright')
const book=new URL('./',import.meta.url),base=process.env.KATHALA_QA_URL??'http://127.0.0.1:4186'
const appBuildSha256=createHash('sha256').update(fs.readFileSync(`${app}/dist/index.html`)).digest('hex')
const browser=await chromium.launch({headless:true})
const errors=[],networkFailures=[],consoleErrors=[],mapRequests=[],cancelledImageRequests=[]
try{
  const fixturePath=process.argv.includes('--packaged')?new URL('../../library/ivanhoe.pwk',import.meta.url):new URL('./authoring-review.pwk',book)
  const fixtureBytes=fs.readFileSync(fixturePath)
  const fixtureSha256=createHash('sha256').update(fixtureBytes).digest('hex')
  const fixture=JSON.parse(fixtureBytes.toString('utf8'))
  let libraryDownloadProof=null
  const page=await browser.newPage({viewport:{width:1440,height:1000}})
  page.on('pageerror',e=>errors.push(e.message))
  page.on('console',m=>{if(m.type()==='error')consoleErrors.push(m.text())})
  page.on('requestfailed',r=>{
    const failure={url:r.url(),failure:r.failure()}
    // Leaflet can retire an image while changing layers. Record that lifecycle
    // cancellation separately; the live image must still decode below. Real
    // fetch failures and non-abort blob errors remain failures.
    if(r.resourceType()==='image'&&r.url().startsWith('blob:')&&r.failure()?.errorText==='net::ERR_ABORTED')cancelledImageRequests.push(failure)
    else networkFailures.push(failure)
  })
  page.on('response',r=>{if(/Map|map|leaflet|\.css/.test(r.url()))mapRequests.push({url:r.url(),status:r.status()})})
  await page.addInitScript(()=>localStorage.setItem('kathala-tutorial',JSON.stringify({step:0,done:true})))
  if(process.argv.includes('--library-download'))await page.addInitScript(()=>{
    const nativeFetch=window.fetch.bind(window)
    window.fetch=async(...args)=>{
      const response=await nativeFetch(...args)
      if(new URL(response.url).pathname.endsWith('/library/ivanhoe.pwk')){
        const copy=response.clone()
        window.__ivanhoeDownloadProof=(async()=>{
          const bytes=await copy.arrayBuffer(),digest=await crypto.subtle.digest('SHA-256',bytes)
          return {url:response.url,status:response.status,bytes:bytes.byteLength,sha256:Array.from(new Uint8Array(digest),v=>v.toString(16).padStart(2,'0')).join('')}
        })()
      }
      return response
    }
  })

  await page.goto(base)
  if(process.argv.includes('--library-download')){
    await page.getByRole('button',{name:'Library',exact:true}).click()
    await page.getByRole('heading',{name:'Library',exact:true}).waitFor()
    await page.getByRole('textbox',{name:'Search the library by title or author',exact:true}).fill('Ivanhoe')
    const card=page.getByRole('heading',{name:'Ivanhoe',exact:true}).locator('xpath=ancestor::li[1]')
    const responsePromise=page.waitForResponse(r=>new URL(r.url()).pathname.endsWith('/library/ivanhoe.pwk'))
    await card.getByRole('button',{name:/^Download \(/}).click()
    const response=await responsePromise
    await page.waitForFunction(()=>Boolean(window.__ivanhoeDownloadProof))
    libraryDownloadProof=await page.evaluate(async()=>await window.__ivanhoeDownloadProof)
    if(response.status()!==200||libraryDownloadProof.sha256!==fixtureSha256||libraryDownloadProof.bytes!==fixtureBytes.length)throw Error('Catalogue downloaded different PWK bytes '+JSON.stringify(libraryDownloadProof))


  }else{
    await page.locator('input[type="file"][accept=".pwk,.pwb,application/json"]').setInputFiles(fileURLToPath(fixturePath))
  }
  await page.waitForURL(/worlds\/ivanhoe-world(?:\/|$)/)
  await page.getByRole('heading',{name:fixture.world.name,exact:true}).waitFor()
  await page.getByText('Reading mode is on',{exact:true}).waitFor()
  await page.waitForLoadState('networkidle')
  const body=await page.locator('body').innerText()
  const imageState=await page.locator('img').evaluateAll(imgs=>imgs.map(i=>({alt:i.alt,complete:i.complete,width:i.naturalWidth,height:i.naturalHeight})))
  await page.screenshot({path:fileURLToPath(new URL('./qa/review-import.png',book))})
  const report={status:'PARTIAL FIXTURE IMPORT ONLY; NOT FINAL EDITION QA',url:page.url(),browser:browser.version(),pageErrors:errors,images:imageState,body}
  fs.writeFileSync(new URL('./qa/review-import.json',book),JSON.stringify(report,null,2)+'\n')
  console.log(JSON.stringify({status:report.status,url:report.url,pageErrors:errors,images:imageState},null,2))
  for(let i=0;i<5;i++)await page.getByRole('button',{name:'Next moment',exact:true}).click()
  await page.goto(`${base}/#/worlds/ivanhoe-world/characters/ivanhoe-character-fangs`)
  await page.getByRole('heading',{name:'Fangs',exact:true}).waitFor()
  await page.waitForLoadState('networkidle')
  const characterBody=await page.locator('body').innerText()
  if(!characterBody.includes('Swine and pork'))throw Error('Expected Fangs’s first appearance cursor')
  const asset=JSON.parse(fs.readFileSync(new URL('./asset-manifest.json',book),'utf8')).assets.find(a=>a.id==='fangs')
  await page.waitForFunction(([w,h])=>Array.from(document.images).some(i=>i.alt==='Fangs'&&i.complete&&i.naturalWidth===w&&i.naturalHeight===h),[asset.compressed.width,asset.compressed.height])
  await page.locator('img[alt="Fangs"]').first().evaluate(i=>i.decode())
  const portraits=await page.locator('img').evaluateAll(imgs=>imgs.map(i=>({alt:i.alt,complete:i.complete,width:i.naturalWidth,height:i.naturalHeight})))
  if(!portraits.some(i=>i.alt==='Fangs'&&i.width===asset.compressed.width&&i.height===asset.compressed.height&&i.complete))throw Error('Fangs portrait did not decode in the app')
  await page.screenshot({path:fileURLToPath(new URL('./qa/review-fangs.png',book))})
  fs.writeFileSync(new URL('./qa/review-fangs.json',book),JSON.stringify({status:'PARTIAL FIRST-APPEARANCE PORTRAIT REVIEW; NOT FULL EDITION QA',pageErrors:errors,body:characterBody,images:portraits},null,2)+'\n')
  const portraitArgument=process.argv.find(arg=>arg.startsWith('--portrait='))?.slice('--portrait='.length)
  if(portraitArgument&&!/^[a-z0-9,-]+$/.test(portraitArgument))throw Error('Portrait selection requires comma-separated character keys')
  const selectedPortraits=portraitArgument?.split(',')
  const targets=fixture.characters.filter(c=>c.portraitImageId&&(!selectedPortraits||selectedPortraits.includes(c.id.replace('ivanhoe-character-','')))).map(c=>{
    const direct=fixture.events.findIndex(e=>e.involvedCharacterIds.includes(c.id))
    const identityGates=fixture.characters.filter(alias=>alias.revealedAs?.characterId===c.id).map(alias=>fixture.events.findIndex(e=>e.id===alias.revealedAs.eventId)).filter(index=>index>=0)
    const first=Math.min(...[direct,...identityGates].filter(index=>index>=0))
    return {character:c,first:Number.isFinite(first)?first:-1,appearanceKind:first===direct?'direct source appearance':Number.isFinite(first)?'explicit identity reveal, no physical cast invented':'unmet full-data record'}
  }).sort((a,b)=>a.first-b.first)
  if(selectedPortraits&&targets.length!==new Set(selectedPortraits).size)throw Error('Selected portrait missing from compiled fixture')
  let cursor=5
  const checks=[]
  for(const target of targets){
    const writerOnly=target.first<0&&process.argv.includes('--full-data-portrait')
    if(target.first<0&&!writerOnly)throw Error(`Portrait without a direct appearance or explicit identity reveal: ${target.character.id}`)
    if(writerOnly)await page.evaluate(async()=>window.__pwdb.worlds.update('ivanhoe-world',{readingMode:false}))
    else if(selectedPortraits)await selectMoment(fixture.events[target.first].title)
    else{
      while(cursor<target.first){await page.getByRole('button',{name:'Next moment',exact:true}).click();cursor++}
      while(cursor>target.first){await page.getByRole('button',{name:'Previous moment',exact:true}).click();cursor--}
    }
    await page.goto(`${base}/#/worlds/ivanhoe-world/characters/${target.character.id}`)
    await page.getByRole('heading',{name:target.character.name,exact:true}).waitFor()
    await page.waitForLoadState('networkidle')
    const cursorLabel=await page.locator('button[title$="(open timeline)"]').getAttribute('title')
    if(!writerOnly&&!cursorLabel?.includes(fixture.events[target.first].title))throw Error(`First-appearance cursor mismatch ${target.character.id}`)
    const portrait=page.getByAltText(target.character.name,{exact:true})
    await page.waitForFunction(async name=>{const i=Array.from(document.images).find(i=>i.alt===name);if(!i?.complete||!i.naturalWidth)return false;try{await i.decode();return true}catch{return false}},target.character.name)
    const decoded=await portrait.evaluate(i=>({complete:i.complete,width:i.naturalWidth,height:i.naturalHeight}))
    if(!decoded.complete||!decoded.width)throw Error(`Broken portrait ${target.character.id}`)
    const path=`qa/avatar-${target.character.id}.png`
    await page.screenshot({path:fileURLToPath(new URL(path,book)),clip:{x:50,y:48,width:850,height:105}})
    let enlargedScreenshot=null
    if(process.argv.includes('--portrait-lightbox')){
      await portrait.click()
      const dialog=page.getByRole('dialog'),enlarged=dialog.getByAltText(target.character.name,{exact:true})
      await enlarged.waitFor({state:'visible'})
      await enlarged.evaluate(i=>i.decode())
      const blob=fixture.blobs.find(blob=>blob.id===target.character.portraitImageId)
      const bytes=await enlarged.evaluate(async i=>Array.from(new Uint8Array(await(await fetch(i.src)).arrayBuffer())))
      if(createHash('sha256').update(Buffer.from(bytes)).digest('hex')!==createHash('sha256').update(blob.dataBase64?Buffer.from(blob.dataBase64,'base64'):fs.readFileSync(new URL('../../'+blob.url,import.meta.url))).digest('hex'))throw Error(`Portrait presentation bytes differ ${target.character.id}`)
      enlargedScreenshot=`qa/portrait-full-${target.character.id}.png`
      await page.screenshot({path:fileURLToPath(new URL(enlargedScreenshot,book))})
      await page.keyboard.press('Escape')
    }
    checks.push({characterId:target.character.id,name:target.character.name,eventId:writerOnly?null:fixture.events[target.first].id,appearanceKind:target.appearanceKind,writerOnly,cursorLabel,screenshot:path,enlargedScreenshot,...decoded})
  }
  fs.writeFileSync(new URL(selectedPortraits?`./qa/avatar-review-${portraitArgument}.json`:'./qa/avatar-review.json',book),JSON.stringify({status:'SCOPED PORTRAIT FIXTURE CAPTURES; MANUAL CROP REVIEW REQUIRED',fixtureSha256,selection:selectedPortraits??'all compiled portraits',pageErrors:errors,checks},null,2)+'\n')
  async function selectMoment(title){
    await page.evaluate(async()=>window.__pwdb.worlds.update('ivanhoe-world',{readingMode:false}))
    await page.goto(`${base}/#/worlds/ivanhoe-world/manuscript`)
    await page.getByTitle(title,{exact:true}).first().click()
    await page.waitForFunction(title=>Array.from(document.querySelectorAll('button')).some(b=>b.title.endsWith('(open timeline)')&&b.title.includes(title)),title)
    await page.evaluate(async()=>window.__pwdb.worlds.update('ivanhoe-world',{readingMode:true}))
    // Fixture setup temporarily enters the writer. Wait for the reader's UI
    // before checking disclosure; transaction completion precedes React effects.
    await page.getByRole('link',{name:'Book',exact:true}).waitFor()
  }
  async function captureLayer(key,label,checks){
    const layer=fixture.mapLayers.find(m=>m.id===`ivanhoe-map-${key}`)
    const representative=layer.levelGroupId?fixture.mapLayers.filter(m=>m.levelGroupId===layer.levelGroupId).sort((a,b)=>a.levelIndex-b.levelIndex)[0]:layer
    const activeTree=page.locator('button[data-map-layer][aria-current="true"]').filter({hasText:representative.name})
    const activeFloor=page.getByTitle(layer.levelLabel || 'Level',{exact:true}).and(page.locator('[aria-current="true"]'))
    if(layer.levelGroupId)await activeFloor.or(activeTree).first().waitFor()
    else await activeTree.waitFor()
    const blob=fixture.blobs.find(b=>b.id===layer.imageId)
    const expectedHash=createHash('sha256').update(blob.dataBase64?Buffer.from(blob.dataBase64,'base64'):fs.readFileSync(new URL('../../'+blob.url,import.meta.url))).digest('hex')
    await page.waitForFunction(async([w,h,hash])=>{
      const i=Array.from(document.querySelectorAll('img.leaflet-image-layer')).at(-1)
      if(!i?.complete||i.naturalWidth!==w||i.naturalHeight!==h)return false
      let bytes
      try{await i.decode();bytes=await(await fetch(i.src)).arrayBuffer()}catch{return false}
      const digest=await crypto.subtle.digest('SHA-256',bytes)
      return Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('')===hash
    },[layer.imageWidth,layer.imageHeight,expectedHash])
    const floorButton=page.getByTitle(layer.levelLabel || 'Level',{exact:true})
    for(const title of ['Add a level above','Rename this level','Delete this level'])if(await page.getByTitle(title,{exact:true}).count())throw Error(`Reader floor mutation control exposed: ${title}`)
    if(layer.levelGroupId&&await floorButton.count())await floorButton.and(page.locator('[aria-current="true"]')).waitFor()
    const close=page.getByRole('button',{name:'Close location panel',exact:true})
    if(await close.isVisible())await close.click()
    await page.waitForFunction(()=>{
      const i=Array.from(document.querySelectorAll('img.leaflet-image-layer')).at(-1)
      if(!i)return false
      const b=i.getBoundingClientRect(),key=[i.src,b.x,b.y,b.width,b.height].join('|'),s=window.__ivanhoeMapBounds
      window.__ivanhoeMapBounds={key,count:s?.key===key?s.count+1:0}
      return b.width>300&&window.__ivanhoeMapBounds.count>=3
    },undefined,{polling:100})
    await page.screenshot({path:fileURLToPath(new URL(`./qa/map-${label}.png`,book))})
    checks.push({key,label,body:await page.locator('body').innerText()})
  }
  if(process.argv.includes('--all-map-art')){
    const checks=[]
    await selectMoment(fixture.events.at(-1).title)
    await page.goto(`${base}/#/worlds/ivanhoe-world/maps`)
    for(const layer of fixture.mapLayers){
      const representative=layer.levelGroupId?fixture.mapLayers.filter(m=>m.levelGroupId===layer.levelGroupId).sort((a,b)=>a.levelIndex-b.levelIndex)[0]:layer
      await page.getByTitle(representative.name,{exact:true}).and(page.locator('button[data-map-layer]')).click()
      if(layer.levelGroupId){
        const floor=page.getByTitle(layer.levelLabel,{exact:true})
        await floor.click()
        await floor.dblclick()
        if(await page.getByRole('textbox',{name:'Rename level',exact:true}).count())throw Error('Reader double click opened a floor editor')
      }
      await captureLayer(layer.id.replace('ivanhoe-map-',''),`all-illustrated-${layer.id.replace('ivanhoe-map-','')}`,checks)
    }
    fs.writeFileSync(new URL('./qa/all-illustrated-map-review.json',book),JSON.stringify({scope:'All30illustrated layers at end-of-reading cursor, native-image/hash and read-only floor controls; manual review still required',fixtureSha256,checks,pageErrors:errors},null,2)+'\n')
  }
  if(process.argv.includes('--gateway-tour')){
    const checks=[]
    await selectMoment(fixture.events.at(-1).title)
    await page.goto(`${base}/#/worlds/ivanhoe-world/maps`)
    for(const gateway of fixture.locationMarkers.filter(marker=>marker.linkedMapLayerId)){
      const parent=fixture.mapLayers.find(layer=>layer.id===gateway.mapLayerId)
      const child=fixture.mapLayers.find(layer=>layer.id===gateway.linkedMapLayerId)
      const representative=parent.levelGroupId?fixture.mapLayers.filter(layer=>layer.levelGroupId===parent.levelGroupId).sort((a,b)=>a.levelIndex-b.levelIndex)[0]:parent
      const close=page.getByRole('button',{name:'Close location panel',exact:true})
      if(await close.isVisible())await close.click()
      await page.getByTitle(representative.name,{exact:true}).and(page.locator('button[data-map-layer]')).click()
      if(parent.levelGroupId)await page.getByTitle(parent.levelLabel,{exact:true}).click()
      const locations=page.locator('button[aria-expanded]').filter({hasText:/^Locations/i})
      if(await locations.getAttribute('aria-expanded')==='false')await locations.click()
      await page.locator('button').filter({has:page.locator(`span[title="${gateway.name}"]`)}).first().click()
      await page.getByRole('button',{name:'Open Sub-map',exact:true}).click()
      const captures=[]
      await captureLayer(child.id.replace('ivanhoe-map-',''),`gateway-tour-${gateway.id}`,captures)
      await page.getByTitle(representative.name,{exact:true}).and(page.locator('button[data-map-layer]')).click()
      if(parent.levelGroupId)await page.getByTitle(parent.levelLabel,{exact:true}).click()
      await captureLayer(parent.id.replace('ivanhoe-map-',''),`gateway-return-${gateway.id}`,captures)
      checks.push({gatewayId:gateway.id,parentId:parent.id,childId:child.id,captures})
      if(errors.length||consoleErrors.length||networkFailures.length)throw Error(`Runtime failure at gateway ${gateway.id}`)
      fs.writeFileSync(new URL('./qa/gateway-tour.json',book),JSON.stringify({fixtureSha256,scope:'All end-of-reading parent-panel submap entries and map-tree returns, image hashes and read-only floor controls; first-arrival disclosure and manual screenshot review remain separate',completed:checks.length,total:fixture.locationMarkers.filter(marker=>marker.linkedMapLayerId).length,checks,pageErrors:errors},null,2)+'\n')
      console.log(`Gateway tour ${checks.length}/26`)
    }
  }
  const coordinateSelection=process.argv.find(arg=>arg.startsWith('--coordinate-tour='))?.slice('--coordinate-tour='.length).split(',')
  if(process.argv.includes('--coordinate-tour')||coordinateSelection){
    const checks=[]
    const tourMarkers=fixture.locationMarkers.filter(m=>m.mapLayerId&&(!coordinateSelection||coordinateSelection.includes(m.id.replace('ivanhoe-place-',''))))
    await selectMoment(fixture.events.at(-1).title)
    await page.goto(`${base}/#/worlds/ivanhoe-world/maps`)
    await page.getByTitle('Show character pins',{exact:true}).click()
    await page.getByTitle('Show character movement paths within the active scene',{exact:true}).click()
    for(const layer of fixture.mapLayers.filter(layer=>tourMarkers.some(m=>m.mapLayerId===layer.id))){
      const close=page.getByRole('button',{name:'Close location panel',exact:true})
      if(await close.isVisible())await close.click()
      const representative=layer.levelGroupId?fixture.mapLayers.filter(m=>m.levelGroupId===layer.levelGroupId).sort((a,b)=>a.levelIndex-b.levelIndex)[0]:layer
      await page.getByTitle(representative.name,{exact:true}).and(page.locator('button[data-map-layer]')).click()
      if(layer.levelGroupId)await page.getByTitle(layer.levelLabel,{exact:true}).click()
      await captureLayer(layer.id.replace('ivanhoe-map-',''),`coordinate-overview-${layer.id.replace('ivanhoe-map-','')}`,[])
      await page.locator('.leaflet-control-zoom-in').click()
      const locations=page.locator('button[aria-expanded]').filter({hasText:/^Locations/i})
      if(await locations.getAttribute('aria-expanded')==='false')await locations.click()
      for(const marker of tourMarkers.filter(m=>m.mapLayerId===layer.id)){
        // This follows the actual sidebar's focus action; no coordinates or
        // Leaflet internal state are injected into the running application.
        await page.locator('button').filter({has:page.locator('span[title]').filter({hasText:marker.name})}).filter({has:page.locator(`span[title="${marker.name}"]`)}).first().click()
        const panel=page.locator('[data-location-detail-panel]')
        await panel.waitFor()
        await panel.getByText(marker.name,{exact:true}).first().waitFor()
        await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))))
        await page.waitForFunction(()=>Array.from(document.querySelectorAll('img.leaflet-image-layer')).every(i=>i.complete&&i.naturalWidth>0))
        await page.waitForFunction(()=>{
          const image=document.querySelector('img.leaflet-image-layer'),viewport=document.querySelector('.leaflet-container')
          if(!image||!viewport)return false
          const a=image.getBoundingClientRect(),b=viewport.getBoundingClientRect(),key=[a.x,a.y,a.width,a.height,b.x,b.y,b.width,b.height].join('|'),old=window.__ivanhoeCoordinateBounds
          window.__ivanhoeCoordinateBounds={key,count:old?.key===key?old.count+1:0}
          return window.__ivanhoeCoordinateBounds.count>=3
        },undefined,{polling:100})
        const presentation=await page.evaluate(([x,y,w,h])=>{
          const image=document.querySelector('img.leaflet-image-layer').getBoundingClientRect(),v=document.querySelector('.leaflet-container').getBoundingClientRect(),panel=document.querySelector('[data-location-detail-panel]').getBoundingClientRect()
          return {point:{x:image.left+x/w*image.width,y:image.top+(1-y/h)*image.height},viewport:{left:v.left,top:v.top,right:v.right,bottom:v.bottom},panelLeft:panel.left}
        },[marker.x,marker.y,layer.imageWidth,layer.imageHeight])
        const {point,viewport}=presentation
        if(point.x<viewport.left+6||point.x>Math.min(viewport.right,presentation.panelLeft)-6||point.y<viewport.top+6||point.y>viewport.bottom-6)throw Error(`Selected coordinate obscured or clipped: ${marker.id} ${JSON.stringify(presentation)}`)
        const screenshot=`qa/coordinate-${marker.id.replace('ivanhoe-location-','')}.png`
        await page.screenshot({path:fileURLToPath(new URL(screenshot,book))})
        checks.push({markerId:marker.id,name:marker.name,mapLayerId:layer.id,x:marker.x,y:marker.y,levelLabel:layer.levelLabel??null,screenshot,presentation})
        if(errors.length||consoleErrors.length||networkFailures.length)throw Error(`Runtime failure at coordinate ${marker.id}`)
        if(checks.length%10===0)console.log(`Coordinate tour ${checks.length}/${tourMarkers.length}`)
        fs.writeFileSync(new URL(coordinateSelection?'./qa/coordinate-tour-selected.json':'./qa/coordinate-tour.json',book),JSON.stringify({fixtureSha256,scope:'Actual app sidebar focus, selected-point visibility and enlarged map captures; manual coordinate/source approval required',completed:checks.length,total:tourMarkers.length,checks,pageErrors:errors},null,2)+'\n')
      }
    }
  }
  if(process.argv.includes('--continuous')){
    const playback=[],captured=new Set()
    await selectMoment(fixture.events[0].title)
    await page.goto(`${base}/#/worlds/ivanhoe-world/maps`)
    for(let index=0;index<fixture.events.length;index++){
      const event=fixture.events[index],chapter=fixture.chapters.find(chapter=>chapter.id===event.chapterId)
      await page.waitForFunction(([number,title])=>Array.from(document.querySelectorAll('button')).some(button=>button.title.startsWith(`Ch.${number} ·`)&&button.title.includes(title)&&button.title.endsWith('(open timeline)')),[chapter.number,event.title])
      await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))))
      await page.waitForTimeout(100)
      await page.waitForFunction(()=>Array.from(document.querySelectorAll('img.leaflet-image-layer')).every(image=>image.complete&&image.naturalWidth>0))
      const activeLayers=await page.locator('button[data-map-layer][aria-current="true"]').allTextContents()
      const visibleImages=await page.locator('img.leaflet-image-layer').evaluateAll(images=>images.map(image=>({complete:image.complete,width:image.naturalWidth,height:image.naturalHeight})))
      if(visibleImages.some(image=>image.complete&&!image.width))throw Error(`Broken map in continuous playback ${event.id}`)
      const layerKey=activeLayers.join('|')
      if(layerKey&&!captured.has(layerKey)){
        captured.add(layerKey)
        await page.screenshot({path:fileURLToPath(new URL(`./qa/playback-map-${String(index).padStart(3,'0')}.png`,book))})
      }
      playback.push({index,eventId:event.id,title:event.title,chapter:chapter.number,activeLayers,visibleImages})
      if(errors.length||consoleErrors.length||networkFailures.length)throw Error(`Runtime failure during continuous playback at ${event.id}`)
      if(index%25===0||index===fixture.events.length-1){
        fs.writeFileSync(new URL('./qa/continuous-playback.json',book),JSON.stringify({scope:'Actual Maps UI forward traversal; manual source/map/art review and packaged-byte identity are separate evidence',fixtureSha256,appBuildSha256,completed:playback.length,total:fixture.events.length,complete:playback.length===fixture.events.length,playback,pageErrors:errors,cancelledImageRequests,networkFailures,consoleErrors},null,2)+'\n')
        console.log(`Continuous fixture playback ${playback.length}/${fixture.events.length}`)
      }
      if(index<fixture.events.length-1)await page.getByRole('button',{name:'Next moment',exact:true}).click()
    }
  }
  const itemArtArgument=process.argv.find(arg=>arg.startsWith('--item-art='))?.slice('--item-art='.length)
  if(itemArtArgument){
    if(!/^[a-z0-9,-]+$/.test(itemArtArgument))throw Error('Item art requires comma-separated item keys')
    const itemArtChecks=[]
    for(const key of itemArtArgument.split(',')){
      const item=fixture.items.find(item=>item.id===`ivanhoe-item-${key}`)
      if(!item?.imageId)throw Error(`Missing selected item image ${key}`)
      const first=fixture.events.find(event=>event.involvedItemIds.includes(item.id))
      if(!first)throw Error(`Missing source appearance ${key}`)
      await selectMoment(first.title)
      await page.goto(`${base}/#/worlds/ivanhoe-world/items`)
      await page.getByRole('link').filter({has:page.getByText(item.name,{exact:true})}).getByText(item.name,{exact:true}).click()
      await page.waitForFunction(id=>location.hash.endsWith('/items/'+id),item.id)
      await page.getByRole('heading',{name:item.name,exact:true}).waitFor()
      if((await page.locator('body').innerText()).includes('Open a lore page and use the link button'))throw Error('Authoring instructions leaked into reading-mode item view')
      const picture=page.getByAltText(item.name,{exact:true})
      await picture.waitFor({state:'visible'})
      await picture.evaluate(i=>i.decode())
      await page.screenshot({path:fileURLToPath(new URL(`./qa/item-${key}.png`,book))})
      await picture.click()
      const lightbox=page.getByRole('dialog'),enlarged=lightbox.getByAltText(item.name,{exact:true})
      await enlarged.waitFor({state:'visible'})
      await enlarged.evaluate(i=>i.decode())
      const decoded=await enlarged.evaluate(i=>({width:i.naturalWidth,height:i.naturalHeight}))
      const blob=fixture.blobs.find(blob=>blob.id===item.imageId)
      const bytes=await enlarged.evaluate(async i=>Array.from(new Uint8Array(await(await fetch(i.src)).arrayBuffer())))
      if(createHash('sha256').update(Buffer.from(bytes)).digest('hex')!==createHash('sha256').update(blob.dataBase64?Buffer.from(blob.dataBase64,'base64'):fs.readFileSync(new URL('../../'+blob.url,import.meta.url))).digest('hex'))throw Error(`Item presentation bytes differ ${key}`)
      await page.screenshot({path:fileURLToPath(new URL(`./qa/item-${key}-lightbox.png`,book))})
      itemArtChecks.push({key,eventId:first.id,...decoded})
      await page.keyboard.press('Escape')
    }
    fs.writeFileSync(new URL(`./qa/item-art-${itemArtArgument}.json`,book),JSON.stringify({scope:'Selected fixture item image/thumbnail/lightbox only; final coverage and custody QA open',fixtureSha256,itemArtChecks,pageErrors:errors},null,2)+'\n')
  }
  const placeArtArgument=process.argv.find(arg=>arg.startsWith('--place-art='))?.slice('--place-art='.length)
  if(placeArtArgument){
    if(!/^[a-z0-9,-]+$/.test(placeArtArgument))throw Error('Place art requires comma-separated location keys')
    const placeArtChecks=[]
    await selectMoment(fixture.events.at(-1).title)
    await page.goto(`${base}/#/worlds/ivanhoe-world/maps`)
    for(const key of placeArtArgument.split(',')){
      const place=fixture.locationMarkers.find(p=>p.id===`ivanhoe-place-${key}`)
      if(!place?.imageId)throw Error(`Missing selected place image ${key}`)
      const layer=fixture.mapLayers.find(m=>m.id===place.mapLayerId)
      const close=page.getByRole('button',{name:'Close location panel',exact:true})
      if(await close.isVisible())await close.click()
      if(layer){
        const representative=layer.levelGroupId?fixture.mapLayers.filter(m=>m.levelGroupId===layer.levelGroupId).sort((a,b)=>a.levelIndex-b.levelIndex)[0]:layer
        await page.getByTitle(representative.name,{exact:true}).and(page.locator('button[data-map-layer]')).click()
        if(layer.levelGroupId)await page.getByTitle(layer.levelLabel,{exact:true}).click()
        const activeTree=page.locator('button[data-map-layer][aria-current="true"]').filter({hasText:representative.name})
        const activeFloor=layer.levelGroupId?page.getByTitle(layer.levelLabel,{exact:true}).and(page.locator('[aria-current="true"]')):null
        await (activeFloor?activeFloor.or(activeTree).first():activeTree).waitFor()
      }
      const sectionName=layer?'Locations':'Not on a map'
      const row=page.locator(`[data-sidebar-section-body="${sectionName}"]`).getByRole('button',{name:place.name,exact:true})
      const section=page.getByRole('button',{name:layer?/^Locations\s+\d+$/:/^Not on a map\s+\d+$/i})
      if(await section.getAttribute('aria-expanded')!=='true')await section.click()
      await row.click()
      await page.getByRole('button',{name:'Close location panel',exact:true}).waitFor()
      if(process.argv.includes('--floor-clearance')){
        const floor=page.locator('[data-map-floor-switcher]'),panel=page.locator('[data-location-detail-panel]')
        if(await floor.isVisible()){
          const f=await floor.boundingBox(),p=await panel.boundingBox()
          if(!f||!p||f.x+f.width>p.x)throw Error(`Floor controls overlap location text: ${key}`)
        }
      }
      const picture=page.getByAltText(place.name,{exact:true})
      await picture.waitFor({state:'visible'})
      await picture.evaluate(i=>i.decode())
      await page.screenshot({path:fileURLToPath(new URL(`./qa/place-${key}.png`,book))})
      await picture.click()
      const enlarged=page.getByRole('dialog').getByAltText(place.name,{exact:true})
      await enlarged.waitFor({state:'visible'})
      await enlarged.evaluate(i=>i.decode())
      const decoded=await enlarged.evaluate(i=>({width:i.naturalWidth,height:i.naturalHeight}))
      const bytes=await enlarged.evaluate(async i=>Array.from(new Uint8Array(await(await fetch(i.src)).arrayBuffer())))
      const blob=fixture.blobs.find(b=>b.id===place.imageId)
      if(createHash('sha256').update(Buffer.from(bytes)).digest('hex')!==createHash('sha256').update(blob.dataBase64?Buffer.from(blob.dataBase64,'base64'):fs.readFileSync(new URL('../../'+blob.url,import.meta.url))).digest('hex'))throw Error(`Place presentation bytes differ ${key}`)
      await page.screenshot({path:fileURLToPath(new URL(`./qa/place-${key}-lightbox.png`,book))})
      placeArtChecks.push({key,mapLayerId:layer?.id??null,unmapped:!layer,...decoded})
      await page.keyboard.press('Escape')
    }
    if(process.argv.includes('--floor-clearance')){
      await page.screenshot({path:fileURLToPath(new URL('./qa/floor-clearance-desktop.png',book))})
      await page.setViewportSize({width:390,height:844})
      const drawerClose=page.getByRole('button',{name:'Close map panels',exact:true})
      await drawerClose.evaluate(async button=>{await Promise.all(button.parentElement.parentElement.getAnimations().map(a=>a.finished.catch(()=>{})))})
      const drawerButtonBox=await drawerClose.boundingBox()
      if(drawerButtonBox&&drawerButtonBox.x>=0)await drawerClose.click()
      await page.waitForFunction(()=>{
        const button=document.querySelector('[aria-label="Close map panels"]')
        return !button||button.getBoundingClientRect().right<=0
      })
      await page.locator('[data-map-floor-switcher]').waitFor({state:'hidden'})
      await page.locator('[data-location-detail-panel]').waitFor({state:'visible'})
      await page.screenshot({path:fileURLToPath(new URL('./qa/floor-clearance-mobile.png',book))})
      fs.writeFileSync(new URL('./qa/floor-clearance.json',book),JSON.stringify({fixtureSha256,desktop:'visible floor switcher clears the panel horizontally',mobile:'floor switcher hidden while location panel open',pageErrors:errors},null,2)+'\n')
    }
    fs.writeFileSync(new URL(`./qa/place-art-${placeArtArgument}.json`,book),JSON.stringify({scope:'Selected location banner/lightbox at end cursor; manual crop and first-disclosure review separate',fixtureSha256,placeArtChecks,pageErrors:errors},null,2)+'\n')
  }
  if(process.argv.includes('--retrospect')){
    const observations=[],notice=page.getByRole('status').filter({hasText:'Retrospective scene'})
    await selectMoment('A guarded patient')
    await page.goto(`${base}/#/worlds/ivanhoe-world/maps`)
    await page.getByRole('button',{name:'Map tools',exact:true}).waitFor()
    await page.locator('.leaflet-image-layer').first().waitFor()
    for(const [phase,visible] of [['earlier',true],['resumed',false],['rewound',true]]){
      if(phase==='resumed')await page.getByRole('button',{name:'Next moment',exact:true}).click()
      if(phase==='rewound')await page.getByRole('button',{name:'Previous moment',exact:true}).click()
      if(visible)await notice.waitFor()
      else await notice.waitFor({state:'detached'})
      const screenshot=`qa/retrospect-${phase}.png`
      await page.screenshot({path:fileURLToPath(new URL(screenshot,book))})
      observations.push({phase,visible,screenshot})
    }
    await page.setViewportSize({width:360,height:800})
    await notice.waitFor()
    const bounds=await notice.boundingBox()
    if(!bounds||bounds.x<0||bounds.x+bounds.width>360.5)throw Error('Retrospective context overflows mobile viewport')
    await page.screenshot({path:fileURLToPath(new URL('./qa/retrospect-mobile.png',book))})
    await page.setViewportSize({width:1440,height:1000})
    fs.writeFileSync(new URL('./qa/retrospect-ui-review.json',book),JSON.stringify({scope:'Explicit Chapter XXVIII retrospect/resumption and rewind, desktop/maps and mobile context; not final all-source QA',observations,mobileBounds:bounds,pageErrors:errors},null,2)+'\n')
  }
  if(process.argv.includes('--cord-custody')){
    const observations=[]
    async function cordState(phase,holder){
      await page.locator('ol > li').last().getByText(`carried by ${holder}`,{exact:false}).waitFor()
      const screenshot=`qa/cord-custody-${phase}.png`
      await page.screenshot({path:fileURLToPath(new URL(screenshot,book))})
      observations.push({phase,holder,screenshot})
    }
    await selectMoment('A brother at the portal')
    await page.goto(`${base}/#/worlds/ivanhoe-world/items/ivanhoe-item-friar-cord`)
    await page.getByRole('heading',{name:'The friar’s cord',exact:true}).waitFor()
    await cordState('portal','Wamba')
    await selectMoment('The rescue beyond')
    await page.goto(`${base}/#/worlds/ivanhoe-world/items/ivanhoe-item-friar-cord`)
    await cordState('before','Wamba')
    await page.getByRole('button',{name:'Next moment',exact:true}).click()
    await cordState('exchanged','Cedric')
    await page.getByRole('button',{name:'Previous moment',exact:true}).click()
    await cordState('rewound','Wamba')
    fs.writeFileSync(new URL('./qa/cord-custody-ui-review.json',book),JSON.stringify({scope:'Source-established cord possession at portal and before/after/rewind exchange only',fixtureSha256,observations,pageErrors:errors},null,2)+'\n')
  }
  if(process.argv.includes('--item-metadata')){
    const observations=[]
    await selectMoment('The rescue beyond')
    await page.goto(`${base}/#/worlds/ivanhoe-world/items/ivanhoe-item-frock`)
    await page.getByRole('heading',{name:'The friar’s grey frock',exact:true}).waitFor()
    async function frockState(phase,holder){
      await page.locator('ol > li').last().getByText(`carried by ${holder}`,{exact:false}).waitFor()
      const body=await page.locator('body').innerText()
      if(body.includes('subsequently worn by Cedric'))throw Error('Frock metadata preannounces a future wearer')
      const linkedNote=page.getByRole('button').filter({has:page.getByText('An exchange of clothes',{exact:true})})
      if(phase==='exchanged')await linkedNote.waitFor()
      else if(await linkedNote.count())throw Error('Clothes-exchange note leaked before exchange')
      const screenshot=`qa/frock-metadata-${phase}.png`
      await page.screenshot({path:fileURLToPath(new URL(screenshot,book))})
      observations.push({phase,holder,screenshot})
    }
    await frockState('before','Wamba')
    await page.getByRole('button',{name:'Next moment',exact:true}).click()
    await frockState('exchanged','Cedric')
    await page.getByRole('button',{name:'Previous moment',exact:true}).click()
    await frockState('rewound','Wamba')
    fs.writeFileSync(new URL('./qa/item-metadata-ui-review.json',book),JSON.stringify({scope:'Frock description, custody and linked note immediately before/after/rewind; not all-item certification',observations,pageErrors:errors},null,2)+'\n')
  }
  if(process.argv.includes('--household-continuity')){
    const observations=[]
    for(const [key,moment,stateParagraph,location] of [
      ['edwina','Seven steps to the chamber',7,'Rowena’s chamber'],
      ['edwina','Questions about Ivanhoe',12,'Rowena’s chamber'],
      ['edwina','The sleeping cup',17,'Rowena’s chamber'],
      ['edwina','The southern cells',21,'Unknown'],
      ['gurth','Outside the postern',49,'Unknown'],
      ['gurth','Questions at the wicket',49,'Unknown'],
      ['gurth','The narrow bridge',57,'The narrow crossing'],
    ]){
      await selectMoment(moment)
      await page.goto(`${base}/#/worlds/ivanhoe-world/characters/ivanhoe-character-${key}`)
      await page.getByRole('tab',{name:'Current State',exact:true}).click()
      const state=fixture.characterSnapshots.find(s=>s.characterId===`ivanhoe-character-${key}`&&s.eventId===`ivanhoe-source-9-p${stateParagraph}`)
      if(!state)throw Error(`Missing household state ${key}:${stateParagraph}`)
      await page.getByText(state.statusNotes,{exact:true}).first().waitFor()
      await page.getByText(location,{exact:true}).first().waitFor()
      const screenshot=`qa/household-${key}-${stateParagraph}-${moment==='Questions at the wicket'?'waiting':'direct'}.png`
      await page.screenshot({path:fileURLToPath(new URL(screenshot,book))})
      observations.push({key,moment,inherited:moment==='Questions at the wicket',stateEventId:state.eventId,location,screenshot})
    }
    fs.writeFileSync(new URL('./qa/household-continuity-ui-review.json',book),JSON.stringify({fixtureSha256,scope:'Selected waiting-maid movements and Gurth departure/inheritance/return; not exhaustive household QA',observations,pageErrors:errors},null,2)+'\n')
  }
  if(process.argv.includes('--cover')){
    await selectMoment(fixture.events[0].title)
    await page.goto(`${base}/#/worlds/ivanhoe-world`)
    const alt=`${fixture.world.name} cover`,picture=page.getByAltText(alt,{exact:true})
    await picture.waitFor()
    await picture.evaluate(image=>image.decode())
    await page.screenshot({path:fileURLToPath(new URL('./qa/cover-opening-thumbnail.png',book))})
    await picture.click()
    const enlarged=page.getByRole('dialog').getByAltText(alt,{exact:true})
    await enlarged.waitFor()
    await enlarged.evaluate(image=>image.decode())
    const blob=fixture.blobs.find(b=>b.id===fixture.world.coverImageId)
    const displayed=await enlarged.evaluate(async image=>Array.from(new Uint8Array(await(await fetch(image.src)).arrayBuffer())))
    const imageSha256=createHash('sha256').update(Buffer.from(displayed)).digest('hex')
    if(imageSha256!==createHash('sha256').update(blob.dataBase64?Buffer.from(blob.dataBase64,'base64'):fs.readFileSync(new URL('../../'+blob.url,import.meta.url))).digest('hex'))throw Error('Cover bytes differ in actual presentation')
    await page.screenshot({path:fileURLToPath(new URL('./qa/cover-opening-lightbox.png',book))})
    await page.keyboard.press('Escape')
    fs.writeFileSync(new URL('./qa/cover-opening-review.json',book),JSON.stringify({fixtureSha256,appBuildSha256,imageSha256,eventId:fixture.events[0].id,scope:'Opening-cursor cover thumbnail and lightbox with repository asset-byte equality; manual subject review separate',screenshots:['qa/cover-opening-thumbnail.png','qa/cover-opening-lightbox.png'],pageErrors:errors},null,2)+'\n')
  }
  if(process.argv.includes('--all-pages')){
    await selectMoment(fixture.events.at(-1).title)
    const observations=[]
    for(const route of ['', 'maps','characters','items','relationships','manuscript','calendar','structure','arc','factions','knowledge','lore','settings']){
      await page.goto(`${base}/#/worlds/ivanhoe-world${route?'/'+route:''}`)
      await page.waitForLoadState('networkidle')
      await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'Book',exact:true}).waitFor()
      await page.waitForFunction(()=>{
        const main=document.querySelector('main')
        return main&&main.innerText.trim().length>80&&!/^Loading/.test(main.innerText.trim())
      })
      if(route===''||route==='structure'){
        await page.getByText('maps you have reached',{exact:true}).waitFor()
        const expectedMaps=fixture.mapLayers.filter(layer=>!layer.levelGroupId||layer.levelIndex===Math.min(...fixture.mapLayers.filter(other=>other.levelGroupId===layer.levelGroupId).map(other=>other.levelIndex))).length
        await page.getByRole('main').getByRole('button',{name:new RegExp(`${expectedMaps}.*Maps.*maps you have reached`,'s')}).waitFor()
      }
      if(route==='characters'){
        await page.getByRole('main').getByRole('link',{name:/Brian de Bois-Guilbert.*deceased/s}).waitFor()
        const latest=fixture.characterSnapshots.filter(state=>state.characterId==='ivanhoe-character-blackknight').at(-1)
        const place=fixture.locationMarkers.find(marker=>marker.id===latest.currentLocationMarkerId)
        const richard=page.getByRole('main').getByRole('link',{name:/^Richard of England\b/})
        await richard.getByText(place.name,{exact:true}).waitFor()
        if((await richard.innerText()).includes('No state recorded'))throw Error('Canonical roster identity lost its earlier-name state')
      }
      await page.waitForTimeout(300)
      const body=await page.getByRole('main').innerText()
      if(/Something went wrong|Error loading|Application error/.test(body))throw Error(`Failed application page ${route}`)
      const screenshot=`qa/page-${route||'dashboard'}.png`
      await page.screenshot({path:fileURLToPath(new URL(screenshot,book))})
      const actualRoute=new URL(page.url()).hash.split('/')[3]||'dashboard'
      if(route==='structure'&&actualRoute!=='dashboard')throw Error('Reader reached the writing-only Structure page')
      observations.push({route:route||'dashboard',actualRoute,reader:true,screenshot,body})
    }
    await page.evaluate(async()=>window.__pwdb.worlds.update('ivanhoe-world',{readingMode:false}))
    for(const route of ['structure','']){
      await page.goto(`${base}/#/worlds/ivanhoe-world${route?'/'+route:''}`)
      await page.waitForLoadState('networkidle')
      await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'Manuscript',exact:true}).waitFor()
      if(route==='structure')await page.getByRole('heading',{name:'Structure',exact:true}).waitFor()
      await page.waitForTimeout(600)
      const screenshot=`qa/page-writer-${route||'dashboard'}.png`
      await page.screenshot({path:fileURLToPath(new URL(screenshot,book))})
      observations.push({route:route||'dashboard',reader:false,screenshot,body:await page.getByRole('main').innerText()})
    }
    await page.evaluate(async()=>window.__pwdb.worlds.update('ivanhoe-world',{readingMode:true}))
    fs.writeFileSync(new URL('./qa/all-pages-review.json',book),JSON.stringify({fixtureSha256,appBuildSha256,scope:'Thirteen reader routes including the Structure guard; explicit full-data Structure and dashboard review; manual presentation review separate',observations,pageErrors:errors},null,2)+'\n')
  }
  if(process.argv.includes('--reported-item-history')){
    const observations=[]
    for(const fact of fixture.knowledgeFacts.filter(f=>f.tags.some(t=>t.startsWith('offstage-inventory-removed:')))){
      for(const tag of fact.tags.filter(t=>t.startsWith('offstage-inventory-removed:'))){
        const [,itemId]=tag.slice('offstage-inventory-removed:'.length).split(':')
        const index=fixture.events.findIndex(e=>e.id===fact.readerLearnsAtEventId)
        const item=fixture.items.find(i=>i.id===itemId)
        await selectMoment(fixture.events[index-1].title)
        await page.goto(`${base}/#/worlds/ivanhoe-world/items/${itemId}`)
        await page.getByRole('heading',{name:item.name,exact:true}).waitFor()
        await page.getByText(fact.description,{exact:true}).waitFor({state:'hidden'})
        for(const phase of ['report','rewind']){
          await page.getByRole('button',{name:phase==='report'?'Next moment':'Previous moment',exact:true}).click()
          const report=page.locator('ol').getByText(fact.description,{exact:false})
          await report.waitFor({state:phase==='report'?'visible':'hidden'})
          if(phase==='report')await report.scrollIntoViewIfNeeded()
          const screenshot=`qa/item-report-${itemId.replace('ivanhoe-item-','')}-${phase}.png`
          await page.screenshot({path:fileURLToPath(new URL(screenshot,book))})
          observations.push({itemId,eventId:fact.readerLearnsAtEventId,phase,screenshot,body:await page.locator('body').innerText()})
        }
      }
    }
    fs.writeFileSync(new URL('./qa/reported-item-history.json',book),JSON.stringify({fixtureSha256,scope:'All five reported relinquishments in item history, forward and rewind without absent-character snapshots',observations,pageErrors:errors},null,2)+'\n')
  }
  if(process.argv.includes('--item-custody-tour')){
    const evidence=JSON.parse(fs.readFileSync(new URL('./qa/inventory-source-evidence.json',book),'utf8')).evidence
    const observations=[]
    for(const action of evidence){
      const event=fixture.events.find(e=>e.id===action.eventId)
      await selectMoment(event.title)
      for(const effect of action.effects){
        const item=fixture.items.find(i=>i.id===`ivanhoe-item-${effect.item}`)
        await page.goto(`${base}/#/worlds/ivanhoe-world/items/${item.id}`)
        await page.getByRole('heading',{name:item.name,exact:true}).waitFor()
        const picture=page.getByAltText(item.name,{exact:true})
        await picture.evaluate(image=>image.decode())
        if(effect.condition)await page.getByText(effect.condition,{exact:false}).first().waitFor()
        const history=page.locator('ol').last()
        if(await history.count())await history.locator('li').last().scrollIntoViewIfNeeded()
        const screenshot=`qa/custody-${String(observations.length).padStart(3,'0')}-${effect.item}.png`
        await page.screenshot({path:fileURLToPath(new URL(screenshot,book))})
        observations.push({eventId:event.id,source:action.source,itemId:item.id,effect,screenshot,body:await page.locator('body').innerText()})
      }
      fs.writeFileSync(new URL('./qa/item-custody-tour.json',book),JSON.stringify({fixtureSha256,scope:'Every compiled item action opened in actual reading-mode item view; manual source comparison and final artifact approval separate',completed:observations.length,complete:false,observations,pageErrors:errors},null,2)+'\n')
      console.log(`Item custody observations ${observations.length}/${fixture.itemSnapshots.length}`)
    }
    if(observations.length!==fixture.itemSnapshots.length)throw Error('Item custody tour did not cover every compiled state')
    fs.writeFileSync(new URL('./qa/item-custody-tour.json',book),JSON.stringify({fixtureSha256,scope:'Every compiled item action opened in actual reading-mode item view; manual source comparison and final artifact approval separate',completed:observations.length,complete:true,observations,pageErrors:errors},null,2)+'\n')
  }
  if(process.argv.includes('--calendar-clock')){
    const observations=[]
    const first=fixture.events.find(e=>e.id==='ivanhoe-source-4-p0')
    const last=fixture.events.at(-1)
    for(const [label,event] of [['opening',first],['complete',last]]){
      await selectMoment(event.title)
      await page.goto(`${base}/#/worlds/ivanhoe-world/calendar`)
      await page.getByRole('heading',{name:'Calendar',exact:true}).waitFor()
      await page.getByRole('heading',{name:'June 1194 AD',exact:true}).waitFor()
      const chips=page.locator('button[draggable]')
      const titles=await chips.evaluateAll(nodes=>nodes.map(node=>({title:node.title,draggable:node.draggable})))
      if(titles.some(row=>row.draggable))throw Error('Reader can drag calendar scenes')
      const expected=label==='complete'?fixture.events:fixture.events.slice(0,fixture.events.indexOf(first)+1)
      if(titles.length!==expected.length)throw Error(`Calendar has ${titles.length} chips, expected ${expected.length}`)
      const screenshot=`qa/calendar-${label}.png`
      await page.screenshot({path:fileURLToPath(new URL(screenshot,book))})
      observations.push({label,eventId:event.id,visible:titles.length,screenshot,titles})
    }
    const recall=fixture.events.find(e=>e.id==='ivanhoe-source-31-p12')
    const chip=page.getByTitle(`${recall.title} (flashback)`,{exact:true})
    await chip.scrollIntoViewIfNeeded()
    await chip.click()
    await page.waitForURL(/manuscript/)
    await page.getByRole('heading',{name:'Calendar',exact:true}).waitFor({state:'hidden'})
    await page.locator('#timeline-panel').waitFor({state:'visible'})
    if(!page.url().endsWith('/'+recall.chapterId))throw Error('Calendar did not open the recollection chapter')
    await page.waitForFunction(id=>{
      const root=document.querySelector('[data-book-scroller]'),chapter=root?.querySelector(`[data-chapter-id="${id}"]`)
      if(!root||!chapter)return false
      const r=root.getBoundingClientRect(),c=chapter.getBoundingClientRect()
      return c.top>=r.top-30&&c.top<r.top+160
    },recall.chapterId)
    await page.getByTitle(recall.title,{exact:true}).first().waitFor()
    // Calendar browsing opens the reached chapter without moving the reader's
    // bookmark. Only explicit playback controls advance or rewind that cursor.
    await page.waitForFunction(title=>Array.from(document.querySelectorAll('button')).some(b=>b.title.endsWith('(open timeline)')&&b.title.includes(title)),last.title)
    await page.screenshot({path:fileURLToPath(new URL('./qa/calendar-recollection-open.png',book))})
    observations.push({label:'recollection-open',eventId:recall.id,screenshot:'qa/calendar-recollection-open.png'})
    fs.writeFileSync(new URL('./qa/calendar-clock-review.json',book),JSON.stringify({fixtureSha256,scope:'Actual reader calendar opening and full-cursor counts, date presentation, non-draggable chips and opening a retrospective moment',observations,pageErrors:errors},null,2)+'\n')
  }
  if(process.argv.includes('--departure-reports')){
    const observations=[]
    async function observe(eventId,key,label,expected){
      const event=fixture.events.find(e=>e.id===eventId)
      if(!event)throw Error(`Unknown source event ${eventId}`)
      await selectMoment(event.title)
      await page.goto(`${base}/#/worlds/ivanhoe-world/characters/ivanhoe-character-${key}`)
      await page.getByRole('tab',{name:'Current State',exact:true}).click()
      const panel=page.getByRole('tabpanel')
      const historicalAliases=panel.locator('section[aria-label^="As "]')
      for(const alias of await historicalAliases.all()){
        await alias.getByText('Location at this record',{exact:true}).waitFor()
        await alias.getByText(/^Recorded at:/).waitFor()
        if(await alias.getByText('Current Location',{exact:true}).count())throw Error('Historical alias location presented as current')
      }
      await panel.getByText(expected,{exact:true}).first().waitFor()
      const screenshot=`qa/departure-${label}-${key}.png`
      await page.screenshot({path:fileURLToPath(new URL(screenshot,book))})
      observations.push({eventId,key,label,expected,body:await panel.innerText(),screenshot})
    }
    for(const [chapter,paragraph,key,expected] of [[38,50,'isaac','Unknown'],[38,50,'bensamuel','Unknown'],[42,9,'blackknight','Unknown'],[42,9,'ivanhoe','Unknown'],[43,79,'beaumanoir','The eastern tribunal'],[43,79,'herald','Unknown'],[44,14,'beaumanoir','Unknown'],[44,25,'isaac','Nathan’s house'],[44,25,'rebecca','Nathan’s house']]){
      const event=fixture.events.find(e=>e.id===`ivanhoe-source-${chapter+3}-p${paragraph}`)
      const state=fixture.characterSnapshots.find(s=>s.eventId===event?.id&&s.characterId===`ivanhoe-character-${key}`)
      const location=fixture.locationMarkers.find(p=>p.id===state?.currentLocationMarkerId)
      await observe(event.id,key,`${chapter}-${paragraph}`,location?.name??expected)
    }
    for(const factKey of ['blackknight-left-lists','ivanhoe-removed-lists','ivanhoe-left-coningsburgh','gurth-called-away']){
      const fact=fixture.knowledgeFacts.find(f=>f.id.includes(factKey))
      if(!fact)throw Error(`Missing departure fact ${factKey}`)
      const tag=fact.tags.find(t=>t.startsWith('offstage-location-unknown:'))
      const key=tag.slice('offstage-location-unknown:ivanhoe-character-'.length)
      const index=fixture.events.findIndex(e=>e.id===fact.readerLearnsAtEventId)
      const previous=fixture.events[index-1]
      const latest=fixture.characterSnapshots.filter(s=>s.characterId===`ivanhoe-character-${key}`&&fixture.events.findIndex(e=>e.id===s.eventId)<index).at(-1)
      const place=fixture.locationMarkers.find(p=>p.id===latest?.currentLocationMarkerId)
      await observe(previous.id,key,`${factKey}-before`,place?.name??'Unknown')
      await page.getByRole('button',{name:'Next moment',exact:true}).click()
      await page.getByRole('tabpanel').getByText('Unknown',{exact:true}).first().waitFor()
      const screenshot=`qa/departure-${factKey}-reported.png`
      await page.screenshot({path:fileURLToPath(new URL(screenshot,book))})
      observations.push({factKey,phase:'reported',screenshot,body:await page.getByRole('tabpanel').innerText()})
      await page.getByRole('button',{name:'Previous moment',exact:true}).click()
      await page.getByRole('tabpanel').getByText(place?.name??'Unknown',{exact:true}).first().waitFor()
      const rewind=`qa/departure-${factKey}-rewind.png`
      await page.screenshot({path:fileURLToPath(new URL(rewind,book))})
      observations.push({factKey,phase:'rewind',screenshot:rewind,body:await page.getByRole('tabpanel').innerText()})
    }
    fs.writeFileSync(new URL('./qa/departure-browser-review.json',book),JSON.stringify({fixtureSha256,scope:'Source-corrected departures and four reported-location changes, including UI forward and rewind',observations,pageErrors:errors},null,2)+'\n')
  }
  if(process.argv.includes('--ashby-endpoints')){
    const checks=[]
    for(const [paragraph,key] of [[51,'john'],[62,'john'],[62,'vipont'],[40,'disinherited'],[54,'brian']]){
      const event=fixture.events.find(event=>event.id===`ivanhoe-source-11-p${paragraph}`)
      const state=fixture.characterSnapshots.find(state=>state.eventId===event.id&&state.characterId===`ivanhoe-character-${key}`)
      await selectMoment(event.title)
      await page.goto(`${base}/#/worlds/ivanhoe-world/characters/ivanhoe-character-${key}`)
      await page.getByRole('tab',{name:'Current State',exact:true}).click()
      await page.getByText(state.statusNotes,{exact:true}).waitFor()
      const place=fixture.locationMarkers.find(place=>place.id===state.currentLocationMarkerId)
      if(place)await page.getByText(place.name,{exact:true}).first().waitFor()
      else if(await page.getByText('The course between the gates',{exact:true}).count())throw Error('Carried-away Vipont retains a field-centre pin')
      const screenshot=`qa/ashby-endpoint-${key}-${paragraph}.png`
      await page.screenshot({path:fileURLToPath(new URL(screenshot,book))})
      checks.push({key,eventId:event.id,locationId:state.currentLocationMarkerId,screenshot})
    }
    fs.writeFileSync(new URL('./qa/ashby-endpoints.json',book),JSON.stringify({fixtureSha256,scope:'Five source-corrected VIII endpoint states displayed in actual character Current State views',checks,pageErrors:errors},null,2)+'\n')
  }
  if(process.argv.includes('--fuel-attendants')){
    const first=fixture.events.findIndex(event=>event.id==='ivanhoe-source-46-p0'),checks=[]
    await selectMoment(fixture.events[first-1].title)
    async function checkFuelRoster(label,visible){
      await page.goto(`${base}/#/worlds/ivanhoe-world/characters`)
      await page.waitForLoadState('networkidle')
      const search=page.getByPlaceholder(/^Search characters/)
      await search.fill('')
      await page.getByText('Cedric the Saxon',{exact:true}).waitFor()
      await search.fill('fuel attendants')
      const card=page.getByText('The four fuel attendants',{exact:true})
      if(visible)await card.first().waitFor()
      else await card.waitFor({state:'hidden'})
      const screenshot=`qa/fuel-attendants-${label}.png`
      await page.screenshot({path:fileURLToPath(new URL(screenshot,book))})
      checks.push({label,visible,screenshot})
    }
    await checkFuelRoster('before',false)
    await page.getByRole('button',{name:'Next moment',exact:true}).click()
    await checkFuelRoster('present',true)
    await page.getByRole('button',{name:'Previous moment',exact:true}).click()
    await checkFuelRoster('rewound',false)
    fs.writeFileSync(new URL('./qa/fuel-attendants-disclosure.json',book),JSON.stringify({fixtureSha256,scope:'New collective roster visibility before first direct appearance, at first appearance and after rewind',checks,pageErrors:errors},null,2)+'\n')
  }
  if(process.argv.includes('--opening-attendants')){
    const observations=[]
    for(const [key,anonymous,named] of [['hamet','An eastern attendant','Hamet'],['abdalla','The other eastern attendant','Abdalla']]){
      await selectMoment('Riders on the path')
      await page.goto(`${base}/#/worlds/ivanhoe-world/characters/ivanhoe-character-${key}`)
      await page.getByRole('heading',{name:anonymous,exact:true}).waitFor()
      await page.getByRole('tab',{name:'Current State',exact:true}).click()
      await page.getByText(fixture.characterSnapshots.find(s=>s.characterId===`ivanhoe-character-${key}`&&s.eventId==='ivanhoe-source-5-p0').statusNotes,{exact:true}).waitFor()
      const opening=await page.locator('body').innerText()
      if(/Hamet|Abdalla/.test(opening))throw Error('Opening attendant leaks a future name')
      if(!/turbaned attendants?\b/.test(opening))throw Error('Opening direct presence missing')
      await selectMoment('A wager on the road')
      await page.goto(`${base}/#/worlds/ivanhoe-world/characters/ivanhoe-character-${key}`)
      await page.getByRole('heading',{name:anonymous,exact:true}).waitFor()
      const beforeNameBody=await page.locator('body').innerText()
      if(beforeNameBody.includes(named)){fs.writeFileSync(new URL('./qa/instant-name-failure.txt',book),beforeNameBody);throw Error('Attendant named before II.51')}
      await page.getByRole('button',{name:'Next moment',exact:true}).click()
      await page.getByRole('heading',{name:named,exact:true}).waitFor()
      await page.getByRole('button',{name:'Previous moment',exact:true}).click()
      await page.getByRole('heading',{name:anonymous,exact:true}).waitFor()
      const screenshot=`qa/opening-attendant-${key}-rewound.png`
      await page.screenshot({path:fileURLToPath(new URL(screenshot,book))})
      observations.push({key,openingPresence:true,anonymous,named,forwardAndRewind:true,screenshot})
    }
    fs.writeFileSync(new URL('./qa/opening-attendants-ui-review.json',book),JSON.stringify({fixtureSha256,scope:'Opening physical presence and II.51 names forward/rewind; full retinue audit remains open',observations,pageErrors:errors},null,2)+'\n')
  }
  if(process.argv.includes('--attendants')){
    const observations=[]
    for(const [moment,paragraph] of [['The scales',7],['The heated bars',21],['The interrupted cruelty',55],['The Templar’s retreat',80]]){
      await selectMoment(moment)
      for(const key of ['hamet','abdalla']){
        await page.goto(`${base}/#/worlds/ivanhoe-world/characters/ivanhoe-character-${key}`)
        await page.getByRole('heading',{name:key==='hamet'?'Hamet':'Abdalla',exact:true}).waitFor()
        await page.getByRole('tab',{name:'Current State',exact:true}).click()
        const state=fixture.characterSnapshots.find(s=>s.characterId===`ivanhoe-character-${key}`&&s.eventId===`ivanhoe-source-${paragraph===80?34:25}-p${paragraph}`)
        await page.waitForLoadState('networkidle')
        fs.writeFileSync(new URL('./qa/attendant-current-body.txt',book),await page.locator('body').innerText())
        await page.screenshot({path:fileURLToPath(new URL('./qa/attendant-current.png',book))})
        await page.getByText(state.statusNotes,{exact:true}).first().waitFor()
        const screenshot=`qa/attendant-${key}-${paragraph}.png`
        await page.screenshot({path:fileURLToPath(new URL(screenshot,book))})
        observations.push({key,moment,eventId:state.eventId,sourceEndpoint:state.currentLocationMarkerId,screenshot})
      }
    }
    fs.writeFileSync(new URL('./qa/attendant-ui-review.json',book),JSON.stringify({scope:'Two source-identified attendants, collective actions and unknown departure endpoints; not exhaustive cast QA',observations,pageErrors:errors},null,2)+'\n')
  }
  if(process.argv.includes('--place-art')){
    const observations=[]
    for(const [key,moment] of [['forest-glade','The forest glade'],['rotherwood-hall','Cedric’s hall']]){
      const place=fixture.locationMarkers.find(p=>p.id===`ivanhoe-place-${key}`)
      await selectMoment(moment)
      await page.goto(`${base}/#/worlds/ivanhoe-world/maps`)
      const locations=page.locator('button[aria-expanded]').filter({hasText:/^Locations/i})
      if(await locations.getAttribute('aria-expanded')==='false')await locations.click()
      await page.locator('button').filter({has:page.locator(`span[title="${place.name}"]`)}).click()
      const thumb=page.getByAltText(place.name,{exact:true})
      await thumb.waitFor()
      await thumb.evaluate(i=>i.decode())
      const screenshot=`qa/place-art-${key}.png`
      await page.screenshot({path:fileURLToPath(new URL(screenshot,book))})
      await thumb.click()
      const enlarged=page.getByRole('dialog').getByAltText(place.name,{exact:true})
      await enlarged.waitFor();await enlarged.evaluate(i=>i.decode())
      const data=await enlarged.evaluate(async i=>Array.from(new Uint8Array(await(await fetch(i.src)).arrayBuffer())))
      const blob=fixture.blobs.find(b=>b.id===place.imageId)
      if(createHash('sha256').update(Buffer.from(data)).digest('hex')!==createHash('sha256').update(blob.dataBase64?Buffer.from(blob.dataBase64,'base64'):fs.readFileSync(new URL('../../'+blob.url,import.meta.url))).digest('hex'))throw Error(`Place illustration bytes differ ${key}`)
      const full=`qa/place-art-${key}-full.png`
      await page.screenshot({path:fileURLToPath(new URL(full,book))})
      await page.keyboard.press('Escape')
      observations.push({key,event:moment,screenshot,full})
    }
    fs.writeFileSync(new URL('./qa/place-art-ui-review.json',book),JSON.stringify({scope:'Two first-encounter place illustrations in actual location panel and lightbox; final artifact approval pending',observations,pageErrors:errors},null,2)+'\n')
  }
  if(process.argv.includes('--lore')){
    const observations=[]
    for(const key of ['warning','author','recognition','return','casket']){
      const note=fixture.lorePages.find(p=>p.id===`ivanhoe-lore-${key}`)
      const index=fixture.events.findIndex(e=>e.id===note.visibleFromEventId)
      for(const [phase,offset,visible] of [['before',-1,false],['reached',0,true],['rewound',-1,false]]){
        await selectMoment(fixture.events[index+offset].title)
        await page.goto(`${base}/#/worlds/ivanhoe-world/lore`)
        const link=page.getByRole('link',{name:note.title,exact:true})
        await page.waitForLoadState('networkidle')
        if(visible)await link.waitFor()
        else if(await link.count())throw Error(`Premature lore ${key}: ${phase}`)
        if(visible){
          await link.click()
          await page.waitForURL(`**/lore/${note.id}`)
          await page.getByRole('heading',{name:note.title,exact:true}).waitFor()
          await page.getByText(note.body.split('\n')[0],{exact:true}).waitFor()
          const text=await page.locator('body').innerText()
          if(!text.replace(/\s+/g,' ').includes(note.body.split('\n')[0].replace(/\s+/g,' '))){
            fs.writeFileSync(new URL(`./qa/lore-${key}-unexpected.txt`,book),text)
            await page.screenshot({path:fileURLToPath(new URL(`./qa/lore-${key}-unexpected.png`,book))})
            throw Error(`Reading-note body missing ${key}`)
          }
        }
        const screenshot=`qa/lore-${key}-${phase}.png`
        await page.screenshot({path:fileURLToPath(new URL(screenshot,book))})
        observations.push({key,phase,eventId:fixture.events[index+offset].id,visible,screenshot})
      }
    }
    fs.writeFileSync(new URL('./qa/lore-ui-review.json',book),JSON.stringify({scope:'Five sensitive reading notes checked in actual reader forward/rewind; not full release QA',fixtureSha256:createHash('sha256').update(fixtureBytes).digest('hex'),observations,pageErrors:errors},null,2)+'\n')
  }
  if(process.argv.includes('--higg-name')||process.argv.includes('--name-gates')){
    const observations=[]
    await selectMoment('The medicine box')
    await page.goto(`${base}/#/worlds/ivanhoe-world/characters/ivanhoe-character-higg`)
    await page.getByRole('tab',{name:'Current State',exact:true}).click()
    async function observe(label,name,place){
      await page.getByRole('heading',{name,exact:true}).waitFor()
      await page.getByRole('tabpanel').getByText(place,{exact:true}).waitFor()
      const body=await page.locator('body').innerText()
      if(name==='The witness on crutches'&&/Higg/.test(body))throw Error('Witness name disclosed before XXXVII29')
      await page.screenshot({path:fileURLToPath(new URL(`./qa/higg-name-${label}.png`,book))})
      observations.push({label,name,place,body})
    }
    await observe('before','The witness on crutches','Before the dais')
    await page.getByRole('button',{name:'Next moment',exact:true}).click()
    await observe('named','Higg','The lower public hall')
    await page.getByRole('button',{name:'Previous moment',exact:true}).click()
    await observe('rewound','The witness on crutches','Before the dais')
    await page.goto(`${base}/#/worlds/ivanhoe-world/items`)
    await page.getByText('The patient’s medicine box',{exact:true}).waitFor()
    if((await page.locator('body').innerText()).includes('Higg'))throw Error('Patient item metadata reveals the unspoken name')
    fs.writeFileSync(new URL('./qa/higg-name-ui-review.json',book),JSON.stringify({scope:'Selected witness name and medicine-box metadata forward/rewind, not complete identity audit',observations,pageErrors:errors},null,2)+'\n')
  }
  if(process.argv.includes('--name-gates')){
    const checks=[]
    for(const [key,moment,before,after] of [
      ['elgitha','Preparing for the guests','The handmaid','Elgitha'],
      ['debracy','A wife by force','De Bracy','Maurice de Bracy'],
    ]){
      await selectMoment(moment)
      await page.goto(`${base}/#/worlds/ivanhoe-world/characters/ivanhoe-character-${key}`)
      await page.getByRole('tab',{name:'Current State',exact:true}).click()
      await page.getByRole('heading',{name:before,exact:true}).waitFor()
      if((await page.locator('body').innerText()).includes(after))throw Error(`Premature name ${after}`)
      await page.screenshot({path:fileURLToPath(new URL(`./qa/name-${key}-before.png`,book))})
      await page.getByRole('button',{name:'Next moment',exact:true}).click()
      await page.getByRole('heading',{name:after,exact:true}).waitFor()
      await page.screenshot({path:fileURLToPath(new URL(`./qa/name-${key}-named.png`,book))})
      await page.getByRole('button',{name:'Previous moment',exact:true}).click()
      await page.getByRole('heading',{name:before,exact:true}).waitFor()
      checks.push({key,before,after,forwardAndRewind:true})
    }
    await selectMoment('The court assembled')
    await page.goto(`${base}/#/worlds/ivanhoe-world/characters`)
    await page.getByRole('heading',{name:'Characters',exact:true}).waitFor()
    const herman=page.getByText('Herman of Goodalricke',{exact:true})
    await herman.waitFor({state:'hidden'})
    await page.getByRole('button',{name:'Next moment',exact:true}).click()
    await herman.waitFor({state:'hidden'})
    await page.getByRole('button',{name:'Next moment',exact:true}).click()
    await herman.waitFor({state:'visible'})
    await page.screenshot({path:fileURLToPath(new URL('./qa/name-herman-introduced.png',book))})
    await page.getByRole('button',{name:'Previous moment',exact:true}).click()
    await herman.waitFor({state:'hidden'})
    checks.push({key:'herman',namedAt:'The knight questioned',earlierRosterAbsent:true,forwardAndRewind:true})
    fs.writeFileSync(new URL('./qa/initial-name-ui-review.json',book),JSON.stringify({scope:'Selected initial names and delayed named preceptor; full biography/alias/cast audit remains open',checks,pageErrors:errors},null,2)+'\n')
  }
  if(process.argv.includes('--inventory')){
    const checks=[]
    async function inventoryState(label,present,absent){
      const panel=page.getByRole('tabpanel')
      for(const name of present)await panel.getByText(name,{exact:true}).waitFor()
      for(const name of absent)await panel.getByText(name,{exact:true}).waitFor({state:'hidden'})
      await page.screenshot({path:fileURLToPath(new URL(`./qa/inventory-${label}.png`,book))})
      checks.push({label,present,absent,body:await panel.innerText()})
    }
    await selectMoment('De Bracy released')
    await page.goto(`${base}/#/worlds/ivanhoe-world/characters/ivanhoe-character-wamba`)
    await page.getByRole('tab',{name:'Current State',exact:true}).click()
    await inventoryState('wamba-before',['The prize bugle','The archer’s baldric'],[])
    await page.getByRole('button',{name:'Next moment',exact:true}).click()
    await page.getByRole('tabpanel').getByText('Locksley has the horn and baldric again and gives them to the Black Knight.',{exact:false}).waitFor()
    await inventoryState('wamba-relinquished',['Wamba’s silver collar'],['The prize bugle','The archer’s baldric'])
    const handoff=fixture.events.find(event=>event.title==='Three notes of the horn')
    if(handoff.involvedCharacterIds.includes('ivanhoe-character-wamba'))throw Error('Absent former holder fabricated as physical cast')
    await page.getByRole('button',{name:'Previous moment',exact:true}).click()
    await inventoryState('wamba-rewind',['The prize bugle','The archer’s baldric'],[])
    await selectMoment('The sealed appeal opened')
    await page.goto(`${base}/#/worlds/ivanhoe-world/characters/ivanhoe-character-aymer`)
    await page.getByRole('tab',{name:'Current State',exact:true}).click()
    await page.getByRole('tabpanel').getByText('Aymer’s postscript says that Brian’s pledge-chain is now around an unnamed outlaw deer-stalker’s neck.',{exact:false}).waitFor()
    await inventoryState('chain-reported',['Aymer’s gold collar'],['Brian’s pledge-chain'])
    await page.getByRole('button',{name:'Previous moment',exact:true}).click()
    await inventoryState('chain-rewind',['Brian’s pledge-chain'],[])
    await selectMoment('The farewell casket')
    await page.goto(`${base}/#/worlds/ivanhoe-world/items`)
    await page.getByRole('heading',{name:'Items',exact:true}).waitFor()
    await page.getByRole('link',{name:/^The farewell casket/}).waitFor()
    await page.getByText('The diamond carcanet',{exact:true}).waitFor({state:'hidden'})
    await page.getByRole('button',{name:'Next moment',exact:true}).click()
    await page.getByText('The diamond carcanet',{exact:true}).waitFor()
    await page.getByText('The diamond ear-jewels',{exact:true}).waitFor()
    await page.getByText('The diamond carcanet',{exact:true}).scrollIntoViewIfNeeded()
    await page.screenshot({path:fileURLToPath(new URL('./qa/inventory-casket-opened.png',book))})
    await page.getByRole('button',{name:'Previous moment',exact:true}).click()
    await page.getByText('The diamond carcanet',{exact:true}).waitFor({state:'hidden'})
    fs.writeFileSync(new URL('./qa/inventory-ui-review.json',book),JSON.stringify({scope:'Selected absent-holder removal/rewind and farewell item reveal; complete inventory QA remains open',checks,casketForwardAndRewind:true,pageErrors:errors},null,2)+'\n')
  }
  if(process.argv.includes('--relationships')){
    const relationshipChecks=[]
    async function relation(label,expected){
      await page.getByRole('tabpanel').getByText(expected,{exact:true}).waitFor()
      await page.screenshot({path:fileURLToPath(new URL(`./qa/relationship-${label}.png`,book))})
      relationshipChecks.push({label,expected,body:await page.getByRole('tabpanel').innerText()})
    }
    await selectMoment('A freeman named')
    await page.goto(`${base}/#/worlds/ivanhoe-world/characters/ivanhoe-character-gurth?tab=relationships`)
    await relation('freed','Former master and freed servant')
    await page.getByRole('tabpanel').getByText('from Ch. 35',{exact:true}).waitFor()
    await page.getByRole('button',{name:'Previous moment',exact:true}).click()
    await relation('freedom-rewind','Master and thrall')
    await selectMoment('Consent at York')
    await page.goto(`${base}/#/worlds/ivanhoe-world/characters/ivanhoe-character-rowena?tab=relationships`)
    await relation('consent','Marriage approved')
    await page.getByRole('button',{name:'Next moment',exact:true}).click()
    await relation('married','Husband and wife')
    await page.getByRole('tabpanel').getByText('from Ch. 47',{exact:true}).waitFor()
    await page.getByRole('tabpanel').getByText('Ended',{exact:true}).waitFor()
    await page.getByRole('button',{name:'Previous moment',exact:true}).click()
    await relation('marriage-rewind','Marriage approved')
    fs.writeFileSync(new URL('./qa/relationship-ui-review.json',book),JSON.stringify({scope:'Selected changing relationships and rewind; full supporting feature review remains open',relationshipChecks,pageErrors:errors},null,2)+'\n')
  }
  if(process.argv.includes('--supporting')){
    await selectMoment('Directions at a price')
    await page.goto(`${base}/#/worlds/ivanhoe-world/factions`)
    await page.getByText('The Order of the Temple',{exact:true}).click()
    await page.getByText('Members (1)',{exact:true}).waitFor()
    await page.getByText('Directions at a price → ongoing',{exact:false}).waitFor()
    await page.screenshot({path:fileURLToPath(new URL('./qa/faction-temple-first-member.png',book))})
    fs.writeFileSync(new URL('./qa/supporting-ui-review.json',book),JSON.stringify({scope:'First Temple affiliation only; full supporting feature QA remains open',body:await page.locator('body').innerText(),pageErrors:errors},null,2)+'\n')
  }
  if(process.argv.includes('--later-maps')){
    const checks=[]
    for(const [moment,key,label] of [
      ['The refuge at Saint Botolph’s','botolph','botolph-refuge'],
      ['The gilded spurs','botolph','botolph-before-descent'],
      ['Down to Malkin','botolph','botolph-gate'],
      ['The Prior’s breakfast','botolph','botolph-refectory'],
      ['Songs on the forest road','don-woods','don-road'],
      ['Coningsburgh in view','coningsburgh','coningsburgh-ascent'],
      ['The crowded court','coningsburgh','coningsburgh-court'],
      ['The tower’s ascent','coningsburgh-keep','coningsburgh-third'],
      ['Edith in mourning','coningsburgh-keep','coningsburgh-oratory'],
      ['The women’s dirge','coningsburgh-upper','coningsburgh-fourth'],
      ['The king names himself','coningsburgh-guests','coningsburgh-guests'],
      ['Uneasy counsel at York','york','york-castle'],
    ]){
      await selectMoment(moment)
      await page.goto(`${base}/#/worlds/ivanhoe-world/maps`)
      await captureLayer(key,label,checks)
    }
    await selectMoment('The women’s dirge')
    await page.goto(`${base}/#/worlds/ivanhoe-world/maps`)
    await page.getByTitle('Third storey',{exact:true}).click()
    await captureLayer('coningsburgh-keep','coningsburgh-floor-down',checks)
    await page.getByTitle('Fourth storey',{exact:true}).click()
    await captureLayer('coningsburgh-upper','coningsburgh-floor-up',checks)
    fs.writeFileSync(new URL('./qa/later-maps-review.json',book),JSON.stringify({scope:'Selected later map presentation and actual floor switches; incomplete edition',fixtureSha256:createHash('sha256').update(fs.readFileSync(new URL('./authoring-review.pwk',book))).digest('hex'),checks,pageErrors:errors},null,2)+'\n')
  }
  if(process.argv.includes('--templestowe')){
    const checks=[]
    for(const [moment,key,label] of [
      ['The reforming visitor','templestowe','templestowe-garden'],
      ['Summoned from the cell','templestowe-rooms','templestowe-first-confinement'],
      ['Down to the hall','templestowe-hall','templestowe-descent'],
      ['The folded scrap','templestowe-hall','templestowe-unread-scrap'],
      ['The pledge laid down','templestowe-lists','templestowe-east-west'],
      ['The bridle released','templestowe-lists','templestowe-return-east'],
      ['A champion arrives','templestowe-lists','templestowe-unknown-challenger'],
      ['The challenger names himself','templestowe-lists','templestowe-challenger-named'],
    ]){
      await selectMoment(moment)
      await page.goto(`${base}/#/worlds/ivanhoe-world/maps`)
      await captureLayer(key,label,checks)
    }
    await selectMoment('Summoned from the cell')
    await page.goto(`${base}/#/worlds/ivanhoe-world/maps`)
    await page.getByTitle('Hall and gallery',{exact:true}).click()
    await captureLayer('templestowe-hall','templestowe-floor-down',checks)
    await page.getByTitle('Prison-side rooms',{exact:true}).click()
    await captureLayer('templestowe-rooms','templestowe-floor-up',checks)
    const identityChecks=[]
    await selectMoment('A champion arrives')
    await page.goto(`${base}/#/worlds/ivanhoe-world/characters/ivanhoe-character-arrivingknight`)
    async function challengerIdentity(label,visible){
      await page.goto(`${base}/#/worlds/ivanhoe-world/characters/ivanhoe-character-arrivingknight`)
      if(visible){
        await page.waitForURL(/characters\/ivanhoe-character-ivanhoe/)
        await page.getByRole('heading',{name:'Ivanhoe',exact:true}).waitFor()
        await page.getByText(/^Also /).filter({hasText:'The arriving knight'}).waitFor()
      }else{
        await page.getByRole('heading',{name:'The arriving knight',exact:true}).waitFor()
        if(await page.getByText(/^Revealed to be /).count())throw Error('Challenger identity disclosed before his name')
      }
      await page.screenshot({path:fileURLToPath(new URL(`./qa/challenger-${label}.png`,book))})
      identityChecks.push({label,identityVisible:visible,body:await page.locator('body').innerText()})
    }
    await challengerIdentity('unnamed',false)
    await page.getByRole('button',{name:'Next moment',exact:true}).click()
    await page.waitForFunction(()=>Array.from(document.querySelectorAll('button')).some(b=>b.title.includes('The challenger names himself')&&b.title.endsWith('(open timeline)')))
    await challengerIdentity('named',true)
    await page.getByRole('button',{name:'Previous moment',exact:true}).click()
    await challengerIdentity('rewound',false)
    await page.goto(`${base}/#/worlds/ivanhoe-world/maps`)
    const labels=await page.locator('.leaflet-marker-icon').evaluateAll(nodes=>nodes.filter(n=>n.textContent?.trim()).map(n=>({text:n.textContent,html:n.outerHTML})))
    if(labels.some(n=>/book=|georgia,=|palatino=/.test(n.html)))throw Error('Malformed font attributes remain in actual map marker DOM')
    fs.writeFileSync(new URL('./qa/templestowe-review.json',book),JSON.stringify({scope:'Selected Templestowe source positions and layer presentation; incomplete edition',checks,identityChecks,markerLabels:labels,pageErrors:errors},null,2)+'\n')
  }
  if(process.argv.includes('--reported-lieutenant')){
    const id='ivanhoe-character-winkelbrand',observations=[]
    if(fixture.characterSnapshots.some(s=>s.characterId===id)||fixture.events.some(e=>e.involvedCharacterIds.includes(id)))throw Error('Reported lieutenant still has invented physical presence')
    const report=fixture.events.find(e=>e.title==='Uneasy counsel at York')
    if(!report?.mentionedCharacterIds?.includes(id))throw Error('Reported lieutenant mention lost')
    for(const moment of ['Secrets retained','Uneasy counsel at York','The survivor’s news']){
      await selectMoment(moment)
      await page.goto(`${base}/#/worlds/ivanhoe-world/maps`)
      await page.locator('.leaflet-container').waitFor()
      const body=await page.locator('body').innerText()
      if(body.includes('Winkelbrand'))throw Error('Merely reported lieutenant shown as a physically met map actor')
      const screenshot=`qa/reported-lieutenant-${observations.length}.png`
      await page.screenshot({path:fileURLToPath(new URL(screenshot,book))})
      observations.push({moment,screenshot,physicalPresence:false})
    }
    fs.writeFileSync(new URL('./qa/reported-lieutenant-review.json',book),JSON.stringify({scope:'XXXIV.13 reported order, no physical snapshot or reader map presence',fixtureSha256,observations,pageErrors:errors},null,2)+'\n')
  }
  if(process.argv.includes('--turret-departures')){
    const observations=[]
    for(const [moment,key,location] of [['A remembered conquest','urfried','The turret chamber'],['No inward bar','urfried','Unknown'],['The edge of the parapet','urfried','Unknown'],['The prayer within','brian','Unknown']]){
      await selectMoment(moment)
      await page.goto(`${base}/#/worlds/ivanhoe-world/characters/ivanhoe-character-${key}`)
      await page.getByRole('tab',{name:'Current State',exact:true}).click()
      const panel=page.getByRole('tabpanel')
      await panel.getByText(location,{exact:true}).waitFor()
      const body=await panel.innerText()
      await page.screenshot({path:fileURLToPath(new URL(`./qa/turret-departure-${observations.length}.png`,book))})
      observations.push({moment,key,location,body})
    }
    await selectMoment('No inward bar')
    await page.goto(`${base}/#/worlds/ivanhoe-world/characters/ivanhoe-character-urfried`)
    await page.getByRole('tab',{name:'Current State',exact:true}).click()
    await page.getByRole('button',{name:'Previous moment',exact:true}).click()
    await page.getByRole('tabpanel').getByText('The turret chamber',{exact:true}).waitFor()
    observations.push({rewind:'No inward bar to A remembered conquest',restoredLocation:'The turret chamber'})
    fs.writeFileSync(new URL('./qa/turret-departure-review.json',book),JSON.stringify({scope:'Direct departure endpoint regression in actual reading UI',observations,pageErrors:errors},null,2)+'\n')
  }
  if(process.argv.includes('--torquilstone')){
    const checks=[]
    for(const [moment,key,label] of [
      ['The turrets through the trees','torquilstone','torquilstone-first-approach'],
      ['Across the drawbridge','torquilstone-interior','torquilstone-first-rooms'],
      ['Below the moat','torquilstone-dungeon','torquilstone-deep-dungeon'],
      ['The spinning woman','torquilstone-turret','torquilstone-first-turret'],
      ['The edge of the parapet','torquilstone-turret','torquilstone-parapet-distance'],
      ['A shield at the window','torquilstone-interior','torquilstone-window-and-couch'],
      ['The turret falls','torquilstone','torquilstone-after-fire'],
    ]){
      await selectMoment(moment)
      await page.goto(`${base}/#/worlds/ivanhoe-world/maps`)
      await captureLayer(key,label,checks)
    }
    await selectMoment('A floating bridge')
    await page.goto(`${base}/#/worlds/ivanhoe-world/maps`)
    if(await page.locator('button[data-map-layer]').filter({hasText:'Above the main-wall postern'}).count())throw Error('Upper postern detail exposed before its first direct defensive position')
    await page.getByRole('button',{name:'Next moment',exact:true}).click()
    await captureLayer('torquilstone','torquilstone-attackers-below',checks)
    const upperLocations=page.locator('button[aria-expanded]').filter({hasText:/^Locations/i})
    if(await upperLocations.getAttribute('aria-expanded')==='false')await upperLocations.click()
    await page.locator('button').filter({has:page.locator('span[title="The upper postern defence"]')}).click()
    await page.getByRole('button',{name:'Open Sub-map',exact:true}).click()
    await captureLayer('torquilstone-postern-defence','torquilstone-defender-above',checks)
    await page.getByRole('button',{name:'Next moment',exact:true}).click()
    await captureLayer('torquilstone','torquilstone-outwork-following',checks)
    await page.getByRole('button',{name:'Next moment',exact:true}).click()
    await captureLayer('torquilstone','torquilstone-raft-warning',checks)
    await page.locator('button[data-map-layer]').filter({hasText:'Above the main-wall postern'}).click()
    await captureLayer('torquilstone-postern-defence','torquilstone-commanders-above',checks)
    await page.getByRole('button',{name:'Next moment',exact:true}).click()
    await captureLayer('torquilstone-interior','torquilstone-defender-descended',checks)
    await selectMoment('Below the moat')
    await page.goto(`${base}/#/worlds/ivanhoe-world/maps`)
    await page.locator('button[data-map-layer]').filter({hasText:'Yorkshire and the Midlands'}).click()
    for(const [title,key] of [['Torquilstone','torquilstone'],['The castle rooms','torquilstone-interior'],['Down to the deep dungeon','torquilstone-dungeon']]){
      const locations=page.locator('button[aria-expanded]').filter({hasText:/^Locations/i})
      if(await locations.getAttribute('aria-expanded')==='false')await locations.click()
      await page.locator('button').filter({has:page.locator(`span[title="${title}"]`)}).click()
      await page.getByRole('button',{name:'Open Sub-map',exact:true}).click()
      await captureLayer(key,`${key}-deep-entry`,checks)
    }
    await selectMoment('The spinning woman')
    await page.goto(`${base}/#/worlds/ivanhoe-world/maps`)
    await page.locator('button[data-map-layer]').filter({hasText:'Rooms of Torquilstone'}).click()
    const locations=page.locator('button[aria-expanded]').filter({hasText:/^Locations/i})
    if(await locations.getAttribute('aria-expanded')==='false')await locations.click()
    await page.locator('button').filter({has:page.locator('span[title="Up to the isolated turret"]')}).click()
    await page.getByRole('button',{name:'Open Sub-map',exact:true}).click()
    await captureLayer('torquilstone-turret','torquilstone-turret-entry',checks)
    const conditions=[]
    for(const [moment,status,phrase] of [
      ['The byzant flung back','active','cross the moat on a single plank'],
      ['The connecting bridge','active','temporary bridge connecting them'],
      ['The bridge destroyed','destroyed','destroyed the connecting plank'],
      ['A floating bridge','destroyed','the gap has not yet been crossed'],
      ['Two at the gate','rebuilt','cross its slippery two-abreast surface'],
      ['The bridge destroyed','destroyed','destroyed the connecting plank'],
    ]){
      await selectMoment(moment)
      await page.goto(`${base}/#/worlds/ivanhoe-world/maps`)
      await page.locator('button[data-map-layer]').filter({hasText:'Torquilstone and its approaches'}).click()
      const locations=page.locator('button[aria-expanded]').filter({hasText:/^Locations/i})
      if(await locations.getAttribute('aria-expanded')==='false')await locations.click()
      await page.locator('button').filter({has:page.locator('span[title="The postern moat crossing"]')}).click()
      await page.getByRole('paragraph').filter({hasText:new RegExp(`^${status}$`)}).waitFor()
      await page.getByRole('paragraph').filter({hasText:phrase}).waitFor()
      const body=await page.locator('body').innerText()
      conditions.push({moment,status,phrase,body})
      await page.screenshot({path:fileURLToPath(new URL(`./qa/torquilstone-crossing-${conditions.length}.png`,book))})
    }
    fs.writeFileSync(new URL('./qa/torquilstone-review.json',book),JSON.stringify({scope:'Selected source-grounded map, deep entry, separated listener and crossing/rewind fixture checks; incomplete edition',checks,conditions,pageErrors:errors},null,2)+'\n')
  }
  if(process.argv.includes('--surroundings')){
    const checks=[]
    for(const [title,key,label] of [
      ['A hope of freedom','ashby-woods','ashby-avenue'],
      ['The dark lane','ashby-woods','ashby-lane'],
      ['The masked company','ashby-woods','ashby-woodland-opening'],
      ['Across the heath','ashby-woods','ashby-heath'],
      ['The evening’s report','ashby-lists','ashby-return-pavilion'],
      ['The castle banquet','ashby-castle','ashby-banquet'],
      ['Green in the inner hall','ashby-castle','ashby-inner-hall'],
      ['Called from within','ashby-castle','ashby-separate-caller'],
    ]){
      await selectMoment(title)
      await page.goto(`${base}/#/worlds/ivanhoe-world/maps`)
      await captureLayer(key,label,checks)
      if(title==='The dark lane'&&await page.locator('span[title="The outlaws’ clearing"]').count())throw Error('Unreached clearing marker revealed before Gurth is brought there')
    }
    for(const [moment,title,key] of [['The masked company','The wooded approach','ashby-woods'],['Green in the inner hall','The castle precinct','ashby-castle']]){
      await selectMoment(moment)
      await page.goto(`${base}/#/worlds/ivanhoe-world/maps`)
      await page.locator('button[data-map-layer]').filter({hasText:'Ashby and the tournament meadow'}).click()
      const locations=page.locator('button[aria-expanded]').filter({hasText:/^Locations/i})
      if(await locations.getAttribute('aria-expanded')==='false')await locations.click()
      await page.locator('button').filter({has:page.locator(`span[title="${title}"]`)}).click()
      await page.getByRole('button',{name:'Open Sub-map',exact:true}).click()
      await captureLayer(key,`${key}-parent-entry`,checks)
    }
    fs.writeFileSync(new URL('./qa/ashby-surroundings-review.json',book),JSON.stringify({scope:'Selected woodland approach and separate castle-room fixture checks; not full playback or release QA',checks,pageErrors:errors},null,2)+'\n')
  }
  if(process.argv.includes('--house')){
    const checks=[]
    await selectMoment('A father’s losses')
    await page.goto(`${base}/#/worlds/ivanhoe-world/maps`)
    await captureLayer('ashby-house-upper','country-house-first-upper',checks)
    await page.locator('button[data-map-layer]').filter({hasText:'Ashby and the tournament meadow'}).click()
    await captureLayer('ashby','country-house-parent',checks)
    const locations=page.locator('button[aria-expanded]').filter({hasText:/^Locations/i})
    if(await locations.getAttribute('aria-expanded')==='false')await locations.click()
    const entrance=page.locator('button').filter({has:page.locator('span[title="The borrowed lodging"]')})
    if(!await entrance.count()){
      await page.screenshot({path:fileURLToPath(new URL('./qa/country-house-first-floor-gateway-missing.png',book))})
      throw Error('Known upper floor has no visible shared building entrance on parent map')
    }
    await entrance.click()
    await page.getByRole('button',{name:'Open Sub-map',exact:true}).click()
    await captureLayer('ashby-house','country-house-common-entry',checks)
    await page.getByTitle('Upper apartment',{exact:true}).click()
    await captureLayer('ashby-house-upper','country-house-floor-up',checks)
    await page.getByTitle('Lower hall and court',{exact:true}).click()
    await captureLayer('ashby-house','country-house-floor-down',checks)
    async function rebeccaState(title,place,label){
      await selectMoment(title)
      await page.goto(`${base}/#/worlds/ivanhoe-world/characters/ivanhoe-character-rebecca`)
      await page.getByRole('tab',{name:'Current State',exact:true}).click()
      const panel=page.getByRole('tabpanel')
      await panel.getByText(place,{exact:true}).waitFor()
      const body=await panel.innerText()
      if(place==='Unknown'&&body.includes('The upper room'))throw Error('Reported absence retains the old room')
      await page.screenshot({path:fileURLToPath(new URL(`./qa/rebecca-${label}.png`,book))})
      checks.push({title,label,place,body})
    }
    await rebeccaState('Isaac’s satisfaction','The upper room','before-absence')
    await rebeccaState('An empty place','Unknown','reported-absence')
    await rebeccaState('A summons below','The side room','seen-below')
    await rebeccaState('An empty place','Unknown','absence-rewind')
    await rebeccaState('Isaac’s satisfaction','The upper room','before-absence-rewind')
    await selectMoment('Rebecca’s purse')
    await page.goto(`${base}/#/worlds/ivanhoe-world/maps`)
    await captureLayer('ashby-house','country-house-purse-side-room',checks)
    await page.getByRole('button',{name:'Next moment',exact:true}).click()
    await captureLayer('ashby-house','country-house-court-and-wicket',checks)
    await selectMoment('An onward patient')
    await page.goto(`${base}/#/worlds/ivanhoe-world/maps`)
    await captureLayer('ashby-house-sickroom','country-house-sickroom',checks)
    await page.locator('button[data-map-layer]').filter({hasText:'The borrowed lodging'}).click()
    await captureLayer('ashby-house','country-house-sickroom-parent',checks)
    const roomLocations=page.locator('button[aria-expanded]').filter({hasText:/^Locations/i})
    if(await roomLocations.getAttribute('aria-expanded')==='false')await roomLocations.click()
    await page.locator('button').filter({has:page.locator('span[title="A room in the lodging"]')}).click()
    await page.getByRole('button',{name:'Open Sub-map',exact:true}).click()
    await captureLayer('ashby-house-sickroom','country-house-sickroom-entry',checks)
    fs.writeFileSync(new URL('./qa/country-house-navigation-review.json',book),JSON.stringify({scope:'Country-house shared entrance and floors; incomplete edition',pageErrors:errors,checks},null,2)+'\n')
  }
  if(process.argv.includes('--copmanhurst')){
    const checks=[]
    await selectMoment('A closed door')
    await page.goto(`${base}/#/worlds/ivanhoe-world/maps`)
    await captureLayer('copmanhurst','hermitage-closed-door',checks)
    if(await page.locator('button[data-map-layer]').filter({hasText:'The hut interior'}).count())throw Error('Unknown interior revealed through closed-door conversation')
    if((await page.locator('body').innerText()).includes('Copmanhurst'))throw Error('Place name leaked before the Clerk gives it')
    await page.locator('button[data-map-layer]').filter({hasText:'Yorkshire and the Midlands'}).click()
    await captureLayer('england','hermitage-root-gateway',checks)
    const rootLocations=page.locator('button[aria-expanded]').filter({hasText:/^Locations/i})
    if(await rootLocations.getAttribute('aria-expanded')==='false')await rootLocations.click()
    await page.locator('button').filter({has:page.locator('span[title="The hermitage clearing"]')}).click()
    await page.getByRole('button',{name:'Open Sub-map',exact:true}).click()
    await captureLayer('copmanhurst','hermitage-parent-gateway',checks)
    await page.getByRole('button',{name:'Next moment',exact:true}).click()
    await captureLayer('copmanhurst','hermitage-door-opens',checks)
    await page.getByRole('button',{name:'Next moment',exact:true}).click()
    await captureLayer('copmanhurst-hut','hermitage-first-interior',checks)
    await page.getByRole('button',{name:'Previous moment',exact:true}).click()
    await captureLayer('copmanhurst','hermitage-entry-rewind',checks)
    if(await page.locator('button[data-map-layer]').filter({hasText:'The hut interior'}).count())throw Error('Interior remains revealed after rewind before description')
    await page.getByRole('button',{name:'Next moment',exact:true}).click()
    await page.locator('button[data-map-layer]').filter({hasText:'The hermitage clearing'}).click()
    const locations=page.locator('button[aria-expanded]').filter({hasText:/^Locations/i})
    if(await locations.getAttribute('aria-expanded')==='false')await locations.click()
    await page.locator('button').filter({has:page.locator('span[title="The hut building"]')}).click()
    await page.getByRole('button',{name:'Open Sub-map',exact:true}).click()
    await captureLayer('copmanhurst-hut','hermitage-hut-gateway',checks)
    await selectMoment('The key beneath the threshold')
    await page.goto(`${base}/#/worlds/ivanhoe-world/maps`)
    await captureLayer('copmanhurst','hermitage-fountain-return',checks)
    await page.getByRole('button',{name:'Next moment',exact:true}).click()
    await captureLayer('copmanhurst','hermitage-muster-order',checks)
    fs.writeFileSync(new URL('./qa/copmanhurst-navigation-review.json',book),JSON.stringify({scope:'Limited clearing/hut, closed-door reveal and return fixture checks; not full release QA',pageErrors:errors,checks},null,2)+'\n')
  }
  async function reviewAxe(checks){
    for(const [moment,visible] of [['Desdichado to the rescue',false],['The axe turned against its owner',true]]){
      await selectMoment(moment)
      await page.goto(`${base}/#/worlds/ivanhoe-world/items`)
      await page.getByRole('heading',{name:'Items',exact:true}).waitFor()
      const item=page.getByText('Athelstane’s battle-axe',{exact:true})
      if(!visible){if(await item.count())throw Error('Axe appears before its compiled source disclosure')}
      else{
        await item.click()
        const picture=page.getByAltText('Athelstane’s battle-axe',{exact:true})
        await picture.evaluate(i=>i.decode())
        await page.screenshot({path:fileURLToPath(new URL('./qa/athelstane-axe-item.png',book))})
        await picture.click()
        const lightbox=page.getByRole('dialog')
        await lightbox.waitFor()
        const enlarged=lightbox.getByAltText('Athelstane’s battle-axe',{exact:true})
        await enlarged.waitFor({state:'visible'})
        await enlarged.evaluate(async i=>{await i.decode();if(i.naturalWidth!==1254)throw Error('Expected full-size axe image')})
        await page.screenshot({path:fileURLToPath(new URL('./qa/athelstane-axe-lightbox.png',book))})
      }
      checks.push({moment,axeVisible:visible,scope:'Item appearance and image only; custody not compiled'})
    }
    fs.writeFileSync(new URL('./qa/axe-image-review.json',book),JSON.stringify({scope:'Limited source appearance, thumbnail and enlarged image review; custody not compiled',checks:checks.filter(c=>Object.hasOwn(c,'axeVisible')),pageErrors:errors},null,2)+'\n')
  }
  if(process.argv.includes('--item')&&!process.argv.includes('--ashby'))await reviewAxe([])
  if(process.argv.includes('--ashby')){
    const checks=[]
    async function capture(key,label){await captureLayer(key,label,checks)}
    async function openGateway(title){
      const section=page.locator('button[aria-expanded]').filter({hasText:/^Locations/i})
      if(await section.getAttribute('aria-expanded')==='false')await section.click()
      await page.locator('button').filter({has:page.locator(`span[title="${title}"]`)}).click()
      await page.getByRole('button',{name:'Open Sub-map',exact:true}).click()
    }
    await selectMoment('The field at Ashby')
    await page.goto(`${base}/#/worlds/ivanhoe-world/maps`)
    await capture('ashby-lists','ashby-first-field')
    await page.locator('button[data-map-layer]').filter({hasText:'Yorkshire and the Midlands'}).click()
    await capture('england','ashby-root-gateway')
    await openGateway('Ashby')
    await capture('ashby','ashby-parent-gateway')
    await openGateway('The tournament meadow')
    await capture('ashby-lists','ashby-child-gateway')
    await page.getByRole('button',{name:'Next moment',exact:true}).click()
    await capture('ashby-lists','ashby-marshals-arrive')
    await page.getByRole('button',{name:'Next moment',exact:true}).click()
    await capture('ashby-lists','ashby-insult-before-rebecca')
    await page.getByRole('button',{name:'Next moment',exact:true}).click()
    await capture('ashby-lists','ashby-lower-ring')
    for(let n=0;n<3;n++)await page.getByRole('button',{name:'Previous moment',exact:true}).click()
    await capture('ashby-lists','ashby-field-rewind')
    await selectMoment('The gallery command')
    await page.goto(`${base}/#/worlds/ivanhoe-world/maps`)
    await capture('ashby-lists','ashby-gallery-command')
    await selectMoment('The award confirmed')
    await page.goto(`${base}/#/worlds/ivanhoe-world/maps`)
    await capture('ashby-lists','ashby-east-award')
    await page.getByRole('button',{name:'Next moment',exact:true}).click()
    await capture('ashby-lists','ashby-west-award')
    await page.goto(`${base}/#/worlds/ivanhoe-world/characters/ivanhoe-character-john`)
    await page.getByRole('tab',{name:'Current State',exact:true}).click()
    await page.getByRole('tabpanel').getByText('The prince’s gallery',{exact:true}).waitFor()
    await page.screenshot({path:fileURLToPath(new URL('./qa/ashby-john-stays-east.png',book))})
    checks.push({label:'John remains in eastern gallery at western award',body:await page.getByRole('tabpanel').innerText()})
    for(const [moment,label] of [['Past Alicia’s gallery','ashby-alicia-position'],['The private attendant','ashby-borrowed-pavilion'],['The split shaft','ashby-archery']]){
      await selectMoment(moment)
      await page.goto(`${base}/#/worlds/ivanhoe-world/maps`)
      await capture('ashby-lists',label)
    }
    await selectMoment('Desdichado to the rescue')
    await page.goto(`${base}/#/worlds/ivanhoe-world/maps`)
    for(let i=0;i<5;i++){
      await capture('ashby-lists',`ashby-intervention-${i+1}`)
      if(i<4)await page.getByRole('button',{name:'Next moment',exact:true}).click()
    }
    for(const [moment,phrase,label] of [['Desdichado to the rescue','Adds his strength','athelstane-before-fall'],['The axe turned against its owner','falls senseless','athelstane-after-fall']]){
      await selectMoment(moment)
      await page.goto(`${base}/#/worlds/ivanhoe-world/characters/ivanhoe-character-athelstane`)
      await page.getByRole('tab',{name:'Current State',exact:true}).click()
      const panel=page.getByRole('tabpanel')
      await panel.getByText('Alive',{exact:true}).waitFor()
      await panel.getByText(phrase,{exact:false}).waitFor()
      await page.screenshot({path:fileURLToPath(new URL(`./qa/${label}.png`,book))})
      checks.push({label,body:await panel.innerText()})
    }
    await reviewAxe(checks)
    fs.writeFileSync(new URL('./qa/ashby-navigation-review.json',book),JSON.stringify({scope:'PARTIAL ASHBY FIXTURE MAP QA; NOT FULL EDITION PLAYBACK',pageErrors:errors,checks},null,2)+'\n')
  }
  if(process.argv.includes('--maps')){
    const mapChecks=[]
    // Enter from an unplaced scene. A previous Maps visit may legitimately
    // retain its selected layer; record that selection and use normal tree
    // navigation to inspect the root image rather than asserting a reset.
    await selectMoment('The whispered name')
    await page.goto(`${base}/#/worlds/ivanhoe-world/maps`)
    async function captureMap(name,label,width,height){
      const layer=fixture.mapLayers.find(layer=>layer.name===name)
      if(!layer)throw Error(`Missing expected map layer ${name}`)
      if(width!==undefined&&(layer.imageWidth!==width||layer.imageHeight!==height))throw Error(`Declared map dimensions differ ${name}`)
      await captureLayer(layer.id.replace('ivanhoe-map-',''),label,mapChecks)
    }
    await page.getByRole('button',{name:'Map tools',exact:true}).waitFor()
    const entrySelection=await page.locator('button[data-map-layer][aria-current="true"]').innerText()
    mapChecks.push({label:'unplaced-scene-entry-selection',entrySelection,scope:'Existing selected layer may be retained; no root reset is required.'})
    if(!entrySelection.includes('Yorkshire and the Midlands'))await page.locator('button[data-map-layer]').filter({hasText:'Yorkshire and the Midlands'}).click()
    await captureMap('Yorkshire and the Midlands','region-normal-entry')
    // Return to a source-placed scene to exercise arrival and local plans.
    await selectMoment('Outside the postern')
    await page.goto(`${base}/#/worlds/ivanhoe-world/maps`)
    try{await page.getByRole('button',{name:'Rotherwood',exact:true}).click({timeout:5000})}
    catch(error){await page.screenshot({path:fileURLToPath(new URL('./qa/map-failure.png',book))});fs.writeFileSync(new URL('./qa/map-failure-body.txt',book),await page.locator('body').innerText());throw error}
    await captureMap('Rotherwood','rotherwood')
    for(const [gateway,name,label] of [['The hall building','The hall at Rotherwood','rotherwood-hall'],['The sleeping wing','The guest passage','rotherwood-guests']]){
      await page.getByRole('button',{name:'Rotherwood',exact:true}).click()
      const locations=page.locator('button[aria-expanded]').filter({hasText:/^Locations/i})
      if(await locations.getAttribute('aria-expanded')==='false')await locations.click()
      await page.locator('button').filter({has:page.locator(`span[title="${gateway}"]`)}).click()
      await page.getByRole('button',{name:'Open Sub-map',exact:true}).click()
      await captureMap(name,label)
    }
    await page.getByRole('button',{name:'Next moment',exact:true}).click()
    await captureMap('Rotherwood','narrow-bridge-arrival')
    await selectMoment('A summons in the antechamber')
    await page.goto(`${base}/#/worlds/ivanhoe-world/maps`)
    await captureMap('Rotherwood','antechamber-before-ascent')
    await page.getByRole('button',{name:'Next moment',exact:true}).click()
    await captureMap('Rowena’s raised rooms','rowena-ascent')
    await page.getByRole('button',{name:'Previous moment',exact:true}).click()
    await captureMap('Rotherwood','antechamber-rewind')
    const nameChecks=[]
    for(const [moment,name,label] of [['A summons in the antechamber','The waiting-maid','edwina-before-name'],['Edwina leads the visitor out','Edwina','edwina-named']]){
      await selectMoment(moment)
      await page.goto(`${base}/#/worlds/ivanhoe-world/characters/ivanhoe-character-edwina`)
      await page.getByRole('heading',{name,exact:true}).waitFor()
      await page.screenshot({path:fileURLToPath(new URL(`./qa/${label}.png`,book))})
      nameChecks.push({moment,name,label})
    }
    fs.writeFileSync(new URL('./qa/edwina-name-review.json',book),JSON.stringify({scope:'Limited first-name disclosure fixture check',nameChecks,pageErrors:errors},null,2)+'\n')
    fs.writeFileSync(new URL('./qa/map-navigation-review.json',book),JSON.stringify({status:'PARTIAL ROOT ENTRY AND THREE-PLAN FIXTURE NAVIGATION; NOT FULL MAP COVERAGE',pageErrors:errors,mapChecks},null,2)+'\n')
  }
  if(process.argv.includes('--knowledge')){
    const stateChecks=[]
    async function position(title){
      // Fixture setup uses the writer's timeline to select a known source
      // moment; all observations and forward/rewind changes use reading UI.
      await selectMoment(title)
      await page.goto(`${base}/#/worlds/ivanhoe-world/characters/ivanhoe-character-athelstane`)
      await page.getByRole('tab',{name:'Current State',exact:true}).click()
    }
    async function observe(label,alive){
      const panel=page.getByRole('tabpanel')
      await panel.getByText(alive?'Alive':'Deceased',{exact:true}).waitFor()
      const body=await panel.innerText()
      await page.screenshot({path:fileURLToPath(new URL(`./qa/athelstane-${label}.png`,book))})
      stateChecks.push({label,isAlive:alive,body})
    }
    await position('An ally’s share')
    await observe('before-report',true)
    await page.getByRole('button',{name:'Next moment',exact:true}).click()
    await observe('reported-dead',false)
    for(let i=0;i<5;i++)await page.getByRole('button',{name:'Next moment',exact:true}).click()
    await observe('funeral-car',false)
    await position('Father and son reconciled')
    await observe('before-return',false)
    await page.getByRole('button',{name:'Next moment',exact:true}).click()
    await observe('returned-alive',true)
    await page.getByRole('button',{name:'Previous moment',exact:true}).click()
    await observe('rewound-before-return',false)
    const identityChecks=[]
    for(const [title,visible,label] of [['The whispered name',false,'private-identity'],['News spoken low',true,'reader-identity']]){
      await position(title)
      await page.goto(`${base}/#/worlds/ivanhoe-world/knowledge`)
      await page.getByRole('heading',{name:'Knowledge',exact:true}).waitFor()
      await page.getByText('The victor is Ivanhoe',{exact:true}).waitFor()
      const fact=page.getByText('The Black Knight’s identity',{exact:true})
      if(visible)await fact.waitFor()
      else if(await fact.count())throw Error('Private identity knowledge leaked to the reader')
      await page.screenshot({path:fileURLToPath(new URL(`./qa/${label}.png`,book))})
      identityChecks.push({label,title,identityFactVisible:visible,body:await page.locator('body').innerText()})
    }
    fs.writeFileSync(new URL('./qa/knowledge-state-review.json',book),JSON.stringify({status:'LIMITED IVANHOE REPORT/CORRECTION AND IDENTITY FIXTURE QA; NOT FULL RELEASE QA',pageErrors:errors,stateChecks,identityChecks},null,2)+'\n')
  }
  if(errors.length||consoleErrors.length||networkFailures.length)throw Error('Runtime, console or network failures during authoring fixture QA')
  await page.waitForFunction(()=>Array.from(document.images).every(image=>image.complete&&image.naturalWidth>0))
  const run={inputPath:fileURLToPath(fixturePath),libraryDownloadProof,status:'PASSED SCOPED APPLICATION CHECKS; MANUAL REVIEW AND PACKAGING ARE SEPARATE GATES',fixtureSha256,appBuildSha256,flags:process.argv.slice(2),browser:browser.version(),pageErrors:errors,consoleErrors,networkFailures,cancelledImageRequests}
  const runBytes=JSON.stringify(run,null,2)+'\n'
  fs.writeFileSync(new URL('./qa/latest-review-run.json',book),runBytes)
  const runKey=createHash('sha256').update(JSON.stringify(run.flags)).digest('hex').slice(0,12)
  fs.writeFileSync(new URL(`./qa/browser-run-${fixtureSha256.slice(0,12)}-${runKey}.json`,book),runBytes)
}catch(error){
  const failedPage=browser.contexts()[0]?.pages().at(-1)
  if(failedPage){await failedPage.screenshot({path:fileURLToPath(new URL('./qa/browser-failure.png',book))});fs.writeFileSync(new URL('./qa/browser-failure-body.txt',book),failedPage.url()+'\n'+await failedPage.locator('body').innerText())}
  fs.writeFileSync(new URL('./qa/last-browser-failure.json',book),JSON.stringify({message:error.message,pageErrors:errors,networkFailures,consoleErrors,mapRequests},null,2)+'\n')
  throw error
}finally{await browser.close()}
