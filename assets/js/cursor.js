/* EZER wheelchair cursor: the big wheel sits on the pointer's hotspot, rolls as you move, and spins bright blue over clickable things. */
(function () {
  /* Backup: the wheelchair cursor is switched off, so clickable things show the normal pointer.
     To bring the wheelchair cursor back, set WHEELCHAIR_CURSOR to true. */
  var WHEELCHAIR_CURSOR = false;
  if (!WHEELCHAIR_CURSOR) return;
  if (!window.matchMedia || !matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  var NS = 'http://www.w3.org/2000/svg';
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var el = document.createElement('div');
  el.className = 'wc'; el.setAttribute('aria-hidden', 'true');
  var spokes = '';
  for (var i = 0; i < 6; i++) spokes += '<line x1="32" y1="36" x2="32" y2="21" transform="rotate(' + (i * 60) + ' 32 36)"/>';
  var cs = '';
  for (var j = 0; j < 4; j++) cs += '<line x1="50" y1="54" x2="50" y2="49.6" transform="rotate(' + (j * 90) + ' 50 54)"/>';
  el.innerHTML =
    '<svg viewBox="0 0 64 64" width="64" height="64">' +
    '<g class="wc-frame" fill="none" stroke-linecap="round" stroke-linejoin="round">' +
      '<path class="wc-halo" d="M17 9 L19 30 L40 30 L46 46 L53 46"/>' +
      '<path class="wc-ink" d="M17 9 L19 30 L40 30 L46 46 L53 46"/>' +
    '</g>' +
    '<g class="wc-caster" fill="none" stroke-linecap="round">' +
      '<circle class="wc-halo" cx="50" cy="54" r="5"/>' +
      '<circle class="wc-cdisc" cx="50" cy="54" r="4.6"/>' +
      '<g class="wc-cspokes">' + cs + '</g>' +
      '<circle class="wc-crim" cx="50" cy="54" r="4.6"/>' +
      '<circle class="wc-chub" cx="50" cy="54" r="1"/>' +
    '</g>' +
    '<g class="wc-wheel" fill="none" stroke-linecap="round">' +
      '<circle class="wc-disc" cx="32" cy="36" r="15"/>' +
      '<g class="wc-spokes">' + spokes + '</g>' +
      '<circle class="wc-rim" cx="32" cy="36" r="15"/>' +
      '<circle class="wc-hub" cx="32" cy="36" r="2.6"/>' +
    '</g></svg>';
  document.body.appendChild(el);
    var wheel = el.querySelector('.wc-wheel'), caster = el.querySelector('.wc-caster');
  var x = -100, y = -100, lx = null, angle = 0, hot = false, shown = false, raf = 0;
  var HOT = 'a,button,[role="button"],summary,label[for],select,.btn-primary,.btn-secondary,.btn-tertiary,[onclick],.cmp-toggle button,input[type="submit"],input[type="button"],input[type="checkbox"],input[type="radio"]';
  var TEXT = 'input:not([type="submit"]):not([type="button"]):not([type="checkbox"]):not([type="radio"]),textarea,[contenteditable="true"]';
  function tick() {
    raf = 0;
    if (hot && !reduce) angle += 14; else if (hot) angle += 2;
    el.style.transform = 'translate3d(' + (x - 32) + 'px,' + (y - 36) + 'px,0) scale(.82)';
    wheel.style.transform = 'rotate(' + angle + 'deg)';
    caster.style.transform = 'rotate(' + (angle * 2.6) + 'deg)';
    if (hot && !reduce) raf = requestAnimationFrame(tick);
  }
  function kick() { if (!raf) raf = requestAnimationFrame(tick); }
  document.addEventListener('pointermove', function (e) {
    if (e.pointerType && e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
    x = e.clientX; y = e.clientY;
    if (lx !== null && !reduce) angle += (x - lx) * 3.2;
    lx = x;
    var t = e.target && e.target.closest ? e.target : null;
    var h = false;
    if (t && !t.closest(TEXT)) {
      var root = document.documentElement;
      root.classList.remove('wc-active');
      h = !!t.closest(HOT) || getComputedStyle(t).cursor === 'pointer';
      if (h) root.classList.add('wc-active');
    }
    if (h !== hot) { hot = h; el.classList.toggle('wc-hot', h); el.classList.toggle('wc-on', h); }
    kick();
  }, { passive: true });
  document.documentElement.addEventListener('mouseleave', function () { el.classList.remove('wc-on', 'wc-hot'); document.documentElement.classList.remove('wc-active'); hot = false; });
  document.addEventListener('pointerdown', function () { el.classList.add('wc-down'); });
  document.addEventListener('pointerup', function () { el.classList.remove('wc-down'); });
})();
