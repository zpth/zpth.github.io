#!/usr/bin/env python3
"""The 15 monocular modes moved out of SettingsSheet's switch into concrete Views
(MonoSettingsSections.swift) to stop the Swift runtime hanging on a 45-branch
opaque type. Parse them from there instead, plus the shared Mono Depth block."""
import re, json, pathlib, sys

SRC = pathlib.Path("/Users/ari/Documents/XcodeProjects/ZPTH/ZPTH/UI/MonoSettingsSections.swift")
txt = SRC.read_text()

STRUCT2MODE = {
    "ParallaxMonoSection": "parallax", "AnaglyphMonoSection": "anaglyph",
    "ApertureMonoSection": "aperture", "NebulaMonoSection": "nebula",
    "MotesMonoSection": "motes", "WoodblockMonoSection": "woodblock",
    "StippleMonoSection": "stipple", "LatticeMonoSection": "lattice",
    "DatamoshMonoSection": "datamosh", "AerialMonoSection": "aerial",
    "GodlightMonoSection": "godlight", "HologramMonoSection": "hologram",
    "PapercutMonoSection": "papercut", "RisoMonoSection": "riso",
    "VertigoMonoSection": "vertigo",
}

# slice the file into `struct X: View { ... }` blocks
marks = [(m.start(), m.group(1)) for m in re.finditer(r'struct\s+([A-Za-z0-9_]+)\s*:\s*View\s*\{', txt)]
blocks = {}
for i, (pos, name) in enumerate(marks):
    end = marks[i + 1][0] if i + 1 < len(marks) else len(txt)
    blocks[name] = txt[pos:end]

PATS = [
    ("slider", re.compile(
        r'mSlider\(\s*"([^"]+)"[^)]*?,\s*(-?[\d.]+)\s*\.\.\.\s*(-?[\d.]+)\s*(?:,\s*"([^"]*)")?\s*\)', re.S)),
    ("colour", re.compile(r'mColor\(\s*"([^"]+)"')),
    ("toggle", re.compile(r'Toggle\(\s*"([^"]+)"')),
]
# Pickers are matched separately: the `Binding(get:{…}, set:{…})` argument is full of
# parens and braces, so a single regex either stops short or runs into the next control.
# Find each `Picker("Label"` and scan a bounded window forward for its option source.
PICKER = re.compile(r'Picker\(\s*"([^"]+)"')

def controls(seg, enums):
    found, order = {}, []
    for kind, pat in PATS:
        for m in pat.finditer(seg):
            label = m.group(1)
            if label in found:
                continue
            e = {"label": label, "kind": kind, "at": m.start()}
            if kind == "slider":
                e["range"] = [m.group(2), m.group(3)]
            elif kind == "picker_enum":
                e["kind"] = "picker"; e["options"] = enums.get(m.group(2), [])
            elif kind == "picker_inline":
                e["kind"] = "picker"; e["options"] = re.findall(r'Text\("([^"]+)"\)', m.group(2))
            found[label] = e; order.append(e)

    for m in PICKER.finditer(seg):
        label = m.group(1)
        if label in found:
            continue
        win = seg[m.end(): m.end() + 500]
        win = win[:win.find('Picker(')] if 'Picker(' in win else win
        e = {"label": label, "kind": "picker", "at": m.start()}
        fe = re.search(r'ForEach\(\s*([A-Za-z0-9_]+)\.', win)
        if fe:
            e["options"] = enums.get(fe.group(1), [])
        else:
            e["options"] = re.findall(r'Text\("([^"]+)"\)\s*\.tag', win)
        found[label] = e; order.append(e)

    order.sort(key=lambda x: x["at"])
    for e in order: e.pop("at", None)
    return order

# enum labels (MonoBasePalette etc.)
ROOT = pathlib.Path("/Users/ari/Documents/XcodeProjects/ZPTH/ZPTH")
enums = {}
for f in ROOT.rglob("*.swift"):
    t = f.read_text(errors="ignore")
    for m in re.finditer(r'enum\s+([A-Za-z0-9_]+)\s*:[^{]*\{(.*?)\n\}', t, re.S):
        labs = re.findall(r'case\s+\.?([a-zA-Z0-9_]+)\s*:\s*return\s+"([^"]+)"', m.group(2))
        if labs:
            seen, opts = set(), []
            for _, l in labs:
                if l not in seen: seen.add(l); opts.append(l)
            enums.setdefault(m.group(1), opts)

def blurbs(seg):
    return [b.replace('\\n', ' ').replace('\\"', '"').strip()
            for b in re.findall(r'Text\(\s*"((?:[^"\\]|\\.){60,})"\s*\)', seg)]

out = {"modes": {}, "monoGlobals": None}
for struct, mode in STRUCT2MODE.items():
    seg = blocks.get(struct)
    if not seg:
        print("MISSING struct", struct); continue
    out["modes"][mode] = {"controls": controls(seg, enums), "blurbs": blurbs(seg)}

g = blocks.get("MonoGlobalsSection")
out["monoGlobals"] = {"controls": controls(g, enums), "blurbs": blurbs(g)}

for m, d in out["modes"].items():
    print(f'{m:10s} {len(d["controls"]):3d} controls, {len(d["blurbs"])} notes')
print(f'\nMono Depth (shared): {len(out["monoGlobals"]["controls"])} controls')
for c in out["monoGlobals"]["controls"]:
    print("   ", c["kind"][:6], c["label"], c.get("range",""), (c.get("options") or "")[:6])
pathlib.Path(sys.argv[1]).write_text(json.dumps(out, indent=1))
