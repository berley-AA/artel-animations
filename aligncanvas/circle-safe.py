"""Circle-safe square versions of showcase cards for round-lens AlignCanvas templates.

Each card (2160x2700) is re-composed on a 2160x2160 square so that all of its content
(title + orb, ring, discs) sits inside the inscribed circle with a margin, scaled down
uniformly (never stretched). Footers are dropped. The background is rebuilt from the
card's own edge columns and the card is feathered in, so there is no seam.

Usage: python3 circle-safe.py   (writes showcase/c_<name>.jpg)
"""
import numpy as np
from PIL import Image, ImageFilter

SRC = 'showcase/'
CARDS = {
    # name: drop rows from this y down (footer), or None
    'orb_trio': None,
    'orb_pink': None,
    'hero_luz': 2400,          # "Your new sales assistant." footer
    'film_colour_lineup': None,
    'film_cx_rings': None,
    'p_mark': None,
    'p_discs': None,
}
OUT = 2160
FILL = 0.84                     # content radius as a share of the circle radius


def edge_bg(a):
    """Per-row background colour from the left/right 40 px strips."""
    strips = np.concatenate([a[:, :40], a[:, -40:]], axis=1)
    return np.median(strips, axis=1)  # (H, 3)


def make(name, footer):
    im = Image.open(SRC + name + '.jpg').convert('RGB')
    a = np.asarray(im).astype(np.float32)
    H, W, _ = a.shape
    bg = edge_bg(a)
    if footer:
        a[footer:] = bg[footer:, None, :]
    mask = np.abs(a - bg[:, None, :]).sum(2) > 60
    ys, xs = np.nonzero(mask)
    cx, cy = (xs.min() + xs.max()) / 2, (ys.min() + ys.max()) / 2
    r = np.sqrt((xs - cx) ** 2 + (ys - cy) ** 2).max()
    s = min(1.0, FILL * (OUT / 2) / r)

    # background square: vertical gradient sampled around the content centre
    rows = np.clip(cy + (np.arange(OUT) - OUT / 2) / s, 0, H - 1).astype(int)
    canvas = np.repeat(bg[rows][:, None, :], OUT, axis=1)
    base = Image.fromarray(canvas.clip(0, 255).astype(np.uint8))

    card = Image.fromarray(a.clip(0, 255).astype(np.uint8))
    nw, nh = round(W * s), round(H * s)
    card = card.resize((nw, nh), Image.LANCZOS)
    feather = Image.new('L', (nw, nh), 0)
    pad = max(8, int(0.05 * nw))
    feather.paste(255, (pad, pad, nw - pad, nh - pad))
    feather = feather.filter(ImageFilter.GaussianBlur(pad / 2))
    ox, oy = round(OUT / 2 - cx * s), round(OUT / 2 - cy * s)
    base.paste(card, (ox, oy), feather)
    base.save(SRC + 'c_' + name + '.jpg', quality=93)
    print(f'c_{name}.jpg  scale {s:.3f}  content radius {r:.0f}px  centre ({cx:.0f},{cy:.0f})')


if __name__ == '__main__':
    for n, f in CARDS.items():
        make(n, f)
