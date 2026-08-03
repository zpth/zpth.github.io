/* ZPTH — section navigation, the in-phone mode switcher, mobile sheet. */
(function () {
  'use strict';

  var MODES = window.ZPTH_MODES || [];
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* what the phone shows for each section */
  var SECTIONS = [
    { video: true },                                  /* 0 · hero — the App Store preview */
    { live: true,  browse: true },                    /* 1 · modes       — you drive  */
    { reels: true },                                  /* 2 · reels                    */
    { shot: 'shots/creator.jpg' },                    /* 3 · creator — the editor itself */
    { video: true },                                  /* 4 · capture                  */
    { live: true,  mode: 0, ndi: true },              /* 5 · NDI         — Environment*/
    { still: 'shots/voxel.jpg' },                     /* 6 · pro                      */
    { live: true,  mode: 5 },                         /* 7 · privacy     — Data       */
    { still: 'shots/pinscreen.jpg' },                 /* 8 · requirements             */
    { live: true,  mode: 9 },                         /* 9 · download    — Oil Slick  */
    { docs: true }                                    /* 10 · reference — no phone    */
  ];

  /* Instagram reels — the iframe is built on demand, never at page load */
  var REELS = [
    { code: 'DbiCDH5uVQq', who: '@cybergenic' },
    { code: 'Daax3cgBJQ2', who: '@aristides.lab' },
    { code: 'DZyBhX5Nh_S', who: '@optictempo' }
  ];

  /* modes we have a real capture for — all from the current App Store listing */
  var SHOTS = {
    2: 'shots/raw-glitch.jpg',  5: 'shots/data.jpg',      6: 'shots/contour-figure.jpg',
    12: 'shots/pinscreen.jpg', 13: 'shots/voxel.jpg',
    18: 'shots/dither.jpg',    19: 'shots/juicy.jpg'
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

  var film = $('#filmstrip'), shotFull = $('#shotfull');
  var docsBox = $('#docs'), docsPills = $('#docsPills'), docsBodyEl = $('#docsBody');
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

    /* the reference tab replaces the phone entirely */
    docsBox.hidden = !s.docs;
    document.body.classList.toggle('docs-on', !!s.docs);
    if (s.docs) {
      engine.stop(); film.pause();
      reelsBox.hidden = true; shotFull.hidden = true;
      buildDocs();
      return;
    }

    reelsBox.hidden = !s.reels;
    film.hidden = !s.video;
    shotFull.hidden = !s.shot;
    if (s.video) { var pr = film.play(); if (pr && pr.catch) pr.catch(function () {}); }
    else { film.pause(); }
    if (s.shot) shotFull.src = s.shot;

    if (s.reels) {
      engine.stop();
      still.hidden = true;
      if (!reelFrame.querySelector('iframe')) mountReel();
    } else if (s.video || s.shot) {
      /* fills the whole phone on its own — the app's own UI, not our replica */
      engine.stop();
      still.hidden = true;
    } else if (s.still) {
      still.src = s.still; still.hidden = false;
      canvas.style.visibility = 'hidden';
      vpNote.textContent = 'captured in ZPTH';
      engine.stop();
    } else {
      still.hidden = true; still.removeAttribute('src');
      canvas.style.visibility = 'visible';
      vpNote.textContent = engine.ok ? 'live in your browser*' : 'captured in ZPTH';
      if (typeof s.mode === 'number' && s.mode !== mode) setMode(s.mode, false);
      if (!document.hidden) { engine.resize(); engine.start(); }
    }

    overlay.hidden = !s.ndi;
    panel.classList.remove('open');
    $('#sheetGrip').setAttribute('aria-expanded', 'false');
  }

  /* ────────────────────────────────────────────── reference (settings docs) */
  var DOCS = window.ZPTH_DOCS || { modes: [], globals: [] };
  var docsPick = -1;          /* -1 = Universal, else index into DOCS.modes */
  var docsReady = false;

  function el(tag, cls, txt) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt != null) e.textContent = txt;
    return e;
  }

  function table(rows) {
    var t = el('table', 'docs-tbl');
    var thead = el('thead'), hr = el('tr');
    ['Setting', 'Type', 'Range', 'What it does'].forEach(function (h, i) {
      var th = el('th', null, h);
      if (i === 3) th.style.width = '100%';
      hr.appendChild(th);
    });
    thead.appendChild(hr); t.appendChild(thead);
    var tb = el('tbody');
    rows.forEach(function (r) {
      var tr = el('tr');
      tr.appendChild(el('td', 'c-name', r.label));
      tr.appendChild(el('td', 'c-kind', r.kind));
      tr.appendChild(el('td', 'c-range' + (r.range ? '' : ' is-none'), r.range ? r.range.replace('..', ' – ') : '—'));
      var d = el('td', 'c-desc', r.desc || '');
      if (r.options && r.options.length) d.appendChild(el('span', 'opts', r.options.join(' · ')));
      tr.appendChild(d);
      tb.appendChild(tr);
    });
    t.appendChild(tb);
    return t;
  }

  function renderDocs() {
    docsBodyEl.innerHTML = '';
    docsBodyEl.scrollTop = 0;

    if (docsPick < 0) {                       /* ── Universal ── */
      docsBodyEl.appendChild(el('h3', 'docs-mode', 'Universal'));
      docsBodyEl.appendChild(el('p', 'docs-desc',
        'Settings that apply everywhere, whichever mode you are in. Every mode also keeps ' +
        'three presets of its own, and the LiDAR presets sit on top of all of them.'));
      DOCS.globals.forEach(function (g) {
        docsBodyEl.appendChild(el('p', 'docs-group', g.group));
        docsBodyEl.appendChild(table(g.rows));
      });
      return;
    }

    var m = DOCS.modes[docsPick], meta = MODES[docsPick] || {};
    docsBodyEl.appendChild(el('h3', 'docs-mode', meta.n || m.id));
    if (meta.mono) docsBodyEl.appendChild(el('span', 'docs-tag', 'Monocular · any iPhone, either camera'));
    if (meta.d) docsBodyEl.appendChild(el('p', 'docs-desc', meta.d));
    (m.notes || []).forEach(function (n) { docsBodyEl.appendChild(el('p', 'docs-note', n)); });
    if (!m.controls.length) docsBodyEl.appendChild(el('p', 'docs-desc', 'This mode has no settings of its own.'));
    else docsBodyEl.appendChild(table(m.controls));

    /* every monocular mode also carries the shared Mono Depth block */
    if (m.mono && DOCS.monoShared) {
      docsBodyEl.appendChild(el('p', 'docs-group', 'Mono Depth · shared by all 15 monocular modes'));
      (DOCS.monoShared.notes || []).forEach(function (n) {
        docsBodyEl.appendChild(el('p', 'docs-note', n));
      });
      docsBodyEl.appendChild(table(DOCS.monoShared.rows));
    }
  }

  function pickDocs(i) {
    docsPick = i;
    Array.prototype.forEach.call(docsPills.children, function (b) {
      if (b.tagName === 'BUTTON') b.setAttribute('aria-selected', (+b.dataset.i === i) ? 'true' : 'false');
    });
    if (i >= 0 && MODES[i]) document.documentElement.style.setProperty('--accent', MODES[i].c);
    renderDocs();
  }

  function buildDocs() {
    if (docsReady) return;
    docsReady = true;

    var total = DOCS.modes.reduce(function (a, m) { return a + m.controls.length; }, 0) +
                DOCS.globals.reduce(function (a, g) { return a + g.rows.length; }, 0) +
                ((DOCS.monoShared && DOCS.monoShared.rows.length) || 0);
    $('#docsCount').textContent =
      DOCS.modes.length + ' depth modes · ' + total + ' settings. Pick a mode to see its controls.';

    var uni = el('button', null, 'Universal');
    uni.type = 'button'; uni.dataset.i = -1; uni.setAttribute('role', 'tab');
    uni.addEventListener('click', function () { pickDocs(-1); });
    docsPills.appendChild(uni);
    docsPills.appendChild(el('span', 'sep'));

    DOCS.modes.forEach(function (m, i) {
      var b = el('button', null, (MODES[i] && MODES[i].n) || m.id);
      b.type = 'button'; b.dataset.i = i; b.setAttribute('role', 'tab');
      b.addEventListener('click', function () { pickDocs(i); });
      docsPills.appendChild(b);
    });
    pickDocs(-1);
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
    SECTIONS[1] = { still: 'shots/contour-room.jpg' };
    SECTIONS[5] = { still: 'shots/contour-figure.jpg', ndi: true };
    SECTIONS[7] = { still: 'shots/data.jpg' };
    SECTIONS[9] = { still: 'shots/juicy.jpg' };
  }

  document.documentElement.style.setProperty('--accent', MODES[mode].c);
  go(0);
  setTimeout(function () { centreStrip(mode); }, 60);
})();
