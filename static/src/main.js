import { loadScenarioData } from './dataLoader.js';
import { createSatelliteEntity } from './satelliteFactory.js';
import { addVisibilityCone } from './visibilityCones.js';
import { renderContactPlan } from './contactPlanRenderer.js';
import { addHexCell } from './hexGrid.js';
import { monitorIllumination } from './illumination.js';
import { renderContactPlanTable } from './dashboardRenderer.js';
import { createPlaybackController } from './ntnPlayback.js';
import { CELL_COORDINATES } from './constants.js';
import { setupDemoScenario } from './demoScenario.js';


Cesium.Ion.defaultAccessToken = undefined;

const viewer = new Cesium.Viewer('cesiumContainer', {
  sceneMode: Cesium.SceneMode.SCENE3D,
  shouldAnimate: true,
  timeline: true,
  animation: true,
});

viewer._cesiumWidget._creditContainer.style.display = "none";
const hexCells = [];
const cones = {};

window.ntnPlayback = createPlaybackController(viewer); // Expose globally for UI buttons

(async function init() {
  const { satellites, contactData } = await loadScenarioData();

  // Satellites and Cones
  Object.entries(satellites).forEach(([id, pos]) => {
    const satEntity = createSatelliteEntity(viewer, id, pos);
    const cone = addVisibilityCone(viewer, satEntity, 10);
    if (cone) cones[id] = cone;
  });

  // Hex Cells
  Object.entries(CELL_COORDINATES).forEach(([label, coords]) => {
    const entity = addHexCell(viewer, coords.lat, coords.lon, 15, label);
    hexCells.push({ entity, center: { ...coords, label } });
  });

  renderContactPlan(viewer, contactData);
  renderContactPlanTable(contactData);
  monitorIllumination(viewer, cones, hexCells);

  console.log("[NTN] Demo initialized.");
})();


window.addHexCellFromForm = () => {
  const lat = parseFloat(document.getElementById("cellLat").value);
  const lon = parseFloat(document.getElementById("cellLon").value);
  const radius = parseFloat(document.getElementById("cellRadius").value || 15);

  if (isNaN(lat) || isNaN(lon) || isNaN(radius)) {
    alert("Latitude, Longitude, and Radius must be valid numbers.");
    return;
  }

  const label = `Cell-${lat.toFixed(1)}-${lon.toFixed(1)}`;
  addHexCell(viewer, lat, lon, radius, label);
};

(async function init() {
  const { satellites, contactData } = await loadScenarioData();

  // CSV-driven satellites
  Object.entries(satellites).forEach(([id, pos]) => {
    const satEntity = createSatelliteEntity(viewer, id, pos);
    const cone = addVisibilityCone(viewer, satEntity, 10);
    if (cone) cones[id] = cone;
  });

  // Render contact plan from CSV
  renderContactPlan(viewer, contactData);
  renderContactPlanTable(contactData);

  // Paris demo satellites + hex
  const demoCones = setupDemoScenario(viewer, hexCells);
  Object.assign(cones, demoCones);

  monitorIllumination(viewer, cones, hexCells);
})();