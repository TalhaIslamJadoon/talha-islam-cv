// Talha Islam — CV data and renderer (plain JavaScript, no build step)

const CV = {
  name: "Talha Islam",
  title: "AI Data Collection & Annotation Specialist · Computer Science Graduate",
  location: "Abbottabad, Pakistan",
  contacts: [
    { label: "Email", value: "talhaislampips@gmail.com", href: "mailto:talhaislampips@gmail.com" },
    { label: "Phone", value: "+92 311 8954102", href: "tel:+923118954102" },
    { label: "LinkedIn", value: "linkedin.com/in/talha-i-a70964240", href: "https://www.linkedin.com/in/talha-i-a70964240" },
    { label: "GitHub", value: "github.com/TalhaIslamJadoon", href: "https://github.com/TalhaIslamJadoon" }
  ],
  summary:
    "Computer Science graduate and AI data specialist based in Abbottabad, Pakistan. Experienced in AI data collection, video and image annotation, quality control and Urdu language data. Leads a remote team providing data collection and annotation services for AI companies. Also an HR & IT Officer with hands-on experience in LMS/CMS administration and IT support, and the developer of the Orush Grinding Mill management system.",
  experience: [
    {
      role: "Team Lead — AI Data Collection & Annotation Services",
      org: "Remote team (own business)",
      points: [
        "Lead a remote team delivering data collection and annotation projects for AI clients",
        "Video, image, audio and text data projects with structured quality control"
      ]
    },
    {
      role: "Video Annotator (Remote)",
      org: "Atlas Capture",
      points: ["AI video annotation for machine-learning training datasets"]
    },
    {
      role: "AI Content Contributor",
      org: "Annopati",
      points: ["Produced 15-second robotics training videos to specification"]
    },
    {
      role: "HR & IT Officer",
      org: "Pakistan Institute of Professional Studies (PIPS)",
      points: [
        "LMS/CMS management and day-to-day administration",
        "IT support for staff and systems",
        "HR documentation and records"
      ]
    },
    {
      role: "Business Owner",
      org: "Poultry Farming",
      points: ["Ran a poultry farming business for 2 years — operations, sales and accounts"]
    }
  ],
  projects: [
    {
      name: "EduManager Pro — College LMS & CMS with Fee Management",
      desc: "A complete multi-campus college management system built from scratch: admissions, attendance, exams, semester-wise fee challans, bank receiving, payroll, accounts and reports. Live demo linked.",
      href: "https://pipsedumanager.pythonanywhere.com/login/"
    },
    {
      name: "Orush Grinding Mill Management System",
      desc: "Designed and built a complete mill management system (online + PC editions): party ledgers, vehicle gate in/out, grinding production, payments and reports for a phosphate grinding mill.",
      href: "https://orushgrindingmill.pythonanywhere.com"
    },
    {
      name: "Live Sports — All Games Live Coverage Website",
      desc: "A live sports coverage website listing live and upcoming matches across all sports with official links, replays and original articles.",
      href: "https://live-sports.sportsalllive.workers.dev"
    },
    {
      name: "Canteen + Grocery POS System",
      desc: "A point-of-sale system for a college canteen and grocery store: touch billing, kitchen tokens, stock, credit (udhaar) accounts and online ordering. Test copy linked.",
      href: "https://canteen-pos.pages.dev"
    },
    {
      name: "PIPS College ERP — Fees & Finance",
      desc: "Fees and finance module of a college ERP built with a collaborator: challans, payments, wallets, cheque register, payroll and profit & loss.",
      href: "https://pips-college-erp.vercel.app"
    },
    {
      name: "AI Movie's — Urdu AI Micro-Drama Channel",
      desc: "Creator of an Urdu AI-generated micro-drama series published daily on YouTube and TikTok.",
      href: "https://www.youtube.com/@AIMoviesPakistan"
    }
  ],
  publications: [
    {
      name: "How Annotation Helps to Create AI Systems: A Practitioner's View from the Data Pipeline",
      desc: "Preprint · Zenodo · 2 Nov 2026 · DOI: 10.5281/zenodo.23884175 · Open Access, CC BY 4.0 · Experience-based article, not peer-reviewed research",
      href: "https://doi.org/10.5281/zenodo.23884175"
    },
    {
      name: "The Human Foundation of Artificial Intelligence: Why Diverse Data and Careful Annotation Decide Whether AI Works",
      desc: "Preprint · Zenodo · 30 Oct 2026 · DOI: 10.5281/zenodo.23790604 · Open Access, CC BY 4.0 · Experience-based article, not peer-reviewed research",
      href: "https://doi.org/10.5281/zenodo.23790604"
    }
  ],
  skillGroups: [
    {
      name: "Data & AI",
      items: ["Video Annotation", "Image Annotation", "Data Collection", "Quality Control (QC)", "Transcription", "Urdu Language Data", "Audio / Voice Recording", "Game Testing"]
    },
    {
      name: "Technical",
      items: ["Python", "JavaScript", "HTML / CSS", "C++", "Java", "MySQL", "Git & GitHub", "LMS / CMS", "IT Support", "SEO (Search Engine Optimization)", "Social Media Handling & Marketing"]
    }
  ],
  education: [
    { item: "BS Computer Science", org: "COMSATS University Islamabad, Abbottabad Campus", note: "2022 – 2025" },
    { item: "BA Law & Political Science", org: "Abbottabad University of Science and Technology (AUST)", note: "" },
    { item: "Pharmacy Technician Diploma", org: "Pakistan Institute of Professional Studies (PIPS)", note: "" }
  ],
  languages: [
    { item: "Urdu", note: "Native" },
    { item: "English", note: "Upper-intermediate (B2)" }
  ],
  availability: "Remote · Up to 40 hours/week · Can start immediately"
};

// ---------- page structure ----------

// Section index: drives both the section ids and the sticky index nav.
const SECTIONS = [
  { id: "summary", label: "Summary" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "publications", label: "Publications" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "languages", label: "Languages" }
];

// Visual fill for the language bars, keyed by the level wording used in the
// CV data itself. The label shown is always the data's own wording; no
// percentage is ever printed.
const LANGUAGE_FILL = {
  "Native": 100,
  "Upper-intermediate (B2)": 70
};

const prefersReducedMotion =
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- rendering ----------

// Inline SVG icons (no external assets) for the contact pills and location.
const ICONS = {
  Email:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
  Phone:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  LinkedIn:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45z"/></svg>',
  GitHub:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 1.28 1.06.78 2.12 0 1.53-.01 1.08-.01 2.18 0 1.07.01 1.94.79 2.13A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>',
  Location:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>'
};

function iconSpan(name) {
  const s = el("span", "icon");
  if (ICONS[name]) s.innerHTML = ICONS[name];
  return s;
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function section(title, id) {
  const wrap = el("section", "section reveal");
  if (id) wrap.id = id;
  const head = el("div", "section-head");
  head.appendChild(el("h2", "section-title", title));
  wrap.appendChild(head);
  return wrap;
}

function renderHeader(root) {
  const header = el("header", "hero reveal");

  const inner = el("div", "hero-inner");

  const photoWrap = el("div", "hero-photo");
  const img = document.createElement("img");
  img.src = "profile.jpg";
  img.alt = "Talha Islam";
  img.width = 368;
  img.height = 308;
  photoWrap.appendChild(img);
  inner.appendChild(photoWrap);

  const text = el("div", "hero-text");
  text.appendChild(el("p", "hero-eyebrow", "Curriculum Vitae"));
  text.appendChild(el("h1", "name", CV.name));
  text.appendChild(el("p", "headline", CV.title));
  const loc = el("p", "location");
  loc.appendChild(iconSpan("Location"));
  loc.appendChild(document.createTextNode(CV.location));
  text.appendChild(loc);

  const list = el("ul", "contacts");
  CV.contacts.forEach((c) => {
    const li = el("li");
    const a = el("a", "contact-pill");
    a.appendChild(iconSpan(c.label));
    a.appendChild(el("span", null, c.value));
    a.href = c.href;
    a.target = "_blank";
    a.rel = "noopener";
    a.setAttribute("aria-label", c.label + ": " + c.value);
    li.appendChild(a);
    list.appendChild(li);
  });
  text.appendChild(list);

  const avail = el("p", "availability");
  avail.appendChild(el("span", "avail-dot"));
  avail.appendChild(document.createTextNode(CV.availability));
  text.appendChild(avail);

  // At-a-glance counts, computed from the CV data on this page.
  const skillCount = CV.skillGroups.reduce((n, g) => n + g.items.length, 0);
  const stats = [
    { count: CV.experience.length, label: "Experience roles" },
    { count: CV.projects.length, label: "Projects" },
    { count: CV.publications.length, label: "Publications" },
    { count: skillCount, label: "Skills" }
  ];
  const statList = el("ul", "stats");
  stats.forEach((s) => {
    const li = el("li", "stat");
    const num = el("span", "stat-num", String(s.count));
    num.setAttribute("data-count", String(s.count));
    li.appendChild(num);
    li.appendChild(el("span", "stat-label", s.label));
    statList.appendChild(li);
  });
  text.appendChild(statList);

  inner.appendChild(text);
  header.appendChild(inner);
  root.appendChild(header);
}

function renderSummary(root) {
  const s = section("Summary", "summary");
  s.appendChild(el("p", "summary", CV.summary));
  root.appendChild(s);
}

function renderExperience(root) {
  const s = section("Experience", "experience");
  const timeline = el("div", "timeline");
  CV.experience.forEach((job) => {
    const block = el("div", "entry timeline-entry reveal");
    block.appendChild(el("h3", "entry-title", job.role));
    block.appendChild(el("p", "entry-org", job.org));
    const ul = el("ul", "points");
    job.points.forEach((p) => ul.appendChild(el("li", null, p)));
    block.appendChild(ul);
    timeline.appendChild(block);
  });
  s.appendChild(timeline);
  root.appendChild(s);
}

function renderProjects(root) {
  const s = section("Projects", "projects");
  const grid = el("div", "card-grid");
  CV.projects.forEach((proj) => {
    const block = el("article", "card reveal");
    const h = el("h3", "entry-title");
    const a = el("a", null, proj.name);
    a.href = proj.href;
    a.target = "_blank";
    a.rel = "noopener";
    h.appendChild(a);
    block.appendChild(h);
    block.appendChild(el("p", "summary", proj.desc));
    const link = el("a", "card-link", "View project");
    link.href = proj.href;
    link.target = "_blank";
    link.rel = "noopener";
    block.appendChild(link);
    grid.appendChild(block);
  });
  s.appendChild(grid);
  root.appendChild(s);
}

function renderPublications(root) {
  const s = section("Publications", "publications");
  const grid = el("div", "card-grid");
  CV.publications.forEach((pub) => {
    const block = el("article", "card reveal");
    const h = el("h3", "entry-title");
    const a = el("a", null, pub.name);
    a.href = pub.href;
    a.target = "_blank";
    a.rel = "noopener";
    h.appendChild(a);
    block.appendChild(h);
    block.appendChild(el("p", "summary", pub.desc));
    const link = el("a", "card-link", "Read on Zenodo");
    link.href = pub.href;
    link.target = "_blank";
    link.rel = "noopener";
    block.appendChild(link);
    grid.appendChild(block);
  });
  s.appendChild(grid);
  root.appendChild(s);
}

function renderSkills(root) {
  const s = section("Skills", "skills");
  const grid = el("div", "card-grid");
  CV.skillGroups.forEach((group) => {
    const block = el("div", "card skill-card reveal");
    const head = el("div", "skill-head");
    head.appendChild(el("h3", "entry-title", group.name));
    head.appendChild(el("span", "skill-count", group.items.length + " skills"));
    block.appendChild(head);
    const ul = el("ul", "chips");
    group.items.forEach((item) => ul.appendChild(el("li", "chip", item)));
    block.appendChild(ul);
    grid.appendChild(block);
  });
  s.appendChild(grid);
  root.appendChild(s);
}

function renderSimpleList(root, title, id, rows) {
  const s = section(title, id);
  rows.forEach((row) => {
    const block = el("div", "entry reveal");
    block.appendChild(el("h3", "entry-title", row.item));
    if (row.org) block.appendChild(el("p", "entry-org", row.org));
    if (row.note) block.appendChild(el("p", "entry-note", row.note));
    s.appendChild(block);
  });
  root.appendChild(s);
}

function renderLanguages(root) {
  const s = section("Languages", "languages");
  const grid = el("div", "card-grid");
  CV.languages.forEach((lang) => {
    const block = el("div", "card lang-card reveal");
    const head = el("div", "skill-head");
    head.appendChild(el("h3", "entry-title", lang.item));
    head.appendChild(el("span", "lang-level", lang.note));
    block.appendChild(head);
    const track = el("div", "lang-track");
    track.setAttribute("role", "img");
    track.setAttribute("aria-label", lang.item + " — " + lang.note);
    const fill = el("span", "lang-fill");
    const pct = LANGUAGE_FILL[lang.note];
    if (pct) fill.style.setProperty("--w", pct + "%");
    track.appendChild(fill);
    block.appendChild(track);
    grid.appendChild(block);
  });
  s.appendChild(grid);
  root.appendChild(s);
}

function renderNav() {
  const nav = document.getElementById("topNav");
  if (!nav) return;
  const brand = el("a", "nav-brand", CV.name);
  brand.href = "#top";
  nav.appendChild(brand);
  const list = el("ul", "nav-list");
  SECTIONS.forEach((s) => {
    const li = el("li");
    const a = el("a", "nav-link", s.label);
    a.href = "#" + s.id;
    a.setAttribute("data-spy", s.id);
    li.appendChild(a);
    list.appendChild(li);
  });
  nav.appendChild(list);
}

function render() {
  const root = document.getElementById("cv");
  root.id = "cv";
  renderHeader(root);
  renderSummary(root);
  renderExperience(root);
  renderProjects(root);
  renderPublications(root);
  renderSkills(root);
  renderSimpleList(root, "Education", "education", CV.education);
  renderLanguages(root);
  renderNav();

  const footer = el("footer", "footer");
  footer.appendChild(el("p", null, "References available on request."));
  root.appendChild(footer);
}

// ---------- motion & indicators ----------

function initReveal() {
  const targets = document.querySelectorAll(".reveal");
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    targets.forEach((t) => t.classList.add("in"));
    return;
  }
  document.documentElement.classList.add("anim");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -4% 0px" }
  );
  targets.forEach((t) => io.observe(t));
}

function initCounters() {
  const nums = document.querySelectorAll(".stat-num[data-count]");
  if (!nums.length) return;
  const run = (node) => {
    const target = parseInt(node.getAttribute("data-count"), 10) || 0;
    if (prefersReducedMotion) {
      node.textContent = String(target);
      return;
    }
    const dur = 900;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      node.textContent = String(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if (!("IntersectionObserver" in window)) {
    nums.forEach(run);
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          run(e.target);
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  nums.forEach((n) => {
    if (!prefersReducedMotion) n.textContent = "0";
    io.observe(n);
  });
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
        if (link) {
          link.classList.add("active");
          if (link.scrollIntoView) {
            link.scrollIntoView({ block: "nearest", inline: "center" });
          }
        }
      });
    },
    { rootMargin: "-30% 0px -60% 0px" }
  );
  SECTIONS.forEach((s) => {
    const sec = document.getElementById(s.id);
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

document.addEventListener("DOMContentLoaded", () => {
  document.body.id = "top";
  render();
  initReveal();
  initCounters();
  initScrollSpy();
  initProgress();
  const btn = document.getElementById("printBtn");
  if (btn) btn.addEventListener("click", () => window.print());
});
