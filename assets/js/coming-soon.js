/* "Coming soon" pop-up for anything that is not on the website yet. Add data-coming-soon to a link or button. */
(function () {
  var LANG = (document.documentElement.lang || 'en').slice(0, 2);
  var T = {
    en: { t: 'Coming soon', p: 'This is not on the website yet. We are working on it. In the meantime, email us and we will send it to you.', m: 'Email us', c: 'Close' },
    nl: { t: 'Binnenkort beschikbaar', p: 'Dit staat nog niet op de website. We werken eraan. Mail ons ondertussen, dan sturen we het je toe.', m: 'Mail ons', c: 'Sluiten' },
    de: { t: 'Demnächst verfügbar', p: 'Dies ist noch nicht auf der Website verfügbar. Wir arbeiten daran. Schreiben Sie uns in der Zwischenzeit, dann senden wir es Ihnen zu.', m: 'E-Mail senden', c: 'Schließen' }
  }[LANG] || null;
  if (!T) T = { t: 'Coming soon', p: 'This is not on the website yet. We are working on it. In the meantime, email us and we will send it to you.', m: 'Email us', c: 'Close' };
  var box, last;
  var CSS = '.j58s{position:fixed;inset:0;z-index:99995;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(4,10,20,.55);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);opacity:0;visibility:hidden;transition:opacity .25s,visibility .25s}.j58s.on{opacity:1;visibility:visible}' +
    '.j58s-p{position:relative;width:min(420px,100%);background:#0B1D35;color:#fff;border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:34px 30px 30px;text-align:left;box-shadow:0 30px 80px rgba(0,0,0,.5);font-family:Montserrat,Inter,system-ui,sans-serif;transform:translateY(12px);transition:transform .25s}.j58s.on .j58s-p{transform:none}' +
    '.j58s h2{margin:0 0 12px;font-family:"Playfair Display",Georgia,serif;font-size:1.9rem;font-weight:800;color:#fff}.j58s h2 i{font-style:normal;color:#12aaba}.j58s p{margin:0 0 22px;line-height:1.6;color:#C9D6E3;font-size:.98rem}' +
    '.j58s-row{display:flex;gap:10px;flex-wrap:wrap}.j58s-row a,.j58s-row button{font:inherit;font-weight:600;font-size:.95rem;padding:11px 22px;border-radius:999px;cursor:pointer;text-decoration:none;border:1.5px solid #12aaba}.j58s-row a{background:#12aaba;color:#0B1D35}.j58s-row button{background:transparent;color:#fff;border-color:rgba(255,255,255,.55)}' +
    '.j58s-x{position:absolute;top:10px;right:12px;width:34px;height:34px;border:0;border-radius:50%;background:none;color:#fff;font-size:1.6rem;line-height:1;cursor:pointer}.j58s-x:hover{background:rgba(255,255,255,.12)}.j58s button:focus-visible,.j58s a:focus-visible{outline:3px solid #12aaba;outline-offset:2px}';
  function build() {
    if (box) return;
    var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
    box = document.createElement('div'); box.className = 'j58s'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true'); box.setAttribute('aria-labelledby', 'j58sT');
    box.innerHTML = '<div class="j58s-p"><button type="button" class="j58s-x"></button><h2 id="j58sT"></h2><p></p><div class="j58s-row"><a href="mailto:info@j58.eu"></a><button type="button" class="j58s-c"></button></div></div>';
    var h = box.querySelector('h2'); h.textContent = T.t.replace(/\.$/, ''); var d = document.createElement('i'); d.textContent = '.'; h.appendChild(d);
    box.querySelector('p').textContent = T.p; box.querySelector('.j58s-row a').textContent = T.m;
    box.querySelector('.j58s-c').textContent = T.c; box.querySelector('.j58s-x').setAttribute('aria-label', T.c);
    box.addEventListener('click', function (e) { if (e.target === box || e.target.closest('.j58s-x,.j58s-c')) close(); });
    document.body.appendChild(box);
  }
  function open(from) { build(); last = from; box.classList.add('on'); box.querySelector('.j58s-c').focus(); }
  function close() { if (!box) return; box.classList.remove('on'); if (last && last.focus) last.focus(); }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-coming-soon]');
    if (!a) return;
    e.preventDefault(); open(a);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && box && box.classList.contains('on')) close();
    if (e.key === 'Tab' && box && box.classList.contains('on')) {
      var f = box.querySelectorAll('a,button'); if (!f.length) return;
      var first = f[0], lastEl = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastEl.focus(); }
      else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); first.focus(); }
    }
  });
})();
