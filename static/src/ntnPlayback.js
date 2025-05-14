export function createPlaybackController(viewer) {
    const clock = viewer.clock;
    clock.shouldAnimate = true;
    clock.multiplier = 30;
  
    return {
      pause() { clock.shouldAnimate = false; },
      resume() { clock.shouldAnimate = true; },
      setSpeed(x) { clock.multiplier = parseFloat(x); },
      jumpTo(t) { clock.currentTime = Cesium.JulianDate.fromIso8601(t); }
    };
  }
  