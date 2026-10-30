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
      name: "Orush Grinding Mill Management System",
      desc: "Designed and built a complete mill management system (online + PC editions): party ledgers, vehicle gate in/out, grinding production, payments and reports for a phosphate grinding mill.",
      href: "https://github.com/TalhaIslamJadoon"
    },
    {
      name: "AI Movie's — Urdu AI Micro-Drama Channel",
      desc: "Creator of an Urdu AI-generated micro-drama series published daily on YouTube and TikTok.",
      href: "https://www.youtube.com/@AIMoviesPakistan"
    }
  ],
  skillGroups: [
    {
      name: "Data & AI",
      items: ["Video Annotation", "Image Annotation", "Data Collection", "Quality Control (QC)", "Transcription", "Urdu Language Data", "Audio / Voice Recording", "Game Testing"]
    },
    {
      name: "Technical",
      items: ["Python", "JavaScript", "HTML / CSS", "C++", "Java", "MySQL", "Git & GitHub", "LMS / CMS", "IT Support"]
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

// ---------- rendering ----------

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function section(title) {
  const wrap = el("section", "section");
  wrap.appendChild(el("h2", "section-title", title));
  return wrap;
}

function renderHeader(root) {
  const header = el("header", "header");
  header.appendChild(el("h1", "name", CV.name));
  header.appendChild(el("p", "headline", CV.title));
  header.appendChild(el("p", "location", CV.location));

  const list = el("ul", "contacts");
  CV.contacts.forEach((c) => {
    const li = el("li");
    const a = el("a", null, c.value);
    a.href = c.href;
    a.target = "_blank";
    a.rel = "noopener";
    li.appendChild(el("span", "contact-label", c.label + ": "));
    li.appendChild(a);
    list.appendChild(li);
  });
  header.appendChild(list);
  header.appendChild(el("p", "availability", CV.availability));
  root.appendChild(header);
}

function renderSummary(root) {
  const s = section("Summary");
  s.appendChild(el("p", "summary", CV.summary));
  root.appendChild(s);
}

function renderExperience(root) {
  const s = section("Experience");
  CV.experience.forEach((job) => {
    const block = el("div", "entry");
    block.appendChild(el("h3", "entry-title", job.role));
    block.appendChild(el("p", "entry-org", job.org));
    const ul = el("ul", "points");
    job.points.forEach((p) => ul.appendChild(el("li", null, p)));
    block.appendChild(ul);
    s.appendChild(block);
  });
  root.appendChild(s);
}

function renderProjects(root) {
  const s = section("Projects");
  CV.projects.forEach((proj) => {
    const block = el("div", "entry");
    const h = el("h3", "entry-title");
    const a = el("a", null, proj.name);
    a.href = proj.href;
    a.target = "_blank";
    a.rel = "noopener";
    h.appendChild(a);
    block.appendChild(h);
    block.appendChild(el("p", "summary", proj.desc));
    s.appendChild(block);
  });
  root.appendChild(s);
}

function renderSkills(root) {
  const s = section("Skills");
  CV.skillGroups.forEach((group) => {
    const block = el("div", "entry");
    block.appendChild(el("h3", "entry-title", group.name));
    const ul = el("ul", "chips");
    group.items.forEach((item) => ul.appendChild(el("li", "chip", item)));
    block.appendChild(ul);
    s.appendChild(block);
  });
  root.appendChild(s);
}

function renderSimpleList(root, title, rows) {
  const s = section(title);
  rows.forEach((row) => {
    const block = el("div", "entry");
    block.appendChild(el("h3", "entry-title", row.item));
    if (row.org) block.appendChild(el("p", "entry-org", row.org));
    if (row.note) block.appendChild(el("p", "entry-note", row.note));
    s.appendChild(block);
  });
  root.appendChild(s);
}

function render() {
  const root = document.getElementById("cv");
  renderHeader(root);
  renderSummary(root);
  renderExperience(root);
  renderProjects(root);
  renderSkills(root);
  renderSimpleList(root, "Education", CV.education);
  renderSimpleList(root, "Languages", CV.languages.map((l) => ({ item: l.item, note: l.note })));

  const footer = el("footer", "footer");
  footer.appendChild(el("p", null, "References available on request."));
  root.appendChild(footer);
}

document.addEventListener("DOMContentLoaded", () => {
  render();
  const btn = document.getElementById("printBtn");
  if (btn) btn.addEventListener("click", () => window.print());
});
