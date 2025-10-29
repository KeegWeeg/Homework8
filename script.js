$(document).ready(function () {
  const skills = ["SQL", "Python", "Assembly (MIPS)", "Java", "JavaScript", "HTML", "CSS", "C"];

  function renderSkills() {
    const list = $("#skillList");
    list.empty();
    skills.forEach((s, i) => {
      const li = $("<li>").addClass("skill").text(s);
      const del = $("<button>").text("x").css({ marginLeft: "6px" });
      del.on("click", () => {
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
  nav.find("a").remove();
  navItems.forEach((n) => {
    const link = $("<a>")
      .addClass("nav-item")
      .attr("href", "#" + n.toLowerCase())
      .text(n);
    nav.prepend(link);
  });
  $(".nav-item").on("click", function (e) {
    e.preventDefault();
    const target = $($(this).attr("href"));
    $("html, body").animate({ scrollTop: target.offset().top - 80 }, 400);
  });

  const projects = [
    {
      title: "Project 1",
      description: "Did project 1 things",
      deadline: new Date("2026-01-15"),
      imageURL: "./images/Visualizer.png",
    },
    {
      title: "Project 2",
      description: "Dabbled in project 2 things",
      deadline: new Date("2024-12-01"),
      imageURL: "./images/2D.png",
    },
    {
      title: "Project 3",
      description: "Did project 3 things",
      deadline: new Date("2025-11-30"),
      imageURL: "./images/GantChart.png",
    },
  ];

  function renderProjects() {
    const wrap = $("#projectsDynamic");
    wrap.empty();
    projects.forEach((p) => {
      const card = $("<div>").addClass("proj").append(`
        <h4>${p.title}</h4>
        <p>${p.description}</p>
        <p>Deadline: ${p.deadline.toLocaleDateString()}</p>
        <img src="${p.imageURL}" width="100%">
      `);
      wrap.append(card.hide().fadeIn(300));
    });
  }

  $("#projects").prepend(
    $("<button>").text("Sort by Deadline").on("click", function () {
      projects.sort((a, b) => a.deadline - b.deadline);
      renderProjects();
    })
  );

  renderSkills();
  renderProjects();
});




