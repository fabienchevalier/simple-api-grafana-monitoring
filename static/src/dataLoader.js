import { julianFromIso, cartesianFromLatLonAlt } from './utils.js';

export async function loadCSV(url) {
  return new Promise((resolve, reject) => {
    Papa.parse(url, {
      download: true,
      header: true,
      dynamicTyping: (field) => field !== "timestamp",
      complete: result => resolve(result.data),
      error: reject,
    });
  });
}

export async function loadScenarioData() {
  const [orbitData, contactData] = await Promise.all([
    loadCSV('/static/data/orbit.csv'),
    loadCSV('/static/data/contact_plan.csv')
  ]);

  const satellites = {};
  for (const row of orbitData) {
    const { satellite_id, timestamp, lat, lon, alt } = row;
    if (!satellites[satellite_id]) satellites[satellite_id] = new Cesium.SampledPositionProperty();
    satellites[satellite_id].addSample(julianFromIso(timestamp), cartesianFromLatLonAlt(lat, lon, alt));
  }

  return { satellites, contactData };
}
