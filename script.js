if (typeof window.$ === "undefined") {
  console.error("jQuery not loaded.");
}

$(function () {
  const skills = ["SQL", "Python", "Assembly (MIPS)", "Java", "JavaScript", "HTML", "CSS", "C"];
  function renderSkills() {
    const list = $("#skillList");
    list.empty();
    skills.forEach((s, i) => {
      const li = $("<li>").addClass("skill").text(s);
      const del = $("<button>").attr("type", "button").text("×").css({ marginLeft: "6px" });
      del.on("click", (e) => {
        e.stopPropagation();
        skills.splice(i, 1);
        li.slideUp(200, renderSkills);
      });
      li.on("click", function () {
        const newSkill = prompt("Edit skill:", s);
        if (newSkill && !skills.includes(newSkill.trim())) {
          skills[i] = newSkill.trim();
          renderSkills();
        }
      });
      li.append(del);
      list.append(li.hide().fadeIn(200));
    });
  }
  $("#addSkillBtn").on("click", function () {
    const val = $("#skillInput").val().trim();
    if (val && !skills.includes(val)) {
      skills.push(val);
      renderSkills();
    }
    $("#skillInput").val("").focus();
  });
  $("#skillInput").on("keydown", function (e) {
    if (e.key === "Enter") $("#addSkillBtn").click();
    if (e.key === "Escape") $(this).val("");
  });
  const navItems = ["Summary", "Education", "Experience", "Skills", "Projects", "Contact"];
  const nav = $(".nav");
  nav.find("a.nav-item").remove();
  navItems.forEach((n) => {
    const link = $("<a>").addClass("nav-item").attr("href", "#" + n.toLowerCase()).text(n);
    nav.append(link);
  });
  $(".nav-item").on("click", function (e) {
    e.preventDefault();
    const target = $($(this).attr("href"));
    if (!target.length) return;
    $("html, body").animate({ scrollTop: target.offset().top - 80 }, 400);
  });
  const projects = [
    { title: "Project 1", description: "Did project 1 things", deadline: new Date("2026-01-15"), imageURL: "./images/Visualizer.png" },
    { title: "Project 2", description: "Dabbled in project 2 things", deadline: new Date("2024-12-01"), imageURL: "./images/2D.png" },
    { title: "Project 3", description: "Did project 3 things", deadline: new Date("2025-11-30"), imageURL: "./images/GantChart.png" }
  ];
  function renderProjects() {
    const wrap = $("#projectsDynamic");
    wrap.empty();
    projects.forEach((p) => {
      const card = $("<div>").addClass("proj").append(`
        <h4>${p.title}</h4>
        <p>${p.description}</p>
        <p>Deadline: ${p.deadline.toLocaleDateString()}</p>
        <img src="${p.imageURL}" alt="${p.title}" style="width:100%;height:auto;">
      `);
      wrap.append(card.hide().fadeIn(300));
    });
  }
  if (!$("#projects .sort-deadline").length) {
    $("#projects").prepend(
      $("<button>")
        .addClass("sort-deadline")
        .attr("type", "button")
        .text("Sort by Deadline")
        .on("click", function () {
          projects.sort((a, b) => a.deadline - b.deadline);
          renderProjects();
        })
    );
  }
  $("#themeToggle").on("click", function () {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("prefersDark", document.documentElement.classList.contains("dark") ? "1" : "0");
  });
  if (localStorage.getItem("prefersDark") === "1") {
    document.documentElement.classList.add("dark");
  }
  $("#applyStyles").on("click", function () {
    const fontSize = parseInt($("#fontSizeInput").val(), 10);
    const bg = $("#bgColorInput").val();
    if (!Number.isNaN(fontSize)) {
      document.documentElement.style.setProperty("--base-font-size", fontSize + "px");
    }
    if (bg) {
      document.documentElement.style.setProperty("--page-bg", bg);
    }
  });
  const dlKey = "resumeDownloadCount";
  const countEl = $("#downloadCount");
  function updateDlCountDisplay() {
    const count = parseInt(localStorage.getItem(dlKey) || "0", 10);
    countEl.text(count);
  }
  $("#resumeDownload").on("click", function () {
    const count = parseInt(localStorage.getItem(dlKey) || "0", 10) + 1;
    localStorage.setItem(dlKey, String(count));
    setTimeout(updateDlCountDisplay, 0);
  });
  updateDlCountDisplay();
  const edu = [{ school: "Northern Arizona University", degree: "B.S. Computer Science", years: "2024–2028 (expected)" }];
  const exp = [{ role: "Student Developer", org: "NAU (Projects)", years: "2024–Present" }];
  function renderTable(rows, mountSel) {
    const m = $(mountSel);
    m.empty();
    if (!rows.length) return;
    const table = $("<table>").addClass("table");
    const thead = $("<thead>");
    const tbody = $("<tbody>");
    const cols = Object.keys(rows[0]);
    thead.append($("<tr>").append(cols.map((c) => $("<th>").text(c[0].toUpperCase() + c.slice(1)))));
    rows.forEach((r) => {
      tbody.append($("<tr>").append(cols.map((c) => $("<td>").text(r[c]))));
    });
    table.append(thead, tbody);
    m.append(table);
  }
  renderSkills();
  renderProjects();
  renderTable(edu, "#educationTable");
  renderTable(exp, "#experienceTable");
});






