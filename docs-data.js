/* Generated from the app's SettingsSheet.swift — every control the app shows,
   with a short description of what it does. */
window.ZPTH_DOCS = {
 "modes": [
  {
   "id": "environment",
   "controls": [
    {
     "label": "Max Range",
     "kind": "slider",
     "desc": "The far limit in metres. Anything beyond it clamps to the far colour.",
     "range": "1..10"
    },
    {
     "label": "Noise Reduction",
     "kind": "slider",
     "desc": "Discards depth readings that jitter by less than this, cleaning up sensor speckle.",
     "range": "0..0.3"
    },
    {
     "label": "Colour Map",
     "kind": "toggle",
     "desc": "Replaces the mode's own colours with one of the shared depth colour maps."
    }
   ],
   "notes": []
  },
  {
   "id": "faceDetail",
   "controls": [
    {
     "label": "Detail Range",
     "kind": "slider",
     "desc": "Depth window around the tracked face, in metres. Narrow it to isolate the face from the room.",
     "range": "0.02..1.5"
    },
    {
     "label": "Facial Detail",
     "kind": "slider",
     "desc": "Multiplies the relief so small features \u2014 nose, lips, brows \u2014 stand out.",
     "range": "0.5..5"
    },
    {
     "label": "Tracking Speed",
     "kind": "slider",
     "desc": "How quickly the depth window follows the face. Low is steadier, high keeps up with fast movement.",
     "range": "0.01..0.5"
    },
    {
     "label": "Colour Map",
     "kind": "toggle",
     "desc": "Replaces the mode's own colours with one of the shared depth colour maps."
    }
   ],
   "notes": [
    "Static turns off Apple's depth smoothing (sharper relief) and patches holes spatially instead. Best when the face holds still; may show a few more gaps."
   ]
  },
  {
   "id": "raw",
   "controls": [
    {
     "label": "Base Colour",
     "kind": "colour",
     "desc": "The main colour the effect is drawn in."
    },
    {
     "label": "Glitch Speed",
     "kind": "slider",
     "desc": "How fast the horizontal tear artefacts move.",
     "range": "0..1"
    },
    {
     "label": "Glitch Intensity",
     "kind": "slider",
     "desc": "How far the torn scanlines displace.",
     "range": "0..1"
    },
    {
     "label": "Reflection",
     "kind": "slider",
     "desc": "Sensitivity to shiny surfaces, which the depth sensor reads unreliably.",
     "range": "0..1"
    },
    {
     "label": "Bloom",
     "kind": "slider",
     "desc": "Spills a soft glow out of the brightest areas.",
     "range": "0..1"
    },
    {
     "label": "Colour-Map Effect",
     "kind": "toggle",
     "desc": "Replaces the mode's own colours with one of the shared depth colour maps."
    },
    {
     "label": "Colour Map",
     "kind": "colourmap",
     "desc": "Replaces the mode's own colours with one of the shared depth colour maps."
    }
   ],
   "notes": []
  },
  {
   "id": "plasma",
   "controls": [
    {
     "label": "Colour Map",
     "kind": "toggle",
     "desc": "Replaces the mode's own colours with one of the shared depth colour maps."
    },
    {
     "label": "Flow Speed",
     "kind": "slider",
     "desc": "How fast the nebula filaments drift.",
     "range": "0..1"
    },
    {
     "label": "Filament Density",
     "kind": "slider",
     "desc": "How many filament strands the field carries.",
     "range": "0..1"
    },
    {
     "label": "Filament Sharpness",
     "kind": "slider",
     "desc": "Crispness of each strand, from soft cloud to hard thread.",
     "range": "0..1"
    },
    {
     "label": "Warp Amount",
     "kind": "slider",
     "desc": "How strongly the field twists around itself.",
     "range": "0..1"
    },
    {
     "label": "Glow Intensity",
     "kind": "slider",
     "desc": "Brightness of the light coming off the filaments.",
     "range": "0..1"
    },
    {
     "label": "Bloom",
     "kind": "slider",
     "desc": "Spills a soft glow out of the brightest areas.",
     "range": "0..1"
    },
    {
     "label": "Depth Influence",
     "kind": "slider",
     "desc": "How much the depth field steers the plasma rather than letting it flow freely.",
     "range": "0..1"
    },
    {
     "label": "Invert Depth",
     "kind": "toggle",
     "desc": "Flips near and far, so the effect reads from the back of the scene forward."
    },
    {
     "label": "Face Mesh Input",
     "kind": "toggle",
     "desc": "Front camera only: drives the plasma from the TrueDepth face mesh instead of the plain depth map."
    }
   ],
   "notes": []
  },
  {
   "id": "organic",
   "controls": [
    {
     "label": "Base Colour",
     "kind": "colour",
     "desc": "The main colour the effect is drawn in."
    },
    {
     "label": "Growth Speed",
     "kind": "slider",
     "desc": "Rate at which the reaction-diffusion pattern spreads.",
     "range": "0..1"
    },
    {
     "label": "Seed Strength",
     "kind": "slider",
     "desc": "How strongly the closest point seeds new growth.",
     "range": "0..1"
    },
    {
     "label": "Offshoot",
     "kind": "slider",
     "desc": "Tendency to sprout side branches rather than grow smoothly.",
     "range": "0..1"
    },
    {
     "label": "Slither",
     "kind": "slider",
     "desc": "Pushes the pattern along with device tilt, so the organism crawls.",
     "range": "0..1"
    },
    {
     "label": "Relief",
     "kind": "slider",
     "desc": "Exaggerates the depth surface, deepening the sense of height.",
     "range": "0..1"
    },
    {
     "label": "Bloom",
     "kind": "slider",
     "desc": "Spills a soft glow out of the brightest areas.",
     "range": "0..1"
    },
    {
     "label": "Depth Tint",
     "kind": "slider",
     "desc": "How much distance colours the organism.",
     "range": "0..1"
    },
    {
     "label": "Invert Depth",
     "kind": "toggle",
     "desc": "Flips near and far, so the effect reads from the back of the scene forward."
    },
    {
     "label": "Colour Map",
     "kind": "toggle",
     "desc": "Replaces the mode's own colours with one of the shared depth colour maps."
    }
   ],
   "notes": []
  },
  {
   "id": "data",
   "controls": [
    {
     "label": "Text Size",
     "kind": "slider",
     "desc": "Size of each number.",
     "range": "0..1"
    },
    {
     "label": "Overlap",
     "kind": "slider",
     "desc": "How closely numbers may crowd before they are culled.",
     "range": "0..1"
    },
    {
     "label": "Glow",
     "kind": "slider",
     "desc": "Adds a halo around lit areas.",
     "range": "0..1"
    },
    {
     "label": "Max Range",
     "kind": "slider",
     "desc": "The distance in metres that maps to the far end of the spectrum.",
     "range": "1..20"
    },
    {
     "label": "Background",
     "kind": "colour",
     "desc": "Brightness of everything the effect does not claim \u2014 0 leaves it black."
    }
   ],
   "notes": [
    "A point cloud of numbers: each LiDAR point is back-projected and shown as an upright 0\u201399 distance, coloured near\u2192far. Points sets how many; Text Size the number size; Quality the render resolution."
   ]
  },
  {
   "id": "contour",
   "controls": [
    {
     "label": "Contour Density",
     "kind": "slider",
     "desc": "How many isolines are drawn through the depth range.",
     "range": "0..8"
    },
    {
     "label": "Line Thickness",
     "kind": "slider",
     "desc": "Weight of each isoline.",
     "range": "0..8"
    },
    {
     "label": "Sensitivity",
     "kind": "slider",
     "desc": "How much depth change is needed to draw a line.",
     "range": "0..1"
    },
    {
     "label": "Falloff",
     "kind": "slider",
     "desc": "Far distance in metres past which the image drops to black.",
     "range": "1..20"
    },
    {
     "label": "Glow",
     "kind": "slider",
     "desc": "Adds a halo around lit areas.",
     "range": "0..1"
    },
    {
     "label": "Invert Depth",
     "kind": "toggle",
     "desc": "Flips near and far, so the effect reads from the back of the scene forward."
    }
   ],
   "notes": [
    "Depth becomes a colour spectrum with black contour isolines + black edges. Falloff sets the far distance (metres) beyond which it goes black; Sensitivity sets how much depth change draws a line."
   ]
  },
  {
   "id": "hillshade",
   "controls": [
    {
     "label": "Relief",
     "kind": "slider",
     "desc": "Exaggerates the depth surface, deepening the sense of height.",
     "range": "0..1"
    },
    {
     "label": "Ambient",
     "kind": "slider",
     "desc": "Fill light, so slopes facing away from the sun are not pure black.",
     "range": "0..1"
    },
    {
     "label": "Sun Azimuth",
     "kind": "slider",
     "desc": "Compass direction of the virtual sun. Spin it to rake light across the scene.",
     "range": "0..360"
    },
    {
     "label": "Sun Elevation",
     "kind": "slider",
     "desc": "How high the virtual sun sits. Low angles cast long, dramatic relief.",
     "range": "0..90"
    },
    {
     "label": "Colour Map",
     "kind": "toggle",
     "desc": "Replaces the mode's own colours with one of the shared depth colour maps."
    }
   ],
   "notes": [
    "Depth lit as a relief map by a movable sun \u2014 shades by surface orientation, not distance. Spin Sun Azimuth to rake light across the scene; Relief exaggerates the height."
   ]
  },
  {
   "id": "liquidChrome",
   "controls": [
    {
     "label": "Env Rotation",
     "kind": "slider",
     "desc": "Spins the reflected environment, sweeping highlights across the form.",
     "range": "0..1"
    },
    {
     "label": "Relief",
     "kind": "slider",
     "desc": "Exaggerates the depth surface, deepening the sense of height.",
     "range": "0..1"
    },
    {
     "label": "Fresnel Rim",
     "kind": "slider",
     "desc": "Brightness of the grazing-angle edge light.",
     "range": "0..1"
    },
    {
     "label": "Specular",
     "kind": "slider",
     "desc": "Strength of the tight highlight where light hits square on.",
     "range": "0..1"
    },
    {
     "label": "Liquid Wobble",
     "kind": "slider",
     "desc": "Makes the metal ripple as though it were still molten.",
     "range": "0..1"
    }
   ],
   "notes": [
    "Surfaces become molten mirror-metal via depth normals. Rotate the environment to sweep reflections; Wobble makes the metal ripple. Relief is the shared geometry strength."
   ]
  },
  {
   "id": "oilSlick",
   "controls": [
    {
     "label": "Fringe Freq",
     "kind": "slider",
     "desc": "How tightly the interference bands are packed.",
     "range": "0..1"
    },
    {
     "label": "Drift Speed",
     "kind": "slider",
     "desc": "How fast the film thickness drifts, so the colours crawl.",
     "range": "0..1"
    },
    {
     "label": "Travel Speed",
     "kind": "slider",
     "desc": "Speed the fringes travel across the surface, on the Travelling palette.",
     "range": "0..1"
    },
    {
     "label": "Refractive Index",
     "kind": "slider",
     "desc": "Optical density of the film, which shifts the whole hue sequence.",
     "range": "0..1"
    },
    {
     "label": "Edge Shift",
     "kind": "slider",
     "desc": "Extra hue rotation at silhouettes, where the film would thin.",
     "range": "0..1"
    },
    {
     "label": "Background",
     "kind": "slider",
     "desc": "Brightness of everything the effect does not claim \u2014 0 leaves it black.",
     "range": "0..1"
    }
   ],
   "notes": [
    "Thin-film interference: depth drives a petrol-puddle / nacre iridescence whose hue cycles through orders. Laser & Travelling give holographic cosine fringes."
   ]
  },
  {
   "id": "joyDivision",
   "controls": [
    {
     "label": "Page",
     "kind": "picker",
     "range": null,
     "desc": "Which tab of the Pulsar controls is showing: Geometry, Modulation, Audio, Depth, RGB or Face."
    },
    {
     "label": "Base Displacement (Z)",
     "kind": "slider",
     "range": "0..1",
     "desc": "How far depth pushes each scan line off its baseline."
    },
    {
     "label": "Line Thickness",
     "kind": "slider",
     "range": "0..1",
     "desc": "Weight of each scan line."
    },
    {
     "label": "Glow",
     "kind": "slider",
     "range": "0..1",
     "desc": "Adds a halo around lit areas."
    },
    {
     "label": "Rotation",
     "kind": "slider",
     "range": "0..360",
     "desc": "Rotates the whole line field."
    },
    {
     "label": "Hidden-Line Occlusion",
     "kind": "toggle",
     "range": null,
     "desc": "Lines nearer the camera hide the ones behind, as on a real Rutt-Etra rig."
    },
    {
     "label": "Point / Dotted Mode",
     "kind": "toggle",
     "range": null,
     "desc": "Draws the field as dots instead of continuous lines."
    },
    {
     "label": "Dot Size",
     "kind": "slider",
     "range": "0..1",
     "desc": "Size of each dot when Point / Dotted Mode is on."
    },
    {
     "label": "Ripple Speed",
     "kind": "slider",
     "range": "0..4",
     "desc": "Speed of the travelling wave running through the lines."
    },
    {
     "label": "Ripple Scale",
     "kind": "slider",
     "range": "0..2",
     "desc": "Wavelength of that travelling wave."
    },
    {
     "label": "Audio Reactive (mic)",
     "kind": "toggle",
     "range": null,
     "desc": "Lets live sound from the microphone drive the lines. Opt-in; audio is analysed on device and never recorded."
    },
    {
     "label": "Sensitivity (Gain)",
     "kind": "slider",
     "range": "0..1",
     "desc": "Input gain on the microphone signal."
    },
    {
     "label": "Noise Gate",
     "kind": "slider",
     "range": "0..0.5",
     "desc": "Ignores sound below this level, so room hiss does not drive the lines."
    },
    {
     "label": "Attack",
     "kind": "slider",
     "range": "0..1",
     "desc": "How fast the lines respond to a rise in volume."
    },
    {
     "label": "Release (smoothing)",
     "kind": "slider",
     "range": "0..1",
     "desc": "How slowly they settle back afterwards."
    },
    {
     "label": "Beat Detect",
     "kind": "toggle",
     "range": null,
     "desc": "Fires an extra kick on detected beats."
    },
    {
     "label": "Beat Sensitivity",
     "kind": "slider",
     "range": "0..1",
     "desc": "How easily a transient counts as a beat."
    },
    {
     "label": "Falloff Start (near\u2192far)",
     "kind": "slider",
     "range": "0..1",
     "desc": "Depth at which lines begin to fade out."
    },
    {
     "label": "Falloff End",
     "kind": "slider",
     "range": "0..1",
     "desc": "Depth at which they have faded completely."
    },
    {
     "label": "Wrap Around (3D projection)",
     "kind": "toggle",
     "range": null,
     "desc": "Wraps the line field around the form instead of leaving it flat on screen."
    },
    {
     "label": "Wrap Depth",
     "kind": "slider",
     "range": "0..1",
     "desc": "How far that wrap projects."
    },
    {
     "label": "Depth Layers (voxel slabs)",
     "kind": "toggle",
     "range": null,
     "desc": "Slices the depth into discrete slabs, each with its own lines."
    },
    {
     "label": "Layer Count",
     "kind": "slider",
     "range": "0..1",
     "desc": "How many of those slabs."
    },
    {
     "label": "Colour Lines from RGB Camera",
     "kind": "toggle",
     "range": null,
     "desc": "Takes the line colour from the real camera image."
    },
    {
     "label": "Colour Depth Start (near)",
     "kind": "slider",
     "range": "0..1",
     "desc": "Near limit of the band that gets camera colour."
    },
    {
     "label": "Colour Depth End (far)",
     "kind": "slider",
     "range": "0..1",
     "desc": "Far limit of that band."
    },
    {
     "label": "Colour Mix",
     "kind": "slider",
     "range": "0..1",
     "desc": "How much camera colour is blended in."
    },
    {
     "label": "Saturation",
     "kind": "slider",
     "range": "0..2",
     "desc": "Colour intensity, from grey to fully saturated."
    },
    {
     "label": "Face-Detail Mode (front cam)",
     "kind": "toggle",
     "range": null,
     "desc": "Front camera only: tightens the depth range onto a face."
    },
    {
     "label": "Depth Contrast",
     "kind": "slider",
     "range": "0.2..1.0",
     "desc": "Gamma on the face depth, deepening or flattening the relief."
    },
    {
     "label": "Detail Boost",
     "kind": "slider",
     "range": "0..1",
     "desc": "Amplifies fine facial structure."
    },
    {
     "label": "Line Colour",
     "kind": "picker",
     "range": null,
     "desc": "How the lines are coloured \u2014 flat, by depth, or from the camera."
    }
   ],
   "notes": [
    "Rutt-Etra video synth: route depth, the RGB camera, live audio (bass/mid/treble/beat) and face motion to any line property via the Modulation tab. Audio Reactive needs the mic; depth falloff, wrap, topography, RGB colouring and face detail live in the other tabs."
   ]
  },
  {
   "id": "sonar",
   "controls": [
    {
     "label": "Rotating Beam",
     "kind": "toggle",
     "desc": "Adds a radar-style beam sweeping around the scope."
    },
    {
     "label": "Ping Speed",
     "kind": "slider",
     "desc": "How fast the wavefront travels out from the camera.",
     "range": "0..1"
    },
    {
     "label": "Ping Rate",
     "kind": "slider",
     "desc": "How often a new ping is fired, on the Timed sweep.",
     "range": "0..1"
    },
    {
     "label": "Shell Width",
     "kind": "slider",
     "desc": "Thickness of the lit shell at the wavefront.",
     "range": "0..1"
    },
    {
     "label": "Beam Speed",
     "kind": "slider",
     "desc": "Rotation speed of the sweeping beam.",
     "range": "0..1"
    },
    {
     "label": "Beam Width",
     "kind": "slider",
     "desc": "Angular width of that beam.",
     "range": "0..1"
    },
    {
     "label": "Range Rings",
     "kind": "slider",
     "desc": "Spacing of the fixed distance rings.",
     "range": "0..2"
    },
    {
     "label": "Scanline",
     "kind": "slider",
     "desc": "Strength of the CRT scanline overlay.",
     "range": "0..1"
    },
    {
     "label": "Phosphor",
     "kind": "colour",
     "desc": "Colour of the scope phosphor."
    }
   ],
   "notes": []
  },
  {
   "id": "pinScreen",
   "controls": [
    {
     "label": "Pin Spacing",
     "kind": "slider",
     "desc": "Distance between pins, in pixels. Lower packs in more pins.",
     "range": "4..28"
    },
    {
     "label": "Dot Size",
     "kind": "slider",
     "desc": "Diameter of each pin head.",
     "range": "0..1"
    },
    {
     "label": "Depth Push",
     "kind": "slider",
     "desc": "How far a near surface drives its pins forward, out of the plate.",
     "range": "0..1"
    },
    {
     "label": "Flat Area",
     "kind": "slider",
     "desc": "Size of the resting plane. 1 fills the frame; lower contracts it so near objects burst into the space around.",
     "range": "0..1"
    },
    {
     "label": "Depth Brightness",
     "kind": "slider",
     "desc": "How much closer pins are lit brighter than far ones.",
     "range": "0..1"
    },
    {
     "label": "Glow",
     "kind": "slider",
     "desc": "Adds a halo around lit areas.",
     "range": "0..1"
    },
    {
     "label": "Pin Colour",
     "kind": "colour",
     "desc": "Colour of the pin heads."
    }
   ],
   "notes": [
    "A pin-art screen: a grid of pins that fills the whole frame, which depth pushes FORWARD in 3-D \u2014 a near surface breaks through and its pins burst outward, even past the frame edge. Depth Push sets the strength. Flat Area sets the resting plane: 1 fills the frame; lower contracts the flat plane toward the centre so near objects push out into the surrounding space."
   ]
  },
  {
   "id": "voxel",
   "controls": [
    {
     "label": "Cube Size",
     "kind": "slider",
     "desc": "Edge length of each cube, in pixels.",
     "range": "2..36"
    },
    {
     "label": "Z-Steps",
     "kind": "slider",
     "desc": "How many depth levels the scene is terraced into.",
     "range": "3..24"
    },
    {
     "label": "Side Shadow",
     "kind": "slider",
     "desc": "Darkens the cube faces that step up from their neighbours, for a 3-D staircase.",
     "range": "0..1"
    },
    {
     "label": "Studs",
     "kind": "toggle",
     "desc": "Puts a stud on top of every cube, toy-brick style."
    },
    {
     "label": "Colour Map",
     "kind": "toggle",
     "desc": "Replaces the mode's own colours with one of the shared depth colour maps."
    }
   ],
   "notes": [
    "Depth rebuilt as lit cubes. Z-Steps sets the terracing; Side Shadow darkens the cube sides that step up from their neighbours for a 3-D staircase."
   ]
  },
  {
   "id": "crystalline",
   "controls": [
    {
     "label": "Facet Size",
     "kind": "slider",
     "desc": "Size of each flat-shaded facet, in pixels.",
     "range": "2..44"
    },
    {
     "label": "Edge Density",
     "kind": "slider",
     "desc": "Packs smaller facets along real silhouettes, so edges stay crisp.",
     "range": "0..1"
    },
    {
     "label": "Base Colour",
     "kind": "colour",
     "desc": "The main colour the effect is drawn in."
    },
    {
     "label": "Sparkle",
     "kind": "slider",
     "desc": "How much glitter fires off the surface.",
     "range": "0..1"
    },
    {
     "label": "Sparkle Colour",
     "kind": "colour",
     "desc": "Colour of the glints thrown off the facets."
    },
    {
     "label": "Facet Outlines",
     "kind": "toggle",
     "desc": "Draws a line around every facet."
    },
    {
     "label": "Colour Map",
     "kind": "toggle",
     "desc": "Replaces the mode's own colours with one of the shared depth colour maps."
    }
   ],
   "notes": [
    "Reality shattered into flat-shaded gem facets. Edge Density packs tiny facets along the real silhouettes; each facet catches the light by its own depth normal."
   ]
  },
  {
   "id": "longExposure",
   "controls": [
    {
     "label": "Exposure Length",
     "kind": "slider",
     "desc": "How long a trail persists before it decays away.",
     "range": "0.6..0.99"
    },
    {
     "label": "Motion Threshold",
     "kind": "slider",
     "desc": "How far something must move, in metres, before it paints a trail.",
     "range": "0.005..0.2"
    },
    {
     "label": "Near Band",
     "kind": "slider",
     "desc": "Depth of the near layer that is allowed to leave trails.",
     "range": "0..1"
    },
    {
     "label": "Depth Falloff",
     "kind": "slider",
     "desc": "Distance in metres over which trails fade out.",
     "range": "1..20"
    },
    {
     "label": "Background",
     "kind": "slider",
     "desc": "Brightness of everything the effect does not claim \u2014 0 leaves it black.",
     "range": "0..1"
    },
    {
     "label": "Additive Blend",
     "kind": "toggle",
     "desc": "Overlapping trails add up and blow out, instead of covering one another."
    },
    {
     "label": "Near Tint",
     "kind": "colour",
     "desc": "Colour trails take when they are close."
    },
    {
     "label": "Far Tint",
     "kind": "colour",
     "desc": "Colour they take further away."
    }
   ],
   "notes": [
    "A live long-exposure: only the moving near layer paints glowing trails (tinted by distance) that slowly decay. Exposure Length is the trail persistence; the static room stays dark."
   ]
  },
  {
   "id": "tiltShift",
   "controls": [
    {
     "label": "Focus Depth",
     "kind": "slider",
     "desc": "Which distance stays sharp.",
     "range": "0..1"
    },
    {
     "label": "Tilt",
     "kind": "slider",
     "desc": "Tilts the focus band so it follows the frame rather than the depth.",
     "range": "0..1"
    },
    {
     "label": "Band Width",
     "kind": "slider",
     "desc": "Thickness of the in-focus slab.",
     "range": "0.03..0.5"
    },
    {
     "label": "Aperture",
     "kind": "slider",
     "desc": "How fast things blur once they leave that slab.",
     "range": "0..1"
    },
    {
     "label": "Max Blur",
     "kind": "slider",
     "desc": "Largest blur radius, in pixels.",
     "range": "2..20"
    },
    {
     "label": "Bokeh Bloom",
     "kind": "slider",
     "desc": "How much highlights bloom into circles when defocused.",
     "range": "0..1"
    },
    {
     "label": "Saturation",
     "kind": "slider",
     "desc": "Colour intensity, from grey to fully saturated.",
     "range": "0..1"
    }
   ],
   "notes": [
    "Real depth-of-field over the camera image: a thin slab stays sharp, the rest melts to creamy bokeh, shrinking the scene to a tabletop diorama. Tilt makes the focus band follow the frame."
   ]
  },
  {
   "id": "ironFilings",
   "controls": [
    {
     "label": "Fibre Length",
     "kind": "slider",
     "desc": "How long each filing is drawn.",
     "range": "0..1"
    },
    {
     "label": "Fibre Density",
     "kind": "slider",
     "desc": "How many filings cover the frame.",
     "range": "0..1"
    },
    {
     "label": "Depth Bands",
     "kind": "slider",
     "desc": "Terraces the field into distinct depth shells.",
     "range": "0..1"
    },
    {
     "label": "Swirl",
     "kind": "slider",
     "desc": "Curls the field lines around the form.",
     "range": "0..1"
    },
    {
     "label": "Crawl Speed",
     "kind": "slider",
     "desc": "How fast the filings creep along the field.",
     "range": "0..1"
    },
    {
     "label": "Ink Contrast",
     "kind": "slider",
     "desc": "Contrast between the filings and the ground.",
     "range": "0..1"
    },
    {
     "label": "Field Smoothing",
     "kind": "slider",
     "desc": "Smooths the field so lines flow instead of scattering.",
     "range": "0..1"
    },
    {
     "label": "Colour Tint",
     "kind": "toggle",
     "desc": "Tints the filings by depth instead of leaving them mono."
    },
    {
     "label": "Colour Map",
     "kind": "colourmap",
     "desc": "Replaces the mode's own colours with one of the shared depth colour maps."
    },
    {
     "label": "Ink Colour",
     "kind": "colour",
     "desc": "Colour of the filings."
    },
    {
     "label": "Background",
     "kind": "colour",
     "desc": "Brightness of everything the effect does not claim \u2014 0 leaves it black."
    }
   ],
   "notes": [
    "Magnetic iron filings stream toward the furthest LiDAR points (LIC flow). Field = Toward Far or Wrap (\u27c2); Swirl curls them; Crawl makes them travel into the distance; Fibre Density sets their size (lower = larger); Relief packs them denser in the recesses. Mono ink, or tint by a colour map."
   ]
  },
  {
   "id": "dither",
   "controls": [
    {
     "label": "Cell Size",
     "kind": "slider",
     "desc": "Size of one dither cell, in pixels \u2014 effectively the pixel-art resolution.",
     "range": "3..40"
    },
    {
     "label": "Shades",
     "kind": "slider",
     "desc": "How many tone levels the image is reduced to.",
     "range": "2..15"
    },
    {
     "label": "Depth Contrast",
     "kind": "slider",
     "desc": "Stretches the depth range before it is dithered.",
     "range": "0..1"
    },
    {
     "label": "Pixel Fill",
     "kind": "slider",
     "desc": "How much of each cell the ink fills.",
     "range": "0.2..1"
    },
    {
     "label": "Grid Angle",
     "kind": "slider",
     "desc": "Rotates the dither grid.",
     "range": "0..1"
    },
    {
     "label": "Grid Shear",
     "kind": "slider",
     "desc": "Skews the grid.",
     "range": "0..1"
    },
    {
     "label": "Cell Jitter",
     "kind": "slider",
     "desc": "Randomises cell positions, breaking up the regular pattern.",
     "range": "0..1"
    },
    {
     "label": "Softness",
     "kind": "slider",
     "desc": "Softens the hard edge of each dot.",
     "range": "0..1"
    },
    {
     "label": "Density Falloff",
     "kind": "slider",
     "desc": "Thins the dots out with distance.",
     "range": "0..1"
    },
    {
     "label": "Shimmer",
     "kind": "slider",
     "desc": "Animates the threshold so the pattern crawls.",
     "range": "0..1"
    },
    {
     "label": "Invert",
     "kind": "toggle",
     "desc": "Flips the tonal range, swapping which end of the depth reads as ink."
    },
    {
     "label": "Edge Thickness",
     "kind": "slider",
     "desc": "Weight of the outline drawn on silhouettes.",
     "range": "0..1"
    },
    {
     "label": "Edge Band",
     "kind": "slider",
     "desc": "How wide a depth step counts as an edge.",
     "range": "0..1"
    },
    {
     "label": "Edge Colour",
     "kind": "colour",
     "desc": "Colour of that outline."
    },
    {
     "label": "Sparkle",
     "kind": "slider",
     "desc": "How much glitter fires off the surface.",
     "range": "0..1"
    },
    {
     "label": "Sparkle Density",
     "kind": "slider",
     "desc": "How many sparkles appear along edges.",
     "range": "0..1"
    },
    {
     "label": "Sparkle Speed",
     "kind": "slider",
     "desc": "How fast they flicker.",
     "range": "0..1"
    },
    {
     "label": "Sparkle Colour",
     "kind": "colour",
     "desc": "Colour of the sparkles that fire along edges."
    },
    {
     "label": "Colour Map",
     "kind": "colourmap",
     "desc": "Replaces the mode's own colours with one of the shared depth colour maps."
    },
    {
     "label": "Base Colour",
     "kind": "colour",
     "desc": "The main colour the effect is drawn in."
    },
    {
     "label": "Mid Colour",
     "kind": "colour",
     "desc": "Colour of the mid tones."
    },
    {
     "label": "Highlight Colour",
     "kind": "colour",
     "desc": "Colour of the brightest tones."
    },
    {
     "label": "Background",
     "kind": "colour",
     "desc": "Brightness of everything the effect does not claim \u2014 0 leaves it black."
    }
   ],
   "notes": [
    "Depth rendered as dithered pixel art. The frame is tiled into square cells; each cell's depth is quantised into Shades levels with an ordered (Bayer) dither, then coloured base\u2192highlight (2 Colour), through a midtone (3 Colour), or via a Colour Map ramp (N-Shade). Pixel Fill < 1 leaves a grid gap between cells. More dither types, shapes and edge controls are coming."
   ]
  },
  {
   "id": "juicy",
   "controls": [
    {
     "label": "Velour Colour",
     "kind": "colour",
     "desc": "Colour of the velour fabric."
    },
    {
     "label": "Pattern Size",
     "kind": "slider",
     "desc": "Scale of the fabric weave.",
     "range": "0..1"
    },
    {
     "label": "Shimmer",
     "kind": "slider",
     "desc": "How much the nap catches the light as it moves.",
     "range": "0..1"
    },
    {
     "label": "Velour Nap",
     "kind": "slider",
     "desc": "Direction and depth of the pile, which is what makes velour shift tone.",
     "range": "0..1"
    },
    {
     "label": "Plush Rim",
     "kind": "slider",
     "desc": "Soft bright edge where the fabric turns away.",
     "range": "0..1"
    },
    {
     "label": "Depth Read",
     "kind": "slider",
     "desc": "How strongly depth shapes the fabric.",
     "range": "0..1"
    },
    {
     "label": "Colour Map",
     "kind": "toggle",
     "desc": "Replaces the mode's own colours with one of the shared depth colour maps."
    },
    {
     "label": "Depth Tint",
     "kind": "slider",
     "desc": "How much distance colours the fabric.",
     "range": "0..1"
    },
    {
     "label": "Sequin Colour",
     "kind": "colour",
     "desc": "Colour of the rhinestones."
    },
    {
     "label": "Sequin Size",
     "kind": "slider",
     "desc": "Size of each stone.",
     "range": "0..1"
    },
    {
     "label": "Sparkle",
     "kind": "slider",
     "desc": "How much glitter fires off the surface.",
     "range": "0..1"
    },
    {
     "label": "Bling Density",
     "kind": "slider",
     "desc": "How thickly stones are scattered.",
     "range": "0..1"
    },
    {
     "label": "Crystal Fire",
     "kind": "slider",
     "desc": "Rainbow dispersion inside each stone.",
     "range": "0..1"
    },
    {
     "label": "Twinkle",
     "kind": "slider",
     "desc": "Speed at which individual sparkles blink on and off.",
     "range": "0..1"
    },
    {
     "label": "Edge Sensitivity",
     "kind": "slider",
     "desc": "How tightly stones cling to the silhouette.",
     "range": "0..1"
    }
   ],
   "notes": [
    "A Juicy-Couture velour tracksuit on the depth field. The velour is a solid customizable colour shaded like plush fabric \u2014 Velour Nap is the two-tone sheen, Plush the grazing glow, Depth Read makes the form show through. Pattern Size tiles a seamless cotton shimmer (0 = one tile / solid). Rhinestone sequins trace the silhouette EDGES of objects (\u25c7 Diamond / \u2b21 Hexagon / \u2bc3 Octagon) and sparkle as you move the camera and the depth changes; Crystal Fire adds a rainbow flash. Edge Sensitivity sets how readily the bling outlines an object."
   ]
  },
  {
   "id": "aerochrome",
   "controls": [
    {
     "label": "IR Bloom",
     "kind": "slider",
     "desc": "How hot living things flare \u2014 the signature infrared magenta.",
     "range": "0..1"
    },
    {
     "label": "Band Rotation",
     "kind": "slider",
     "desc": "Rotates the false-colour channel swap.",
     "range": "0..1"
    },
    {
     "label": "Veg Gamma",
     "kind": "slider",
     "desc": "Response curve for vegetation, deciding how easily foliage goes hot.",
     "range": "0..2"
    },
    {
     "label": "Saturation Gate",
     "kind": "slider",
     "desc": "How saturated a colour must be before it counts as living.",
     "range": "0..1"
    },
    {
     "label": "Black Point",
     "kind": "slider",
     "desc": "Lifts or crushes the darkest tones.",
     "range": "0..0.5"
    },
    {
     "label": "Warm Bias",
     "kind": "slider",
     "desc": "Pushes the whole image warm or cool.",
     "range": "-1..1"
    },
    {
     "label": "IR Haze Start",
     "kind": "slider",
     "desc": "Distance at which the cyan atmospheric wash begins.",
     "range": "0..1"
    },
    {
     "label": "IR Haze End",
     "kind": "slider",
     "desc": "Distance at which it is at full strength.",
     "range": "0..1"
    },
    {
     "label": "Haze Tint",
     "kind": "colour",
     "desc": "Colour of that distance wash."
    },
    {
     "label": "Grain",
     "kind": "slider",
     "desc": "Film-grain noise over the result.",
     "range": "0..1"
    },
    {
     "label": "Vignette",
     "kind": "slider",
     "desc": "Darkens the frame corners.",
     "range": "0..1"
    },
    {
     "label": "Colour Map",
     "kind": "toggle",
     "desc": "Replaces the mode's own colours with one of the shared depth colour maps."
    },
    {
     "label": "Map",
     "kind": "colourmap",
     "desc": "Which shared colour map to use once Colour Map is on."
    }
   ],
   "notes": [
    "Kodak Aerochrome false-colour infrared: living things bloom hot magenta, far surfaces wash cyan. The live camera colour drives the look \u2014 point at greenery or skin to see it ignite."
   ]
  },
  {
   "id": "heatGhost",
   "controls": [
    {
     "label": "Knife Angle",
     "kind": "slider",
     "desc": "Orientation of the schlieren knife edge, which decides which slopes light up.",
     "range": "0..1"
    },
    {
     "label": "Schlieren Gain",
     "kind": "slider",
     "desc": "How strongly surface gradients flare.",
     "range": "0..1"
    },
    {
     "label": "Knife Softness",
     "kind": "slider",
     "desc": "Softens the cutoff at that knife edge.",
     "range": "0..1"
    },
    {
     "label": "Knife \u2194 Shadowgraph",
     "kind": "slider",
     "desc": "Crossfades between knife-edge schlieren and a shadowgraph, which reads curvature instead of slope.",
     "range": "0..1"
    },
    {
     "label": "Field Scale",
     "kind": "slider",
     "desc": "Scale of the density field being visualised.",
     "range": "0..1"
    },
    {
     "label": "Background Grey",
     "kind": "slider",
     "desc": "Base grey the deflections are measured against.",
     "range": "0..1"
    },
    {
     "label": "RGB Gradient Mix",
     "kind": "slider",
     "desc": "How much the real camera image contributes to the gradient.",
     "range": "0..1"
    },
    {
     "label": "Hue Spread",
     "kind": "slider",
     "desc": "How far apart the colours land across the deflection range.",
     "range": "0..1"
    },
    {
     "label": "Low Colour",
     "kind": "colour",
     "desc": "Colour for deflection one way."
    },
    {
     "label": "High Colour",
     "kind": "colour",
     "desc": "Colour for deflection the other way."
    },
    {
     "label": "Colour Map",
     "kind": "toggle",
     "desc": "Replaces the mode's own colours with one of the shared depth colour maps."
    },
    {
     "label": "Map",
     "kind": "colourmap",
     "desc": "Which shared colour map to use once Colour Map is on."
    }
   ],
   "notes": [
    "A colour-schlieren wind-tunnel image: surfaces flare bright/dark along their slope, hue swept by gradient direction. Shadowgraph swaps to a 2nd-derivative curvature read; RGB Gradient Mix lets the real image bend light too."
   ]
  },
  {
   "id": "solarise",
   "controls": [
    {
     "label": "Fold Point",
     "kind": "slider",
     "desc": "Brightness at which the tone curve folds back \u2014 the Sabattier reversal.",
     "range": "0..1"
    },
    {
     "label": "Fold Hardness",
     "kind": "slider",
     "desc": "How abrupt that fold is.",
     "range": "0..1"
    },
    {
     "label": "Channel Spread",
     "kind": "slider",
     "desc": "Offsets the fold per colour channel, which is what makes solarisation go metallic.",
     "range": "0..1"
    },
    {
     "label": "Mackie Lines",
     "kind": "slider",
     "desc": "Strength of the bright edge lines that form at the reversal.",
     "range": "0..1"
    },
    {
     "label": "Mackie Width",
     "kind": "slider",
     "desc": "How wide those lines run.",
     "range": "0..1"
    },
    {
     "label": "Depth Grade",
     "kind": "slider",
     "desc": "How much depth, rather than brightness, drives the grade.",
     "range": "0..1"
    },
    {
     "label": "Posterize",
     "kind": "slider",
     "desc": "Crushes the result into flat tone steps.",
     "range": "0..1"
    },
    {
     "label": "Camera Tint",
     "kind": "slider",
     "desc": "How much of the real camera colour bleeds into the effect.",
     "range": "0..1"
    },
    {
     "label": "Invert",
     "kind": "toggle",
     "desc": "Flips the tonal range, swapping which end of the depth reads as ink."
    },
    {
     "label": "Tint",
     "kind": "colour",
     "desc": "Overall colour cast of the print."
    },
    {
     "label": "Colour Map",
     "kind": "toggle",
     "desc": "Replaces the mode's own colours with one of the shared depth colour maps."
    },
    {
     "label": "Map",
     "kind": "colourmap",
     "desc": "Which shared colour map to use once Colour Map is on."
    }
   ],
   "notes": [
    "A darkroom Sabattier print: midtones fold and partially invert per RGB channel into eerie metallic colour, with bright Mackie lines on the edges. Channel Spread drives the colour crossover; depth grades the fold so the subject solarises harder."
   ]
  },
  {
   "id": "cymatic",
   "controls": [
    {
     "label": "Plate Tuning",
     "kind": "slider",
     "desc": "Frequency the plate is driven at, which sets the standing-wave pattern.",
     "range": "0..1"
    },
    {
     "label": "Mode Count",
     "kind": "slider",
     "desc": "How many vibration modes are excited at once.",
     "range": "2..12"
    },
    {
     "label": "Mode Jitter",
     "kind": "slider",
     "desc": "Detunes those modes so the figure is less perfectly symmetric.",
     "range": "0..1"
    },
    {
     "label": "Depth \u2192 Mode",
     "kind": "slider",
     "desc": "How much the depth field selects which mode is playing.",
     "range": "0..1"
    },
    {
     "label": "Asymmetry",
     "kind": "slider",
     "desc": "Skews the plate so the figure loses its mirror symmetry.",
     "range": "0..1"
    },
    {
     "label": "Sand Sharpness",
     "kind": "slider",
     "desc": "How tightly sand collects on the nodal lines.",
     "range": "0..1"
    },
    {
     "label": "Mode Decay",
     "kind": "slider",
     "desc": "How quickly higher modes fade out.",
     "range": "0..1"
    },
    {
     "label": "Animation Speed",
     "kind": "slider",
     "desc": "Rate the pattern morphs.",
     "range": "0..1"
    },
    {
     "label": "Audio Drive (mic)",
     "kind": "slider",
     "desc": "Lets live sound drive the plate. Opt-in; analysed on device, never recorded.",
     "range": "0..1"
    },
    {
     "label": "Light Drive",
     "kind": "slider",
     "desc": "How much the brightness of the real scene drives the plate.",
     "range": "0..1"
    },
    {
     "label": "Sand",
     "kind": "colour",
     "desc": "Colour of the sand."
    },
    {
     "label": "Plate",
     "kind": "colour",
     "desc": "Colour of the plate underneath."
    },
    {
     "label": "Colour Map",
     "kind": "toggle",
     "desc": "Replaces the mode's own colours with one of the shared depth colour maps."
    },
    {
     "label": "Map",
     "kind": "colourmap",
     "desc": "Which shared colour map to use once Colour Map is on."
    }
   ],
   "notes": [
    "A vibrating Chladni plate: sand collects on the standing-wave node lines. Depth tunes the plate (near = finer modes); Audio Drive uses the mic so the plate rings to sound; Light Drive lets the live brightness vibrate it harder."
   ]
  },
  {
   "id": "aquarelle",
   "controls": [
    {
     "label": "Pigment Load",
     "kind": "slider",
     "desc": "How much pigment is carried in the wash.",
     "range": "0..1"
    },
    {
     "label": "Edge Darkening",
     "kind": "slider",
     "desc": "Pigment pooling at the edge of each wash, the tell-tale watercolour rim.",
     "range": "0..1"
    },
    {
     "label": "Granulation",
     "kind": "slider",
     "desc": "Coarse pigment settling into the paper texture.",
     "range": "0..1"
    },
    {
     "label": "Paper Tooth",
     "kind": "slider",
     "desc": "Roughness of the paper, which decides where pigment catches.",
     "range": "0..1"
    },
    {
     "label": "Wet Bleed",
     "kind": "slider",
     "desc": "How far colour creeps into wet neighbouring areas.",
     "range": "0..1"
    },
    {
     "label": "Wobble",
     "kind": "slider",
     "desc": "Hand-made wobble in the wash boundaries.",
     "range": "0..1"
    },
    {
     "label": "Wobble Freq",
     "kind": "slider",
     "desc": "Scale of that wobble.",
     "range": "0..1"
    },
    {
     "label": "Colour Edges",
     "kind": "slider",
     "desc": "How strongly colour separates at wash boundaries.",
     "range": "0..1"
    },
    {
     "label": "Saturation",
     "kind": "slider",
     "desc": "Colour intensity, from grey to fully saturated.",
     "range": "0..1"
    },
    {
     "label": "Camera Tint",
     "kind": "slider",
     "desc": "How much of the real camera colour bleeds into the effect.",
     "range": "0..1"
    },
    {
     "label": "Paper",
     "kind": "colour",
     "desc": "Colour of the paper the ink is printed on."
    },
    {
     "label": "Colour Map",
     "kind": "toggle",
     "desc": "Replaces the mode's own colours with one of the shared depth colour maps."
    },
    {
     "label": "Map",
     "kind": "colourmap",
     "desc": "Which shared colour map to use once Colour Map is on."
    }
   ],
   "notes": [
    "The live scene as a wet watercolour: pigment pools dark at every edge, granulates in the paper tooth, and bleeds wet-in-wet but stops at silhouettes. Real camera colour is the pigment."
   ]
  },
  {
   "id": "tessera",
   "controls": [
    {
     "label": "Tile Size",
     "kind": "slider",
     "desc": "Size of each stone tessera.",
     "range": "0..1"
    },
    {
     "label": "Tile Gap",
     "kind": "slider",
     "desc": "Space left between neighbouring tiles.",
     "range": "0..1"
    },
    {
     "label": "Flow (Vermiculatum)",
     "kind": "slider",
     "desc": "Makes rows of tiles curve to follow contours, the way Roman mosaicists laid them around a figure.",
     "range": "0..1"
    },
    {
     "label": "Grout Width",
     "kind": "slider",
     "desc": "Thickness of the mortar lines.",
     "range": "0..1"
    },
    {
     "label": "Grout Darkness",
     "kind": "slider",
     "desc": "How dark that mortar reads.",
     "range": "0..1"
    },
    {
     "label": "Size by Edge",
     "kind": "slider",
     "desc": "Shrinks tiles near silhouettes so detail survives.",
     "range": "0..1"
    },
    {
     "label": "Palette Snap",
     "kind": "slider",
     "desc": "Snaps tile colours to a limited stone palette.",
     "range": "0..1"
    },
    {
     "label": "Bevel Light",
     "kind": "slider",
     "desc": "Lighting on each tile's bevelled edge.",
     "range": "0..1"
    },
    {
     "label": "Jitter",
     "kind": "slider",
     "desc": "Random rotation and offset per tile, so the laying looks hand-made.",
     "range": "0..1"
    },
    {
     "label": "Camera Tint",
     "kind": "slider",
     "desc": "How much of the real camera colour bleeds into the effect.",
     "range": "0..1"
    },
    {
     "label": "Grout",
     "kind": "colour",
     "desc": "Colour of the mortar."
    },
    {
     "label": "Colour Map",
     "kind": "toggle",
     "desc": "Replaces the mode's own colours with one of the shared depth colour maps."
    },
    {
     "label": "Map",
     "kind": "colourmap",
     "desc": "Which shared colour map to use once Colour Map is on."
    }
   ],
   "notes": [
    "Reality re-laid as a Roman stone mosaic: small tesserae in flowing rows that curve to hug every contour, dark grout between, each tile the colour of what it covers. Flow follows the depth gradient."
   ]
  },
  {
   "id": "chemigram",
   "controls": [
    {
     "label": "Development Speed",
     "kind": "slider",
     "desc": "How fast the developer tide advances.",
     "range": "0..1"
    },
    {
     "label": "Flow Strength",
     "kind": "slider",
     "desc": "How forcefully it flows across the print.",
     "range": "0..1"
    },
    {
     "label": "Flow Curl",
     "kind": "slider",
     "desc": "Swirl in that flow.",
     "range": "0..1"
    },
    {
     "label": "Resist Threshold",
     "kind": "slider",
     "desc": "How vivid an area must be to resist the developer and survive.",
     "range": "0..1"
    },
    {
     "label": "Stain Contrast",
     "kind": "slider",
     "desc": "Contrast of the resulting stains.",
     "range": "0..1"
    },
    {
     "label": "Age Gamma",
     "kind": "slider",
     "desc": "Ages the print, deepening the darks.",
     "range": "0..2"
    },
    {
     "label": "Fixer",
     "kind": "slider",
     "desc": "Freezes development, locking the current state.",
     "range": "0..1"
    },
    {
     "label": "Tide Sharpness",
     "kind": "slider",
     "desc": "How hard the boundary of the tide is.",
     "range": "0..1"
    },
    {
     "label": "Motion Feed",
     "kind": "slider",
     "desc": "Lets movement in the scene feed new developer in.",
     "range": "0..1"
    },
    {
     "label": "Grain",
     "kind": "slider",
     "desc": "Film-grain noise over the result.",
     "range": "0..1"
    },
    {
     "label": "Colour Map",
     "kind": "toggle",
     "desc": "Replaces the mode's own colours with one of the shared depth colour maps."
    },
    {
     "label": "Map",
     "kind": "colourmap",
     "desc": "Which shared colour map to use once Colour Map is on."
    }
   ],
   "notes": [
    "A darkroom developer tide creeps over the image along the depth flow, eating dull areas to silver/sepia while vivid colour resists and survives as islands. Motion Feed injects fresh developer where the scene moves."
   ]
  },
  {
   "id": "ripplefield",
   "controls": [
    {
     "label": "Wave Speed",
     "kind": "slider",
     "desc": "How fast wakes travel outward.",
     "range": "0..1"
    },
    {
     "label": "Damping",
     "kind": "slider",
     "desc": "How quickly they die away.",
     "range": "0..1"
    },
    {
     "label": "Disturbance",
     "kind": "slider",
     "desc": "How strongly the scene stirs the water.",
     "range": "0..1"
    },
    {
     "label": "Rain Rate",
     "kind": "slider",
     "desc": "How often new drops fall.",
     "range": "0..1"
    },
    {
     "label": "Drop Size",
     "kind": "slider",
     "desc": "Size of the ring each drop makes.",
     "range": "0..1"
    },
    {
     "label": "Refraction",
     "kind": "slider",
     "desc": "How much the surface bends what is underneath.",
     "range": "0..1"
    },
    {
     "label": "Edge Reflection",
     "kind": "slider",
     "desc": "How strongly waves bounce off silhouettes.",
     "range": "0..1"
    },
    {
     "label": "Specular",
     "kind": "slider",
     "desc": "Strength of the tight highlight where light hits square on.",
     "range": "0..1"
    },
    {
     "label": "Glint Sharpness",
     "kind": "slider",
     "desc": "Tightness of the specular glints on the water.",
     "range": "0..1"
    },
    {
     "label": "Transparency",
     "kind": "slider",
     "desc": "How clearly the scene shows through the water.",
     "range": "0..1"
    },
    {
     "label": "Depth Fade",
     "kind": "slider",
     "desc": "How fast the water darkens with distance.",
     "range": "0..1"
    },
    {
     "label": "Water Tint",
     "kind": "colour",
     "desc": "Colour of the water."
    },
    {
     "label": "Colour Map",
     "kind": "toggle",
     "desc": "Replaces the mode's own colours with one of the shared depth colour maps."
    },
    {
     "label": "Map",
     "kind": "colourmap",
     "desc": "Which shared colour map to use once Colour Map is on."
    }
   ],
   "notes": [
    "The room becomes a pool: depth is the seabed, moving objects and rain throw real spreading wakes that refract over the terrain and reflect off silhouettes, and light glints off the wave crests."
   ]
  },
  {
   "id": "ferrofluid",
   "controls": [
    {
     "label": "Pin Spacing",
     "kind": "slider",
     "desc": "Distance between beads, in pixels.",
     "range": "6..40"
    },
    {
     "label": "Bead Size",
     "kind": "slider",
     "desc": "Diameter of each bead.",
     "range": "0..1"
    },
    {
     "label": "Depth Push",
     "kind": "slider",
     "desc": "How far near beads are driven toward the viewer.",
     "range": "0..1"
    },
    {
     "label": "Size by Depth",
     "kind": "slider",
     "desc": "Makes closer beads larger.",
     "range": "0..1"
    },
    {
     "label": "Depth Brightness",
     "kind": "slider",
     "desc": "Lights closer beads more strongly.",
     "range": "0..1"
    },
    {
     "label": "Specular",
     "kind": "slider",
     "desc": "Strength of the tight highlight where light hits square on.",
     "range": "0..1"
    },
    {
     "label": "Gloss",
     "kind": "slider",
     "desc": "Sharpness of the wet-looking sheen.",
     "range": "0..1"
    },
    {
     "label": "Rim Light",
     "kind": "slider",
     "desc": "Bright edge around each bead.",
     "range": "0..1"
    },
    {
     "label": "Glow",
     "kind": "slider",
     "desc": "Adds a halo around lit areas.",
     "range": "0..1"
    },
    {
     "label": "Light Drive",
     "kind": "slider",
     "desc": "How much the real scene's brightness drives the field.",
     "range": "0..1"
    },
    {
     "label": "Hex Packing",
     "kind": "toggle",
     "desc": "Packs beads in a hexagonal lattice instead of a square grid."
    },
    {
     "label": "Fluid",
     "kind": "colour",
     "desc": "Colour of the fluid."
    },
    {
     "label": "Colour Map",
     "kind": "toggle",
     "desc": "Replaces the mode's own colours with one of the shared depth colour maps."
    },
    {
     "label": "Map",
     "kind": "colourmap",
     "desc": "Which shared colour map to use once Colour Map is on."
    }
   ],
   "notes": [
    "A wet black magnetic-fluid bead lattice (Pin-Screen logic): each pin is a glossy 3-D bead that pushes forward and grows the nearer it is, nearer beads overlapping in front. Depth Push breaks the near surface through the screen; Gloss/Specular set the wet sheen."
   ]
  },
  {
   "id": "dielectric",
   "controls": [
    {
     "label": "Growth Speed",
     "kind": "slider",
     "desc": "How fast the discharge branches spread.",
     "range": "0..1"
    },
    {
     "label": "Branchiness",
     "kind": "slider",
     "desc": "How readily a branch splits into two.",
     "range": "0..1"
    },
    {
     "label": "Branch Width",
     "kind": "slider",
     "desc": "Thickness of each filament.",
     "range": "0..1"
    },
    {
     "label": "Glow Decay",
     "kind": "slider",
     "desc": "How quickly a branch dims after it fires.",
     "range": "0..1"
    },
    {
     "label": "Afterglow",
     "kind": "slider",
     "desc": "How long the faint trace lingers behind.",
     "range": "0..1"
    },
    {
     "label": "Flicker",
     "kind": "slider",
     "desc": "Instability in the discharge brightness.",
     "range": "0..1"
    },
    {
     "label": "Arc Jitter",
     "kind": "slider",
     "desc": "Randomness in the path each arc takes.",
     "range": "0..1"
    },
    {
     "label": "Seed Density",
     "kind": "slider",
     "desc": "How many discharge points start at once.",
     "range": "0..1"
    },
    {
     "label": "Bloom",
     "kind": "slider",
     "desc": "Spills a soft glow out of the brightest areas.",
     "range": "0..1"
    },
    {
     "label": "Field Bias",
     "kind": "slider",
     "desc": "How strongly the depth gradient steers the branches downhill.",
     "range": "0..1"
    },
    {
     "label": "Strike on Motion",
     "kind": "toggle",
     "desc": "Fires a new discharge whenever something moves."
    },
    {
     "label": "Core",
     "kind": "colour",
     "desc": "Colour of the hot filament core."
    },
    {
     "label": "Glow",
     "kind": "colour",
     "desc": "Adds a halo around lit areas."
    },
    {
     "label": "Colour Map",
     "kind": "toggle",
     "desc": "Replaces the mode's own colours with one of the shared depth colour maps."
    },
    {
     "label": "Map",
     "kind": "colourmap",
     "desc": "Which shared colour map to use once Colour Map is on."
    }
   ],
   "notes": [
    "Glowing Lichtenberg lightning branches crawl across the form, forking down the depth gradient like electricity in acrylic. Bright lights and movement seed new strikes; the glow decays into an afterimage."
   ]
  },
  {
   "id": "parallax",
   "controls": [
    {
     "label": "Scene Mix",
     "kind": "slider",
     "desc": "Blends between the pure depth field (0) and the camera image (1).",
     "range": "0..1"
    },
    {
     "label": "Orbit Amount",
     "kind": "slider",
     "desc": "How far the virtual camera moves \u2014 the size of the 3-D swing.",
     "range": "0..1"
    },
    {
     "label": "Orbit Speed",
     "kind": "slider",
     "desc": "How fast it completes that path.",
     "range": "0.02..2"
    },
    {
     "label": "Infill Softness",
     "kind": "slider",
     "desc": "Softens the areas revealed behind objects, which have no real pixels to show.",
     "range": "0..1"
    },
    {
     "label": "Zoom",
     "kind": "slider",
     "desc": "Slight push-in that hides the frame edges as the camera moves.",
     "range": "1..1.2"
    },
    {
     "label": "Vignette",
     "kind": "slider",
     "desc": "Darkens the frame corners.",
     "range": "0..1"
    }
   ],
   "notes": []
  },
  {
   "id": "anaglyph",
   "controls": [
    {
     "label": "Scene Mix",
     "kind": "slider",
     "desc": "Blends between the pure depth field (0) and the camera image (1).",
     "range": "0..1"
    },
    {
     "label": "Baseline",
     "kind": "slider",
     "desc": "Distance between the two virtual eyes. More baseline, more 3-D and more strain.",
     "range": "0..1"
    },
    {
     "label": "Convergence",
     "kind": "slider",
     "desc": "Which depth sits exactly at the screen. Nearer pops out, farther recedes.",
     "range": "0..1"
    },
    {
     "label": "Wiggle Rate",
     "kind": "slider",
     "desc": "On the Wiggle encoding, how fast it flips between eyes \u2014 3-D without glasses.",
     "range": "1..16"
    },
    {
     "label": "Ghost Reduction",
     "kind": "slider",
     "desc": "Suppresses the leak of one eye's image into the other.",
     "range": "0..1"
    },
    {
     "label": "Saturation",
     "kind": "slider",
     "desc": "Colour intensity, from grey to fully saturated.",
     "range": "0..2"
    }
   ],
   "notes": [
    "Convergence sets which depth sits AT the screen \u2014 nearer pops out, farther recedes. Wiggle needs no glasses."
   ]
  },
  {
   "id": "aperture",
   "controls": [
    {
     "label": "Scene Mix",
     "kind": "slider",
     "desc": "Blends between the pure depth field (0) and the camera image (1).",
     "range": "0..1"
    },
    {
     "label": "Aperture",
     "kind": "slider",
     "desc": "How wide the lens opens, and so how shallow the depth of field is.",
     "range": "0..1"
    },
    {
     "label": "Blade Rotation",
     "kind": "slider",
     "desc": "Rotates the iris, turning the shape of out-of-focus highlights.",
     "range": "0..3.14"
    },
    {
     "label": "Anamorphic",
     "kind": "slider",
     "desc": "Squeezes the bokeh into ovals, as an anamorphic lens would.",
     "range": "0.5..3"
    },
    {
     "label": "Highlight Boost",
     "kind": "slider",
     "desc": "How much bright points blow out into bokeh discs.",
     "range": "0..1"
    },
    {
     "label": "Rack From",
     "kind": "slider",
     "desc": "Starting focus distance for a rack.",
     "range": "0..1"
    },
    {
     "label": "Rack To",
     "kind": "slider",
     "desc": "Ending focus distance for that rack.",
     "range": "0..1"
    },
    {
     "label": "Rack Speed",
     "kind": "slider",
     "desc": "How fast focus travels between them.",
     "range": "0.05..2"
    },
    {
     "label": "Focus Peaking",
     "kind": "slider",
     "desc": "Outlines whatever is currently in focus, as a focus assist would.",
     "range": "0..1"
    }
   ],
   "notes": []
  },
  {
   "id": "nebula",
   "controls": [
    {
     "label": "Scene Mix",
     "kind": "slider",
     "desc": "Blends between the pure depth field (0) and the camera image (1).",
     "range": "0..1"
    },
    {
     "label": "Density",
     "kind": "slider",
     "desc": "How thick the cloud is.",
     "range": "0.2..4"
    },
    {
     "label": "Noise Scale",
     "kind": "slider",
     "desc": "Size of the cloud structures.",
     "range": "0.5..8"
    },
    {
     "label": "Threshold",
     "kind": "slider",
     "desc": "How dense the noise must be before it becomes visible cloud.",
     "range": "0..0.9"
    },
    {
     "label": "Wind Speed",
     "kind": "slider",
     "desc": "How fast the cloud drifts.",
     "range": "0..1"
    },
    {
     "label": "Curl",
     "kind": "slider",
     "desc": "Swirl in that drift.",
     "range": "0..1"
    },
    {
     "label": "Self Shadow",
     "kind": "slider",
     "desc": "How much the cloud shadows itself, which is what gives it volume.",
     "range": "0..1"
    },
    {
     "label": "Scene Blend",
     "kind": "slider",
     "desc": "How much of the real scene shows through the cloud.",
     "range": "0..1"
    },
    {
     "label": "Depth Band",
     "kind": "slider",
     "desc": "Restricts the cloud to a slice of depth rather than filling the room.",
     "range": "0..1"
    },
    {
     "label": "Light",
     "kind": "colour",
     "desc": "Colour of the light source."
    },
    {
     "label": "Ambient",
     "kind": "colour",
     "desc": "Colour of the fill light inside the cloud."
    }
   ],
   "notes": [
    "The heaviest mode in the app \u2014 a real raymarch. Drop Steps if the phone gets hot."
   ]
  },
  {
   "id": "motes",
   "controls": [
    {
     "label": "Scene Mix",
     "kind": "slider",
     "desc": "Blends between the pure depth field (0) and the camera image (1).",
     "range": "0..1"
    },
    {
     "label": "Density",
     "kind": "slider",
     "desc": "How many motes are in the air.",
     "range": "4..30"
    },
    {
     "label": "Size",
     "kind": "slider",
     "desc": "Size of each floating particle.",
     "range": "0.1..2"
    },
    {
     "label": "Size Variance",
     "kind": "slider",
     "desc": "How much individual elements differ in size.",
     "range": "0..1"
    },
    {
     "label": "Brightness",
     "kind": "slider",
     "desc": "How brightly the motes catch the light.",
     "range": "0..2"
    },
    {
     "label": "Colour",
     "kind": "colour",
     "desc": "Colour of the motes."
    },
    {
     "label": "Colour 2",
     "kind": "colour",
     "desc": "Second colour, mixed across the population."
    },
    {
     "label": "Wind Speed",
     "kind": "slider",
     "desc": "How fast the motes drift on the wind.",
     "range": "0..0.3"
    },
    {
     "label": "Wind X",
     "kind": "slider",
     "desc": "Sideways drift.",
     "range": "-1..1"
    },
    {
     "label": "Wind Y",
     "kind": "slider",
     "desc": "Vertical drift \u2014 negative falls, positive rises.",
     "range": "-1..1"
    },
    {
     "label": "Turbulence",
     "kind": "slider",
     "desc": "How much the particles wander off the wind.",
     "range": "0..1"
    },
    {
     "label": "Depth of Field",
     "kind": "slider",
     "desc": "How much motes blur when they are out of the focal plane.",
     "range": "0..1"
    },
    {
     "label": "Sun Response",
     "kind": "slider",
     "desc": "How much brighter motes get when backlit.",
     "range": "0..1"
    },
    {
     "label": "Twinkle",
     "kind": "slider",
     "desc": "Speed at which individual sparkles blink on and off.",
     "range": "0..1"
    },
    {
     "label": "Scene Dim",
     "kind": "slider",
     "desc": "Darkens the real scene so the motes read.",
     "range": "0..1"
    }
   ],
   "notes": []
  },
  {
   "id": "woodblock",
   "controls": [
    {
     "label": "Scene Mix",
     "kind": "slider",
     "desc": "Blends between the pure depth field (0) and the camera image (1).",
     "range": "0..1"
    },
    {
     "label": "Line Frequency",
     "kind": "slider",
     "desc": "How many engraved lines per screen width.",
     "range": "40..400"
    },
    {
     "label": "Line Weight",
     "kind": "slider",
     "desc": "Thickness of each cut.",
     "range": "0.05..0.8"
    },
    {
     "label": "Weight Variance",
     "kind": "slider",
     "desc": "How much line weight varies with tone.",
     "range": "0..1"
    },
    {
     "label": "Hatch Angle",
     "kind": "slider",
     "desc": "Angle the hatching runs at.",
     "range": "0.17..1.57"
    },
    {
     "label": "Coherence",
     "kind": "slider",
     "desc": "How strictly lines follow the form rather than the fixed angle.",
     "range": "0..1"
    },
    {
     "label": "Tone Curve",
     "kind": "slider",
     "desc": "How grey values map onto line weight.",
     "range": "0..1"
    },
    {
     "label": "Silhouette",
     "kind": "slider",
     "desc": "Extra weight on outlines, so shapes read as cut blocks.",
     "range": "0..1.5"
    },
    {
     "label": "Taper",
     "kind": "slider",
     "desc": "Tapers each line toward its ends, like a real graver stroke.",
     "range": "0..1"
    },
    {
     "label": "Second Ink",
     "kind": "slider",
     "desc": "Brings in a second ink colour for the darkest tones.",
     "range": "0..1"
    },
    {
     "label": "Paper Grain",
     "kind": "slider",
     "desc": "Fibre texture of the simulated paper stock.",
     "range": "0..1"
    },
    {
     "label": "Ink",
     "kind": "colour",
     "desc": "Colour of the ink the marks are printed in."
    },
    {
     "label": "Paper",
     "kind": "colour",
     "desc": "Colour of the paper the ink is printed on."
    }
   ],
   "notes": []
  },
  {
   "id": "stipple",
   "controls": [
    {
     "label": "Scene Mix",
     "kind": "slider",
     "desc": "Blends between the pure depth field (0) and the camera image (1).",
     "range": "0..1"
    },
    {
     "label": "Dot Scale",
     "kind": "slider",
     "desc": "How many dots per screen width.",
     "range": "15..140"
    },
    {
     "label": "Density",
     "kind": "slider",
     "desc": "How much of the effect fills the frame.",
     "range": "0.4..2"
    },
    {
     "label": "Density Curve",
     "kind": "slider",
     "desc": "How tone maps onto dot density.",
     "range": "0..1"
    },
    {
     "label": "Size Variance",
     "kind": "slider",
     "desc": "How much individual elements differ in size.",
     "range": "0..1"
    },
    {
     "label": "Curvature",
     "kind": "slider",
     "desc": "Bends dot rows to follow the surface, the way an engraver stipples a curve.",
     "range": "0..1"
    },
    {
     "label": "Ellipticity",
     "kind": "slider",
     "desc": "Stretches dots into ellipses along that curvature.",
     "range": "0..1"
    },
    {
     "label": "Edge Crowding",
     "kind": "slider",
     "desc": "Packs extra dots along silhouettes.",
     "range": "0..1.5"
    },
    {
     "label": "Jitter",
     "kind": "slider",
     "desc": "Randomises dot placement so the grid does not show.",
     "range": "0..1"
    },
    {
     "label": "Second Ink",
     "kind": "slider",
     "desc": "Brings in a second ink colour for the darkest tones.",
     "range": "0..1"
    },
    {
     "label": "Paper Grain",
     "kind": "slider",
     "desc": "Fibre texture of the simulated paper stock.",
     "range": "0..1"
    },
    {
     "label": "Ink",
     "kind": "colour",
     "desc": "Colour of the ink the marks are printed in."
    },
    {
     "label": "Paper",
     "kind": "colour",
     "desc": "Colour of the paper the ink is printed on."
    }
   ],
   "notes": []
  },
  {
   "id": "lattice",
   "controls": [
    {
     "label": "Scene Mix",
     "kind": "slider",
     "desc": "Blends between the pure depth field (0) and the camera image (1).",
     "range": "0..1"
    },
    {
     "label": "Cell Size",
     "kind": "slider",
     "desc": "Size of one lattice cell, in pixels.",
     "range": "8..90"
    },
    {
     "label": "Perspective",
     "kind": "slider",
     "desc": "How much the grid converges with distance.",
     "range": "0..1"
    },
    {
     "label": "Subdivision",
     "kind": "slider",
     "desc": "Extra subdivision where the surface has detail.",
     "range": "0..1"
    },
    {
     "label": "Line Weight",
     "kind": "slider",
     "desc": "Thickness of the wireframe lines.",
     "range": "0..1"
    },
    {
     "label": "Vertex Glow",
     "kind": "slider",
     "desc": "Brightness of the nodes where lines meet.",
     "range": "0..1"
    },
    {
     "label": "Twinkle",
     "kind": "slider",
     "desc": "Speed at which individual sparkles blink on and off.",
     "range": "0..1"
    },
    {
     "label": "Scan Speed",
     "kind": "slider",
     "desc": "How fast the scan sweeps through depth.",
     "range": "0.02..1.5"
    },
    {
     "label": "Scan Width",
     "kind": "slider",
     "desc": "Thickness of the scanning band.",
     "range": "0.02..0.5"
    },
    {
     "label": "Trail",
     "kind": "slider",
     "desc": "How long the scan's wake persists.",
     "range": "0.02..1"
    },
    {
     "label": "Fill Opacity",
     "kind": "slider",
     "desc": "Opacity of the fill behind the wireframe.",
     "range": "0..1"
    },
    {
     "label": "Depth Colour",
     "kind": "toggle",
     "desc": "Colours the lattice by distance instead of a flat colour."
    },
    {
     "label": "Line",
     "kind": "colour",
     "desc": "Colour of the wireframe."
    }
   ],
   "notes": []
  },
  {
   "id": "datamosh",
   "controls": [
    {
     "label": "Scene Mix",
     "kind": "slider",
     "desc": "Blends between the pure depth field (0) and the camera image (1).",
     "range": "0..1"
    },
    {
     "label": "Smear",
     "kind": "slider",
     "desc": "How far blocks drag before they are refreshed.",
     "range": "0..1"
    },
    {
     "label": "Depth Bias",
     "kind": "slider",
     "desc": "0 keeps near objects sharp and melts the background; 1 does the reverse.",
     "range": "0..1"
    },
    {
     "label": "Block Size",
     "kind": "slider",
     "desc": "Size of a motion block, in pixels.",
     "range": "4..48"
    },
    {
     "label": "Search Range",
     "kind": "slider",
     "desc": "How far the codec looks for a matching block.",
     "range": "1..5"
    },
    {
     "label": "Vector Amplify",
     "kind": "slider",
     "desc": "Exaggerates the motion vectors, so smearing overshoots.",
     "range": "0.2..4"
    },
    {
     "label": "I-Frame Rate",
     "kind": "slider",
     "desc": "How often the image resets to a clean frame. At 0 it never resets and dissolves completely.",
     "range": "0..2"
    },
    {
     "label": "Colour Quantise",
     "kind": "slider",
     "desc": "Crushes colour into fewer steps, like a heavily compressed stream.",
     "range": "0..1"
    },
    {
     "label": "Chroma Bleed",
     "kind": "slider",
     "desc": "Lets colour smear further than luminance.",
     "range": "0..1"
    },
    {
     "label": "Trail Decay",
     "kind": "slider",
     "desc": "How quickly the smear fades.",
     "range": "0..1"
    }
   ],
   "notes": [
    "Depth Bias 0 keeps near objects sharp and melts the background; 1 does the reverse. I-Frame Rate 0 never resets \u2014 it will dissolve completely."
   ]
  },
  {
   "id": "aerial",
   "controls": [
    {
     "label": "Scene Mix",
     "kind": "slider",
     "desc": "Blends between the pure depth field (0) and the camera image (1).",
     "range": "0..1"
    },
    {
     "label": "Density",
     "kind": "slider",
     "desc": "Overall thickness of the atmosphere between you and the scene.",
     "range": "0.1..3.5"
    },
    {
     "label": "Rayleigh",
     "kind": "slider",
     "desc": "Blue scattering from air molecules \u2014 what makes distant hills go blue.",
     "range": "0..1.5"
    },
    {
     "label": "Mie",
     "kind": "slider",
     "desc": "Scattering from larger particles: haze, dust and moisture.",
     "range": "0..1.5"
    },
    {
     "label": "Mie Asymmetry",
     "kind": "slider",
     "desc": "How much that haze scatters forward toward the sun rather than evenly.",
     "range": "-0.9..0.95"
    },
    {
     "label": "Desaturation",
     "kind": "slider",
     "desc": "How much colour distance drains out of far surfaces.",
     "range": "0..1"
    },
    {
     "label": "Contrast Loss",
     "kind": "slider",
     "desc": "How much contrast the atmosphere eats with distance.",
     "range": "0..1"
    },
    {
     "label": "Haze Structure",
     "kind": "slider",
     "desc": "Adds cloud-like structure to the haze instead of a smooth wash.",
     "range": "0..1"
    },
    {
     "label": "Sun Disc",
     "kind": "slider",
     "desc": "Brightness of the sun itself in frame.",
     "range": "0..1"
    },
    {
     "label": "Horizon Blend",
     "kind": "slider",
     "desc": "How smoothly the far scene dissolves into sky.",
     "range": "0..1"
    },
    {
     "label": "Sky",
     "kind": "colour",
     "desc": "Colour of the sky the haze tends toward."
    },
    {
     "label": "Sun",
     "kind": "colour",
     "desc": "Colour of the sunlight."
    }
   ],
   "notes": [
    "Real atmospheric scattering \u2014 point it down a street or out of a window. Needs distance to work; indoors it will look subtle."
   ]
  },
  {
   "id": "godlight",
   "controls": [
    {
     "label": "Scene Mix",
     "kind": "slider",
     "desc": "Blends between the pure depth field (0) and the camera image (1).",
     "range": "0..1"
    },
    {
     "label": "Density",
     "kind": "slider",
     "desc": "How densely the light shafts fill the air.",
     "range": "0.05..1"
    },
    {
     "label": "Decay",
     "kind": "slider",
     "desc": "How fast each shaft loses energy along its length.",
     "range": "0.85..1"
    },
    {
     "label": "Exposure",
     "kind": "slider",
     "desc": "Overall brightness of the shafts.",
     "range": "0..2.5"
    },
    {
     "label": "Source Threshold",
     "kind": "slider",
     "desc": "How bright a pixel must be to emit rays.",
     "range": "0..1"
    },
    {
     "label": "Scene Emission",
     "kind": "slider",
     "desc": "How much the whole scene glows, not just bright points.",
     "range": "0..1.5"
    },
    {
     "label": "Dust",
     "kind": "slider",
     "desc": "Airborne particles for the light to catch on.",
     "range": "0..1"
    },
    {
     "label": "Shaft Softness",
     "kind": "slider",
     "desc": "Softens the edges of each shaft.",
     "range": "0..1"
    },
    {
     "label": "Background Dim",
     "kind": "slider",
     "desc": "Darkens everything else so the shafts stand out.",
     "range": "0..1"
    },
    {
     "label": "Rim Offset",
     "kind": "slider",
     "desc": "How far behind the subject the light source sits, on the front camera's Rim variant.",
     "range": "0.05..0.6"
    },
    {
     "label": "Light",
     "kind": "colour",
     "desc": "Colour of the light source."
    }
   ],
   "notes": [
    "On the front camera the sun moves behind your head automatically (Rim), so the shafts halo your hair."
   ]
  },
  {
   "id": "hologram",
   "controls": [
    {
     "label": "Scene Mix",
     "kind": "slider",
     "desc": "Blends between the pure depth field (0) and the camera image (1).",
     "range": "0..1"
    },
    {
     "label": "Scanline Frequency",
     "kind": "slider",
     "desc": "How many interference lines run across the projection.",
     "range": "30..300"
    },
    {
     "label": "Scanline Speed",
     "kind": "slider",
     "desc": "How fast they travel.",
     "range": "0..5"
    },
    {
     "label": "Depth Phase",
     "kind": "slider",
     "desc": "Bends the lines around the form. At 0 they lie flat on the screen like CRT scanlines.",
     "range": "0..1"
    },
    {
     "label": "Transparency",
     "kind": "slider",
     "desc": "How see-through the projection is.",
     "range": "0..1"
    },
    {
     "label": "Rim",
     "kind": "slider",
     "desc": "Brightness of the edge glow.",
     "range": "0..1.5"
    },
    {
     "label": "Chromatic Fringe",
     "kind": "slider",
     "desc": "Colour separation at edges, as a real hologram splits light.",
     "range": "0..1"
    },
    {
     "label": "Projection Cone",
     "kind": "slider",
     "desc": "Cone of light beneath the subject, as though projected from below.",
     "range": "0..1"
    },
    {
     "label": "Glitch Rate",
     "kind": "slider",
     "desc": "How often the projection stutters.",
     "range": "0..1"
    },
    {
     "label": "Glitch Severity",
     "kind": "slider",
     "desc": "How badly it breaks up when it does.",
     "range": "0..1"
    },
    {
     "label": "Depth Bands",
     "kind": "slider",
     "desc": "Terraces the depth into discrete layers instead of a smooth ramp.",
     "range": "0..1"
    },
    {
     "label": "Bloom",
     "kind": "slider",
     "desc": "Spills a soft glow out of the brightest areas.",
     "range": "0..1"
    },
    {
     "label": "Near Colour",
     "kind": "colour",
     "desc": "Colour of the near parts of the projection."
    },
    {
     "label": "Far Colour",
     "kind": "colour",
     "desc": "Colour of the far parts."
    }
   ],
   "notes": [
    "Depth Phase bends the interference lines around the form \u2014 at 0 they lie flat on the screen like CRT scanlines."
   ]
  },
  {
   "id": "papercut",
   "controls": [
    {
     "label": "Scene Mix",
     "kind": "slider",
     "desc": "Blends between the pure depth field (0) and the camera image (1).",
     "range": "0..1"
    },
    {
     "label": "Deckle",
     "kind": "slider",
     "desc": "Rough torn edge on each paper plate.",
     "range": "0..1"
    },
    {
     "label": "Deckle Scale",
     "kind": "slider",
     "desc": "Size of that tearing.",
     "range": "0..1"
    },
    {
     "label": "Shadow",
     "kind": "slider",
     "desc": "Strength of the drop shadow each plate casts on the one below.",
     "range": "0..1"
    },
    {
     "label": "Shadow Distance",
     "kind": "slider",
     "desc": "How far the plates sit apart.",
     "range": "0..1"
    },
    {
     "label": "Shadow Softness",
     "kind": "slider",
     "desc": "How diffuse those shadows are.",
     "range": "0..1"
    },
    {
     "label": "Paper Grain",
     "kind": "slider",
     "desc": "Fibre texture of the simulated paper stock.",
     "range": "0..1"
    },
    {
     "label": "Hue Jitter",
     "kind": "slider",
     "desc": "Slight colour variation between plates.",
     "range": "0..1"
    },
    {
     "label": "Outline",
     "kind": "slider",
     "desc": "Draws a line around each cut plate.",
     "range": "0..1"
    }
   ],
   "notes": [
    "Plate boundaries are placed at the natural gaps in the depth histogram, not at even intervals \u2014 that is what makes the cuts land on real objects. On the front camera you get your own dedicated top plate.  Scene Mix only applies when Colour From is set to Scene or Both \u2014 on Palette the plates take their colour from the palette and no image is read at all."
   ]
  },
  {
   "id": "riso",
   "controls": [
    {
     "label": "Scene Mix",
     "kind": "slider",
     "desc": "Blends between the pure depth field (0) and the camera image (1).",
     "range": "0..1"
    },
    {
     "label": "Screen Frequency",
     "kind": "slider",
     "desc": "How fine the halftone screen is on each plate.",
     "range": "30..240"
    },
    {
     "label": "Band Overlap",
     "kind": "slider",
     "desc": "How much neighbouring plates overlap, where inks mix.",
     "range": "0..1"
    },
    {
     "label": "Misregistration",
     "kind": "slider",
     "desc": "How far the plates sit out of alignment \u2014 the signature riso slip.",
     "range": "0..1"
    },
    {
     "label": "Registration Drift",
     "kind": "slider",
     "desc": "How much that misalignment wanders over time.",
     "range": "0..1"
    },
    {
     "label": "Tone Curve",
     "kind": "slider",
     "desc": "How grey values map onto ink coverage on each plate.",
     "range": "0..1"
    },
    {
     "label": "Ink Coverage",
     "kind": "slider",
     "desc": "How much ink each plate lays down.",
     "range": "0..1"
    },
    {
     "label": "Paper Grain",
     "kind": "slider",
     "desc": "Fibre texture of the simulated paper stock.",
     "range": "0..1"
    },
    {
     "label": "Split Tone Sources",
     "kind": "toggle",
     "desc": "Makes each plate read a different signal \u2014 image, shading or edges \u2014 so the colours never quite describe the same thing."
    },
    {
     "label": "Ink 1",
     "kind": "colour",
     "desc": "First ink. The default set is the real Riso palette: fluorescent pink, blue, yellow, black."
    },
    {
     "label": "Ink 2",
     "kind": "colour",
     "desc": "Second ink."
    },
    {
     "label": "Ink 3",
     "kind": "colour",
     "desc": "Third ink."
    },
    {
     "label": "Ink 4",
     "kind": "colour",
     "desc": "Fourth ink."
    },
    {
     "label": "Paper",
     "kind": "colour",
     "desc": "Colour of the paper the ink is printed on."
    }
   ],
   "notes": [
    "Split Tone Sources makes each plate read a different signal (image / shading / edges) \u2014 the reason riso colours never quite describe the same thing."
   ]
  },
  {
   "id": "vertigo",
   "controls": [
    {
     "label": "Scene Mix",
     "kind": "slider",
     "desc": "Blends between the pure depth field (0) and the camera image (1).",
     "range": "0..1"
    },
    {
     "label": "Amount",
     "kind": "slider",
     "desc": "How strongly the dolly-zoom pulls. Negative reverses the direction.",
     "range": "-1..1"
    },
    {
     "label": "Speed",
     "kind": "slider",
     "desc": "How fast the effect breathes in and out.",
     "range": "0.02..2"
    },
    {
     "label": "Edge Blend",
     "kind": "slider",
     "desc": "Blends the warped frame back into its edges.",
     "range": "0..1"
    },
    {
     "label": "Background Only",
     "kind": "toggle",
     "desc": "Leaves the subject untouched and only warps the room behind \u2014 the flattering setting for selfies."
    },
    {
     "label": "Vignette",
     "kind": "slider",
     "desc": "Darkens the frame corners.",
     "range": "0..1"
    }
   ],
   "notes": [
    "Negative Amount reverses the dolly. Background Only leaves the subject completely untouched and only breathes the room behind \u2014 the flattering setting for selfies."
   ]
  }
 ],
 "globals": [
  {
   "group": "Output",
   "rows": [
    {
     "label": "Resolution",
     "kind": "picker",
     "desc": "Render resolution. Lower is faster and cooler; higher keeps fine detail."
    },
    {
     "label": "Aspect",
     "kind": "picker",
     "desc": "3:4 preview, or full-screen 9:16."
    },
    {
     "label": "Keep Screen On",
     "kind": "toggle",
     "desc": "Stops the display sleeping while you are shooting."
    }
   ]
  },
  {
   "group": "Image",
   "rows": [
    {
     "label": "Detail",
     "kind": "slider",
     "desc": "How much fine structure survives in the depth field. 0\u20131."
    },
    {
     "label": "Definition",
     "kind": "slider",
     "desc": "Local contrast on the depth, sharpening the read of surfaces. 0\u20131."
    },
    {
     "label": "Brightness",
     "kind": "slider",
     "desc": "Lifts or lowers the whole image. \u22120.5\u20130.5."
    },
    {
     "label": "Contrast",
     "kind": "slider",
     "desc": "Spread between darks and lights. 0.5\u20132."
    },
    {
     "label": "Gamma",
     "kind": "slider",
     "desc": "Mid-tone bias \u2014 where the middle of the range sits. 0.3\u20133."
    },
    {
     "label": "Smoothing",
     "kind": "slider",
     "desc": "Softens depth noise at the cost of fine detail. 0\u20130.8."
    },
    {
     "label": "Smart Hole Fill",
     "kind": "toggle",
     "desc": "Patches gaps the sensor could not read, using neighbouring depth."
    },
    {
     "label": "Invert Depth",
     "kind": "toggle",
     "desc": "Flips near and far for every mode at once."
    }
   ]
  },
  {
   "group": "Range",
   "rows": [
    {
     "label": "Near Clip",
     "kind": "slider",
     "desc": "Closest distance the effect responds to, in metres. 0\u20131 m."
    },
    {
     "label": "Far Clip",
     "kind": "slider",
     "desc": "Furthest distance it responds to. 0.5\u201320 m."
    }
   ]
  },
  {
   "group": "Depth Engine",
   "rows": [
    {
     "label": "Relief Strength",
     "kind": "slider",
     "desc": "Global exaggeration of surface relief, shared by every normals-based mode. 0\u20131."
    },
    {
     "label": "Sun Azimuth",
     "kind": "slider",
     "desc": "Compass direction of the virtual sun used for shading. 0\u2013360\u00b0."
    },
    {
     "label": "Sun Elevation",
     "kind": "slider",
     "desc": "Height of that sun above the horizon. 0\u201390\u00b0."
    },
    {
     "label": "Edge Threshold",
     "kind": "slider",
     "desc": "How large a depth step counts as a silhouette edge. 0.02\u20130.5 m."
    },
    {
     "label": "World Scale",
     "kind": "slider",
     "desc": "Scales the whole depth field, making the scene read bigger or smaller. 0.25\u20134\u00d7."
    },
    {
     "label": "Temporal Frames",
     "kind": "stepper",
     "desc": "How many frames of depth are averaged. More is steadier but smears motion. 1\u201316."
    },
    {
     "label": "Smoothing Source",
     "kind": "picker",
     "desc": "Which smoothing the depth goes through before the modes see it."
    },
    {
     "label": "LiDAR Confidence",
     "kind": "picker",
     "desc": "Rear LiDAR only: drops low-confidence depth pixels \u2014 reflective, far or grazing \u2014 using ARKit's confidence map. Off keeps every mode exactly as it looks today."
    }
   ]
  },
  {
   "group": "Presets",
   "rows": [
    {
     "label": "Preset",
     "kind": "picker",
     "desc": "The three per-mode presets. Saving and renaming is Pro; switching is free."
    }
   ]
  },
  {
   "group": "LiDAR Presets",
   "rows": [
    {
     "label": "Preset",
     "kind": "picker",
     "desc": "Universal depth and tone presets that apply to every mode and stay selected when you switch. All three are free to use; saving and renaming is Pro."
    }
   ]
  },
  {
   "group": "Sound",
   "rows": [
    {
     "label": "Camera Sounds",
     "kind": "toggle",
     "desc": "Shutter and record tones."
    },
    {
     "label": "Depth Bar",
     "kind": "picker",
     "desc": "Whether the on-camera mode switcher shows text pills or icons."
    },
    {
     "label": "Volume Buttons",
     "kind": "picker",
     "desc": "What the physical volume buttons do: record, photo, switch camera, or adjust."
    }
   ]
  },
  {
   "group": "NDI",
   "rows": [
    {
     "label": "NDI Streaming",
     "kind": "toggle",
     "desc": "Broadcasts the live preview to NDI receivers on your local network. Pro, and off by default."
    },
    {
     "label": "Second RGB Stream",
     "kind": "toggle",
     "desc": "Adds a second source, ZPTHRGB, carrying the raw camera alongside the effect so you can mix both on the receiving end."
    },
    {
     "label": "NDI Wired Mode",
     "kind": "toggle",
     "desc": "Sends NDI over a USB-C cable with Personal Hotspot on, for lower latency and no Wi-Fi congestion."
    }
   ]
  },
  {
   "group": "Recordings",
   "rows": [
    {
     "label": "Save to Photos",
     "kind": "button",
     "desc": "Moves clips an older build left in the app's own storage into your Photos library, then deletes the local copy."
    }
   ]
  },
  {
   "group": "Reset",
   "rows": [
    {
     "label": "Reset Mode",
     "kind": "button",
     "desc": "Restores the current mode to its first-launch defaults. Hold 0.8 s to confirm."
    },
    {
     "label": "Reset All",
     "kind": "button",
     "desc": "Resets every mode, LiDAR and tone. Your saved custom modes are kept."
    }
   ]
  }
 ]
};
