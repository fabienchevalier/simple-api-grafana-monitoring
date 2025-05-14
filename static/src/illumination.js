import { logHandover, updateBeamStatus } from './dashboardRenderer.js';

const ACTIVE = Cesium.Color.GREEN.withAlpha(0.4);
const INACTIVE = Cesium.Color.BLUE.withAlpha(0.2);
const activeMap = {};

export function monitorIllumination(viewer, cones, hexCells) {
  viewer.clock.onTick.addEventListener(() => {
    for (const [satId, cone] of Object.entries(cones)) {
      const pos = cone.position.getValue(viewer.clock.currentTime);
      if (!pos) continue;

      const carto = Cesium.Cartographic.fromCartesian(pos);
      const lat = Cesium.Math.toDegrees(carto.latitude);
      const lon = Cesium.Math.toDegrees(carto.longitude);

      hexCells.forEach(({ center }) => {
        const d = haversine(lat, lon, center.lat, center.lon);
        const illuminated = d < 200;
        const current = activeMap[center.label];

        if (illuminated && current !== satId) {
          activeMap[center.label] = satId;
          cone.cylinder.material = ACTIVE;
          updateBeamStatus(center.label, satId);
        }
        if (!illuminated && current === satId) {
          delete activeMap[center.label];
          cone.cylinder.material = INACTIVE;
          updateBeamStatus(center.label, null);
        }
      });
    }
  });
}

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = Cesium.Math.toRadians(lat2 - lat1);
  const dLon = Cesium.Math.toRadians(lon2 - lon1);
  const a = Math.sin(dLat/2)**2 + Math.cos(Cesium.Math.toRadians(lat1)) * Math.cos(Cesium.Math.toRadians(lat2)) * Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
