import{expect,test}from 'vitest'
import{buildWorldReview}from '../scripts/les-miserables/build-world-review.mjs'

const p='lesmis-world-review'

test('models Patron-Minette as distinct leaders and named associates without making every accomplice a leader',()=>{
 const{world}=buildWorldReview({embedded:false})
 const faction=world.factions.find(row=>row.id===`${p}-faction-patron-minette`)
 expect(faction?.name).toBe('Patron-Minette')
 const members=world.factionMemberships.filter(row=>row.factionId===faction.id)
 expect(members).toHaveLength(7)
 expect(members.filter(row=>row.role==='One of the four leaders').map(row=>row.characterId).sort()).toEqual(
  ['babet','gueulemer','claquesous','montparnasse'].map(key=>`${p}-character-${key}`).sort())
 for(const key of ['panchaud','brujon','boulatruelle'])expect(members.find(row=>row.characterId===`${p}-character-${key}`)).toMatchObject({role:'Named associate',startEventId:`${p}-event-200-2`})
 expect(members.some(row=>row.characterId===`${p}-character-thenardier`)).toBe(false)
})

test('distinguishes actual association members from a visitor and a pupil from a gardener',()=>{
 const{world}=buildWorldReview({embedded:false})
 const abc=world.factionMemberships.filter((m:any)=>m.factionId===`${p}-faction-friends-abc`)
 expect(abc).toHaveLength(9)
 expect(abc.some((m:any)=>m.characterId===`${p}-character-grantaire`)).toBe(true)
 expect(abc.some((m:any)=>m.characterId===`${p}-character-marius`)).toBe(false)
 const pupil=world.factionMemberships.find((m:any)=>m.factionId===`${p}-faction-petit-picpus`&&m.characterId===`${p}-character-cosette`)
 const gardener=world.factionMemberships.find((m:any)=>m.factionId===pupil.factionId&&m.characterId===`${p}-character-valjean`)
 expect(pupil.role).toBe('Pupil')
 expect(gardener.role).toContain('cover name')
 expect(gardener.notes).toContain('not a second biological identity')
})

test('scopes intentions to their actual episodes and closes the political thread at its final resistance',()=>{
 const{world}=buildWorldReview({embedded:false})
 expect(world.characterGoals).toHaveLength(17)
 expect(world.characterGoals.every((g:any)=>['want','need','fear','flaw'].includes(g.type))).toBe(true)
 const flaw=world.characterGoals.find((g:any)=>g.id===`${p}-goal-law-as-the-whole-man`)
 expect(flaw.endEventId).toBe(`${p}-event-341-3`)
 const objective=world.characterGoals.find((g:any)=>g.id===`${p}-goal-marriage-permission`)
 expect(objective.text).toContain('during this visit')
 const thread=world.plotThreads.find((t:any)=>t.id===`${p}-thread-republican-company`)
 expect(thread.resolvedEventId).toBe(`${p}-event-321-4`)
 for(const t of world.plotThreads)expect(world.events.find((e:any)=>e.id===t.resolvedEventId).threadIds).toContain(t.id)
 const threadIds=new Set(world.plotThreads.map((t:any)=>t.id)),motifIds=new Set(world.motifs.map((m:any)=>m.id))
 expect(world.events.every((e:any)=>e.threadIds.every((id:string)=>threadIds.has(id))&&e.motifIds.every((id:string)=>motifIds.has(id)))).toBe(true)
})
