# Source audit

| Measure | Result |
| --- | --- |
| Archived source | Project Gutenberg eBook 105 UTF-8 text |
| Exact source bytes | 477,866 |
| Source SHA-256 | `27911715ba647bebaf691bb9a7d472ec3b3264dae58f4fe2c7daf02489051105` |
| Retained chapters | 24 of 24 |
| Retained narrative paragraphs | 1,010 |
| Retained narrative words | 83,232 |
| Retained normalized SHA-256 | `04eaac15b4f9bd37ab560b1a63020995103369b8da3f45d2040aff8ce2ddf41f` |
| Working scenes after location corrections | 130 |

Extraction starts at the narrative `CHAPTER I.` following the contents list and ends before standalone `Finis`. Only Project Gutenberg packaging, display matter, duplicated contents headings, `Finis`, and the end marker are excluded. LF normalization is documented in `SOURCE.md`; the archived source remains byte exact with CRLF. `source-text.mjs` reconstructs every heading and body, and `validate-book.mjs` reconstructs the same retained text from final scenes.
