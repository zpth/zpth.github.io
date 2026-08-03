# zpth.github.io

Site for **ZPTH** — an iPhone app that turns the TrueDepth camera and LiDAR scanner
into a real-time visual instrument. [App Store ↗](https://apps.apple.com/us/app/zpth/id6777710069)

Static, no build step. GitHub Pages serves it from `main` / root; `.nojekyll` keeps it
as plain files.

## What's here

| file | what it is |
| --- | --- |
| `index.html` | the whole site — eleven sections, driven by wheel / arrows / dots / swipe |
| `styles.css` | three-column desktop shell, bottom-sheet mobile, dark |
| `depth.js` | live WebGL engine: a photo + its depth map painted by all 45 modes |
| `app.js` | section navigation, the in-phone mode switcher, reels, Reference tab, mobile sheet |
| `docs-data.js` | generated: every control the app exposes, with a description |
| `privacy.html` | privacy policy |
| `scene.jpg` / `scene-depth.png` | the photograph the live engine runs on, and its depth map |
| `preview.mp4` | the App Store app preview, transcoded from Apple's HLS |
| `shots/` | real captures from the app, cropped free of the App Store text overlays |
| `fonts/` | JetBrains Mono (OFL 1.1, licence included) |

## The live engine

`depth.js` samples two textures — `scene.jpg` (what the colour camera sees) and
`scene-depth.png` (0 = nearest, 1 = farthest) — and paints them with browser
re-creations of each of the app's 45 depth modes — including the Wave-9 monocular
family, which in the app gets its depth from the same Depth Anything V2 model used here. Tap any mode name in the phone (or
in the right-hand list) to switch; the render cross-fades the way the app does. A slow
`uCam` drift keeps a still photograph reading as a live feed.

The depth map was estimated offline with Apple's Core ML build of **Depth Anything V2
(small)** — `apple/coreml-depth-anything-v2-small` on Hugging Face. To swap in a new
photograph, run that model over it, normalise to 0 = near / 1 = far, and drop the two
files in. Nothing at runtime needs a model.

It is a re-creation, not the app: the app runs the real thing on live depth from the
camera, so shaders may appear different inside it. The label in the corner of the
viewport says which you are looking at.

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

## The Reference tab

The last section drops the phone and becomes a documentation page: a pill switcher over
**Universal + 45 modes**, each loading a table of that mode's settings with ranges and a
short description of what each one does.

`docs-data.js` is generated, not hand-written. `extract.py` parses `SettingsSheet.swift`
in the app repo for every `sliderRow` / `stepper01` / `Toggle` / `Picker` / `colorPickerRow`
in each `case .mode:` block — labels, slider ranges and picker options — plus the
explanatory `Text(...)` the developer wrote per mode. `build_docs.py` merges that with the
authored descriptions and emits the JS. Re-run both after changing settings in the app so
the table cannot drift from the code.
