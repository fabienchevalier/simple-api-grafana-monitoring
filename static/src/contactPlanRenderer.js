import { CELL_COORDINATES } from './constants.js';
import { julianFromIso, cartesianFromLatLonAlt } from './utils.js';

export function renderContactPlan(viewer, data) {
  for (const e of data) {
    const pos = CELL_COORDINATES[e.ground_cell];
    if (!pos) continue;

    const start = julianFromIso(e.start_time);
    const end = julianFromIso(e.end_time);

    viewer.entities.add({
      position: cartesianFromLatLonAlt(pos.lat, pos.lon, 0),
      availability: new Cesium.TimeIntervalCollection([
        new Cesium.TimeInterval({ start, stop: end }),
      ]),
      ellipse: {
        semiMinorAxis: 10_000,
        semiMajorAxis: 10_000,
        material: Cesium.Color.GREEN.withAlpha(0.3),
      },
      description: `
        Beam: ${e.beam_angle}°<br/>
        Budget: ${e.link_budget} dBm<br/>
        Status: ${e.status}
      `
    });
  }
}
