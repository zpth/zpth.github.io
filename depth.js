/* ZPTH — live depth-mode engine.
   Renders a synthetic depth field (head + shoulders in a room) and paints it with
   browser re-creations of the app's 30 real-time modes. Everything runs locally in
   your GPU; the page makes no network requests. */
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
    { n: 'Lichtenberg',  c: '#b47aff', d: 'Glowing lightning branches forking down the depth gradient.' }
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
    'uniform vec2  uRes;',
    'uniform float uT;',
    'uniform int   uA;',
    'uniform int   uB;',
    'uniform float uMix;',
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

    /* ---- the synthetic scene: depth 0 (near) .. 1 (far), plus an RGB albedo ---- */
    'void scene(vec2 uv, float detail, out float dep, out vec3 alb){',
    '  vec2 p = vec2((uv.x-0.5)*0.75, uv.y-0.5);',
    '  float t = uT;',
    '  float d; vec3 a;',
    '  float horiz = -0.02;',
    '  if(p.y > horiz){',
    /* back wall + converging side walls, with a little perspective up the wall */
    '    float sideC = smoothstep(0.10,0.375,abs(p.x));',
    '    float vert  = 1.0 - smoothstep(-0.02,0.48,p.y);',
    '    d = 0.95 - 0.32*sideC - 0.05*vert + detail*0.012*fbm(uv*7.0);',
    '    a = vec3(0.50,0.48,0.45);',
    '    if(sdBox(p-vec2(-0.215,0.24), vec2(0.052,0.215), 0.012) < 0.0){ d = 1.0; a = vec3(0.06,0.06,0.08); }',
    '  } else {',
    '    float k = clamp((horiz-p.y)/0.48, 0.0, 1.0);',
    '    d = mix(0.90, 0.12, k*0.30 + k*k*0.70);',
    '    a = vec3(0.40,0.38,0.35);',
    '  }',
    /* a sofa on the right, sitting on the floor at mid depth */
    '  vec2 qs = p - vec2(0.265,-0.30);',
    '  float sofa = sdBox(qs, vec2(0.115,0.125), 0.045);',
    '  if(sofa < 0.0){ d = 0.62 - 0.15*smoothstep(0.0,-0.10,sofa); a = vec3(0.42,0.29,0.23); }',
    /* a plant, lower-left: gives the RGB-driven modes real colour to react to */
    '  vec2 q1 = p - vec2(-0.285,-0.26);',
    '  float leaf = length(q1/vec2(0.080,0.125)) - 1.0 + detail*0.30*fbm(q1*24.0);',
    '  if(leaf < 0.0){ d = 0.50 - 0.06*smoothstep(0.0,-0.20,leaf); a = vec3(0.15,0.44,0.13)*(0.70+0.55*fbm(q1*30.0+3.0)); }',
    /* the subject: head, neck, shoulders — breathing and swaying a little */
    '  float br = 0.006*sin(t*1.05);',
    '  vec2 q = p - vec2(0.013*sin(t*0.42), -0.10 + br);',
    '  float head  = length((q - vec2(0.0,0.215))/vec2(0.088,0.108)) - 1.0;',
    '  float neck  = sdBox(q - vec2(0.0,0.115), vec2(0.038,0.058), 0.02);',
    '  float torso = sdBox(q - vec2(0.0,-0.22), vec2(0.170,0.280), 0.100);',
    '  float body  = min(min(head,neck),torso);',
    '  if(body < 0.0){',
    '    float bul = smoothstep(0.0,-0.085,body);',
    '    d = 0.40 - 0.115*bul + detail*0.010*fbm(q*26.0);',
    '    a = (min(head,neck) < 0.0) ? vec3(0.74,0.55,0.44) : vec3(0.18,0.23,0.36);',
    '  }',
    '  dep = clamp(d,0.0,1.0); alb = a;',
    '}',

    'float depthAt(vec2 uv){ float d; vec3 a; scene(uv,0.0,d,a); return d; }',
    'vec3 getNormal(vec2 uv){',
    '  vec2 e = 1.7/uRes;',
    '  float l=depthAt(uv-vec2(e.x,0.0)), r=depthAt(uv+vec2(e.x,0.0));',
    '  float b=depthAt(uv-vec2(0.0,e.y)), u=depthAt(uv+vec2(0.0,e.y));',
    '  return normalize(vec3(-(r-l)*26.0, -(u-b)*26.0, 1.0));',
    '}',

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
    '  } else {',                                    /* Lichtenberg */
    '    vec2 gr = vec2(depthAt(uv+vec2(0.004,0.0))-depthAt(uv-vec2(0.004,0.0)),',
    '                   depthAt(uv+vec2(0.0,0.004))-depthAt(uv-vec2(0.0,0.004)));',
    '    vec2 fl = p*6.0 + normalize(gr+vec2(0.0013))*1.6;',
    '    float v = fbm(fl + vec2(0.0, t*0.12));',
    '    float branch = pow(1.0-abs(v*2.0-1.0), 16.0);',
    '    float v2 = fbm(fl*2.4 - vec2(t*0.08,0.0));',
    '    branch += pow(1.0-abs(v2*2.0-1.0), 22.0)*0.7;',
    '    c = vec3(0.02,0.01,0.05) + mix(vec3(0.45,0.20,0.95), vec3(0.90,0.85,1.0), branch)*branch*1.7;',
    '    c *= 0.35+1.1*nd;',
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
      res: gl.getUniformLocation(pr, 'uRes'),
      t:   gl.getUniformLocation(pr, 'uT'),
      a:   gl.getUniformLocation(pr, 'uA'),
      b:   gl.getUniformLocation(pr, 'uB'),
      mix: gl.getUniformLocation(pr, 'uMix')
    };
    this.ok = true;
    this.resize();
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
    var gl = this.gl;
    gl.uniform2f(this.u.res, this.canvas.width, this.canvas.height);
    gl.uniform1f(this.u.t, this.clock);
    gl.uniform1i(this.u.a, this.mode);
    gl.uniform1i(this.u.b, this.prev);
    gl.uniform1f(this.u.mix, this.mix);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  window.ZPTHEngine = Engine;
})();
