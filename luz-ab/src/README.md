# Luz pages: source

The four Luz pages are built from this folder. Never edit `luz.html`, `luz-fr.html`, `luz-bf.html` or
`luz-bf-fr.html` by hand: they are build output.

| File | What it holds |
|---|---|
| `page.html` | The page, once: structure, and where every style and script goes. |
| `copy.json` | The words that change between pages. Each `{{@slot}}` in the page has `en` and `fr`, plus `en-bf` and `fr-bf` only where Black Friday says something different. |
| `parts/modules/` | Whole features with one owner each: `lang-picker` (EN/FR switch), `chat-stage` (the Talk to Luz stage). |
| `parts/css/`, `parts/js/` | The other styles and scripts, named after what they do, in page order. |
| `build.py` | Fills the page and writes the four files. |
| `tools/` | The one-time scripts that split the old hand-kept pages into this source. |

## Build

```
python3 luz-ab/src/build.py          # writes the four pages
python3 luz-ab/src/build.py --check  # fails if a page on disk is not what the source builds
```

## Deploy

Commit, push, then point `webflow/luz-loader.js` at the new commit (see `webflow/README.md`).
