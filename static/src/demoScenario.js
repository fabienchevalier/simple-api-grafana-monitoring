import { cartesianFromLatLonAlt } from './utils.js';
import { createSatelliteEntity } from './satelliteFactory.js';
import { addVisibilityCone } from './visibilityCones.js';
import { addHexCell } from './hexGrid.js';

export function setupDemoScenario(viewer, hexCells) {
  const now = Cesium.JulianDate.now();

  const parisLat = 48.8566;
  const parisLon = 2.3522;
  const altitude = 550; // km, Starlink-like LEO

  // Add real hex cell over Paris
  const label = 'Paris-Hex';
  const radiusKm = 100;
  const hexEntity = addHexCell(viewer, parisLat, parisLon, radiusKm, label);
  hexCells.push({ entity: hexEntity, center: { lat: parisLat, lon: parisLon, label } });

  // Shared path: same orbit path, sampled once
  const pathSamples = [
    [-300, parisLat - 10, parisLon - 30],
    [-200, parisLat - 5,  parisLon - 20],
    [-100, parisLat - 2,  parisLon - 10],
    [   0, parisLat,      parisLon     ],
    [ 100, parisLat + 2,  parisLon + 10],
    [ 200, parisLat + 5,  parisLon + 20],
    [ 300, parisLat + 10, parisLon + 30],
  ];

  const baseTime = Cesium.JulianDate.now();
  const orbitPropA = new Cesium.SampledPositionProperty();
  const orbitPropB = new Cesium.SampledPositionProperty();

  pathSamples.forEach(([offsetSec, lat, lon]) => {
    const timeA = Cesium.JulianDate.addSeconds(baseTime, offsetSec, new Cesium.JulianDate());
    const timeB = Cesium.JulianDate.addSeconds(baseTime, offsetSec + 60, new Cesium.JulianDate()); // SatB trails by 60s

    orbitPropA.addSample(timeA, cartesianFromLatLonAlt(lat, lon, altitude));
    orbitPropB.addSample(timeB, cartesianFromLatLonAlt(lat, lon, altitude));
  });

  const cones = {};

  const satA = createSatelliteEntity(viewer, 'SatA', orbitPropA);
  cones['SatA'] = addVisibilityCone(viewer, satA, 10);

  const satB = createSatelliteEntity(viewer, 'SatB', orbitPropB);
  cones['SatB'] = addVisibilityCone(viewer, satB, 10);

  return cones;
}
