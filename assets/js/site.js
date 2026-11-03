/* ============================================================
   J58 / EZER — SHARED SITE SCRIPT
   Mobile menu · high-contrast · text size · FAQ accordion · scroll reveal
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Mobile menu ---------- */
  var hamburger = document.getElementById("hamburger");
  var drawer = document.getElementById("mobileDrawer");
  if (hamburger && drawer) {
    hamburger.addEventListener("click", function () {
      var open = drawer.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", open ? "true" : "false");
      var L = { en: ["Open navigation menu", "Close navigation menu"], nl: ["Open navigatiemenu", "Sluit navigatiemenu"], de: ["Navigationsmenü öffnen", "Navigationsmenü schließen"] }[(document.documentElement.lang || "en").slice(0, 2)] || ["Open navigation menu", "Close navigation menu"];
      hamburger.setAttribute("aria-label", open ? L[1] : L[0]);
    });
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        drawer.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Nav: frosted blue on scroll ---------- */
  var navWrap = document.getElementById("navWrap");
  if (navWrap) {
    var onScroll = function () {
      if (window.scrollY > 12) navWrap.classList.add("scrolled");
      else navWrap.classList.remove("scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- High-contrast toggle ---------- */
  var hcToggle = document.getElementById("hcToggle");
  if (hcToggle) {
    hcToggle.addEventListener("click", function () {
      var on = document.documentElement.classList.toggle("hc");
      hcToggle.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  /* ---------- Text size ---------- */
  var ts = 1;
  function setTS(v) {
    ts = Math.min(1.4, Math.max(0.85, v));
    document.documentElement.style.setProperty("--ts", ts.toFixed(2));
  }
  var plus = document.getElementById("textPlus");
  var minus = document.getElementById("textMinus");
  if (plus) plus.addEventListener("click", function () { setTS(ts + 0.1); });
  if (minus) minus.addEventListener("click", function () { setTS(ts - 0.1); });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".acc-trigger").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var expanded = btn.getAttribute("aria-expanded") === "true";
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      btn.setAttribute("aria-expanded", expanded ? "false" : "true");
      if (panel) panel.style.maxHeight = expanded ? "0" : panel.scrollHeight + "px";
    });
  });

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Orbit benefits: highlight one-by-one on scroll ---------- */
  var orbitItems = document.querySelectorAll(".orbit-item");
  if (orbitItems.length) {
    if ("IntersectionObserver" in window) {
      var io3 = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) e.target.classList.add("on");
        });
      }, { threshold: 0.7, rootMargin: "0px 0px -15% 0px" });
      orbitItems.forEach(function (el) { io3.observe(el); });
    } else {
      orbitItems.forEach(function (el) { el.classList.add("on"); });
    }
  }

  /* ---------- Footer year ---------- */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Demo forms: prevent real submit (no backend yet) ---------- */
  document.querySelectorAll("form[data-demo]").forEach(function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = f.querySelector(".form-success");
      if (note) { note.hidden = false; note.focus(); }
      f.querySelectorAll("input,textarea,select,button").forEach(function (el) {
        if (el.type !== "hidden") el.setAttribute("disabled", "true");
      });
    });
  });
})();
