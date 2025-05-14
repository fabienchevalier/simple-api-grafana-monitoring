export function createSatelliteEntity(viewer, id, position) {
  return viewer.entities.add({
    id,
    name: id,
    position,
    point: {
      pixelSize: 10,
      color: Cesium.Color.CYAN
    },
    label: {
      text: id,
      font: '14px sans-serif',
      fillColor: Cesium.Color.YELLOW,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      pixelOffset: new Cesium.Cartesian2(0, -12)
    },
    path: {
      material: Cesium.Color.YELLOW.withAlpha(0.8),
      width: 2,
      leadTime: 600,      // show future 10 min
      trailTime: 600,     // show past 10 min
      resolution: 10      // path sampling in seconds
    }
  });
}
