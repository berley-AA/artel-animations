# AlignCanvas export log (2026-10-31)

Tool: https://aligncanvas.com/create (Basit's AlignCanvas). Files land in Berley's Downloads folder.

## Image set (Media panel, Order: In order, 21 images)

1 hero_luz, 2 p_first, 3 film_cx_rings, 4 stat_59, 5 p_quote, 6 orb_trio, 7 chat, 8 p_portrait,
9 film_colour_lineup, 10 artel_black, 11 p_boardroom, 12 orb_pink, 13 stat_5400, 14 p_mark,
15 film_every_customer, 16 bilingual, 17 p_discs, 18 stat_week, 19 p_portrait_light, 20 tagline,
21 artel billboard (no-text webp from the Webflow CDN)

Source: jsDelivr `berley-AA/artel-animations@c14cc64/aligncanvas/showcase/`. chat and orb_pink
returned 403 from jsDelivr, so those two came from raw.githubusercontent.com at the same commit.
No client footage. The old image set was removed with "Remove all images".

## Global settings

- Output: MP4, 3840x2160, 60 fps, quality High, seamless loop on, canvas 16:9
- Text panel: Corner labels OFF (the default frame said "AlignCanvas / Selected work / 2026 /
  Made with AlignCanvas"). Title off.
- Note: picking a template resets the Visual panel to that template's preset, so the look is
  re-applied after every selection.
- Clean light look = background solid #F5F5F7, Shadow on, Glass on, corners default.

## Lens look recipe (Basit's floating lenses)

- Background solid #0B0B0C
- Cards: Aspect 1:1, Corners 50% (turns every image into a round disc)
- Card glass ON (each disc gets a refracted rim with a colour fringe), Shadow off
- Optional Liquid lens ON: Type Glass, Shape Circle, Motion Drift, Width 60%, Height 60%,
  Refraction 90%, Dispersion 60%, Magnify 30%
- Best templates: Fisheye Wall (disc wall bent like a fisheye + drifting loupe), Lens Grid
  (grid of discs with its own big glass sphere)

## Exports

| # | Template | Look | Aspect | Duration | File | Size | Still |
|---|---|---|---|---|---|---|---|
| 1 | Lens Grid (lens A) | Lens recipe, dark #0B0B0C, round discs, Card glass, template's own sphere | 16:9 | 20.0 s | aligncanvas-lens-grid-3840x2160-60fps.mp4 | 157.9 MB (81.6 s render) | yes, aligncanvas-lens-grid-3840x2160.png (exported twice, may also exist as "(1)") |
| 2 | Fisheye Wall (lens B) | Lens recipe + Liquid lens circle loupe drifting (60/60, refr 90, disp 60, mag 30), shadow off | 16:9 | 60.0 s | aligncanvas-fisheye-3840x2160-60fps.mp4 | 498.6 MB (222.2 s render) | yes, aligncanvas-fisheye-3840x2160.png |
| 3 | Planetarium (lens C) | Lens recipe + same circle loupe, shadow off | 16:9 | 40.0 s | aligncanvas-planetarium-3840x2160-60fps.mp4 | 332.4 MB (134.5 s render) | yes, aligncanvas-planetarium-3840x2160.png |
| 4 | Flare Duo | Clean light (#F5F5F7, Shadow on, Glass on), labels off | 16:9 | 12.0 s | aligncanvas-flare-duo-3840x2160-60fps.mp4 | 60.7 MB (39.8 s render) | yes, aligncanvas-flare-duo-3840x2160.png |
| 5 | Prism Slider | Clean light, labels off | 16:9 | 12.6 s | aligncanvas-prism-slider-3840x2160-60fps.mp4 | 47.9 MB (99.6 s render) | yes, aligncanvas-prism-slider-3840x2160.png |

Notes:
- A first Flare Duo render was cancelled mid-way (template preset had switched the AlignCanvas corner
  labels back on). Nothing from it should have downloaded. The runner now turns Title and Corner
  labels off after every template selection.
- PAUSED after #5 on coordinator request: Berley rejected part of the image set (office/boardroom
  photos, portrait cards, some layouts). Everything above uses the c14cc64 set, so it will need
  redoing with the new commit. Remaining queue: Portal onward (102 templates incl. Flare Duo /
  Prism Slider redo).

---

# Round 2: curated sets (new image commit 577ef98, circle-safe squares 20fefda)

Old 21-image set removed with "Remove all images" before the first upload. p_first held out.
The tool keeps ONE image set for every template, so the set is swapped (Remove all images,
then upload) before each template. Order: In order. Corner labels + Title off after every
template select.

Built for this round:
- c_<name>.jpg (aligncanvas/circle-safe.py, commit 20fefda): 2160x2160 squares for round lens
  templates. Title + orb scaled uniformly into the inscribed circle (never stretched), footers
  dropped, background rebuilt from the card's own edge colour. c_orb_trio (scale 0.72),
  c_orb_pink (0.87), c_hero_luz (0.98, footer dropped), c_film_colour_lineup (0.88),
  c_film_cx_rings (0.77), c_p_mark (1.0), c_p_discs (1.0). Reason: in a plain circle crop the
  titles of orb_trio/orb_pink/hero_luz and the outer orbs of the colour lineup were cut.
- p_portrait_felix (built in-page from the Webflow team portrait, 784x872 source): 2160x2700,
  B&W, eyes on the 0.382 line, zoom 4.8x (the minimum that keeps the eyes on 0.382 is 4.15x),
  soft S-curve + light vignette to calm the window blinds, fine grain. Softer than Berley's card
  because the source is small.
- billboard (in-page from the Webflow CDN, 2560x1429): no "We work for any kind of industry"
  text, only the ARTEL wordmark on the screen. Cover-cropped to 2160x2700, crop window x
  1220-2363 of the source (centred at 0.70 so the wordmark stays inside the frame/circle).
- promo_brand and film_colour_lineup are the same layout; never both in one template.

| # | Template | Images (in order) | Look | Duration | File | Size | Still |
|---|---|---|---|---|---|---|---|
| R2-1 | Lens Grid | c_hero_luz, c_orb_trio, c_film_cx_rings, c_orb_pink, c_film_colour_lineup, p_portrait_berley, p_portrait_felix, c_p_mark, billboard | Lens recipe (bg #0B0B0C, cards 1:1, corners 50%, Card glass on, Shadow off, Liquid lens Glass/Circle/Drift W60 refr90 disp60 mag30) | 20.0 s | aligncanvas-lens-grid-3840x2160-60fps.mp4 (newest copy; Chrome adds a (n) suffix next to round 1) | 157.2 MB | yes, at 2.0 s (lens on "Luz"), aligncanvas-lens-grid-3840x2160.png |
| R2-2 | Fisheye Wall | c_hero_luz, c_orb_pink, c_film_cx_rings, c_orb_trio, p_portrait_berley, p_portrait_felix, c_p_discs, billboard | Lens recipe | 60.0 s | aligncanvas-fisheye-3840x2160-60fps.mp4 (newest copy) | 498.4 MB | yes, at 48.0 s (both founders + ARTEL billboard + Luz), aligncanvas-fisheye-3840x2160.png |
| R2-3 | Planetarium (FAILED, not exported) | planned: c_orb_trio, c_hero_luz, c_film_colour_lineup, c_film_cx_rings, p_portrait_berley, p_portrait_felix, c_p_mark | Lens recipe | - | Template was switched to Slide Push by another actor before the render; got aligncanvas-slide-push-3840x2160-60fps.mp4 (67.0 MB) + .png instead, with the Planetarium image set. Discard those two files. | - | - |

STOPPED at R2-3: another session/person was operating the same AlignCanvas tab at the same time
(template changed to Slide Push then Swap, quality set to Max, window resized, two
aligncanvas-swap-...mp4 downloads not started by this agent). Not resumed until the tab is mine
alone. Current media set in the editor = the Planetarium set above (7 images, no old images).

Not ours, discard (Downloads, not deleted): aligncanvas-slide-push-3840x2160-60fps.mp4 and
aligncanvas-slide-push-3840x2160.png (my Planetarium render after the template was switched under
me), and both aligncanvas-swap-3840x2160-60fps.mp4 files (started by someone else).

---

# Round 3: every template, in list order (Berley's go, 2026-10-31)

Own tab (the old tab kept changing, so it was left alone). Projects auto-save in the browser
(AlignCanvas: "Projects save automatically in this browser"); no setting to turn on. Left
"Keep my look when switching templates" off so each template keeps its own design.
Files are renamed at download time to artel-NN-<template>.mp4 / artel-NN-<template>-still.png
so nothing collides with earlier exports. Each set is uploaded with Remove all images + upload,
and the media panel order is checked by file name before selecting the template.
A guard checks template and quality (High) before and after each render.
Flat/text templates: clean light (#F5F5F7, Shadow on, Glass on), Cards aspect 4:5.

| # | Template | Images (in order) | Look | Duration | File | Size | Still |
|---|---|---|---|---|---|---|---|
| 1 | Flare Duo | edu_two_jobs, promo_night, stat_59, chat, promo_wismo, stat_5400, promo_day_night | clean light, cards 4:5 (single centred card) | 12.0s | artel-01-flare-duo.mp4 | 16.1 MB | yes, 1.8 s, artel-01-flare-duo-still.png |
| 2 | Prism Slider | promo_night, stat_59, chat, promo_wismo, stat_5400, bilingual, promo_offer | clean light, cards 4:5 | 12.6s | artel-02-prism-slider.mp4 | 24.1 MB | yes, 4.4 s, artel-02-prism-slider-still.png |
| 3 | Portal | edu_who_answers, promo_day_night, stat_59, chat, stat_week, promo_offer | clean light, cards 4:5 | 11.2s | artel-03-portal.mp4 | 12.3 MB | yes, 4.5 s, artel-03-portal-still.png |
| 4 | Slide Push | artel_black, edu_two_jobs, stat_5400, bilingual, promo_countdown, promo_offer, tagline | clean light, cards 4:5 (side cards get the Glass edge warp while sliding; each post reads whole in the centre) | 12.8s | artel-04-slide-push.mp4 | 56.5 MB | yes, 5.8 s, artel-04-slide-push-still.png |
| 5 | Cube Turn | hero_luz, stat_59, chat, promo_offer | clean light, cards 4:5. Template only uses 4 faces, so the set was cut from 7 to 4 | 7.2s | artel-05-cube-turn.mp4 | 8.0 MB | yes, 4.9 s (mid-turn), artel-05-cube-turn-still.png |
| 6 | Card Flip | edu_who_answers, promo_wismo, promo_night, promo_countdown, promo_offer (Black Friday story) | clean light, cards 4:5 | 9.0s | artel-06-card-flip.mp4 | 10.8 MB | yes, 4.05 s (mid-flip), artel-06-card-flip-still.png |
