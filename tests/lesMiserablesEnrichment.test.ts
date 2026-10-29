import { expect, test } from 'vitest'
import { chapters } from '../scripts/les-miserables/source-text.mjs'
import { reviewedChapters } from '../scripts/les-miserables/reviewed-scenes.mjs'
import { buildEnrichmentAudit, enrichedReview } from '../scripts/les-miserables/build-enrichment-audit.mjs'
import { readerKey, projectReaderIdentities } from '../scripts/les-miserables/reader-identities.mjs'
import { amendPresence } from '../scripts/les-miserables/presence-amendments.mjs'
import { characterIntroductions, characterNameChanges, canonicalCharacterKey } from '../scripts/les-miserables/character-ledger.mjs'
import { validateReaderProjection, validateReportedDispositions } from '../scripts/les-miserables/validate-enrichment.mjs'
import { reportedDispositions } from '../scripts/les-miserables/reported-dispositions.mjs'
import { characterArtPlan } from '../scripts/les-miserables/art-plan.mjs'
import { buildIdentityPlan } from '../scripts/les-miserables/identity-plan.mjs'
import { reportedDeaths, unequalKnowledge } from '../scripts/les-miserables/continuity-ledger.mjs'
import { canonicalItemKey } from '../scripts/les-miserables/item-identities.mjs'
import { itemDefinitions } from '../scripts/les-miserables/item-ledger.mjs'
import { validateItems } from '../scripts/les-miserables/validate-items.mjs'

test('retains Javert’s enacted river and station visits before the final fall', () => {
  expect(chapters[340].paragraphs[7].text).toContain('Javert leaned both elbows on the parapet')
  expect(chapters[340].paragraphs[60].text).toContain('a sergeant of police')
  const rows = enrichedReview().get(341)
  const arrival = rows.find(row => row.at === 'start')
  expect(arrival.kind).toBe('scene')
  expect(arrival.present.map(([key]) => key)).toEqual(['javert'])
  expect(arrival.location).toBe('pont-notre-dame-parapet')
  const station = rows.find(row => row.at === 59)
  expect(station.kind).toBe('scene')
  expect(station.present.map(([key]) => key)).toEqual(['javert','chatelet-police-sergeant'])
  expect(station.location).toBe('chatelet-police-post')
  expect(rows.find(row => row.at === 62).present.map(([key]) => key)).toContain('javert')
  expect(rows.find(row => row.at === 78).stateChanges).toContainEqual({character:'javert',isAlive:false,evidenceParagraph:83})
})

test('keeps Blaru-bottom at the earlier clearing with the same stones and zinc-bound chestnut', () => {
  expect(chapters[97].paragraphs[34].text).toContain('band of zinc')
  expect(chapters[341].paragraphs[17].text).toContain('Blaru-bottom')
  const review = enrichedReview()
  const first = review.get(98).find(row => row.at === 30).location
  expect(review.get(342).find(row => row.at === 25).location).toBe(first)
  expect(review.get(346).find(row => row.at === 'start').location).toBe(first)
})

test('keeps the final antechamber at the same physical dining room described on arrival', () => {
  expect(chapters[294].paragraphs[9].text).toContain('dining-room was an antechamber as well')
  const review = enrichedReview()
  const arrival = review.get(295).find(row => row.at === 14)
  const finalRoom = review.get(362).find(row => row.at === 'start')
  expect(arrival.location).toBe('homme-arme-dining-room')
  expect(finalRoom.location).toBe(arrival.location)
  expect(buildEnrichmentAudit().locations.some(row => row.key === 'homme-arme-antechamber')).toBe(false)
})

test('keeps the Waterloo identities concealed until the actual naming', () => {
  const original = reviewedChapters.get(89).find(row => row.at === 33)
  const projected = projectReaderIdentities(89, original)
  expect(projected.present.map(([key]) => key)).toEqual(['waterloo-prowler', 'waterloo-wounded-officer'])
  expect(projected.stateChanges[0].character).toBe('waterloo-wounded-officer')
  expect(readerKey(89, 60, 'thenardier')).toBe('thenardier')
  expect(chapters[88].paragraphs[60].text).toContain('Thénardier')
  expect(chapters[88].paragraphs[61].text).toContain('Pontmercy')
  expect(original.present[0][0]).toBe('thenardier') // Projection leaves the editorial ledger intact.
})

test('separates the yellow-coated stranger and garden bell from their disclosed actors', () => {
  const before = projectReaderIdentities(97, reviewedChapters.get(97).find(row => row.at === 26))
  expect(before.present.map(([key]) => key)).toEqual(['cosette', 'montfermeil-yellow-stranger'])
  expect(readerKey(102, 0, 'valjean')).toBe('montfermeil-yellow-stranger')
  expect(readerKey(103, 'start', 'valjean')).toBe('valjean')
  expect(readerKey(117, 'start', 'fauchelevent')).toBe('petit-picpus-bell-man')
  expect(readerKey(117, 17, 'fauchelevent')).toBe('fauchelevent')
  expect(chapters[116].paragraphs[17].text).toContain('recognized old Fauchelevent')
})

test('does not manufacture another person for a changed number or an already-known nickname', () => {
  const number = projectReaderIdentities(90, reviewedChapters.get(90).find(row => row.at === 9))
  expect(number.identityReveals).toEqual([])
  expect(number.mentioned).toEqual(['valjean'])
  const nickname = projectReaderIdentities(177, reviewedChapters.get(177).find(row => row.at === 40))
  expect(nickname.identityReveals).toEqual([])
  expect(nickname.present.some(([key]) => key === 'bossuet')).toBe(true)
})

test('adds individual participation at the sewer bargain without declaring the burden dead', () => {
  const row = amendPresence(336, reviewedChapters.get(336).find(row => row.at === 43))
  expect(row.kind).toBe('scene')
  expect(row.present.map(([key]) => key)).toEqual(['valjean', 'thenardier', 'marius'])
  expect(new Set(row.present.map(([, status]) => status)).size).toBe(3)
  expect(row.stateChanges).toBeUndefined()
  expect(chapters[335].paragraphs[54].text).toContain('tore off a strip')
  const unchanged = reviewedChapters.get(336).find(row => row.at === 43)
  expect(unchanged.present).toEqual([])
})

test('keeps two porters separate and schedules the children’s names at their source cuts', () => {
  const arrivals = enrichedReview().get(338)[0]
  expect(arrivals.present.map(([key]) => key)).toContain('gillenormand-house-porter')
  expect(arrivals.present.map(([key]) => key)).not.toContain('homme-arme-porter')
  expect(characterIntroductions.get('cosette').name).toBe('The little girl')
  expect(characterNameChanges.cosette).toEqual([{ chapter: 37, at: 36, name: 'Cosette' }])
  expect(chapters[36].paragraphs[43].text).toContain('Cosette')
  expect(characterIntroductions.get('eponine').name).toBe('The elder daughter')
  expect(chapters[37].paragraphs[7].text).toContain('Éponine')
  expect(canonicalCharacterKey('nicolette-current')).toBe('nicolette')
  expect(readerKey(173, 'start', 'nicolette-current')).toBe('nicolette')
  expect(characterIntroductions.has('nicolette-current')).toBe(false)
  expect(buildEnrichmentAudit().characters.some(row => row.key === 'nicolette-current')).toBe(false)
  expect(canonicalCharacterKey('homme-arme-portress')).toBe('homme-arme-portress')
})

test('retains complete inventory coverage and does not turn a quotation into a cast', () => {
  const audit = buildEnrichmentAudit()
  expect(audit.reviewedChapters).toBe(365)
  expect(audit.scenes).toHaveLength(1535)
  expect(audit.releaseComplete).toBe(false)
  expect(audit.characters.some(row => row.key === 'montfermeil-yellow-stranger' && row.occurrences.some(use => use.use === 'present'))).toBe(true)
  const report = audit.scenes.find(row => row.chapter === 363 && row.at === 160)
  expect(report.cast).toEqual(['marius', 'thenardier'])
  expect(report.mentioned).toContain('javert')
  expect(report.cast).not.toContain('javert')
  expect(report.cast).not.toContain('valjean')
})

test('rejects restoring an exposed actor key and rejects an unresolved reader reference', () => {
  expect(validateReaderProjection().characters).toBe(characterIntroductions.size)
  const bad = enrichedReview()
  bad.set(89, reviewedChapters.get(89))
  expect(() => validateReaderProjection(bad)).toThrow(/Concealed actor exposed.*thenardier/)
  const unresolved = enrichedReview()
  unresolved.set(15, unresolved.get(15).map((row, index) => index === 0
    ? { ...row, mentioned: [...(row.mentioned ?? []), 'invented-unresolved-person'] } : row))
  expect(() => validateReaderProjection(unresolved)).toThrow(/Missing reader introduction/)
})

test('keeps intermediate identity facts while delaying flattened roster links until the full reveal', () => {
  const plan = buildIdentityPlan()
  expect(plan.facts.find(row => row.identity === 'marius-hoarse-voiced-girl')).toMatchObject({
    chapter: 204, character: 'jondrette-elder-daughter', evidenceParagraph: 18,
  })
  expect(plan.links.find(row => row.identity === 'marius-hoarse-voiced-girl')).toMatchObject({ character: 'eponine' })
  expect(plan.links.find(row => row.identity === 'marius-hoarse-voiced-girl').event).toMatch(/^220-/)
  expect(plan.links.find(row => row.identity === 'mabeuf-lane-old-man')).toMatchObject({ character: 'valjean', event: '265-1' })
  expect(chapters[264].paragraphs[0].text).toContain('Jean Valjean’s purse')
  expect(plan.links.every(link => !plan.links.some(other => other.identity === link.character))).toBe(true)
})

test('uses the source roles rather than interpreting ambiguous provisional keys as occupations or titles', () => {
  expect(chapters[15].paragraphs[19].text).toContain('Paulin Musebois, the locksmith')
  expect(characterIntroductions.get('paulin-musebois').description).toContain('locksmith')
  expect(chapters[124].paragraphs[8].text).toContain('drawing-master, M. Ansiaux')
  expect(characterIntroductions.get('ansiaux').description).toContain('drawing-master')
  expect(chapters[184].paragraphs[0].text).toContain('bookseller of the\nPorte-Saint-Jacques, named Royal')
  expect(characterIntroductions.get('royal-bookseller').name).toBe('Royal')
  expect(characterIntroductions.get('mother-gerbaud').description).toContain('small child')
  expect(characterIntroductions.get('fontevrault-centenarian').name).not.toContain('abbess')
  expect(chapters[273].paragraphs[17].text).toContain('a pale young man with a black beard')
  expect(characterIntroductions.get('bahorel-window-observer').description).toContain('young man')
})

test('reports offstage deaths without absent snapshots and preserves the delay in learning the rescue', () => {
  const review = enrichedReview()
  for (const report of reportedDeaths) {
    const row = review.get(report.chapter).find(row => row.at === report.at)
    expect(row.present.map(([key]) => key)).not.toContain(report.character)
  }
  expect(reportedDeaths.map(row => row.character)).not.toContain('thenardier')
  expect(reportedDeaths.map(row => row.character)).not.toContain('marius')
  expect(reportedDeaths.find(row => row.character === 'jean-prouvaire')).toMatchObject({ chapter: 292, at: 20, evidenceParagraph: 26 })
  expect(chapters[291].paragraphs[26].text).toContain('They have killed him')
  const rescue = unequalKnowledge.find(row => row.key === 'marius-rescuer')
  expect(rescue.chapter).toBe(322)
  expect(rescue.learnings.find(row => row.character === 'marius').chapter).toBe(363)
  expect(rescue.learnings.find(row => row.character === 'cosette').chapter).toBe(364)
})

test('keeps the acquittal, private arrest conference and messenger’s arrival separate', () => {
  const rows = enrichedReview().get(68)
  expect(rows.find(row => row.at === 2).present.map(([key]) => key)).toEqual([
    'arras-prosecutor', 'arras-defence-lawyer', 'arras-president', 'champmathieu',
  ])
  expect(rows.find(row => row.at === 4).present.map(([key]) => key)).toEqual(['arras-prosecutor', 'arras-president'])
  expect(rows.find(row => row.at === 5).present).toEqual([])
  expect(rows.find(row => row.at === 7).present.map(([key]) => key)).toEqual(['javert', 'arras-police-messenger'])
  expect(chapters[67].paragraphs[4].text).toContain('shut himself up with the President')
  expect(rows.find(row => row.at === 4).present.map(([key]) => key)).not.toContain('valjean')
})

test('distinguishes an actual glance and meal from recurring summaries', () => {
  const review = enrichedReview()
  expect(review.get(189).find(row => row.at === 9).present.map(([key]) => key)).toEqual([
    'marius', 'mademoiselle-lanoire', 'monsieur-leblanc',
  ])
  expect(review.get(189).find(row => row.at === 11).present).toEqual([])
  expect(review.get(191).find(row => row.at === 13).present[0][1]).toContain('Eats a bit of bread')
  expect(review.get(230).find(row => row.at === 26).present.map(([key]) => key)).toEqual(['brujon', 'babet'])
  expect(review.get(230).find(row => row.at === 25).present).toEqual([])
})

test('keeps the doctor’s pulse finding separate from the grandfather’s mistaken death claim', () => {
  const rows = enrichedReview().get(340)
  expect(rows.find(row => row.at === 'start').present.map(([key]) => key)).not.toContain('gillenormand')
  expect(rows.find(row => row.at === 3).present.map(([key]) => key)).not.toContain('gillenormand-elder-daughter')
  expect(rows.find(row => row.at === 6).present.find(([key]) => key === 'marius')[1]).toContain('alive')
  expect(rows.find(row => row.at === 21).present.find(([key]) => key === 'gillenormand-doctor')[1]).toContain('returns to the bedside')
  expect(characterIntroductions.get('patagon').description).toContain('portresses')
  expect(characterIntroductions.get('la-vargouleme').description).toContain('rag-picker')
})

test('rejects approvals that drift onto another passage after a new cut', () => {
  const audit = buildEnrichmentAudit()
  expect(validateReportedDispositions(audit)).toBe(reportedDispositions.size)
  const decisions = new Map(reportedDispositions)
  const [key, decision] = decisions.entries().next().value
  decisions.set(key, { ...decision, at: 999 })
  expect(() => validateReportedDispositions(audit, decisions)).toThrow('different passage')
  decisions.set(key, { ...decision, end: decision.end + 1 })
  expect(() => validateReportedDispositions(audit, decisions)).toThrow('changed source boundaries')
})

test('uses each friend’s own source portrait rather than truncating the group’s opening', () => {
  const grantaire = characterArtPlan('grantaire')
  expect(grantaire.portraitSource).toEqual({ chapter: 176, paragraphs: [44, 46], endExclusive: true })
  expect(grantaire.prompt).toContain('inordinately homely')
  expect(characterArtPlan('joly').prompt).toContain('touching his nose with the tip of his cane')
  expect(characterArtPlan('bossuet').prompt).toContain('At five and twenty')
})

test('does not merge the garden, the study, the street and the landing into shared casts', () => {
  const review = enrichedReview()
  const arrested = review.get(221).find(row => row.at === 48).present
  expect(arrested.find(([key]) => key === 'thenardier')[1]).toContain('handcuffed')
  expect(arrested.find(([key]) => key === 'madame-thenardier')[1]).toContain('paving-stone')
  expect(review.get(363).find(row => row.at === 1).present.map(([key]) => key)).toEqual(['cosette', 'gillenormand'])
  expect(review.get(363).find(row => row.at === 4).present.map(([key]) => key)).toEqual(['marius'])
  expect(review.get(363).find(row => row.at === 21).present.map(([key]) => key)).not.toContain('cosette')
  expect(review.get(339).find(row => row.at === 15).present.map(([key]) => key)).toEqual(['valjean'])
  expect(review.get(361).find(row => row.at === 16).present.map(([key]) => key)).not.toContain('valjean')
  expect(review.get(361).find(row => row.at === 23).present.map(([key]) => key)).toEqual(['homme-arme-portress', 'homme-arme-doctor'])
})

test('keeps the carnival’s anonymous jokers distinct from the private aside and preserves the whole reunion cast', () => {
  const review = enrichedReview()
  expect(review.get(350).find(row => row.at === 36).present).toEqual([])
  expect(review.get(350).find(row => row.at === 41).present.map(([key]) => key)).toEqual(['carnival-spaniard', 'carnival-young-fishwife'])
  for (const at of [8, 20, 38, 47]) {
    const row = review.get(345).find(row => row.at === at)
    expect(row.location).toBe('marius-recovery-room')
    expect(row.present.map(([key]) => key).sort()).toEqual(['marius','cosette','valjean','gillenormand','gillenormand-elder-daughter','basque','nicolette'].sort())
  }
  expect(review.get(300).find(row => row.at === 12).present.find(([key]) => key === 'javert')[1]).toContain('alive')
  expect(review.get(300).find(row => row.at === 15).location).toBe('chanvrerie-barricade')
})

test('requires every remaining quoted report to have an explicit source-reviewed disposition', () => {
  expect(buildEnrichmentAudit().scenes.filter(row => row.quotedReportedProse && !reportedDispositions.has(row.scene))).toEqual([])
})

test('keeps one black outfit and one turned panel through their later uses', () => {
  expect(canonicalItemKey('cosette-black-outfit')).toBe('cosette-childhood-mourning-clothes')
  expect(canonicalItemKey('cosette-mourning-clothes')).toBe('cosette-childhood-mourning-clothes')
  expect(canonicalItemKey('cosette-outfit')).toBe('cosette-outfit')
  expect(chapters[145].paragraphs[2].text.replace(/\s+/g, ' ')).toContain('same mourning suit')
  expect(chapters[351].paragraphs[11].text).toContain('those garments to Montfermeil')
  expect(canonicalItemKey('thenardier-tavern-sign')).toBe('jondrette-turned-wooden-panel')
  expect(chapters[218].paragraphs[24].text.replace(/\s+/g, ' ')).toContain('panel which we have already mentioned')
  expect(validateItems()).toMatchObject({ objects: 120, discoveries: 4, releaseComplete: false })
})

test('requires every object definition and traces the neighbor’s coin back to the morning gift', () => {
  const incomplete = new Map(itemDefinitions)
  incomplete.delete('cosette-water-bucket')
  expect(() => validateItems(enrichedReview(), incomplete)).toThrow('Missing item definition')
  expect(enrichedReview().get(204).find(row => row.at === 63).items).toContain('marius-five-franc-gift')
  expect(chapters[203].paragraphs[67].text).toContain('handed the five francs')
  expect(chapters[216].paragraphs[18].text).toContain('our neighbor gave us this morning')
  expect(itemDefinitions.get('marius-five-franc-gift').description).not.toContain('wall')
  expect(itemDefinitions.get('silver-candlesticks').isCollective).toBe(false)
  expect(itemDefinitions.get('javert-signal-pistols').isCollective).toBe(false)
})

test('keeps the window and cellar actions on their actual floors during street construction', () => {
  const review = enrichedReview()
  expect(review.get(279).find(row => row.at === 1).actorLocations.joly).toBe('corinthe-first-floor-window')
  expect(review.get(279).find(row => row.at === 5).actorLocations.enjolras).toBe('corinthe-cellar-trap')
  const audit = buildEnrichmentAudit(review)
  expect(audit.characters.find(person => person.key === 'enjolras').occurrences.find(use => use.chapter === 279 && use.at === 5).location).toBe('corinthe-cellar-trap')
  expect(audit.locations.some(place => place.key === 'corinthe-cellar-trap')).toBe(true)
  const bad = enrichedReview()
  bad.set(279,bad.get(279).map(row => row.at === 5 ? {...row,actorLocations:{enjolras:'chanvrerie-barricade'}} : row))
  expect(() => validateReaderProjection(bad)).toThrow('Unreviewed actor position')
})
