/* Academic site renderer. Reads window.SITE from data/content.js.
   No dependencies, no build step. Edit data/content.js, not this file. */
(function () {
  "use strict";

  var S = window.SITE || {};
  var $ = function (id) { return document.getElementById(id); };

  /* ---------------------------------------------------------- utilities */

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // Hide any field the author has not filled in yet.
  function filled(v) {
    return v && String(v).trim() && String(v).indexOf("EDIT ME") !== 0;
  }

  // "2026-10-03" + "23:59" -> Date in the viewer's own time zone (never UTC-shifted)
  function toDate(day, time) {
    if (!day) return null;
    var d = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(day).trim());
    if (!d) return null;
    var t = /^(\d{1,2}):(\d{2})$/.exec(String(time || "23:59").trim()) || [0, 23, 59];
    var out = new Date(+d[1], +d[2] - 1, +d[3], +t[1], +t[2], 0, 0);
    return isNaN(out.getTime()) ? null : out;
  }

  function fmtDate(dt) {
    return dt ? dt.toLocaleDateString(undefined,
      { weekday: "short", day: "numeric", month: "short", year: "numeric" }) : "";
  }
  function fmtTime(dt) {
    return dt.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  }
  function startOfDay(dt) { return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()); }

  // Whole calendar days from today. 0 = today, 1 = tomorrow, -1 = yesterday.
  function daysAway(dt) { return Math.round((startOfDay(dt) - startOfDay(new Date())) / 86400000); }

  function relative(dt) {
    var n = daysAway(dt);
    if (n === 0)  return "today";
    if (n === 1)  return "tomorrow";
    if (n === -1) return "yesterday";
    return n > 0 ? "in " + n + " days" : Math.abs(n) + " days ago";
  }

  function extOf(path) {
    var m = /\.([a-z0-9]{1,5})(?:[?#].*)?$/i.exec(path || "");
    return m ? m[1].toUpperCase() : "FILE";
  }

  function fileLinks(files, emptyMsg) {
    var list = (files || []).filter(function (f) { return f && f.path; });
    if (!list.length) return '<p class="nofiles">' + esc(emptyMsg || "Not posted yet.") + "</p>";
    return '<div class="files">' + list.map(function (f) {
      return '<a class="file" href="' + esc(f.path) + '">' +
             '<span class="ext">' + esc(extOf(f.path)) + "</span>" +
             esc(f.label || f.path.split("/").pop()) + "</a>";
    }).join("") + "</div>";
  }

  function emptyBox(msg) { return '<p class="empty">' + esc(msg) + "</p>"; }

  function factGrid(pairs) {
    var rows = pairs.filter(function (p) { return p[1]; });
    return rows.map(function (p) {
      return '<dl class="fact"><dt>' + p[0] + "</dt><dd>" + p[1] + "</dd></dl>";
    }).join("");
  }

  function courseById(id) {
    var all = S.courses || [];
    for (var i = 0; i < all.length; i++) if (all[i].id === id) return all[i];
    return null;
  }

  function courseLabel(c) {
    return filled(c.code) ? c.code : c.title;
  }

  /* --------------------------------------------------------- assignments */

  function assignmentStatus(a) {
    var d = toDate(a.due, a.dueTime);
    if (!d) return { cls: "tba", text: "Due date to be announced", past: false, date: null };
    if (d < new Date()) return { cls: "past", text: "Closed · was due " + relative(d), past: true, date: d };
    var n = daysAway(d);
    return {
      cls:  n <= 3 ? "soon" : "open",
      text: "Due " + fmtDate(d) + ", " + fmtTime(d) + " · " + relative(d),
      past: false, date: d
    };
  }

  function assignmentCard(a, label) {
    var s = assignmentStatus(a);
    return '<article class="card"><div class="card-head"><div class="card-title"><h3>' +
      (a.id ? '<span class="muted">' + esc(a.id) + "</span> · " : "") + esc(a.title) + "</h3>" +
      (label ? '<p class="card-meta">' + label + "</p>" : "") +
      '</div><span class="badge ' + s.cls + '">' + esc(s.text) + "</span></div>" +
      (a.description ? '<p class="desc">' + esc(a.description) + "</p>" : "") +
      (a.points ? '<p class="card-meta">Worth ' + esc(a.points) + " marks</p>" : "") +
      fileLinks(a.files) + "</article>";
  }

  /* --------------------------------------------------------------- chrome */

  function renderChrome() {
    var p = S.person || {};
    $("brandName").textContent = p.name || "Course materials";
    $("brandSub").textContent  = filled(p.institution) ? p.institution : "";
    document.title = p.name || "Course materials";

    var par = p.parentSite || {};
    if (par.url) {
      $("footLine").insertAdjacentHTML("beforebegin",
        '<p class="footback"><a href="' + esc(par.url) + '">\u2190 ' +
        esc(par.label || "Back to my main site") + "</a></p>");
    }

    $("footLine").innerHTML =
      esc(p.name || "") +
      (filled(p.title) ? " · " + esc(p.title) : "") +
      (filled(p.institution) ? " · " + esc(p.institution) : "") +
      (p.email ? ' · <a href="mailto:' + esc(p.email) + '">' + esc(p.email) + "</a>" : "");
  }

  /* ----------------------------------------------------------------- home */

  function courseCard(c) {
    var lec = (c.lectures || []).length;
    var asg = (c.assignments || []).length;
    var open = (c.assignments || []).filter(function (a) {
      return !assignmentStatus(a).past;
    }).length;

    var counts = [];
    counts.push(lec ? lec + (lec === 1 ? " lecture" : " lectures") : "No notes yet");
    if (asg) counts.push(open ? open + " open" : asg + " closed");

    return '<a class="ccard' + (c.current ? " now" : "") + '" href="#course/' + esc(c.id) + '">' +
      (c.current ? '<span class="ccard-now">This semester</span>' : "") +
      (filled(c.code) ? '<span class="ccard-code">' + esc(c.code) + "</span>" : "") +
      "<h3>" + esc(c.title) + "</h3>" +
      (filled(c.term)  ? '<p class="ccard-term">' + esc(c.term) + "</p>" : "") +
      '<p class="ccard-counts">' + esc(counts.join(" · ")) + "</p></a>";
  }

  function renderHome() {
    var p = S.person || {};

    $("homeAffil").textContent = [
      filled(p.title) ? p.title : "", filled(p.institution) ? p.institution : ""
    ].filter(Boolean).join(" · ");
    $("homeName").textContent = p.name || "";
    $("homeBio").textContent  = filled(p.bio) ? p.bio : "";

    var L = p.links || {};
    var buttons = [
      [L.scholar,      "Google Scholar", true],
      [L.orcid,        "ORCID",          true],
      [L.researchgate, "ResearchGate",   true],
      [L.github,       "GitHub",         true],
      [L.cv,      "Curriculum vitae", /^https?:/i.test(L.cv || "")]
    ].filter(function (b) { return filled(b[0]); });

    $("homeLinks").innerHTML = buttons.map(function (b) {
      return '<a class="chip" href="' + esc(b[0]) + '"' +
             (b[2] ? ' target="_blank" rel="noopener"' : "") + ">" + esc(b[1]) + "</a>";
    }).join("");

    var active = (S.courses || []).filter(function (c) { return c.active !== false; });
    $("homeCourses").innerHTML = active.length
      ? active.map(courseCard).join("")
      : emptyBox("No courses listed yet.");

    // announcements, newest first
    var anns = (S.announcements || []).slice().sort(function (a, b) {
      return String(b.date || "").localeCompare(String(a.date || ""));
    });
    $("homeAnnouncements").innerHTML = anns.length
      ? anns.map(function (a) {
          var d = toDate(a.date, "09:00");
          var c = a.course ? courseById(a.course) : null;
          return '<article class="card"><div class="card-head"><div class="card-title"><h3>' +
            esc(a.title) + "</h3>" +
            (c ? '<p class="card-meta"><a href="#course/' + esc(c.id) + '">' +
                 esc(courseLabel(c)) + "</a></p>" : "") +
            "</div>" +
            (d ? '<span class="badge past">' + esc(fmtDate(d)) + "</span>" : "") +
            '</div><p class="desc">' + esc(a.body) + "</p></article>";
        }).join("")
      : emptyBox("No announcements yet.");

    // every open deadline across every course, soonest first
    var due = [];
    (S.courses || []).forEach(function (c) {
      (c.assignments || []).forEach(function (a) {
        var s = assignmentStatus(a);
        if (!s.past && s.date) due.push({ c: c, a: a, d: s.date });
      });
    });
    due.sort(function (x, y) { return x.d - y.d; });

    $("homeDeadlines").innerHTML = due.length
      ? due.slice(0, 5).map(function (x) {
          return assignmentCard(x.a,
            '<a href="#course/' + esc(x.c.id) + '">' + esc(courseLabel(x.c)) + "</a>");
        }).join("")
      : emptyBox("Nothing due at the moment.");
  }

  /* ------------------------------------------------------------- teaching */

  function renderTeaching() {
    var all = S.courses || [];
    var now  = all.filter(function (c) { return c.active !== false; });
    var past = all.filter(function (c) { return c.active === false; });

    $("teachCurrent").innerHTML = now.length
      ? now.map(courseCard).join("")
      : emptyBox("No courses listed yet.");

    $("teachPast").innerHTML = past.length
      ? '<h2 class="sec-h">Previously taught</h2><div class="coursegrid">' +
        past.map(courseCard).join("") + "</div>"
      : "";
  }

  /* --------------------------------------------------------- course page */

  var courseSearchBound = false;
  var currentCourse = null;
  var asgFilter = "all";

  function drawCourseLectures() {
    var c = currentCourse;
    if (!c) return;
    var q = $("cLecSearch").value.trim().toLowerCase();

    var rows = (c.lectures || []).slice().sort(function (a, b) {
      return (a.week || 0) - (b.week || 0);
    });
    if (q) {
      rows = rows.filter(function (l) {
        return (["week " + l.week, l.week, l.title, l.date].join(" ") + " " +
                (l.topics || []).join(" ")).toLowerCase().indexOf(q) > -1;
      });
    }

    $("cLectures").innerHTML = rows.length
      ? rows.map(function (l) {
          var d = toDate(l.date, "23:59");
          return '<article class="card"><div class="card-head">' +
            '<div class="wk"><b>' + esc(l.week) + "</b><span>wk</span></div>" +
            '<div class="card-title"><h3>' + esc(l.title) + "</h3>" +
            (d ? '<p class="card-meta">' + esc(fmtDate(d)) + "</p>" : "") +
            "</div></div>" +
            ((l.topics && l.topics.length)
              ? '<ul class="topics">' + l.topics.map(function (t) {
                  return "<li>" + esc(t) + "</li>";
                }).join("") + "</ul>"
              : "") +
            fileLinks(l.files) + "</article>";
        }).join("")
      : emptyBox(q ? "No lectures match “" + q + "”."
                   : "No lecture notes posted for this course yet.");
  }

  function drawCourseAssignments() {
    var c = currentCourse;
    if (!c) return;

    var rows = (c.assignments || []).slice().sort(function (a, b) {
      var x = toDate(a.due, a.dueTime), y = toDate(b.due, b.dueTime);
      if (!x) return 1;
      if (!y) return -1;
      return x - y;
    });
    if (asgFilter !== "all") {
      rows = rows.filter(function (a) {
        return assignmentStatus(a).past === (asgFilter === "past");
      });
    }

    $("cAssignments").innerHTML = rows.length
      ? rows.map(function (a) { return assignmentCard(a, ""); }).join("")
      : emptyBox(
          asgFilter === "open" ? "Nothing is open right now."
          : asgFilter === "past" ? "No past assignments yet."
          : "No assignments posted for this course yet."
        );
  }

  /* -------------------------------------------------------- welcome panel */

  var REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var galton = null;       // the running board, stopped when the page changes

  // Small line icons, drawn in when their card scrolls into view.
  var ICONS = {
    bars:    '<path class="draw" pathLength="1" d="M5 33H35M9 33V23M16 33V13M23 33V18M30 33V9"/>',
    dice:    '<rect class="draw" pathLength="1" x="8" y="8" width="24" height="24" rx="5"/>' +
             '<circle class="pop" cx="14" cy="14" r="2.2"/><circle class="pop" cx="20" cy="20" r="2.2"/>' +
             '<circle class="pop" cx="26" cy="26" r="2.2"/>',
    bell:    '<path class="draw" pathLength="1" d="M4 32H36M4 31C12 31 14 8 20 8S28 31 36 31"/>',
    scale:   '<path class="draw" pathLength="1" d="M20 6V33M13 33H27M7 12H33M7 12L3 21H11ZM33 12L29 21H37Z"/>',
    range:   '<path class="draw" pathLength="1" d="M5 20H35M10 13V27M30 13V27"/><circle class="pop" cx="20" cy="20" r="3"/>',
    test:    '<circle class="draw" pathLength="1" cx="20" cy="20" r="14"/><path class="draw" pathLength="1" d="M13 20.5L18 25.5L27.5 15"/>',
    scatter: '<circle class="pop" cx="9" cy="29" r="2"/><circle class="pop" cx="14" cy="25" r="2"/>' +
             '<circle class="pop" cx="19" cy="24" r="2"/><circle class="pop" cx="24" cy="17" r="2"/>' +
             '<circle class="pop" cx="30" cy="14" r="2"/><circle class="pop" cx="33" cy="9" r="2"/>' +
             '<path class="draw" pathLength="1" d="M5 32L36 8"/>'
  };

  function drawWelcome(c) {
    if (galton) { galton.stop(); galton = null; }
    var w = c.welcome, box = $("cWelcome");
    if (!w) { box.innerHTML = ""; return; }

    var head = esc(w.headline || "");
    var hl = "statistical thinking";
    if (head.indexOf(hl) !== -1) head = head.replace(hl, '<span class="hl">' + hl + "</span>");

    box.innerHTML =
      '<section class="welcome">' +
        '<div class="welcome-text">' +
          (w.kicker ? '<p class="welcome-kicker">' + esc(w.kicker) + "</p>" : "") +
          '<h2 class="welcome-h">' + head + "</h2>" +
          (w.body || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") +
        "</div>" +
        '<figure class="galton">' +
          '<canvas aria-label="Animated Galton board: balls bounce at random through rows of pegs and pile up into a bell-shaped histogram." role="img"></canvas>' +
          '<figcaption><span class="galton-count">0 balls dropped</span>' +
          (REDUCED ? "" : '<button type="button" class="galton-btn">Pause</button>') +
          "</figcaption>" +
        "</figure>" +
      "</section>" +
      ((w.learn || []).length
        ? '<h2 class="sec-h">' + esc(w.learnTitle || "You will learn to") + "</h2>" +
          '<div class="learn">' + w.learn.map(function (l, i) {
            return '<article class="learn-card reveal" style="--i:' + i + '">' +
              '<svg class="learn-icon" viewBox="0 0 40 40" aria-hidden="true">' + (ICONS[l.icon] || "") + "</svg>" +
              '<div><p class="learn-ch">' + esc(l.chapters || "") + "</p>" +
              "<h3>" + esc(l.title) + "</h3><p>" + esc(l.text) + "</p></div></article>";
          }).join("") + "</div>"
        : "") +
      (w.closing ? '<p class="welcome-close reveal">' + esc(w.closing) + "</p>" : "");

    revealOnScroll(box);
    galton = startGalton(box.querySelector(".galton"));
  }

  function revealOnScroll(root) {
    var items = root.querySelectorAll(".reveal");
    if (REDUCED || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.2 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* Galton board. Every ball makes ROWS left/right choices, so it lands in
     bin k with the binomial probability C(ROWS,k)/2^ROWS; the dashed curve
     is that expectation for however many balls have fallen so far. */
  function startGalton(fig) {
    var ROWS = 11, BINS = ROWS + 1, PER_CYCLE = 360, SPAWN_MS = 70, SPEED = 7;
    var canvas = fig.querySelector("canvas"), ctx = canvas.getContext("2d");
    var countEl = fig.querySelector(".galton-count"), btn = fig.querySelector(".galton-btn");
    var pmf = [], c = 1;
    for (var k = 0; k <= ROWS; k++) { pmf.push(c / Math.pow(2, ROWS)); c = c * (ROWS - k) / (k + 1); }
    var peak = Math.max.apply(null, pmf);

    var L = {}, col = {}, balls = [], counts, dropped, landed, holdUntil = 0;
    var running = !REDUCED, visible = true, raf = 0, last = 0, spawnAcc = 0, frame = 0;

    function colours() {
      var cs = getComputedStyle(document.documentElement);
      ["--accent", "--accent-soft", "--line-2", "--ink-3", "--panel"].forEach(function (v) {
        col[v] = cs.getPropertyValue(v).trim();
      });
    }

    function layout() {
      var W = canvas.clientWidth || 300, H = Math.round(Math.min(340, Math.max(260, W * 0.78)));
      var dpr = window.devicePixelRatio || 1;
      canvas.style.height = H + "px";
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var s = Math.min((W - 24) / BINS, 30);
      L = { W: W, H: H, s: s, cx: W / 2, top: 16, vs: (H * 0.5 - 16) / ROWS,
            floor: H - 6, binTop: H * 0.5 + 10, r: Math.max(2.4, s * 0.14) };
    }

    function reset() {
      counts = []; for (var i = 0; i < BINS; i++) counts.push(0);
      balls = []; dropped = 0; landed = 0; holdUntil = 0;
    }

    function pegX(row, rights) { return L.cx + (rights - row / 2) * L.s; }
    function pegY(row) { return L.top + row * L.vs; }
    // Bar height per ball: the tallest expected bar just fills the bin area.
    function unit() { return (L.floor - L.binTop) / (peak * PER_CYCLE * 1.12); }

    function spawn() {
      var path = [];
      for (var i = 0; i < ROWS; i++) path.push(Math.random() < 0.5 ? 0 : 1);
      balls.push({ path: path, t: -0.6 });
      dropped++;
    }

    function ballPos(b) {
      if (b.t < 0) return [L.cx, pegY(0) + b.t * L.vs * 1.2 - L.r * 2];
      var row = Math.min(Math.floor(b.t), ROWS), f = b.t - row, rights = 0;
      for (var i = 0; i < row && i < ROWS; i++) rights += b.path[i];
      if (row >= ROWS) {                                   // falling into its bin
        var x = pegX(ROWS, rights), yStart = pegY(ROWS);
        var yEnd = L.floor - counts[rights] * unit() - L.r;
        return [x, Math.min(yEnd, yStart + f * (yEnd - yStart) * 1.6)];
      }
      var x0 = pegX(row, rights), x1 = pegX(row + 1, rights + b.path[row]);
      var e = f * f * (3 - 2 * f);
      return [x0 + (x1 - x0) * e, pegY(row) - L.r * 1.6 + f * L.vs - Math.sin(Math.PI * f) * L.vs * 0.45];
    }

    function draw() {
      if (frame++ % 30 === 0) colours();
      ctx.clearRect(0, 0, L.W, L.H);

      // pegs
      ctx.fillStyle = col["--line-2"];
      for (var r = 0; r < ROWS; r++) for (var j = 0; j <= r; j++) {
        ctx.beginPath(); ctx.arc(pegX(r, j), pegY(r), Math.max(1.6, L.r * 0.7), 0, 6.283); ctx.fill();
      }

      // bins: dividers and bars
      var u = unit(), bw = L.s * 0.78;
      ctx.strokeStyle = col["--line-2"]; ctx.lineWidth = 1;
      ctx.beginPath();
      for (var d = 0; d <= BINS; d++) {
        var xd = L.cx + (d - BINS / 2) * L.s;
        ctx.moveTo(xd, L.binTop); ctx.lineTo(xd, L.floor);
      }
      ctx.moveTo(L.cx - BINS / 2 * L.s, L.floor); ctx.lineTo(L.cx + BINS / 2 * L.s, L.floor);
      ctx.stroke();
      for (var b = 0; b < BINS; b++) {
        if (!counts[b]) continue;
        var h = counts[b] * u, xb = pegX(ROWS, b) - bw / 2;
        ctx.fillStyle = col["--accent"]; ctx.globalAlpha = 0.2;
        ctx.fillRect(xb, L.floor - h, bw, h); ctx.globalAlpha = 1;
        ctx.fillStyle = col["--accent"]; ctx.fillRect(xb, L.floor - h, bw, Math.min(2, h));
      }

      // expected shape for the balls landed so far
      if (landed > 8) {
        ctx.strokeStyle = col["--ink-3"]; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]);
        ctx.beginPath();
        var mu = ROWS / 2, sd = Math.sqrt(ROWS) / 2;
        for (var q = 0; q <= 60; q++) {
          var kk = -0.5 + q * (BINS / 60);
          var dens = Math.exp(-0.5 * Math.pow((kk - mu) / sd, 2)) / (sd * Math.sqrt(2 * Math.PI));
          var xq = pegX(ROWS, kk), yq = L.floor - landed * dens * u;
          if (q) ctx.lineTo(xq, yq); else ctx.moveTo(xq, yq);
        }
        ctx.stroke(); ctx.setLineDash([]);
      }

      // balls in flight
      ctx.fillStyle = col["--accent"];
      balls.forEach(function (bl) {
        var p = ballPos(bl);
        ctx.beginPath(); ctx.arc(p[0], p[1], L.r, 0, 6.283); ctx.fill();
      });

      countEl.textContent = landed + (landed === 1 ? " ball" : " balls") + " dropped";
    }

    function step(now) {
      raf = 0;
      if (!running || !visible || document.hidden) { last = 0; return; }
      var dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;

      if (holdUntil) {
        if (now > holdUntil) reset();
      } else {
        spawnAcc += dt * 1000;
        while (spawnAcc > SPAWN_MS && dropped < PER_CYCLE) { spawn(); spawnAcc -= SPAWN_MS; }
        if (dropped >= PER_CYCLE) spawnAcc = 0;
        for (var i = balls.length - 1; i >= 0; i--) {
          var bl = balls[i];
          bl.t += dt * SPEED;
          if (bl.t >= ROWS + 0.7) {
            var k = 0; bl.path.forEach(function (v) { k += v; });
            counts[k]++; landed++; balls.splice(i, 1);
          }
        }
        if (landed >= PER_CYCLE) holdUntil = now + 3000;   // admire the curve, then start again
      }
      draw();
      kick();
    }

    function kick() { if (!raf && running && visible && !document.hidden) raf = requestAnimationFrame(step); }

    function onVis() { kick(); }
    function onResize() { layout(); draw(); }

    colours(); layout(); reset();
    if (REDUCED) {
      // No motion: show the finished histogram straight away.
      counts = pmf.map(function (p) { return Math.round(p * PER_CYCLE); });
      landed = counts.reduce(function (a, b) { return a + b; }, 0);
      draw();
      countEl.textContent = landed + " balls, all landed";
    } else {
      draw(); kick();
    }

    var io = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(function (e) {
        visible = e[0].isIntersecting;
        // The course view is still hidden when this is built, so size it on first sight.
        if (visible && canvas.clientWidth && canvas.clientWidth !== L.W) { layout(); draw(); }
        kick();
      });
      io.observe(canvas);
    }
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("resize", onResize);
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    var onScheme = function () { colours(); draw(); };
    if (mq.addEventListener) mq.addEventListener("change", onScheme);
    var themeBtn = $("themeBtn");
    var onTheme = function () { setTimeout(onScheme, 0); };
    if (themeBtn) themeBtn.addEventListener("click", onTheme);
    if (btn) btn.addEventListener("click", function () {
      running = !running;
      btn.textContent = running ? "Pause" : "Play";
      kick();
    });

    return {
      stop: function () {
        running = false;
        if (raf) cancelAnimationFrame(raf);
        if (io) io.disconnect();
        document.removeEventListener("visibilitychange", onVis);
        window.removeEventListener("resize", onResize);
        if (mq.removeEventListener) mq.removeEventListener("change", onScheme);
        if (themeBtn) themeBtn.removeEventListener("click", onTheme);
      }
    };
  }

  function renderCourse(id) {
    var c = courseById(id);
    if (!c) return false;
    currentCourse = c;
    drawWelcome(c);

    $("cTerm").textContent  = [
      filled(c.code) ? c.code : "", filled(c.term) ? c.term : "", filled(c.level) ? c.level : ""
    ].filter(Boolean).join(" · ");
    $("cTitle").textContent = c.title || "";
    $("cDesc").textContent  = filled(c.description) ? c.description : "";

    $("cFacts").innerHTML = factGrid([
      ["Course code", filled(c.code) ? esc(c.code) : ""],
      ["Class times", filled(c.meetingTimes) ? esc(c.meetingTimes) : ""],
      ["Location",    filled(c.location) ? esc(c.location) : ""],
      ["Level",       filled(c.level) ? esc(c.level) : ""]
    ]);

    drawCourseLectures();
    drawCourseAssignments();

    // resources
    var res = c.resources || [];
    $("cResources").innerHTML = res.length
      ? res.map(function (r) {
          var href = r.path || r.url;
          var external = !r.path && !!r.url;
          return '<article class="card"><div class="card-head"><div class="card-title"><h3>' +
            esc(r.title) + "</h3>" +
            (r.note ? '<p class="card-meta">' + esc(r.note) + "</p>" : "") + "</div></div>" +
            (r.files ? fileLinks(r.files) : href
              ? '<div class="files"><a class="file" href="' + esc(href) + '"' +
                (external ? ' target="_blank" rel="noopener"' : "") + ">" +
                '<span class="ext">' + (external ? "LINK" : esc(extOf(href))) + "</span>" +
                (external ? "Open link" : "Download") + "</a></div>"
              : "") + "</article>";
        }).join("")
      : emptyBox("No extra resources for this course yet.");

    // instructions
    var ins = (c.instructions || []).filter(filled);
    $("cInstructions").innerHTML = ins.length
      ? '<div class="notice"><h3>Before you start</h3><ul>' +
        ins.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") +
        "</ul></div>"
      : "";

    // projects use the same card and the same deadline logic as assignments
    var projs = (c.projects || []).slice().sort(function (a, b) {
      var x = toDate(a.due, a.dueTime), y = toDate(b.due, b.dueTime);
      if (!x) return 1;
      if (!y) return -1;
      return x - y;
    });
    $("cProjects").innerHTML = projs.length
      ? projs.map(function (a) { return assignmentCard(a, ""); }).join("")
      : emptyBox("No group projects set for this course yet.");

    // results: a link out to a signed-in lookup, never marks held on this site
    var res = c.results || {};
    $("cResults").innerHTML = res.url
      ? (res.note ? "<p>" + esc(res.note) + "</p>" : "") +
        '<p><a class="btn" href="' + esc(res.url) + '" target="_blank" rel="noopener">' +
        "Check your results</a></p>" +
        '<p class="note">You will be asked to sign in with your university ' +
        "account. Results are not published on this page.</p>"
      : emptyBox("Results for this course have not been released yet.");

    // submission: course-specific if given, otherwise the site default
    var sub = c.submission || S.submission || {};
    var html = "";
    if (sub.method) html += "<p>Submission method: <strong>" + esc(sub.method) + "</strong></p>";
    if (sub.steps && sub.steps.length) {
      html += '<ol class="steps">' + sub.steps.map(function (t) {
        return "<li>" + esc(t) + "</li>";
      }).join("") + "</ol>";
    }
    if (sub.url) {
      html += '<p><a class="btn" href="' + esc(sub.url) +
              '" target="_blank" rel="noopener">Open the submission link</a></p>';
    } else {
      html += '<p class="empty">The submission link for this course has not ' +
              "been posted yet. Check back before the deadline.</p>";
    }
    if (sub.problems) {
      var subj = encodeURIComponent(courseLabel(c) + ": problem with submission");
      html += '<p class="note"><strong>Trouble submitting?</strong> ' + esc(sub.problems) +
              (sub.email
                ? ' <a href="mailto:' + esc(sub.email) + "?subject=" + subj + '">' +
                  esc(sub.email) + "</a>"
                : "") + "</p>";
    }
    if (sub.latePolicy) html += '<p class="note"><strong>Late work.</strong> ' + esc(sub.latePolicy) + "</p>";
    $("cSubmit").innerHTML = html || emptyBox("Submission instructions coming soon.");

    if (!courseSearchBound) {
      courseSearchBound = true;
      $("cLecSearch").addEventListener("input", drawCourseLectures);
      $("cAsgFilter").addEventListener("click", function (e) {
        var b = e.target.closest("button[data-filter]");
        if (!b) return;
        asgFilter = b.dataset.filter;
        $("cAsgFilter").querySelectorAll("button").forEach(function (x) {
          x.classList.toggle("on", x === b);
        });
        drawCourseAssignments();
      });
    }
    return true;
  }

  /* ------------------------------------------------------------- research */

  function renderResearch() {
    var r = S.research || {};

    $("rSummary").textContent = filled(r.summary) ? r.summary : "";

    var ints = (r.interests || []).filter(filled);
    $("rInterests").innerHTML = ints.length
      ? '<div class="chips">' + ints.map(function (t) {
          return '<span class="chip flat">' + esc(t) + "</span>";
        }).join("") + "</div>"
      : "";

    var papers = (r.papers || []).slice().sort(function (a, b) {
      return (b.year || 0) - (a.year || 0);
    });

    $("rPapers").innerHTML = papers.length
      ? papers.map(paperCard).join("")
      : emptyBox("Papers will be listed here.");

    $("rThesis").innerHTML = r.thesis
      ? '<h2 class="sec-h">Doctoral thesis</h2>' + paperCard(r.thesis)
      : "";

    var ong = r.ongoing || [];
    $("rOngoing").innerHTML = ong.length
      ? '<h2 class="sec-h">Ongoing research</h2>' + ong.map(paperCard).join("")
      : "";
  }

  function paperCard(p) {
    return (function () {
          var st = String(p.status || "").toLowerCase();
          var cls = st === "published" || st === "accepted" ? "open"
                  : st === "under review" || st === "preprint" ? "soon"
                  : st === "completed" || st === "thesis" ? "soon" : "tba";
          var out = [];
          if (p.pdf) out.push('<a class="file" href="' + esc(p.pdf) + '">' +
                              '<span class="ext">' + esc(extOf(p.pdf)) + "</span>PDF</a>");
          if (p.url) out.push('<a class="file" href="' + esc(p.url) +
                              '" target="_blank" rel="noopener">' +
                              '<span class="ext">LINK</span>Publisher</a>');

          return '<article class="card paper"><div class="card-head"><div class="card-title">' +
            "<h3>" + esc(p.title) + "</h3>" +
            (filled(p.authors) ? '<p class="card-meta">' + esc(p.authors) + "</p>" : "") +
            (function () {
              // Drop any part still marked EDIT ME so half-filled entries stay tidy.
              var line = [filled(p.venue) ? p.venue : "", p.year || ""]
                           .filter(Boolean).join(", ");
              return line ? '<p class="card-meta em">' + esc(line) + "</p>" : "";
            }()) +
            "</div>" +
            (p.status ? '<span class="badge ' + cls + '">' + esc(p.status) + "</span>" : "") +
            "</div>" +
            (p.note ? '<p class="desc">' + esc(p.note) + "</p>" : "") +
            (out.length ? '<div class="files">' + out.join("") + "</div>" : "") +
            "</article>";
    }());
  }

  /* -------------------------------------------------------------- contact */

  function renderContact() {
    var p = S.person || {};
    $("contactFacts").innerHTML = factGrid([
      ["Email",        p.email ? '<a href="mailto:' + esc(p.email) + '">' + esc(p.email) + "</a>" : ""],
      ["Office",       filled(p.office) ? esc(p.office) : ""],
      ["Office hours", filled(p.officeHours) ? esc(p.officeHours) : ""],
      ["Institution",  filled(p.institution) ? esc(p.institution) : ""]
    ]);
    $("contactCta").innerHTML = p.email
      ? '<p style="margin-top:22px"><a class="btn" href="mailto:' + esc(p.email) + '">Send an email</a></p>'
      : "";
  }

  /* -------------------------------------------------------------- routing */

  var TABS = ["home", "teaching", "research", "contact", "course"];

  function route() {
    var raw  = (location.hash || "").replace(/^#/, "");
    var part = raw.split("/");
    var want = part[0];
    var courseOk = false;

    if (want === "course" && part[1]) {
      courseOk = renderCourse(decodeURIComponent(part[1]));
      if (!courseOk) want = "teaching";     // unknown id: fall back, don't show a blank page
    }
    if (TABS.indexOf(want) === -1) want = "home";
    if (want !== "course" && galton) { galton.stop(); galton = null; }

    TABS.forEach(function (t) { $("view-" + t).hidden = t !== want; });

    // A course page lights up the Teaching tab.
    var lit = want === "course" ? "teaching" : want;
    ["home", "teaching", "research", "contact"].forEach(function (t) {
      var link = document.querySelector('#tabs a[data-tab="' + t + '"]');
      if (t === lit) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });

    window.scrollTo(0, 0);
  }

  /* ---------------------------------------------------------------- theme */

  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem("theme"); } catch (e) { /* private mode */ }
    if (saved === "light" || saved === "dark") {
      document.documentElement.setAttribute("data-theme", saved);
    }
    $("themeBtn").addEventListener("click", function () {
      var cur = document.documentElement.getAttribute("data-theme");
      if (!cur) cur = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      var next = cur === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) { /* ignore */ }
    });
  }

  /* ----------------------------------------------------------------- boot */

  if (!window.SITE) {
    $("main").innerHTML = '<p class="empty">Could not load <code>data/content.js</code>. ' +
      "Check that the file exists and has no typos.</p>";
    return;
  }

  renderChrome();
  renderHome();
  renderTeaching();
  renderResearch();
  renderContact();
  initTheme();
  window.addEventListener("hashchange", route);
  route();
})();
