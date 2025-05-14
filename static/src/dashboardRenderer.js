const contactTableBody = document.getElementById('contactTable');
const handoverLog = document.getElementById('handoverLog');
const beamStatusList = document.getElementById('beamStatus');

let beamState = {};

export function renderContactPlanTable(plan) {
  contactTableBody.innerHTML = '';
  plan.forEach(e => {
    const row = document.createElement('tr');
    [e.satellite_id, e.ground_cell, e.start_time, e.end_time, e.beam_angle, e.link_budget, e.status].forEach(txt => {
      const td = document.createElement('td');
      td.textContent = txt;
      row.appendChild(td);
    });
    contactTableBody.appendChild(row);
  });
}

export function logHandover(cellId, from, to) {
  const li = document.createElement('li');
  li.textContent = `[${new Date().toISOString()}] ${cellId}: ${from || 'none'} → ${to}`;
  handoverLog.prepend(li);
  while (handoverLog.children.length > 20) {
    handoverLog.removeChild(handoverLog.lastChild);
  }
}

export function updateBeamStatus(cellId, newSatId) {
  if (beamState[cellId] === newSatId) return;
  const prev = beamState[cellId];
  beamState[cellId] = newSatId;
  logHandover(cellId, prev, newSatId);
  renderBeamStatus();
}

function renderBeamStatus() {
  beamStatusList.innerHTML = '';
  for (const [cell, sat] of Object.entries(beamState)) {
    const li = document.createElement('li');
    li.textContent = `${cell} → ${sat}`;
    beamStatusList.appendChild(li);
  }
}
