function addSkill() {
  const input = document.getElementById('skillInput');
  const list = document.getElementById('skillList');
  const value = (input.value || '').trim();
  if (!value) return;

  const li = document.createElement('li');
  li.className = 'skill';
  li.textContent = value;
  list.appendChild(li);

  input.value = '';
  input.focus();
}

const projectTitles = [
  'Portfolio Refresh',
  'Weather App',
  'Blog Prototype'
];

const projectDescriptions = [
  'Reorganize sections and improve accessibility.',
  'Fetch and display current weather by city search.',
  'Lightweight blog with basic CRUD.'
];

const projectDeadlines = [
  '2026-01-15', 
  '2024-12-01',
  '2025-11-30' 
];

function renderProjects() {
  const wrap = document.getElementById('projectsDynamic');
  wrap.innerHTML = '';

  const today = new Date();

  for (let i = 0; i < projectTitles.length; i++) {
    const deadlineStr = projectDeadlines[i];
    const deadlineDate = new Date(deadlineStr);
    // comparator usage
    const status = deadlineDate > today ? 'Ongoing' : 'Completed';

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

  link.addEventListener('click', () => {
    downloadCount += 1;
    counter.textContent = String(downloadCount);
    // no preventDefault: still downloads via href + download attribute
  });
}

const experiences = [
  { role: 'Data Intern/IT', company: 'GCON', start: 'May 2024', end: 'Present' },
];

const education = [
  { school: 'Northern Arizona University', degree: 'B.S. Computer Science', start: 'Aug 2024', end: 'May 2028' },
];

function createTable(headers, rows) {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const trHead = document.createElement('tr');

  headers.forEach(h => {
    const th = document.createElement('th');
    th.textContent = h;
    trHead.appendChild(th);
  });
  thead.appendChild(trHead);

  const tbody = document.createElement('tbody');
  rows.forEach(r => {
    const tr = document.createElement('tr');
    r.forEach(cell => {
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
  const rows = experiences.map(e => [e.company, e.role, e.start, e.end]);

  target.innerHTML = '';
  target.appendChild(createTable(headers, rows));
}

function renderEducation() {
  const target = document.getElementById('educationTable');
  if (!target) return;

  const headers = ['Institution', 'Degree/Program', 'Start', 'End'];
  const rows = education.map(ed => [ed.school, ed.degree, ed.start, ed.end]);

  target.innerHTML = '';
  target.appendChild(createTable(headers, rows));
}

function toggleTheme() {
  document.body.classList.toggle('dark');
}

function applyStyles() {
  const fontSize = document.getElementById('fontSizeInput').value;
  const bgColor = document.getElementById('bgColorInput').value;
