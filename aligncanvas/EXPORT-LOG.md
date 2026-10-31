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
| 7 | Rise Up | edu_two_jobs, promo_night, stat_59, chat, stat_5400, promo_offer | clean light, cards 4:5. Template shows 6 cards per loop; first try with 7 dropped the 7th, so cut to 6 ending on the offer | 9.0s | artel-07-rise-up.mp4 | 12.2 MB | yes, 2.7 s, artel-07-rise-up-still.png |
| 8 | Swap | hero_luz, edu_who_answers, stat_59, chat, promo_offer | clean light, cards 4:5. Template shows 5 cards per loop, so cut to 5 | 7.0s | artel-08-swap.mp4 | 12.7 MB | yes, 3.5 s, artel-08-swap-still.png |
| 9 | Zoom Blur | promo_countdown, promo_night, chat, stat_5400, promo_day_night, tagline | clean light, cards 4:5 | 10.5s | artel-09-zoom-blur.mp4 | 5.1 MB | yes, 5.25 s, artel-09-zoom-blur-still.png |

(Flare Duo re-checked: all 7 of its images appear, promo_day_night at 9.4 s; no re-export needed.)
| 10 | Hero Strip | hero_luz, edu_two_jobs, promo_night, stat_59, chat, stat_5400, promo_offer | clean light, cards 4:5. Big hero card + 7-thumb strip; template uses 7 images, so cut from 9 to 7 | 11.2s | artel-10-hero-strip.mp4 | 19.0 MB | yes, 5.0 s, artel-10-hero-strip-still.png |

Size check after 10 exports in round 3: 176.8 MB of video (+ 10 PNG stills). Renders steady at 20-30 s.

| 11 | Glass Carousel | promo_night, stat_59, chat, promo_wismo, stat_5400, bilingual, promo_offer | clean light, cards 4:5 (3 cards in view, glass streaks on the side cards) | 30.0s | artel-11-glass-carousel.mp4 | 232.6 MB | yes, 3.0 s, artel-11-glass-carousel-still.png |
| 12 | Orb Marquee | c_hero_luz, c_orb_trio, c_film_cx_rings, c_orb_pink, p_portrait_berley, p_portrait_felix, c_p_mark, billboard | clean light (#F5F5F7, Shadow, Glass), template's own round cards | 16.0s | artel-12-orb-marquee.mp4 | 46.1 MB | yes, 7.2 s (both founders + mark + billboard), artel-12-orb-marquee-still.png |
| 13 | Coverflow | hero_luz, edu_two_jobs, promo_night, stat_59, chat, stat_5400, bilingual, promo_offer, tagline | clean light, cards 4:5. About 9 cards in view, so 9 images (a 7-image try showed the same post on both sides) | 16.5s | artel-13-coverflow.mp4 | 104.1 MB | yes, 4.95 s, artel-13-coverflow-still.png |
| 14 | Glass Feed | hero_luz, edu_who_answers, stat_59, chat, bilingual, stat_week, promo_offer | clean light, cards 4:5 (vertical feed, cards bend at top/bottom edges) | 18.0s | artel-14-glass-feed.mp4 | 59.5 MB | yes, 1.8 s, artel-14-glass-feed-still.png |
| 15 | Slider | edu_who_answers, promo_night, stat_59, chat, stat_5400, promo_offer | clean light, cards 4:5. KNOWN ISSUE: the template repeats a card at the loop seam whatever the count (tested 6, 7, 8; loop stays 11.7 s). 6 gives the least visible repeat (same card at both edges, not side by side), last ~1.5 s | 11.7s | artel-15-slider.mp4 | 40.3 MB | yes, 5.85 s, artel-15-slider-still.png |

Progress at 15 templates: 659.4 MB of video in round 3 (+ 15 PNG stills).
| 16 | Arc Wheel | hero_luz, orb_trio, stat_59, chat, promo_brand, stat_week, tagline | clean light, cards 4:5 (cards ride an arc in the upper half; lower half is background, template composition) | 22.0s | artel-16-arc-wheel.mp4 | 161.1 MB | yes, 18.7 s, but saved under the editor's default name aligncanvas-arc-wheel-3840x2160.png (arrived after the rename window; fixed for later exports) |
| 17 | Sidestack | edu_who_answers, promo_day_night, stat_59, chat, stat_week, bilingual, promo_offer | clean light, cards 4:5. Holds exactly 7 (9 drops the last two; 6 repeats the first card at the seam) | 9.8s | artel-17-sidestack.mp4 | 22.8 MB | yes, 3.9 s, artel-17-sidestack-still.png |
| 18 | Elevator | edu_who_answers, promo_wismo, promo_night, stat_59, chat, stat_5400, promo_day_night, bilingual, stat_week, promo_countdown, promo_offer, tagline | clean light, cards 4:5. Tilted scrolling wall; 5 images put identical posts side by side, so 12 posts | 24.0s | artel-18-elevator.mp4 | 182.3 MB | yes, 8.4 s, artel-18-elevator-still.png |

Running total after 18: 1,025.6 MB of video.
| 19 | Image Repeater | edu_who_answers, promo_wismo, promo_night, stat_59, chat, stat_5400, promo_day_night, bilingual, stat_week, promo_countdown, promo_offer, tagline | clean light, cards 4:5. 3 rows of cards; 7 images put the same post twice side by side, so 12 | 26.0s | artel-19-image-repeater.mp4 | 215.5 MB | yes, 13.0 s, artel-19-image-repeater-still.png |
| 20 | Melt Row | hero_luz, edu_who_answers, stat_59, chat, bilingual, stat_week, promo_offer | clean light, cards 4:5 (centre card, melting glass sides) | 22.0s | artel-20-melt-row.mp4 | 171.1 MB | yes, 2.2 s, artel-20-melt-row-still.png |
| 21 | Glass Stream | hero_luz, edu_who_answers, promo_wismo, promo_night, stat_59, chat, orb_trio, stat_5400, promo_day_night, bilingual, stat_week, promo_countdown, artel_black, promo_offer, tagline | clean light, cards 4:5. 3-column stream; 7 and 12 images stacked the same post in a column at the loop end, 15 is clean | 24.0s | artel-21-glass-stream.mp4 | 174.5 MB | yes, 14.4 s, artel-21-glass-stream-still.png |

Running total after 21: 1,586.7 MB of video. Note: the browser window was resized by someone else around export 20, and a second AlignCanvas tab (423293002) was opened and closed by someone else. Neither touched my tab's template or settings.
| 22 | Elastic Scroll | promo_night, stat_59, chat, promo_wismo, stat_5400, bilingual, promo_offer | clean light, cards 4:5 (scrolls forward then springs back) | 13.0s | artel-22-elastic-scroll.mp4 | 64.8 MB | yes, 6.5 s, artel-22-elastic-scroll-still.png |
| 23 | Paper Roll | hero_luz, edu_who_answers, promo_wismo, promo_night, stat_59, chat, orb_trio, stat_5400, promo_day_night, bilingual, stat_week, promo_countdown, artel_black, promo_offer, tagline | clean light, cards 4:5. Rolling drum of 3-card rows; 7 images repeated whole rows back to back, 15 is clean | 26.0s | artel-23-paper-roll.mp4 | 191.0 MB | yes, 13.0 s, artel-23-paper-roll-still.png |
| 24 | Spiral Collection | hero_luz, orb_pink, orb_trio, film_cx_rings, p_portrait_berley, p_portrait_felix, artel_black, p_discs, promo_brand, billboard, stat_59, tagline | DARK #0B0B0C, Shadow + Glass on, cards 4:5. Tunnel of small cards: text posts too small to read, so a visual set; dark reads much better than light here | 24.0s | artel-24-spiral-collection.mp4 | 147.5 MB | yes, 7.2 s, artel-24-spiral-collection-still.png |

Running total after 24: 1,990.0 MB of video.
