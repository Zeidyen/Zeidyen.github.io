/* Theme toggle for the front-of-site pages. Mirrors teaching/assets/app.js. */
(function () {
  "use strict";
  var btn = document.getElementById("themeBtn");
  if (!btn) return;
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
})();
