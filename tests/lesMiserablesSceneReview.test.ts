import fs from 'node:fs'
import { expect, test } from 'vitest'
import { chapters } from '../scripts/les-miserables/source-text.mjs'
import { reviewedChapters } from '../scripts/les-miserables/reviewed-scenes.mjs'
import { validateSceneReview } from '../scripts/les-miserables/validate-scene-review.mjs'

test('records boundary review of all 365 chapters', () => {
  expect(validateSceneReview()).toEqual({ reviewedChapters: 365, reviewedScenes: 1535, remainingChapters: 0 })
})

test('separates the final grave, dated letter and complete endnotes from fictional scenes', () => {
  const ending = reviewedChapters.get(365)
  expect(ending.map(row => row.at)).toEqual(['start', 5, 25])
  expect(ending[0].reason).toMatch(/hand that wrote.*unidentified/)
  expect(ending.slice(1).every(row => row.kind === 'apparatus' && row.present.length === 0)).toBe(true)
  expect(ending[1].timeHint).toMatch(/1862.*outside narrative time/)
  expect(ending[2].reason).toMatch(/Note 56 spans paragraphs 81–83/)
  expect(ending.flatMap(row => row.stateChanges ?? [])).toEqual([])
  const staged = JSON.parse(fs.readFileSync(new URL('../scripts/les-miserables/BOUNDARY_REVIEW.json', import.meta.url), 'utf8'))
  expect(staged.boundaryReviewComplete).toBe(true)
  expect(staged.releaseComplete).toBe(false)
})

test('resolves the rescue by evidence and places Valjean’s death after his last speech', () => {
  expect(reviewedChapters.get(355).find(row => row.at === 22).reason).toMatch(/mistaken conclusion about Javert/)
  expect(reviewedChapters.get(357)[0].reason).toMatch(/probable, not witnessed/)
  expect(reviewedChapters.get(358).find(row => row.at === 60).reason).toMatch(/not a verified departure/)
  expect(reviewedChapters.get(360)[0].reason).toMatch(/does not establish theft/)
  expect(reviewedChapters.get(362).find(row => row.at === 14).kind).toBe('document')
  const revelations = reviewedChapters.get(363)
  expect(revelations.find(row => row.at === 132).reason).toMatch(/Marius’s false reconstruction/)
  expect(revelations.find(row => row.at === 166).reason).toMatch(/living Marius/)
  expect(revelations.find(row => row.at === 189).items).toContain('marius-torn-coat-fragment')
  expect(revelations.find(row => row.at === 204).reason).toMatch(/jump forward two days/)
  expect(revelations.find(row => row.at === 207).reason).toMatch(/return to the same evening/)
  expect(revelations.find(row => row.at === 214).reason).toMatch(/actual departure/)
  const reunion = reviewedChapters.get(364)
  expect(reunion.find(row => row.at === 92).present.map(row => row[0])).not.toContain('myriel')
  expect(reunion.flatMap(row => row.stateChanges ?? [])).toEqual([
    { character: 'valjean', isAlive: false, evidenceParagraph: 124 },
  ])
  expect(reunion.find(row => row.at === 112).reason).toMatch(/whole final speech/)
})

test('keeps the wedding cover stories and private confession from becoming false character facts', () => {
  expect(reviewedChapters.get(346)[0].identityReveals[0]).toMatchObject({
    identity: 'montfermeil-treasure-digger', character: 'valjean', evidenceParagraph: 0, audience: 'reader',
  })
  expect(reviewedChapters.get(347).find(row => row.at === 7).reason).toMatch(/not Cosette’s biological father/)
  expect(reviewedChapters.get(348).find(row => row.at === 6).reason).toMatch(/mistaken belief/)
  expect(reviewedChapters.get(349).find(row => row.at === 8).reason).toMatch(/in absentia, not an execution/)
  for (const number of [350, 351, 352, 353, 354]) {
    expect(reviewedChapters.get(number).flatMap(row => row.stateChanges ?? []).some(change => change.injury || change.isAlive === false)).toBe(false)
  }
  expect(reviewedChapters.get(351).find(row => row.at === 31).present.map(row => row[0])).not.toContain('valjean')
  const confession = reviewedChapters.get(354)
  expect(confession.find(row => row.at === 27).reason).toMatch(/there was never an injury/)
  expect(confession.find(row => row.at === 92).reason).toMatch(/not knowledge of the confession/)
  expect(confession.find(row => row.at === 156).present.map(row => row[0])).not.toContain('cosette')
  expect(confession.find(row => row.at === 168).reason).toMatch(/replace it with daily evening visits/)
})

test('keeps mistaken deaths, the intercepted fragment and the recovery chronology distinct', () => {
  expect(reviewedChapters.get(336).find(row => row.at === 43).items).toEqual(['marius-torn-coat-fragment'])
  expect(reviewedChapters.get(337).find(row => row.at === 15).reason).toMatch(/assessment is contradicted/)
  expect(reviewedChapters.get(340).find(row => row.at === 31).present[0][1]).toMatch(/Opens his eyes/)
  expect(reviewedChapters.get(341).find(row => row.at === 62).kind).toBe('document')
  expect(reviewedChapters.get(341).find(row => row.at === 78).stateChanges[0].isAlive).toBe(false)
  expect(reviewedChapters.get(343).find(row => row.at === 4).reason).toMatch(/source inconsistency/)
  expect(reviewedChapters.get(344).find(row => row.at === 13).reason).toMatch(/has not yet arrived/)
})

test('preserves the ten-chapter sewer checkpoint’s chronology and actual route', () => {
  expect(reviewedChapters.get(326)[0].reason).toMatch(/genuinely untitled/)
  expect(reviewedChapters.get(328).find(row => row.at === 2).reason).toMatch(/must not create escape routes/)
  expect(reviewedChapters.get(329).find(row => row.at === 16).reason).toMatch(/mistaken belief/)
  expect(reviewedChapters.get(330).find(row => row.at === 12).reason).toMatch(/Neither Valjean nor Marius is struck/)
  expect(reviewedChapters.get(331).every(row => !row.identityReveals)).toBe(true)
  expect(reviewedChapters.get(332).find(row => row.at === 9).reason).toMatch(/confirm life/)
  expect(reviewedChapters.get(333).find(row => row.at === 1).kind).toBe('exposition')
  expect(reviewedChapters.get(334).find(row => row.at === 7).reason).toMatch(/complete the crossing/)
})

test('keeps the sewer essay’s proposed works and historical phantoms out of the fugitives’ route', () => {
  for (const number of [323, 324]) {
    expect(reviewedChapters.get(number).every(row => row.kind === 'exposition' && row.present.length === 0)).toBe(true)
  }
  expect(reviewedChapters.get(323).find(row => row.at === 25).reason).toMatch(/distinguish catacombs/)
  expect(reviewedChapters.get(324)[0].reason).toMatch(/not a measured blueprint/)
  expect(reviewedChapters.get(324).find(row => row.at === 7).reason).toMatch(/not an actual assembly underground/)
})

test('identifies the rescue without treating the unconscious burden as dead or the descent as final escape', () => {
  const rows = reviewedChapters.get(322)
  expect(rows[0].reason).toMatch(/not military detention/)
  expect(rows.find(row => row.at === 4).reason).toMatch(/apparent spatial tension/)
  expect(rows.find(row => row.at === 12).reason).toMatch(/not a magically created opening/)
  expect(rows.find(row => row.at === 15).reason).toMatch(/not escape to the open air/)
  expect(rows.find(row => row.at === 15).present.map(row => row[0])).toEqual(['valjean', 'marius'])
})

test('preserves the unidentified hand and confirms the two final executions', () => {
  const rows = reviewedChapters.get(320)
  expect(rows.find(row => row.at === 4).reason).toMatch(/not confirmation of custody/)
  expect(rows.find(row => row.at === 13).reason).toMatch(/aquafortis, not wine/)
  const end = reviewedChapters.get(321)
  expect(end.find(row => row.at === 15).reason).toMatch(/preserve Grantaire’s survival/)
  expect(end.find(row => row.at === 23).stateChanges.map(row => row.character)).toEqual(['enjolras', 'grantaire'])
  expect(end.find(row => row.at === 31).reason).toMatch(/Capture is now complete/)
})

test('records four explicit deaths without killing the wounded Marius or unstruck Enjolras', () => {
  const rows = reviewedChapters.get(319)
  expect(rows.find(row => row.at === 26).stateChanges.map(row => row.character)).toEqual(['bossuet', 'feuilly', 'courfeyrac', 'combeferre'])
  expect(rows.find(row => row.at === 26).stateChanges.every(row => row.isAlive === false)).toBe(true)
  const ending = rows.find(row => row.at === 27)
  expect(ending.stateChanges[0].injury).toMatch(/continues fighting/)
  expect(ending.reason).toMatch(/leave Enjolras unstruck/)
})

test('keeps the progress interlude expository without reversing Javert’s release', () => {
  const rows = reviewedChapters.get(318)
  expect(rows.every(row => row.kind === 'exposition' && row.present.length === 0)).toBe(true)
  expect(rows.find(row => row.at === 19).reason).toMatch(/does not reverse Javert’s actual release/)
  expect(rows.find(row => row.at === 44).reason).toMatch(/not a new scene or completed resolution/)
})

test('keeps Javert’s actual release separate from Marius’s incomplete view', () => {
  const rows = reviewedChapters.get(317)
  expect(rows.find(row => row.at === 14).reason).toMatch(/free the prisoner rather than stab/)
  expect(rows.find(row => row.at === 19).reason).toMatch(/do not hear this private exchange/)
  expect(rows.find(row => row.at === 28).reason).toMatch(/explicitly into the air/)
  expect(rows.find(row => row.at === 37).reason).toMatch(/not a second departure or shot/)
  expect(rows.every(row => !row.stateChanges?.some(change => change.character === 'javert' && change.isAlive === false))).toBe(true)
})

test('completes ammunition recovery and keeps Javert alive when Valjean claims him', () => {
  const recovery = reviewedChapters.get(315)[0]
  expect(recovery.stateChanges[0].character).toBe('marius')
  expect(recovery.items).toEqual(['gavroche-cartridge-basket'])
  expect(reviewedChapters.get(315).find(row => row.at === 6).reason).toMatch(/refuses the cartridges/)
  const rows = reviewedChapters.get(316)
  expect(rows.find(row => row.at === 21).reason).toMatch(/not twenty-six total people alive/)
  expect(rows.find(row => row.at === 33).reason).toMatch(/do not kill Javert/)
})

test('keeps the brothers alive without resolving their lost route or merging the bourgeois pair', () => {
  const rows = reviewedChapters.get(314)
  expect(rows[0].present.map(row => row[0])).toEqual(['thenardier-younger-boy', 'thenardier-youngest-boy'])
  expect(rows[0].reason).toMatch(/alternative speculation/)
  expect(rows.find(row => row.at === 19).reason).toMatch(/only perhaps/)
  expect(rows.find(row => row.at === 29).reason).toMatch(/not verified events/)
  expect(rows.find(row => row.at === 69).reason).toMatch(/does not fall into the water/)
})

test('distinguishes Gavroche’s first wound from the fatal shot and leaves the basket outside', () => {
  const rows = reviewedChapters.get(313)
  expect(rows.find(row => row.at === 34).stateChanges[0].injury).toMatch(/still conscious and singing/)
  const ending = rows.find(row => row.at === 38)
  expect(ending.stateChanges).toEqual([{ character: 'gavroche', isAlive: false, evidenceParagraph: 38 }])
  expect(ending.reason).toMatch(/marksman remains unnamed/)
  expect(ending.reason).toMatch(/basket has yet been carried back/)
})

test('keeps Patria figurative and the two artillery positions distinct', () => {
  expect(reviewedChapters.get(311).find(row => row.at === 6).reason).toMatch(/does not become the promised general rising/)
  const rows = reviewedChapters.get(312)
  expect(rows[0].reason).toMatch(/not a woman physically present/)
  expect(rows.find(row => row.at === 6).reason).toMatch(/two guns at Chanvrerie from two at Saint-Merry/)
  expect(rows.find(row => row.at === 20).reason).toMatch(/without individually distinguishing dead from wounded/)
})

test('preserves the two spared observers and the cause of Fannicot’s death', () => {
  const helmets = reviewedChapters.get(309).find(row => row.at === 7)
  expect(helmets.present.map(row => row[0])).toEqual(['valjean', 'chanvrerie-rooftop-fireman', 'chanvrerie-rooftop-officer'])
  expect(helmets.reason).toMatch(/no killing/)
  expect(helmets.stateChanges).toBeUndefined()
  const charge = reviewedChapters.get(310).find(row => row.at === 9)
  expect(charge.reason).toMatch(/killed by the supporting cannon/)
  expect(charge.reason).toMatch(/not proof of deliberate execution/)
})

test('records the mattress protection without granting Cosette knowledge of the cannon fire', () => {
  const shots = reviewedChapters.get(307).find(row => row.at === 7)
  expect(shots.reason).toMatch(/two shots at ropes/)
  expect(reviewedChapters.get(307).find(row => row.at === 21).reason).toMatch(/not destroyed or permanently silenced/)
  const hearing = reviewedChapters.get(308).find(row => row.at === 16)
  expect(hearing.present.map(row => row[0])).toEqual(['cosette'])
  expect(hearing.reason).toMatch(/gains no knowledge of the battle/)
})

test('closes the escape route, completes Gavroche’s return and records the artillery death', () => {
  expect(reviewedChapters.get(305)[0].reason).toMatch(/actually close the route/)
  expect(reviewedChapters.get(305).find(row => row.at === 27).reason).toMatch(/complete his return/)
  const rows = reviewedChapters.get(306)
  expect(rows[0].reason).toMatch(/porter account a lie/)
  expect(rows.find(row => row.at === 19).reason).toMatch(/all unnamed/)
  expect(rows.find(row => row.at === 28).stateChanges).toEqual([{ character: 'chanvrerie-young-artillery-sergeant', isAlive: false, evidenceParagraph: 37 }])
})

test('completes the five departures and keeps Javert’s recognition private', () => {
  expect(reviewedChapters.get(303).find(row => row.at === 2).reason).toMatch(/his vision, not established future facts/)
  const rows = reviewedChapters.get(304)
  expect(rows.find(row => row.at === 6).reason).toMatch(/complete departure/)
  expect(rows.find(row => row.at === 8).reason).toMatch(/distinct from Mabeuf’s/)
  expect(rows.find(row => row.at === 18).present.map(row => row[0])).toEqual(['javert', 'valjean'])
  expect(rows.find(row => row.at === 18).reason).toMatch(/no spoken explanation/)
})

test('records Valjean’s fifth uniform without granting Marius the convict identity or completing escape', () => {
  const rows = reviewedChapters.get(302)
  expect(rows.find(row => row.at === 22).reason).toMatch(/not yet departed/)
  const arrival = rows.find(row => row.at === 50)
  expect(arrival.present.map(row => row[0])).toContain('valjean')
  expect(arrival.reason).toMatch(/not the convict identity/)
  expect(rows.find(row => row.at === 57).reason).toMatch(/not the five men’s completed escape/)
})

test('distinguishes completed repairs and refuge from hopeful predictions and the proposed height', () => {
  const rows = reviewedChapters.get(300)
  expect(rows.find(row => row.at === 6).reason).toMatch(/confirm the women’s departure/)
  expect(rows.find(row => row.at === 15)).toMatchObject({ kind: 'scene', location: 'chanvrerie-barricade' })
  expect(chapters[299].paragraphs[16].text).toContain('attached to this staff')
  expect(rows.find(row => row.at === 26).reason).toMatch(/Prouvaire among the dead/)
  expect(reviewedChapters.get(301)[0].reason).toMatch(/predictions/)
  expect(reviewedChapters.get(301).find(row => row.at === 8).reason).toMatch(/not a finished measurement/)
})

test('keeps the 1848 barricades and their later biographies outside the 1832 cast', () => {
  const rows = reviewedChapters.get(299)
  expect(rows.every(row => row.kind === 'exposition' && row.present.length === 0)).toBe(true)
  expect(rows.find(row => row.at === 10).reason).toMatch(/must not replace Chanvrerie’s measurements/)
  expect(rows.find(row => row.at === 26).reason).toMatch(/Cournet is distinct from Courfeyrac/)
  expect(rows.find(row => row.at === 31).reason).toMatch(/still later than the 1848/)
})

test('ends Volume IV with Valjean departing and Gavroche escaping rather than the cart owner', () => {
  const departure = reviewedChapters.get(297).find(row => row.at === 7)
  expect(departure.reason).toMatch(/not arrival at the barricade/)
  const rows = reviewedChapters.get(298)
  expect(rows.find(row => row.at === 33).reason).toMatch(/No person is said to be killed/)
  expect(rows.find(row => row.at === 55).reason).toMatch(/not proof of arrival/)
  expect(rows.find(row => row.at === 68).reason).toMatch(/owner’s arrest/)
  expect(rows.find(row => row.at === 68).reason).toMatch(/final marker closes Volume IV/)
})

test('separates the blotting impression from the original note and delivery to Valjean from Cosette', () => {
  const reflection = reviewedChapters.get(295).find(row => row.at === 18)
  expect(reflection.items).toEqual(['cosette-blotting-book'])
  expect(reflection.reason).toMatch(/no recipient’s name/)
  const rows = reviewedChapters.get(296)
  expect(rows.find(row => row.at === 20).reason).toMatch(/one coin/)
  expect(rows.find(row => row.at === 36).reason).toMatch(/not to Cosette/)
  expect(rows.find(row => row.at === 64).reason).toMatch(/not said to follow/)
})

test('resolves the warning sender and keeps the two outgoing documents and delivery schedules distinct', () => {
  const rows = reviewedChapters.get(294)
  expect(rows.find(row => row.at === 9).identityReveals[0].identity).toBe('champ-de-mars-warning-figure')
  expect(rows.find(row => row.at === 11).items).toEqual(['marius-farewell-letter-to-cosette', 'marius-body-return-pocketbook'])
  expect(rows.find(row => row.at === 18).reason).toMatch(/estimates, not guaranteed/)
  expect(rows.find(row => row.at === 33).reason).toMatch(/delivery and return have not happened/)
})

test('resolves Éponine’s disguise and wound before recording her explicit death', () => {
  expect(reviewedChapters.get(292).find(row => row.at === 20).reason).toMatch(/do not execute Javert/)
  const rows = reviewedChapters.get(293)
  expect(rows[0].identityReveals.map(row => row.identity)).toContain('plumet-barricade-message-figure')
  expect(rows.find(row => row.at === 19).stateChanges[0].injury).toMatch(/exiting through her back/)
  expect(rows.find(row => row.at === 70).items).toEqual(['eponine-withheld-letter-for-marius'])
  expect(rows.find(row => row.at === 75).stateChanges).toEqual([{ character: 'eponine', isAlive: false, evidenceParagraph: 83 }])
})

test('records Bahorel’s death, the unloaded gun and the uncertain extent of the visitor’s wound', () => {
  const fall = reviewedChapters.get(290).find(row => row.at === 8)
  expect(fall.stateChanges).toEqual([{ character: 'bahorel', isAlive: false, evidenceParagraph: 8 }])
  expect(fall.reason).toMatch(/gun is unloaded/)
  const rows = reviewedChapters.get(291)
  expect(rows[0].reason).toMatch(/not two additional shots/)
  expect(rows.find(row => row.at === 3).stateChanges[0].injury).toMatch(/further wound remains uncertain/)
  expect(rows.find(row => row.at === 13).reason).toMatch(/does not ignite the powder/)
  expect(rows.find(row => row.at === 21).reason).toMatch(/not the defeat of the entire army/)
})

test('confirms Gavroche’s gun and Mabeuf’s death while limiting the private correction', () => {
  expect(reviewedChapters.get(288)[0].items).toEqual(['javert-captured-musket'])
  expect(reviewedChapters.get(288).find(row => row.at === 17).stateChanges).toBeUndefined()
  const rows = reviewedChapters.get(289)
  expect(rows.find(row => row.at === 18).reason).toMatch(/restrict the correction to Enjolras/)
  expect(rows.find(row => row.at === 22).stateChanges).toEqual([
    { character: 'mabeuf', isAlive: false, evidenceParagraph: 25 },
  ])
})

test('keeps Marius outside during his debate and the porter dead at the window', () => {
  expect(reviewedChapters.get(286).every(row => row.kind === 'exposition')).toBe(true)
  const rows = reviewedChapters.get(287)
  expect(rows[0].reason).toMatch(/remains outside/)
  expect(rows.find(row => row.at === 12).reason).toMatch(/his inference, not her stated wish/)
  const body = rows.find(row => row.at === 18)
  expect(body.present.map(row => row[0])).toEqual(['marius'])
  expect(body.reason).toMatch(/not restored life/)
})

test('records the two killings without converting police tradition into a certain identity', () => {
  const rows = reviewedChapters.get(284)
  expect(rows.find(row => row.at === 7).stateChanges[0].isAlive).toBe(false)
  expect(rows.find(row => row.at === 27).stateChanges[0].character).toBe('le-cabuc')
  expect(rows.find(row => row.at === 55).identityReveals).toBeUndefined()
  expect(rows.find(row => row.at === 55).reason).toMatch(/qualified identification/)
  expect(reviewedChapters.get(285).find(row => row.at === 13).reason).toMatch(/wandered alive/)
  expect(reviewedChapters.get(285).find(row => row.at === 14).reason).toMatch(/not Marius/)
})

test('keeps the poem embedded and reveals Javert at his explicit naming without executing him', () => {
  expect(reviewedChapters.get(282).find(row => row.at === 4).kind).toBe('document')
  const rows = reviewedChapters.get(283)
  expect(rows[0].present.map(row => row[0])).toContain('unknown-gray-haired-recruit')
  expect(rows.find(row => row.at === 13).identityReveals).toEqual([
    { identity: 'unknown-gray-haired-recruit', character: 'javert', evidenceParagraph: 20, audience: 'reader' },
  ])
  expect(rows.find(row => row.at === 26).reason).toMatch(/keep Javert alive/)
  expect(rows.find(row => row.at === 39).reason).toMatch(/does not receive it/)
})

test('preserves the redoubt’s two exits and reveals the coffer only when opened', () => {
  const work = reviewedChapters.get(280)
  expect(work.find(row => row.at === 10).reason).toMatch(/no destination or identity/)
  expect(work.find(row => row.at === 17).reason).toMatch(/do not grant Gavroche a gun/)
  const prep = reviewedChapters.get(281)
  expect(prep[0].reason).toMatch(/distinct exits/)
  expect(prep.find(row => row.at === 5).items).toEqual(['courfeyrac-barricade-coffer'])
  expect(prep.find(row => row.at === 5).reason).toMatch(/contents as cartridges/)
  expect(prep.find(row => row.at === 9).reason).toMatch(/Loading is not firing/)
})

test('distinguishes barricade materials, released horses and Grantaire’s sleep', () => {
  const rows = reviewedChapters.get(279)
  expect(rows.find(row => row.at === 5).reason).toMatch(/lime, not gunpowder/)
  expect(rows.find(row => row.at === 7).reason).toMatch(/not killed or left trapped/)
  const sleep = rows.find(row => row.at === 20)
  expect(sleep.reason).toMatch(/explicit sleep/)
  expect(sleep.stateChanges).toBeUndefined()
  expect(sleep.present.find(row => row[0] === 'grantaire')[1]).toMatch(/in sleep/)
})

test('keeps Navet distinct from Gavroche and site selection distinct from construction', () => {
  const rows = reviewedChapters.get(278)
  const messenger = rows.find(row => row.at === 41)
  expect(messenger.present.map(row => row[0])).toContain('navet')
  expect(messenger.present.map(row => row[0])).not.toContain('gavroche')
  expect(rows.find(row => row.at === 69).reason).toMatch(/not consumed/)
  expect(rows.find(row => row.at === 24).reason).toMatch(/June 4 despite the explicit June 5/)
  expect(rows.find(row => row.at === 86).reason).toMatch(/not a completed barricade/)
})

test('keeps the new recruits unnamed and Corinthe’s later demolition outside the action', () => {
  const rows = reviewedChapters.get(276)
  expect(rows[0].identityReveals).toBeUndefined()
  expect(rows.find(row => row.at === 5).present.map(row => row[0])).toContain('courfeyrac-marius-seeking-visitor')
  expect(rows.find(row => row.at === 34).reason).toMatch(/unspecified friend/)
  const history = reviewedChapters.get(277)
  expect(history.every(row => row.kind === 'exposition' && row.present.length === 0)).toBe(true)
  expect(history.find(row => row.at === 13).reason).toMatch(/must not remove Corinthe from the 1832 map/)
  expect(history.find(row => row.at === 20).reason).toMatch(/not alive in the forthcoming/)
})

test('keeps Mabeuf’s recruitment retrospective and the regicide story a rumor', () => {
  expect(reviewedChapters.get(274).find(row => row.at === 20).present.map(row => row[0])).toContain('mabeuf')
  const rows = reviewedChapters.get(275)
  expect(rows[0].reason).toMatch(/not a second recruitment/)
  expect(rows.find(row => row.at === 12).reason).toMatch(/crowd’s inventions/)
  expect(rows.find(row => row.at === 12).reason).toMatch(/not weapons accepted/)
  expect(rows.find(row => row.at === 14).present.map(row => row[0])).toEqual(['gavroche'])
})

test('records Gavroche’s assistance and the barber’s pebble without turning rhetoric into injury', () => {
  const help = reviewedChapters.get(272)[0]
  expect(help.present.map(row => row[0])).toContain('gavroche-fallen-national-guard-lancer')
  expect(help.items).toEqual(['gavroche-triggerless-pistol'])
  expect(reviewedChapters.get(272).find(row => row.at === 41).reason).toMatch(/No shot is discharged/)
  const stone = reviewedChapters.get(273).find(row => row.at === 15)
  expect(stone.reason).toMatch(/not artillery fire/)
  expect(stone.present.map(row => row[0])).toContain('orme-saint-gervais-barber')
  expect(stone.stateChanges).toBeUndefined()
})

test('keeps the later cocoa seller out of June 1832 and the lost boys’ fate unresolved', () => {
  expect(reviewedChapters.get(270).find(row => row.at === 11).reason).toMatch(/1831 and 1839/)
  const rows = reviewedChapters.get(271)
  expect(rows.find(row => row.at === 1).items).toEqual(['gavroche-triggerless-pistol'])
  const boys = rows.find(row => row.at === 9)
  expect(boys.reason).toMatch(/confirms the previously intended return/)
  expect(boys.reason).toMatch(/alternatives, not established fates/)
  expect(boys.stateChanges).toBeUndefined()
  expect(rows.find(row => row.at === 10).reason).toMatch(/No cake is bought or eaten/)
})

test('keeps the citywide outbreak simultaneous and the author’s recollection separate from the cast', () => {
  const rows = reviewedChapters.get(269)
  expect(rows.find(row => row.at === 9).reason).toMatch(/simultaneously despite sequential narration/)
  const observer = rows.find(row => row.at === 16)
  expect(observer.reason).toMatch(/observer as the author/)
  expect(observer.present).toEqual([])
  expect(rows.find(row => row.at === 17).reason).toMatch(/different streets/)
})

test('preserves the funeral’s competing reports without assigning the opening shots', () => {
  expect(reviewedChapters.get(267).every(row => row.kind === 'exposition')).toBe(true)
  const rows = reviewedChapters.get(268)
  expect(rows.find(row => row.at === 10).reason).toMatch(/conflicting accounts/)
  const shots = rows.find(row => row.at === 13)
  expect(shots.reason).toMatch(/kill Cholet and an unnamed deaf woman/)
  expect(shots.reason).toMatch(/do not invent a shooter/)
  expect(shots.present).toEqual([])
  expect(rows.find(row => row.at === 15).reason).toMatch(/without identifying it as the Rue de la Chanvrerie/)
})

test('tracks Mabeuf’s surrendered purse and last sale without inventing relief or a barricade arrival', () => {
  const rows = reviewedChapters.get(265)
  expect(rows[0].items).toEqual(['mabeuf-lane-gift-purse'])
  expect(rows[0].reason).toMatch(/does not know Gavroche/)
  expect(rows.find(row => row.at === 14).reason).toMatch(/not shown/)
  expect(rows.find(row => row.at === 15).reason).toMatch(/not yet reached it/)
  for (const row of reviewedChapters.get(266)) {
    expect(row.kind).toBe('exposition')
    expect(row.present).toEqual([])
  }
})

test('keeps the warning and barricade messengers unresolved and retains the loaded signal pistols', () => {
  const inscription = reviewedChapters.get(263).find(row => row.at === 9)
  expect(inscription.items).toEqual(['marius-courfeyrac-address-inscription'])
  expect(inscription.reason).toMatch(/does not identify Marius/)
  expect(reviewedChapters.get(263).find(row => row.at === 22).identityReveals).toBeUndefined()
  const pistols = reviewedChapters.get(264).find(row => row.at === 6)
  expect(pistols.items).toEqual(['javert-signal-pistols'])
  expect(pistols.reason).toMatch(/without a shot fired/)
  const voice = reviewedChapters.get(264).find(row => row.at === 11)
  expect(voice.present.map(row => row[0])).not.toContain('eponine')
  expect(voice.mentioned).toContain('eponine')
})

test('preserves Gillenormand’s disputed date, unaccepted offer and survival after the quarrel', () => {
  const rows = reviewedChapters.get(262)
  expect(rows.find(row => row.at === 25).timeHint).toMatch(/June 24.*conflict/)
  expect(rows.find(row => row.at === 99).reason).toMatch(/not shown taking it/)
  expect(rows.find(row => row.at === 117).reason).toMatch(/do not marry the lovers/)
  const ending = rows.find(row => row.at === 121)
  expect(ending.reason).toMatch(/no death is established/)
  expect(ending.stateChanges).toBeUndefined()
})

test('synchronizes the departure conversation with the gate and preserves its conditional plans', () => {
  expect(reviewedChapters.get(260)[0].kind).toBe('exposition')
  const rows = reviewedChapters.get(261)
  expect(rows[0].reason).toMatch(/overlapping the gate scene/)
  expect(rows[0].present.map(row => row[0])).toEqual(['cosette', 'marius'])
  expect(rows.find(row => row.at === 13).reason).toMatch(/not a fixed sailing date/)
  expect(rows.find(row => row.at === 66).items).toEqual(['marius-courfeyrac-address-inscription'])
  expect(rows.find(row => row.at === 86).reason).toMatch(/lips actually meet/)
  expect(rows.find(row => row.at === 94).reason).toMatch(/not named here/)
})

test('records the thwarted burglary without carrying out threats or identifying the unknown gate', () => {
  const rows = reviewedChapters.get(259)
  expect(rows[0].timeHint).toBe('June 3, 1832, nightfall')
  expect(rows.find(row => row.at === 21).present.map(row => row[0])).toContain('claquesous')
  const persuasion = rows.find(row => row.at === 32)
  expect(persuasion.present.find(row => row[0] === 'toussaint')[1]).toMatch(/attic/)
  expect(persuasion.reason).toMatch(/not among the speakers at the gate/)
  expect(rows.find(row => row.at === 69).reason).toMatch(/not an actual police call/)
  expect(rows.find(row => row.at === 121).reason).toMatch(/key unidentified/)
})

test('limits the garden disclosures and does not turn the epidemic into individual illness', () => {
  const names = reviewedChapters.get(256).find(row => row.at === 9)
  expect(names.present.map(row => row[0])).toEqual(['cosette', 'marius'])
  expect(reviewedChapters.get(256).find(row => row.at === 19).reason).toMatch(/does not tell the garter story/)
  const disclosures = reviewedChapters.get(257)[0]
  expect(disclosures.reason).toMatch(/Neither is said to contract cholera/)
  expect(disclosures.stateChanges).toBeUndefined()
  expect(reviewedChapters.get(257).find(row => row.at === 1).reason).toMatch(/withholds this history from Cosette/)
  expect(reviewedChapters.get(258)[0].reason).toMatch(/deny knowledge to Valjean and Toussaint/)
  expect(reviewedChapters.get(258).find(row => row.at === 13).present.map(row => row[0])).toEqual(['courfeyrac', 'marius'])
  expect(reviewedChapters.get(258).find(row => row.at === 24).present.map(row => row[0])).toEqual(['marius', 'eponine'])
})

test('keeps the argot interlude’s metaphors and historical illustrations outside physical cast', () => {
  for (const number of [252, 253, 254, 255]) {
    for (const row of reviewedChapters.get(number)) {
      expect(row.kind).toBe('exposition')
      expect(row.present).toEqual([])
      expect(row.stateChanges).toBeUndefined()
    }
  }
  expect(reviewedChapters.get(253).find(row => row.at === 18).reason).toMatch(/not medical findings or deaths/)
  expect(reviewedChapters.get(254).find(row => row.at === 9).reason).toMatch(/1848 example later than the main action/)
})

test('preserves the unexplained escape route and the unequal recognition of father and son', () => {
  const rows = reviewedChapters.get(251)
  expect(rows.find(row => row.at === 23).reason).toMatch(/drugged, not killed/)
  expect(rows.find(row => row.at === 29).reason).toMatch(/actual route unknown/)
  const rescue = rows.find(row => row.at === 108)
  expect(rescue.present.find(row => row[0] === 'gavroche')[1]).toMatch(/Recognizes his father/)
  expect(rescue.identityReveals).toBeUndefined()
  expect(rows.find(row => row.at === 123).reason).toMatch(/not a completed waking scene/)
})

test('distinguishes the substituted children and preserves their shelter through Gavroche’s departure', () => {
  expect(reviewedChapters.get(249)[0].reason).toMatch(/Magnon’s two biological sons/)
  const bread = reviewedChapters.get(250).find(row => row.at === 44)
  expect(bread.present.map(row => row[0])).toContain('thenardier-youngest-boy')
  const rats = reviewedChapters.get(250).find(row => row.at === 289)
  expect(rats.reason).toMatch(/outside the intact net/)
  const departure = reviewedChapters.get(250).find(row => row.at === 325)
  expect(departure.present.map(row => row[0])).toEqual(['montparnasse', 'gavroche'])
  expect(departure.mentioned).toContain('thenardier-younger-boy')
})

test('keeps the notebook as a document and confirms the garden visits before the exchange of names', () => {
  expect(reviewedChapters.get(246)[0].kind).toBe('document')
  expect(reviewedChapters.get(246)[0].present).toEqual([])
  const admission = reviewedChapters.get(248).find(row => row.at === 16)
  expect(admission.reason).toMatch(/resolve the garden footsteps/)
  expect(admission.stateChanges).toBeUndefined()
  const names = reviewedChapters.get(248).find(row => row.at === 33)
  expect(names.present.map(row => row[0])).toEqual(['marius', 'cosette'])
  expect(names.reason).toMatch(/not proof of disclosed convict history/)
})

test('preserves the purse transfers and distinguishes the gift from the failed robbery', () => {
  const gift = reviewedChapters.get(242).find(row => row.at === 66)
  const theft = reviewedChapters.get(242).find(row => row.at === 73)
  expect(gift.items).toEqual(['mabeuf-lane-gift-purse'])
  expect(theft.items).toEqual(gift.items)
  expect(gift.reason).toMatch(/freely given/)
  expect(theft.reason).toMatch(/not money falling from heaven/)
  expect(theft.present.map(row => row[0])).toContain('gavroche')
})

test('does not certify the reassuring chimney shadow as the earlier shadow’s cause', () => {
  const first = reviewedChapters.get(244).find(row => row.at === 13)
  expect(first.present.map(row => row[0])).toEqual(['cosette'])
  expect(first.identityReveals).toBeUndefined()
  const reassurance = reviewedChapters.get(244).find(row => row.at === 31)
  expect(reassurance.reason).toMatch(/does not prove the cause/)
  const aftermath = reviewedChapters.get(244).find(row => row.at === 37)
  expect(aftermath.reason).toMatch(/neither acceptance nor laughter resolves/)
})

test('preserves the reciprocal Luxembourg perspective without inventing a second first encounter', () => {
  expect(reviewedChapters.get(238).find(row => row.at === 8).reason).toMatch(/not a repeated approach/)
  expect(reviewedChapters.get(238).find(row => row.at === 10).reason).toMatch(/have not spoken/)
  const returnVisit = reviewedChapters.get(239).find(row => row.at === 19)
  expect(returnVisit.present.map(row => row[0])).not.toContain('marius')
  expect(returnVisit.reason).toMatch(/explicitly absent/)
})

test('dates the chain-gang encounter and does not erase Cosette’s memory after the festival', () => {
  expect(reviewedChapters.get(240).find(row => row.at === 7).timeHint).toBe('October 1831, daybreak')
  const questions = reviewedChapters.get(240).find(row => row.at === 23)
  expect(questions.reason).toMatch(/not her father’s history/)
  expect(questions.identityReveals).toBeUndefined()
  expect(reviewedChapters.get(240).find(row => row.at === 37).reason).toMatch(/disproves complete erasure/)
})

test('reveals the Luxembourg pair to the reader while preserving Cosette’s limited knowledge', () => {
  const rental = reviewedChapters.get(233).find(row => row.at === 5)
  expect(rental.identityReveals).toEqual([
    { identity: 'monsieur-leblanc', character: 'valjean', evidenceParagraph: 7, audience: 'reader' },
    { identity: 'mademoiselle-lanoire', character: 'cosette', evidenceParagraph: 7, audience: 'reader' },
  ])
  expect(rental.reason).toMatch(/not to Marius/)
  const mother = reviewedChapters.get(236).find(row => row.at === 27)
  expect(mother.reason).toMatch(/does not know her mother’s name/)
  expect(reviewedChapters.get(236).find(row => row.at === 35).present.map(row => row[0])).toEqual(['cosette', 'valjean'])
})

test('distinguishes later imprisonment from escape and shared courtyard access from freedom', () => {
  const aftermath = reviewedChapters.get(230)[0]
  expect(aftermath.reason).toMatch(/later seizure/)
  expect(aftermath.reason).toMatch(/connivance is conjectural/)
  expect(reviewedChapters.get(230).find(row => row.at === 7).reason).toMatch(/not release from prison/)
  expect(reviewedChapters.get(230).find(row => row.at === 23).reason).toMatch(/does not release their father/)
})

test('identifies the human garden helper only at confirmation and records refusal of the coin', () => {
  const watering = reviewedChapters.get(231).find(row => row.at === 14)
  expect(watering.present.map(row => row[0])).toEqual(['mabeuf', 'mabeuf-garden-helper'])
  expect(watering.identityReveals).toBeUndefined()
  expect(reviewedChapters.get(232).find(row => row.at === 8).identityReveals).toContainEqual(
    { identity: 'mabeuf-garden-helper', character: 'eponine', evidenceParagraph: 15, audience: 'reader' },
  )
  expect(reviewedChapters.get(232).find(row => row.at === 66).reason).toMatch(/refusal, not payment/)
})

test('separates the historical overview from the group’s assigned and observed actions', () => {
  for (let chapter = 223; chapter <= 227; chapter++) {
    for (const row of reviewedChapters.get(chapter)) expect(row.present).toEqual([])
  }
  const census = reviewedChapters.get(228)[0]
  expect(census.present.map(row => row[0])).not.toContain('marius')
  expect(census.mentioned).toContain('marius')
  expect(census.reason).toMatch(/not already completed/)
  const game = reviewedChapters.get(228).find(row => row.at === 46)
  expect(game.present.map(row => row[0])).toEqual(['enjolras', 'grantaire', 'richefeu-domino-opponent'])
  expect(game.stateChanges).toBeUndefined()
})

test('places the ambush disclosures at the stated names and preserves the false address', () => {
  const rows = reviewedChapters.get(220)
  expect(rows.find(row => row.at === 21).identityReveals).toContainEqual({ identity: 'jondrette', character: 'thenardier', evidenceParagraph: 26, audience: 'reader' })
  expect(rows.find(row => row.at === 270).identityReveals).toContainEqual({ identity: 'jondrette-elder-daughter', character: 'eponine', evidenceParagraph: 278, audience: 'reader' })
  expect(rows.find(row => row.at === 221).reason).toMatch(/No girl was collected/)
  expect(rows.find(row => row.at === 242).stateChanges[0].evidenceParagraph).toBe(249)
  expect(rows.find(row => row.at === 288).reason).toMatch(/fired none/)
})

test('keeps Éponine outside the initial police net and the victim’s escape separate from recognition', () => {
  const raid = reviewedChapters.get(221)
  expect(raid[0].reason).toMatch(/Éponine was absent/)
  expect(raid[0].identityReveals).toContainEqual({ identity: 'jondrette-younger-daughter', character: 'azelma', evidenceParagraph: 0, audience: 'reader' })
  expect(raid.find(row => row.at === 64).reason).toMatch(/not recognition/)
  expect(raid.find(row => row.at === 64).identityReveals).toBeUndefined()
})

test('discloses Javert at the end of the interview and keeps his signal as a plan', () => {
  const interview = reviewedChapters.get(214)
  expect(interview[0].present.map(row => row[0])).toContain('pontoise-substitute-inspector')
  expect(interview[0].identityReveals).toBeUndefined()
  expect(interview.find(row => row.at === 67).identityReveals).toEqual([
    { identity: 'pontoise-substitute-inspector', character: 'javert', evidenceParagraph: 68, audience: 'reader' },
  ])
  expect(interview.find(row => row.at === 26).items).toContain('javert-signal-pistols')
  expect(reviewedChapters.get(218).find(row => row.at === 20).reason).toMatch(/no direct sight/)
})

test('distinguishes the two inspections and returns the benefactor without his daughter', () => {
  const mirror = reviewedChapters.get(216).find(row => row.at === 38)
  expect(mirror.reason).toMatch(/does not discover/)
  const chairs = reviewedChapters.get(217).find(row => row.at === 26)
  expect(chairs.present.map(row => row[0])).toEqual(['marius', 'madame-jondrette'])
  expect(chairs.items).toContain('marius-two-chairs')
  expect(reviewedChapters.get(217).find(row => row.at === 9).items).toContain('marius-five-franc-gift')
  const arrival = reviewedChapters.get(218)[0]
  expect(arrival.items).toContain('leblanc-four-louis-relief')
  expect(arrival.present.map(row => row[0])).not.toContain('mademoiselle-lanoire')
})

test('separates the actual wound and donated coat from the staged explanation', () => {
  const wound = reviewedChapters.get(209).find(row => row.at === 15)
  expect(wound.reason).toMatch(/not a medical prognosis/)
  expect(wound.stateChanges).toBeUndefined()
  const coat = reviewedChapters.get(209).find(row => row.at === 35)
  expect(coat.items).toContain('leblanc-brown-greatcoat')
  expect(coat.reason).toMatch(/intentionally left/)
  expect(reviewedChapters.get(210).find(row => row.at === 5).reason).toMatch(/doubts that Marius heard/)
})

test('preserves the inaudible identity and keeps the daughters outside the private ambush discussion', () => {
  const whisper = reviewedChapters.get(212).find(row => row.at === 16)
  expect(whisper.identityReveals).toBeUndefined()
  expect(whisper.present.map(row => row[0])).toEqual(['jondrette', 'madame-jondrette'])
  const plan = reviewedChapters.get(212).find(row => row.at === 32)
  expect(plan.reason).toMatch(/no quarter is owed/)
  expect(plan.present.map(row => row[0])).toEqual(['jondrette', 'madame-jondrette'])
  const money = reviewedChapters.get(212).find(row => row.at === 55)
  expect(money.items).toContain('leblanc-five-franc-piece')
  expect(reviewedChapters.get(213).find(row => row.at === 9).present.map(row => row[0])).toEqual([
    'marius', 'petit-banquier-bearded-man', 'petit-banquier-long-haired-man',
  ])
})

test('places the petition and daughter disclosures after the uncertain packet discovery', () => {
  const disclosure = reviewedChapters.get(204)[0]
  expect(disclosure.identityReveals).toContainEqual({ identity: 'four-petitions-signer', character: 'jondrette', evidenceParagraph: 17, audience: 'reader' })
  expect(disclosure.identityReveals).toContainEqual({ identity: 'marius-hoarse-voiced-girl', character: 'jondrette-elder-daughter', evidenceParagraph: 18, audience: 'reader' })
  expect(reviewedChapters.get(204).find(row => row.at === 20).reason).toMatch(/writing sample, not a report/)
})

test('keeps the peephole observer outside the attic cast and records the real window injury', () => {
  for (let chapter = 206; chapter <= 208; chapter++) {
    for (const row of reviewedChapters.get(chapter)) expect(row.present.map(row => row[0])).not.toContain('marius')
  }
  const wound = reviewedChapters.get(207).find(row => row.at === 59)
  expect(wound.stateChanges).toEqual([
    { character: 'jondrette-younger-daughter', injury: 'Bleeding hand and wrist after breaking the pane', evidenceParagraph: 61 },
  ])
  const arrival = reviewedChapters.get(208).find(row => row.at === 14)
  expect(arrival.present.map(row => row[0])).toContain('monsieur-leblanc')
  expect(arrival.identityReveals).toBeUndefined()
})

test('keeps social mines figurative and the criminal roster distinct from attendance', () => {
  for (let chapter = 197; chapter <= 200; chapter++) {
    for (const row of reviewedChapters.get(chapter)) {
      expect(row.present).toEqual([])
      expect(row.stateChanges).toBeUndefined()
    }
  }
  expect(reviewedChapters.get(200).find(row => row.at === 5).reason).toMatch(/roster, not one assembled cast/)
})

test('preserves the uncertain sighting and petition authorship until the source resolves them', () => {
  const sight = reviewedChapters.get(201).find(row => row.at === 5)
  expect(sight.identityReveals).toBeUndefined()
  expect(sight.present.map(row => row[0])).toEqual(['marius', 'invalides-white-haired-workman'])
  const documents = reviewedChapters.get(203).filter(row => row.kind === 'document')
  expect(documents).toHaveLength(4)
  for (const row of documents) expect(row.present).toEqual([])
  const caller = reviewedChapters.get(203).find(row => row.at === 36)
  expect(caller.present.map(row => row[0])).toEqual(['marius', 'marius-hoarse-voiced-girl'])
  expect(caller.identityReveals).toBeUndefined()
})

test('does not reveal the Luxembourg pair through invented names or handkerchief ownership', () => {
  const find = reviewedChapters.get(194).find(row => row.at === 4)
  expect(find.identityReveals).toBeUndefined()
  expect(find.items).toEqual(['leblanc-uf-handkerchief'])
  expect(reviewedChapters.get(194).find(row => row.at === 6).reason).toMatch(/man dropped his own/)
  for (let chapter = 188; chapter <= 196; chapter++) {
    for (const row of reviewedChapters.get(chapter)) {
      expect(row.identityReveals).toBeUndefined()
      expect(row.present.map(row => row[0])).not.toContain('cosette')
      expect(row.present.map(row => row[0])).not.toContain('valjean')
    }
  }
})

test('keeps jealousy and spying accusations distinct from observed harm and police employment', () => {
  const wind = reviewedChapters.get(195)[0]
  expect(wind.reason).toMatch(/girl did nothing/)
  const veteran = reviewedChapters.get(195).find(row => row.at === 5)
  expect(veteran.stateChanges).toBeUndefined()
  expect(veteran.reason).toMatch(/not an attack/)
  const questions = reviewedChapters.get(196).find(row => row.at === 6)
  expect(questions.reason).toMatch(/does not make Marius a police agent/)
})

test('separates completed language learning from a refused salary and anonymous relief', () => {
  expect(reviewedChapters.get(183)[0].reason).toMatch(/learned over time/)
  expect(reviewedChapters.get(184).find(row => row.at === 7).reason).toMatch(/offered, not earned/)
  const relief = reviewedChapters.get(186).find(row => row.at === 8)
  expect(relief.present.map(row => row[0])).toEqual(['marius', 'madame-bourgon'])
  expect(relief.reason).toMatch(/has not recognized Thénardier/)
  expect(relief.timeHint).toBe('Middle of 1831')
})

test('keeps the dragon legend and imagined student attendance out of actual cast', () => {
  const reading = reviewedChapters.get(185).find(row => row.at === 8)
  expect(reading.present.map(row => row[0])).toEqual(['mother-plutarque', 'mabeuf'])
  const tirade = reviewedChapters.get(187).find(row => row.at === 20)
  expect(tirade.present.map(row => row[0])).toEqual(['gillenormand', 'theodule'])
  expect(tirade.mentioned).toContain('marius')
})

test('does not turn student portraits or a mock funeral into present action or death', () => {
  for (const row of reviewedChapters.get(176)) expect(row.present).toEqual([])
  const mock = reviewedChapters.get(177).find(row => row.at === 17)
  expect(mock.present.map(row => row[0])).not.toContain('blondeau')
  expect(mock.stateChanges).toBeUndefined()
  expect(mock.reason).toMatch(/does not establish it/)
  const stairs = reviewedChapters.get(180).find(row => row.at === 21)
  expect(stairs.present.map(row => row[0])).toEqual(['combeferre', 'marius', 'enjolras'])
  expect(stairs.present[0][1]).toMatch(/stairs outside the back room/)
})

test('records the eventual arrival and refusal of the ordered support separately from the order', () => {
  expect(reviewedChapters.get(175).find(row => row.at === 48).reason).toMatch(/do not establish receipt/)
  const refusal = reviewedChapters.get(181).find(row => row.at === 50)
  expect(refusal.items).toContain('gillenormand-six-hundred-franc-remittance')
  expect(refusal.description).toMatch(/returns.*six hundred francs.*three francs/)
})

test('separates the reader’s knowledge of Pontmercy from Marius learning his father’s love', () => {
  const family = reviewedChapters.get(169).find(row => row.at === 7)
  expect(family.identityReveals).toEqual([
    { identity: 'gillenormand-grandson', character: 'marius', evidenceParagraph: 10, audience: 'reader' },
  ])
  expect(family.reason).toMatch(/Marius remains ashamed and uninformed/)
  const death = reviewedChapters.get(171).find(row => row.at === 24)
  expect(death.stateChanges).toEqual([{ character: 'pontmercy', isAlive: false, evidenceParagraph: 26 }])
  expect(death.reason).toMatch(/does not witness the final breath/)
  const warden = reviewedChapters.get(172).find(row => row.at === 3)
  expect(warden.present.map(row => row[0])).toEqual(['mabeuf', 'marius'])
  expect(warden.reason).toMatch(/previously given only to the reader/)
})

test('keeps the grave visit and lost paper distinct from the family’s mistaken explanations', () => {
  const grave = reviewedChapters.get(174).find(row => row.at === 89)
  expect(grave.present.map(row => row[0])).toEqual(['marius', 'theodule'])
  expect(grave.location).toBe('pontmercy-vernon-grave')
  const loss = reviewedChapters.get(175).find(row => row.at === 51)
  expect(loss.reason).toMatch(/probable accidental loss/)
  expect(loss.reason).toMatch(/belief that Gillenormand burned/)
  expect(reviewedChapters.get(175).find(row => row.at === 48).reason).toMatch(/do not establish receipt/)
})

test('preserves uncertainty in Gillenormand’s family history and repeated servant names', () => {
  expect(reviewedChapters.get(164)[0].reason).toMatch(/must not merge/)
  const claim = reviewedChapters.get(165)[0]
  expect(claim.reason).toMatch(/Payment does not prove paternity/)
  expect(claim.present).toEqual([])
  expect(claim.identityReveals).toBeUndefined()
  const child = reviewedChapters.get(167).find(row => row.at === 10)
  expect(child.mentioned).toContain('gillenormand-grandson')
  expect(child.identityReveals).toBeUndefined()
  expect(child.present).toEqual([])
})

test('keeps the composite gamin portrait separate from Gavroche’s individual introduction', () => {
  for (let chapter = 147; chapter <= 158; chapter++) {
    for (const row of reviewedChapters.get(chapter)) {
      expect(row.present).toEqual([])
      expect(row.identityReveals).toBeUndefined()
      expect(row.stateChanges).toBeUndefined()
    }
  }
  const name = reviewedChapters.get(159).find(row => row.at === 13)
  expect(name.identityReveals).toEqual([
    { identity: 'boulevard-temple-neglected-boy', character: 'gavroche', evidenceParagraph: 16, audience: 'reader' },
  ])
  expect(name.reason).toMatch(/not yet identified this family/)
  const neighbor = reviewedChapters.get(159).find(row => row.at === 19)
  expect(neighbor.mentioned).toContain('marius')
  expect(neighbor.present).toEqual([])
})

test('keeps the faint and recovery distinct from the gardener’s mistaken declaration of death', () => {
  expect(reviewedChapters.get(143).find(row => row.at === 27).stateChanges).toEqual([
    { character: 'valjean', condition: 'unconscious', evidenceParagraph: 33 },
  ])
  expect(reviewedChapters.get(144).find(row => row.at === 73).stateChanges).toBeUndefined()
  expect(reviewedChapters.get(144).find(row => row.at === 91).stateChanges).toEqual([
    { character: 'valjean', condition: 'conscious', evidenceParagraph: 100 },
  ])
})

test('preserves the card theft and leaves Valjean outside Gribier’s garret', () => {
  const theft = reviewedChapters.get(144).find(row => row.at === 35)
  expect(theft.items).toContain('gribier-cemetery-card')
  expect(theft.present.find(row => row[0] === 'fauchelevent')[1]).toMatch(/Takes the card unnoticed/)
  const visit = reviewedChapters.get(144).find(row => row.at === 126)
  expect(visit.present.map(row => row[0])).not.toContain('valjean')
  expect(visit.reason).toMatch(/probably beaten/)
})

test('introduces the borrowed gardener identity at the interview without inventing kinship', () => {
  const interview = reviewedChapters.get(145).find(row => row.at === 8)
  expect(interview.identityReveals).toEqual([
    { identity: 'ultime-fauchelevent-cover', character: 'valjean', evidenceParagraph: 16, audience: 'reader' },
  ])
  expect(interview.present.find(row => row[0] === 'valjean')[1]).toMatch(/entirely silent/)
  expect(interview.reason).toMatch(/does not establish biological/)
  expect(reviewedChapters.get(146).every(row => row.kind === 'reported' && row.present.length === 0)).toBe(true)
})

test('distinguishes the convent essay from the narrator’s actual observation at Villers', () => {
  const visit = reviewedChapters.get(131)[1]
  expect(visit.at).toBe(6)
  expect(visit.present.map(row => row[0])).toEqual(['narrator-traveller'])
  for (let chapter = 130; chapter <= 137; chapter++) {
    for (const row of reviewedChapters.get(chapter)) {
      if (row !== visit) {
        expect(row.kind).toBe('exposition')
        expect(row.present).toEqual([])
      }
      expect(row.stateChanges).toBeUndefined()
    }
  }
})

test('keeps Javert outside the garden and the false hostess pursuit out of physical cast', () => {
  expect(reviewedChapters.get(109).find(row => row.at === 14).present.map(row => row[0])).toContain('javert')
  for (const row of reviewedChapters.get(114)) expect(row.present.map(row => row[0])).not.toContain('javert')
  const threat = reviewedChapters.get(113).find(row => row.at === 17)
  expect(threat.present.map(row => row[0])).toEqual(['cosette', 'valjean'])
  expect(threat.mentioned).toContain('madame-thenardier')
})

test('preserves Cosette breathing before the warming scene without inventing a resurrection', () => {
  const cold = reviewedChapters.get(116).find(row => row.at === 10)
  expect(cold.present.find(row => row[0] === 'cosette')[1]).toMatch(/continues breathing/)
  expect(cold.stateChanges).toBeUndefined()
  const warm = reviewedChapters.get(117).find(row => row.at === 62)
  expect(warm.location).toBe('fauchelevent-hut')
  expect(warm.present.find(row => row[0] === 'cosette')[1]).toMatch(/Regains colour/)
})

test('keeps the gardener recognition separate from knowledge of the convict identity', () => {
  const recognition = reviewedChapters.get(117).find(row => row.at === 17)
  expect(recognition.identityReveals).toEqual([
    { identity: 'petit-picpus-bell-man', character: 'fauchelevent', evidenceParagraph: 17, audience: 'reader' },
  ])
  expect(recognition.reason).toMatch(/knows Madeleine, not the fugitive/)
  expect(reviewedChapters.get(117).find(row => row.at === 42).reason).toMatch(/No full confession/)
})

test('puts confirmation of the beggar disguise at its retrospective disclosure', () => {
  const initial = reviewedChapters.get(108).find(row => row.at === 1)
  expect(initial.identityReveals).toBeUndefined()
  const explanation = reviewedChapters.get(118).find(row => row.at === 11)
  expect(explanation.kind).toBe('reported')
  expect(explanation.present).toEqual([])
  expect(explanation.identityReveals).toEqual([
    { identity: 'saint-medard-beggar-figure', character: 'javert', evidenceParagraph: 12, audience: 'reader' },
  ])
})

test('does not insert the fugitives into the convent history or treat profession as death', () => {
  for (let chapter = 119; chapter <= 129; chapter++) {
    for (const row of reviewedChapters.get(chapter)) {
      expect(row.present.map(row => row[0])).not.toContain('valjean')
      expect(row.present.map(row => row[0])).not.toContain('cosette')
    }
  }
  const profession = reviewedChapters.get(121)[0]
  expect(profession.kind).toBe('exposition')
  expect(profession.stateChanges).toBeUndefined()
  expect(profession.reason).toMatch(/not a biological death/)
})

test('does not duplicate the bucket meeting when the stranger route catches up', () => {
  const meeting = reviewedChapters.get(97).find(row => row.at === 26)
  expect(meeting.kind).toBe('scene')
  expect(meeting.present.map(row => row[0])).toEqual(['cosette', 'valjean'])
  const revisit = reviewedChapters.get(98).find(row => row.at === 37)
  expect(revisit.kind).toBe('reported')
  expect(revisit.present).toEqual([])
})

test('keeps the lost bread money distinct from the coin supplied by the guest', () => {
  const loss = reviewedChapters.get(97).find(row => row.at === 9)
  expect(loss.items).toContain('cosette-bread-fifteen-sous')
  expect(loss.present.find(row => row[0] === 'cosette')[1]).toMatch(/unaware/)
  const substitute = reviewedChapters.get(100).find(row => row.at === 25)
  expect(substitute.items).toContain('stranger-substitute-twenty-sous')
  expect(substitute.present.find(row => row[0] === 'valjean')[1]).toMatch(/supplies his own coin/)
})

test('does not make the absent guest witness the kick', () => {
  const night = reviewedChapters.get(100)
  expect(night.find(row => row.at === 120).present.map(row => row[0])).toContain('valjean')
  expect(night.find(row => row.at === 147).present.map(row => row[0])).not.toContain('valjean')
  expect(night.find(row => row.at === 149).present.map(row => row[0])).toContain('valjean')
})

test('keeps the hidden listener but removes the wife before the private price', () => {
  const bargain = reviewedChapters.get(101)
  expect(bargain.find(row => row.at === 21).present.map(row => row[0])).toContain('thenardier')
  expect(bargain.find(row => row.at === 64).present.map(row => row[0])).toContain('madame-thenardier')
  expect(bargain.find(row => row.at === 69).present.map(row => row[0])).toEqual(['thenardier', 'valjean'])
})

test('keeps the survival explanation retrospective and Cosette unaware of the name', () => {
  const survival = reviewedChapters.get(103)[0]
  expect(survival.kind).toBe('reported')
  expect(survival.present).toEqual([])
  expect(survival.identityReveals[0].audience).toBe('reader')
  const lessons = reviewedChapters.get(106).find(row => row.at === 19)
  expect(lessons.reason).toMatch(/knows no other name/)
  expect(lessons.identityReveals).toBeUndefined()
})

test('keeps the coat observer alone in the room during the second inspection', () => {
  const first = reviewedChapters.get(107).find(row => row.at === 5)
  expect(first.present.map(row => row[0])).toContain('valjean')
  const later = reviewedChapters.get(107).find(row => row.at === 7)
  expect(later.present.map(row => row[0])).toEqual(['gorbeau-principal-lodger'])
  expect(later.mentioned).toEqual(['valjean', 'cosette'])
})

test('distinguishes the later battlefield visitor from the novel protagonist', () => {
  const walk = reviewedChapters.get(71)[0]
  expect(walk.present.map(row => row[0])).toEqual(['narrator-traveller'])
  expect(walk.timeHint).toMatch(/1861/)
  for (const row of reviewedChapters.get(71)) expect(row.present.map(row => row[0])).not.toContain('valjean')
})

test('keeps the disputed surrender speaker unassigned and the edition note separate', () => {
  const square = reviewedChapters.get(84)
  expect(square[0].present.map(row => row[0])).toEqual(['cambronne'])
  expect(square[0].reason).toMatch(/disputed between Colville and Maitland/)
  expect(square[1].kind).toBe('apparatus')
  expect(square[1].present).toEqual([])
  expect(reviewedChapters.get(85)[0].description).toMatch(/survived/)
  for (const row of reviewedChapters.get(85)) expect(row.stateChanges).toBeUndefined()
})

test('keeps the Waterloo robbers names at their disclosure and preserves the rescue', () => {
  const night = reviewedChapters.get(89)
  const rescue = night.find(row => row.at === 33)
  expect(rescue.present.map(row => row[0])).toEqual(['thenardier', 'pontmercy'])
  expect(rescue.stateChanges).toEqual([
    { character: 'pontmercy', condition: 'opens his eyes and revives after being freed from beneath the bodies', evidenceParagraph: 38 },
  ])
  expect(night.find(row => row.at === 60).identityReveals).toEqual([
    { identity: 'waterloo-prowler', character: 'thenardier', evidenceParagraph: 60, audience: 'reader' },
    { identity: 'waterloo-wounded-officer', character: 'pontmercy', evidenceParagraph: 61, audience: 'reader' },
  ])
})

test('does not certify the folklore treasure or interrogators unnamed stranger', () => {
  const forest = reviewedChapters.get(91)
  expect(forest[0].kind).toBe('exposition')
  expect(forest[0].present).toEqual([])
  expect(forest.find(row => row.at === 14).present.map(row => row[0])).toContain('boulatruelle')
  const conjecture = forest.find(row => row.at === 18)
  expect(conjecture.kind).toBe('reported')
  expect(conjecture.present).toEqual([])
  expect(conjecture.identityReveals).toBeUndefined()
})

test('does not convert the newspaper drowning report into Valjeans death', () => {
  const rescue = reviewedChapters.get(92).find(row => row.at === 24)
  expect(rescue.present.map(row => row[0])).toContain('valjean')
  const fall = reviewedChapters.get(92).find(row => row.at === 30)
  expect(fall.present.map(row => row[0])).toEqual(['valjean'])
  expect(fall.stateChanges).toBeUndefined()
  const paper = reviewedChapters.get(92).find(row => row.at === 32)
  expect(paper.kind).toBe('document')
  expect(paper.stateChanges).toBeUndefined()
  expect(paper.reason).toMatch(/no body has been found/)
})

test('keeps the dismissal and the false fever out of Madeleine and Cosette direct states', () => {
  const dismissal = reviewedChapters.get(47).find(row => row.at === 11)
  expect(dismissal.present.map(row => row[0])).toEqual(['fantine', 'madeleine-superintendent'])
  const fever = reviewedChapters.get(49).find(row => row.at === 56)
  expect(fever.kind).toBe('reported')
  expect(fever.present).toEqual([])
  expect(fever.stateChanges).toBeUndefined()
})

test('does not carry Bamatabois into the police station or Javert past his exit', () => {
  expect(reviewedChapters.get(51).find(row => row.at === 9).present.map(row => row[0])).toContain('bamatabois')
  for (const row of reviewedChapters.get(52)) {
    expect(row.present.map(row => row[0])).not.toContain('bamatabois')
  }
  const station = reviewedChapters.get(52)
  expect(station.find(row => row.at === 40).present.map(row => row[0])).toContain('javert')
  expect(station.find(row => row.at === 73).present.map(row => row[0])).not.toContain('javert')
})

test('distinguishes the reader identity reveal from the later public confession', () => {
  expect(reviewedChapters.get(57)[0].identityReveals).toEqual([
    { identity: 'madeleine', character: 'valjean', evidenceParagraph: 0, audience: 'reader' },
  ])
  expect(reviewedChapters.get(65)[0].identityReveals).toEqual([
    { identity: 'madeleine', character: 'valjean', evidenceParagraph: 5, audience: 'courtroom' },
  ])
  for (let chapter = 40; chapter < 57; chapter++) {
    for (const row of reviewedChapters.get(chapter)) expect(row.identityReveals).toBeUndefined()
  }
})

test('keeps Javert absent from the confession and records how he subsequently learns it', () => {
  for (const row of reviewedChapters.get(65)) expect(row.present.map(row => row[0])).not.toContain('javert')
  const notification = reviewedChapters.get(68).find(row => row.at === 7)
  expect(notification.present.map(row => row[0])).toEqual(['javert', 'arras-police-messenger'])
  expect(notification.items).toContain('valjean-arrest-order')
})

test('preserves the dream and the candlesticks without a literal death or melting', () => {
  const dream = reviewedChapters.get(58).find(row => row.at === 5)
  expect(dream.kind).toBe('document')
  expect(dream.present).toEqual([])
  expect(dream.stateChanges).toBeUndefined()
  const spared = reviewedChapters.get(57).find(row => row.at === 88)
  expect(spared.present.find(row => row[0] === 'valjean')[1]).toMatch(/returns both candlesticks/)
  const packed = reviewedChapters.get(70).find(row => row.at === 22)
  expect(packed.items).toContain('silver-candlesticks')
})

test('separates Fantine death from the subsequent farewell and excludes the absent child', () => {
  const death = reviewedChapters.get(69).find(row => row.at === 33)
  expect(death.stateChanges).toEqual([{ character: 'fantine', isAlive: false, evidenceParagraph: 44 }])
  const farewell = reviewedChapters.get(69).find(row => row.at === 45)
  expect(farewell.present.map(row => row[0])).not.toContain('fantine')
  expect(farewell.mentioned).toContain('fantine')
  for (const chapter of [66, 67, 68, 69]) {
    for (const row of reviewedChapters.get(chapter)) expect(row.present.map(row => row[0])).not.toContain('cosette')
  }
})

test('records the hidden man during the search rather than accepting the nun declaration', () => {
  const search = reviewedChapters.get(70).find(row => row.at === 39)
  expect(search.present.map(row => row[0])).toEqual(['valjean', 'sister-simplice', 'javert', 'madeleine-portress'])
  expect(search.present.find(row => row[0] === 'sister-simplice')[1]).toMatch(/twice lies/)
})

test('rejects a death or identity reveal assigned to a segment before its source evidence', () => {
  const death = structuredClone(reviewedChapters)
  death.get(69)[0].stateChanges = [{ character: 'fantine', isAlive: false, evidenceParagraph: 44 }]
  expect(() => validateSceneReview(death)).toThrow(/State change evidence must belong/)
  const reveal = structuredClone(reviewedChapters)
  reveal.get(65)[0].identityReveals[0].evidenceParagraph = 26
  expect(() => validateSceneReview(reveal)).toThrow(/Identity reveal evidence must belong/)
})

test('keeps the men absent from delivery of their farewell letter', () => {
  const delivery = reviewedChapters.get(36).find(row => row.at === 17)
  const cast = delivery.present.map(row => row[0])
  for (const author of ['tholomyes', 'listolier', 'fameuil', 'blachevelle']) {
    expect(cast).not.toContain(author)
    expect(delivery.mentioned).toContain(author)
  }
  expect(delivery.items).toContain('tholomyes-farewell-letter')
})

test('preserves the late maternity reveal without placing an unseen child in the room', () => {
  const grief = reviewedChapters.get(36).find(row => row.at === 41)
  expect(grief.present.map(row => row[0])).toEqual(['fantine'])
  expect(grief.description).toMatch(/reveals that she has a child/)
})

test('keeps Fantine absent from the innkeepers private admission after her departure', () => {
  const bargain = reviewedChapters.get(37)
  expect(bargain.find(row => row.at === 51).present.map(row => row[0])).toContain('fantine')
  expect(bargain.find(row => row.at === 77).present.map(row => row[0])).toEqual(['thenardier', 'madame-thenardier'])
})

test('does not turn the hypothetical maternal return into a physical visit', () => {
  const lark = reviewedChapters.get(39).find(row => row.at === 13)
  expect(lark.kind).toBe('reported')
  expect(lark.present).toEqual([])
  expect(lark.reason).toMatch(/counterfactual/)
})

test('does not turn the drowning allegory into a literal Valjean death', () => {
  const allegory = reviewedChapters.get(22)
  expect(allegory).toHaveLength(1)
  expect(allegory[0].kind).toBe('exposition')
  expect(allegory[0].location).toBeNull()
  expect(allegory[0].present).toEqual([])
  expect(allegory[0].stateChanges).toBeUndefined()
})

test('removes Magloire during the explicitly stated bed-making absence', () => {
  const reception = reviewedChapters.get(17)
  expect(reception.find(row => row.at === 13).present.map(row => row[0])).not.toContain('magloire')
  expect(reception.find(row => row.at === 30).present.map(row => row[0])).toContain('magloire')
})

test('removes the police before the low-voiced charge and preserves the unmade promise', () => {
  const returnScene = reviewedChapters.get(26)
  expect(returnScene.find(row => row.at === 28).present.map(row => row[0])).toContain('digne-return-brigadier')
  const finalCharge = returnScene.find(row => row.at === 53)
  expect(finalCharge.present.map(row => row[0])).not.toContain('digne-return-brigadier')
  expect(finalCharge.present.find(row => row[0] === 'valjean')[1]).toMatch(/Cannot recall making the promise/)
})

test('keeps the departed child and envisioned bishop out of the failed search', () => {
  const aftermath = reviewedChapters.get(27)
  expect(aftermath.find(row => row.at === 2).present.map(row => row[0])).toContain('little-gervais')
  for (const row of aftermath.filter(row => Number.isInteger(row.at) && row.at >= 34)) {
    expect(row.present.map(row => row[0])).not.toContain('little-gervais')
    expect(row.present.map(row => row[0])).not.toContain('myriel')
  }
  expect(aftermath.find(row => row.at === 84).kind).toBe('reported')
})

test('rejects a mentioned bandit inserted into expository physical presence', () => {
  const rows = structuredClone(reviewedChapters)
  rows.get(7)[0].present.push(['cravatte', 'Has robbed the cathedral.'])
  expect(() => validateSceneReview(rows)).toThrow(/Invented physical cast/)
})

test('rejects reintroduced stock state wording', () => {
  const rows = structuredClone(reviewedChapters)
  rows.get(3)[1].present[0][1] = 'Takes a distinct part in the immediate action.'
  expect(() => validateSceneReview(rows)).toThrow()
})

test('keeps the absent shepherd out of the debate and records the witnessed death', () => {
  const conversation = reviewedChapters.get(10)
  const afterDeparture = conversation.find(row => row.at === 37)
  expect(afterDeparture.present.map(row => row[0])).toEqual(['myriel', 'conventionary-g'])
  expect(conversation.find(row => row.at === 102).stateChanges).toEqual([
    { character: 'conventionary-g', isAlive: false, evidenceParagraph: 108 },
  ])
})
