# zpth.github.io

Site for **ZPTH** — an iPhone app that turns the TrueDepth camera and LiDAR scanner
into a real-time visual instrument. [App Store ↗](https://apps.apple.com/us/app/zpth/id6777710069)

Static, no build step. GitHub Pages serves it from `main` / root; `.nojekyll` keeps it
as plain files.

## What's here

| file | what it is |
| --- | --- |
| `index.html` | the whole site — ten sections, driven by wheel / arrows / dots / swipe |
| `styles.css` | three-column desktop shell, bottom-sheet mobile, light + dark |
| `depth.js` | live WebGL engine: a synthetic depth field painted by all 30 modes |
| `app.js` | section navigation, the in-phone mode switcher, reels, mobile sheet |
| `privacy.html` | privacy policy |
| `shots/` | real captures from the app, cropped free of the App Store text overlays |

## The live engine

`depth.js` builds a synthetic depth field in a fragment shader — head and shoulders,
a doorway, a plant, a sofa — and then paints it with browser re-creations of each of
the app's 30 depth modes. Tap any mode name in the phone (or in the right-hand list)
to switch; the render cross-fades the way the app does.

It is a re-creation, not the app: the app runs the real thing on live depth from the
camera. The label in the corner of the viewport says which you are looking at —
*live in your browser* vs *captured in ZPTH*.

Adding a mode means two edits in `depth.js`: an entry in the `MODES` table (name,
accent colour, description) and a branch in `shade()`. Keep the two in the same order.

## Privacy

The site makes **no third-party requests** — no webfonts, no CDNs, no analytics.
System font stacks only.

The one exception is the **Reels** section: opening it loads Instagram embed iframes
from `instagram.com`, which sets Instagram's own cookies and sees the visitor's IP.
Nothing loads until that section is opened. If you want the site fully request-free,
delete the `reels: true` entry from `SECTIONS` in `app.js`.

## Local preview

```sh
python3 -m http.server 8899
# open http://127.0.0.1:8899
```

WebGL is required for the live render; without it the phone falls back to real
screenshots automatically.
