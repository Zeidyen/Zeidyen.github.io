/* Front-of-site behaviour: theme toggle + scroll reveal.
   No dependencies. Replaces the old jQuery/waypoints/animate.css stack. */
(function () {
  "use strict";

  /* ------------------------------------------------------------- theme */
  var btn = document.getElementById("themeBtn");
  if (btn) {
    var saved = null;
    try { saved = localStorage.getItem("theme"); } catch (e) { /* private mode */ }
    if (saved === "light" || saved === "dark") {
      document.documentElement.setAttribute("data-theme", saved);
    }
    btn.addEventListener("click", function () {
      var cur = document.documentElement.getAttribute("data-theme");
      if (!cur) cur = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      var next = cur === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) { /* ignore */ }
    });
  }

  /* ------------------------------------------------------ scroll reveal */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) return;   // leave everything visible

  // Same rhythm as the old template: 85% of the viewport, 200ms between items.
  var STAGGER = 110, TRIGGER = "0px 0px -15% 0px";

  // Items that animate, in document order. Cards alternate left/right the way
  // the old page did; headings and wide blocks rise from below.
  var SIDE = ".tile, .stat, .pub, .proj, .dash, .hl, .ccard, .contact-card";
  var UP   = "main > h2.sec-h, .hero-split, main > .lede, .chips, .linkrow, .minihead, .yr-group";

  var nodes = Array.prototype.slice.call(document.querySelectorAll(SIDE + ", " + UP));
  if (!nodes.length) return;

  var side = 0;
  nodes.forEach(function (el) {
    if (el.matches(SIDE)) { el.dataset.fx = (side++ % 2) ? "right" : "left"; }
    else                  { el.dataset.fx = "up"; }
    el.classList.add("reveal");
  });

  // Only gate visibility once we know the observer will run.
  document.documentElement.classList.add("js-reveal");

  var batch = [], flushing = null;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      io.unobserve(en.target);
      batch.push(en.target);
    });
    if (!batch.length || flushing) return;
    flushing = setTimeout(function () {
      batch.forEach(function (el, k) {
        setTimeout(function () { el.classList.add("is-in"); }, k * STAGGER);
      });
      batch = []; flushing = null;
    }, 90);
  }, { rootMargin: TRIGGER, threshold: 0 });

  // Anything already within the viewport on load is revealed straight away,
  // staggered. The observer's -15% trigger line is meant for content scrolled
  // into view; applying it at load would leave visible cards blank.
  var vh = window.innerHeight, first = [], rest = [];
  nodes.forEach(function (el) {
    (el.getBoundingClientRect().top < vh ? first : rest).push(el);
  });
  first.forEach(function (el, k) {
    setTimeout(function () { el.classList.add("is-in"); }, 60 + k * STAGGER);
  });
  rest.forEach(function (el) { io.observe(el); });

  // Safety net: if anything is still hidden after 4s, show it.
  setTimeout(function () {
    document.querySelectorAll(".reveal:not(.is-in)").forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) el.classList.add("is-in");
    });
  }, 4000);
})();
