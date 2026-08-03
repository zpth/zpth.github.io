#!/usr/bin/env python3
"""Merge the controls parsed out of SettingsSheet.swift with authored
descriptions, and emit docs-data.js for the site's Reference tab."""
import json, pathlib, sys

RAW = json.load(open("modes_raw.json"))["modes"]

# The 15 monocular modes were moved out of SettingsSheet's switch into concrete Views
# (MonoSettingsSections.swift), so they are parsed separately and override what is here.
MONO = json.load(open("mono_raw.json"))
RAW.update(MONO["modes"])
MONO_GLOBALS = MONO["monoGlobals"]
MONO_IDS = set(MONO["modes"])

# numeric pickers whose options are built from a Swift range, not literal Text()
NUMERIC_OPTS = {
 ("aperture", "Iris Blades"): ["Circular", "5 blades", "6", "7", "8", "9"],
 ("nebula", "Octaves"): ["1", "2", "3", "4"],
 ("motes", "Layers"): ["3", "4", "5", "6"],
 ("woodblock", "Hatch Levels"): ["1", "2", "3", "4"],
 ("stipple", "Levels"): ["2", "3", "4", "5"],
 ("papercut", "Plates"): ["3", "4", "5", "6", "7", "8"],
 ("riso", "Plates"): ["2", "3", "4"],
}
for mid, mdata in MONO["modes"].items():
    for c in mdata["controls"]:
        k = (mid, c["label"])
        if k in NUMERIC_OPTS:
            c["options"] = NUMERIC_OPTS[k]

# ── descriptions, keyed "mode|Label"; "*|Label" is the shared fallback ───────
D = {
# shared ---------------------------------------------------------------------
"*|Colour Map": "Replaces the mode's own colours with one of the shared depth colour maps.",
"*|Map": "Which shared colour map to use once Colour Map is on.",
"*|Colour-Map Effect": "Replaces the mode's own colours with one of the shared depth colour maps.",
"*|Invert Depth": "Flips near and far, so the effect reads from the back of the scene forward.",
"*|Invert": "Flips the tonal range, swapping which end of the depth reads as ink.",
"*|Bloom": "Spills a soft glow out of the brightest areas.",
"*|Glow": "Adds a halo around lit areas.",
"*|Background": "Brightness of everything the effect does not claim — 0 leaves it black.",
"*|Base Colour": "The main colour the effect is drawn in.",
"*|Saturation": "Colour intensity, from grey to fully saturated.",
"*|Vignette": "Darkens the frame corners.",
"*|Grain": "Film-grain noise over the result.",
"*|Paper Grain": "Fibre texture of the simulated paper stock.",
"*|Paper": "Colour of the paper the ink is printed on.",
"*|Specular": "Strength of the tight highlight where light hits square on.",
"*|Sparkle": "How much glitter fires off the surface.",
"*|Twinkle": "Speed at which individual sparkles blink on and off.",
"*|Relief": "Exaggerates the depth surface, deepening the sense of height.",
"*|Camera Tint": "How much of the real camera colour bleeds into the effect.",
"*|Density": "How much of the effect fills the frame.",
"*|Scene Mix": "Blends between the pure depth field (0) and the camera image (1).",
"*|Second Ink": "Brings in a second ink colour for the darkest tones.",
"*|Ink": "Colour of the ink the marks are printed in.",
"*|Light": "Colour of the light source.",
"*|Size Variance": "How much individual elements differ in size.",
"*|Depth Bands": "Terraces the depth into discrete layers instead of a smooth ramp.",
# ── Wave-9 shared "Mono Depth" block (all 15 monocular modes) ───────────────
"mono|Stability": "Trades flicker for responsiveness in the neural depth. Higher is steadier, lower reacts faster.",
"mono|Edge Snap": "Pulls the estimated depth back onto real image edges, sharpening object boundaries.",
"mono|Depth Curve": "Redistributes contrast between the near subject and the far background.",
"mono|Focus Plane": "Which depth the mode treats as its subject.",
"mono|Focus Band": "How wide a slice around that plane still counts as the subject.",
"mono|Relief": "Exaggerates the depth surface before the mode reads it.",
"mono|Edge Sensitivity": "How large a depth step has to be to count as an edge.",
"mono|Depth Scale": "Scales the whole depth field, making the scene read deeper or flatter.",
"mono|Sun Azimuth": "Direction of the virtual sun that lights the depth field.",
"mono|Sun Elevation": "How high that sun sits. Low angles rake across the relief.",
"mono|Depth Near": "Colour of the nearest depth, on the Custom palette.",
"mono|Depth Far": "Colour of the farthest depth, on the Custom palette.",
"mono|Depth Ambient": "Fill light on the depth field, so surfaces facing away are not pure black.",
"mono|Depth Edges": "Weight of the edge lines drawn on the depth field.",
"mono|Inference Rate": "How often the neural depth model runs. Lower rates save battery and heat.",

# ── new per-mode controls ───────────────────────────────────────────────────
"*|Depth Palette": "Which built-in palette colours the depth field. Each mode ships a different one so fifteen depth-driven modes do not read as fifteen shades of the same blue.",
"parallax|Orbit Shape": "Path the virtual camera travels.",
"parallax|Quality": "How many steps the reprojection takes. Fewer is faster.",
"parallax|Edges": "What happens at the frame edge as the camera moves — zoom in to hide it, or fade it out.",
"anaglyph|Encoding": "How the two eyes are combined. Dubois is the cleanest red/cyan; Wiggle needs no glasses.",
"aperture|Iris Blades": "Shape of the iris, which is the shape out-of-focus highlights take.",
"aperture|Focus": "How focus is chosen: set by hand, automatically on the nearest subject, racked between two distances, or slowly breathing.",
"nebula|Octaves": "How many layers of noise build the cloud. More is more detailed and slower.",
"nebula|Steps": "Raymarching steps through the cloud — the heaviest setting in the app.",
"motes|Layers": "How many depth strata the particles are spread across.",
"woodblock|Hatch Levels": "How many passes of cross-hatching build up the darks.",
"woodblock|Tone From": "Which signal sets the tone: the camera image, the depth shading, or both.",
"stipple|Levels": "How many dot sizes the tone is quantised to.",
"lattice|Scan": "Direction the scanning band travels through depth, or off entirely.",
"lattice|Fill": "What sits behind the wireframe: nothing, the dimmed scene, or flat shading.",
"godlight|Samples": "How many steps each shaft is marched. More is smoother and slower.",
"papercut|Plates": "How many paper layers the depth is cut into.",
"papercut|Palette": "Which set of paper colours the plates are cut from.",
"papercut|Colour From": "Whether plate colour comes from the palette, from the scene, or a mix of both.",
"riso|Plates": "How many ink plates are printed.",
"riso|Screen": "Shape of the halftone cell on each plate.",
"vertigo|Curve": "How the dolly moves: a continuous sine, a triangle, or a single shot.",
"vertigo|Pivot": "What the zoom pivots around — the centre of the frame, or the subject.",

"dither|Sparkle Colour": "Colour of the sparkles that fire along edges.",
"motes|Wind Speed": "How fast the motes drift on the wind.",
"riso|Tone Curve": "How grey values map onto ink coverage on each plate.",
"nebula|Density": "How thick the cloud is.",
"aerial|Density": "Overall thickness of the atmosphere between you and the scene.",
"godlight|Density": "How densely the light shafts fill the air.",
"motes|Density": "How many motes are in the air.",
"ironFilings|Density": "How many filings cover the frame.",

# 01 Environment -------------------------------------------------------------
"environment|Max Range": "The far limit in metres. Anything beyond it clamps to the far colour.",
"environment|Noise Reduction": "Discards depth readings that jitter by less than this, cleaning up sensor speckle.",
# 02 Face --------------------------------------------------------------------
"faceDetail|Detail Range": "Depth window around the tracked face, in metres. Narrow it to isolate the face from the room.",
"faceDetail|Facial Detail": "Multiplies the relief so small features — nose, lips, brows — stand out.",
"faceDetail|Tracking Speed": "How quickly the depth window follows the face. Low is steadier, high keeps up with fast movement.",
"faceDetail|Focus": "Which part of the face the depth window centres on.",
"faceDetail|Face Depth": "Motion keeps Apple's depth smoothing on. Static turns it off for sharper relief and patches holes spatially instead — best when the face holds still.",
# 03 Raw ---------------------------------------------------------------------
"raw|Glitch Speed": "How fast the horizontal tear artefacts move.",
"raw|Glitch Intensity": "How far the torn scanlines displace.",
"raw|Reflection": "Sensitivity to shiny surfaces, which the depth sensor reads unreliably.",
"raw|Topographic Bands": "Number of contour steps carved through the depth.",
"raw|Posterize Bands": "How many flat tone levels the image is crushed to.",
"raw|Scanline": "Style of the CRT scanline overlay.",
# 04 Plasma ------------------------------------------------------------------
"plasma|Flow Speed": "How fast the nebula filaments drift.",
"plasma|Filament Density": "How many filament strands the field carries.",
"plasma|Filament Sharpness": "Crispness of each strand, from soft cloud to hard thread.",
"plasma|Warp Amount": "How strongly the field twists around itself.",
"plasma|Glow Intensity": "Brightness of the light coming off the filaments.",
"plasma|Depth Influence": "How much the depth field steers the plasma rather than letting it flow freely.",
"plasma|Face Mesh Input": "Front camera only: drives the plasma from the TrueDepth face mesh instead of the plain depth map.",
# 05 Organic -----------------------------------------------------------------
"organic|Growth Speed": "Rate at which the reaction-diffusion pattern spreads.",
"organic|Seed Strength": "How strongly the closest point seeds new growth.",
"organic|Offshoot": "Tendency to sprout side branches rather than grow smoothly.",
"organic|Slither": "Pushes the pattern along with device tilt, so the organism crawls.",
"organic|Depth Tint": "How much distance colours the organism.",
# 06 Data --------------------------------------------------------------------
"data|Spectrum": "Colour ramp applied to the printed numbers, near to far.",
"data|Font": "Typeface the distance readouts are drawn in.",
"data|Points": "How many depth points get printed as numbers.",
"data|Text Size": "Size of each number.",
"data|Overlap": "How closely numbers may crowd before they are culled.",
"data|Max Range": "The distance in metres that maps to the far end of the spectrum.",
# 07 Contour -----------------------------------------------------------------
"contour|Spectrum": "Colour ramp the depth is painted with before the isolines go on.",
"contour|Contour Density": "How many isolines are drawn through the depth range.",
"contour|Line Thickness": "Weight of each isoline.",
"contour|Sensitivity": "How much depth change is needed to draw a line.",
"contour|Falloff": "Far distance in metres past which the image drops to black.",
# 08 Hillshade ---------------------------------------------------------------
"hillshade|Ambient": "Fill light, so slopes facing away from the sun are not pure black.",
"hillshade|Sun Azimuth": "Compass direction of the virtual sun. Spin it to rake light across the scene.",
"hillshade|Sun Elevation": "How high the virtual sun sits. Low angles cast long, dramatic relief.",
"hillshade|Suns": "One sun, or several from different directions for a softer survey-map look.",
# 09 Chrome ------------------------------------------------------------------
"liquidChrome|Material": "Which metal or substance the surface is made of — chrome, gold, wax or clay.",
"liquidChrome|Env Rotation": "Spins the reflected environment, sweeping highlights across the form.",
"liquidChrome|Fresnel Rim": "Brightness of the grazing-angle edge light.",
"liquidChrome|Liquid Wobble": "Makes the metal ripple as though it were still molten.",
# 10 Oil Slick ---------------------------------------------------------------
"oilSlick|Palette": "Which iridescence to simulate — petrol, beetle shell, laser or travelling fringes.",
"oilSlick|Fringe Freq": "How tightly the interference bands are packed.",
"oilSlick|Drift Speed": "How fast the film thickness drifts, so the colours crawl.",
"oilSlick|Travel Speed": "Speed the fringes travel across the surface, on the Travelling palette.",
"oilSlick|Refractive Index": "Optical density of the film, which shifts the whole hue sequence.",
"oilSlick|Edge Shift": "Extra hue rotation at silhouettes, where the film would thin.",
# 11 Pulsar ------------------------------------------------------------------
"joyDivision|Base Displacement (Z)": "How far depth pushes each scan line off its baseline.",
"joyDivision|Line Thickness": "Weight of each scan line.",
"joyDivision|Rotation": "Rotates the whole line field.",
"joyDivision|Dot Size": "Size of each dot when Point / Dotted Mode is on.",
"joyDivision|Hidden-Line Occlusion": "Lines nearer the camera hide the ones behind, as on a real Rutt-Etra rig.",
"joyDivision|Point / Dotted Mode": "Draws the field as dots instead of continuous lines.",
"joyDivision|Ripple Speed": "Speed of the travelling wave running through the lines.",
"joyDivision|Ripple Scale": "Wavelength of that travelling wave.",
"joyDivision|Audio Reactive (mic)": "Lets live sound from the microphone drive the lines. Opt-in; audio is analysed on device and never recorded.",
"joyDivision|Beat Detect": "Fires an extra kick on detected beats.",
"joyDivision|Sensitivity (Gain)": "Input gain on the microphone signal.",
"joyDivision|Noise Gate": "Ignores sound below this level, so room hiss does not drive the lines.",
"joyDivision|Attack": "How fast the lines respond to a rise in volume.",
"joyDivision|Release (smoothing)": "How slowly they settle back afterwards.",
"joyDivision|Beat Sensitivity": "How easily a transient counts as a beat.",
"joyDivision|Falloff Start (near→far)": "Depth at which lines begin to fade out.",
"joyDivision|Falloff End": "Depth at which they have faded completely.",
"joyDivision|Wrap Around (3D projection)": "Wraps the line field around the form instead of leaving it flat on screen.",
"joyDivision|Wrap Depth": "How far that wrap projects.",
"joyDivision|Depth Layers (voxel slabs)": "Slices the depth into discrete slabs, each with its own lines.",
"joyDivision|Layer Count": "How many of those slabs.",
"joyDivision|Colour Lines from RGB Camera": "Takes the line colour from the real camera image.",
"joyDivision|Colour Depth Start (near)": "Near limit of the band that gets camera colour.",
"joyDivision|Colour Depth End (far)": "Far limit of that band.",
"joyDivision|Colour Mix": "How much camera colour is blended in.",
"joyDivision|Face-Detail Mode (front cam)": "Front camera only: tightens the depth range onto a face.",
"joyDivision|Depth Contrast": "Gamma on the face depth, deepening or flattening the relief.",
"joyDivision|Detail Boost": "Amplifies fine facial structure.",
"joyDivision|Line Colour": "How the lines are coloured — flat, by depth, or from the camera.",
"joyDivision|Page": "Which tab of the Pulsar controls is showing: Geometry, Modulation, Audio, Depth, RGB or Face.",
# 12 Sonar -------------------------------------------------------------------
"sonar|Sweep": "Timed fires pings automatically; Manual fires one on each tap of the preview.",
"sonar|Rotating Beam": "Adds a radar-style beam sweeping around the scope.",
"sonar|Ping Speed": "How fast the wavefront travels out from the camera.",
"sonar|Ping Rate": "How often a new ping is fired, on the Timed sweep.",
"sonar|Shell Width": "Thickness of the lit shell at the wavefront.",
"sonar|Beam Speed": "Rotation speed of the sweeping beam.",
"sonar|Beam Width": "Angular width of that beam.",
"sonar|Range Rings": "Spacing of the fixed distance rings.",
"sonar|Scanline": "Strength of the CRT scanline overlay.",
"sonar|Phosphor": "Colour of the scope phosphor.",
# 13 Pin Screen --------------------------------------------------------------
"pinScreen|Pin Spacing": "Distance between pins, in pixels. Lower packs in more pins.",
"pinScreen|Dot Size": "Diameter of each pin head.",
"pinScreen|Depth Push": "How far a near surface drives its pins forward, out of the plate.",
"pinScreen|Flat Area": "Size of the resting plane. 1 fills the frame; lower contracts it so near objects burst into the space around.",
"pinScreen|Depth Brightness": "How much closer pins are lit brighter than far ones.",
"pinScreen|Pin Colour": "Colour of the pin heads.",
# 14 Voxel -------------------------------------------------------------------
"voxel|Cube Size": "Edge length of each cube, in pixels.",
"voxel|Z-Steps": "How many depth levels the scene is terraced into.",
"voxel|Side Shadow": "Darkens the cube faces that step up from their neighbours, for a 3-D staircase.",
"voxel|Studs": "Puts a stud on top of every cube, toy-brick style.",
# 15 Facets ------------------------------------------------------------------
"crystalline|Facet Size": "Size of each flat-shaded facet, in pixels.",
"crystalline|Edge Density": "Packs smaller facets along real silhouettes, so edges stay crisp.",
"crystalline|Sparkle Colour": "Colour of the glints thrown off the facets.",
"crystalline|Facet Outlines": "Draws a line around every facet.",
# 16 Light Trails ------------------------------------------------------------
"longExposure|Exposure Length": "How long a trail persists before it decays away.",
"longExposure|Motion Threshold": "How far something must move, in metres, before it paints a trail.",
"longExposure|Near Band": "Depth of the near layer that is allowed to leave trails.",
"longExposure|Depth Falloff": "Distance in metres over which trails fade out.",
"longExposure|Additive Blend": "Overlapping trails add up and blow out, instead of covering one another.",
"longExposure|Near Tint": "Colour trails take when they are close.",
"longExposure|Far Tint": "Colour they take further away.",
"longExposure|Clear Trail": "Wipes the accumulated exposure and starts again.",
# 17 Miniature ---------------------------------------------------------------
"tiltShift|Focus Depth": "Which distance stays sharp.",
"tiltShift|Tilt": "Tilts the focus band so it follows the frame rather than the depth.",
"tiltShift|Band Width": "Thickness of the in-focus slab.",
"tiltShift|Aperture": "How fast things blur once they leave that slab.",
"tiltShift|Max Blur": "Largest blur radius, in pixels.",
"tiltShift|Bokeh Bloom": "How much highlights bloom into circles when defocused.",
# 18 Iron Filings ------------------------------------------------------------
"ironFilings|Fibre Length": "How long each filing is drawn.",
"ironFilings|Field": "Which direction the magnetic field runs.",
"ironFilings|Fibre Density": "How many filings cover the frame.",
"ironFilings|Depth Bands": "Terraces the field into distinct depth shells.",
"ironFilings|Swirl": "Curls the field lines around the form.",
"ironFilings|Crawl Speed": "How fast the filings creep along the field.",
"ironFilings|Ink Contrast": "Contrast between the filings and the ground.",
"ironFilings|Field Smoothing": "Smooths the field so lines flow instead of scattering.",
"ironFilings|Colour Tint": "Tints the filings by depth instead of leaving them mono.",
"ironFilings|Ink Colour": "Colour of the filings.",
# 19 Dither ------------------------------------------------------------------
"dither|Cell Size": "Size of one dither cell, in pixels — effectively the pixel-art resolution.",
"dither|Shades": "How many tone levels the image is reduced to.",
"dither|Depth Contrast": "Stretches the depth range before it is dithered.",
"dither|Pixel Fill": "How much of each cell the ink fills.",
"dither|Grid Angle": "Rotates the dither grid.",
"dither|Grid Shear": "Skews the grid.",
"dither|Cell Jitter": "Randomises cell positions, breaking up the regular pattern.",
"dither|Softness": "Softens the hard edge of each dot.",
"dither|Density Falloff": "Thins the dots out with distance.",
"dither|Shimmer": "Animates the threshold so the pattern crawls.",
"dither|Edge Thickness": "Weight of the outline drawn on silhouettes.",
"dither|Edge Band": "How wide a depth step counts as an edge.",
"dither|Edge Colour": "Colour of that outline.",
"dither|Sparkle Density": "How many sparkles appear along edges.",
"dither|Sparkle Speed": "How fast they flicker.",
"dither|Mid Colour": "Colour of the mid tones.",
"dither|Highlight Colour": "Colour of the brightest tones.",
# 20 Juicy -------------------------------------------------------------------
"juicy|Velour Colour": "Colour of the velour fabric.",
"juicy|Pattern Size": "Scale of the fabric weave.",
"juicy|Shimmer": "How much the nap catches the light as it moves.",
"juicy|Velour Nap": "Direction and depth of the pile, which is what makes velour shift tone.",
"juicy|Plush Rim": "Soft bright edge where the fabric turns away.",
"juicy|Depth Read": "How strongly depth shapes the fabric.",
"juicy|Depth Tint": "How much distance colours the fabric.",
"juicy|Sequin Colour": "Colour of the rhinestones.",
"juicy|Sequin Size": "Size of each stone.",
"juicy|Bling Density": "How thickly stones are scattered.",
"juicy|Crystal Fire": "Rainbow dispersion inside each stone.",
"juicy|Edge Sensitivity": "How tightly stones cling to the silhouette.",
# 21 Aerochrome --------------------------------------------------------------
"aerochrome|IR Bloom": "How hot living things flare — the signature infrared magenta.",
"aerochrome|Band Rotation": "Rotates the false-colour channel swap.",
"aerochrome|Veg Gamma": "Response curve for vegetation, deciding how easily foliage goes hot.",
"aerochrome|Saturation Gate": "How saturated a colour must be before it counts as living.",
"aerochrome|Black Point": "Lifts or crushes the darkest tones.",
"aerochrome|Warm Bias": "Pushes the whole image warm or cool.",
"aerochrome|IR Haze Start": "Distance at which the cyan atmospheric wash begins.",
"aerochrome|IR Haze End": "Distance at which it is at full strength.",
"aerochrome|Haze Tint": "Colour of that distance wash.",
# 22 Heat Ghost --------------------------------------------------------------
"heatGhost|Knife Angle": "Orientation of the schlieren knife edge, which decides which slopes light up.",
"heatGhost|Schlieren Gain": "How strongly surface gradients flare.",
"heatGhost|Knife Softness": "Softens the cutoff at that knife edge.",
"heatGhost|Knife ↔ Shadowgraph": "Crossfades between knife-edge schlieren and a shadowgraph, which reads curvature instead of slope.",
"heatGhost|Field Scale": "Scale of the density field being visualised.",
"heatGhost|Background Grey": "Base grey the deflections are measured against.",
"heatGhost|RGB Gradient Mix": "How much the real camera image contributes to the gradient.",
"heatGhost|Hue Spread": "How far apart the colours land across the deflection range.",
"heatGhost|Low Colour": "Colour for deflection one way.",
"heatGhost|High Colour": "Colour for deflection the other way.",
# 23 Solarise ----------------------------------------------------------------
"solarise|Fold Point": "Brightness at which the tone curve folds back — the Sabattier reversal.",
"solarise|Fold Hardness": "How abrupt that fold is.",
"solarise|Channel Spread": "Offsets the fold per colour channel, which is what makes solarisation go metallic.",
"solarise|Mackie Lines": "Strength of the bright edge lines that form at the reversal.",
"solarise|Mackie Width": "How wide those lines run.",
"solarise|Depth Grade": "How much depth, rather than brightness, drives the grade.",
"solarise|Posterize": "Crushes the result into flat tone steps.",
"solarise|Tint": "Overall colour cast of the print.",
# 24 Cymatic -----------------------------------------------------------------
"cymatic|Plate Tuning": "Frequency the plate is driven at, which sets the standing-wave pattern.",
"cymatic|Mode Count": "How many vibration modes are excited at once.",
"cymatic|Mode Jitter": "Detunes those modes so the figure is less perfectly symmetric.",
"cymatic|Depth → Mode": "How much the depth field selects which mode is playing.",
"cymatic|Asymmetry": "Skews the plate so the figure loses its mirror symmetry.",
"cymatic|Sand Sharpness": "How tightly sand collects on the nodal lines.",
"cymatic|Mode Decay": "How quickly higher modes fade out.",
"cymatic|Animation Speed": "Rate the pattern morphs.",
"cymatic|Audio Drive (mic)": "Lets live sound drive the plate. Opt-in; analysed on device, never recorded.",
"cymatic|Light Drive": "How much the brightness of the real scene drives the plate.",
"cymatic|Sand": "Colour of the sand.",
"cymatic|Plate": "Colour of the plate underneath.",
# 25 Aquarelle ---------------------------------------------------------------
"aquarelle|Pigment Load": "How much pigment is carried in the wash.",
"aquarelle|Edge Darkening": "Pigment pooling at the edge of each wash, the tell-tale watercolour rim.",
"aquarelle|Granulation": "Coarse pigment settling into the paper texture.",
"aquarelle|Paper Tooth": "Roughness of the paper, which decides where pigment catches.",
"aquarelle|Wet Bleed": "How far colour creeps into wet neighbouring areas.",
"aquarelle|Wobble": "Hand-made wobble in the wash boundaries.",
"aquarelle|Wobble Freq": "Scale of that wobble.",
"aquarelle|Colour Edges": "How strongly colour separates at wash boundaries.",
# 26 Tessera -----------------------------------------------------------------
"tessera|Tile Size": "Size of each stone tessera.",
"tessera|Tile Gap": "Space left between neighbouring tiles.",
"tessera|Flow (Vermiculatum)": "Makes rows of tiles curve to follow contours, the way Roman mosaicists laid them around a figure.",
"tessera|Grout Width": "Thickness of the mortar lines.",
"tessera|Grout Darkness": "How dark that mortar reads.",
"tessera|Size by Edge": "Shrinks tiles near silhouettes so detail survives.",
"tessera|Palette Snap": "Snaps tile colours to a limited stone palette.",
"tessera|Bevel Light": "Lighting on each tile's bevelled edge.",
"tessera|Jitter": "Random rotation and offset per tile, so the laying looks hand-made.",
"tessera|Grout": "Colour of the mortar.",
# 27 Chemigram ---------------------------------------------------------------
"chemigram|Development Speed": "How fast the developer tide advances.",
"chemigram|Flow Strength": "How forcefully it flows across the print.",
"chemigram|Flow Curl": "Swirl in that flow.",
"chemigram|Resist Threshold": "How vivid an area must be to resist the developer and survive.",
"chemigram|Stain Contrast": "Contrast of the resulting stains.",
"chemigram|Age Gamma": "Ages the print, deepening the darks.",
"chemigram|Fixer": "Freezes development, locking the current state.",
"chemigram|Tide Sharpness": "How hard the boundary of the tide is.",
"chemigram|Motion Feed": "Lets movement in the scene feed new developer in.",
# 28 Ripplefield -------------------------------------------------------------
"ripplefield|Wave Speed": "How fast wakes travel outward.",
"ripplefield|Damping": "How quickly they die away.",
"ripplefield|Disturbance": "How strongly the scene stirs the water.",
"ripplefield|Rain Rate": "How often new drops fall.",
"ripplefield|Drop Size": "Size of the ring each drop makes.",
"ripplefield|Refraction": "How much the surface bends what is underneath.",
"ripplefield|Edge Reflection": "How strongly waves bounce off silhouettes.",
"ripplefield|Glint Sharpness": "Tightness of the specular glints on the water.",
"ripplefield|Transparency": "How clearly the scene shows through the water.",
"ripplefield|Depth Fade": "How fast the water darkens with distance.",
"ripplefield|Water Tint": "Colour of the water.",
# 29 Ferrofluid --------------------------------------------------------------
"ferrofluid|Pin Spacing": "Distance between beads, in pixels.",
"ferrofluid|Bead Size": "Diameter of each bead.",
"ferrofluid|Depth Push": "How far near beads are driven toward the viewer.",
"ferrofluid|Size by Depth": "Makes closer beads larger.",
"ferrofluid|Depth Brightness": "Lights closer beads more strongly.",
"ferrofluid|Gloss": "Sharpness of the wet-looking sheen.",
"ferrofluid|Rim Light": "Bright edge around each bead.",
"ferrofluid|Light Drive": "How much the real scene's brightness drives the field.",
"ferrofluid|Hex Packing": "Packs beads in a hexagonal lattice instead of a square grid.",
"ferrofluid|Fluid": "Colour of the fluid.",
# 30 Lichtenberg -------------------------------------------------------------
"dielectric|Growth Speed": "How fast the discharge branches spread.",
"dielectric|Branchiness": "How readily a branch splits into two.",
"dielectric|Branch Width": "Thickness of each filament.",
"dielectric|Glow Decay": "How quickly a branch dims after it fires.",
"dielectric|Afterglow": "How long the faint trace lingers behind.",
"dielectric|Flicker": "Instability in the discharge brightness.",
"dielectric|Arc Jitter": "Randomness in the path each arc takes.",
"dielectric|Seed Density": "How many discharge points start at once.",
"dielectric|Field Bias": "How strongly the depth gradient steers the branches downhill.",
"dielectric|Strike on Motion": "Fires a new discharge whenever something moves.",
"dielectric|Core": "Colour of the hot filament core.",
# ── Wave 9: monocular ───────────────────────────────────────────────────────
"parallax|Orbit Amount": "How far the virtual camera moves — the size of the 3-D swing.",
"parallax|Orbit Speed": "How fast it completes that path.",
"parallax|Infill Softness": "Softens the areas revealed behind objects, which have no real pixels to show.",
"parallax|Zoom": "Slight push-in that hides the frame edges as the camera moves.",
"anaglyph|Baseline": "Distance between the two virtual eyes. More baseline, more 3-D and more strain.",
"anaglyph|Convergence": "Which depth sits exactly at the screen. Nearer pops out, farther recedes.",
"anaglyph|Wiggle Rate": "On the Wiggle encoding, how fast it flips between eyes — 3-D without glasses.",
"anaglyph|Ghost Reduction": "Suppresses the leak of one eye's image into the other.",
"aperture|Aperture": "How wide the lens opens, and so how shallow the depth of field is.",
"aperture|Blade Rotation": "Rotates the iris, turning the shape of out-of-focus highlights.",
"aperture|Anamorphic": "Squeezes the bokeh into ovals, as an anamorphic lens would.",
"aperture|Highlight Boost": "How much bright points blow out into bokeh discs.",
"aperture|Rack From": "Starting focus distance for a rack.",
"aperture|Rack To": "Ending focus distance for that rack.",
"aperture|Rack Speed": "How fast focus travels between them.",
"aperture|Focus Peaking": "Outlines whatever is currently in focus, as a focus assist would.",
"nebula|Noise Scale": "Size of the cloud structures.",
"nebula|Threshold": "How dense the noise must be before it becomes visible cloud.",
"nebula|Wind Speed": "How fast the cloud drifts.",
"nebula|Curl": "Swirl in that drift.",
"nebula|Self Shadow": "How much the cloud shadows itself, which is what gives it volume.",
"nebula|Scene Blend": "How much of the real scene shows through the cloud.",
"nebula|Depth Band": "Restricts the cloud to a slice of depth rather than filling the room.",
"nebula|Ambient": "Colour of the fill light inside the cloud.",
"motes|Size": "Size of each floating particle.",
"motes|Brightness": "How brightly the motes catch the light.",
"motes|Colour": "Colour of the motes.",
"motes|Colour 2": "Second colour, mixed across the population.",
"motes|Wind X": "Sideways drift.",
"motes|Wind Y": "Vertical drift — negative falls, positive rises.",
"motes|Turbulence": "How much the particles wander off the wind.",
"motes|Depth of Field": "How much motes blur when they are out of the focal plane.",
"motes|Sun Response": "How much brighter motes get when backlit.",
"motes|Scene Dim": "Darkens the real scene so the motes read.",
"woodblock|Line Frequency": "How many engraved lines per screen width.",
"woodblock|Line Weight": "Thickness of each cut.",
"woodblock|Weight Variance": "How much line weight varies with tone.",
"woodblock|Hatch Angle": "Angle the hatching runs at.",
"woodblock|Coherence": "How strictly lines follow the form rather than the fixed angle.",
"woodblock|Tone Curve": "How grey values map onto line weight.",
"woodblock|Silhouette": "Extra weight on outlines, so shapes read as cut blocks.",
"woodblock|Taper": "Tapers each line toward its ends, like a real graver stroke.",
"stipple|Dot Scale": "How many dots per screen width.",
"stipple|Density Curve": "How tone maps onto dot density.",
"stipple|Curvature": "Bends dot rows to follow the surface, the way an engraver stipples a curve.",
"stipple|Ellipticity": "Stretches dots into ellipses along that curvature.",
"stipple|Edge Crowding": "Packs extra dots along silhouettes.",
"stipple|Jitter": "Randomises dot placement so the grid does not show.",
"lattice|Cell Size": "Size of one lattice cell, in pixels.",
"lattice|Perspective": "How much the grid converges with distance.",
"lattice|Subdivision": "Extra subdivision where the surface has detail.",
"lattice|Line Weight": "Thickness of the wireframe lines.",
"lattice|Vertex Glow": "Brightness of the nodes where lines meet.",
"lattice|Scan Speed": "How fast the scan sweeps through depth.",
"lattice|Scan Width": "Thickness of the scanning band.",
"lattice|Trail": "How long the scan's wake persists.",
"lattice|Fill Opacity": "Opacity of the fill behind the wireframe.",
"lattice|Depth Colour": "Colours the lattice by distance instead of a flat colour.",
"lattice|Line": "Colour of the wireframe.",
"datamosh|Smear": "How far blocks drag before they are refreshed.",
"datamosh|Depth Bias": "0 keeps near objects sharp and melts the background; 1 does the reverse.",
"datamosh|Block Size": "Size of a motion block, in pixels.",
"datamosh|Search Range": "How far the codec looks for a matching block.",
"datamosh|Vector Amplify": "Exaggerates the motion vectors, so smearing overshoots.",
"datamosh|I-Frame Rate": "How often the image resets to a clean frame. At 0 it never resets and dissolves completely.",
"datamosh|Colour Quantise": "Crushes colour into fewer steps, like a heavily compressed stream.",
"datamosh|Chroma Bleed": "Lets colour smear further than luminance.",
"datamosh|Trail Decay": "How quickly the smear fades.",
"aerial|Rayleigh": "Blue scattering from air molecules — what makes distant hills go blue.",
"aerial|Mie": "Scattering from larger particles: haze, dust and moisture.",
"aerial|Mie Asymmetry": "How much that haze scatters forward toward the sun rather than evenly.",
"aerial|Desaturation": "How much colour distance drains out of far surfaces.",
"aerial|Contrast Loss": "How much contrast the atmosphere eats with distance.",
"aerial|Haze Structure": "Adds cloud-like structure to the haze instead of a smooth wash.",
"aerial|Sun Disc": "Brightness of the sun itself in frame.",
"aerial|Horizon Blend": "How smoothly the far scene dissolves into sky.",
"aerial|Sky": "Colour of the sky the haze tends toward.",
"aerial|Sun": "Colour of the sunlight.",
"godlight|Decay": "How fast each shaft loses energy along its length.",
"godlight|Exposure": "Overall brightness of the shafts.",
"godlight|Source Threshold": "How bright a pixel must be to emit rays.",
"godlight|Scene Emission": "How much the whole scene glows, not just bright points.",
"godlight|Dust": "Airborne particles for the light to catch on.",
"godlight|Shaft Softness": "Softens the edges of each shaft.",
"godlight|Background Dim": "Darkens everything else so the shafts stand out.",
"godlight|Rim Offset": "How far behind the subject the light source sits, on the front camera's Rim variant.",
"hologram|Scanline Frequency": "How many interference lines run across the projection.",
"hologram|Scanline Speed": "How fast they travel.",
"hologram|Depth Phase": "Bends the lines around the form. At 0 they lie flat on the screen like CRT scanlines.",
"hologram|Transparency": "How see-through the projection is.",
"hologram|Rim": "Brightness of the edge glow.",
"hologram|Chromatic Fringe": "Colour separation at edges, as a real hologram splits light.",
"hologram|Projection Cone": "Cone of light beneath the subject, as though projected from below.",
"hologram|Glitch Rate": "How often the projection stutters.",
"hologram|Glitch Severity": "How badly it breaks up when it does.",
"hologram|Near Colour": "Colour of the near parts of the projection.",
"hologram|Far Colour": "Colour of the far parts.",
"papercut|Deckle": "Rough torn edge on each paper plate.",
"papercut|Deckle Scale": "Size of that tearing.",
"papercut|Shadow": "Strength of the drop shadow each plate casts on the one below.",
"papercut|Shadow Distance": "How far the plates sit apart.",
"papercut|Shadow Softness": "How diffuse those shadows are.",
"papercut|Hue Jitter": "Slight colour variation between plates.",
"papercut|Outline": "Draws a line around each cut plate.",
"riso|Screen Frequency": "How fine the halftone screen is on each plate.",
"riso|Band Overlap": "How much neighbouring plates overlap, where inks mix.",
"riso|Misregistration": "How far the plates sit out of alignment — the signature riso slip.",
"riso|Registration Drift": "How much that misalignment wanders over time.",
"riso|Ink Coverage": "How much ink each plate lays down.",
"riso|Split Tone Sources": "Makes each plate read a different signal — image, shading or edges — so the colours never quite describe the same thing.",
"riso|Ink 1": "First ink. The default set is the real Riso palette: fluorescent pink, blue, yellow, black.",
"riso|Ink 2": "Second ink.",
"riso|Ink 3": "Third ink.",
"riso|Ink 4": "Fourth ink.",
"vertigo|Amount": "How strongly the dolly-zoom pulls. Negative reverses the direction.",
"vertigo|Speed": "How fast the effect breathes in and out.",
"vertigo|Edge Blend": "Blends the warped frame back into its edges.",
"vertigo|Background Only": "Leaves the subject untouched and only warps the room behind — the flattering setting for selfies.",
}

# ── global settings ─────────────────────────────────────────────────────────
GLOBALS = [
 ("Output", [
   ("Resolution","picker","Render resolution. Lower is faster and cooler; higher keeps fine detail."),
   ("Aspect","picker","3:4 preview, or full-screen 9:16."),
   ("Keep Screen On","toggle","Stops the display sleeping while you are shooting."),
 ]),
 ("Image", [
   ("Detail","slider","How much fine structure survives in the depth field. 0–1."),
   ("Definition","slider","Local contrast on the depth, sharpening the read of surfaces. 0–1."),
   ("Brightness","slider","Lifts or lowers the whole image. −0.5–0.5."),
   ("Contrast","slider","Spread between darks and lights. 0.5–2."),
   ("Gamma","slider","Mid-tone bias — where the middle of the range sits. 0.3–3."),
   ("Smoothing","slider","Softens depth noise at the cost of fine detail. 0–0.8."),
   ("Smart Hole Fill","toggle","Patches gaps the sensor could not read, using neighbouring depth."),
   ("Invert Depth","toggle","Flips near and far for every mode at once."),
 ]),
 ("Range", [
   ("Near Clip","slider","Closest distance the effect responds to, in metres. 0–1 m."),
   ("Far Clip","slider","Furthest distance it responds to. 0.5–20 m."),
 ]),
 ("Depth Engine", [
   ("Relief Strength","slider","Global exaggeration of surface relief, shared by every normals-based mode. 0–1."),
   ("Sun Azimuth","slider","Compass direction of the virtual sun used for shading. 0–360°."),
   ("Sun Elevation","slider","Height of that sun above the horizon. 0–90°."),
   ("Edge Threshold","slider","How large a depth step counts as a silhouette edge. 0.02–0.5 m."),
   ("World Scale","slider","Scales the whole depth field, making the scene read bigger or smaller. 0.25–4×."),
   ("Temporal Frames","stepper","How many frames of depth are averaged. More is steadier but smears motion. 1–16."),
   ("Smoothing Source","picker","Which smoothing the depth goes through before the modes see it."),
   ("LiDAR Confidence","picker","Rear LiDAR only: drops low-confidence depth pixels — reflective, far or grazing — using ARKit's confidence map. Off keeps every mode exactly as it looks today."),
 ]),
 ("Presets", [
   ("Preset","picker","The three per-mode presets. Saving and renaming is Pro; switching is free."),
 ]),
 ("LiDAR Presets", [
   ("Preset","picker","Universal depth and tone presets that apply to every mode and stay selected when you switch. All three are free to use; saving and renaming is Pro."),
 ]),
 ("Sound", [
   ("Camera Sounds","toggle","Shutter and record tones."),
   ("Depth Bar","picker","Whether the on-camera mode switcher shows text pills or icons."),
   ("Volume Buttons","picker","What the physical volume buttons do: record, photo, switch camera, or adjust."),
 ]),
 ("NDI", [
   ("NDI Streaming","toggle","Broadcasts the live preview to NDI receivers on your local network. Pro, and off by default."),
   ("Second RGB Stream","toggle","Adds a second source, ZPTHRGB, carrying the raw camera alongside the effect so you can mix both on the receiving end."),
   ("NDI Wired Mode","toggle","Sends NDI over a USB-C cable with Personal Hotspot on, for lower latency and no Wi-Fi congestion."),
 ]),
 ("Recordings", [
   ("Save to Photos","button","Moves clips an older build left in the app's own storage into your Photos library, then deletes the local copy."),
 ]),
 ("Reset", [
   ("Reset Mode","button","Restores the current mode to its first-launch defaults. Hold 0.8 s to confirm."),
   ("Reset All","button","Resets every mode, LiDAR and tone. Your saved custom modes are kept."),
 ]),
]

MODE_ORDER = ['environment','faceDetail','raw','plasma','organic','data','contour','hillshade',
 'liquidChrome','oilSlick','joyDivision','sonar','pinScreen','voxel','crystalline','longExposure',
 'tiltShift','ironFilings','dither','juicy','aerochrome','heatGhost','solarise','cymatic',
 'aquarelle','tessera','chemigram','ripplefield','ferrofluid','dielectric',
 'parallax','anaglyph','aperture','nebula','motes','woodblock','stipple','lattice','datamosh',
 'aerial','godlight','hologram','papercut','riso','vertigo']

# Pulsar's controls live in RuttEtraSettingsView, so hand-list them in tab order
PULSAR = [
 ("Page","picker",None),("Base Displacement (Z)","slider","0..1"),("Line Thickness","slider","0..1"),
 ("Glow","slider","0..1"),("Rotation","slider","0..360"),("Hidden-Line Occlusion","toggle",None),
 ("Point / Dotted Mode","toggle",None),("Dot Size","slider","0..1"),
 ("Ripple Speed","slider","0..4"),("Ripple Scale","slider","0..2"),
 ("Audio Reactive (mic)","toggle",None),("Sensitivity (Gain)","slider","0..1"),
 ("Noise Gate","slider","0..0.5"),("Attack","slider","0..1"),("Release (smoothing)","slider","0..1"),
 ("Beat Detect","toggle",None),("Beat Sensitivity","slider","0..1"),
 ("Falloff Start (near→far)","slider","0..1"),("Falloff End","slider","0..1"),
 ("Wrap Around (3D projection)","toggle",None),("Wrap Depth","slider","0..1"),
 ("Depth Layers (voxel slabs)","toggle",None),("Layer Count","slider","0..1"),
 ("Colour Lines from RGB Camera","toggle",None),("Colour Depth Start (near)","slider","0..1"),
 ("Colour Depth End (far)","slider","0..1"),("Colour Mix","slider","0..1"),("Saturation","slider","0..2"),
 ("Face-Detail Mode (front cam)","toggle",None),("Depth Contrast","slider","0.2..1.0"),
 ("Detail Boost","slider","0..1"),("Line Colour","picker",None),
]

def desc(mode, label):
    return D.get(f"{mode}|{label}") or D.get(f"*|{label}") or ""

out = []
missing = []
for m in MODE_ORDER:
    raw = RAW.get(m, {"controls": [], "blurbs": []})
    ctrls = []
    if m == "joyDivision":
        for lab, kind, rng in PULSAR:
            d = desc(m, lab)
            if not d: missing.append(f"{m}|{lab}")
            ctrls.append({"label": lab, "kind": kind, "range": rng, "desc": d})
    else:
        for c in raw["controls"]:
            d = desc(m, c["label"])
            if not d: missing.append(f"{m}|{c['label']}")
            e = {"label": c["label"], "kind": c["kind"], "desc": d}
            if "range" in c: e["range"] = f"{c['range'][0]}..{c['range'][1]}"
            if c.get("options"): e["options"] = c["options"]
            ctrls.append(e)
    entry = {"id": m, "controls": ctrls,
             "notes": [b.replace("\\n", " ").strip() for b in raw["blurbs"]]}
    if m in MONO_IDS: entry["mono"] = True
    out.append(entry)

mono_rows = []
for c in MONO_GLOBALS["controls"]:
    d = D.get("mono|" + c["label"]) or D.get("*|" + c["label"]) or ""
    if not d: missing.append("monoGlobals|" + c["label"])
    e = {"label": c["label"], "kind": c["kind"], "desc": d}
    if "range" in c: e["range"] = f"{c['range'][0]}..{c['range'][1]}"
    if c.get("options"): e["options"] = c["options"]
    mono_rows.append(e)

print("controls:", sum(len(m["controls"]) for m in out))
print("missing descriptions:", len(missing))
for k in missing[:60]: print("   ", k)

js = ("/* Generated from the app's SettingsSheet.swift — every control the app shows,\n"
      "   with a short description of what it does. */\n"
      "window.ZPTH_DOCS = " + json.dumps({"modes": out,
        "monoShared": {"rows": mono_rows,
                       "notes": [b.replace("\\n"," ").strip() for b in MONO_GLOBALS["blurbs"]]},
        "globals": [
        {"group": g, "rows": [{"label": l, "kind": k, "desc": d} for l, k, d in rows]}
        for g, rows in GLOBALS]}, indent=1) + ";\n")
pathlib.Path(sys.argv[1]).write_text(js)
print("wrote", sys.argv[1], len(js), "bytes")
