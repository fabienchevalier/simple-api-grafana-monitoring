export function addHexCell(viewer, lat, lon, radiusKm, label) {
  if (radiusKm <= 0) {
    throw new Error("Hex radius must be > 0 km");
  }

  const pts = [];
  for (let i = 0; i < 6; i++) {
    const angle = 60 * i;
    const theta = Cesium.Math.toRadians(angle);
    const dx = radiusKm * Math.cos(theta);
    const dy = radiusKm * Math.sin(theta);
    const dLat = (dy / 6371) * (180 / Math.PI);
    const dLon = (dx / (6371 * Math.cos(Cesium.Math.toRadians(lat)))) * (180 / Math.PI);

    pts.push(Cesium.Cartesian3.fromDegrees(lon + dLon, lat + dLat));
  }
  pts.push(pts[0]); // close loop

  return viewer.entities.add({
    polygon: {
      hierarchy: new Cesium.PolygonHierarchy(pts),
      material: Cesium.Color.ORANGE.withAlpha(0.3),
      height: 0
    },
    label: {
      text: label,
      position: Cesium.Cartesian3.fromDegrees(lon, lat),
      font: '12px sans-serif',
    }
  });
}
