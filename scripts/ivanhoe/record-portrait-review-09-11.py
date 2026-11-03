"""Record individually opened source/compressed and application captures.

This scoped evidence does not grant edition-wide release approval.
"""
import json
from pathlib import Path

book = Path(__file__).resolve().parent
manifest_path = book / 'asset-manifest.json'
manifest = json.loads(manifest_path.read_text(encoding='utf-8'))
keys = ['hermit', 'coningsburghsteward', 'edith', 'dennet', 'minstrel',
        'herald', 'arrivingknight', 'bohun', 'richard', 'winkelbrand']
reports = [json.loads((book / 'qa' / name).read_text(encoding='utf-8')) for name in [
    'avatar-review-hermit,coningsburghsteward,edith,dennet,minstrel.json',
    'avatar-review-herald,arrivingknight,bohun,richard,winkelbrand.json']]
checks = []
for key in keys:
    asset = next(a for a in manifest['assets'] if a['id'] == key)
    report = next(r for r in reports if any(c['characterId'] == 'ivanhoe-character-' + key for c in r['checks']))
    capture = next(c for c in report['checks'] if c['characterId'] == 'ivanhoe-character-' + key)
    assert capture['complete'] and not report['pageErrors']
    entry = dict(id=key, compressedSha256=asset['compressed']['sha256'],
                 fixtureSha256=report['fixtureSha256'], avatar=capture['screenshot'],
                 fullImage=capture['enlargedScreenshot'], appearanceKind=capture['appearanceKind'],
                 writerOnly=capture['writerOnly'])
    checks.append(entry)
    asset['applicationPresentationReview'] = dict(
        date='2026-11-02', evidence='qa/portrait-batches-09-11-manual-review.json',
        scope='Avatar and enlarged image individually opened; source-specific clothing and anonymity preserved. '
              + ('Full-data record only; never asserted as physical presence.' if key == 'winkelbrand' else
                 'Explicit identity-reveal gate, without invented physical cast.' if key == 'richard' else
                 'Direct source appearance.'),
        compressedSha256=asset['compressed']['sha256'], finalEditionApproval=False)
    assert asset['appReviewed'] is False
record = dict(date='2026-11-02', scope='Ten selected assets, including corrected hermit v2. '
              'Originals, decoded compressed files, avatar crops and enlarged application captures individually opened. '
              'Supersedes the older hermit hash in batches 01-08; other older evidence remains historical.',
              checks=checks, releaseApproved=False)
for path, value in [(manifest_path, manifest), (book / 'qa/portrait-batches-09-11-manual-review.json', record)]:
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n', encoding='utf-8', newline='\n')
for name in ['PROGRESS.md', 'RESUME.md']:
    path = book / name
    text = path.read_text(encoding='utf-8')
    text = text.replace('75 selected ordinary illustrations', '84 selected ordinary illustrations', 1)
    text = text.replace('9 characters, 169 locations and 50 items', '0 characters, 169 locations and 50 items', 1)
    text += '\n## 2026-11-02 — complete current character image assignment\n\n'
    text += ('All 77 character records now reference selected illustrations (76 distinct character assets; '
             'the revealed yeoman/Locksley identity shares its gated portrait). Together with the cover, '
             'two places and five objects, 84 ordinary illustrations compile. All 30 map layers retain '
             'distinct illustrated replacements. The last nine portraits and corrected hermit, steward '
             'and minstrel were individually reviewed as originals, compressed assets and actual app '
             'captures. Richard was reviewed at his explicit identity reveal; Winkelbrand only in '
             'full-data mode, without invented physical presence. Scoped evidence: '
             '`qa/portrait-batches-09-11-manual-review.json`. Latest captured fixture: '
             '`2558dd2adc9940ea52306eefb0bacc3df34774caeefabef5a5a94efb5a668c3a`. '
             'Final artwork approval, 169 location images, 50 object images, inherited-state/custody '
             'review, chronology, final continuous playback and packaging remain OPEN.\n')
    path.write_text(text, encoding='utf-8', newline='\n')
