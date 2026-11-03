/* J58 consent: one choice for third-party Google content (YouTube videos). Necessary storage (language, accessibility) needs no consent.
   The choice is saved in localStorage ('j58consent') for 12 months. A Global Privacy Control signal counts as "reject". */
(function () {
  var KEY = 'j58consent', MAXAGE = 365 * 864e5;
  var LANG = (document.documentElement.lang || 'en').slice(0, 2); if (!/^(en|nl|de)$/.test(LANG)) LANG = 'en';
  var cs = document.currentScript, root = cs && cs.src ? cs.src.replace(/assets\/js\/consent\.js.*$/, '') : '';
  var POLICY = root + (LANG === 'en' ? 'cookie-policy/index.html' : LANG + '/cookie-policy.html');
  var T = {
    en: { t: 'We value your privacy', b: 'We use only the storage needed to run this website, such as your language and accessibility choices. Our videos are hosted by YouTube (Google) and play directly on the page. By selecting “Accept” you agree to our Cookie policy and Privacy policy, which include these YouTube videos. See our ', l: 'Cookie policy', a: 'Accept', r: 'Reject', x: 'Close', pt: 'This video is hosted by YouTube (Google). Allow Google content to watch it here.', pb: 'Allow and play' },
    nl: { t: 'We waarderen je privacy', b: 'We gebruiken alleen wat nodig is om deze website te laten werken, zoals je taal- en toegankelijkheidskeuzes. Onze video’s staan op YouTube (Google) en worden direct op de pagina afgespeeld. Door “Accepteren” te kiezen ga je akkoord met ons cookiebeleid en privacybeleid, inclusief deze YouTube-video’s. Bekijk ons ', l: 'cookiebeleid', a: 'Accepteren', r: 'Weigeren', x: 'Sluiten', pt: 'Deze video staat op YouTube (Google). Sta content van Google toe om hem hier te bekijken.', pb: 'Toestaan en afspelen' },
    de: { t: 'Wir respektieren Ihre Privatsphäre', b: 'Wir nutzen nur, was für den Betrieb dieser Website nötig ist, etwa Ihre Sprach- und Barrierefreiheits-Einstellungen. Unsere Videos werden von YouTube (Google) bereitgestellt und direkt auf der Seite abgespielt. Mit „Akzeptieren“ stimmen Sie unserer Cookie-Richtlinie und Datenschutzerklärung zu, die diese YouTube-Videos einschließen. Siehe unsere ', l: 'Cookie-Richtlinie', a: 'Akzeptieren', r: 'Ablehnen', x: 'Schließen', pt: 'Dieses Video wird von YouTube (Google) bereitgestellt. Erlauben Sie Google-Inhalte, um es hier anzusehen.', pb: 'Erlauben und abspielen' }
  }[LANG];
  function read() { try { var o = JSON.parse(localStorage.getItem(KEY) || 'null'); if (o && typeof o.google === 'boolean' && Date.now() - o.t < MAXAGE) return o.google; } catch (e) {} return null; }
  function save(v) { try { localStorage.setItem(KEY, JSON.stringify({ google: v, t: Date.now(), v: 1 })); } catch (e) {} }
  var consent = read();
  if (consent === null && navigator.globalPrivacyControl === true) { consent = false; save(false); }

  /* ---- Google (YouTube) frames ---- */
  function isYT(s) { return /^https?:\/\/(www\.)?youtube(-nocookie)?\.com\//i.test(s || ''); }
  function gate(f) { if (isYT(f.getAttribute('src')||f.getAttribute('data-src'))) { if(!f.getAttribute('src')) f.setAttribute('src',f.getAttribute('data-src')); return; }
    var src = f.getAttribute('src') || f.getAttribute('data-src'); if (!isYT(src)) return;
    if (consent === true) { if (!f.getAttribute('src')) f.setAttribute('src', src); return; }
    if (f.getAttribute('src')) { f.setAttribute('data-src', src); f.removeAttribute('src'); }
    if (f.nextElementSibling && f.nextElementSibling.classList.contains('j58c-ph')) return;
    var p = f.parentNode; if (p && getComputedStyle(p).position === 'static') p.style.position = 'relative';
    var ph = document.createElement('div'); ph.className = 'j58c-ph';
    ph.innerHTML = '<p></p><button type="button"></button>';
    ph.firstChild.textContent = T.pt; ph.lastChild.textContent = T.pb;
    ph.lastChild.addEventListener('click', function (e) { e.stopPropagation(); decide(true); });
    f.style.visibility = 'hidden'; f.parentNode.insertBefore(ph, f.nextSibling);
  }
  function release() {
    [].forEach.call(document.querySelectorAll('.j58c-ph'), function (ph) { ph.remove(); });
    [].forEach.call(document.querySelectorAll('iframe[data-src]'), function (f) { if (isYT(f.getAttribute('data-src'))) { f.style.visibility = ''; f.setAttribute('src', f.getAttribute('data-src')); } });
  }
  function scan(n) { if (n.nodeType !== 1) return; if (n.tagName === 'IFRAME') gate(n); else [].forEach.call(n.querySelectorAll('iframe'), gate); }
  new MutationObserver(function (ms) { ms.forEach(function (m) { [].forEach.call(m.addedNodes, scan); }); }).observe(document.documentElement, { childList: true, subtree: true });
  scan(document.documentElement);

  /* ---- Banner ---- */
  var CSS = '.j58c{position:fixed;right:20px;bottom:20px;z-index:99990;width:min(380px,calc(100vw - 40px));box-sizing:border-box;background:#0B1D35;color:#fff;border:1px solid rgba(18,170,186,.35);border-radius:16px;padding:26px 24px 22px;box-shadow:0 18px 60px rgba(0,0,0,.45);text-align:left;font-family:Montserrat,Inter,system-ui,sans-serif;opacity:0;visibility:hidden;transform:translateY(14px);transition:opacity .25s,transform .25s,visibility .25s}' +
    '.j58c.on{opacity:1;visibility:visible;transform:none}' +
    '.j58c svg.ck{width:44px;height:44px;margin:0 0 10px;display:block}' +
    '.j58c h2{margin:0 0 10px;font-size:1.5rem;line-height:1.15;color:#fff;font-family:"Playfair Display",Georgia,serif;font-weight:800;letter-spacing:-.01em}.j58c h2 i{font-style:normal;color:#12aaba}' +
    '.j58c p{margin:0;font-size:.86rem;line-height:1.6;color:#C9D6E3}' +
    '.j58c p a{color:#12aaba;text-decoration:underline}' +
    '.j58c .row{display:flex;gap:10px;margin-top:18px}' +
    '.j58c .row button{font:inherit;font-size:.9rem;font-weight:600;padding:11px 24px;border-radius:999px;cursor:pointer;border:1.5px solid #12aaba;transition:transform .2s}.j58c .row button:hover{transform:translateY(-2px)}' +
    '.j58c .row .y{background:#12aaba;color:#0B1D35}.j58c .row .n{background:transparent;color:#fff;border-color:rgba(255,255,255,.55)}' +
    '.j58c .row button:hover{}.j58c button:focus-visible,.j58c a:focus-visible{outline:3px solid #12aaba;outline-offset:2px}' +
    '.j58c .x{position:absolute;top:8px;right:10px;width:30px;height:30px;border:0;background:none;color:#fff;font-size:1.5rem;line-height:1;cursor:pointer;border-radius:50%}.j58c .x:hover{background:rgba(255,255,255,.12)}' +
    '.j58c-ph{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:20px;background:#0B1D35;color:#fff;text-align:center;z-index:2}' +
    '.j58c-ph p{margin:0;font-size:.95rem;line-height:1.5;max-width:30ch}' +
    '.j58c-ph button{font:inherit;font-weight:600;padding:10px 22px;border-radius:8px;border:0;background:#12aaba;color:#0B1D35;cursor:pointer}' +
    '@media(max-width:520px){.j58c{right:12px;left:12px;bottom:12px;width:auto}}@media(prefers-reduced-motion:reduce){.j58c{transition:none}}';
  var box;
  function build() {
    if (box) return; var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
    box = document.createElement('div'); box.className = 'j58c'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-labelledby', 'j58cT'); box.setAttribute('aria-describedby', 'j58cB');
    box.innerHTML = '<button type="button" class="x"></button><svg class="ck" viewBox="0 0 48 48" fill="none" stroke="#12aaba" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M24 4a20 20 0 1 0 20 20 6 6 0 0 1-7-5 6 6 0 0 1-6-6 6 6 0 0 1-7-9z"/><circle cx="16" cy="20" r="1.8" fill="#12aaba"/><circle cx="22" cy="31" r="1.8" fill="#12aaba"/><circle cx="32" cy="29" r="1.8" fill="#12aaba"/><circle cx="14" cy="30" r="1.2" fill="#12aaba"/></svg><h2 id="j58cT"></h2><p id="j58cB"></p><div class="row"><button type="button" class="y"></button><button type="button" class="n"></button></div>';
    var h = box.querySelector('h2'); h.textContent = T.t.replace(/\.$/, ''); var dt = document.createElement('i'); dt.textContent = '.'; h.appendChild(dt);
    var p = box.querySelector('#j58cB'); p.appendChild(document.createTextNode(T.b)); var a = document.createElement('a'); a.href = POLICY; a.textContent = T.l; p.appendChild(a); p.appendChild(document.createTextNode('.'));
    var x = box.querySelector('.x'); x.innerHTML = '&times;'; x.setAttribute('aria-label', T.x);
    box.querySelector('.y').textContent = T.a; box.querySelector('.n').style.display = 'none';
    x.addEventListener('click', hide);
    box.querySelector('.y').addEventListener('click', function () { decide(true); });
    box.querySelector('.n').addEventListener('click', function () { decide(false); });
    box.addEventListener('keydown', function (e) { if (e.key === 'Escape') hide(); });
    document.body.appendChild(box);
  }
  function show() { build(); requestAnimationFrame(function () { box.classList.add('on'); }); }
  function hide() { if (box) box.classList.remove('on'); }
  function decide(v) {
    var was = consent; consent = v; save(v); hide();
    if (v) release(); else if (was) { [].forEach.call(document.querySelectorAll('iframe'), function (f) { var s = f.getAttribute('src'); if (isYT(s)) { f.setAttribute('data-src', s); f.removeAttribute('src'); gate(f); } }); }
  }
  window.J58Consent = { open: show, get: function () { return consent; } };
  document.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('[data-cookie-settings]')) { e.preventDefault(); show(); } });
  function init() { scan(document.documentElement); if (consent === null) show(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
