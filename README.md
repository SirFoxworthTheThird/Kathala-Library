# Kathala Library

The worlds [Kathala](https://github.com/SirFoxworthTheThird/Kathala) ships in
its Library, and the rules they are held to. No application code lives here.

Thirty-nine worlds built from published books. Thirty-one carry the complete
text of a public-domain novel, each naming the Project Gutenberg edition it was
built from; the rest are structural references to books still in copyright and
contain none of their text.

```bash
npm install --legacy-peer-deps
npm test              # the authoring rules, over every shipped world
npm run catalogue     # regenerate library/index.json from what is on disk
```

`library/` is published as-is. Adding a book here puts it in the Library without
releasing the application.

See [`docs/AUTHORING.md`](docs/AUTHORING.md) for what a book has to satisfy, and
[`CLAUDE.md`](CLAUDE.md) for how the repository is laid out.
