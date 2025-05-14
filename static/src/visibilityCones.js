export function addVisibilityCone(viewer, satEntity, minElevation = 10) {
  const h = 600_000;
  const theta = Cesium.Math.toRadians(minElevation);
  const r = h * Math.tan(theta);

  const posProp = satEntity.position;

  return viewer.entities.add({
    id: `${satEntity.id}_cone`,
    position: new Cesium.CallbackProperty(() => {
      const tip = posProp.getValue(viewer.clock.currentTime);
      if (!tip) return null;

      const carto = Cesium.Cartographic.fromCartesian(tip);
      const normal = Cesium.Ellipsoid.WGS84.geodeticSurfaceNormalCartographic(carto);
      const offset = Cesium.Cartesian3.multiplyByScalar(normal, -h / 2, new Cesium.Cartesian3());
      return Cesium.Cartesian3.add(tip, offset, new Cesium.Cartesian3());
    }, false),

    cylinder: {
      length: h,
      topRadius: 0,
      bottomRadius: r,
      material: Cesium.Color.YELLOW.withAlpha(0.3),
      outline: true,
      outlineColor: Cesium.Color.WHITE
    },

    orientation: new Cesium.CallbackProperty(() => {
      const tip = posProp.getValue(viewer.clock.currentTime);
      if (!tip) return null;
    
      const carto = Cesium.Cartographic.fromCartesian(tip);
      const normal = Cesium.Ellipsoid.WGS84.geodeticSurfaceNormalCartographic(carto);
      const up = Cesium.Cartesian3.normalize(normal, new Cesium.Cartesian3()); // points away from Earth
    
      // Now invert to get "down"
      const zAxis = up;
    
      const xAxis = Cesium.Cartesian3.cross(Cesium.Cartesian3.UNIT_Z, zAxis, new Cesium.Cartesian3());
      Cesium.Cartesian3.normalize(xAxis, xAxis);
      const yAxis = Cesium.Cartesian3.cross(zAxis, xAxis, new Cesium.Cartesian3());
    
      const matrix3 = new Cesium.Matrix3();
      Cesium.Matrix3.setColumn(matrix3, 0, xAxis, matrix3);
      Cesium.Matrix3.setColumn(matrix3, 1, yAxis, matrix3);
      Cesium.Matrix3.setColumn(matrix3, 2, zAxis, matrix3);
    
      return Cesium.Quaternion.fromRotationMatrix(matrix3, new Cesium.Quaternion());
    }, false)
    
  });
}
