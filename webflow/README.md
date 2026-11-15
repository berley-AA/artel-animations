# Webflow custom code

Every line of custom code on artelagency.com lives here. Webflow only holds copies.

## Where things are

| Folder | What it holds |
|---|---|
| `pages/site/` | Site-wide code: Site settings > Custom code (head and footer). Runs on every page. |
| `pages/<page>/` | One page's Custom code boxes: `head.html` and `footer.html`. |
| `pages/<page>/<head or footer>/` | Each `<style>` or `<script>` from that box, as its own file. The box pulls it in with `{{> path}}`. |
| `shared/` | A block that more than one page uses, stored once. |
| `registered/` | Scripts registered in Webflow, saved as `Name@version.js`. |
| `manifest.json` | Which registered scripts each page applies, in which order, plus the Webflow page ids. |
| `luz-loader.js` | The one script on `/luz` and `/black-friday`. It swaps in the Luz page built from `luz-ab/src`. |
| `.snapshot/` | The custom code as last read from Webflow, so `--check` can prove the source matches. |

Pages: `site`, `home`, `faq`, `case-study-montreal-weights`, `case-study-nordik`, `labs`, `terms`, `privacy`, `luz`.
`terms` and `privacy` share one footer script (`shared/legal-navbar-hide-on-scroll.js`).
The two case studies share their nav code (`shared/case-study-nav.*`).

## Changing code

1. Edit the file in `pages/` or `shared/`.
2. `python3 webflow/build.py` writes each box's full content to `webflow/dist/`.
3. Paste that into Webflow (or have Claude set it through the Webflow API), publish to staging, check, then publish live.

`python3 webflow/build.py --check` must say `ok` for every box before you start: it proves the source and Webflow still match.

## The Luz pages

`/luz`, `/fr-ca/luz`, `/black-friday` and `/fr-ca/black-friday` carry no custom code of their own except the
`noindex` tag on `/luz` and the `ArtelLuzLoader` script. The page itself is built in `luz-ab/src` (see its README).
Before Nov 15 the `/luz` Webflow page also carried 74 KB of copied homepage code and 13 homepage scripts.
The loader wiped them on every visit, and the Luz page needed three guard scripts to undo what they left behind.
All of that is gone.
