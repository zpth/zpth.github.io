#!/usr/bin/env python3
"""Pull every per-mode control out of SettingsSheet.swift, plus the enum option
labels the pickers reference, into JSON we can drive the docs page with."""
import re, json, sys, pathlib

ROOT = pathlib.Path("/Users/ari/Documents/XcodeProjects/ZPTH/ZPTH")
sheet = (ROOT / "UI/SettingsSheet.swift").read_text()

# ---- 1. slice modeSection into `case .mode:` blocks -------------------------
start = sheet.index("private var modeSection: some View")
body = sheet[start:]
# stop at the end of the switch (next top-level `// MARK:` after the switch)
end = body.find("\n    // MARK:", 200)
if end > 0:
    body = body[:end]

case_re = re.compile(r"^\s{8}case (\.[a-zA-Z, .]+):\s*$", re.M)
marks = list(case_re.finditer(body))
blocks = {}
for i, m in enumerate(marks):
    names = [n.strip().lstrip(".") for n in m.group(1).split(",")]
    seg = body[m.end(): marks[i + 1].start() if i + 1 < len(marks) else len(body)]
    for n in names:
        blocks[n] = seg

# ---- 2. control patterns ----------------------------------------------------
PATS = [
    # sliderRow("Label", get:…, set:…, LO...HI, "fmt")
    ("slider", re.compile(
        r'sliderRow\(\s*"([^"]+)"[^)]*?,\s*(-?[\d.]+)\s*\.\.\.\s*(-?[\d.]+)\s*(?:,\s*"([^"]*)")?\s*\)',
        re.S)),
    ("slider01", re.compile(r'stepper01\(\s*"([^"]+)"')),
    ("stepper", re.compile(
        r'Stepper\(\s*"([^"]+?):[^"]*"[^)]*?in:\s*(-?[\d.]+)\s*\.\.\.\s*(-?[\d.]+)', re.S)),
    ("toggle", re.compile(r'Toggle\(\s*"([^"]+)"')),
    ("picker", re.compile(
        r'Picker\(\s*"([^"]+)"\s*,\s*selection[^)]*?\)\s*\{\s*(?:\n\s*)*ForEach\(\s*([A-Za-z0-9_]+)\.',
        re.S)),
    ("picker_manual", re.compile(
        r'Picker\(\s*"([^"]+)"\s*,\s*selection[^{]*\{\s*((?:\s*Text\("[^"]+"\)\.tag\([^)]*\)\s*)+)', re.S)),
    ("colour", re.compile(r'colorPickerRow\(\s*"([^"]+)"')),
    ("colourmap", re.compile(r'colorMapPicker\(\s*"([^"]+)"')),
]

def controls_for(seg):
    found = {}
    order = []
    for kind, pat in PATS:
        for m in pat.finditer(seg):
            label = m.group(1)
            key = (label, kind)
            if label in found:            # first wins; avoids picker/picker_manual dupes
                continue
            entry = {"label": label, "kind": kind, "at": m.start()}
            if kind == "slider":
                entry["range"] = [m.group(2), m.group(3)]
                if m.group(4): entry["fmt"] = m.group(4)
            elif kind == "slider01":
                entry["kind"] = "slider"; entry["range"] = ["0", "1"]
            elif kind == "stepper":
                entry["range"] = [m.group(2), m.group(3)]
            elif kind == "picker":
                entry["enum"] = m.group(2)
            elif kind == "picker_manual":
                entry["kind"] = "picker"
                entry["options"] = re.findall(r'Text\("([^"]+)"\)', m.group(2))
            found[label] = entry
            order.append(entry)
    order.sort(key=lambda e: e["at"])
    for e in order: e.pop("at", None)
    return order

# trailing explanatory Text("…") the developer wrote for each mode
def blurb_for(seg):
    outs = re.findall(r'Text\(\s*"((?:[^"\\]|\\.){40,})"\s*\)', seg)
    return [o.replace('\\"', '"') for o in outs]

modes = {}
for name, seg in blocks.items():
    modes[name] = {"controls": controls_for(seg), "blurbs": blurb_for(seg)}

# ---- 3. enum option labels --------------------------------------------------
enums = {}
swift_files = list(ROOT.rglob("*.swift"))
enum_re = re.compile(r'enum\s+([A-Za-z0-9_]+)\s*:[^{]*\{(.*?)\n\}', re.S)
for f in swift_files:
    txt = f.read_text(errors="ignore")
    for m in enum_re.finditer(txt):
        nm, bodytxt = m.group(1), m.group(2)
        labels = re.findall(r'case\s+\.?([a-zA-Z0-9_]+)\s*:\s*return\s+"([^"]+)"', bodytxt)
        if labels:
            seen, opts = set(), []
            for _, lab in labels:
                if lab not in seen:
                    seen.add(lab); opts.append(lab)
            enums.setdefault(nm, opts)

for name, d in modes.items():
    for c in d["controls"]:
        if c.get("enum"):
            c["options"] = enums.get(c["enum"], [])

out = {"modes": modes, "enumCount": len(enums)}
print(json.dumps({k: {"n": len(v["controls"]), "blurbs": len(v["blurbs"])}
                  for k, v in modes.items()}, indent=0))
print("modes parsed:", len(modes))
pathlib.Path(sys.argv[1]).write_text(json.dumps(out, indent=1))
