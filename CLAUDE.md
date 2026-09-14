# CLAUDE.md

This repository holds the worlds PlotWeave ships in its Library, and the rules
they are held to. It holds no application code.

## Commands

```bash
npm install --legacy-peer-deps   # plain `npm install` currently fails here (see below)
npm test                         # the authoring rules, over every shipped world
npm run gate                     # what CI runs: no NEW failures, none silently fixed
npm run catalogue                # regenerate library/index.json from what is on disk
npm run catalogue:check          # what CI runs: fail if the catalogue is stale
```

`npm install` without `--legacy-peer-deps` fails with npm's
`Cannot read properties of null (reading 'edgesOut')`. It is an npm resolution
bug, not a problem with the dependency tree; the flag is the workaround and CI
uses it too.

## What is here

```
library/                 published as-is; this is what the app fetches
  <book>.pwk             a world
  <book>.pwb             its images, for the four books that embed them
  <book>/art|maps/       artwork the world links by relative path
  index.json             the catalogue — generated, not hand-written
contract/app.ts          the parts of PlotWeave a world must agree with
tests/                   the authoring rules, as tests
docs/AUTHORING.md        the EX-* rules in prose
docs/CHECKLIST.md        the release checklist
```

**`library/` is the publish directory.** A world's images are stored as relative
paths — `library/<book>/art/x.png` — so the folder name is part of every image
URL in every world. Renaming or restructuring it means rewriting those paths
inside the `.pwk` files: 309 of them in *Journey to the West* alone. Left alone,
it costs nothing.

## The one copy

There used to be two: `example/` and `public/library/`, kept in step by a test
and repeatedly not in step anyway. Four worlds had genuinely diverged by the
time they merged — *Harry Potter* missing `readingMode` and the journal's
`version` fields, *Fellowship* and *The Two Towers* missing their theme, and
*Neuromancer* still pointing at `raw.githubusercontent.com` for 51 images.

There is one copy now. Do not add a second.

## Authoring

`docs/AUTHORING.md` is the contract, and the tests enforce what can be enforced.
Read it before adding or substantially revising a book. Two things it is worth
knowing before you start:

- **A book without prose is a legitimate book.** Six of the worlds are in
  copyright and carry structural notes only — their catalogue entries say "no
  text from the book is included", and that is the reason they carry none. Do
  not add prose to a world whose notice says it has none.
- **A book with prose must say where the prose came from.** Every public-domain
  world names the Project Gutenberg edition it was built from.

## `contract/app.ts` is a copy, and it can drift

It restates values the *app* defines — the theme ids, the catalogue's shape —
because books are validated without the app present. Nothing will tell you when
the app changes and this does not follow. When a test here disagrees with the
app, suspect this file first.

## Testing

**Every rule that can be a test should be a test.** The rules that were only
prose got broken: four worlds lost `readingMode` when their manuscripts were
completed, and *Os Maias* asked for a theme called `historical` where every
other world writes `theme-historical` — so it rendered in the default slate with
nothing anywhere saying why. Both were caught by tests that already existed and
were left failing.

**A test that never fails protects nothing.** Before trusting one that guards a
fix, break the fix and watch it go red. Pair an absence with a presence: a test
asserting a book does *not* do something should assert that some other book
does, in the same run, or it can pass by finding nothing at all.

**Do not describe behaviour that is not there.** A comment claiming a rule is
enforced is a claim, and reviewers read it as one. Write it after the test earns
it.

## Known failures, and the gate

31 tests currently fail, and they are inherited rather than new:

- **27 in `libraryCatalogue`** — a stale guard. It requires a notice matching
  `/original scene drafts|original prose|public-domain translation/`, while the
  notices now read "the complete narrative text of Project Gutenberg eBook
  #345". The authoring convention moved and the regex did not. Fixing it means
  deciding what a correct provenance notice should say.
- **2 in `exampleQuality`** — map structure in *The Time Machine* and *The War
  of the Worlds*.
- **1 each in `libraryLoreGating` and `libraryChapterTitles`.**

Do not paper over these by loosening an assertion. They are real disagreements
between the rules and the books, and each wants a decision.

Because of them, CI cannot demand a green suite without either making those
decisions now or weakening the rules — and weakening a rule to get a green tick
is how a suite stops meaning anything. So `npm run gate` asks the question that
can be answered honestly today: **did this change break something that was
working?**

`tests/known-failures.json` lists the 31 by name. The gate fails if anything
outside that list fails, and *also* fails if a listed test starts passing —
with instructions to run `npm run gate -- --update` and commit the shorter
list. The list can only shrink. A baseline that quietly keeps names of tests
nobody is waiting on any more grows until it covers a real regression.

## A structure worth moving to

The layout above is the one inherited from the app, kept so the split changed
nothing inside the worlds. A better shape, when it is worth rewriting the image
paths:

```
books/<slug>/<slug>.pwk    the world and its art in one folder
books/<slug>/art/
```

One folder per book means a contribution touches one directory, which is what
makes an outside contribution tractable.
