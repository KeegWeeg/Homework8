document.addEventListener("DOMContentLoaded", init);

function init() {
  // grab elements
  var skillListEl = document.getElementById("skillList");
  var addSkillBtn = document.getElementById("addSkillBtn");
  var skillInput = document.getElementById("skillInput");
  var themeToggle = document.getElementById("themeToggle");
  var fontSizeInput = document.getElementById("fontSizeInput");
  var bgColorInput = document.getElementById("bgColorInput");
  var applyStylesBtn = document.getElementById("applyStyles");
  var resumeDownload = document.getElementById("resumeDownload");
  var downloadCountEl = document.getElementById("downloadCount");
  var projectsDynamic = document.getElementById("projectsDynamic");
  var projectsSection = document.getElementById("projects");
  var educationMount = document.getElementById("educationTable");
  var experienceMount = document.getElementById("experienceTable");

  // state
  var skills = ["SQL", "Python", "Assembly (MIPS)", "Java", "JavaScript", "HTML", "CSS", "C"];
  var projects = [
    { title: "Project 1", description: "Did project 1 things", deadline: new Date("2026-01-15"), imageURL: "./images/Visualizer.png" },
    { title: "Project 2", description: "Dabbled in project 2 things", deadline: new Date("2024-12-01"), imageURL: "./images/2D.png" },
    { title: "Project 3", description: "Did project 3 things", deadline: new Date("2025-11-30"), imageURL: "./images/GantChart.png" }
  ];
  var downloadCount = 0;

  // renderers
  function renderSkills() {
    if (!skillListEl) return;
    skillListEl.innerHTML = "";
    for (var i = 0; i < skills.length; i++) {
      (function(index) {
        var li = document.createElement("li");
        li.className = "skill";
        li.textContent = skills[index];

        var del = document.createElement("button");
        del.type = "button";
        del.textContent = "x";
        del.style.marginLeft = "6px";
        del.addEventListener("click", function onDeleteClick(e) {
          e.stopPropagation();
          skills.splice(index, 1);
          renderSkills();
        });

        li.addEventListener("click", function onSkillClick() {
          var nv = prompt("Edit skill:", skills[index]);
          if (nv) {
            nv = nv.trim();
            if (nv && skills.indexOf(nv) === -1) {
              skills[index] = nv;
              renderSkills();
            }
          }
        });

        li.appendChild(del);
        skillListEl.appendChild(li);
      })(i);
    }
  }

  function renderProjects() {
    if (!projectsDynamic) return;
    projectsDynamic.innerHTML = "";
    for (var i = 0; i < projects.length; i++) {
      var p = projects[i];
      var card = document.createElement("div");
      card.className = "proj";
      card.innerHTML =
        "<h4>" + p.title + "</h4>" +
        "<p>" + p.description + "</p>" +
        "<p>Deadline: " + p.deadline.toLocaleDateString() + "</p>" +
        '<img src="' + p.imageURL + '" alt="' + p.title + '" style="width:100%;height:auto;">';
      projectsDynamic.appendChild(card);
    }
  }

  function renderTable(rows, mount) {
    if (!mount || !rows || rows.length === 0) return;
    var keys = Object.keys(rows[0]);
    var table = document.createElement("table");
    var thead = document.createElement("thead");
    var tbody = document.createElement("tbody");

    var trh = document.createElement("tr");
    for (var i = 0; i < keys.length; i++) {
      var th = document.createElement("th");
      var name = keys[i];
      th.textContent = name.charAt(0).toUpperCase() + name.slice(1);
      trh.appendChild(th);
    }
    thead.appendChild(trh);

    for (var r = 0; r < rows.length; r++) {
      var tr = document.createElement("tr");
      for (var c = 0; c < keys.length; c++) {
        var td = document.createElement("td");
        td.textContent = rows[r][keys[c]];
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }

    table.appendChild(thead);
    table.appendChild(tbody);
    mount.innerHTML = "";
    mount.appendChild(table);
  }

  // actions
  function addSkill() {
    var val = (skillInput.value || "").trim();
    if (val && skills.indexOf(val) === -1) {
      skills.push(val);
      renderSkills();
    }
    skillInput.value = "";
    skillInput.focus();
  }

  function onSkillInputKey(e) {
    if (e.key === "Enter") addSkill();
    if (e.key === "Escape") skillInput.value = "";
  }

  function onNavClick(e) {
    var href = this.getAttribute("href");
    if (!href || href.charAt(0) !== "#") return;
    var target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    var y = target.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  function sortByDeadline() {
    projects.sort(function (a, b) { return a.deadline - b.deadline; });
    renderProjects();
  }

  function toggleTheme() {
    document.body.classList.toggle("dark");
  }

  function applyStyles() {
    var size = parseInt(fontSizeInput.value, 10);
    var bg = bgColorInput.value;
    if (!isNaN(size)) {
      document.documentElement.style.fontSize = size + "px";
    }
    if (bg) {
      document.documentElement.style.setProperty("--surface", bg);
      document.body.style.background = "var(--surface)";
    }
  }

  function incrementDownloadCount() {
    downloadCount = downloadCount + 1;
    updateDownloadCount();
  }

  function updateDownloadCount() {
    if (downloadCountEl) downloadCountEl.textContent = String(downloadCount);
  }

  // events
  if (addSkillBtn) addSkillBtn.addEventListener("click", addSkill);
  if (skillInput) skillInput.addEventListener("keydown", onSkillInputKey);

  var navLinks = document.querySelectorAll(".nav-item");
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", onNavClick);
  }

  if (projectsSection && !projectsSection.querySelector(".sort-deadline")) {
    var btn = document.createElement("button");
    btn.className = "sort-deadline";
    btn.type = "button";
    btn.textContent = "Sort by Deadline";
    btn.addEventListener("click", sortByDeadline);
    projectsSection.insertBefore(btn, projectsSection.firstChild);
  }

  if (themeToggle) themeToggle.addEventListener("click", toggleTheme);
  if (applyStylesBtn) applyStylesBtn.addEventListener("click", applyStyles);
  if (resumeDownload) resumeDownload.addEventListener("click", incrementDownloadCount);

  // simple data for tables
  var edu = [{ school: "Northern Arizona University", degree: "B.S. Computer Science", years: "2024–2028 (expected)" }];
  var exp = [{ role: "Student Developer", org: "NAU (Projects)", years: "2024–Present" }];

  // initial paint
  renderSkills();
  renderProjects();
  renderTable(edu, educationMount);
  renderTable(exp, experienceMount);
  updateDownloadCount();
}







