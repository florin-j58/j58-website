/* J58 newsletter pop-up: shown when a page opens (after a short delay). Closing it hides it for 14 days; joining hides it for a year.
   The email is sent to the existing Substack newsletter "The Next Wheelchair" (a normal form post, opens Substack's confirmation in a new tab). */
(function () {
  var KEY = 'j58news', cs = document.currentScript, root = cs && cs.src ? cs.src.replace(/assets\/js\/newsletter-popup\.js.*$/, '') : '';
  var LANG = (document.documentElement.lang || 'en').slice(0, 2); if (!/^(en|nl|de)$/.test(LANG)) LANG = 'en';
  if (/cookie-policy/.test(location.pathname) || /[?&]nopopup\b/.test(location.search)) return;
  try { var o = JSON.parse(localStorage.getItem(KEY) || 'null'); if (o && Date.now() - o.t < (o.s ? 365 : 14) * 864e5) return; } catch (e) {}
  var T = {
    en: { e: 'Newsletter', h: 'Stay in the loop', p: 'Subscribe to our newsletter and join the J58 community for updates, stories and events.', ph: 'Email address', b: 'Join', n: 'By joining you agree to receive the J58 newsletter “The Next Wheelchair” via Substack. You can unsubscribe at any time.', x: 'Close' },
    nl: { e: 'Nieuwsbrief', h: 'Blijf op de hoogte', p: 'Schrijf je in voor onze nieuwsbrief en word deel van de J58-community voor updates, verhalen en evenementen.', ph: 'E-mailadres', b: 'Aanmelden', n: 'Door je aan te melden ga je akkoord met de J58-nieuwsbrief “The Next Wheelchair” via Substack. Je kunt je op elk moment afmelden.', x: 'Sluiten' },
    de: { e: 'Newsletter', h: 'Bleiben Sie auf dem Laufenden', p: 'Abonnieren Sie unseren Newsletter und werden Sie Teil der J58-Community: Neuigkeiten, Geschichten und Termine.', ph: 'E-Mail-Adresse', b: 'Anmelden', n: 'Mit der Anmeldung stimmen Sie dem Erhalt des J58-Newsletters „The Next Wheelchair“ über Substack zu. Abmeldung ist jederzeit möglich.', x: 'Schließen' }
  }[LANG];
  var CSS = '.j58n{position:fixed;inset:0;z-index:99980;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(11,29,53,.5);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);opacity:0;visibility:hidden;transition:opacity .3s,visibility .3s}.j58n.on{opacity:1;visibility:visible}' +
    '.j58n-card{position:relative;display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);width:min(1100px,100%);max-height:calc(100vh - 40px);border-radius:16px;overflow:auto;background:#fff;border:1px solid #E1E8EE;box-shadow:0 30px 80px rgba(11,29,53,.4);transform:translateY(16px) scale(.98);transition:transform .3s}.j58n.on .j58n-card{transform:none}' +
    '.j58n-text{padding:clamp(26px,4vw,52px);text-align:left;align-self:center;position:relative;z-index:1;font-family:Montserrat,Inter,system-ui,sans-serif}' +
    '.j58n-eyebrow{margin:0 0 14px;font-size:.78rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#12aaba}' +
    '.j58n h2{font-family:"Playfair Display",Georgia,serif;font-size:clamp(1.8rem,3.2vw,2.5rem);line-height:1.1;letter-spacing:-.02em;color:#0B1D35;margin:0 0 14px;font-weight:800}.j58n h2 span{color:#12aaba}' +
    '.j58n-text p.lead{color:#33475b;font-size:1.02rem;line-height:1.55;margin:0 0 24px;max-width:32em}' +
    '.j58n form{max-width:460px;display:flex;gap:10px;flex-wrap:wrap}.j58n input[type=email]{flex:1 1 180px;min-width:0;padding:13px 18px;border:1px solid #C9D4DE;border-radius:999px;font:inherit;font-size:1rem;color:#0B1D35;background:#F7F9FB}.j58n input[type=email]:focus{outline:3px solid rgba(18,170,186,.45);border-color:#12aaba}' +
    '.j58n button.go{display:inline-flex;align-items:center;gap:10px;padding:13px 22px;border-radius:999px;border:1px solid #12aaba;background:#12aaba;color:#0B1D35;font:inherit;font-weight:600;font-size:1rem;cursor:pointer;transition:transform .2s}.j58n button.go::after{content:"\\2192";font-size:1.15em}.j58n button.go:hover{transform:translateY(-2px)}.j58n button.go:focus-visible{outline:3px solid #0B1D35;outline-offset:2px}' +
    '.j58n small{display:block;margin-top:14px;font-size:.74rem;line-height:1.5;color:#5b6b7b}' +
    '.j58n-photo{position:relative;min-height:380px;background:#0B1D35 center/cover no-repeat;clip-path:polygon(9% 0,100% 0,100% 100%,0 100%);margin-left:-4%}' +
    '.j58n-x{position:absolute;top:12px;right:12px;z-index:3;width:38px;height:38px;border:0;border-radius:50%;background:rgba(255,255,255,.92);color:#0B1D35;font-size:1.6rem;line-height:1;cursor:pointer;box-shadow:0 2px 10px rgba(11,29,53,.2)}.j58n-x:hover{background:#fff}.j58n-x:focus-visible{outline:3px solid #12aaba}' +
    '@media(max-width:820px){.j58n-card{grid-template-columns:1fr}.j58n-photo{min-height:170px;margin:0;clip-path:none;order:-1}}@media(prefers-reduced-motion:reduce){.j58n,.j58n-card{transition:none}}';
  var box, prev;
  function close(sub) { try { localStorage.setItem(KEY, JSON.stringify({ t: Date.now(), s: !!sub })); } catch (e) {} if (box) { box.classList.remove('on'); setTimeout(function () { box.remove(); }, 350); } document.removeEventListener('keydown', key); if (prev && prev.focus) prev.focus(); }
  function key(e) { if (e.key === 'Escape') close(false); if (e.key === 'Tab' && box) { var f = [].slice.call(box.querySelectorAll('button,input,a[href]')), i = f.indexOf(document.activeElement); if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); } else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); } } }
  function open() {
    var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
    box = document.createElement('div'); box.className = 'j58n'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true'); box.setAttribute('aria-labelledby', 'j58nT');
    box.innerHTML = '<div class="j58n-card"><button type="button" class="j58n-x">&times;</button><div class="j58n-text"><p class="j58n-eyebrow"></p><h2 id="j58nT"></h2><p class="lead"></p>' +
      '<form method="post" action="https://thenextwheelchair.substack.com/api/v1/free?nojs=true" target="_blank" novalidate><input type="email" name="email" required autocomplete="email"><input type="hidden" name="first_url"><input type="hidden" name="current_url"><button type="submit" class="go"></button></form><small></small></div><div class="j58n-photo" role="presentation"></div></div>';
    var q = function (s) { return box.querySelector(s); };
    q('.j58n-eyebrow').textContent = T.e; q('h2').innerHTML = ''; q('h2').appendChild(document.createTextNode(T.h)); var d = document.createElement('span'); d.textContent = '.'; q('h2').appendChild(d);
    q('.lead').textContent = T.p; q('input[type=email]').placeholder = T.ph; q('input[type=email]').setAttribute('aria-label', T.ph); q('.go').textContent = T.b; q('small').textContent = T.n; q('.j58n-x').setAttribute('aria-label', T.x);
    q('.j58n-photo').style.backgroundImage = "url('" + root + "assets/img/hero-poster-teaser.jpg')";
    q('.j58n-x').addEventListener('click', function () { close(false); });
    box.addEventListener('mousedown', function (e) { if (e.target === box) close(false); });
    q('form').addEventListener('submit', function (e) {
      var em = q('input[type=email]'); if (!em.value || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em.value)) { e.preventDefault(); em.focus(); em.setAttribute('aria-invalid', 'true'); return; }
      q('input[name=first_url]').value = q('input[name=current_url]').value = location.href; setTimeout(function () { close(true); }, 300);
    });
    document.body.appendChild(box); prev = document.activeElement; document.addEventListener('keydown', key);
    requestAnimationFrame(function () { box.classList.add('on'); setTimeout(function () { q('input[type=email]').focus({ preventScroll: true }); }, 350); });
  }
  function init() { setTimeout(open, 1500); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
