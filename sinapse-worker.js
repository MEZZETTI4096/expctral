// Worker da Sinapse Engine: desenha o vórtice num OffscreenCanvas, fora da linha principal da página.
// Import maps não valem dentro de workers, por isso a three vem pela URL completa (a TSL está em THREE.TSL).
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.186.1/build/three.webgpu.min.js';
import { createGpuVortex } from './sinapse.js';

let engine = null;
self.onmessage = async ({ data:m }) => {
  try {
    if (m.t === 'init'){ engine = await createGpuVortex(THREE, m.canvas, m.opts); self.postMessage({ t:'ready', backend:engine.backend }); return; }
    if (!engine) return;
    if (m.t === 'size') engine.resize(m.w, m.h, m.dpr);
    else if (m.t === 'tilt') engine.tilt(m.x, m.y);
    else if (m.t === 'draw'){ engine.render(m.p, m.dt); self.postMessage({ t:'drawn' }); }
  } catch (err){
    self.postMessage({ t:'fail', msg:String((err && err.message) || err) });
  }
};
