/* ZPTH — section navigation, the in-phone mode switcher, mobile sheet. */
(function () {
  'use strict';

  var MODES = window.ZPTH_MODES || [];
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* what the phone shows for each section */
  var SECTIONS = [
    { live: true,  mode: 6 },                         /* 0 · hero        — Contour   */
    { live: true,  browse: true },                    /* 1 · modes       — you drive  */
    { reels: true },                                  /* 2 · reels                    */
    { still: 'shots/creator.jpg' },                   /* 3 · creator                  */
    { still: 'shots/contour-figure.jpg' },            /* 4 · capture                  */
    { live: true,  mode: 0, ndi: true },              /* 5 · NDI         — Environment*/
    { still: 'shots/voxel.jpg' },                     /* 6 · pro                      */
    { still: 'shots/hand.jpg' },                      /* 7 · privacy                  */
    { still: 'shots/raw-glitch.jpg' },                /* 8 · requirements             */
    { live: true,  mode: 9 }                          /* 9 · download    — Oil Slick  */
  ];

  /* Instagram reels — the iframe is built on demand, never at page load */
  var REELS = [
    { code: 'Daax3cgBJQ2', who: '@aristides.lab' },
    { code: 'DbiCDH5uVQq', who: '@cybergenic' },
    { code: 'DZyBhX5Nh_S', who: '@optictempo' }
  ];

  /* modes we have a real capture for */
  var SHOTS = {
    2: 'shots/raw-topo.jpg', 5: 'shots/data.jpg',     6: 'shots/contour-room.jpg',
    9: 'shots/oilslick.jpg', 12: 'shots/pinscreen.jpg', 13: 'shots/voxel.jpg',
    18: 'shots/dither.jpg', 19: 'shots/juicy.jpg'
  };

  var canvas   = $('#gl');
  var still    = $('#still');
  var vpNote   = $('#vpNote');
  var overlay  = $('#vpOverlay');
  var strip    = $('#modeStrip');
  var grid     = $('#modeGrid');
  var ticks    = $('#ticks');
  var panel    = $('#panel');
  var railRows = $$('.rt');
  var panelRows= $$('.pi');

  var engine = new window.ZPTHEngine(canvas);
  var section = 0;
  var mode = 6;

  /* ─────────────────────────────────────────────────────── build the controls */
  MODES.forEach(function (m, i) {
    var b = document.createElement('button');
    b.type = 'button'; b.textContent = m.n; b.setAttribute('role', 'tab');
    b.setAttribute('aria-selected', i === mode ? 'true' : 'false');
    b.addEventListener('click', function () { setMode(i, true); });
    strip.appendChild(b);

    var g = document.createElement('button');
    g.type = 'button'; g.textContent = m.n;
    g.setAttribute('aria-current', i === mode ? 'true' : 'false');
    g.addEventListener('click', function () { setMode(i, true); });
    grid.appendChild(g);
  });

  var reelsBox = $('#reels'), reelTabs = $('#reelTabs'), reelFrame = $('#reelFrame');
  var reel = 0, reelBtns = [];

  REELS.forEach(function (r, i) {
    var b = document.createElement('button');
    b.type = 'button'; b.textContent = r.who; b.setAttribute('role', 'tab');
    b.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    b.addEventListener('click', function () { setReel(i); });
    reelTabs.appendChild(b);
    reelBtns.push(b);
  });

  function setReel(i) {
    reel = i;
    reelBtns.forEach(function (b, k) { b.setAttribute('aria-selected', k === i ? 'true' : 'false'); });
    $('#reelWho').textContent = REELS[i].who;
    $('#reelLink').href = 'https://www.instagram.com/reel/' + REELS[i].code + '/';
    mountReel();
  }

  function mountReel() {
    var f = document.createElement('iframe');
    f.src = 'https://www.instagram.com/reel/' + REELS[reel].code + '/embed/';
    f.title = 'Instagram reel by ' + REELS[reel].who;
    f.loading = 'lazy';
    f.setAttribute('scrolling', 'no');
    f.setAttribute('allowtransparency', 'true');
    f.setAttribute('allow', 'encrypted-media; picture-in-picture; clipboard-write');
    f.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    reelFrame.innerHTML = '';
    reelFrame.appendChild(f);
  }

  $('#reelLoad').addEventListener('click', mountReel);

  SECTIONS.forEach(function (_, i) {
    var t = document.createElement('button');
    t.type = 'button';
    t.setAttribute('aria-label', 'Section ' + (i + 1) + ' of ' + SECTIONS.length);
    t.setAttribute('aria-current', i === 0 ? 'true' : 'false');
    t.addEventListener('click', function () { go(i); });
    ticks.appendChild(t);
  });
  var tickBtns = $$('button', ticks);
  var stripBtns = $$('button', strip);
  var gridBtns = $$('button', grid);

  /* ───────────────────────────────────────────────────────────────── modes */
  function setMode(i, jump) {
    mode = i;
    engine.setMode(i);
    document.documentElement.style.setProperty('--accent', MODES[i].c);

    stripBtns.forEach(function (b, k) { b.setAttribute('aria-selected', k === i ? 'true' : 'false'); });
    gridBtns.forEach(function (b, k) { b.setAttribute('aria-current', k === i ? 'true' : 'false'); });

    $('#modeName').textContent = MODES[i].n;
    $('#modeDesc').textContent = MODES[i].d;

    var fig = $('#realShot'), img = $('#realShotImg');
    if (SHOTS[i]) { img.src = SHOTS[i]; img.alt = MODES[i].n + ' — captured in ZPTH'; fig.hidden = false; }
    else { fig.hidden = true; img.removeAttribute('src'); }

    centreStrip(i);
    if (jump && !SECTIONS[section].live) go(1);
  }

  function centreStrip(i) {
    var b = stripBtns[i]; if (!b) return;
    strip.scrollTo({ left: b.offsetLeft - (strip.clientWidth - b.offsetWidth) / 2, behavior: 'smooth' });
  }

  /* ────────────────────────────────────────────────────────────── sections */
  function go(i) {
    i = Math.max(0, Math.min(SECTIONS.length - 1, i));
    section = i;
    var s = SECTIONS[i];

    railRows.forEach(function (r, k) { r.classList.toggle('on', k === i); });
    panelRows.forEach(function (r, k) { r.classList.toggle('on', k === i); });
    tickBtns.forEach(function (b, k) { b.setAttribute('aria-current', k === i ? 'true' : 'false'); });

    reelsBox.hidden = !s.reels;
    if (s.reels) {
      engine.stop();
      still.hidden = true;
      if (!reelFrame.querySelector('iframe')) mountReel();
    } else if (s.still) {
      still.src = s.still; still.hidden = false;
      canvas.style.visibility = 'hidden';
      vpNote.textContent = 'captured in ZPTH';
      engine.stop();
    } else {
      still.hidden = true; still.removeAttribute('src');
      canvas.style.visibility = 'visible';
      vpNote.textContent = engine.ok ? 'live in your browser' : 'captured in ZPTH';
      if (typeof s.mode === 'number' && s.mode !== mode) setMode(s.mode, false);
      if (!document.hidden) { engine.resize(); engine.start(); }
    }

    overlay.hidden = !s.ndi;
    panel.classList.remove('open');
    $('#sheetGrip').setAttribute('aria-expanded', 'false');
  }

  /* ───────────────────────────────────────────────────────────── navigation */
  var lock = 0;
  function step(d) {
    var now = Date.now();
    if (now < lock) return;
    lock = now + 620;
    go(section + d);
  }

  function scrollableUnder(el, dy) {
    while (el && el !== document.body) {
      if (el.scrollHeight - el.clientHeight > 4) {
        var atTop = el.scrollTop <= 0, atEnd = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
        if ((dy < 0 && !atTop) || (dy > 0 && !atEnd)) return true;
      }
      el = el.parentElement;
    }
    return false;
  }

  var desktop = window.matchMedia('(min-width:901px)');
  var acc = 0, accAt = 0;
  window.addEventListener('wheel', function (e) {
    if (!desktop.matches) return;
    if (scrollableUnder(e.target, e.deltaY)) return;
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    e.preventDefault();
    var now = Date.now();
    if (now - accAt > 220) acc = 0;
    accAt = now; acc += e.deltaY;
    if (Math.abs(acc) > 42) { step(acc > 0 ? 1 : -1); acc = 0; }
  }, { passive: false });

  document.addEventListener('keydown', function (e) {
    var tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea') return;
    if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === 'j') { e.preventDefault(); step(1); }
    else if (e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'k') { e.preventDefault(); step(-1); }
    else if (e.key === 'Home') { e.preventDefault(); go(0); }
    else if (e.key === 'End') { e.preventDefault(); go(SECTIONS.length - 1); }
    else if (e.key === 'ArrowRight' && section === 1) { e.preventDefault(); setMode((mode + 1) % MODES.length, false); }
    else if (e.key === 'ArrowLeft' && section === 1) { e.preventDefault(); setMode((mode + MODES.length - 1) % MODES.length, false); }
  });

  $('#nudge').addEventListener('click', function () {
    go(section >= SECTIONS.length - 1 ? 0 : section + 1);
  });

  /* swipe on the stage (mobile) */
  var sy = 0, sx = 0, tracking = false;
  var stage = $('.stage');
  stage.addEventListener('touchstart', function (e) {
    if (e.touches.length !== 1) return;
    sy = e.touches[0].clientY; sx = e.touches[0].clientX; tracking = true;
  }, { passive: true });
  stage.addEventListener('touchend', function (e) {
    if (!tracking) return; tracking = false;
    var t = e.changedTouches[0];
    var dy = t.clientY - sy, dx = t.clientX - sx;
    if (Math.abs(dy) > 52 && Math.abs(dy) > Math.abs(dx) * 1.3) step(dy < 0 ? 1 : -1);
  }, { passive: true });

  /* bottom sheet */
  var grip = $('#sheetGrip');
  function toggleSheet() {
    var open = panel.classList.toggle('open');
    grip.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  grip.addEventListener('click', toggleSheet);
  grip.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSheet(); }
  });

  /* ──────────────────────────────────────────────────────────────── lifecycle */
  var rt;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () { engine.resize(); centreStrip(mode); }, 120);
  });

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) engine.stop();
    else if (SECTIONS[section].live) { engine.resize(); engine.start(); }
  });

  if (!engine.ok) {
    /* no WebGL — fall back to a real capture so the frame is never empty */
    canvas.style.display = 'none';
    SECTIONS[0].still = 'shots/contour-room.jpg';
    SECTIONS[1].still = 'shots/contour-room.jpg';
    SECTIONS[5].still = 'shots/oilslick.jpg';
    SECTIONS[9].still = 'shots/oilslick.jpg';
  }

  document.documentElement.style.setProperty('--accent', MODES[mode].c);
  go(0);
  setTimeout(function () { centreStrip(mode); }, 60);
})();
