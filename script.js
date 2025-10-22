function addSkill() {
  const input = document.getElementById('skillInput');
  const list = document.getElementById('skillList');
  const value = (input && input.value ? input.value : '').trim();
  if (!value) return;
  const li = document.createElement('li');
  li.className = 'skill';
  li.textContent = value;
  list.appendChild(li);
  input.value = '';
  input.focus();
}

const projectTitles = ['Project 1', 'Project 2', 'Project 3'];
const projectDescriptions = ['Did project 1 things', 'Dabbled in project 2 things', 'Did project 3 things'];
const projectDeadlines = ['2026-01-15', '2024-12-01', '2025-11-30'];

function renderProjects() {
  const wrap = document.getElementById('projectsDynamic');
  if (!wrap) return;
  wrap.innerHTML = '';
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  for (let i = 0; i < projectTitles.length; i++) {
    const deadlineStr = projectDeadlines[i];
    const deadlineDate = new Date(deadlineStr);
    const deadlineDay = new Date(deadlineDate.getFullYear(), deadlineDate.getMonth(), deadlineDate.getDate());
    let status = 'Completed';
    if (deadlineDay.getTime() === today.getTime()) {
      status = 'Due Today';
    } else if (deadlineDay > today) {
      status = 'Ongoing';
    }
    const card = document.createElement('div');
    card.className = 'proj';
    card.innerHTML = `
      <h4>${projectTitles[i]}</h4>
      <p>${projectDescriptions[i]}</p>
      <p>Deadline: <span>${deadlineStr}</span> | Status: <span class="status">${status}</span></p>
    `;
    wrap.appendChild(card);
  }
}

let downloadCount = 0;
function initDownloadCounter() {
  const link = document.getElementById('resumeDownload');
  const counter = document.getElementById('downloadCount');
  if (!link || !counter) return;
  link.addEventListener('click', function() {
    downloadCount = downloadCount + 1;
    counter.textContent = String(downloadCount);
  });
}

const experiences = [
  { role: 'Data Intern/IT', company: 'GCON', start: 'May 2024', end: 'Present' }
];

const education = [
  { school: 'Northern Arizona University', degree: 'B.S. Computer Science', start: 'Aug 2024', end: 'May 2028' }
];

function createTable(headers, rows) {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const trHead = document.createElement('tr');
  headers.forEach(function(h) {
    const th = document.createElement('th');
    th.textContent = h;
    trHead.appendChild(th);
  });
  thead.appendChild(trHead);
  const tbody = document.createElement('tbody');
  rows.forEach(function(r) {
    const tr = document.createElement('tr');
    r.forEach(function(cell) {
      const td = document.createElement('td');
      td.textContent = cell;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(thead);
  table.appendChild(tbody);
  return table;
}

function renderExperience() {
  const target = document.getElementById('experienceTable');
  if (!target) return;
  const headers = ['Company', 'Role', 'Start', 'End'];
  const rows = experiences.map(function(e) {
    return [e.company, e.role, e.start, e.end];
  });
  target.innerHTML = '';
  target.appendChild(createTable(headers, rows));
}

function renderEducation() {
  const target = document.getElementById('educationTable');
  if (!target) return;
  const headers = ['Institution', 'Degree/Program', 'Start', 'End'];
  const rows = education.map(function(ed) {
    return [ed.school, ed.degree, ed.start, ed.end];
  });
  target.innerHTML = '';
  target.appendChild(createTable(headers, rows));
}

function toggleTheme() {
  document.body.classList.toggle('dark');
}

function applyStyles() {
  const fontSizeEl = document.getElementById('fontSizeInput');
  const bgColorEl = document.getElementById('bgColorInput');
  if (fontSizeEl && fontSizeEl.value) {
    document.body.style.fontSize = fontSizeEl.value + 'px';
  }
  if (bgColorEl && bgColorEl.value) {
    document.body.style.backgroundColor = bgColorEl.value;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  renderProjects();
  renderExperience();
  renderEducation();
  initDownloadCounter();
  const addBtn = document.getElementById('addSkillBtn');
  if (addBtn) {
    addBtn.addEventListener('click', addSkill);
  }
  const skillInput = document.getElementById('skillInput');
  if (skillInput) {
    skillInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') addSkill();
    });
  }
  const themeToggleBtn = document.getElementById('themeToggle');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
  const applyBtn = document.getElementById('applyStyles');
  if (applyBtn) {
    applyBtn.addEventListener('click', applyStyles);
  }
});


