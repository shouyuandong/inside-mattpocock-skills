/* ==========================================================
   交互：主题、进度、目录高亮、移动端抽屉、技能索引、复制
   ========================================================== */
(function () {
  "use strict";

  var doc = document;
  var root = doc.documentElement;

  /* ---------- 主题 ---------- */
  var themeBtn = doc.getElementById("theme-toggle");
  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    try { localStorage.setItem("mps-theme", theme); } catch (e) {}
    if (themeBtn) {
      themeBtn.setAttribute("aria-label", theme === "dark" ? "切换到浅色主题" : "切换到深色主题");
    }
  }
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
  }
  applyTheme(root.getAttribute("data-theme") || "light");

  /* ---------- 阅读进度 ---------- */
  var progress = doc.getElementById("progress");
  var toTop = doc.getElementById("to-top");
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var h = doc.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var y = h.scrollTop || doc.body.scrollTop;
      if (progress) progress.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
      if (toTop) toTop.classList.toggle("is-visible", y > 900);
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- 目录高亮 ---------- */
  var tocLinks = Array.prototype.slice.call(doc.querySelectorAll("#toc a"));
  var sections = tocLinks
    .map(function (a) {
      var id = a.getAttribute("href").slice(1);
      return { id: id, el: doc.getElementById(id), link: a };
    })
    .filter(function (s) { return s.el; });

  function setActive(id) {
    tocLinks.forEach(function (a) {
      a.classList.toggle("is-active", a.getAttribute("href") === "#" + id);
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var visible = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        visible[entry.target.id] = entry.isIntersecting ? entry.intersectionRatio : 0;
      });
      var best = null;
      sections.forEach(function (s) {
        var r = visible[s.id] || 0;
        if (r > 0 && (!best || s.el.offsetTop > best.el.offsetTop)) best = s;
      });
      if (best) setActive(best.id);
    }, { rootMargin: "-18% 0px -62% 0px", threshold: [0, 0.01, 0.25, 0.5, 1] });
    sections.forEach(function (s) { io.observe(s.el); });
  }

  /* ---------- 移动端抽屉 ---------- */
  var menuBtn = doc.getElementById("menu-btn");
  var backdrop = doc.getElementById("drawer-backdrop");
  var rail = doc.getElementById("rail");

  function setDrawer(open) {
    doc.body.classList.toggle("nav-open", open);
    if (menuBtn) menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    if (open && rail) {
      var first = rail.querySelector("a, button");
      if (first) first.focus();
    }
  }
  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      setDrawer(!doc.body.classList.contains("nav-open"));
    });
  }
  if (backdrop) backdrop.addEventListener("click", function () { setDrawer(false); });
  tocLinks.forEach(function (a) {
    a.addEventListener("click", function () {
      if (window.innerWidth <= 1024) setDrawer(false);
    });
  });
  doc.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && doc.body.classList.contains("nav-open")) setDrawer(false);
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 1024 && doc.body.classList.contains("nav-open")) setDrawer(false);
  });

  /* ---------- 代码块复制 ---------- */
  Array.prototype.forEach.call(doc.querySelectorAll(".code"), function (box) {
    var pre = box.querySelector("pre");
    if (!pre) return;
    var btn = doc.createElement("button");
    btn.className = "copy-btn";
    btn.type = "button";
    btn.textContent = "复制";
    btn.setAttribute("aria-label", "复制代码");
    btn.addEventListener("click", function () {
      var text = pre.innerText;
      var done = function () {
        btn.textContent = "已复制";
        btn.classList.add("is-done");
        setTimeout(function () {
          btn.textContent = "复制";
          btn.classList.remove("is-done");
        }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text, done); });
      } else {
        fallbackCopy(text, done);
      }
    });
    box.appendChild(btn);
  });

  function fallbackCopy(text, done) {
    var ta = doc.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    doc.body.appendChild(ta);
    ta.select();
    try { doc.execCommand("copy"); done(); } catch (e) {}
    doc.body.removeChild(ta);
  }

  /* ---------- 技能索引 ---------- */
  var data = window.SKILLS || [];
  var grid = doc.getElementById("skill-grid");
  var empty = doc.getElementById("skill-empty");
  var countEl = doc.getElementById("result-count");
  var searchEl = doc.getElementById("skill-search");
  var chipsEl = doc.getElementById("bucket-chips");
  var modeBtn = doc.getElementById("mode-toggle");
  var dialog = doc.getElementById("skill-dialog");
  var dTitle = doc.getElementById("dialog-title");
  var dSub = doc.getElementById("dialog-sub");
  var dBody = doc.getElementById("dialog-body");
  var dClose = doc.getElementById("dialog-close");

  var BUCKETS = [
    { key: "all", label: "全部" },
    { key: "eng", label: "工程" },
    { key: "prod", label: "生产力" },
    { key: "misc", label: "杂项" },
    { key: "prog", label: "进行中" }
  ];
  var BUCKET_NAME = { eng: "engineering", prod: "productivity", misc: "misc", prog: "in-progress" };

  /* 补充英文检索词，避免用户搜 debug、refactor 之类命中不到中文说明 */
  var ALIASES = {
    "ask-matt": "router which skill flow",
    "grill-with-docs": "interview glossary adr",
    "grilling": "interview questions design tree",
    "grill-me": "interview questions grill",
    "triage": "issue triage bug report label",
    "improve-codebase-architecture": "refactor architecture review deepening",
    "setup-matt-pocock-skills": "setup config install tracker",
    "to-spec": "spec specification requirement",
    "to-tickets": "ticket tickets issue slicing dependency",
    "implement": "build code task",
    "implement-spec": "parallel subagent worktree integration",
    "wayfinder": "plan map roadmap decision fog",
    "retro": "retrospective environment improvement",
    "prototype": "prototype spike experiment",
    "diagnosing-bugs": "debug debugging performance regression flaky",
    "research": "research investigate docs sources",
    "tdd": "test testing red green refactor",
    "domain-modeling": "glossary adr domain term",
    "codebase-design": "module deep seam interface design",
    "code-review": "review pr diff standards",
    "pr": "pull request body merge danger",
    "wizard": "setup wizard onboarding credentials",
    "handoff": "handoff context compact continue",
    "teach": "learn learning teaching lesson",
    "to-questionnaire": "questionnaire survey stakeholder",
    "wait-what": "explain clarify rephrase",
    "writing-for-agents": "prompt skill claude agents write",
    "git-guardrails-claude-code": "git safety hook guardrail",
    "migrate-to-shoehorn": "typescript test assertion as",
    "scaffold-exercises": "course exercise scaffold",
    "setup-pre-commit": "husky lint staged precommit",
    "chief-of-staff": "delegate wiki subagent",
    "claude-handoff": "background agent handoff",
    "loop-me": "workflow spec design",
    "setup-ts-deep-modules": "typescript dependency cruiser module",
    "software-factory": "factory agents pipeline",
    "writing-fragments": "writing explore fragments",
    "writing-shape": "writing article shape",
    "writing-beats": "writing beats journey"
  };

  var state = { q: "", bucket: "all", userOnly: false };

  function countIn(key) {
    if (key === "all") return data.length;
    return data.filter(function (s) { return s.bucket === key; }).length;
  }

  function renderChips() {
    if (!chipsEl) return;
    chipsEl.innerHTML = "";
    BUCKETS.forEach(function (b) {
      var btn = doc.createElement("button");
      btn.type = "button";
      btn.className = "chip";
      btn.setAttribute("aria-pressed", state.bucket === b.key ? "true" : "false");
      btn.innerHTML = b.label + '<span class="chip-count">' + countIn(b.key) + "</span>";
      btn.addEventListener("click", function () {
        state.bucket = b.key;
        renderChips();
        renderGrid();
      });
      chipsEl.appendChild(btn);
    });
  }

  function matches(s) {
    if (state.bucket !== "all" && s.bucket !== state.bucket) return false;
    if (state.userOnly && s.mode !== "user") return false;
    if (!state.q) return true;
    var hay = [s.name, s.cn, s.say, s.points.join(" "), BUCKET_NAME[s.bucket], ALIASES[s.name] || ""].join(" ").toLowerCase();
    return hay.indexOf(state.q) !== -1;
  }

  function renderGrid() {
    if (!grid) return;
    var list = data.filter(matches);
    grid.innerHTML = "";
    list.forEach(function (s) {
      var card = doc.createElement("button");
      card.type = "button";
      card.className = "skill-card";
      card.setAttribute("aria-haspopup", "dialog");
      card.innerHTML =
        '<span class="sc-top">' +
          '<span class="sc-name">' + esc(s.name) + "</span>" +
          '<span class="badge ' + s.mode + '">' + (s.mode === "user" ? "用户触发" : "模型触发") + "</span>" +
          '<span class="sc-cn">' + esc(s.cn) + "</span>" +
        "</span>" +
        '<span class="sc-say">' + esc(s.say) + "</span>";
      card.addEventListener("click", function () { openSkill(s); });
      grid.appendChild(card);
    });
    if (empty) empty.hidden = list.length > 0;
    if (countEl) {
      countEl.textContent = list.length === data.length
        ? data.length + " 个技能"
        : list.length + " / " + data.length + " 个技能";
    }
  }

  function esc(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function openSkill(s) {
    if (!dialog || typeof dialog.showModal !== "function") return;
    dTitle.textContent = "/" + s.name;
    dSub.textContent = s.cn + " · " + BUCKET_NAME[s.bucket] + " · " + (s.mode === "user" ? "只有人能用 /name 触发" : "人或模型都可以触发");
    dBody.innerHTML =
      "<p>" + esc(s.say) + "</p>" +
      "<h4>关键机制</h4>" +
      "<ul>" + s.points.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul>" +
      '<span class="path">' + esc(s.path) + "</span>";
    dialog.showModal();
  }

  if (dClose && dialog) {
    dClose.addEventListener("click", function () { dialog.close(); });
  }
  if (dialog) {
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) dialog.close();
    });
  }

  if (searchEl) {
    searchEl.addEventListener("input", function () {
      state.q = searchEl.value.trim().toLowerCase();
      renderGrid();
    });
  }
  if (modeBtn) {
    modeBtn.addEventListener("click", function () {
      state.userOnly = !state.userOnly;
      modeBtn.setAttribute("aria-pressed", state.userOnly ? "true" : "false");
      renderGrid();
    });
  }

  renderChips();
  renderGrid();

  /* ---------- 初始状态 ---------- */
  onScroll();
  if (sections.length) setActive(sections[0].id);
})();
