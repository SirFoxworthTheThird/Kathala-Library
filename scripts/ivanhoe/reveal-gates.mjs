import assert from 'node:assert/strict'
import {sections,paragraphs} from './source-text.mjs'
import {reviewedChapters} from './scene-review.mjs'

// The narrative paragraph that actually discloses the name must start its own
// beat. Resolving to the encompassing earlier scene would reveal metadata early.
export const revealAnchors={
  aymer:{chapter:2,paragraph:12,source:/Prior of Jorvaulx/},
  brian:{chapter:2,paragraph:30,source:/brother Brian/},
  attendants:{chapter:2,paragraph:51,source:/Hamet and Abdalla/},
  palmer:{chapter:2,paragraph:64,source:/A Palmer/},
  brianSurname:{chapter:3,paragraph:21,source:/Brian de Bois-Guilbert/},
  elgitha:{chapter:3,paragraph:27,source:/Elgitha, let thy Lady Rowena/},
  maurice:{chapter:15,paragraph:20,source:/bride and dame of Maurice de Bracy/},
  edwina:{chapter:6,paragraph:20,source:/followed Edwina out/},
  squireGurth:{chapter:10,paragraph:15,source:/Thus far, Gurth/},
  disinheritedIvanhoe:{chapter:12,paragraph:49,source:/Ivanhoe/},
  locksley:{chapter:13,paragraph:38,source:/Locksley/},
  clerk:{chapter:16,paragraph:40,source:/Clerk of Copmanhurst/},
  captainVoice:{chapter:19,paragraph:45,source:/by night as well as by day/},
  urfried:{chapter:24,paragraph:6,source:/Urfried/},
  maskedVisitorBrian:{chapter:24,paragraph:30,source:/Brian de Bois-Guilbert/},
  robertLocksley:{chapter:25,paragraph:20,source:/Robert Locksley, called Cleave-the-Wand/},
  ulrica:{chapter:27,paragraph:14,source:/murdered Ulrica/},
  unseenVoiceUlrica:{chapter:30,paragraph:31,source:/said Ulrica/},
  diccon:{chapter:33,paragraph:64,source:/Diccon Bend-the-Bow/},
  blackKnightRichard:{chapter:34,paragraph:22,source:/Richard is in England/},
  higgName:{chapter:37,paragraph:29,source:/Higg, the son of Snell/},
  blueKnightFitzurse:{chapter:40,paragraph:107,source:/Waldemar Fitzurse/},
  publicRichard:{chapter:40,paragraph:118,source:/I am Richard of England/},
  robinHood:{chapter:40,paragraph:121,source:/I am Robin Hood/},
  friarTuck:{chapter:40,paragraph:131,source:/Friar Tuck/},
  allanADale:{chapter:43,paragraph:28,source:/Allan-a-Dale/},
  arrivingKnightIvanhoe:{chapter:43,paragraph:71,source:/I am Wilfred of Ivanhoe/},
  palmerIvanhoe:{chapter:43,paragraph:73,source:/your gold chain against my reliquary/},
}

export function resolveRevealGate(anchor,review=reviewedChapters){
  const chapter=review.find(c=>c.chapter===anchor.chapter)
  const scene=chapter?.scenes.find(s=>s.from===anchor.paragraph&&!(s.fromOffset??0))
  assert.ok(scene,`Reveal ${anchor.chapter}:${anchor.paragraph} requires an exact scene boundary`)
  const section=sections.filter(s=>s.kind==='narrative')[anchor.chapter-1]
  // Match prose across the pinned edition's physical line wraps only. This
  // never changes the stored source, scene offsets or reconstruction bytes.
  assert.match(paragraphs(section.text)[anchor.paragraph].text.replace(/\s+/g,' '),anchor.source)
  return {chapter:anchor.chapter,paragraph:anchor.paragraph,eventId:`ivanhoe-source-${section.number}-p${anchor.paragraph}`}
}

export const revealGates=Object.fromEntries(Object.entries(revealAnchors).map(([key,anchor])=>[key,resolveRevealGate(anchor)]))
