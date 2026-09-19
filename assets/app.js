/* Course site renderer. Reads window.COURSE from data/course.js.
   No dependencies, no build step. Edit data/course.js, not this file. */
(function () {
  "use strict";

  var C = window.COURSE || {};
  var $ = function (id) { return document.getElementById(id); };

  /* ---------------------------------------------------------- utilities */

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // "2026-10-03" + "23:59" -> Date in the viewer's own time zone (never UTC-shifted)
  function toDate(day, time) {
    if (!day) return null;
    var d = /^(\d{4})-(\d{2})-(\d{2})$/.exec(day.trim());
    if (!d) return null;
    var t = /^(\d{1,2}):(\d{2})$/.exec((time || "23:59").trim()) || [0, 23, 59];
    var out = new Date(+d[1], +d[2] - 1, +d[3], +t[1], +t[2], 0, 0);
    return isNaN(out.getTime()) ? null : out;
  }

  function fmtDate(dt) {
    if (!dt) return "";
    return dt.toLocaleDateString(undefined, {
      weekday: "short", day: "numeric", month: "short", year: "numeric"
    });
  }

  function fmtTime(dt) {
    return dt.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  }

  function startOfDay(dt) {
    return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
  }

  // Whole calendar days from today to dt. 0 = today, 1 = tomorrow, -1 = yesterday.
  function daysAway(dt) {
    var MS = 86400000;
    return Math.round((startOfDay(dt) - startOfDay(new Date())) / MS);
  }

  function relative(dt) {
    var n = daysAway(dt);
    if (n === 0)  return "today";
    if (n === 1)  return "tomorrow";
    if (n === -1) return "yesterday";
    if (n > 0)    return "in " + n + " days";
    return Math.abs(n) + " days ago";
  }

  function extOf(path) {
    var m = /\.([a-z0-9]{1,5})(?:[?#].*)?$/i.exec(path || "");
    return m ? m[1].toUpperCase() : "FILE";
  }

  /* -------------------------------------------------------- rendering bits */

  function fileLinks(files) {
    var list = (files || []).filter(function (f) { return f && f.path; });
    if (!list.length) return '<p class="nofiles">Not posted yet.</p>';
    return '<div class="files">' + list.map(function (f) {
      return '<a class="file" href="' + esc(f.path) + '">' +
             '<span class="ext">' + esc(extOf(f.path)) + "</span>" +
             esc(f.label || f.path.split("/").pop()) + "</a>";
    }).join("") + "</div>";
  }

  function emptyBox(msg) {
    return '<p class="empty">' + esc(msg) + "</p>";
  }

  /* -------------------------------------------------------------- header */

  function renderChrome() {
    var c = C.course || {};
    $("brandCode").textContent  = c.code || "";
    $("brandTitle").textContent = c.title || "Course materials";
    document.title = (c.code ? c.code + " — " : "") + (c.title || "Course materials");

    var i = C.instructor || {};
    $("footInstructor").innerHTML =
      esc(i.name || "") + (i.title ? ", " + esc(i.title) : "") +
      (c.institution ? " · " + esc(c.institution) : "") +
      (i.email ? ' · <a href="mailto:' + esc(i.email) + '">' + esc(i.email) + "</a>" : "");
    $("footUpdated").textContent = "This page is updated as the course goes on.";
  }

  /* ---------------------------------------------------------------- home */

  function renderHome() {
    var c = C.course || {}, i = C.instructor || {};

    $("homeTerm").textContent  = [c.term, c.institution].filter(Boolean).join(" · ");
    $("homeTitle").textContent = c.title || "Course materials";
    $("homeDesc").textContent  = c.description || "";

    var facts = [
      ["Course code",  esc(c.code)],
      ["Class times",  esc(c.meetingTimes)],
      ["Location",     esc(c.location)],
      ["Instructor",   esc(i.name) + (i.title ? '<br><span class="muted">' + esc(i.title) + "</span>" : "")],
      ["Email",        i.email ? '<a href="mailto:' + esc(i.email) + '">' + esc(i.email) + "</a>" : ""],
      ["Office hours", esc(i.officeHours) + (i.office ? '<br><span class="muted">' + esc(i.office) + "</span>" : "")]
    ].filter(function (f) { return f[1]; });

    $("homeFacts").innerHTML = facts.map(function (f) {
      return '<dl class="fact"><dt>' + f[0] + "</dt><dd>" + f[1] + "</dd></dl>";
    }).join("");

    // announcements, newest first
    var anns = (C.announcements || []).slice().sort(function (a, b) {
      return String(b.date || "").localeCompare(String(a.date || ""));
    });
    $("homeAnnouncements").innerHTML = anns.length
      ? anns.map(function (a) {
          var d = toDate(a.date, "09:00");
          return '<article class="card"><div class="card-head"><div class="card-title"><h3>' + esc(a.title) + "</h3></div>" +
                 (d ? '<span class="badge past">' + esc(fmtDate(d)) + "</span>" : "") +
                 '</div><p class="desc">' + esc(a.body) + "</p></article>";
        }).join("")
      : emptyBox("No announcements yet.");

    // next lecture + next deadline
    var bits = [];
    var nextLec = (C.lectures || [])
      .map(function (l) { return { l: l, d: toDate(l.date, "23:59") }; })
      .filter(function (x) { return x.d && daysAway(x.d) >= 0; })
      .sort(function (a, b) { return a.d - b.d; })[0];

    if (nextLec) {
      bits.push(
        '<article class="card"><div class="card-head">' +
        '<div class="wk"><b>' + esc(nextLec.l.week) + "</b><span>wk</span></div>" +
        '<div class="card-title"><h3>' + esc(nextLec.l.title) + "</h3>" +
        '<p class="card-meta">Next class · ' + esc(fmtDate(nextLec.d)) +
        " · " + esc(relative(nextLec.d)) + "</p></div>" +
        '</div>' + fileLinks(nextLec.l.files) + "</article>"
      );
    }

    var nextAsg = (C.assignments || [])
      .map(function (a) { return { a: a, d: toDate(a.due, a.dueTime) }; })
      .filter(function (x) { return x.d && x.d >= new Date(); })
      .sort(function (x, y) { return x.d - y.d; })[0];

    if (nextAsg) bits.push(assignmentCard(nextAsg.a, "Next deadline"));

    $("homeNext").innerHTML = bits.length
      ? bits.join("")
      : emptyBox("Nothing scheduled. Check back soon.");
  }

  /* ------------------------------------------------------------ lectures */

  function lectureCard(l) {
    var d = toDate(l.date, "23:59");
    return '<article class="card"><div class="card-head">' +
      '<div class="wk"><b>' + esc(l.week) + "</b><span>wk</span></div>" +
      '<div class="card-title"><h3>' + esc(l.title) + "</h3>" +
      (d ? '<p class="card-meta">' + esc(fmtDate(d)) + "</p>" : "") +
      "</div></div>" +
      ((l.topics && l.topics.length)
        ? '<ul class="topics">' + l.topics.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>"
        : "") +
      fileLinks(l.files) + "</article>";
  }

  function renderLectures() {
    var box = $("lectureList"), input = $("lecSearch");

    function draw() {
      var q = input.value.trim().toLowerCase();
      var rows = (C.lectures || []).slice().sort(function (a, b) {
        return (a.week || 0) - (b.week || 0);
      });
      if (q) {
        rows = rows.filter(function (l) {
          return (["week " + l.week, l.week, l.title, l.date].join(" ") + " " +
                  (l.topics || []).join(" ")).toLowerCase().indexOf(q) > -1;
        });
      }
      box.innerHTML = rows.length
        ? rows.map(lectureCard).join("")
        : emptyBox(q ? "No lectures match “" + q + "”." : "No lectures posted yet.");
    }

    input.addEventListener("input", draw);
    draw();
  }

  /* --------------------------------------------------------- assignments */

  function assignmentStatus(a) {
    var d = toDate(a.due, a.dueTime);
    if (!d) return { cls: "tba", text: "Due date TBA", past: false };
    if (d < new Date()) return { cls: "past", text: "Closed · was due " + relative(d), past: true };
    var n = daysAway(d);
    return {
      cls:  n <= 3 ? "soon" : "open",
      text: "Due " + fmtDate(d) + ", " + fmtTime(d) + " · " + relative(d),
      past: false
    };
  }

  function assignmentCard(a, label) {
    var s = assignmentStatus(a);
    return '<article class="card"><div class="card-head"><div class="card-title"><h3>' +
      (a.id ? '<span class="muted">' + esc(a.id) + "</span> · " : "") + esc(a.title) + "</h3>" +
      (label ? '<p class="card-meta">' + esc(label) + "</p>" : "") +
      '</div><span class="badge ' + s.cls + '">' + esc(s.text) + "</span></div>" +
      (a.description ? '<p class="desc">' + esc(a.description) + "</p>" : "") +
      (a.points ? '<p class="card-meta">Worth ' + esc(a.points) + " marks</p>" : "") +
      fileLinks(a.files) + "</article>";
  }

  function renderAssignments() {
    var box = $("assignmentList"), input = $("asgSearch");
    var seg = document.querySelector("#view-assignments .seg");
    var mode = "all";

    function draw() {
      var q = input.value.trim().toLowerCase();
      var rows = (C.assignments || []).slice().sort(function (a, b) {
        var x = toDate(a.due, a.dueTime), y = toDate(b.due, b.dueTime);
        if (!x) return 1;
        if (!y) return -1;
        return x - y;
      });

      if (mode !== "all") {
        rows = rows.filter(function (a) {
          return assignmentStatus(a).past === (mode === "past");
        });
      }
      if (q) {
        rows = rows.filter(function (a) {
          return [a.id, a.title, a.description].join(" ").toLowerCase().indexOf(q) > -1;
        });
      }

      box.innerHTML = rows.length
        ? rows.map(function (a) { return assignmentCard(a, ""); }).join("")
        : emptyBox(
            q ? "No assignments match “" + q + "”."
              : mode === "open" ? "Nothing is open right now."
              : mode === "past" ? "No past assignments yet."
              : "No assignments posted yet."
          );
    }

    seg.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-filter]");
      if (!b) return;
      mode = b.dataset.filter;
      seg.querySelectorAll("button").forEach(function (x) { x.classList.toggle("on", x === b); });
      draw();
    });
    input.addEventListener("input", draw);
    draw();
  }

  /* ----------------------------------------------------------- resources */

  function renderResources() {
    var rows = C.resources || [];
    $("resourceList").innerHTML = rows.length
      ? rows.map(function (r) {
          var href = r.path || r.url;
          var external = !r.path && !!r.url;
          return '<article class="card"><div class="card-head"><div class="card-title"><h3>' + esc(r.title) + "</h3>" +
            (r.note ? '<p class="card-meta">' + esc(r.note) + "</p>" : "") + "</div></div>" +
            (href
              ? '<div class="files"><a class="file" href="' + esc(href) + '"' +
                (external ? ' target="_blank" rel="noopener"' : "") + '>' +
                '<span class="ext">' + (external ? "LINK" : esc(extOf(href))) + "</span>" +
                (external ? "Open link" : "Download") + "</a></div>"
              : "") +
            "</article>";
        }).join("")
      : emptyBox("No extra resources posted yet.");
  }

  /* -------------------------------------------------------------- submit */

  function renderSubmit() {
    var s = C.submission || {};
    var html = "";

    if (s.method) html += '<p class="lede">Submission method: <strong>' + esc(s.method) + "</strong></p>";

    if (s.steps && s.steps.length) {
      html += '<ol class="steps">' + s.steps.map(function (t) {
        return "<li>" + esc(t) + "</li>";
      }).join("") + "</ol>";
    }

    if (s.url) {
      html += '<p><a class="btn" href="' + esc(s.url) + '" target="_blank" rel="noopener">Open the submission form</a></p>';
    } else if (s.email) {
      html += '<p><a class="btn" href="mailto:' + esc(s.email) + '">Submit by email to ' + esc(s.email) + "</a></p>";
    }

    if (s.latePolicy) {
      html += '<h2>Late work</h2><p class="note">' + esc(s.latePolicy) + "</p>";
    }

    $("submitBody").innerHTML = html || emptyBox("Submission instructions coming soon.");
  }

  /* ------------------------------------------------------------- routing */

  var TABS = ["home", "lectures", "assignments", "resources", "submit"];

  function route() {
    var want = (location.hash || "").replace(/^#/, "");
    if (TABS.indexOf(want) === -1) want = "home";

    TABS.forEach(function (t) {
      $("view-" + t).hidden = t !== want;
      var link = document.querySelector('#tabs a[data-tab="' + t + '"]');
      if (t === want) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });

    // Don't fight the browser when it is restoring a scroll position.
    window.scrollTo(0, 0);
  }

  /* --------------------------------------------------------------- theme */

  function initTheme() {
    var btn = $("themeBtn");
    var saved = null;
    try { saved = localStorage.getItem("theme"); } catch (e) { /* private mode */ }
    if (saved === "light" || saved === "dark") {
      document.documentElement.setAttribute("data-theme", saved);
    }
    btn.addEventListener("click", function () {
      var cur = document.documentElement.getAttribute("data-theme");
      if (!cur) {
        cur = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      }
      var next = cur === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) { /* ignore */ }
    });
  }

  /* ---------------------------------------------------------------- boot */

  if (!window.COURSE) {
    document.getElementById("main").innerHTML =
      '<p class="empty">Could not load <code>data/course.js</code>. ' +
      "Check that the file exists and has no typos.</p>";
    return;
  }

  renderChrome();
  renderHome();
  renderLectures();
  renderAssignments();
  renderResources();
  renderSubmit();
  initTheme();
  window.addEventListener("hashchange", route);
  route();
})();
