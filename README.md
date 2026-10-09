# Expctral — Landing Hub V2

Landing page da **Expctral**, ecossistema open-core de criação 3D no navegador (WebGPU + TSL, Apache 2.0), de Gabriel Mezzetti — Mezzetti⁴⁰⁹⁶ Studio.

- Página no ar: https://mezzetti4096.github.io/expctral/
- Idiomas: inglês, português e chinês (`?lang=en`, `?lang=pt`, `?lang=zh`)

## O que tem na V2
- **Sinapse Engine real no hero e no Prism Studio**: `THREE.WebGPURenderer` (three r186, via CDN) com TSL — compute shader em storage buffer no WebGPU, fallback automático para WebGL2 e, sem GPU, para Canvas 2D.
- **Telemetria ao vivo**: FPS, tempo de quadro e renderizador medidos no navegador de quem visita (nada fixo).
- **Protótipo do Prism Studio**: grafo de nós arrastável, 4 frequências (Visual/Math/TSL/WebGPU) com som sintético (Web Audio), Primordial Spectra, Refract e Eject TypeScript — o `.ts` ejetado é a mesma TSL que desenha a prévia.
- Design System Obsidian: Thermal Radiance (esmeralda, cobre, violeta, ciano), squircles de 28px, vidro tático, retículas `+` a 40% e brand patterns (raio, vórtice, ejeção).
- Schema.org (AIO/GEO): Organization, Person e SoftwareApplication.

## V3 (prompts de implementação executados)
- **Prism Studio**: Quick-Add em anel radial com busca fuzzy (`Tab`/`Espaço` sob o cursor), nós modificadores (Turbulence, Twist, Pulse, Scale) que entram na TSL real, Node Wrangler (`Alt`+clique isola a prévia do nó), bypass com `M`, pulso luminoso nos fios ao mexer nos sliders, Path Editor ("Trajeto") da câmera em Catmull-Rom e sourcemap bidirecional nó ↔ linhas de TSL.
- **Multiplayer**: CRDT Yjs (Y.Map / Y.Array) sincronizando abas do mesmo navegador via BroadcastChannel, com presença e cursores. A sincronização na borda (y-websocket em Cloudflare Workers) fica para a Fase 2.
- **Spectral Registry**: catálogo de pacotes `.exp` com busca e filtros, Refract com árvore de linhagem imutável, simulação do split 85/15, importar (arrastar e soltar) e exportar `.exp`.
- **Eject** no formato de editor (abas, numeração de linhas, cabeçalho SPDX Apache-2.0).
- **Dra. Ada**: dock com diagnóstico e auto-fix por regras, lendo o estado real do grafo. O modelo local (ONNX Runtime Web + Transformers.js) é Fase 2 — a página não finge que ele está rodando.
- **Apoio**: botões abrem o enquadramento OSC / GitHub Sponsors; barras de meta ficam "pendentes" até `FUNDING.raisedBRL` ser preenchido.
- Runtime WebGPU carregado de forma lazy (após o load, em tempo ocioso, quando o canvas fica visível).

## Configuração
Arquivo único (`index.html`), sem build. No início do script, o objeto `LINKS` guarda os links que ainda não existem
(apoio/checkout, B2B, WhatsApp, Discord, X). Enquanto estiverem vazios, os botões de apoio mostram "Abertura em breve"
e o WhatsApp não aparece. Preencha e publique para ativar. `FUNDING.raisedBRL` (logo abaixo) liga as barras de progresso das metas.
