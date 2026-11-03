/* J58 resource library. Edit ONLY the DOCS list below to add or change documents.
   PDFs live in assets/docs/ and are named  <name>-<lang>.pdf  (lang = en, nl or de).
   To publish a PDF: copy it into assets/docs/ and add  en:{f:'file.pdf',v:'v1.0',d:'Nov 2026',s:'4.2 MB'}  (v, d, s are optional). */
(function () {
  var root = document.getElementById('rl2root'); if (!root) return;
  var LANG = (document.documentElement.lang || 'en').slice(0, 2); if (!/^(en|nl|de)$/.test(LANG)) LANG = 'en';
  var P = root.getAttribute('data-root') || '';           /* path from this page to the site root */
  var DOCDIR = P + 'assets/docs/';

  /* ---- DOCS: kind 'file' = PDF with language chips; kind 'page' = link to a page in the visitor's language ---- */
  var DOCS = [
    { id: 'v-safety', type: 'video', kind: 'link', t: { en: 'How the EZER safety mechanism works', nl: 'Zo werkt het veiligheidsmechanisme van de EZER', de: 'So funktioniert der Sicherheitsmechanismus des EZER' },
      url: 'https://www.youtube.com/watch?v=6owU_U0oBkU' },
    { id: 'v-channel', type: 'video', kind: 'link', t: { en: 'Official how-to videos and playlists', nl: 'Officiële how-to-video\'s en afspeellijsten', de: 'Offizielle How-to-Videos und Playlists' },
      url: 'https://www.youtube.com/@J58EU' },
    { id: 'manual',   type: 'manual',   kind: 'file', t: { en: 'User manual', nl: 'Gebruikershandleiding', de: 'Benutzerhandbuch' },
      langs: { /* en:{f:'ezer-user-manual-en.pdf',v:'v1.0',d:'Nov 2026',s:'4.2 MB'}, nl:{...}, de:{...} */ } },
    { id: 'specs',    type: 'data',     kind: 'page', t: { en: 'Specifications', nl: 'Specificaties', de: 'Spezifikationen' },
      href: { en: 'product/index.html#specifications', nl: 'nl/product.html#specifications', de: 'de/product.html#specifications' } },
    { id: 'brochure', type: 'brochure', kind: 'file', t: { en: 'Clinical brochure (PDF)', nl: 'Klinische brochure (PDF)', de: 'Klinische Broschüre (PDF)' }, langs: {} },
    { id: 'guide',    type: 'guide',    kind: 'file', t: { en: 'Fitting & assessment guide', nl: 'Pas- en beoordelingsgids', de: 'Anpass- und Beurteilungsleitfaden' }, langs: {} },
    { id: 'order',    type: 'order',    kind: 'file', t: { en: 'Order form', nl: 'Bestelformulier', de: 'Bestellformular' }, langs: {} },
    { id: 'cookie',   type: 'policy',   kind: 'page', t: { en: 'Cookie policy', nl: 'Cookiebeleid', de: 'Cookie-Richtlinie' },
      href: { en: 'cookie-policy/index.html', nl: 'nl/cookie-policy.html', de: 'de/cookie-policy.html' } },
    { id: 'privacy',  type: 'policy',   kind: 'page', t: { en: 'Privacy policy', nl: 'Privacybeleid', de: 'Datenschutzerklärung' },
      href: { en: 'privacy-policy/index.html', nl: 'nl/privacy-policy.html', de: 'de/privacy-policy.html' } },
    { id: 'terms',    type: 'policy',   kind: 'page', t: { en: 'General terms and conditions', nl: 'Algemene voorwaarden', de: 'Allgemeine Geschäftsbedingungen' },
      href: { en: 'terms-and-conditions/index.html', nl: 'nl/terms-and-conditions.html', de: 'de/terms-and-conditions.html' } },
    { id: 'shipping', type: 'policy',   kind: 'page', t: { en: 'Shipping policy', nl: 'Verzendbeleid', de: 'Versandrichtlinie' }, href: null },
    { id: 'aftersales', type: 'policy', kind: 'page', t: { en: 'After-sales policy', nl: 'After-salesbeleid', de: 'After-Sales-Richtlinie' }, href: null }
  ];

  var S = {
    en: { h: 'Resource library', intro: 'Manuals, specifications, brochures, guides and our policies in one place.', search: 'Search resources', filter: 'Filter', ft: 'Resource type', none: 'No resources match your search.',
      types: { video: 'Tutorial video', manual: 'Manual', data: 'Product data', brochure: 'Brochure', guide: 'Guide', order: 'Order form', policy: 'Policy' },
      watch: 'Watch on YouTube', dl: 'View and download', open: 'View', soon: 'Coming soon', fb: 'Not available in English yet.', fb2: 'Not available in %L% yet. Showing %F%.', soonTip: 'Coming soon', ln: { en: 'English', nl: 'Dutch', de: 'German' }, pick: 'Language' },
    nl: { h: 'Bronnenbibliotheek', intro: 'Handleidingen, specificaties, brochures, gidsen en ons beleid op één plek.', search: 'Zoek in bronnen', filter: 'Filter', ft: 'Soort bron', none: 'Geen bronnen gevonden.',
      types: { video: 'Tutorialvideo', manual: 'Handleiding', data: 'Productgegevens', brochure: 'Brochure', guide: 'Gids', order: 'Bestelformulier', policy: 'Beleid' },
      watch: 'Bekijken op YouTube', dl: 'Bekijken en downloaden', open: 'Bekijken', soon: 'Binnenkort beschikbaar', fb2: 'Nog niet beschikbaar in %L%. We tonen %F%.', soonTip: 'Binnenkort beschikbaar', ln: { en: 'Engels', nl: 'Nederlands', de: 'Duits' }, pick: 'Taal' },
    de: { h: 'Ressourcen-Bibliothek', intro: 'Handbücher, Spezifikationen, Broschüren, Leitfäden und unsere Richtlinien an einem Ort.', search: 'Ressourcen durchsuchen', filter: 'Filter', ft: 'Art der Ressource', none: 'Keine Ressourcen gefunden.',
      types: { video: 'Tutorial-Video', manual: 'Handbuch', data: 'Produktdaten', brochure: 'Broschüre', guide: 'Leitfaden', order: 'Bestellformular', policy: 'Richtlinie' },
      watch: 'Auf YouTube ansehen', dl: 'Ansehen und herunterladen', open: 'Ansehen', soon: 'Demnächst verfügbar', fb2: 'Noch nicht auf %L% verfügbar. Angezeigt wird %F%.', soonTip: 'Demnächst verfügbar', ln: { en: 'Englisch', nl: 'Niederländisch', de: 'Deutsch' }, pick: 'Sprache' }
  }[LANG];
  var LN2 = { en: { en: 'English', nl: 'Dutch', de: 'German' }, nl: { en: 'het Engels', nl: 'het Nederlands', de: 'het Duits' }, de: { en: 'Englisch', nl: 'Niederländisch', de: 'Deutsch' } };
  var ORDER = ['video', 'manual', 'data', 'brochure', 'guide', 'order', 'policy'];
  function esc(x) { return String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }

  /* ---- styles ---- */
  var st = document.createElement('style');
  st.textContent = '.rl2{display:grid;grid-template-columns:260px minmax(0,1fr);gap:clamp(20px,4vw,48px);align-items:start}.rl2-f h3{font-size:1.3rem;margin:0 0 14px;color:#0B1D35}.rl2-s{width:100%;box-sizing:border-box;padding:13px 14px;border:1px solid #CBD5DD;border-radius:10px;font:inherit;background:#fff;margin:0 0 22px}.rl2-s:focus{outline:3px solid #12aaba;outline-offset:1px}.rl2-f fieldset{border:0;border-top:1px solid #E1E8EE;padding:16px 0 0;margin:0}.rl2-f legend{font-weight:700;color:#0B1D35;padding:0 0 10px}.rl2-f label{display:flex;gap:10px;align-items:center;padding:7px 0;cursor:pointer;color:#33475b}.rl2-f input[type=checkbox]{width:18px;height:18px;accent-color:#12aaba}.rl2-l{display:flex;flex-direction:column;gap:10px}' +
    '.rl2-r{display:grid;grid-template-columns:minmax(0,2.2fr) auto auto;gap:18px;align-items:center;background:#fff;border:1px solid #E1E8EE;border-radius:12px;padding:16px 20px}.rl2-r[hidden]{display:none}.rl2-r b{display:block;color:#0B1D35;font-size:1.02rem}.rl2-m{display:block;color:#54606f;font-size:.88rem;margin-top:3px}.rl2-n{display:block;color:#8a5a14;font-size:.84rem;margin-top:3px}' +
    '.rl2-lg{display:inline-flex;gap:6px}.rl2-c{min-width:40px;padding:6px 10px;border-radius:999px;border:1.5px solid #CBD5DD;background:#fff;color:#0B1D35;font:700 .78rem "Montserrat",sans-serif;letter-spacing:.04em;cursor:pointer;transition:background .15s,color .15s,border-color .15s}.rl2-c:hover:not([disabled]){border-color:#12aaba}.rl2-c[aria-pressed=true]{background:#0B1D35;border-color:#0B1D35;color:#fff}.rl2-c[disabled]{opacity:.45;cursor:not-allowed;border-style:dashed}.rl2-c:focus-visible{outline:3px solid #12aaba;outline-offset:2px}' +
    '.rl2-b{display:inline-flex;align-items:center;justify-content:center;padding:10px 20px;border-radius:999px;border:1.5px solid #0B1D35;background:#fff;color:#0B1D35;font:600 .9rem "Montserrat",sans-serif;text-decoration:none;white-space:nowrap;transition:background .2s,color .2s}.rl2-b:hover{background:#0B1D35;color:#fff}.rl2-b.off{border-color:#CBD5DD;color:#54606f;background:#EEF2F5}.rl2-b.off:hover{background:#E1E8EE;color:#0B1D35}.rl2-none{padding:20px;color:#54606f}' +
    '@media(max-width:820px){.rl2{grid-template-columns:1fr}.rl2-r{grid-template-columns:1fr;gap:10px}.rl2-b{justify-self:start}}';
  document.head.appendChild(st);

  /* ---- shell ---- */
  var cnt = {}; DOCS.forEach(function (d) { cnt[d.type] = (cnt[d.type] || 0) + 1; });
  var chk = ORDER.map(function (k) { return '<label><input type="checkbox" value="' + k + '"> ' + esc(S.types[k]) + ' (' + (cnt[k] || 0) + ')</label>'; }).join('');
  root.innerHTML = '<span class="rh-n">01</span><h2>' + esc(S.h) + '<span class="dot">.</span></h2><p>' + esc(S.intro) + '</p><div class="rl2"><div class="rl2-f"><h3>' + esc(S.filter) + '</h3><input class="rl2-s" id="rl2q" type="search" placeholder="' + esc(S.search) + '" aria-label="' + esc(S.search) + '"><fieldset><legend>' + esc(S.ft) + '</legend>' + chk + '</fieldset></div><div class="rl2-l" id="rl2list"></div></div>';
  var list = document.getElementById('rl2list');

  /* ---- rows ---- */
  function meta(o) { var a = ['PDF']; if (o.v) a.push(o.v); if (o.d) a.push(o.d); if (o.s) a.push(o.s); return a.join(' · '); }
  function build(d) {
    var row = document.createElement('div'); row.className = 'rl2-r'; row.setAttribute('data-type', d.type);
    var sel = LANG;
    if (d.kind === 'file') {
      var have = function (l) { return d.langs && d.langs[l] && d.langs[l].f; };
      if (!have(sel)) { sel = have('en') ? 'en' : (have('nl') ? 'nl' : (have('de') ? 'de' : null)); }
      var wanted = LANG;
      function paint() {
        var o = sel && d.langs[sel], note = '';
        if (sel && sel !== wanted && !have(wanted)) note = S.fb2.replace('%L%', LN2[LANG][wanted]).replace('%F%', LN2[LANG][sel]);
        var chips = ['en', 'nl', 'de'].map(function (l) { return '<button type="button" class="rl2-c" data-l="' + l + '" aria-pressed="' + (l === sel || (!sel && l === wanted)) + '"' + (have(l) ? '' : ' disabled title="' + esc(S.soonTip) + '"') + ' aria-label="' + esc(S.pick + ': ' + S.ln[l]) + '">' + l.toUpperCase() + '</button>'; }).join('');
        var btn = o ? '<a class="rl2-b" href="' + esc(DOCDIR + o.f) + '" target="_blank" rel="noopener" download>' + esc(S.dl) + '</a>' : '<a class="rl2-b off" href="#" data-coming-soon>' + esc(S.soon) + '</a>';
        row.innerHTML = '<div><b>' + esc(d.t[LANG]) + '</b><span class="rl2-m">' + esc(S.types[d.type]) + (o ? ' · ' + esc(meta(o)) : '') + '</span>' + (note ? '<span class="rl2-n">' + esc(note) + '</span>' : '') + '</div><div class="rl2-lg" role="group" aria-label="' + esc(S.pick) + '">' + chips + '</div>' + btn;
        [].forEach.call(row.querySelectorAll('.rl2-c:not([disabled])'), function (c) { c.addEventListener('click', function () { sel = c.getAttribute('data-l'); paint(); }); });
      }
      paint();
    } else if (d.kind === 'link') {
      row.innerHTML = '<div><b>' + esc(d.t[LANG]) + '</b><span class="rl2-m">' + esc(S.types[d.type]) + ' · YouTube</span></div><span></span><a class="rl2-b" href="' + esc(d.url) + '" target="_blank" rel="noopener">' + esc(S.watch) + '</a>';
    } else {
      var h = d.href && d.href[LANG];
      var btn = h ? '<a class="rl2-b" href="' + esc(P + h) + '">' + esc(S.open) + '</a>' : '<a class="rl2-b off" href="#" data-coming-soon>' + esc(S.soon) + '</a>';
      row.innerHTML = '<div><b>' + esc(d.t[LANG]) + '</b><span class="rl2-m">' + esc(S.types[d.type]) + '</span></div><span></span>' + btn;
    }
    return row;
  }
  var rows = DOCS.map(function (d) { var r = build(d); list.appendChild(r); return r; });
  var none = document.createElement('p'); none.className = 'rl2-none'; none.hidden = true; none.textContent = S.none; list.appendChild(none);

  /* ---- search + filter ---- */
  var q = document.getElementById('rl2q'), cb = [].slice.call(root.querySelectorAll('.rl2-f input[type=checkbox]'));
  function run() {
    var t = (q.value || '').toLowerCase().trim(), on = cb.filter(function (c) { return c.checked; }).map(function (c) { return c.value; }), n = 0;
    rows.forEach(function (r) { var ok = (!on.length || on.indexOf(r.getAttribute('data-type')) > -1) && (!t || r.textContent.toLowerCase().indexOf(t) > -1); r.hidden = !ok; if (ok) n++; });
    none.hidden = n > 0;
  }
  q.addEventListener('input', run); cb.forEach(function (c) { c.addEventListener('change', run); });
})();
