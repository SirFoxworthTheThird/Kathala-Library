/*
  Harry Potter and the Philosopher's Stone — Norbert is Norbert.

  The dragon Hagrid hatches is Norbert throughout this book. That he turns out to
  be female, and is renamed Norberta, belongs to the last book of the series,
  not this one; the alias told a reader of book one something book one never
  says (EX-001). This world carries no text from the book (it is in copyright).

  Run from the repository root: node scripts/names/harry-potter-and-the-philosopher-s-stone.mjs
*/
import { openWorld } from '../lib/world-edit.mjs'

const w = openWorld('harry-potter-and-the-philosopher-s-stone')
w.set('characters', 'char-norbert', 'aliases', ['Norberta'], [])
w.save()
