// Sinapse Engine da landing: o vórtice de partículas em three/webgpu + TSL (r186).
// Usado pela página inicial (hero e prévia do Prism Studio) e por /atualizacoes/.
// Roda dentro de sinapse-worker.js (OffscreenCanvas, fora da linha principal da página) ou, em navegadores
// sem worker com canvas, na própria página. Não importa a three: quem chama passa o módulo `three/webgpu`.
export const PALETTE = { emerald:'#10B981', copper:'#FF9F1C', violet:'#A855F7', cyan:'#06B6D4' };
export const countFromDensity = d => 1024 + Math.round(d * 240) * 64;   // 1 024 … 16 384, múltiplos de 64

// opts.wrangler: monta as vistas isoladas do Node Wrangler (só o Prism Studio usa)
// opts.zoom: distância da câmera em telas largas
export async function createGpuVortex(THREE, canvas, opts){
  opts = opts || {};
  const { Fn, uniform, instancedArray, instanceIndex, hash, float, vec3, color, mix, clamp, sin, cos, abs, fract, uv, length, smoothstep, select } = THREE.TSL;
  const renderer = new THREE.WebGPURenderer({ canvas, antialias:true, alpha:true });
  await renderer.init();
  const isGPU = renderer.backend && renderer.backend.isWebGPUBackend === true;
  renderer.setClearColor(0x000000, 0);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.01, 50);
  const MAX = 16384, TAU = 6.2831853;
  const U = {
    phase:uniform(0), clock:uniform(0), mix:uniform(0.35),
    a:uniform(new THREE.Color(PALETTE.emerald)), b:uniform(new THREE.Color(PALETTE.violet)),
    turb:uniform(0), twist:uniform(0), pulse:uniform(0), size:uniform(1), view:uniform(0)
  };
  // Mesma TSL do arquivo ejetado (genTS)
  const radius = i => hash(i).mul(0.92).add(0.08);
  const vortex = Fn(([i]) => {
    const r = radius(i);
    const a = hash(i.add(7)).mul(TAU).add(U.phase.mul(0.35).div(r.add(0.12))).add(U.twist.mul(r).mul(6.0));
    const n1 = sin(U.clock.mul(1.7).add(hash(i.add(11)).mul(TAU)));
    const n2 = sin(U.clock.mul(2.3).add(hash(i.add(13)).mul(TAU)));
    const rr = r.add(n1.mul(U.turb).mul(0.06));
    const y = hash(i.add(3)).sub(0.5).mul(0.12).mul(float(1).sub(r)).add(n2.mul(U.turb).mul(0.14));
    return vec3(cos(a).mul(rr), y, sin(a).mul(rr));
  });
  const material = new THREE.SpriteNodeMaterial({ transparent:true, depthWrite:false, blending:THREE.AdditiveBlending });
  let computeNode = null;
  if (isGPU){
    const positions = instancedArray(MAX, 'vec3');
    computeNode = Fn(() => { positions.element(instanceIndex).assign(vortex(instanceIndex)); })().compute(MAX);
    material.positionNode = positions.toAttribute();
  } else {
    material.positionNode = vortex(instanceIndex);   // WebGL2: mesma função no vertex stage
  }
  const i = instanceIndex, r = radius(i);
  const k = clamp(U.mix.add(hash(i.add(1)).sub(0.5).mul(0.6)).add(sin(U.clock.mul(3.0).add(r.mul(6.0))).mul(U.pulse).mul(0.45)), 0, 1);
  let colorNode = mix(U.a, U.b, k);
  if (opts.wrangler){
    // Node Wrangler: uma vista isolada por nó (0 = render completo). O hero não usa e monta um shader menor.
    const white = vec3(0.92, 0.94, 0.98), dim = vec3(0.12, 0.13, 0.16);
    const views = [
      [1, mix(dim, white, sin(U.phase.mul(2.0)).mul(0.5).add(0.5))],                                              // Time
      [2, mix(color(0x06B6D4), color(0xFF9F1C), clamp(float(0.35).div(r.add(0.12)).div(3.0), 0, 1))],            // Speed
      [3, white],                                                                                                // Density
      [4, mix(U.a, U.b, r)],                                                                                      // Spectrum ramp
      [5, mix(dim, color(0xFF9F1C), abs(sin(U.clock.mul(1.7).add(hash(i.add(11)).mul(TAU)))).mul(U.turb))],     // Turbulence
      [6, mix(dim, color(0xA855F7), fract(U.twist.mul(r).mul(6.0).div(TAU)))],                                    // Twist
      [7, mix(dim, color(0x10B981), sin(U.clock.mul(3.0).add(r.mul(6.0))).mul(0.5).add(0.5).mul(U.pulse))],       // Pulse
      [8, mix(dim, color(0x06B6D4), hash(i.add(5)))]                                                              // Scale
    ];
    for (const [v, c] of views) colorNode = select(U.view.equal(v), c, colorNode);
  }
  material.colorNode = colorNode;
  material.opacityNode = float(1).sub(smoothstep(0, 0.5, length(uv().sub(0.5))));
  material.scaleNode = hash(i.add(5)).mul(0.014).add(0.008).mul(U.size);
  const particles = new THREE.Sprite(material);
  particles.count = 4096; particles.frustumCulled = false;
  scene.add(particles);
  let tiltX = 0, tiltY = 0;
  return {
    backend: isGPU ? 'webgpu' : 'webgl2',
    resize(w, h, dpr){ renderer.setPixelRatio(Math.min(dpr || 1, 2)); renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); },
    tilt(x, y){ tiltX = x; tiltY = y; },
    render(p, dt){
      if (!p.frozen){ U.phase.value += dt * p.speed * 2.4; U.clock.value += dt; }
      U.mix.value = p.mix; U.a.value.set(PALETTE[p.colorA]); U.b.value.set(PALETTE[p.colorB]);
      U.turb.value = p.turb || 0; U.twist.value = p.twist || 0; U.pulse.value = p.pulse || 0; U.size.value = p.size || 1; U.view.value = p.view || 0;
      particles.count = countFromDensity(p.density);
      const zoom = camera.aspect < 1.1 ? 2.9 : (opts.zoom || 2.25);
      if (p.cam) camera.position.set(p.cam.x, p.cam.y, p.cam.z); else camera.position.set(tiltX * 0.35, 1.2 + tiltY * 0.25, zoom);
      camera.lookAt(0, 0, 0);
      if (computeNode) renderer.compute(computeNode);
      renderer.render(scene, camera);
    },
    dispose(){ renderer.dispose(); material.dispose(); }
  };
}

/* Liga o vórtice num canvas. Primeiro tenta o worker (OffscreenCanvas): a montagem do shader e cada quadro
   rodam fora da linha principal, então a página continua respondendo enquanto o 3D carrega.
   Sem worker com canvas, roda aqui mesmo (three/webgpu pelo import map da página).
   Devolve { canvas, engine } ou { canvas, error } (quem chama cai para o Canvas 2D). `canvas` pode ser um clone novo,
   porque um canvas transferido para o worker ou com contexto de GPU não serve mais para o 2D. */
export async function bootVortex(canvas, opts, timeoutMs){
  const limit = (p, ms) => Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error('GPU init timeout')), ms))]);
  const fresh = () => { const c = canvas.cloneNode(false); canvas.replaceWith(c); canvas = c; return c; };
  if (canvas.transferControlToOffscreen && typeof Worker === 'function'){
    let worker = null;
    try {
      worker = new Worker(new URL('./sinapse-worker.js', import.meta.url), { type:'module' });
      const off = canvas.transferControlToOffscreen();
      const backend = await limit(new Promise((res, rej) => {
        worker.onmessage = ({ data:m }) => m.t === 'ready' ? res(m.backend) : rej(Object.assign(new Error(m.msg), { gpu:true }));
        worker.onerror = e => { e.preventDefault(); rej(new Error('worker: ' + (e.message || 'load error'))); };
        worker.postMessage({ t:'init', canvas:off, opts }, [off]);
      }), timeoutMs);
      return { canvas, engine: workerEngine(worker, backend) };
    } catch (err){
      if (worker) worker.terminate();
      fresh();
      if (err.gpu || /timeout/.test(err.message)) return { canvas, error:err };   // a GPU falhou de verdade: tentar de novo aqui só travaria a página
      console.warn('[Sinapse] worker unavailable, rendering on the main thread:', err);
    }
  }
  let gpu = null;
  try {
    const THREE = await import('three/webgpu');   // o download do runtime não conta no tempo limite
    gpu = createGpuVortex(THREE, canvas, opts);
    return { canvas, engine: await limit(gpu, timeoutMs) };
  } catch (err){
    if (gpu) gpu.then(e => e.dispose(), () => {});
    fresh(); return { canvas, error:err };
  }
}

// Fachada do worker com a mesma interface do motor local. render() devolve false enquanto o quadro anterior
// ainda não terminou: assim o FPS medido é o que a GPU realmente entrega.
function workerEngine(worker, backend){
  let busy = false;
  worker.onmessage = ({ data:m }) => { if (m.t === 'drawn') busy = false; else if (m.t === 'fail'){ busy = false; console.warn('[Sinapse]', m.msg); } };
  return {
    backend,
    resize(w, h, dpr){ worker.postMessage({ t:'size', w, h, dpr }); },
    tilt(x, y){ worker.postMessage({ t:'tilt', x, y }); },
    render(p, dt){ if (busy) return false; busy = true; worker.postMessage({ t:'draw', p, dt }); return true; },
    dispose(){ worker.terminate(); }
  };
}
