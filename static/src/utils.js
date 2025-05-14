export function julianFromIso(ts) {
  if (ts instanceof Date) {
    ts = ts.toISOString(); // Convert to ISO string if Date object
  }
  if (typeof ts !== 'string') {
    console.error("Invalid timestamp format", ts);
    return Cesium.JulianDate.now(); // fallback to current time
  }
  return Cesium.JulianDate.fromIso8601(ts);
}
  
export function cartesianFromLatLonAlt(lat, lon, alt) {
  return Cesium.Cartesian3.fromDegrees(lon, lat, alt * 1000);
}
  