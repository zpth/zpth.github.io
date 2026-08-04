/* ZPTH — live depth-mode engine.
   Takes a real photograph and its depth map — estimated offline with Apple's
   Core ML build of Depth Anything V2 — and paints it with browser re-creations
   of the app's 30 real-time modes. Everything runs locally on your GPU. */
(function () {
  'use strict';

  /* ---------------------------------------------------------------- mode table
     Names + descriptions are the app's own, in the app's own order.            */
  var MODES = [
    { n: 'Environment',  c: '#37d9c4', d: 'A clean depth view of the space around you, near to far.' },
    { n: 'Face',         c: '#e8c9a8', d: 'Sculpted facial relief from the depth camera.' },
    { n: 'Raw',          c: '#7f95ff', d: 'A glitchy, topographic depth look with posterised bands and scanlines.' },
    { n: 'Plasma',       c: '#e14ad6', d: 'Depth-driven nebula filaments that flow and warp.' },
    { n: 'Organic',      c: '#6fd44a', d: 'A reaction-diffusion world that grows from the closest point.' },
    { n: 'Data',         c: '#4ef07a', d: 'A point cloud of numbers: every depth point printed as its distance.' },
    { n: 'Contour',      c: '#ffd23f', d: 'Depth as a colour spectrum drawn with topographic isolines.' },
    { n: 'Hillshade',    c: '#c9a86b', d: 'Relief-lit terrain shading from the depth surface.' },
    { n: 'Chrome',       c: '#d6d9e0', d: 'Liquid chrome, gold, wax and clay from the depth normals.' },
    { n: 'Oil Slick',    c: '#9d6bff', d: 'Thin-film iridescence: petrol, nacre and laser fringes.' },
    { n: 'Pulsar',       c: '#3fe0ff', d: 'A Rutt-Etra line synth of depth-driven waves, optionally audio-reactive to live sound.' },
    { n: 'Sonar',        c: '#3fff9e', d: 'A sweeping sonar scan of the scene.' },
    { n: 'Pin Screen',   c: '#6fb8ff', d: 'A pin-art lattice that pushes toward you with depth.' },
    { n: 'Voxel',        c: '#7fd94a', d: 'The scene rebuilt as 3D blocks.' },
    { n: 'Facets',       c: '#8fd6e8', d: 'Depth shattered into flat-shaded crystal facets.' },
    { n: 'Light Trails', c: '#ff8a3f', d: 'Long-exposure motion trails.' },
    { n: 'Miniature',    c: '#ffb347', d: 'A tilt-shift, toy-world look.' },
    { n: 'Iron Filings', c: '#b9c2cc', d: 'Magnetic-field fibres flowing over the depth.' },
    { n: 'Dither',       c: '#8ce89a', d: 'Depth turned into ordered, blue-noise and halftone pixel art.' },
    { n: 'Juicy',        c: '#ff5fb0', d: 'Velour and rhinestone bling on the depth field.' },
    { n: 'Aerochrome',   c: '#ff3f8f', d: 'False-colour infrared; living things bloom hot magenta, far surfaces wash cyan.' },
    { n: 'Heat Ghost',   c: '#ff6a3f', d: 'A colour-schlieren wind-tunnel image where surfaces flare along their slope.' },
    { n: 'Solarise',     c: '#c4b0ff', d: 'A darkroom Sabattier fold into metallic colour with bright edge lines.' },
    { n: 'Cymatic',      c: '#ffe07a', d: 'A vibrating Chladni plate; sand gathers on the standing-wave nodes.' },
    { n: 'Aquarelle',    c: '#8fb8e8', d: 'The live scene as wet watercolour, pigment pooling and granulating on paper.' },
    { n: 'Tessera',      c: '#d9a06b', d: 'Reality re-laid as a Roman stone mosaic that curves to hug every contour.' },
    { n: 'Chemigram',    c: '#e8b04a', d: 'A darkroom developer tide that eats dull areas while vivid colour survives.' },
    { n: 'Ripplefield',  c: '#4ab8ff', d: 'The room becomes a pool with spreading wakes that refract over the depth.' },
    { n: 'Ferrofluid',   c: '#9aa4b0', d: 'A glossy black magnetic-bead lattice that pushes toward you with depth.' },
    { n: 'Lichtenberg',  c: '#b47aff', d: 'Glowing lightning branches forking down the depth gradient.' },
    /* Wave 9 — monocular. Depth comes from DepthAnythingV2 on the Neural Engine, so
       these run on every iPhone and on both cameras, with no LiDAR or TrueDepth. */
    { n: 'Parallax',     c: '#6fe3ff', d: 'A 3-D camera move made from a still frame — the scene orbits and the background slides behind the subject.', mono: true },
    { n: 'Anaglyph',     c: '#ff5f5f', d: 'Red/cyan stereo 3-D from one camera, or a wiggle that needs no glasses at all.', mono: true },
    { n: 'Aperture',     c: '#ffd9a0', d: 'Cinema depth of field with a real iris: bladed bokeh, rack focus and focus peaking.', mono: true },
    { n: 'Nebula',       c: '#c08cff', d: 'A volumetric cloud raymarched through the room, lit and self-shadowing.', mono: true },
    { n: 'Motes',        c: '#ffeec2', d: 'Dust and pollen hanging in the air, drifting through the depth of the scene.', mono: true },
    { n: 'Woodblock',    c: '#d8b48a', d: 'A hand-cut woodblock engraving whose hatching follows the form.', mono: true },
    { n: 'Stipple',      c: '#e8e0d2', d: 'Copperplate stippling — tone built from thousands of dots curving over the surface.', mono: true },
    { n: 'Lattice',      c: '#4ff0ff', d: 'A wireframe lattice over the scene, with a band scanning through depth.', mono: true },
    { n: 'Datamosh',     c: '#ff7ad9', d: 'Codec smear: motion vectors drag one part of the scene through another.', mono: true },
    { n: 'Aerial',       c: '#8fb4e0', d: 'Real atmospheric scattering — distance goes blue and hazy, the way mountains do.', mono: true },
    { n: 'Godlight',     c: '#ffe9a8', d: 'Volumetric shafts of light pouring out of the bright parts of the scene.', mono: true },
    { n: 'Hologram',     c: '#5ce9ff', d: 'A projected hologram, with scanlines, chromatic fringes and glitches.', mono: true },
    { n: 'Papercut',     c: '#ffc2a8', d: 'Layered paper cut-outs — one plate per depth band, casting shadows on each other.', mono: true },
    { n: 'Riso',         c: '#ff479b', d: 'Risograph printing: misregistered spot-colour plates on rough paper.', mono: true },
    { n: 'Vertigo',      c: '#a8ffd0', d: 'The dolly zoom — the room rushes in while the subject stays exactly where it is.', mono: true }
  ];
  window.ZPTH_MODES = MODES;

  /* ------------------------------------------------------------------ shaders */
  var VERT = [
    'attribute vec2 aPos;',
    'varying vec2 vUv;',
    'void main(){ vUv = aPos*0.5+0.5; gl_Position = vec4(aPos,0.0,1.0); }'
  ].join('\n');

  var FRAG = [
    'precision highp float;',
    'varying vec2 vUv;',
    'uniform vec2      uRes;',
    'uniform float     uT;',
    'uniform int       uA;',
    'uniform int       uB;',
    'uniform float     uMix;',
    'uniform vec3      uCam;',   /* slow drift: xy pan, z zoom */
    'uniform sampler2D uPhoto;', /* what the colour camera sees */
    'uniform sampler2D uDepth;', /* 0 = nearest, 1 = farthest  */
    '#define PI 3.14159265',

    'float hash21(vec2 p){ p=fract(p*vec2(123.34,456.21)); p+=dot(p,p+45.32); return fract(p.x*p.y); }',
    'float vnoise(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);',
    '  return mix(mix(hash21(i),hash21(i+vec2(1.0,0.0)),f.x), mix(hash21(i+vec2(0.0,1.0)),hash21(i+vec2(1.0,1.0)),f.x), f.y); }',
    'float fbm(vec2 p){ float s=0.0,a=0.5; for(int i=0;i<4;i++){ s+=a*vnoise(p); p*=2.07; a*=0.5; } return s; }',
    'float sdBox(vec2 p, vec2 b, float r){ vec2 q=abs(p)-b+r; return min(max(q.x,q.y),0.0)+length(max(q,0.0))-r; }',
    'float aaw(float v){',
    '#ifdef HAS_DERIV',
    '  return max(fwidth(v),1e-5);',
    '#else',
    '  return 0.006;',
    '#endif',
    '}',

    /* ---- the scene: a real photograph plus a Core ML monocular depth map ---- */
    'vec2 tx(vec2 uv){ return clamp((uv-0.5)*uCam.z + 0.5 + uCam.xy, 0.0008, 0.9992); }',
    'void scene(vec2 uv, float detail, out float dep, out vec3 alb){',
    '  vec2 q = tx(uv);',
    '  dep = texture2D(uDepth, q).r;',
    '  alb = texture2D(uPhoto, q).rgb;',
    '}',
    'float depthAt(vec2 uv){ return texture2D(uDepth, tx(uv)).r; }',
    'vec3  albAt(vec2 uv){ return texture2D(uPhoto, tx(uv)).rgb; }',
    'vec3 getNormal(vec2 uv){',
    '  vec2 e = 1.7/uRes;',
    '  float l=depthAt(uv-vec2(e.x,0.0)), r=depthAt(uv+vec2(e.x,0.0));',
    '  float b=depthAt(uv-vec2(0.0,e.y)), u=depthAt(uv+vec2(0.0,e.y));',
    '  return normalize(vec3(-(r-l)*26.0, -(u-b)*26.0, 1.0));',
    '}',
    /* ---- Wave-9 depth base, ported from mdDepthBase + mdBasePalette ----------
       The mono modes ship depth-driven: they render the depth field itself, lit by
       the virtual sun, with the camera contributing nothing until Scene Mix is
       raised. Defaults from AppSettings: ambient 0.30, edge 0.55, sun 135deg/45deg. */
    'vec3 mdPalette(int pal, float t){',
    '  vec3 a,b,c;',
    '  if(pal==0){      a=vec3(0.04,0.07,0.18); b=vec3(0.18,0.46,0.72); c=vec3(0.90,0.96,1.00); }',
    '  else if(pal==1){ a=vec3(0.10,0.02,0.03); b=vec3(0.78,0.22,0.08); c=vec3(1.00,0.88,0.62); }',
    '  else if(pal==2){ a=vec3(0.02,0.10,0.09); b=vec3(0.10,0.55,0.42); c=vec3(0.82,1.00,0.88); }',
    '  else if(pal==3){ a=vec3(0.12,0.07,0.02); b=vec3(0.75,0.48,0.10); c=vec3(1.00,0.94,0.78); }',
    '  else if(pal==4){ a=vec3(0.08,0.02,0.14); b=vec3(0.58,0.16,0.72); c=vec3(0.95,0.82,1.00); }',
    '  else if(pal==5){ a=vec3(0.09,0.05,0.04); b=vec3(0.72,0.38,0.22); c=vec3(1.00,0.86,0.74); }',
    '  else if(pal==7){ a=vec3(0.02,0.09,0.12); b=vec3(0.10,0.68,0.75); c=vec3(0.88,1.00,1.00); }',
    '  else if(pal==8){ a=vec3(0.12,0.03,0.09); b=vec3(0.80,0.24,0.46); c=vec3(1.00,0.88,0.90); }',
    '  else {           a=vec3(0.03);           b=vec3(0.45);           c=vec3(1.00); }',
    '  return (t<0.5) ? mix(a,b,t*2.0) : mix(b,c,(t-0.5)*2.0);',
    '}',
    'float edgeAt(vec2 uv){',
    '  vec2 e = 2.0/uRes;',
    '  float gx = depthAt(uv+vec2(e.x,0.0))-depthAt(uv-vec2(e.x,0.0));',
    '  float gy = depthAt(uv+vec2(0.0,e.y))-depthAt(uv-vec2(0.0,e.y));',
    '  return clamp(length(vec2(gx,gy))*16.0, 0.0, 1.0);',
    '}',
    'vec3 monoBase(vec2 uv, int pal){',
    '  float prox = 1.0 - depthAt(uv);',
    '  vec3 n = getNormal(uv);',
    '  vec3 L = normalize(vec3(-0.5, 0.5, 0.7071));',   /* sun az 135, el 45 */
    '  float shade = clamp(dot(n,L),0.0,1.0);',
    '  vec3 c = mdPalette(pal, prox);',
    '  c *= 0.30 + 0.70*(0.25+0.75*shade);',
    '  c *= 1.0 - clamp(edgeAt(uv)*0.55, 0.0, 1.0);',
    '  return c;',
    '}',
    'float monoLuma(vec2 uv, int pal){ return dot(monoBase(uv,pal), vec3(0.299,0.587,0.114)); }',

    'vec3 turbo(float x){ x=clamp(x,0.0,1.0); float x2=x*x,x3=x2*x,x4=x3*x,x5=x4*x;',
    '  return clamp(vec3(',
    '    0.13572+4.61539*x-42.66032*x2+132.13108*x3-152.94239*x4+59.28638*x5,',
    '    0.09140+2.19419*x+ 4.84297*x2- 14.18503*x3+  4.27730*x4+ 2.82957*x5,',
    '    0.10667+12.64195*x-60.58205*x2+110.36277*x3- 89.90311*x4+27.34825*x5),0.0,1.0); }',
    'vec3 spectral(float x){ return 0.5+0.5*cos(6.28318*(x*0.92+vec3(0.00,0.33,0.67))); }',
    'float luma(vec3 c){ return dot(c, vec3(0.299,0.587,0.114)); }',
    'float bayer8(vec2 v){',
    '  vec2 p = floor(mod(v,8.0));',
    '  float b = 0.0, f = 1.0;',
    '  for(int i=0;i<3;i++){',
    '    vec2 q = mod(p,2.0);',
    '    b += f*(q.x + 2.0*mod(q.x+q.y,2.0));',
    '    f *= 4.0; p = floor(p*0.5);',
    '  }',
    '  return b/64.0;',
    '}',

    /* ------------------------------------------------------------- the 30 modes */
    'vec3 shade(int m, vec2 uv, float d, vec3 alb, vec3 n){',
    '  float t  = uT;',
    '  vec2  p  = vec2((uv.x-0.5)*0.75, uv.y-0.5);',
    '  float nd = 1.0-d;',
    '  vec3  c  = vec3(0.0);',

    '  if(m==0){',                                   /* Environment */
    '    c = mix(vec3(0.58,0.99,0.90), vec3(0.02,0.06,0.24), smoothstep(0.04,0.96,d));',
    '    c *= 0.86+0.26*n.z;',
    '  } else if(m==1){',                            /* Face */
    '    float w = smoothstep(0.66,0.30,d);',
    '    vec3 L = normalize(vec3(-0.45,0.55,0.72));',
    '    float lam = clamp(dot(n,L),0.0,1.0);',
    '    float rim = pow(1.0-clamp(n.z,0.0,1.0),2.2);',
    '    c = (vec3(0.90,0.85,0.82)*(0.14+0.95*lam) + vec3(0.32,0.56,0.95)*rim*0.55)*w;',
    '  } else if(m==2){',                            /* Raw */
    '    float row = floor(uv.y*140.0);',
    '    float j = (hash21(vec2(row,floor(t*7.0)))-0.5)*0.10*step(0.90,hash21(vec2(row,floor(t*2.3))));',
    '    float band = fract(d*26.0 + j);',
    '    c = mix(vec3(0.20,0.27,0.62), vec3(0.76,0.84,1.0), band);',
    '    c *= 0.72+0.28*sin(uv.y*uRes.y*1.7);',
    '    c *= 0.55+0.75*(1.0-smoothstep(0.35,1.0,d));',
    '  } else if(m==3){',                            /* Plasma */
    '    vec2 w = p*3.4 + vec2(fbm(p*3.0+t*0.15), fbm(p*3.0-t*0.12))*1.8;',
    '    float f = fbm(w + vec2(0.0,t*0.20));',
    '    float fil = pow(1.0-abs(f*2.0-1.0), 3.5);',
    '    c = mix(vec3(0.05,0.01,0.14), vec3(0.95,0.25,0.85), fil);',
    '    c += vec3(0.15,0.75,0.95)*pow(fil,2.5)*(0.4+nd);',
    '    c *= 0.35+1.15*nd;',
    '  } else if(m==4){',                            /* Organic */
    '    float r = length(p-vec2(0.0,-0.05));',
    '    float v = fbm(p*8.0 - r*7.0 + t*0.30);',
    '    float cell = smoothstep(0.42,0.50,v) - smoothstep(0.56,0.66,v);',
    '    c = mix(vec3(0.04,0.13,0.08), vec3(0.34,0.96,0.42), cell);',
    '    c += vec3(0.98,0.85,0.25)*smoothstep(0.66,0.78,v)*0.85;',
    '    c *= 0.55+0.85*nd;',
    '    c += vec3(0.02,0.10,0.06)*nd;',
    '  } else if(m==5){',                            /* Data */
    '    vec2 g = vec2(30.0,40.0);',
    '    vec2 cid = floor(uv*g), f = fract(uv*g);',
    '    float dv = depthAt((cid+0.5)/g);',
    '    vec2 dot5 = floor(f*vec2(3.0,5.0));',
    '    float on = step(0.42, hash21(cid*0.37 + dot5*7.1 + floor(dv*99.0)));',
    '    on *= step(0.06,f.x)*step(f.x,0.94)*step(0.06,f.y)*step(f.y,0.94);',
    '    c = mix(vec3(0.05,0.03,0.12), vec3(0.30,1.0,0.45), on);',
    '    c *= 0.30+1.3*(1.0-dv);',
    '  } else if(m==6){',                            /* Contour */
    '    c = spectral(d);',
    '    float iso = fract(d*30.0);',
    '    float line = 1.0-smoothstep(0.0, aaw(d*30.0)*1.8, min(iso,1.0-iso));',
    '    float maj = fract(d*6.0);',
    '    float mline = 1.0-smoothstep(0.0, aaw(d*6.0)*1.8, min(maj,1.0-maj));',
    '    c = mix(c, vec3(0.0), max(line*0.82, mline));',
    '  } else if(m==7){',                            /* Hillshade */
    '    vec3 L = normalize(vec3(cos(2.356), sin(2.356), 0.70));',
    '    float lam = clamp(dot(n,L),0.0,1.0);',
    '    vec3 tint = mix(vec3(0.24,0.42,0.20), vec3(0.72,0.60,0.40), smoothstep(0.25,0.70,d));',
    '    tint = mix(tint, vec3(0.96,0.96,0.94), smoothstep(0.78,0.98,d));',
    '    c = tint*(0.16+1.25*lam) + vec3(1.0)*pow(lam,18.0)*0.20;',
    '  } else if(m==8){',                            /* Chrome */
    '    vec2 r = n.xy*0.5+0.5;',
    '    float env = 0.5+0.5*sin(r.y*14.0+1.2) * (0.5+0.5*cos(r.x*11.0));',
    '    float spec = pow(clamp(dot(n, normalize(vec3(-0.4,0.7,0.6))),0.0,1.0), 42.0);',
    '    vec3 metal = mix(vec3(0.62,0.66,0.74), vec3(1.0,0.80,0.35), smoothstep(0.35,0.85,d));',
    '    c = metal*(0.18+0.95*env) + vec3(1.0)*spec*1.4;',
    '  } else if(m==9){',                            /* Oil Slick */
    '    float ph = d*54.0 + (1.0-clamp(n.z,0.0,1.0))*7.0;',
    '    c = 0.5+0.5*cos(ph + vec3(0.0,2.09,4.19));',
    '    c = mix(c, c*c*1.4, 0.45);',
    '    c *= 0.72+0.42*clamp(n.z,0.0,1.0);',
    '  } else if(m==10){',                           /* Pulsar (Rutt-Etra) */
    '    float lines = 52.0;',
    '    float row = floor(uv.y*lines);',
    '    float base = (row+0.5)/lines;',
    '    float dd = depthAt(vec2(uv.x, base));',
    '    float amp = (1.0-dd)*0.085*(0.75+0.35*sin(t*1.6+row*0.20));',
    '    float y = base + amp;',
    '    float dist = abs(uv.y - y);',
    '    float g = exp(-dist*dist*7000.0);',
    '    c = mix(vec3(0.10,0.85,1.0), vec3(1.0,0.25,0.75), 1.0-dd)*g*1.6;',
    '    c += vec3(0.05,0.20,0.35)*exp(-dist*dist*400.0);',
    '  } else if(m==11){',                           /* Sonar */
    '    vec2 o = p - vec2(0.0,-0.46);',
    '    float ang = atan(o.x,o.y);',
    '    float sweep = fract((ang/PI)*0.5 + 0.5 - t*0.22);',
    '    float beam = pow(1.0-sweep, 8.0);',
    '    float ring = smoothstep(0.86,1.0,sin(d*40.0 - t*2.4));',
    '    c = vec3(0.10,1.0,0.55)*(ring*0.75 + beam*1.15)*(0.35+0.95*nd);',
    '    c += vec3(0.03,0.20,0.10)*(0.40+0.80*nd);',
    '  } else if(m==12){',                           /* Pin Screen */
    '    vec2 g = vec2(44.0,59.0);',
    '    vec2 cid = floor(uv*g);',
    '    vec2 f = fract(uv*g)-0.5;',
    '    float dv = depthAt((cid+0.5)/g);',
    '    float rad = 0.14+0.34*(1.0-dv);',
    '    float pin = 1.0-smoothstep(rad-0.10, rad, length(f));',
    '    float lit = 0.30+0.90*(1.0-dv);',
    '    c = mix(vec3(0.0,0.01,0.03), vec3(0.42,0.76,1.0)*lit, pin);',
    '  } else if(m==13){',                           /* Voxel */
    '    vec2 g = vec2(30.0,40.0);',
    '    vec2 cid = floor(uv*g), f = fract(uv*g);',
    '    float dv = floor(depthAt((cid+0.5)/g)*16.0)/16.0;',
    '    c = turbo(1.0-dv);',
    '    float edge = step(f.x,0.045)+step(0.955,f.x)+step(f.y,0.045)+step(0.955,f.y);',
    '    c *= 1.0-0.55*clamp(edge,0.0,1.0);',
    '    c *= 0.75+0.45*(1.0-dv);',
    '  } else if(m==14){',                           /* Facets */
    '    vec2 g = vec2(17.0,23.0);',
    '    vec2 sk = vec2(uv.x*g.x + uv.y*g.y*0.5, uv.y*g.y);',
    '    vec2 cid = floor(sk);',
    '    float tri = step(1.0, fract(sk.x)+fract(sk.y));',
    '    vec2 sc = cid + vec2(0.33+0.34*tri);',
    '    vec2 ctr = vec2((sc.x - sc.y*0.5)/g.x, sc.y/g.y);',
    '    ctr = clamp(ctr, 0.001, 0.999);',
    '    vec3 fn = getNormal(ctr);',
    '    float lam = clamp(dot(fn, normalize(vec3(-0.35,0.55,0.76))),0.0,1.0);',
    '    float dv = depthAt(clamp(ctr,0.001,0.999));',
    '    c = mix(vec3(0.18,0.42,0.58), vec3(0.90,0.97,1.0), lam)*(0.30+0.95*(1.0-dv));',
    '  } else if(m==15){',                           /* Light Trails */
    '    float acc = 0.0; vec3 tc = vec3(0.0);',
    '    for(int i=0;i<10;i++){',
    '      float k = float(i)/9.0;',
    '      vec2 su = uv - vec2(k*0.16, 0.0) + vec2(0.0, sin(t*0.7+k*3.0)*0.010);',
    '      float sd = depthAt(clamp(su,0.001,0.999));',
    '      float w = (1.0-k)*(1.0-k)*(1.0-sd);',
    '      tc += mix(vec3(1.0,0.42,0.08), vec3(1.0,0.92,0.45), k)*w;',
    '      acc += w;',
    '    }',
    '    c = tc/max(acc,0.001)*clamp(acc*0.42,0.0,1.6);',
    '  } else if(m==16){',                           /* Miniature */
    '    float foc = 1.0-smoothstep(0.02,0.34,abs(uv.y-0.42));',
    '    float bl = 1.0-foc;',
    '    vec3 base = alb*(0.55+0.85*(1.0-d));',
    '    vec3 soft = vec3(0.0); ',
    '    for(int i=0;i<6;i++){',
    '      float k=(float(i)-2.5)*bl*0.016;',
    '      float sd; vec3 sa; scene(clamp(uv+vec2(k,k*0.4),0.001,0.999),0.0,sd,sa);',
    '      soft += sa*(0.55+0.85*(1.0-sd));',
    '    }',
    '    soft/=6.0;',
    '    c = mix(base, soft, bl);',
    '    c = clamp((c-0.5)*1.32+0.5, 0.0, 1.0);',
    '    c = mix(vec3(luma(c)), c, 1.55);',
    '  } else if(m==17){',                           /* Iron Filings */
    '    vec2 gr = vec2(depthAt(uv+vec2(0.004,0.0))-depthAt(uv-vec2(0.004,0.0)),',
    '                   depthAt(uv+vec2(0.0,0.004))-depthAt(uv-vec2(0.0,0.004)));',
    '    vec2 dir = normalize(vec2(-gr.y, gr.x) + vec2(0.0011));',
    '    float fl = sin(dot(p, dir)*260.0 + fbm(p*7.0)*9.0 + t*0.5);',
    '    float fib = pow(clamp(abs(fl),0.0,1.0), 5.0);',
    '    c = mix(vec3(0.03,0.03,0.04), vec3(0.78,0.82,0.88), fib*(0.30+1.0*nd));',
    '    c += vec3(0.55,0.62,0.72)*pow(fib,7.0)*0.8;',
    '  } else if(m==18){',                           /* Dither */
    '    float lv = 1.0-d;',
    '    float th = bayer8(uv*uRes/2.6);',
    '    float q = floor(clamp(lv,0.0,0.999)*4.0 + th)/3.0;',
    '    c = mix(vec3(0.93,0.92,0.86), vec3(0.05,0.16,0.09), 1.0-clamp(q,0.0,1.0));',
    '  } else if(m==19){',                           /* Juicy */
    '    float sheen = pow(1.0-clamp(n.z,0.0,1.0), 1.7);',
    '    vec3 velour = mix(vec3(0.34,0.03,0.14), vec3(1.0,0.42,0.72), sheen);',
    '    vec2 g = uv*vec2(90.0,120.0);',
    '    float sp = step(0.985, hash21(floor(g)+floor(t*3.0)*0.31));',
    '    float edge = smoothstep(0.10,0.42,length(vec2(',
    '        depthAt(uv+vec2(0.004,0.0))-depthAt(uv-vec2(0.004,0.0)),',
    '        depthAt(uv+vec2(0.0,0.004))-depthAt(uv-vec2(0.0,0.004))))*22.0);',
    '    c = velour*(0.35+0.95*nd) + vec3(1.0,0.95,1.0)*sp*edge*1.5;',
    '  } else if(m==20){',                           /* Aerochrome */
    '    float veg  = clamp((alb.g - max(alb.r,alb.b))*3.4 + 0.06, 0.0, 1.0);',
    '    float skin = clamp((alb.r - alb.b)*2.4, 0.0, 1.0);',
    '    vec3 far = vec3(0.28,0.70,0.86)*(0.30+luma(alb)*1.30);',
    '    vec3 hot = mix(vec3(1.0,0.16,0.62), vec3(1.0,0.55,0.42), skin*0.45);',
    '    c = mix(far, hot, clamp(veg*1.5 + skin*0.60, 0.0, 1.0));',
    '    c *= 0.60+0.70*nd;',
    '  } else if(m==21){',                           /* Heat Ghost */
    '    vec2 gr = vec2(depthAt(uv+vec2(0.004,0.0))-depthAt(uv-vec2(0.004,0.0)),',
    '                   depthAt(uv+vec2(0.0,0.004))-depthAt(uv-vec2(0.0,0.004)));',
    '    float knife = clamp(gr.x*46.0+0.5, 0.0, 1.0);',
    '    float mag = clamp(length(gr)*40.0,0.0,1.0);',
    '    c = mix(vec3(0.05,0.09,0.22), vec3(0.98,0.96,0.90), knife);',
    '    c = mix(c, vec3(1.0,0.42,0.10), mag*0.85);',
    '    c *= 0.55+0.7*nd;',
    '  } else if(m==22){',                           /* Solarise */
    '    vec3 base = turbo(nd);',
    '    float L = luma(base);',
    '    float fold = 1.0-abs(L*2.0-1.0);',
    '    c = mix(base, vec3(0.85,0.88,1.0)*fold, 0.62);',
    '    c = mix(c, vec3(1.0)-c, smoothstep(0.52,0.58,L));',
    '    float iso = fract(d*22.0);',
    '    c += vec3(1.0,0.95,0.85)*(1.0-smoothstep(0.0, aaw(d*22.0)*2.2, min(iso,1.0-iso)))*0.9;',
    '  } else if(m==23){',                           /* Cymatic */
    '    float a = 3.0+floor(nd*5.0), b = 2.0+floor(d*4.0);',
    '    vec2 s = uv*vec2(1.0,1.0);',
    '    float f = sin(a*PI*s.x)*sin(b*PI*s.y) - sin(b*PI*s.x)*sin(a*PI*s.y);',
    '    f *= sin(t*0.8)*0.35+0.85;',
    '    float sand = 1.0-smoothstep(0.0, 0.09, abs(f));',
    '    c = mix(vec3(0.05,0.05,0.07), vec3(0.97,0.90,0.68), sand);',
    '    c += vec3(0.25,0.20,0.10)*(1.0-abs(f))*0.35;',
    '  } else if(m==24){',                           /* Aquarelle */
    '    float wash = floor(nd*6.0+0.35*fbm(p*9.0))/6.0;',
    '    vec3 pig = mix(vec3(0.16,0.30,0.62), vec3(0.92,0.62,0.30), wash);',
    '    pig = mix(pig, alb*1.5, 0.35);',
    '    float grain = 0.86+0.24*fbm(uv*vec2(170.0,220.0));',
    '    float pool = smoothstep(0.03,0.0,abs(fract(nd*6.0)-0.5)-0.44);',
    '    c = mix(vec3(0.96,0.95,0.91), pig, 0.55+0.30*wash)*grain;',
    '    c *= 1.0-pool*0.32;',
    '  } else if(m==25){',                           /* Tessera */
    '    vec2 g = vec2(26.0,35.0);',
    '    vec2 warp = uv + vec2(0.0, 0.045*sin(d*22.0));',
    '    vec2 cid = floor(warp*g), f = fract(warp*g)-0.5;',
    '    float dv = depthAt(clamp((cid+0.5)/g,0.001,0.999));',
    '    vec3 stone = mix(vec3(0.72,0.42,0.24), vec3(0.90,0.86,0.74), hash21(cid)*0.55+0.30*(1.0-dv));',
    '    stone = mix(stone, vec3(0.20,0.34,0.46), step(0.62,dv)*0.65);',
    '    float grout = 1.0-smoothstep(0.36,0.46,max(abs(f.x),abs(f.y)));',
    '    c = mix(vec3(0.10,0.09,0.08), stone*(0.80+0.30*hash21(cid+7.0)), grout);',
    '  } else if(m==26){',                           /* Chemigram */
    '    float vivid = max(max(alb.r,alb.g),alb.b) - min(min(alb.r,alb.g),alb.b);',
    '    float tide = fbm(p*5.0 + t*0.10)*1.2 + nd*0.55;',
    '    float eaten = smoothstep(tide-0.05, tide+0.05, 0.55+vivid*2.2);',
    '    vec3 dev = mix(vec3(0.10,0.07,0.05), vec3(0.55,0.34,0.12), fbm(p*13.0));',
    '    c = mix(dev, alb*1.9+vec3(0.10,0.05,0.0), eaten);',
    '    c += vec3(0.95,0.75,0.30)*pow(1.0-abs(eaten*2.0-1.0),7.0)*0.55;',
    '  } else if(m==27){',                           /* Ripplefield */
    '    float r1 = length(p-vec2(-0.16,-0.14)), r2 = length(p-vec2(0.20,0.06));',
    '    float w = sin(r1*66.0-t*3.0)*exp(-r1*3.0) + sin(r2*54.0-t*2.2)*exp(-r2*3.2);',
    '    vec2 off = vec2(w)*0.012;',
    '    float sd = depthAt(clamp(uv+off,0.001,0.999));',
    '    c = mix(vec3(0.86,0.97,1.0), vec3(0.02,0.16,0.42), smoothstep(0.05,0.95,sd));',
    '    c += vec3(0.55,0.85,1.0)*clamp(w,0.0,1.0)*0.42;',
    '    c *= 0.85+0.30*clamp(-w,0.0,1.0);',
    '  } else if(m==28){',                           /* Ferrofluid */
    '    vec2 g = vec2(27.0,36.0);',
    '    vec2 sk = vec2(uv.x*g.x + step(1.0,mod(floor(uv.y*g.y),2.0))*0.5, uv.y*g.y);',
    '    vec2 cid = floor(sk); vec2 f = fract(sk)-0.5;',
    '    float dv = depthAt(clamp((cid+0.5)/g,0.001,0.999));',
    '    float rad = 0.26+0.24*(1.0-dv);',
    '    float s = length(f);',
    '    float bead = 1.0-smoothstep(rad-0.07, rad, s);',
    '    vec3 nb = normalize(vec3(f, sqrt(max(0.0,rad*rad-s*s))+0.02));',
    '    float spec = pow(clamp(dot(nb, normalize(vec3(-0.5,0.6,0.62))),0.0,1.0), 16.0);',
    '    float rim = pow(clamp(s/rad,0.0,1.0), 2.4);',
    '    c = mix(vec3(0.015,0.015,0.022),',
    '            vec3(0.10,0.10,0.13)+vec3(1.0)*spec*2.2+vec3(0.30,0.38,0.52)*rim*1.1, bead);',
    '    c += vec3(0.05,0.06,0.10)*bead*(1.0-dv);',
    '  } else if(m==29){',                           /* Lichtenberg */
    '    vec2 gr = vec2(depthAt(uv+vec2(0.004,0.0))-depthAt(uv-vec2(0.004,0.0)),',
    '                   depthAt(uv+vec2(0.0,0.004))-depthAt(uv-vec2(0.0,0.004)));',
    '    vec2 fl = p*6.0 + normalize(gr+vec2(0.0013))*1.6;',
    '    float v = fbm(fl + vec2(0.0, t*0.12));',
    '    float branch = pow(1.0-abs(v*2.0-1.0), 16.0);',
    '    float v2 = fbm(fl*2.4 - vec2(t*0.08,0.0));',
    '    branch += pow(1.0-abs(v2*2.0-1.0), 22.0)*0.7;',
    '    c = vec3(0.02,0.01,0.05) + mix(vec3(0.45,0.20,0.95), vec3(0.90,0.85,1.0), branch)*branch*1.7;',
    '    c *= 0.35+1.1*nd;',

    /* ── Wave 9: monocular-depth modes ─────────────────────────────────── */
    '  } else if(m==30){',                           /* Parallax  · Ice   */
    '    vec2 sw = vec2(sin(t*0.85), cos(t*0.62)*0.55)*0.055;',
    '    vec2 su = uv + sw*nd;',
    '    su = (su-0.5)/1.06 + 0.5;',
    '    c = monoBase(clamp(su,0.002,0.998), 0)*1.06;',
    '    c *= 1.0-0.5*dot(uv-0.5,uv-0.5)*2.2;',
    '  } else if(m==31){',                           /* Anaglyph  · Mono  */
    '    float disp = (d-0.5)*0.035;',
    '    vec3 L = monoBase(clamp(uv-vec2(disp,0.0),0.002,0.998), 6);',
    '    vec3 R = monoBase(clamp(uv+vec2(disp,0.0),0.002,0.998), 6);',
    '    c = vec3(dot(L,vec3(0.45,0.50,0.18)), R.g*0.95, R.b*1.05);',
    '  } else if(m==32){',                           /* Aperture  · Amber */
    '    float coc = clamp(abs(d-0.42)*3.4,0.0,1.0);',
    '    vec3 acc = vec3(0.0); float wsum = 0.0;',
    '    for(int i=0;i<12;i++){',
    '      float a = float(i)*2.39996;',
    '      float rr = sqrt(float(i)/12.0)*coc*0.030;',
    '      vec2 o = vec2(cos(a)*rr, sin(a)*rr*1.35);',
    '      vec3 sm = monoBase(clamp(uv+o,0.002,0.998), 3);',
    '      float w = 1.0 + pow(max(max(sm.r,sm.g),sm.b),4.0)*3.0;',
    '      acc += sm*w; wsum += w;',
    '    }',
    '    c = acc/max(wsum,0.001);',
    '    c += vec3(1.0,0.92,0.55)*smoothstep(0.14,0.02,coc)*0.06;',
    '  } else if(m==33){',                           /* Nebula    · Violet */
    '    float band = exp(-pow((d-0.55)*2.4,2.0));',
    '    vec2 w = p*3.2 + vec2(t*0.06, -t*0.04);',
    '    float f = fbm(w + fbm(w*1.8)*0.7);',
    '    float cloud = smoothstep(0.40,0.78,f)*band;',
    '    float sh = smoothstep(0.30,0.85,fbm(w*1.6+vec2(0.25,0.30)));',
    '    vec3 lit = mix(vec3(0.10,0.06,0.22), vec3(1.0,0.90,0.95), sh);',
    '    c = mix(monoBase(uv,4)*0.85, lit, clamp(cloud*1.5,0.0,1.0));',
    '  } else if(m==34){',                           /* Motes     · Ember */
    '    c = monoBase(uv,1)*0.42;',
    '    for(int L=0;L<3;L++){',
    '      float fl = float(L);',
    '      float sc = 26.0 + fl*16.0;',
    '      vec2 dr = vec2(0.03,-0.10)*t*(0.5+fl*0.35);',
    '      vec2 g = uv*vec2(sc*0.75,sc) + dr;',
    '      vec2 cid = floor(g), fr = fract(g)-0.5;',
    '      vec2 jit = (vec2(hash21(cid+fl), hash21(cid+fl+7.3))-0.5)*0.7;',
    '      float r = length(fr-jit);',
    '      float dv = depthAt(uv);',
    '      float rad = 0.055+0.10*hash21(cid+fl*3.1);',
    '      float blur = 0.02+0.13*abs(dv-0.45);',
    '      float m0 = smoothstep(rad+blur, rad-blur*0.4, r);',
    '      float tw = 0.55+0.45*sin(t*2.4+hash21(cid+fl)*20.0);',
    '      c += mix(vec3(1.0,0.90,0.70), vec3(1.0,0.72,0.45), hash21(cid+fl+2.0))*m0*tw*0.6;',
    '    }',
    '  } else if(m==35){',                           /* Woodblock · Mono  */
    '    float tone = 1.0-clamp(monoLuma(uv,6)*1.55, 0.0, 1.0);',
    '    float ang = 0.5236 + (1.0-clamp(n.z,0.0,1.0))*1.1;',
    '    vec2 rp = vec2(p.x*cos(ang)-p.y*sin(ang), p.x*sin(ang)+p.y*cos(ang));',
    '    float lines = 0.5+0.5*sin(rp.y*190.0);',
    '    float ink = step(lines, tone*0.95);',
    '    float sil = smoothstep(0.25,0.75,edgeAt(uv));',
    '    c = mix(vec3(0.94,0.91,0.84), vec3(0.08,0.06,0.05), max(ink, sil));',
    '    c *= 0.92+0.16*fbm(uv*vec2(160.0,200.0));',
    '  } else if(m==36){',                           /* Stipple   · Mono  */
    '    float tone = 1.0-clamp(monoLuma(uv,6)*1.75, 0.0, 1.0);',
    '    tone = pow(clamp(tone,0.0,1.0), 1.25);',
    '    vec2 g = uv*vec2(41.0,55.0);',
    '    vec2 cid = floor(g), fr = fract(g)-0.5;',
    '    vec2 jit = (vec2(hash21(cid), hash21(cid+3.7))-0.5)*0.75;',
    '    float r = length((fr-jit)*vec2(1.0,1.0-0.25*n.y));',
    '    float rad = 0.46*sqrt(clamp(tone,0.0,1.0));',
    '    float dot0 = smoothstep(rad+0.06, rad-0.06, r);',
    '    c = mix(vec3(0.95,0.93,0.87), vec3(0.07,0.06,0.06), dot0);',
    '    c *= 0.93+0.14*fbm(uv*vec2(180.0,220.0));',
    '  } else if(m==37){',                           /* Lattice   · Cyan  */
    '    float cell = 34.0;',
    '    vec2 g = uv*uRes/cell;',
    '    vec2 fr = abs(fract(g)-0.5);',
    '    float line = 1.0-smoothstep(0.0,0.10,min(fr.x,fr.y));',
    '    float node = 1.0-smoothstep(0.0,0.22,length(fr));',
    '    float scan = fract(t*0.25);',
    '    float band = exp(-pow((d-scan)/0.10,2.0));',
    '    vec3 wire = mix(vec3(0.15,0.55,0.75), vec3(0.35,1.0,1.0), band);',
    '    c = monoBase(uv,7)*0.30 + wire*(line*0.9 + node*1.3)*(0.35+1.1*band);',
    '  } else if(m==38){',                           /* Datamosh  · Rose  */
    '    vec2 blk = floor(uv*uRes/16.0);',
    '    float dv = depthAt((blk*16.0+8.0)/uRes);',
    '    vec2 mv = (vec2(hash21(blk*0.31), hash21(blk*0.77+5.1))-0.5);',
    '    vec2 su = uv + mv*0.09*dv*(0.6+0.4*sin(t*0.7));',
    '    vec3 sm = monoBase(clamp(su,0.002,0.998), 8);',
    '    sm = floor(sm*7.0)/7.0;',
    '    vec3 s2 = monoBase(clamp(su+mv*0.03,0.002,0.998), 8);',
    '    c = vec3(sm.r, mix(sm.g,s2.g,0.55), s2.b);',
    '  } else if(m==39){',                           /* Aerial    · Ice   */
    '    vec3 a2 = monoBase(uv,0);',
    '    float ex = 1.0-exp(-d*d*1.7);',
    '    vec3 sky = vec3(0.52,0.66,0.85);',
    '    vec3 sun = vec3(1.0,0.88,0.70);',
    '    float sd = smoothstep(0.55,0.0,length(p-vec2(0.16,0.30)));',
    '    vec3 air = mix(sky, sun, sd*0.65);',
    '    vec3 des = mix(vec3(luma(a2)), a2, 1.0-0.6*ex);',
    '    c = mix(des, air, ex*0.72);',
    '    c = mix(vec3(0.45,0.52,0.62), c, 1.0-0.30*ex);',
    '  } else if(m==40){',                           /* Godlight  · Amber */
    '    vec2 src = vec2(0.30,0.86);',
    '    vec3 a2 = monoBase(uv,3);',
    '    vec2 dir = (uv-src)/26.0;',
    '    vec2 su = uv; float dec = 1.0; float sum = 0.0;',
    '    for(int i=0;i<26;i++){',
    '      su -= dir;',
    '      float lum = monoLuma(clamp(su,0.002,0.998), 3);',
    '      sum += smoothstep(0.62,0.95,lum)*step(0.55,depthAt(su))*dec;',
    '      dec *= 0.94;',
    '    }',
    '    c = a2*0.42 + vec3(1.0,0.90,0.66)*sum*0.10;',
    '  } else if(m==41){',                           /* Hologram  · Cyan  */
    '    float lum = monoLuma(uv,7);',
    '    float ph = uv.y*130.0 + d*22.0 - t*1.4;',
    '    float scan = 0.55+0.45*sin(ph*6.28318);',
    '    float rim = pow(1.0-clamp(n.z,0.0,1.0),1.8);',
    '    float gl = step(0.985, hash21(vec2(floor(uv.y*50.0), floor(t*6.0))));',
    '    vec3 tint = mix(vec3(0.15,0.45,0.95), vec3(0.25,0.92,1.0), 1.0-d);',
    '    c = tint*(0.18+1.15*lum)*scan + tint*rim*1.2;',
    '    c += vec3(0.4,0.9,1.0)*gl*0.35;',
    '    c *= 0.35+1.0*smoothstep(0.95,0.30,d);',
    '  } else if(m==42){',                           /* Papercut  · Mono base, Matisse plates */
    '    float plate = floor(clamp(d,0.0,0.999)*5.0);',
    '    float pn = plate/4.0;',
    '    float dv2 = depthAt(uv+vec2(0.012,0.016));',
    '    float below = floor(clamp(dv2,0.0,0.999)*5.0);',
    '    float shade = (below < plate-0.5) ? 0.55 : 1.0;',
    '    vec3 pal = mix(vec3(1.00,0.82,0.68), vec3(0.30,0.42,0.62), pn);',
    '    pal = mix(pal, vec3(0.98,0.94,0.88), pow(1.0-pn,3.0)*0.35);',
    '    float deck = 0.5+0.5*fbm(uv*vec2(90.0,110.0));',
    '    c = pal*shade*(0.90+0.16*deck);',
    '  } else if(m==43){',                           /* Riso      · Mono base, 3 inks */
    '    float tone = clamp(1.0 - monoLuma(uv,6)*1.45, 0.0, 1.0);',
    '    vec3 i0 = vec3(1.00,0.28,0.60), i1 = vec3(0.00,0.47,0.80), i2 = vec3(1.00,0.90,0.10);',
    '    c = vec3(0.96,0.94,0.88);',
    '    for(int k=0;k<3;k++){',
    '      float fk = float(k);',
    '      float ang = 0.4+fk*0.7;',
    '      vec2 off = vec2(cos(ang),sin(ang))*0.006*(1.0+fk);',
    '      vec2 q2 = (uv+off)*vec2(0.75,1.0)*110.0;',
    '      vec2 rq = vec2(q2.x*cos(ang)-q2.y*sin(ang), q2.x*sin(ang)+q2.y*cos(ang));',
    '      float cov = clamp((tone - fk*0.26)*1.9, 0.0, 1.0);',
    '      float halftone = step(length(fract(rq)-0.5), sqrt(cov)*0.62);',
    '      vec3 ink = (k==0)? i0 : ((k==1)? i1 : i2);',
    '      c = mix(c, c*ink, halftone*0.92);',
    '    }',
    '    c *= 0.94+0.12*fbm(uv*vec2(150.0,190.0));',
    '  } else {',                                    /* Vertigo   · Copper */
    '    float z = 1.0 + 0.55*sin(t*0.55);',
    '    vec2 su = (uv-0.5)/mix(1.0, z, smoothstep(0.15,0.95,d)) + 0.5;',
    '    c = monoBase(clamp(su,0.002,0.998), 5);',
    '    c *= 1.0-0.35*dot(uv-0.5,uv-0.5)*2.2;',
    '  }',
    '  return c;',
    '}',

    'void main(){',
    '  vec2 uv = vUv;',
    '  float d; vec3 alb; scene(uv,1.0,d,alb);',
    '  vec3 n = getNormal(uv);',
    '  vec3 c = shade(uA, uv, d, alb, n);',
    '  if(uMix > 0.001) c = mix(c, shade(uB, uv, d, alb, n), uMix);',
    /* a touch of sensor grain + vignette so it reads like a live camera feed */
    '  c += (hash21(uv*uRes + fract(uT)*97.0)-0.5)*0.030;',
    '  float vig = 1.0-0.30*dot(uv-0.5,uv-0.5)*2.4;',
    '  gl_FragColor = vec4(clamp(c*vig,0.0,1.0),1.0);',
    '}'
  ].join('\n');

  /* ------------------------------------------------------------------- engine */
  function Engine(canvas) {
    this.canvas = canvas;
    this.ok = false;
    this.mode = 6;          // Contour opens the page
    this.prev = 6;
    this.mix = 0;
    this.running = false;
    this.t0 = 0;
    this.clock = 0;
    this.reduced = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this._init();
  }

  Engine.prototype._init = function () {
    var opts = { alpha: false, antialias: false, depth: false, stencil: false,
                 powerPreference: 'low-power', preserveDrawingBuffer: false };
    var gl = this.canvas.getContext('webgl', opts) ||
             this.canvas.getContext('experimental-webgl', opts);
    if (!gl) return;
    this.gl = gl;

    var hasDeriv = !!gl.getExtension('OES_standard_derivatives');
    var head = hasDeriv ? '#extension GL_OES_standard_derivatives : enable\n#define HAS_DERIV 1\n' : '';

    var vs = this._compile(gl.VERTEX_SHADER, VERT);
    var fs = this._compile(gl.FRAGMENT_SHADER, head + FRAG);
    if (!vs || !fs) return;

    var pr = gl.createProgram();
    gl.attachShader(pr, vs); gl.attachShader(pr, fs); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) {
      console.warn('ZPTH link failed:', gl.getProgramInfoLog(pr));
      return;
    }
    gl.useProgram(pr);
    this.pr = pr;

    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(pr, 'aPos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    this.u = {
      res:   gl.getUniformLocation(pr, 'uRes'),
      t:     gl.getUniformLocation(pr, 'uT'),
      a:     gl.getUniformLocation(pr, 'uA'),
      b:     gl.getUniformLocation(pr, 'uB'),
      mix:   gl.getUniformLocation(pr, 'uMix'),
      cam:   gl.getUniformLocation(pr, 'uCam'),
      photo: gl.getUniformLocation(pr, 'uPhoto'),
      depth: gl.getUniformLocation(pr, 'uDepth')
    };

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    this.texPhoto = this._texture(0, 'scene.jpg');
    this.texDepth = this._texture(1, 'scene-depth.png');
    gl.uniform1i(this.u.photo, 0);
    gl.uniform1i(this.u.depth, 1);

    this.ok = true;
    this.resize();
  };

  /* one texture per unit, grey placeholder until the file lands */
  Engine.prototype._texture = function (unit, src) {
    var gl = this.gl, self = this;
    var tex = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
                  new Uint8Array([128, 128, 128, 255]));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    this.pending = (this.pending || 0) + 1;
    var img = new Image();
    img.onload = function () {
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      self.pending--;
      if (self.pending === 0) { self.ready = true; self.draw(); }
    };
    img.onerror = function () { self.pending--; };
    img.src = src;
    return tex;
  };

  Engine.prototype._compile = function (type, src) {
    var gl = this.gl, sh = gl.createShader(type);
    gl.shaderSource(sh, src); gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.warn('ZPTH shader error:', gl.getShaderInfoLog(sh));
      return null;
    }
    return sh;
  };

  Engine.prototype.resize = function () {
    if (!this.ok) return;
    var r = this.canvas.getBoundingClientRect();
    if (!r.width) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = Math.max(1, Math.min(Math.round(r.width * dpr), 560));
    var h = Math.round(w * 4 / 3);
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w; this.canvas.height = h;
      this.gl.viewport(0, 0, w, h);
    }
  };

  Engine.prototype.setMode = function (i) {
    if (!this.ok || i === this.mode) return;
    this.prev = this.mode;
    this.mode = i;
    this.mix = 1;                 // wipe from previous mode to the new one
  };

  Engine.prototype.start = function () {
    if (!this.ok || this.running) return;
    this.running = true;
    var self = this, last = 0;
    function frame(ts) {
      if (!self.running) return;
      var dt = last ? Math.min((ts - last) / 1000, 0.05) : 0.016;
      last = ts;
      self.clock += self.reduced ? 0 : dt;
      if (self.mix > 0) self.mix = Math.max(0, self.mix - dt / 0.55);
      self.draw();
      self.raf = requestAnimationFrame(frame);
    }
    this.raf = requestAnimationFrame(frame);
  };

  Engine.prototype.stop = function () {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
  };

  Engine.prototype.draw = function () {
    if (!this.ok) return;
    var gl = this.gl, t = this.clock;
    gl.uniform2f(this.u.res, this.canvas.width, this.canvas.height);
    gl.uniform1f(this.u.t, t);
    gl.uniform1i(this.u.a, this.mode);
    gl.uniform1i(this.u.b, this.prev);
    gl.uniform1f(this.u.mix, this.mix);
    /* a slow hand-held drift, so a still photograph still reads as a live feed */
    gl.uniform3f(this.u.cam,
      Math.sin(t * 0.21) * 0.012,
      Math.cos(t * 0.17) * 0.009,
      0.955 + Math.sin(t * 0.13) * 0.020);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  window.ZPTHEngine = Engine;
})();
