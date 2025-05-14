import { addHexCell } from './hexGrid.js';

export function tileEarthWithHexes(viewer, radiusKm = 50) {
  const hexCells = [];
  const stepLat = (radiusKm / 111); // 1 degree ~ 111 km
  const stepLon = (radiusKm / 111); // will adjust by cos(lat)

  for (let lat = -80; lat <= 80; lat += stepLat * 0.866) { // offset rows (cos(30°) ~ 0.866)
    const rowOffset = (lat % (stepLat * 2)) === 0 ? 0 : stepLon / 2;
    for (let lon = -180; lon <= 180; lon += stepLon) {
      const actualLon = lon + rowOffset;
      const label = `H-${lat.toFixed(1)}-${actualLon.toFixed(1)}`;
      const entity = addHexCell(viewer, lat, actualLon, radiusKm, label);
      hexCells.push({ entity, center: { lat, lon: actualLon, label } });
    }
  }

  return hexCells;
}
