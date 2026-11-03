/* J58 accessibility panel: top-bar button + full-height side panel (text size, contrast, read aloud, motion) */
(function () {
  var root = document.documentElement, lang = (root.lang || 'en').slice(0, 2);
  var T = {
    en: { btn: 'Accessibility', close: 'Close accessibility panel', size: 'Text size', sizes: ['Normal', 'Larger', 'Largest'], contrast: 'Contrast', cs: ['Colour', 'Black', 'White'], read: 'Read aloud', play: 'Read aloud', stop: 'Stop', motion: 'Motion', calm: 'Reduce motion', reset: 'Reset all settings' },
    nl: { btn: 'Toegankelijkheid', close: 'Toegankelijkheidspaneel sluiten', size: 'Tekst vergroten', sizes: ['Normaal', 'Groter', 'Grootst'], contrast: 'Contrast', cs: ['Kleur', 'Zwart', 'Wit'], read: 'Voorlezen', play: 'Lees voor', stop: 'Stop', motion: 'Beweging', calm: 'Minder beweging', reset: 'Alle instellingen herstellen' },
    de: { btn: 'Barrierefreiheit', close: 'Barrierefreiheits-Panel schließen', size: 'Textgröße', sizes: ['Normal', 'Größer', 'Am größten'], contrast: 'Kontrast', cs: ['Farbe', 'Schwarz', 'Weiß'], read: 'Vorlesen', play: 'Vorlesen', stop: 'Stopp', motion: 'Bewegung', calm: 'Weniger Bewegung', reset: 'Alle Einstellungen zurücksetzen' }
  };
  var L = T[lang] || T.en, KEY = 'j58a11y', SIZES = [1, 1.15, 1.3];
  var st = { size: 0, contrast: 0, calm: 0 };
  try { var s = JSON.parse(localStorage.getItem(KEY) || '{}'); for (var k in st) if (typeof s[k] === 'number') st[k] = s[k]; } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} }
  function apply() {
    root.style.setProperty('--ts', SIZES[st.size]);
    root.style.fontSize = (SIZES[st.size] * 100) + '%';
    root.classList.toggle('hc', st.contrast === 1);
    root.classList.toggle('hcw', st.contrast === 2);
    root.classList.toggle('calm', st.calm === 1);
    [].forEach.call(document.querySelectorAll('[data-a11y]'), function (b) {
      var on = st[b.getAttribute('data-a11y')] === +b.getAttribute('data-v');
      b.setAttribute('aria-pressed', on ? 'true' : 'false'); b.classList.toggle('on', on);
    });
    var v = document.querySelector('video[autoplay]');
    if (v) { if (st.calm) v.pause(); else { var p = v.play(); if (p && p.catch) p.catch(function () {}); } }
  }
  function build() {
    var bar = document.querySelector('.a11y-toolbar .container');
    if (!bar || document.getElementById('a11yPanel')) return;
    [].forEach.call(bar.querySelectorAll('.a11y-toolbar-label,#hcToggle,.a11y-divider,.a11y-size-group'), function (n) { n.remove(); });
    var open = document.createElement('button');
    open.type = 'button'; open.className = 'a11y-open'; open.id = 'a11yOpen';
    open.setAttribute('aria-haspopup', 'dialog'); open.setAttribute('aria-controls', 'a11yPanel'); open.setAttribute('aria-expanded', 'false');
    open.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="7.2" r="1.5" fill="currentColor"/><path d="M7 10.2l5 1 5-1M12 11.2v3.3m0 0l-2.4 4.2m2.4-4.2l2.4 4.2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + L.btn + '</span>';
    bar.insertBefore(open, bar.firstChild);
    function group(label, key, names) {
      return '<h3 class="a11y-h">' + label + '</h3><div class="a11y-row" role="group" aria-label="' + label + '">' +
        names.map(function (n, i) { return '<button type="button" class="a11y-opt" data-a11y="' + key + '" data-v="' + i + '" aria-pressed="false">' + n + '</button>'; }).join('') + '</div>';
    }
    var panel = document.createElement('div');
    panel.id = 'a11yPanel'; panel.className = 'a11y-panel'; panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-modal', 'true'); panel.setAttribute('aria-labelledby', 'a11yTitle'); panel.hidden = true;
    panel.innerHTML = '<div class="a11y-scrim" data-close></div><aside class="a11y-sheet"><div class="a11y-top"><h2 id="a11yTitle">' + L.btn + '</h2><button type="button" class="a11y-x" data-close aria-label="' + L.close + '">&times;</button></div>' +
      group(L.size, 'size', L.sizes) + group(L.contrast, 'contrast', L.cs) +
      '<h3 class="a11y-h">' + L.read + '</h3><div class="a11y-row"><button type="button" class="a11y-opt a11y-read" id="a11yRead"><span class="a11y-ico">&#9654;</span> <span id="a11yReadTxt">' + L.play + '</span></button></div>' +
      '<h3 class="a11y-h">' + L.motion + '</h3><div class="a11y-row"><button type="button" class="a11y-opt" data-a11y="calm" data-v="1" aria-pressed="false" id="a11yCalm">' + L.calm + '</button></div>' +
      '<button type="button" class="a11y-reset" id="a11yReset">' + L.reset + '</button></aside>';
    document.body.appendChild(panel);
    var last;
    function show() { last = document.activeElement; panel.hidden = false; open.setAttribute('aria-expanded', 'true'); root.classList.add('a11y-lock'); setTimeout(function () { panel.querySelector('.a11y-x').focus(); }, 30); }
    function hide() { panel.hidden = true; open.setAttribute('aria-expanded', 'false'); root.classList.remove('a11y-lock'); if (last && last.focus) last.focus(); }
    open.addEventListener('click', show);
    panel.addEventListener('click', function (e) {
      if (e.target.closest('[data-close]')) return hide();
      var b = e.target.closest('[data-a11y]');
      if (b) { var k = b.getAttribute('data-a11y'), v = +b.getAttribute('data-v'); st[k] = (k === 'calm' && st.calm === 1) ? 0 : v; save(); apply(); }
    });
    document.addEventListener('keydown', function (e) {
      if (panel.hidden) return;
      if (e.key === 'Escape') return hide();
      if (e.key === 'Tab') {
        var f = [].slice.call(panel.querySelectorAll('button')), a = f[0], z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    });
    document.getElementById('a11yReset').addEventListener('click', function () { st = { size: 0, contrast: 0, calm: 0 }; save(); apply(); stopRead(); });
    /* read aloud */
    var rb = document.getElementById('a11yRead'), rt = document.getElementById('a11yReadTxt'), ri = rb.querySelector('.a11y-ico'), reading = false;
    function stopRead() { if ('speechSynthesis' in window) speechSynthesis.cancel(); reading = false; rt.textContent = L.play; ri.innerHTML = '&#9654;'; rb.classList.remove('on'); }
    rb.addEventListener('click', function () {
      if (!('speechSynthesis' in window)) { rt.textContent = 'n/a'; return; }
      if (reading) return stopRead();
      var main = document.getElementById('main') || document.querySelector('main') || document.body;
      var txt = (main.innerText || '').replace(/\s+/g, ' ').trim(); if (!txt) return;
      var chunks = txt.match(/[^.!?]+[.!?]*\s*/g) || [txt], i = 0;
      reading = true; rt.textContent = L.stop; ri.innerHTML = '&#9632;'; rb.classList.add('on'); hide();
      (function next() {
        if (!reading || i >= chunks.length) return stopRead();
        var u = new SpeechSynthesisUtterance(chunks[i++]); u.lang = { en: 'en-GB', nl: 'nl-NL', de: 'de-DE' }[lang] || 'en-GB';
        u.onend = next; u.onerror = stopRead; speechSynthesis.speak(u);
      })();
    });
    apply();
  }
  apply();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
