(() => {
'use strict';
document.documentElement.classList.replace('no-js', 'js');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const store = { get(k){ try { return localStorage.getItem(k); } catch(e){ return null; } }, set(k, v){ try { localStorage.setItem(k, v); } catch(e){} } };
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

/* ================= I18N (inglês vem do HTML) ================= */
const I18N = {
pt: {
  'skip':`Pular para o conteúdo`, 'nav.faces':`Faces`, 'nav.tax':`Taxonomia de nós`, 'nav.road':`Roadmap`, 'nav.log':`Changelog`, 'nav.back':`← Estação`,
  'hero.title':`Onde a Expctral está hoje, e o que vem a seguir.`,
  'hero.sub':`Cada face do ecossistema, lado a lado: a versão que existe agora, com evidência, e a próxima versão do roadmap. Nenhum número inventado.`,
  'hero.updated':`Última atualização`, 'hero.here':`Você está aqui`, 'loading':`Carregando dados da estação…`,
  'tax.title':`Prism Studio: a taxonomia completa de nós.`,
  'tax.sub':`52 nós em 8 categorias codificadas por cor, cada um com sua função TSL, sockets de entrada e saída e as propriedades do Inspector STN—004. Todos estão implementados no Station; os marcados como ao vivo também rodam no protótipo da landing.`,
  'tax.ph':`Buscar um nó, uma função ou um socket…`, 'tax.empty':`Nenhum nó corresponde a esta busca.`,
  'road.title':`Da fundação ao lançamento global.`,
  'road.sub':`Fases sequenciais com gates de saída: uma fase só fecha com zero erros de tipo e todos os testes verdes. O progresso é um checklist, nunca uma porcentagem inventada.`,
  'log.title':`O que mudou, e quando.`,
  'log.sub':`Cada entrada vem do histórico do repositório ou de um documento oficial, com link para o commit quando houver.`,
  'final.title':`Acompanhe cada atualização assim que ela sai.`,
  'final.p':`O código continua aberto sob Apache 2.0. Apoie a próxima fase ou acompanhe o repositório para ver cada commit chegar.`,
  'final.support':`Quero ser apoiador`, 'final.repo':`Acompanhar no GitHub`
},
zh: {
  'skip':`跳到正文`, 'nav.faces':`模块`, 'nav.tax':`节点分类`, 'nav.road':`路线图`, 'nav.log':`更新日志`, 'nav.back':`← 返回站点`,
  'hero.title':`Expctral 的现状，以及接下来的计划。`,
  'hero.sub':`生态中的每个模块并排展示：现有版本（附证据）与路线图中的下一版本。不含任何虚构数字。`,
  'hero.updated':`最近更新`, 'hero.here':`当前位置`, 'loading':`正在加载站点数据…`,
  'tax.title':`Prism Studio：完整的节点分类。`,
  'tax.sub':`8 个颜色编码类别中的 52 个节点，每个都列出 TSL 功能、输入输出接口及 Inspector STN—004 属性。全部已在 Station 中实现；标记为已上线的节点也在落地页原型中运行。`,
  'tax.ph':`搜索节点、功能或接口…`, 'tax.empty':`没有符合搜索条件的节点。`,
  'road.title':`从奠基到全球发布。`,
  'road.sub':`按顺序推进并设有退出关卡：只有类型检查零错误、测试全部通过，阶段才算完成。进度以清单呈现，绝不使用虚构的百分比。`,
  'log.title':`改了什么，何时改的。`,
  'log.sub':`每条记录都来自仓库历史或官方文档，如有提交则附带链接。`,
  'final.title':`第一时间关注每一次更新。`,
  'final.p':`代码依旧以 Apache 2.0 开放。支持下一阶段，或关注仓库，见证每一次提交。`,
  'final.support':`成为支持者`, 'final.repo':`在 GitHub 上关注`
}};
const UI = {
  en:{ now:'NOW', next:'NEXT', phase:'PHASE', weeks:'weeks', evidence:'evidence', all:'All', nodes:n => `${n} nodes`, showing:(a, b) => `${a} of ${b} nodes`,
       inLabel:'IN', outLabel:'OUT', props:'Inspector STN—004', liveProto:'LIVE IN PROTOTYPE', specified:'IN THE STATION', sources:'EVIDENCE', local:'local', commit:'commit', doc:'document',
       facesChanging:'Faces in this phase', here:'YOU ARE HERE', drag:'Drag to compare now and next', faces:'faces', loadFail:'Could not load the station data. Try reloading the page.' },
  pt:{ now:'AGORA', next:'PRÓXIMA', phase:'FASE', weeks:'semanas', evidence:'evidência', all:'Todas', nodes:n => `${n} nós`, showing:(a, b) => `${a} de ${b} nós`,
       inLabel:'ENT', outLabel:'SAI', props:'Inspector STN—004', liveProto:'AO VIVO NO PROTÓTIPO', specified:'NO STATION', sources:'EVIDÊNCIAS', local:'local', commit:'commit', doc:'documento',
       facesChanging:'Faces nesta fase', here:'VOCÊ ESTÁ AQUI', drag:'Arraste para comparar agora e próxima', faces:'faces', loadFail:'Não foi possível carregar os dados da estação. Recarregue a página.' },
  zh:{ now:'当前', next:'下一版', phase:'阶段', weeks:'周', evidence:'证据', all:'全部', nodes:n => `${n} 个节点`, showing:(a, b) => `显示 ${a} / ${b} 个节点`,
       inLabel:'输入', outLabel:'输出', props:'Inspector STN—004', liveProto:'原型中已上线', specified:'已在 Station 实现', sources:'证据', local:'本地', commit:'提交', doc:'文档',
       facesChanging:'本阶段涉及的模块', here:'当前位置', drag:'拖动以比较当前与下一版', faces:'个模块', loadFail:'无法加载站点数据，请刷新页面。' }
};
const META = {
  en:{ title:document.title, desc:document.querySelector('meta[name=description]').content, html:'en', loc:'en-US' },
  pt:{ title:'Atualizações da Expctral: status da estação, agora e próxima | WebGPU + TSL', desc:'Como cada face da Expctral está hoje e o que vem a seguir: Sinapse Engine, Prism Studio, Spectral Registry, Landing Hub, Dra. Ada, multiplayer, ejeção de código e governança. Changelog real e a taxonomia de 52 nós do Prism Studio.', html:'pt-BR', loc:'pt-BR' },
  zh:{ title:'Expctral 更新：站点状态、当前与下一版 | WebGPU + TSL', desc:'Expctral 各模块的现状与后续计划：Sinapse Engine、Prism Studio、Spectral Registry、Landing Hub、Dra. Ada、多人协作、代码导出与治理。真实更新日志与 Prism Studio 的 52 节点分类。', html:'zh-Hans', loc:'zh-CN' }
};
let lang = 'en';
const enText = {}, enPh = {}, langListeners = [];
document.querySelectorAll('[data-i18n]').forEach(el => { enText[el.dataset.i18n] = el.innerHTML; });
document.querySelectorAll('[data-i18n-ph]').forEach(el => { enPh[el.dataset.i18nPh] = el.getAttribute('placeholder'); });
let zhFont = false;
function setLang(next, save){
  if (!META[next]) next = 'en';
  lang = next;
  const dict = next === 'en' ? enText : I18N[next];
  document.querySelectorAll('[data-i18n]').forEach(el => { const k = el.dataset.i18n, v = dict[k] != null ? dict[k] : enText[k]; if (v != null && el.innerHTML !== v) el.innerHTML = v; });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => { const k = el.dataset.i18nPh; el.setAttribute('placeholder', next === 'en' ? enPh[k] : (I18N[next][k] || enPh[k])); });
  document.documentElement.lang = META[next].html; document.title = META[next].title;
  document.querySelector('meta[name=description]').content = META[next].desc;
  document.querySelectorAll('[data-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === next)));
  if (next === 'zh' && !zhFont){ zhFont = true; const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap'; document.head.appendChild(l); }
  if (save){ store.set('expctral-lang', next); try { const u = new URL(location.href); u.searchParams.set('lang', next); history.replaceState(null, '', u); } catch(e){} }
  langListeners.forEach(fn => fn());
}
document.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang, true)));
const L = o => (o && (o[lang] || o.en)) || '';

/* ================= REVEAL / ANO ================= */
document.getElementById('year').textContent = new Date().getFullYear();
function observeReveal(root){
  const els = (root || document).querySelectorAll('.reveal:not(.is-in)');
  if (!('IntersectionObserver' in window) || reduceMotion.matches){ els.forEach(el => el.classList.add('is-in')); return; }
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting){ e.target.classList.add('is-in'); io.unobserve(e.target); } }), { rootMargin:'0px 0px -8% 0px' });
  els.forEach(el => io.observe(el));
}
observeReveal();

/* ================= SINAPSE ENGINE (mesmo runtime da landing) ================= */
const BACKEND_LABEL = { webgpu:'WEBGPU ACTIVE', webgl2:'WEBGL2 FALLBACK', canvas2d:'CANVAS 2D FALLBACK', pending:'BOOTING RUNTIME' };
const BACKEND_SHORT = { webgpu:'WebGPU', webgl2:'WebGL2', canvas2d:'Canvas 2D', pending:'—' };
const PALETTE = { emerald:'#10B981', copper:'#FF9F1C', violet:'#A855F7', cyan:'#06B6D4' };
const countFromDensity = d => 1024 + Math.round(d * 240) * 64;
// O motor de GPU (createGpuVortex) mora em ../sinapse.js, compartilhado com a página inicial e com o worker
const sinapse = () => import('../sinapse.js');
const whenIdle = cb => {
  let done = false; const run = () => { if (!done){ done = true; cb(); } };
  const go = () => { if ('requestIdleCallback' in window) requestIdleCallback(run, { timeout:1500 }); setTimeout(run, 1200); };
  document.readyState === 'complete' ? go() : addEventListener('load', go, { once:true });
};
function create2dVortex(canvas){
  const ctx = canvas.getContext('2d'); if (!ctx) return null;
  const MAX = 4096, P = new Float32Array(MAX * 4);
  for (let i = 0; i < MAX; i++){ P[i*4] = .08 + Math.random() * .92; P[i*4+1] = Math.random() * Math.PI * 2; P[i*4+2] = Math.random(); P[i*4+3] = Math.random(); }
  let w = 0, h = 0, phase = 0, key = '', sprites = [];
  const rgb = hx => [1,3,5].map(i => parseInt(hx.slice(i, i+2), 16));
  const sprite = c => { const s = document.createElement('canvas'); s.width = s.height = 32; const g = s.getContext('2d'), gr = g.createRadialGradient(16,16,0,16,16,16);
    gr.addColorStop(0, `rgba(${c},1)`); gr.addColorStop(.22, `rgba(${c},.55)`); gr.addColorStop(1, `rgba(${c},0)`); g.fillStyle = gr; g.fillRect(0,0,32,32); return s; };
  return {
    backend:'canvas2d',
    resize(cw, ch){ const d = Math.min(window.devicePixelRatio || 1, 2); w = cw; h = ch; canvas.width = Math.round(cw*d); canvas.height = Math.round(ch*d); ctx.setTransform(d,0,0,d,0,0); },
    tilt(){},
    render(p, dt){
      phase += dt * p.speed * 2.4;
      const k = p.colorA + p.colorB;
      if (k !== key){ key = k; const A = rgb(PALETTE[p.colorA]), B = rgb(PALETTE[p.colorB]); sprites = Array.from({ length:12 }, (_, j) => sprite([0,1,2].map(i => Math.round(A[i] + (B[i]-A[i]) * j / 11)))); }
      ctx.globalCompositeOperation = 'source-over'; ctx.clearRect(0, 0, w, h); ctx.globalCompositeOperation = 'lighter';
      const cx = w/2, cy = h/2, R = Math.min(w, h*1.6) * .44, n = Math.min(countFromDensity(p.density), w < 480 ? 1400 : 2400), base = Math.max(6, R/22);
      for (let i = 0; i < n; i++){
        const r = P[i*4], a = P[i*4+1] + phase * (.35/(r+.12)), h1 = P[i*4+2], h2 = P[i*4+3];
        const s = base * (.5 + (1-r) * .9) * (.6 + h1 * .6);
        ctx.drawImage(sprites[Math.round(Math.max(0, Math.min(1, p.mix + (h2-.5)*.6)) * 11)], cx + Math.cos(a)*r*R - s/2, cy + Math.sin(a)*r*R*.5 + (h1-.5)*R*.08*(1-r) - s/2, s, s);
      }
    },
    dispose(){}
  };
}
function mountVortex(canvas, getParams, onState){
  let engine = null, booting = false, raf = 0, visible = false, last = 0, frames = 0, acc = 0;
  const size = () => { const r = canvas.getBoundingClientRect(); if (engine && r.width) engine.resize(r.width, r.height, window.devicePixelRatio || 1); };
  const tick = now => {
    const dt = last ? Math.min((now - last) / 1000, .1) : .016;
    // no worker, render() devolve false enquanto o quadro anterior não terminou: o FPS conta só o que foi desenhado
    if (engine.render(getParams(), dt) !== false){
      last = now; frames++; acc += dt;
      if (acc >= .5){ onState(engine.backend, Math.round(frames / acc), acc / frames * 1000); frames = 0; acc = 0; }
    }
    raf = requestAnimationFrame(tick);
  };
  const start = () => { if (engine && !raf && visible && !document.hidden && !reduceMotion.matches){ last = 0; raf = requestAnimationFrame(tick); } };
  const stop = () => { cancelAnimationFrame(raf); raf = 0; };
  const once = () => { if (engine && !raf) engine.render(getParams(), 0); };
  const boot = () => {
    if (booting) return; booting = true;
    whenIdle(async () => {
      let r;
      try { r = await (await sinapse()).bootVortex(canvas, { zoom:2.3 }, 10000); }
      catch (err){ r = { canvas, error:err }; }   // sinapse.js não carregou
      canvas = r.canvas;
      if (r.engine) engine = r.engine;
      else { console.warn('[Sinapse] GPU renderer unavailable, using Canvas 2D:', r.error); engine = create2dVortex(canvas); }
      if (!engine) return;
      size(); onState(engine.backend, 0, 0); once(); start();
    });
  };
  const host = canvas.parentElement;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible){ boot(); start(); } else stop(); }, { rootMargin:'300px' }).observe(host);
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
  new ResizeObserver(() => { size(); once(); }).observe(host);
  onState('pending', 0, 0);
  return { refresh: once, tilt:(x, y) => { if (engine){ engine.tilt(x, y); once(); } } };
}
const telEl = document.getElementById('telemetry'), telText = document.getElementById('telText'), orbMeta = document.getElementById('orbMeta');
const orbParams = { speed:.45, density:.5, colorA:'emerald', colorB:'violet', mix:.35 };
const orb = mountVortex(document.getElementById('orbCanvas'), () => orbParams, (backend, fps, ms) => {
  telEl.dataset.state = backend;
  telText.textContent = fps ? `${BACKEND_LABEL[backend]} // ${fps} FPS · ${ms.toFixed(1)} MS` : BACKEND_LABEL[backend];
  orbMeta.textContent = fps ? `three/webgpu r186 · ${BACKEND_SHORT[backend]} · ${fps} FPS` : `three/webgpu r186 · ${BACKEND_SHORT[backend]}`;
});
document.querySelector('.orb').addEventListener('pointermove', e => {
  const r = e.currentTarget.getBoundingClientRect();
  orb.tilt((e.clientX - r.left) / r.width * 2 - 1, (e.clientY - r.top) / r.height * 2 - 1);
});

/* ================= DADOS DA ESTAÇÃO ================= */
let DATA = null, activeFace = null, cmpView = 'now', split = 50, catFilter = 'all', logFilter = 'all';
const chip = s => `<span class="st" data-s="${s}" style="--sc:${DATA.statuses[s].color}">${esc(L(DATA.statuses[s]))}</span>`;
const fmtDate = iso => new Intl.DateTimeFormat(META[lang].loc, { day:'2-digit', month:'long', year:'numeric', timeZone:'UTC' }).format(new Date(iso + 'T12:00:00Z'));
const faceById = id => DATA.faces.find(f => f.id === id);

function renderHero(){
  document.getElementById('updated').textContent = fmtDate(DATA.updated);
  const note = document.getElementById('note'); note.hidden = !DATA.note; if (DATA.note) note.textContent = L(DATA.note);
  const ph = DATA.phases.find(p => p.n === DATA.currentPhase);
  document.getElementById('herePhase').textContent = `${UI[lang].phase} ${DATA.currentPhase} · ${L(ph.title)}`;
  const by = {}; DATA.faces.forEach(f => { by[f.status] = (by[f.status] || 0) + 1; });
  document.getElementById('counts').innerHTML = Object.keys(DATA.statuses).filter(s => by[s]).map(s =>
    `<div class="count glass"><b class="num">${by[s]}</b>${chip(s)}</div>`).join('');
}

/* ---------- seletor de faces ---------- */
const tabsEl = document.getElementById('faceTabs'), panel = document.getElementById('facePanel');
function renderTabs(){
  tabsEl.innerHTML = DATA.faces.map(f =>
    `<button type="button" class="ftab" role="tab" id="tab-${f.id}" aria-controls="facePanel" aria-selected="${f.id === activeFace}" tabindex="${f.id === activeFace ? 0 : -1}" style="--fc:${f.color}" data-face="${f.id}"><i></i>${esc(f.id === 'orbit' ? L({ en:'Multiplayer / Orbit', pt:'Multiplayer / Órbita', zh:'多人协作 / 轨道' }) : f.id === 'eject' ? L({ en:'Code Ejection', pt:'Ejeção de Código', zh:'代码导出' }) : f.id === 'governance' ? L({ en:'Governance', pt:'Governança', zh:'治理' }) : f.name)}</button>`).join('');
}
tabsEl.addEventListener('click', e => { const b = e.target.closest('[data-face]'); if (b) selectFace(b.dataset.face, true); });
tabsEl.addEventListener('keydown', e => {
  const ids = DATA.faces.map(f => f.id), i = ids.indexOf(activeFace);
  const d = { ArrowRight:1, ArrowLeft:-1, Home:-i, End:ids.length - 1 - i }[e.key];
  if (d === undefined) return; e.preventDefault();
  const id = ids[(i + d + ids.length) % ids.length]; selectFace(id, true); document.getElementById('tab-' + id).focus();
});

/* ---------- painel: comparador AGORA ↔ PRÓXIMA ---------- */
const capList = items => `<ul class="caps">${items.map(it =>
  `<li><span>${esc(L(it.t))}</span>${chip(it.s)}${it.ev ? `<a href="${esc(it.ev)}">↗ ${esc(UI[lang].evidence)}</a>` : ''}</li>`).join('')}</ul>`;
function renderPanel(){
  const f = faceById(activeFace); if (!f) return;
  const name = tabsEl.querySelector(`[data-face="${f.id}"]`).textContent;
  panel.setAttribute('aria-labelledby', 'tab-' + f.id);
  panel.style.setProperty('--fc', f.color);
  panel.innerHTML = `
    <div class="face-head" id="face-${f.id}">
      <div>
        <p class="tag">${esc(f.tag)}</p>
        <div class="face-title"><h2 class="h h2">${esc(name)}</h2>${chip(f.status)}</div>
      </div>
      <p class="lead">${esc(L(f.now.summary))}</p>
    </div>
    <div class="cmp-tabs" role="group" aria-label="${esc(UI[lang].drag)}">
      <button type="button" data-view="now" aria-pressed="${cmpView === 'now'}">${UI[lang].now}</button>
      <button type="button" data-view="next" aria-pressed="${cmpView === 'next'}">${UI[lang].next}</button>
    </div>
    <div class="cmp" data-view="${cmpView}" style="--split:${split}%">
      <article class="side side--now glass reticle">
        <p class="v"><b>${UI[lang].now}</b></p>
        <h3 class="h">${esc(L(f.now.version))}</h3>
        ${capList(f.now.items)}
        ${f.sources && f.sources.length ? `<div class="srcs"><p class="v">${UI[lang].sources}</p><ul>${f.sources.map(x => `<li>${esc(L(x))}</li>`).join('')}</ul></div>` : ''}
      </article>
      <div class="divider" role="slider" tabindex="0" aria-label="${esc(UI[lang].drag)}" aria-valuemin="25" aria-valuemax="75" aria-valuenow="${split}" aria-orientation="horizontal"><span aria-hidden="true">⇿</span></div>
      <article class="side side--next glass reticle">
        <p class="v"><b>${UI[lang].next}</b> · ${UI[lang].phase} ${f.next.phase}</p>
        <h3 class="h">${esc(L(f.next.version))}</h3>
        <p>${esc(L(f.next.summary))}</p>
        ${capList(f.next.items)}
      </article>
    </div>
    <div class="face-links">${f.links.map(l => `<a class="btn btn--glass btn--sm" href="${esc(l.href)}">${esc(L(l.label))} ↗</a>`).join('')}</div>`;
  wireCompare();
}
function wireCompare(){
  const cmp = panel.querySelector('.cmp'), div = panel.querySelector('.divider');
  panel.querySelectorAll('.cmp-tabs [data-view]').forEach(b => b.addEventListener('click', () => {
    cmpView = b.dataset.view; cmp.dataset.view = cmpView;
    panel.querySelectorAll('.cmp-tabs [data-view]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
  }));
  const setSplit = v => { split = Math.round(Math.max(25, Math.min(75, v))); cmp.style.setProperty('--split', split + '%'); div.setAttribute('aria-valuenow', split); };
  let drag = false;
  div.addEventListener('pointerdown', e => { drag = true; try { div.setPointerCapture(e.pointerId); } catch(err){} });
  div.addEventListener('pointermove', e => { if (!drag) return; const r = cmp.getBoundingClientRect(); setSplit((e.clientX - r.left) / r.width * 100); });
  ['pointerup','pointercancel'].forEach(ev => div.addEventListener(ev, () => { drag = false; }));
  div.addEventListener('keydown', e => {
    const d = { ArrowLeft:-5, ArrowRight:5, Home:-100, End:100 }[e.key]; if (d === undefined) return;
    e.preventDefault(); setSplit(split + d);
  });
}
function selectFace(id, push){
  if (!faceById(id)) id = DATA.faces[0].id;
  activeFace = id;
  tabsEl.querySelectorAll('[data-face]').forEach(b => { const on = b.dataset.face === id; b.setAttribute('aria-selected', String(on)); b.tabIndex = on ? 0 : -1; });
  renderPanel();
  const t = document.getElementById('tab-' + id); if (t && t.scrollIntoView) t.scrollIntoView({ block:'nearest', inline:'center' });
  if (push){ try { history.replaceState(null, '', `${location.pathname}${location.search}#face-${id}`); } catch(e){} }
}

/* ---------- taxonomia ---------- */
const PIN = { Float:'#FF9F1C', Vector2:'#38BDF8', Vector3:'#06B6D4', Vector4:'#A855F7', Color:'#A855F7' };
const pins = s => s === '—' ? '<span class="pin" style="--pc:#7E879A">—</span>' :
  s.split(/,\s*(?![^()]*\))/).map(part => { const m = part.match(/\(([^)]+)\)/); const t = m ? m[1].split(/\s*\/\s*/)[0] : ''; return `<span class="pin" style="--pc:${PIN[t] || '#A3ABBA'}">${esc(part.trim())}</span>`; }).join('');
function fuzzy(q, text){
  q = q.toLowerCase(); text = text.toLowerCase(); if (!q) return 1;
  if (text.includes(q)) return 100;
  let ti = 0, score = 0; for (const ch of q){ const f = text.indexOf(ch, ti); if (f < 0) return 0; score += f === ti ? 3 : 1; ti = f + 1; }
  return score;
}
function renderTaxonomy(){
  const T = DATA.taxonomy, total = T.categories.reduce((a, c) => a + c.nodes.length, 0);
  document.getElementById('taxSource').textContent = L(T.source);
  document.getElementById('taxCats').innerHTML =
    `<button type="button" class="cat" data-cat="all" aria-pressed="${catFilter === 'all'}" style="--cc:#E9ECF2"><i></i>${UI[lang].all} <small>${total}</small></button>` +
    T.categories.map(c => `<button type="button" class="cat" data-cat="${c.id}" aria-pressed="${catFilter === c.id}" style="--cc:${c.color}" title="${esc(L(c.about))}"><i></i>${c.id}${L(c.name) !== c.id ? ' · ' + esc(L(c.name)) : ''} <small>${c.nodes.length}</small></button>`).join('');
  document.getElementById('nodes').innerHTML = T.categories.flatMap(c => c.nodes.map(n =>
    `<article class="nd glass" style="--cc:${c.color}" data-cat="${c.id}" data-q="${esc(`${n.name} ${c.id} ${L(c.name)} ${L(n.desc)} ${n.in} ${n.out} ${L(n.props)}`)}">
      <div class="nd-head"><h3>${esc(n.name)}<em>[${c.id}]</em></h3><span style="display:flex;flex-direction:column;gap:.3rem;align-items:flex-end"><span class="st" data-s="built" style="--sc:#34D399">${UI[lang].specified}</span>${n.live ? `<span class="st" data-s="live" style="--sc:#10B981">${UI[lang].liveProto}</span>` : ''}</span></div>
      <p>${esc(L(n.desc))}</p>
      <div class="io"><div class="io-row"><b>${UI[lang].inLabel}</b>${pins(n.in)}</div><div class="io-row"><b>${UI[lang].outLabel}</b>${pins(n.out)}</div></div>
      <p class="props"><b>${UI[lang].props}</b> · ${esc(L(n.props))}</p>
    </article>`)).join('');
  filterTaxonomy();
}
function filterTaxonomy(){
  const q = document.getElementById('taxSearch').value.trim(); let shown = 0, total = 0;
  document.querySelectorAll('#nodes .nd').forEach(el => {
    total++;
    // trecho exato em qualquer campo, ou busca aproximada só no nome do nó
    const name = el.querySelector('h3').firstChild.textContent;
    const ok = (catFilter === 'all' || el.dataset.cat === catFilter) && (!q || el.dataset.q.toLowerCase().includes(q.toLowerCase()) || fuzzy(q, name) > 0);
    el.hidden = !ok; if (ok) shown++;
  });
  document.getElementById('taxCount').textContent = UI[lang].showing(shown, total);
  document.getElementById('taxEmpty').hidden = shown > 0;
}
document.getElementById('taxSearch').addEventListener('input', filterTaxonomy);
document.getElementById('taxCats').addEventListener('click', e => {
  const b = e.target.closest('[data-cat]'); if (!b) return;
  catFilter = b.dataset.cat; document.querySelectorAll('#taxCats [data-cat]').forEach(x => x.setAttribute('aria-pressed', String(x === b))); filterTaxonomy();
});

/* ---------- roadmap ---------- */
const faceChip = id => { const f = faceById(id); return `<button type="button" class="fchip" data-goto="${id}" style="--fc:${f.color}"><i></i>${esc(tabsEl.querySelector(`[data-face="${id}"]`).textContent)}</button>`; };
function renderPhases(){
  document.getElementById('phases').innerHTML = DATA.phases.map(p => {
    const here = p.n === DATA.currentPhase;
    return `<li class="ph glass reticle${here ? ' is-here' : ''}">
      <div class="n"><span>${UI[lang].phase} ${p.n} // ${p.weeks} ${UI[lang].weeks}</span>${here ? `<span class="here"><i class="pulse"></i>${UI[lang].here}</span>` : ''}</div>
      <h3 class="h">${esc(L(p.title))}</h3>
      <ul>${p.items.map(it => `<li>${esc(L(it.t))} ${chip(it.s)}</li>`).join('')}</ul>
      <div class="fchips" aria-label="${esc(UI[lang].facesChanging)}">${p.faces.map(faceChip).join('')}</div>
    </li>`;
  }).join('');
}

/* ---------- changelog ---------- */
function renderLog(){
  const used = [...new Set(DATA.changelog.flatMap(e => e.faces))];
  document.getElementById('logFilter').innerHTML =
    `<button type="button" class="fchip" data-lf="all" aria-pressed="${logFilter === 'all'}" style="--fc:#E9ECF2"><i></i>${UI[lang].all}</button>` +
    DATA.faces.filter(f => used.includes(f.id)).map(f => `<button type="button" class="fchip" data-lf="${f.id}" aria-pressed="${logFilter === f.id}" style="--fc:${f.color}"><i></i>${esc(tabsEl.querySelector(`[data-face="${f.id}"]`).textContent)}</button>`).join('');
  document.getElementById('log').innerHTML = DATA.changelog.map(e =>
    `<li data-faces="${e.faces.join(' ')}" ${logFilter !== 'all' && !e.faces.includes(logFilter) ? 'hidden' : ''}>
      <time datetime="${e.date}">${esc(fmtDate(e.date))}</time><span class="ver">${esc(e.version)}</span>
      <h3 class="h">${esc(L(e.title))}</h3>
      <ul>${e.items.map(i => `<li>${esc(L(i))}</li>`).join('')}</ul>
      <div class="row">${e.commit ? (e.local ? `<span class="commit commit--local">${UI[lang].commit} ${e.commit} · ${UI[lang].local}</span>` : `<a class="commit" href="${DATA.repo}/commit/${e.commit}" target="_blank" rel="noopener">${UI[lang].commit} ${e.commit} ↗</a>`) : (e.local ? `<span class="commit commit--local">${UI[lang].local}</span>` : '')}${e.faces.map(faceChip).join('')}</div>
    </li>`).join('');
}
document.getElementById('logFilter').addEventListener('click', e => {
  const b = e.target.closest('[data-lf]'); if (!b) return;
  logFilter = b.dataset.lf;
  document.querySelectorAll('#logFilter [data-lf]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
  document.querySelectorAll('#log > li').forEach(li => { li.hidden = logFilter !== 'all' && !li.dataset.faces.split(' ').includes(logFilter); });
});
// chips de face (roadmap e changelog) levam ao painel da face
document.addEventListener('click', e => {
  const b = e.target.closest('[data-goto]'); if (!b) return;
  selectFace(b.dataset.goto, true);
  document.getElementById('faces').scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth' });
});

function renderAll(){ if (!DATA) return; renderHero(); renderTabs(); renderPanel(); renderTaxonomy(); renderPhases(); renderLog(); }
langListeners.push(renderAll);
function faceFromHash(){ const m = location.hash.match(/^#face-([a-z]+)/); return m ? m[1] : null; }
addEventListener('hashchange', () => { const id = faceFromHash(); if (id && DATA){ selectFace(id); document.getElementById('faces').scrollIntoView(); } });

/* ================= IDIOMA + CARGA ================= */
// Rótulos técnicos que ficam em inglês nos três idiomas (EJECT TYPESCRIPT, VISUAL WAVE…): lang="en" faz o leitor de tela
// ler com a pronúncia certa quando a página está em português ou chinês (WCAG 3.1.2).
document.querySelectorAll('.eyebrow, .tac, .btn--tac, .stage-label, .chip').forEach(el => {
  if (!el.hasAttribute('data-i18n') && !el.querySelector('[data-i18n]') && !el.closest('[data-i18n]')) el.lang = 'en';
});
const q = new URLSearchParams(location.search).get('lang');
const navLang = (navigator.language || 'en').toLowerCase();
setLang(META[q] ? q : (store.get('expctral-lang') || (navLang.startsWith('pt') ? 'pt' : navLang.startsWith('zh') ? 'zh' : 'en')), false);
fetch('data.json', { cache:'no-cache' }).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); }).then(d => {
  DATA = d; activeFace = faceFromHash() || 'prism';
  if (!faceById(activeFace)) activeFace = DATA.faces[0].id;
  renderAll();
  if (faceFromHash()) document.getElementById('faces').scrollIntoView();
  observeReveal();
}).catch(err => { console.warn('[Updates] data.json', err); panel.innerHTML = `<p class="loading">${UI[lang].loadFail}</p>`; });
})();
