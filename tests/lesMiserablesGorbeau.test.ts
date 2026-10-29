import { expect,test } from 'vitest'
import { enrichedReview,buildEnrichmentAudit } from '../scripts/les-miserables/build-enrichment-audit.mjs'
import { characterIntroductions } from '../scripts/les-miserables/character-ledger.mjs'
import { buildIdentityPlan } from '../scripts/les-miserables/identity-plan.mjs'
import { chapters } from '../scripts/les-miserables/source-text.mjs'

const review = enrichedReview()
const row = (chapter:number,at:number|string)=>review.get(chapter).find(scene=>scene.at===at)
const cast = (chapter:number,at:number|string)=>row(chapter,at).present.map(([key])=>key)

test('does not guess individual identities for the first two anonymous entrants',()=>{
  const first=row(219,11)
  expect(first.unidentifiedParticipants.count).toBe(2)
  expect(first.present).toHaveLength(3)
  expect(first.description).toContain('Two unidentified men')
  expect(characterIntroductions.has('attic-first-blackened-entrant')).toBe(false)
  expect(characterIntroductions.has('attic-second-blackened-entrant')).toBe(false)
})

test('keeps the child’s bed, the coat search and the observer’s opening in their source positions',()=>{
  expect(row(105,'start').actorLocations).toMatchObject({valjean:'gorbeau-cosette-chamber',cosette:'gorbeau-cosette-chamber'})
  expect(row(107,5).actorLocations['gorbeau-principal-lodger']).toBe('gorbeau-early-corridor')
  expect(cast(107,7)).toEqual(['gorbeau-principal-lodger','valjean','cosette'])
  expect(row(107,7).actorLocations).toMatchObject({valjean:'gorbeau-early-corridor',cosette:'gorbeau-early-corridor'})
  expect(row(205,6).actorLocations.marius).toBe('gorbeau-partition-aperture')
  const aperture=buildEnrichmentAudit().locations.find(place=>place.key==='gorbeau-partition-aperture')
  expect(aperture.occurrences[0]).toMatchObject({chapter:205,at:6})
})

test('retains four distinguishable blackened men before the three masked reinforcements',()=>{
  expect(chapters[218].paragraphs[29].text).toContain('now four men')
  expect(cast(219,29)).toEqual(['jondrette','monsieur-leblanc','madame-jondrette',
    'attic-white-haired-man','attic-bearded-man','attic-long-haired-man','attic-doorpost-man'])
  expect(row(219,29).items).toContain('jondrette-turned-wooden-panel')
  expect(cast(220,'start')).toHaveLength(11)
  expect(row(220,'start').actorLocations.marius).toBe('gorbeau-partition-aperture')
  for(const key of ['masked-cudgel-man','masked-axe-man','masked-key-man'])
    expect(row(220,'start').actorLocations[key]).toBe('gorbeau-house-corridor')
  expect(cast(219,29)).not.toContain('panchaud')
})

test('waits for corroborated naming and does not revive the drunken old man',()=>{
  const facts=buildIdentityPlan().facts
  expect(facts.find(f=>f.identity==='attic-white-haired-man')).toMatchObject({character:'boulatruelle',chapter:220,at:75})
  expect(facts.find(f=>f.identity==='attic-doorpost-man')).toMatchObject({character:'panchaud',chapter:221,at:48})
  expect(facts.find(f=>f.identity==='attic-long-haired-man')).toMatchObject({character:'brujon',chapter:221,at:48})
  expect(facts.find(f=>f.identity==='attic-bearded-man')).toMatchObject({character:'demi-liard',chapter:221,at:48})
  expect(row(220,75).present.find(([key])=>key==='boulatruelle')[1]).toContain('intoxicated')
  expect(row(221,48).present.find(([key])=>key==='boulatruelle')[1]).toContain('Wakes')
})

test('keeps the continuous garret party without moving the two messengers or Marius into it',()=>{
  for(const at of [57,75,107,130,179,221,242,270]){
    expect(cast(220,at).filter(key=>key!=='marius')).toHaveLength(10)
    if(cast(220,at).includes('marius'))expect(row(220,at).actorLocations.marius).toBe('gorbeau-partition-aperture')
  }
  expect(cast(220,205).filter(key=>key!=='marius')).toHaveLength(8)
  expect(cast(220,205)).not.toContain('madame-thenardier')
  expect(cast(220,205)).not.toContain('masked-axe-man')
  expect(cast(220,221)).toContain('madame-thenardier')
  expect(cast(220,221)).toContain('masked-axe-man')
  expect(row(220,179).actorLocations).toMatchObject({'madame-thenardier':null,'masked-axe-man':null})
  for(const at of [3,29,48,64]){
    expect(cast(221,at)).toHaveLength(11)
    expect(cast(221,at)).not.toContain('marius')
  }
  const audit=buildEnrichmentAudit()
  expect(audit.characters.find(c=>c.key==='monsieur-leblanc').occurrences.find(o=>o.chapter===221&&o.at===64).location).toBeNull()
})
