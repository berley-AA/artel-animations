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
