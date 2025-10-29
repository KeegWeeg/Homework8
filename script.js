document.addEventListener("DOMContentLoaded", function () {
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.from((root || document).querySelectorAll(sel)); }

  const skillListEl = $("#skillList");
  const addSkillBtn = $("#addSkillBtn");
  const skillInput = $("#skillInput");
  const themeToggle = $("#themeToggle");
  const fontSizeInput = $("#fontSizeInput");
  const bgColorInput = $("#bgColorInput");
  const applyStyles = $("#applyStyles");
  const resumeDownload = $("#resumeDownload");
  const downloadCountEl = $("#downloadCount");
  const projectsDynamic = $("#projectsDynamic");
  const projectsSection = $("#projects");
  const educationMount = $("#educationTable");
  const experienceMount = $("#experienceTable");

  const skills = ["SQL", "Python", "Assembly (MIPS)", "Java", "JavaScript", "HTML", "CSS", "C"];
  function renderSkills() {
    if (!skillListEl) return;
    skillListEl.innerHTML = "";
    skills.forEach((s, i) => {
      const li = document.createElement("li");
      li.className = "skill";
      li.textContent = s;
      const del = document.createElement("button");
      del.type = "button";
      del.textContent = "×";
      del.style.marginLeft = "6px";
      del.addEventListener("click", (e) => {
        e.stopPropagation();
        skills.splice(i, 1);
        li.style.transition = "opacity 0.2s";
        li.style.opacity = "0";
        setTimeout(renderSkills, 200);
      });
      li.addEventListener("click", () => {
        const nv = prompt("Edit skill:", s);
        if (nv && !skills.includes(nv.trim())) {
          skills[i] = nv.trim();
          renderSkills();
        }
      });
      li.appendChild(del);
      li.style.opacity = "0";
      skillListEl.appendChild(li);
      requestAnimationFrame(() => { li.style.transition = "opacity 0.2s"; li.style.opacity = "1"; });
    });
  }

  if (addSkillBtn && skillInput) {
    addSkillBtn.addEventListener("click", () => {
      const val = (skillInput.value || "").trim();
      if (val && !skills.includes(val)) {
        skills.push(val);
        renderSkills();
      }
      skillInput.value = "";
      skillInput.focus();
    });
    skillInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") addSkillBtn.click();
      if (e.key === "Escape") skillInput.value = "";
    });
  }

  $all(".nav-item").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      const target = $(href);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });

  const projects = [
    { title: "Project 1", description: "Did project 1 things", deadline: new Date("2026-01-15"), imageURL: "./images/Visualizer.png" },
    { title: "Project 2", description: "Dabbled in project 2 things", deadline: new Date("2024-12-01"), imageURL: "./images/2D.png" },
    { title: "Project 3", description: "Did project 3 things", deadline: new Date("2025-11-30"), imageURL: "./images/GantChart.png" }
  ];

  function renderProjects() {
    if (!projectsDynamic) return;
    projectsDynamic.innerHTML = "";
    projects.forEach((p) => {
      const card = document.createElement("div");
      card.className = "proj";
      card.innerHTML = `
        <h4>${p.title}</h4>
        <p>${p.description}</p>
        <p>Deadline: ${p.deadline.toLocaleDateString()}</p>
        <img src="${p.imageURL}" alt="${p.title}" style="width:100%;height:auto;">
      `;
      card.style.opacity = "0";
      projectsDynamic.appendChild(card);
      requestAnimationFrame(() => { card.style.transition = "opacity 0.3s"; card.style.opacity = "1"; });
    });
  }

  if (projectsSection && !projectsSection.querySelector(".sort-deadline")) {
    const btn = document.createElement("button");
    btn.className = "sort-deadline";
    btn.type = "button";
    btn.textContent = "Sort by Deadline";
    btn.addEventListener("click", () => {
      projects.sort((a, b) => a.deadline - b.deadline);
      renderProjects();
    });
    projectsSection.prepend(btn);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      localStorage.setItem("prefersDark", document.body.classList.contains("dark") ? "1" : "0");
    });
    if (localStorage.getItem("prefersDark") === "1") {
      document.body.classList.add("dark");
    }
  }

  if (applyStyles && fontSizeInput && bgColorInput) {
    applyStyles.addEventListener("click", () => {
      const fontSize = parseInt(fontSizeInput.value, 10);
      const bg = bgColorInput.value;
      if (!Number.isNaN(fontSize)) {
        document.documentElement.style.fontSize = fontSize + "px";
      }
      if (bg) {
        document.documentElement.style.setProperty("--surface", bg);
      }
    });
  }

  const dlKey = "resumeDownloadCount";
  function updateDl() {
    const count = parseInt(localStorage.getItem(dlKey) || "0", 10);
    if (downloadCountEl) downloadCountEl.textContent = String(count);
  }
  if (resumeDownload) {
    resumeDownload.addEventListener("click", () => {
      const c = parseInt(localStorage.getItem(dlKey) || "0", 10) + 1;
      localStorage.setItem(dlKey, String(c));
      setTimeout(updateDl, 0);
    });
  }
  updateDl();

  const edu = [{ school: "Northern Arizona University", degree: "B.S. Computer Science", years: "2024–2028 (expected)" }];
  const exp = [{ role: "Student Developer", org: "NAU (Projects)", years: "2024–Present" }];

  function renderTable(rows, mount) {
    if (!mount || !rows.length) return;
    const cols = Object.keys(rows[0]);
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    const trh = document.createElement("tr");
    cols.forEach((c) => {
      const th = document.createElement("th");
      th.textContent = c[0].toUpperCase() + c.slice(1);
      trh.appendChild(th);
    });
    thead.appendChild(trh);
    rows.forEach((r) => {
      const tr = document.createElement("tr");
      cols.forEach((c) => {
        const td = document.createElement("td");
        td.textContent = String(r[c]);
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(thead);
    table.appendChild(tbody);
    mount.innerHTML = "";
    mount.appendChild(table);
  }

  renderSkills();
  renderProjects();
  renderTable(edu, educationMount);
  renderTable(exp, experienceMount);
});







