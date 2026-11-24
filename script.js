// Talha Islam — portfolio behaviour (plain JavaScript, no build step).
// The page content is static HTML; this file provides the scroll reveal,
// the nav scroll-spy, the progress bar, the print button, and the living
// avatar in the hero.

const prefersReducedMotion =
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- motion & indicators ----------

function initReveal() {
  const targets = new Set(document.querySelectorAll(".reveal"));

  // Section headings get the gentler rise-and-scale treatment.
  document
    .querySelectorAll(".section-title, .mega-title, .sub-title")
    .forEach((h) => h.classList.add("reveal-title"));

  // Stagger: the children of a group appear one after another. Children
  // that are not .reveal yet (services, chips, contact pills, education
  // entries) join the reveal system here.
  const stagger = (el, i, step, cap) => {
    el.style.setProperty("--d", Math.min(i * step, cap).toFixed(2) + "s");
  };
  const groups = [
    [".card-grid", 0.09, 0.55],
    [".services-grid", 0.1, 0.4],
    [".timeline", 0.12, 0.5],
    [".chips", 0.045, 0.5],
    [".contacts", 0.08, 0.32],
    ["#education .section-inner", 0.12, 0.36],
  ];
  groups.forEach(([sel, step, cap]) => {
    document.querySelectorAll(sel).forEach((group) => {
      Array.from(group.children).forEach((child, i) => {
        child.classList.add("reveal");
        targets.add(child);
        stagger(child, i, step, cap);
      });
    });
  });

  // Whole-block .reveal containers (About / Services / Contact inners):
  // animate their parts in sequence instead of one flat block. Grid and
  // list children are skipped — the groups above stagger their own items.
  document.querySelectorAll(".section-inner.reveal").forEach((box) => {
    targets.delete(box);
    box.classList.remove("reveal");
    let i = 0;
    Array.from(box.children).forEach((child) => {
      if (
        child.classList.contains("services-grid") ||
        child.classList.contains("contacts")
      ) {
        return;
      }
      child.classList.add("reveal");
      targets.add(child);
      stagger(child, i++, 0.12, 0.48);
    });
  });

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    targets.forEach((t) => t.classList.add("in"));
    return;
  }
  document.documentElement.classList.add("anim");

  // Hero: the pieces above the fold glide in on page load, staggered.
  [
    [".hero-title", 0],
    [".hero-tagline", 0.18],
    [".hero .btn-blue", 0.34],
    [".hero-role", 0.5],
  ].forEach(([sel, d]) => {
    const el = document.querySelector(sel);
    if (el) {
      el.style.setProperty("--d", d + "s");
      el.classList.add("reveal-load");
    }
  });

  const reveal = (el) => {
    if (el.classList.contains("in")) return;
    el.classList.add("in");
    // Once the reveal has played, clear the stagger delay so hover
    // transitions on the element are not held back by it.
    const settle = () => el.classList.add("settled");
    el.addEventListener("transitionend", function h(e) {
      if (e.propertyName === "opacity") {
        settle();
        el.removeEventListener("transitionend", h);
      }
    });
    setTimeout(settle, 2200);
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          reveal(e.target);
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: "0px 0px -6% 0px" }
  );
  targets.forEach((t) => io.observe(t));

  // Safety sweep: anything already on screen must never stay hidden,
  // even if the observer ever misfires.
  const sweep = () => {
    targets.forEach((el) => {
      if (el.classList.contains("in")) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) reveal(el);
    });
  };
  setTimeout(sweep, 900);
  setTimeout(sweep, 2400);
}

function initScrollSpy() {
  const links = document.querySelectorAll(".nav-link[data-spy]");
  if (!links.length || !("IntersectionObserver" in window)) return;
  const byId = {};
  links.forEach((l) => (byId[l.getAttribute("data-spy")] = l));
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((l) => l.classList.remove("active"));
        const link = byId[e.target.id];
        if (link) link.classList.add("active");
      });
    },
    { rootMargin: "-30% 0px -60% 0px" }
  );
  Object.keys(byId).forEach((id) => {
    const sec = document.getElementById(id);
    if (sec) io.observe(sec);
  });
}

function initProgress() {
  const bar = document.getElementById("progressBar");
  if (!bar) return;
  let ticking = false;
  const update = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const p = max > 0 ? window.scrollY / max : 0;
    bar.style.transform = "scaleX(" + p + ")";
    ticking = false;
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true }
  );
  update();
}

// ---------- living avatar ----------

// Pre-rendered poses for the hero avatar. The canvas swaps between them:
// the gaze follows the visitor's cursor (angle sectors around the avatar's
// centre), a randomised timer blinks, and clicking cycles fun expressions.
// On touch devices there is no cursor, so the gaze wanders on its own.
function initAvatar() {
  const wrap = document.getElementById("avatarWrap");
  const canvas = document.getElementById("avatarCanvas");
  if (!wrap || !canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const POSES = [
    "rest", "closed", "half",
    "up", "down", "left", "right",
    "upleft", "upright", "downleft", "downright",
    "grin", "hearts", "angry"
  ];
  const images = {};
  let loaded = 0;
  let failed = false;

  let current = "rest";   // pose currently on the canvas
  let gaze = "rest";      // pose the cursor / wander wants
  let expression = null;  // click expression overlay (times out)
  let blinking = false;

  function draw(name) {
    const img = images[name];
    if (!img || !img.complete || !img.naturalWidth) return;
    if (name === current && wrap.dataset.drawn === name) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    current = name;
    wrap.dataset.drawn = name;
  }

  function show() {
    if (blinking) return; // the blink sequence owns the canvas
    draw(expression || gaze);
  }

  // --- gaze: 8 angle sectors + a centre dead-zone that means "rest" ---
  function poseForAngle(angle, dist, radius) {
    if (dist < radius * 0.6) return "rest";
    const deg = (angle * 180) / Math.PI; // 0 = right, 90 = down (screen coords)
    if (deg >= -22.5 && deg < 22.5) return "right";
    if (deg >= 22.5 && deg < 67.5) return "downright";
    if (deg >= 67.5 && deg < 112.5) return "down";
    if (deg >= 112.5 && deg < 157.5) return "downleft";
    if (deg >= 157.5 || deg < -157.5) return "left";
    if (deg >= -157.5 && deg < -112.5) return "upleft";
    if (deg >= -112.5 && deg < -67.5) return "up";
    return "upright";
  }

  let rafPending = false;
  function onPointerMove(e) {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(() => {
      rafPending = false;
      const r = canvas.getBoundingClientRect();
      if (!r.width) return;
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const next = poseForAngle(Math.atan2(dy, dx), dist, r.width / 2);
      if (next !== gaze) {
        gaze = next;
        show();
      }
    });
  }

  // --- blink: half -> closed -> half, every 2.4–5.5s ---
  function scheduleBlink() {
    setTimeout(blink, 2400 + Math.random() * 3100);
  }
  function blink() {
    if (!expression && !prefersReducedMotion) {
      blinking = true;
      draw("half");
      setTimeout(() => draw("closed"), 60);
      setTimeout(() => draw("half"), 150);
      setTimeout(() => {
        blinking = false;
        show();
      }, 230);
    }
    scheduleBlink();
  }

  // --- touch / idle: wander the gaze to a random direction now and then ---
  const DIRECTIONS = [
    "up", "down", "left", "right",
    "upleft", "upright", "downleft", "downright", "rest"
  ];
  function wander() {
    if (!lastPointerAt || Date.now() - lastPointerAt > 4000) {
      gaze = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
      show();
    }
    setTimeout(wander, 2600 + Math.random() * 2600);
  }
  let lastPointerAt = 0;

  // --- click: cycle grin -> hearts -> angry -> back to following ---
  const EXPRESSIONS = ["grin", "hearts", "angry"];
  let exprIndex = -1;
  let exprTimer = null;
  canvas.addEventListener("click", () => {
    exprIndex = (exprIndex + 1) % (EXPRESSIONS.length + 1);
    expression = exprIndex < EXPRESSIONS.length ? EXPRESSIONS[exprIndex] : null;
    clearTimeout(exprTimer);
    if (expression) {
      show();
      exprTimer = setTimeout(() => {
        expression = null;
        exprIndex = -1;
        show();
      }, 2200);
    } else {
      show();
    }
  });

  // Preload every pose; only start once all are in (or fall back cleanly).
  POSES.forEach((name) => {
    const img = new Image();
    img.onload = () => {
      loaded += 1;
      if (name === "rest") draw("rest");
      if (loaded === POSES.length) start();
    };
    img.onerror = () => {
      if (!failed) {
        failed = true;
        canvas.hidden = true;
        const fb = wrap.querySelector(".avatar-fallback");
        if (fb) fb.hidden = false;
        const hint = wrap.querySelector(".avatar-hint");
        if (hint) hint.hidden = true;
        hideIfFallbackBroken();
      }
    };
    img.src = "avatar/" + name + ".png";
    images[name] = img;
  });

  // If even the fallback image is missing/broken, hide the whole block so
  // the hero looks exactly as it did before the avatar existed.
  function hideIfFallbackBroken() {
    const fb = wrap.querySelector(".avatar-fallback");
    if (fb && fb.complete && !fb.naturalWidth) wrap.style.display = "none";
  }
  setTimeout(hideIfFallbackBroken, 2500);

  let started = false;
  function start() {
    if (started) return;
    started = true;
    draw("rest");
    if (prefersReducedMotion) return; // static portrait, no motion at all
    window.addEventListener("pointermove", (e) => {
      lastPointerAt = Date.now();
      onPointerMove(e);
    }, { passive: true });
    scheduleBlink();
    setTimeout(wander, 3000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initReveal();
  initScrollSpy();
  initProgress();
  initAvatar();
  const btn = document.getElementById("printBtn");
  if (btn) btn.addEventListener("click", () => window.print());
});
