(() => {
'use strict';
document.documentElement.classList.replace('no-js', 'js');

/* ================= CONFIGURAÇÃO =================
   Links reais ainda não informados ficam vazios: o que depende deles some da página
   (botões de apoio mostram "Abertura em breve", WhatsApp não aparece). Preencha para ativar. */
const LINKS = {
  support: '',   // checkout / Open Source Collective / GitHub Sponsors
  b2b: '',       // formulário ou e-mail de patrocínio B2B
  whatsapp: '',  // https://wa.me/55...
  discord: '',
  x: ''
};
// Valor arrecadado (R$). null = arrecadação ainda não aberta (adesão ao OSC em andamento).
const FUNDING = { raisedBRL: null };

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const store = {
  get(k){ try { return localStorage.getItem(k); } catch(e){ return null; } },
  set(k,v){ try { localStorage.setItem(k,v); } catch(e){} }
};

/* ================= I18N (inglês vem do HTML) ================= */
const I18N = {
pt: {
  'skip':`Pular para o conteúdo`,
  'nav.surf':`Superfícies`,'nav.arch':`Arquitetura`,'nav.gov':`Governança OSC`,'nav.road':`Roadmap`,
  'hero.title':`Crie 3D no navegador. O código é seu.`,
  'hero.sub':`A plataforma open-core de criação 3D com aceleração WebGPU nativa, transpilador TSL e compilação em TypeScript autônomo sob licença Apache 2.0.`,
  'cta.support':`Quero ser apoiador`,'cta.try':`Testar protótipo do Prism Studio`,
  'trust.fps':`medido ao vivo no seu navegador`,'trust.frame':`tempo médio de quadro`,'trust.backend':`renderizador ativo`,
  'trust.license':`licença do runtime e do compilador`,'trust.osc':`hospedagem fiscal · planejada · 501(c)(6)`,'trust.sponsors':`canal de patrocínio · planejado`,
  'pain.title':`Seu trabalho não deveria ficar refém de uma plataforma.`,'pain.close':`A Expctral nasceu para acabar com isso.`,
  'pain.1':`Se eu sair da plataforma, meu projeto fica para trás.`,
  'pain.2':`Meus shaders são strings concatenadas que quebram e não dá para depurar.`,
  'pain.3':`Toda vez que a linguagem de shader muda, eu reescrevo tudo.`,
  'pain.4':`Sempre começo do zero, com a tela em branco.`,
  'pain.5':`Antes de criar qualquer coisa, preciso instalar plugins e programas pesados.`,
  'about.title':`Uma estação de criação 3D aberta, direto no navegador.`,
  'about.p':`A Expctral une a performance da WebGPU à TSL (Three.js Shading Language) e a um modelo open-core transparente. O runtime e o compilador visual pertencem à comunidade, sob licença Apache 2.0.`,
  'about.quote':`A Expctral substitui o aprisionamento de dados pela autonomia total do desenvolvedor.`,'about.cite':`Princípio fundamental Expctral`,
  'about.p1t':`Soberania do código`,'about.p1d':`O resultado é TypeScript limpo e independente: um ativo real e permanente.`,
  'about.p2t':`Acesso universal`,'about.p2d':`Sem downloads. Se existe um navegador moderno, existe Expctral.`,
  'about.p3t':`Performance nativa`,'about.p3d':`A WebGPU dá acesso direto às placas de vídeo modernas, com compute shaders em paralelo.`,
  'surf.title':`Quatro superfícies, um ecossistema.`,'surf.sub':`Engrenagens integradas para encurtar o caminho entre a intenção criativa e a monetização em escala.`,
  'surf.s1':`Pipelines duplos em paralelo: Compute Pass em storage buffers e Render Pass mirando 60+ FPS, com um compilador visual TSL que só emite shaders válidos.`,
  'surf.s1live':`O hero desta página roda nesse mesmo runtime, ao vivo.`,
  'surf.s2':`Editor reativo em React Flow + Zustand com colaboração multiplayer em tempo real via CRDTs Yjs.`,'surf.open':`Abrir protótipo`,'surf.openPrism':`Abrir o Prism Studio`,'surf.openReg':`Abrir o Registry`,
  'reg.live':`O Spectral Registry de verdade, com contas, publicação, comentários e refração, está no ar desde 03/11/2026. Os pagamentos ainda são simulados.`,
  'surf.s3':`Pacotes .exp portáveis, Refração de Código com crédito automático e uma divisão de receita feita para criadores.`,
  'surf.creator':`85% CRIADOR`,'surf.platform':`15% PLATAFORMA`,
  'surf.s4':`Documentação, dados estruturados AIO/GEO e suporte à comunidade. O site prova o produto: você está vendo a primeira versão dele.`,
  'prism.title':`Prism Studio: experimente agora.`,
  'prism.sub':`Conecte nós, ajuste velocidade, densidade e cor e ejete o código TSL. Cada nó existe em quatro frequências: troque as abas para ver e ouvir.`,
  'prism.f1':`Frequência de interface`,'prism.f2':`Frequência lógica`,'prism.f3':`Frequência de código`,'prism.f4':`Frequência da GPU`,
  'prism.mathNote':`Estado reativo lido pela Math Wave a cada mudança.`,
  'prism.gpuNote':`Regras da Sinapse Engine: storage buffers alinhados em 16 bytes e workgroups em múltiplos de 64.`,
  'prism.leg1':`Execução`,'prism.leg2':`Valores`,'prism.leg3':`Shaders TSL`,'prism.leg4':`Vetores`,
  'prism.note':`A prévia roda em three/webgpu no seu navegador, usando exatamente a TSL que você ejeta. O editor de nós é um protótipo do Prism Studio.`,
  'prism.hint':`Arraste os nós pelo topo. As setas do teclado movem o nó em foco.`,
  'eject.note':`Arquivo .ts limpo, com funções TSL puras. Depende só do Three.js padrão e roda em qualquer servidor ou app React/Next.js.`,
  'eject.copy':`Copiar código`,'eject.dl':`Baixar .ts`,'eject.close':`Fechar`,
  'arch.title':`Construída sobre padrões abertos, de ponta a ponta.`,'arch.sub':`Quatro decisões que transformam um grafo visual em código rápido e portável.`,
  'arch.1t':`Computação e renderização em paralelo`,'arch.1d':`O Compute Pass roda física, partículas e instanciamento em storage buffers dentro da GPU. O Render Pass recebe esses dados já na memória e desenha geometria, luz e materiais TSL.`,
  'arch.2t':`Nós viram funções TSL nativas`,'arch.2d':`Em vez de concatenar strings frágeis de GLSL ou WGSL, cada nó corresponde a uma função TSL real. Shaders criados visualmente são sintaticamente válidos e transpilam para WebGPU e WebGL.`,
  'arch.3t':`Ejete TypeScript limpo a qualquer momento`,'arch.3d':`O grafo é transpilado em um arquivo .ts autônomo, com funções TSL puras. Precisa só do Three.js padrão e roda em qualquer servidor ou app React/Next.js.`,
  'arch.4t':`Cocriação sem conflitos`,'arch.4d':`CRDTs Yjs sobre WebSockets permitem que vários criadores movam nós, mudem parâmetros e conectem fios no mesmo grafo ao mesmo tempo, com cursores de telemetria ao vivo.`,
  'tr.title':`Dos silos ao ciclo de remix.`,'tr.before':`Desenvolvimento tradicional (silos)`,'tr.after':`Modelo Expctral (remix loop)`,
  'tr.b1':`Projetos fechados e proprietários.`,'tr.b2':`Curva de aprendizado isolada.`,'tr.b3':`Ativos estáticos e de uso único.`,'tr.b4':`Início do zero (cold start).`,'tr.b5':`Código preso em silos binários.`,
  'tr.a1':`Projetos abertos para inspeção e remix.`,'tr.a2':`Aprendizado por desconstrução (Growth Tree).`,'tr.a3':`Ativos vivos que evoluem com a comunidade.`,'tr.a4':`Início a partir de templates validados (warm start).`,'tr.a5':`[ ⚡&#xFE0E; EJECT TYPESCRIPT ]: código limpo, 0% lock-in.`,
  'who.title':`A Expctral é para você?`,'who.yes':`É para você se você é…`,
  'who.y1':`Artista 3D, game designer ou dev de shaders que quer criar no navegador.`,
  'who.y2':`Criador indie que quer builds antecipados e código sem amarras.`,
  'who.y3':`Estúdio ou freelancer que quer vender materiais e presets e ficar com 85% de cada venda.`,
  'who.y4':`Empresa ou fundo que quer patrocinar infraestrutura aberta.`,
  'who.y5':`Educador que trata TypeScript como currículo real.`,
  'who.no':`Não é para você se…`,
  'who.n1':`Você prefere ferramentas fechadas que prendem o seu projeto.`,
  'who.n2':`Você precisa de um produto pronto hoje. A Expctral está sendo construída em público, fase a fase.`,
  'gov.title':`Governança aberta, autoria clara.`,'gov.role':`Fundador e criador · Mezzetti⁴⁰⁹⁶ Studio`,
  'gov.p':`Cada dia é dividido entre engenharia profunda (Sinapse Compiler, WebGPU, Prism Studio) e comunidade, investidores e atualizações Build in Public.`,
  'gov.repo':`Código no GitHub`,'gov.portfolio':`Portfólio do fundador`,'gov.station':`Expctral Station (ao vivo)`,
  'gov.l1':`Uso comercial irrestrito, concessão explícita de patentes e atribuição preservada.`,
  'gov.l2':`Hospedagem fiscal planejada (501(c)(6)) para receber apoio da comunidade e B2B com transparência financeira.`,
  'gov.l3':`Desenvolvimento em fases sequenciais com gates de aceite: zero erros de tipo e todos os testes verdes antes de qualquer entrega.`,
  'sup.title':`Apoiar não é comprar um software. É financiar uma infraestrutura aberta.`,
  'sup.p':`O apoio mensal custeia servidores, domínios internacionais, certificados e a infraestrutura do Sinapse Compiler. Em troca, você recebe acesso e reconhecimento, e o código continua aberto para todos sob Apache 2.0.`,
  'sup.g1':`Meta MVP (V1.0)`,'sup.g1a':`R$ 15.000 · US$ 3.000`,'sup.g1d':`Servidores, domínios, certificados e infraestrutura inicial do Sinapse Compiler.`,
  'sup.g2':`Meta de consolidação (V1.5)`,'sup.g2a':`R$ 50.000 · US$ 10.000`,'sup.g2d':`Consolidação do Prism Studio, suporte de engenharia sênior e preparação da rodada anjo.`,
  'sup.badge':`Apoiador`,'sup.badgeB2B':`Patrocinador`,'sup.mo':`/mês`,
  'sup.t1a':`Entusiastas e devs`,'sup.t1f1':`Acesso ao Spectral Registry`,'sup.t1f2':`Insígnia de apoiador no perfil`,'sup.t1f3':`Canal privado no Discord`,
  'sup.t2a':`Criadores 3D e indies`,'sup.t2f1':`Builds antecipados do Sinapse`,'sup.t2f2':`Ejetor de código avançado`,'sup.t2f3':`5 GB no R2 Storage`,
  'sup.t3a':`Studios e freelancers`,'sup.t3f1':`Suporte prioritário`,'sup.t3f2':`Pipelines privados de Compute`,'sup.t3f3':`Destaque no Registry`,
  'sup.t4a':`Empresas e fundos`,'sup.custom':`Sob medida`,'sup.t4f1':`Dedução fiscal via OSC`,'sup.t4f2':`Sua marca no rodapé do Hub`,'sup.t4f3':`Canal direto de engenharia`,
  'sup.btn':`Quero ser apoiador`,'sup.btnB2B':`Falar sobre patrocínio`,'sup.soon':`Abertura em breve`,
  'sup.n1':`Valores em reais (BRL). As contribuições serão recebidas pelo Open Source Collective e pelo GitHub Sponsors assim que a adesão for concluída.`,
  'sup.n2':`Spectral Registry: o criador fica com 85% de cada venda; 15% custeia a infraestrutura e a evolução da engine.`,
  'road.title':`Roadmap: fases 0 a 4`,'road.sub':`Fases sequenciais com gates de saída. Uma fase só fecha com zero erros no typecheck e a suíte de testes toda verde.`,
  'road.0t':`Fundação e governança`,'road.0d':`Segurança AST, alinhamento de storage buffers, enquadramento OSC e Apache 2.0.`,
  'road.1t':`Core runtime e Sinapse Compiler`,'road.1d':`Motor TSL, pipelines duplos WebGPU e o ejetor TypeScript.`,
  'road.2t':`Prism Studio e multiplayer`,'road.2d':`Canvas React Flow, CRDTs Yjs, PWA offline-first e a assistente local Dra. Ada.`,
  'road.3t':`Spectral Registry e monetização`,'road.3d':`Pacotes .exp, Refração de Código e split de receita 85/15.`,
  'road.4t':`Lançamento global`,'road.4d':`Reorganização internacional e expansão comercial global.`,
  'faq.title':`Perguntas frequentes`,
  'faq.q1':`E se eu quiser sair da plataforma?`,'faq.a1':`Clique em [ ⚡&#xFE0E; EJECT TYPESCRIPT ]. Seu grafo de nós vira um arquivo .ts limpo, com funções TSL puras, que só precisa do Three.js padrão. Roda em qualquer servidor ou app React/Next.js, sem dependências da Expctral.`,
  'faq.q2':`Posso usar em um produto comercial?`,'faq.a2':`Sim. A Apache 2.0 permite uso comercial irrestrito sem abrir o código do seu produto, concede licença explícita de patentes de todos os contribuidores e só pede que você mantenha os avisos de direitos autorais nos arquivos originais modificados.`,
  'faq.q3':`E se o meu navegador não suportar WebGPU?`,'faq.a3':`A Expctral faz fallback automático para WebGL2. A TSL transpila para WebGPU e WebGL ao mesmo tempo, então o código que você escreve hoje está pronto para o futuro. O contador ao vivo no topo desta página mostra qual renderizador o seu navegador está usando agora.`,
  'faq.q4':`Para onde vai o meu apoio?`,'faq.a4':`A primeira meta (R$ 15.000) custeia servidores, domínios, certificados e a infraestrutura inicial do Sinapse Compiler. A segunda (R$ 50.000) consolida o Prism Studio, traz suporte de engenharia sênior e prepara a rodada anjo.`,
  'faq.q5':`Como funciona a governança via OSC?`,'faq.a5':`O plano é a hospedagem fiscal pelo Open Source Collective, organização sem fins lucrativos 501(c)(6) dos Estados Unidos, com integração ao GitHub Sponsors para patrocínios da comunidade e B2B e transparência financeira pública. A adesão ainda está em andamento.`,
  'faq.q6':`Como funciona o marketplace?`,'faq.a6':`No Spectral Registry, criadores publicam materiais TSL, presets e projetos 3D. 85% de cada venda vai para o criador e 15% fica com a plataforma para infraestrutura e evolução da engine.`,
  'faq.q7':`Já posso usar a plataforma?`,'faq.a7':`O desenvolvimento segue as fases 0 a 4 (veja o roadmap acima). Hoje você já pode criar uma conta de verdade no Spectral Registry, abrir o Prism Studio e testar o protótipo nesta página para ejetar o TypeScript dele.`,
  'final.title':`O código é seu. A estação é de todos.`,'final.p':`Ajude a construir a infraestrutura aberta do 3D na web e mantenha autonomia total sobre o que você cria.`,'final.repo':`Ver o código no GitHub`,
  'foot.tag':`Criação 3D open-core no navegador. WebGPU, TSL e Apache 2.0.`,'foot.links':`Links`,'foot.sponsors':`Patrocinadores B2B`,'foot.slot':`Sua marca aqui com um Patrocínio B2B.`,
  'foot.license':`Runtime e compilador visual sob licença Apache 2.0.`,'wa':`Falar no WhatsApp`
},
zh: {
  'skip':`跳到正文`,
  'nav.surf':`四大界面`,'nav.arch':`架构`,'nav.gov':`OSC 治理`,'nav.road':`路线图`,
  'hero.title':`在浏览器中创作 3D。代码归你所有。`,
  'hero.sub':`开放核心 3D 创作平台：原生 WebGPU 加速、TSL 转译器，以及基于 Apache 2.0 许可的独立 TypeScript 编译。`,
  'cta.support':`成为支持者`,'cta.try':`试用 Prism Studio 原型`,
  'trust.fps':`在你的浏览器中实时测量`,'trust.frame':`平均帧时间`,'trust.backend':`当前渲染器`,
  'trust.license':`运行时与编译器许可`,'trust.osc':`财务托管 · 计划中 · 501(c)(6)`,'trust.sponsors':`赞助渠道 · 计划中`,
  'pain.title':`你的作品不该被某个平台绑架。`,'pain.close':`Expctral 正是为终结这一切而生。`,
  'pain.1':`一旦离开平台，我的项目就带不走。`,'pain.2':`我的着色器是拼接起来的字符串，一出错就无从调试。`,
  'pain.3':`着色器语言一变，我就得全部重写。`,'pain.4':`每次都要从一张白纸开始。`,'pain.5':`还没开始创作，就得先装插件和庞大的软件。`,
  'about.title':`一座开放的 3D 创作站，就在浏览器里。`,
  'about.p':`Expctral 将 WebGPU 的性能与 TSL（Three.js 着色语言）以及透明的开放核心模式相结合。运行时和可视化编译器以 Apache 2.0 许可归属社区。`,
  'about.quote':`Expctral 以开发者的完全自主，取代数据锁定。`,'about.cite':`Expctral 基本原则`,
  'about.p1t':`代码主权`,'about.p1d':`输出为纯净、独立的 TypeScript：真实而永久的资产。`,
  'about.p2t':`随处可达`,'about.p2d':`无需下载。有现代浏览器的地方，就有 Expctral。`,
  'about.p3t':`原生性能`,'about.p3d':`WebGPU 可直接调用现代显卡，并支持并行计算着色器。`,
  'surf.title':`四大界面，一个生态。`,'surf.sub':`彼此咬合的组件，缩短从创意意图到规模化变现的距离。`,
  'surf.s1':`双管线并行：Compute Pass 基于存储缓冲区运行，Render Pass 以 60+ FPS 为目标，可视化 TSL 编译器只会生成有效的着色器。`,
  'surf.s1live':`本页的首屏就运行在同一个运行时上，实时渲染。`,
  'surf.s2':`基于 React Flow + Zustand 的响应式编辑器，通过 Yjs CRDT 实现实时多人协作。`,'surf.open':`打开原型`,'surf.openPrism':`打开 Prism Studio`,'surf.openReg':`打开 Registry`,
  'reg.live':`真正的 Spectral Registry 自 2026/11/03 起已上线，支持账户、发布、评论与折射。支付仍为模拟。`,
  'surf.s3':`可移植的 .exp 包、自动署名的代码折射，以及为创作者设计的收益分成。`,
  'surf.creator':`85% 创作者`,'surf.platform':`15% 平台`,
  'surf.s4':`文档、AIO/GEO 结构化数据与社区支持。网站即产品证明：你正在看的就是它的第一版。`,
  'prism.title':`Prism Studio：立即体验。`,
  'prism.sub':`连接节点，调整速度、密度和颜色，然后导出 TSL 代码。每个节点都存在于四种频率中：切换标签即可查看和聆听。`,
  'prism.f1':`界面频率`,'prism.f2':`逻辑频率`,'prism.f3':`代码频率`,'prism.f4':`GPU 频率`,
  'prism.mathNote':`Math Wave 在每次变更时读取的响应式状态。`,
  'prism.gpuNote':`Sinapse Engine 规则：存储缓冲区按 16 字节对齐，工作组大小为 64 的倍数。`,
  'prism.leg1':`执行`,'prism.leg2':`数值`,'prism.leg3':`TSL 着色器`,'prism.leg4':`向量`,
  'prism.note':`预览在你的浏览器中由 three/webgpu 运行，使用的正是你导出的 TSL。节点编辑器本身是 Prism Studio 的原型。`,
  'prism.hint':`拖动节点标题即可移动。方向键可移动当前聚焦的节点。`,
  'eject.note':`纯净的 .ts 文件，只包含纯 TSL 函数。仅依赖标准 Three.js，可在任何服务器或 React/Next.js 应用中运行。`,
  'eject.copy':`复制代码`,'eject.dl':`下载 .ts`,'eject.close':`关闭`,
  'arch.title':`从头到尾建立在开放标准之上。`,'arch.sub':`四个关键决策，把可视化节点图变成快速、可移植的代码。`,
  'arch.1t':`计算与渲染并行`,'arch.1d':`Compute Pass 在 GPU 内基于存储缓冲区运行物理、粒子和实例化。Render Pass 直接读取已在显存中的数据，绘制几何、光照与 TSL 材质。`,
  'arch.2t':`节点即原生 TSL 函数`,'arch.2d':`不再拼接脆弱的 GLSL 或 WGSL 字符串，每个节点都对应一个真实的 TSL 函数。可视化创建的着色器语法有效，并可同时转译为 WebGPU 和 WebGL。`,
  'arch.3t':`随时导出纯净的 TypeScript`,'arch.3d':`节点图会被转译为独立的 .ts 文件，只包含纯 TSL 函数。仅需标准 Three.js，可在任何服务器或 React/Next.js 应用中运行。`,
  'arch.4t':`无冲突的共同创作`,'arch.4d':`基于 WebSocket 的 Yjs CRDT 让多位创作者同时在同一张图中移动节点、修改参数和连线，并显示实时遥测光标。`,
  'tr.title':`从孤岛走向混编循环。`,'tr.before':`传统开发（孤岛）`,'tr.after':`Expctral 模式（混编循环）`,
  'tr.b1':`封闭的专有项目。`,'tr.b2':`孤立的学习曲线。`,'tr.b3':`静态、一次性的资产。`,'tr.b4':`从零开始（冷启动）。`,'tr.b5':`代码困在二进制孤岛中。`,
  'tr.a1':`项目开放查看与混编。`,'tr.a2':`通过拆解来学习（Growth Tree）。`,'tr.a3':`随社区不断进化的活资产。`,'tr.a4':`从经过验证的模板开始（热启动）。`,'tr.a5':`[ ⚡&#xFE0E; EJECT TYPESCRIPT ]：纯净代码，0% 锁定。`,
  'who.title':`Expctral 适合你吗？`,'who.yes':`适合你，如果你是……`,
  'who.y1':`希望在浏览器中创作的 3D 艺术家、游戏设计师或着色器开发者。`,'who.y2':`想要抢先体验版本、代码不受束缚的独立创作者。`,
  'who.y3':`希望出售材质和预设、并保留每笔销售 85% 的工作室或自由职业者。`,'who.y4':`希望赞助开放基础设施的企业或基金。`,'who.y5':`把 TypeScript 当作真正课程来教授的教育者。`,
  'who.no':`不适合你，如果……`,'who.n1':`你更喜欢把项目锁在里面的封闭工具。`,'who.n2':`你今天就需要一个成品。Expctral 正在公开地逐阶段构建。`,
  'gov.title':`开放治理，明确署名。`,'gov.role':`创始人兼创作者 · Mezzetti⁴⁰⁹⁶ Studio`,
  'gov.p':`每天分为两段：深度工程（Sinapse 编译器、WebGPU、Prism Studio），以及社区、投资人沟通和 Build in Public 更新。`,
  'gov.repo':`GitHub 源代码`,'gov.portfolio':`创始人作品集`,'gov.station':`Expctral Station（在线）`,
  'gov.l1':`不受限制的商业使用、明确的专利授权，并保留署名。`,
  'gov.l2':`计划中的财务托管（501(c)(6)），以财务透明的方式接收社区与 B2B 支持。`,
  'gov.l3':`按顺序分阶段开发并设有验收关卡：交付前类型检查零错误、测试全部通过。`,
  'sup.title':`支持不是购买软件，而是资助开放的基础设施。`,
  'sup.p':`月度支持将用于服务器、国际域名、证书以及 Sinapse 编译器的基础设施。作为回报，你将获得访问权限与认可，而代码依旧以 Apache 2.0 向所有人开放。`,
  'sup.g1':`MVP 目标（V1.0）`,'sup.g1a':`R$ 15,000 · US$ 3,000`,'sup.g1d':`服务器、域名、证书以及 Sinapse 编译器的初始基础设施。`,
  'sup.g2':`巩固目标（V1.5）`,'sup.g2a':`R$ 50,000 · US$ 10,000`,'sup.g2d':`完善 Prism Studio、引入资深工程支持并筹备天使轮。`,
  'sup.badge':`支持者`,'sup.badgeB2B':`赞助商`,'sup.mo':`/月`,
  'sup.t1a':`爱好者与开发者`,'sup.t1f1':`访问 Spectral Registry`,'sup.t1f2':`个人资料上的支持者徽章`,'sup.t1f3':`Discord 私密频道`,
  'sup.t2a':`3D 创作者与独立开发者`,'sup.t2f1':`Sinapse 抢先版本`,'sup.t2f2':`高级代码导出器`,'sup.t2f3':`5 GB R2 存储空间`,
  'sup.t3a':`工作室与自由职业者`,'sup.t3f1':`优先支持`,'sup.t3f2':`私有 Compute 管线`,'sup.t3f3':`在 Registry 中获得推荐`,
  'sup.t4a':`企业与基金`,'sup.custom':`定制`,'sup.t4f1':`通过 OSC 享受税务抵扣`,'sup.t4f2':`品牌展示于 Hub 页脚`,'sup.t4f3':`直通工程团队的渠道`,
  'sup.btn':`成为支持者`,'sup.btnB2B':`洽谈赞助`,'sup.soon':`即将开放`,
  'sup.n1':`价格以巴西雷亚尔（BRL）计。完成入驻后，捐助将通过 Open Source Collective 和 GitHub Sponsors 接收。`,
  'sup.n2':`Spectral Registry：每笔销售的 85% 归创作者；15% 用于基础设施和引擎发展。`,
  'road.title':`路线图：第 0 至 4 阶段`,'road.sub':`按顺序推进并设有退出关卡。只有类型检查零错误、测试全部通过，阶段才算完成。`,
  'road.0t':`基础与治理`,'road.0d':`AST 安全、存储缓冲区对齐、OSC 与 Apache 2.0 框架。`,
  'road.1t':`核心运行时与 Sinapse 编译器`,'road.1d':`TSL 引擎、WebGPU 双管线与 TypeScript 导出器。`,
  'road.2t':`Prism Studio 与多人协作`,'road.2d':`React Flow 画布、Yjs CRDT、离线优先 PWA 以及本地助手 Dra. Ada。`,
  'road.3t':`Spectral Registry 与变现`,'road.3d':`.exp 包、代码折射与 85/15 收益分成。`,
  'road.4t':`全球发布`,'road.4d':`国际架构重组与全球商业扩张。`,
  'faq.title':`常见问题`,
  'faq.q1':`如果我想离开平台怎么办？`,'faq.a1':`点击 [ ⚡&#xFE0E; EJECT TYPESCRIPT ]。你的节点图会变成只含纯 TSL 函数的 .ts 文件，只需要标准 Three.js，可在任何服务器或 React/Next.js 应用中运行，不依赖 Expctral。`,
  'faq.q2':`可以用于商业产品吗？`,'faq.a2':`可以。Apache 2.0 允许不受限制的商业使用，无需开放你产品的代码；每位贡献者都明确授予专利许可；你只需在修改过的原始文件中保留版权声明。`,
  'faq.q3':`如果我的浏览器不支持 WebGPU 怎么办？`,'faq.a3':`Expctral 会自动回退到 WebGL2。TSL 可同时转译为 WebGPU 和 WebGL，你今天写的代码面向未来。本页顶部的实时计数器会显示你的浏览器当前使用的渲染器。`,
  'faq.q4':`我的支持款项会用在哪里？`,'faq.a4':`第一个目标（R$ 15,000）用于服务器、域名、证书和 Sinapse 编译器的初始基础设施；第二个目标（R$ 50,000）用于完善 Prism Studio、引入资深工程支持并筹备天使轮。`,
  'faq.q5':`OSC 治理如何运作？`,'faq.a5':`计划通过美国 501(c)(6) 非营利组织 Open Source Collective 进行财务托管，并结合 GitHub Sponsors 接收社区与 B2B 赞助，财务公开透明。入驻仍在进行中。`,
  'faq.q6':`市场如何运作？`,'faq.a6':`在 Spectral Registry 中，创作者发布 TSL 材质、预设和 3D 项目。每笔销售的 85% 归创作者，15% 归平台，用于基础设施和引擎发展。`,
  'faq.q7':`现在就能使用平台吗？`,'faq.a7':`开发按第 0 至 4 阶段推进（见上方路线图）。现在你已经可以在 Spectral Registry 注册真实账户、打开 Prism Studio，并在本页试用原型导出 TypeScript。`,
  'final.title':`代码属于你，创作站属于所有人。`,'final.p':`一起构建 Web 3D 的开放基础设施，并对你的创作保有完全自主。`,'final.repo':`在 GitHub 上查看源代码`,
  'foot.tag':`浏览器中的开放核心 3D 创作。WebGPU、TSL 与 Apache 2.0。`,'foot.links':`链接`,'foot.sponsors':`B2B 赞助商`,'foot.slot':`成为 B2B 赞助商，让你的品牌出现在这里。`,
  'foot.license':`运行时与可视化编译器采用 Apache 2.0 许可。`,'wa':`通过 WhatsApp 联系`
}};

const META = {
  en:{ title:document.title, desc:document.querySelector('meta[name=description]').content, html:'en' },
  pt:{ title:'Expctral: crie 3D no navegador. O código é seu. | WebGPU + TSL', desc:'Criação 3D open-core no navegador com WebGPU nativa, compilador visual TSL e saída em TypeScript autônomo sob Apache 2.0. Teste o protótipo do Prism Studio ao vivo.', html:'pt-BR' },
  zh:{ title:'Expctral：在浏览器中创作 3D，代码归你所有 | WebGPU + TSL', desc:'浏览器中的开放核心 3D 创作：原生 WebGPU、可视化 TSL 编译器、独立的 TypeScript 输出，Apache 2.0 许可。立即试用 Prism Studio 原型。', html:'zh-Hans' }
};

const UI = {
  en:{ refracted:'Refraction created. Original author credit preserved.', copied:'Code copied', copyFail:'Copy failed: select the code manually', preset:'Spectrum applied', downloaded:'File downloaded', soon:'Opening soon', previewOn:{webgpu:'Rendering with WebGPU in this browser', webgl2:'WebGPU unavailable here: rendering with the WebGL2 fallback', canvas2d:'No GPU renderer available: Canvas 2D fallback', pending:'Starting the Sinapse Engine…'} },
  pt:{ refracted:'Refração criada. Crédito do autor original preservado.', copied:'Código copiado', copyFail:'Não foi possível copiar: selecione o código manualmente', preset:'Espectro aplicado', downloaded:'Arquivo baixado', soon:'Abertura em breve', previewOn:{webgpu:'Renderizando com WebGPU neste navegador', webgl2:'WebGPU indisponível aqui: renderizando com o fallback WebGL2', canvas2d:'Sem renderizador de GPU: fallback em Canvas 2D', pending:'Iniciando a Sinapse Engine…'} },
  zh:{ refracted:'折射副本已创建，原作者署名已保留。', copied:'代码已复制', copyFail:'复制失败：请手动选择代码', preset:'已应用光谱', downloaded:'文件已下载', soon:'即将开放', previewOn:{webgpu:'正在此浏览器中使用 WebGPU 渲染', webgl2:'此处不支持 WebGPU：使用 WebGL2 回退渲染', canvas2d:'没有可用的 GPU 渲染器：使用 Canvas 2D 回退', pending:'正在启动 Sinapse Engine…'} }
};

/* ---------- V3: novos textos ---------- */
Object.assign(I18N.pt, {
  'sc.add':`adição rápida de nó`,'sc.iso':`isolar prévia`,'sc.mute':`silenciar / bypass`,'sc.del':`remover modificador`,'sc.esc':`sair do isolamento`,
  'pal.ph':`Buscar nó…`,
  'reg.title':`Spectral Registry: publique, refrate, receba.`,
  'reg.sub':`Pacotes monolíticos .exp levam o grafo de nós e seus parâmetros. Toda refração mantém uma linhagem imutável até o autor primordial. Este catálogo é uma simulação funcional com os quatro Espectros Primordiais.`,
  'reg.ph':`Buscar pacotes…`,'reg.all':`Todos`,'reg.empty':`Nenhum pacote corresponde a esta busca.`,
  'reg.lineage':`Linhagem de refração`,'reg.lineageNote':`Histórico imutável: toda cópia mantém o crédito ao autor primordial.`,
  'reg.split':`Divisão de receita`,'reg.splitNote':`Simulação de checkout. As vendas reais abrem na Fase 3.`,
  'reg.price':`Preço de exemplo do pacote`,'reg.creator':`criador · 85%`,'reg.platform':`plataforma · 15%`,
  'reg.drop':`Solte um arquivo .exp aqui ou`,'reg.choose':`escolha um arquivo`,'reg.export':`Exportar grafo atual (.exp)`,'reg.dl':`Baixar .exp`,
  'pkg.1':`Um florescer esmeralda lento que deriva para o violeta. Um ponto de partida calmo.`,
  'pkg.2':`Um vórtice cobre rápido que se dissolve em esmeralda. Muita energia, menos densidade.`,
  'pkg.3':`Uma nebulosa violeta densa com brilhos cobre e deriva lenta.`,
  'pkg.4':`Um anel de telemetria ciano com profundidade violeta, pensado para painéis.`,
  'dlg.supTitle':`O apoio abre com o Open Source Collective`,
  'dlg.supP1':`A Expctral está em processo de adesão à hospedagem fiscal do Open Source Collective (501(c)(6)) e ao GitHub Sponsors. Assim que a adesão for concluída, este botão leva direto ao checkout do plano escolhido.`,
  'dlg.supP2':`Seu apoio vai custear servidores, domínios, certificados e o Sinapse Compiler (meta V1.0: R$ 15.000) e, depois, o Prism Studio e a engenharia sênior (meta V1.5: R$ 50.000). O código continua aberto sob Apache 2.0.`,
  'dlg.repo':`Acompanhar o repositório no GitHub`,
  'dlg.b2bTitle':`Apoio corporativo à infraestrutura aberta`,
  'dlg.b2b1':`Patrocínio B2B via Open Source Collective (planejado), com sua marca no rodapé do Hub e canal direto com a engenharia.`,
  'dlg.b2b2':`Investimento anjo formalizado por Mútuo Conversível (Brasil) ou SAFE (Estados Unidos), convertido em participação na reorganização internacional.`,
  'dlg.b2b3':`O canal oficial de contato para empresas e investidores será publicado aqui.`,
  'ada.status':`Prévia · diagnóstico por regras rodando no seu navegador. O modelo local (ONNX Runtime Web com WebGPU + Transformers.js) chega na Fase 2.`,
  'ada.diag':`Diagnosticar grafo`,'ada.fix':`Corrigir automaticamente`
});
Object.assign(I18N.zh, {
  'sc.add':`快速添加节点`,'sc.iso':`隔离预览`,'sc.mute':`静音 / 旁路`,'sc.del':`删除修饰节点`,'sc.esc':`退出隔离`,
  'pal.ph':`搜索节点…`,
  'reg.title':`Spectral Registry：发布、折射、获益。`,
  'reg.sub':`单体 .exp 包承载节点图及其参数。每一次折射都保留一条不可篡改、可追溯到原始作者的谱系。此目录是基于四个原初光谱的可运行模拟。`,
  'reg.ph':`搜索资源包…`,'reg.all':`全部`,'reg.empty':`没有符合搜索条件的资源包。`,
  'reg.lineage':`折射谱系`,'reg.lineageNote':`不可篡改的历史：每个副本都保留对原始作者的署名。`,
  'reg.split':`收益分成`,'reg.splitNote':`结账模拟。真实销售将在第 3 阶段开放。`,
  'reg.price':`示例资源包价格`,'reg.creator':`创作者 · 85%`,'reg.platform':`平台 · 15%`,
  'reg.drop':`将 .exp 文件拖放到此处，或`,'reg.choose':`选择文件`,'reg.export':`导出当前节点图（.exp）`,'reg.dl':`下载 .exp`,
  'pkg.1':`缓慢的翡翠绽放，渐渐漂向紫罗兰。一个平静的起点。`,
  'pkg.2':`快速的铜色漩涡，逐渐融入翡翠色。高能量，低密度。`,
  'pkg.3':`浓密的紫罗兰星云，点缀铜色高光，缓慢漂移。`,
  'pkg.4':`带有紫罗兰纵深的青色遥测光环，适合仪表盘。`,
  'dlg.supTitle':`支持将通过 Open Source Collective 开放`,
  'dlg.supP1':`Expctral 正在申请加入 Open Source Collective（501(c)(6)）的财务托管和 GitHub Sponsors。入驻完成后，此按钮将直接带你进入所选方案的结账页面。`,
  'dlg.supP2':`你的支持将用于服务器、域名、证书和 Sinapse 编译器（V1.0 目标：R$ 15,000），随后用于 Prism Studio 和资深工程（V1.5 目标：R$ 50,000）。代码依旧以 Apache 2.0 开放。`,
  'dlg.repo':`在 GitHub 上关注仓库`,
  'dlg.b2bTitle':`企业对开放基础设施的支持`,
  'dlg.b2b1':`通过 Open Source Collective 进行 B2B 赞助（计划中），品牌展示于 Hub 页脚，并享有直通工程团队的渠道。`,
  'dlg.b2b2':`天使投资通过可转换借款（巴西 Mútuo Conversível）或 SAFE（美国）进行，并在国际架构重组时转换为股权。`,
  'dlg.b2b3':`面向企业和投资人的官方联系渠道将在此公布。`,
  'ada.status':`预览 · 基于规则的诊断在你的浏览器中运行。本地模型（基于 WebGPU 的 ONNX Runtime Web + Transformers.js）将在第 2 阶段上线。`,
  'ada.diag':`诊断节点图`,'ada.fix':`自动修复`
});
Object.assign(I18N.pt, {
  'nav.upd':`Atualizações`, 'upd.title':`Onde cada face está hoje.`,
  'upd.sub':`Cada face da Expctral com a versão que existe agora e a próxima do roadmap. Última atualização:`,
  'upd.fallback':`O status completo da Sinapse Engine, do Prism Studio, do Spectral Registry, da Landing Hub, da Dra. Ada, do multiplayer, da ejeção de código e da governança está na página de atualizações.`,
  'upd.all':`Ver todas as atualizações`
});
Object.assign(I18N.zh, {
  'nav.upd':`更新`, 'upd.title':`每个模块的现状。`,
  'upd.sub':`Expctral 各模块的当前版本与路线图中的下一版本。最近更新：`,
  'upd.fallback':`Sinapse Engine、Prism Studio、Spectral Registry、Landing Hub、Dra. Ada、多人协作、代码导出与治理的完整状态见更新页面。`,
  'upd.all':`查看全部更新`
});
Object.assign(I18N.pt, { 'smap.hint':`Passe o mouse numa linha para achar o nó. Clique para ir até ele.` });
Object.assign(I18N.zh, { 'smap.hint':`将鼠标移到某一行即可找到对应节点，点击可跳转。` });
// Rótulos lidos pelo leitor de tela (aria-label com data-i18n-aria)
Object.assign(I18N.pt, {
  'a.nav':'Principal', 'a.hero':'Vórtice de partículas ao vivo, renderizado pela Sinapse Engine (three/webgpu)', 'a.trust':'Confiança e telemetria ao vivo',
  'a.split':'85% para o criador, 15% para a plataforma', 'a.tabs':'Frequências espectrais', 'a.palSearch':'Buscar nós', 'a.palList':'Nós',
  'a.preview':'Prévia ao vivo: vórtice de partículas comandado pelo grafo de nós', 'a.path':'Editor de trajeto da câmera: arraste os quatro pontos',
  'a.legend':'Cores dos soquetes', 'a.regSearch':'Buscar pacotes', 'a.founder':'Monograma do Mezzetti4096 Studio'
});
Object.assign(I18N.zh, {
  'a.nav':'主导航', 'a.hero':'由 Sinapse Engine（three/webgpu）实时渲染的粒子漩涡', 'a.trust':'信任与实时遥测',
  'a.split':'85% 归创作者，15% 归平台', 'a.tabs':'光谱频率', 'a.palSearch':'搜索节点', 'a.palList':'节点',
  'a.preview':'实时预览：由节点图驱动的粒子漩涡', 'a.path':'相机路径编辑器：拖动四个控制点',
  'a.legend':'插槽颜色', 'a.regSearch':'搜索包', 'a.founder':'Mezzetti4096 Studio 字母组合标志'
});
Object.assign(UI.en, {
  orbitLive:n => `ORBIT LIVE · ${n}`, coHint:'Second tab opened: edits sync live between tabs through a Yjs CRDT. Edge sync on Cloudflare Workers arrives in Phase 2.',
  coAlone:'Open this page in another tab to co-create in the same Orbit.', pathOn:'Path Editor on: drag the points to shape the camera trajectory', pathOff:'Camera back to orbit view',
  fundPending:'Fundraising opens with the OSC enrollment', fundRaised:(v, p) => `${v} raised · ${p}%`, fundLabel:'Fundraising progress',
  graph:'Node canvas. Press Space to quick-add a node.', node:(n, mod) => `Node ${n}: M mute, I isolate${mod ? ', Delete remove' : ''}, arrow keys move`, rm:n => `Remove ${n}`,

  core:'Particle Field and Render Pass are core nodes and cannot be bypassed.', isoCore:'This node already shows the full render.',
  muted:n => `${n} bypassed (wires kept)`, unmuted:n => `${n} re-enabled`, added:n => `${n} added to the graph`, exists:n => `${n} is already in the graph`,
  removed:n => `${n} removed`, imported:f => `${f} imported into the Orbit`, badExp:'This file is not a valid .exp package', exported:'.exp package exported',
  refractedPkg:n => `${n} refracted into your Orbit`, you:'you', primordial:'primordial author'
});
Object.assign(UI.pt, {
  orbitLive:n => `ÓRBITA AO VIVO · ${n}`, coHint:'Segunda aba aberta: as edições sincronizam ao vivo entre as abas por um CRDT Yjs. A sincronização na borda (Cloudflare Workers) chega na Fase 2.',
  coAlone:'Abra esta página em outra aba para cocriar na mesma Órbita.', pathOn:'Path Editor ativo: arraste os pontos para desenhar a trajetória da câmera', pathOff:'Câmera de volta à vista em órbita',
  fundPending:'A arrecadação abre com a adesão ao OSC', fundRaised:(v, p) => `${v} arrecadados · ${p}%`, fundLabel:'Progresso da arrecadação',
  graph:'Tela de nós. Aperte Espaço para adicionar um nó.', node:(n, mod) => `Nó ${n}: M silencia, I isola${mod ? ', Delete remove' : ''}, setas movem`, rm:n => `Remover ${n}`,

  core:'Particle Field e Render Pass são nós centrais e não podem ser silenciados.', isoCore:'Este nó já mostra o render completo.',
  muted:n => `${n} em bypass (fios mantidos)`, unmuted:n => `${n} reativado`, added:n => `${n} adicionado ao grafo`, exists:n => `${n} já está no grafo`,
  removed:n => `${n} removido`, imported:f => `${f} importado para a Órbita`, badExp:'Este arquivo não é um pacote .exp válido', exported:'Pacote .exp exportado',
  refractedPkg:n => `${n} refratado para a sua Órbita`, you:'você', primordial:'autor primordial'
});
Object.assign(UI.zh, {
  orbitLive:n => `轨道在线 · ${n}`, coHint:'已打开第二个标签页：编辑通过 Yjs CRDT 在标签页之间实时同步。基于 Cloudflare Workers 的边缘同步将在第 2 阶段上线。',
  coAlone:'在另一个标签页中打开本页，即可在同一轨道中共同创作。', pathOn:'路径编辑器已开启：拖动控制点来塑造相机轨迹', pathOff:'相机已恢复为环绕视角',
  fundPending:'筹款将在完成 OSC 入驻后开放', fundRaised:(v, p) => `已筹集 ${v} · ${p}%`, fundLabel:'筹款进度',
  graph:'节点画布。按空格键快速添加节点。', node:(n, mod) => `节点 ${n}：M 旁路，I 隔离${mod ? '，Delete 删除' : ''}，方向键移动`, rm:n => `删除 ${n}`,

  core:'Particle Field 和 Render Pass 是核心节点，无法旁路。', isoCore:'此节点已显示完整渲染。',
  muted:n => `${n} 已旁路（连线保留）`, unmuted:n => `${n} 已重新启用`, added:n => `已将 ${n} 加入节点图`, exists:n => `${n} 已在节点图中`,
  removed:n => `已删除 ${n}`, imported:f => `已将 ${f} 导入你的轨道`, badExp:'此文件不是有效的 .exp 包', exported:'已导出 .exp 包',
  refractedPkg:n => `已将 ${n} 折射到你的轨道`, you:'你', primordial:'原始作者'
});
const ADA = {
  en:{
    hello:'Hi, I am Dra. Ada. I read the Prism Studio graph live and explain the pipeline. Try <b>Diagnose graph</b> or <b>Auto-fix</b>.',
    askDiag:'Diagnose graph', askFix:'Auto-fix',
    pipe:d => `<b>Pipeline.</b> Time ${d.frozen ? 'is bypassed, so the vortex is frozen;' : 'drives'} Speed ×${d.speed} → Vortex [VFX] computes <b>${d.count}</b> particles in ${d.wg} workgroups of 64 → Spectrum Color mixes ${d.a} → ${d.b} (mix ${d.mix}) → VFX Output on <b>${d.backend}</b>${d.fps ? ` at ${d.fps} FPS` : ''}.`,
    mods:l => `<b>Modifiers:</b> ${l}.`,
    noMods:'<b>Modifiers:</b> none yet. Hover the canvas and press <kbd>Tab</kbd> or <kbd>Space</kbd> to add Turbulence, Twist, Pulse or Scale.',
    warn:'Attention', ok:'No issues found: the graph is valid TSL and ready for <b>[ ⚡&#xFE0E; EJECT TYPESCRIPT ]</b>.',
    w:{ muted:n => `Bypassed nodes: ${n}. Press <kbd>M</kbd> on the node to re-enable.`, iso:n => `Isolated view on ${n}. Press <kbd>Esc</kbd> to see the full render.`,
        flat:'Spectrum A and B are the same color, so the gradient is flat.', heavy:c => `${c} particles without WebGPU may drop frames: lower Density.`, slow:f => `Measured ${f} FPS: lower Density or Scale.` },
    fixed:n => n ? `Auto-fix applied ${n} change(s) directly to the graph state.` : 'Nothing to fix: the graph is already healthy.'
  },
  pt:{
    hello:'Oi, eu sou a Dra. Ada. Leio o grafo do Prism Studio ao vivo e explico o pipeline. Experimente <b>Diagnosticar grafo</b> ou <b>Corrigir automaticamente</b>.',
    askDiag:'Diagnosticar grafo', askFix:'Corrigir automaticamente',
    pipe:d => `<b>Pipeline.</b> Time ${d.frozen ? 'está em bypass, então o vórtice está congelado;' : 'alimenta'} Speed ×${d.speed} → Vortex [VFX] calcula <b>${d.count}</b> partículas em ${d.wg} workgroups de 64 → Spectrum Color mistura ${d.a} → ${d.b} (mix ${d.mix}) → VFX Output em <b>${d.backend}</b>${d.fps ? ` a ${d.fps} FPS` : ''}.`,
    mods:l => `<b>Modificadores:</b> ${l}.`,
    noMods:'<b>Modificadores:</b> nenhum ainda. Passe o mouse no canvas e aperte <kbd>Tab</kbd> ou <kbd>Espaço</kbd> para adicionar Turbulence, Twist, Pulse ou Scale.',
    warn:'Atenção', ok:'Nenhum problema: o grafo é TSL válida e está pronto para <b>[ ⚡&#xFE0E; EJECT TYPESCRIPT ]</b>.',
    w:{ muted:n => `Nós em bypass: ${n}. Aperte <kbd>M</kbd> no nó para reativar.`, iso:n => `Vista isolada em ${n}. Aperte <kbd>Esc</kbd> para ver o render completo.`,
        flat:'Spectrum A e B têm a mesma cor, então o degradê fica chapado.', heavy:c => `${c} partículas sem WebGPU podem perder quadros: diminua a Density.`, slow:f => `Medi ${f} FPS: diminua a Density ou a Scale.` },
    fixed:n => n ? `A correção automática aplicou ${n} mudança(s) direto no estado do grafo.` : 'Nada para corrigir: o grafo já está saudável.'
  },
  zh:{
    hello:'你好，我是 Dra. Ada。我会实时读取 Prism Studio 节点图并讲解渲染管线。试试<b>诊断节点图</b>或<b>自动修复</b>。',
    askDiag:'诊断节点图', askFix:'自动修复',
    pipe:d => `<b>管线。</b>Time ${d.frozen ? '已旁路，漩涡处于冻结状态；' : '驱动'} Speed ×${d.speed} → Vortex [VFX] 以 ${d.wg} 个 64 线程工作组计算 <b>${d.count}</b> 个粒子 → Spectrum Color 混合 ${d.a} → ${d.b}（mix ${d.mix}）→ VFX Output 运行于 <b>${d.backend}</b>${d.fps ? `，${d.fps} FPS` : ''}。`,
    mods:l => `<b>修饰节点：</b>${l}。`,
    noMods:'<b>修饰节点：</b>暂无。将鼠标移到画布上并按 <kbd>Tab</kbd> 或 <kbd>空格</kbd>，即可添加 Turbulence、Twist、Pulse 或 Scale。',
    warn:'注意', ok:'未发现问题：节点图是有效的 TSL，可以直接 <b>[ ⚡&#xFE0E; EJECT TYPESCRIPT ]</b>。',
    w:{ muted:n => `已旁路的节点：${n}。在节点上按 <kbd>M</kbd> 重新启用。`, iso:n => `${n} 处于隔离视图。按 <kbd>Esc</kbd> 查看完整渲染。`,
        flat:'Spectrum A 与 B 颜色相同，渐变变得平淡。', heavy:c => `在没有 WebGPU 的情况下，${c} 个粒子可能掉帧：请降低 Density。`, slow:f => `实测 ${f} FPS：请降低 Density 或 Scale。` },
    fixed:n => n ? `自动修复已直接在节点图状态中应用 ${n} 项更改。` : '无需修复：节点图状态良好。'
  }
};

let lang = 'en';
const enText = {}, enAria = {}, enPh = {};
const langListeners = [];
function snapshotEn(){
  document.querySelectorAll('[data-i18n]').forEach(el => { if (!(el.dataset.i18n in enText)) enText[el.dataset.i18n] = el.innerHTML; });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => { enAria[el.dataset.i18nAria] = el.getAttribute('aria-label'); });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => { enPh[el.dataset.i18nPh] = el.getAttribute('placeholder'); });
}
let zhFont = false;
function setLang(next, save){
  if (!META[next]) next = 'en';
  lang = next;
  const dict = next === 'en' ? enText : I18N[next];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.dataset.i18n; const v = dict[k] != null ? dict[k] : enText[k];
    if (v != null && el.innerHTML !== v) el.innerHTML = v;
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const k = el.dataset.i18nAria; el.setAttribute('aria-label', next === 'en' ? enAria[k] : (I18N[next][k] || enAria[k]));
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const k = el.dataset.i18nPh; el.setAttribute('placeholder', next === 'en' ? enPh[k] : (I18N[next][k] || enPh[k]));
  });
  document.documentElement.lang = META[next].html;
  document.title = META[next].title;
  document.querySelector('meta[name=description]').content = META[next].desc;
  document.querySelectorAll('[data-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === next)));
  if (next === 'zh' && !zhFont){
    zhFont = true; const l = document.createElement('link'); l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap'; document.head.appendChild(l);
  }
  if (save){
    store.set('expctral-lang', next);
    try { const u = new URL(location.href); u.searchParams.set('lang', next); history.replaceState(null, '', u); } catch(e){}
  }
  langListeners.forEach(fn => fn());
}
document.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang, true)));

/* ================= TOAST ================= */
const toastEl = document.getElementById('toast'); let toastT = 0;
function toast(msg){ toastEl.textContent = msg; toastEl.classList.add('is-on'); clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove('is-on'), 2600); }

/* ================= LINKS / CTAs ================= */
const supportDlg = document.getElementById('supportDlg'), b2bDlg = document.getElementById('b2bDlg');
const openDlg = d => { if (d.showModal) d.showModal(); else d.setAttribute('open', ''); };
// Ao fechar um diálogo, o foco volta para o botão que o abriu (teclado e leitor de tela não se perdem)
document.querySelectorAll('dialog').forEach(d => {
  let opener = null;
  new MutationObserver(() => { if (d.open) opener = document.activeElement; }).observe(d, { attributes:true, attributeFilter:['open'] });
  d.addEventListener('close', () => { if (opener && opener.isConnected && opener.focus) opener.focus(); });
});
[supportDlg, b2bDlg].forEach(d => {
  d.addEventListener('click', e => { if (e.target === d) d.close(); });
  d.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => d.close()));
});
document.querySelectorAll('[data-cta]').forEach(a => {
  const url = LINKS[a.dataset.cta];
  if (url){ a.href = url; a.target = '_blank'; a.rel = 'noopener'; return; }
  // Sem link real ainda: o botão explica o enquadramento via OSC / GitHub Sponsors (nada de checkout falso)
  a.removeAttribute('href'); a.setAttribute('role', 'button'); a.tabIndex = 0;
  const open = e => {
    e.preventDefault();
    if (a.dataset.cta === 'b2b'){ openDlg(b2bDlg); return; }
    const tier = a.closest('.tier');
    document.getElementById('supTier').textContent = tier ? `${tier.querySelector('h3').textContent} · ${tier.querySelector('.price').textContent}` : 'SUPPORT TIERS';
    openDlg(supportDlg);
  };
  a.addEventListener('click', open);
  a.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') open(e); });
});
if (LINKS.whatsapp){ const wa = document.getElementById('waFloat'); wa.href = LINKS.whatsapp; wa.hidden = false; }
const extra = document.getElementById('extraLinks');
[['Discord', LINKS.discord], ['X', LINKS.x]].filter(([,u]) => u).forEach(([n,u]) => {
  const li = document.createElement('li'); const a = document.createElement('a'); a.href = u; a.target = '_blank'; a.rel = 'noopener'; a.textContent = n;
  li.appendChild(a); extra.before(li);
});

/* ================= METAS DE ARRECADAÇÃO ================= */
function renderFunding(){
  const loc = lang === 'pt' ? 'pt-BR' : lang === 'zh' ? 'zh-CN' : 'en-US';
  const f = new Intl.NumberFormat(loc, { style:'currency', currency:'BRL', maximumFractionDigits:0 });
  document.querySelectorAll('[data-goal]').forEach(bar => {
    const note = bar.nextElementSibling, goal = Number(bar.dataset.goal), raised = FUNDING.raisedBRL;
    if (raised == null){ bar.classList.add('is-pending'); bar.setAttribute('aria-hidden', 'true'); note.textContent = UI[lang].fundPending; return; }
    const pct = Math.min(100, Math.round(raised / goal * 100));
    bar.classList.remove('is-pending'); bar.removeAttribute('aria-hidden'); bar.style.setProperty('--p', pct + '%'); bar.setAttribute('role', 'progressbar'); bar.setAttribute('aria-label', UI[lang].fundLabel);
    bar.setAttribute('aria-valuenow', pct); bar.setAttribute('aria-valuemin', 0); bar.setAttribute('aria-valuemax', 100);
    note.textContent = UI[lang].fundRaised(f.format(raised), pct);
  });
}
langListeners.push(renderFunding);

/* ================= HEADER / REVEAL / ANO ================= */
const topEl = document.getElementById('top');
const onScroll = () => topEl.classList.toggle('is-scrolled', scrollY > 8);
addEventListener('scroll', onScroll, { passive:true }); requestAnimationFrame(onScroll);   // ler scrollY já no início forçaria o layout da página inteira antes da 1ª pintura
document.getElementById('year').textContent = new Date().getFullYear();
if ('IntersectionObserver' in window && !reduceMotion.matches){
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting){ e.target.classList.add('is-in'); io.unobserve(e.target); } }), { rootMargin:'0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
} else document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-in'));

/* ================= SOM (Web Audio, sintético) ================= */
const Sound = (() => {
  let ctx = null, on = store.get('expctral-sound') !== 'off';
  function ac(){ if (!ctx){ const C = window.AudioContext || window.webkitAudioContext; if (!C) return null; ctx = new C(); } if (ctx.state === 'suspended') ctx.resume(); return ctx; }
  function tone(freq, t0, dur, type, vol){
    const c = ac(); if (!c) return;
    const o = c.createOscillator(), g = c.createGain(), f = c.createBiquadFilter();
    o.type = type; o.frequency.setValueAtTime(freq, c.currentTime + t0);
    f.type = 'lowpass'; f.frequency.value = 2400;
    g.gain.setValueAtTime(0.0001, c.currentTime + t0);
    g.gain.exponentialRampToValueAtTime(vol, c.currentTime + t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + t0 + dur);
    o.connect(f).connect(g).connect(c.destination); o.start(c.currentTime + t0); o.stop(c.currentTime + t0 + dur + 0.02);
  }
  const WAVES = [[523.25, 659.25], [659.25, 783.99], [783.99, 987.77], [1046.5, 1318.5]];
  return {
    get on(){ return on; },
    toggle(){ on = !on; store.set('expctral-sound', on ? 'on' : 'off'); if (on) this.click(); return on; },
    click(){ if (on) tone(1400, 0, 0.05, 'triangle', 0.035); },
    wave(i){ if (!on) return; const [a, b] = WAVES[i] || WAVES[0]; tone(a, 0, 0.16, 'sine', 0.05); tone(b, 0.07, 0.22, 'triangle', 0.035); },
    riff(){ if (!on) return; [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, i * 0.06, 0.18, 'sine', 0.04)); }
  };
})();

/* ================= TELEMETRIA ================= */
const BACKEND_LABEL = { webgpu:'WEBGPU ACTIVE', webgl2:'WEBGL2 FALLBACK', canvas2d:'CANVAS 2D FALLBACK', pending:'BOOTING RUNTIME' };
const BACKEND_SHORT = { webgpu:'WebGPU', webgl2:'WebGL2', canvas2d:'Canvas 2D', pending:'—' };
const telEl = document.getElementById('telemetry'), telText = document.getElementById('telText');
function reportTelemetry(backend, fps, ms){
  telEl.dataset.state = backend;
  telText.textContent = fps ? `${BACKEND_LABEL[backend]} // ${fps} FPS · ${ms.toFixed(1)} MS` : BACKEND_LABEL[backend];
  document.getElementById('trBackend').textContent = BACKEND_SHORT[backend];
  if (fps){ document.getElementById('trFps').textContent = fps; document.getElementById('trMs').textContent = ms.toFixed(1); }
}

/* ================= SINAPSE ENGINE (three/webgpu + TSL) ================= */
const PALETTE = { emerald:'#10B981', copper:'#FF9F1C', violet:'#A855F7', cyan:'#06B6D4' };
const countFromDensity = d => 1024 + Math.round(d * 240) * 64;   // 1 024 … 16 384, múltiplos de 64
const MOD_TYPES = {
  turb:  { name:'Turbulence', tag:'VFX',  key:'amount', out:'uTurbulence', min:0,  max:1,   def:.5 },
  twist: { name:'Twist',      tag:'VFX', key:'amount', out:'uTwist',      min:0,  max:1,   def:.45 },
  pulse: { name:'Pulse',      tag:'UTI',   key:'depth',  out:'uPulse',      min:0,  max:1,   def:.7 },
  size:  { name:'Scale',      tag:'VFX',   key:'scale',  out:'uScale',      min:.4, max:2.5, def:1.6 }
};
// Node Wrangler: vista isolada de cada nó (0 = render completo)
const VIEW_IDS = { time:1, speed:2, density:3, color:4, turb:5, twist:6, pulse:7, size:8 };
const baseParams = () => ({ speed:.5, density:.55, colorA:'emerald', colorB:'violet', mix:.35, turb:0, twist:0, pulse:0, size:1, view:0, frozen:false, cam:null });
// O motor de GPU (createGpuVortex) mora em sinapse.js, compartilhado com /atualizacoes/ e com o worker
const sinapse = () => import('./sinapse.js');
// LCP: o runtime de GPU só é carregado depois do load, em tempo ocioso
const whenIdle = cb => {
  let done = false; const run = () => { if (!done){ done = true; cb(); } };
  const go = () => { if ('requestIdleCallback' in window) requestIdleCallback(run, { timeout:1500 }); setTimeout(run, 1200); };
  document.readyState === 'complete' ? go() : addEventListener('load', go, { once:true });
};

// Fallback sem GPU: mesmo vórtice (aproximado) em Canvas 2D
function create2dVortex(canvas){
  const ctx = canvas.getContext('2d'); if (!ctx) return null;
  const MAX = 4096, S = 5, P = new Float32Array(MAX * S), TAU = Math.PI * 2;
  for (let i = 0; i < MAX; i++){ P[i*S] = .08 + Math.random() * .92; P[i*S+1] = Math.random() * TAU; P[i*S+2] = Math.random(); P[i*S+3] = Math.random(); P[i*S+4] = Math.random(); }
  let w = 0, h = 0, phase = 0, clock = 0, key = '', sprites = [];
  const rgb = hx => [1,3,5].map(i => parseInt(hx.slice(i, i+2), 16));
  function sprite(c){ const s = document.createElement('canvas'); s.width = s.height = 32; const g = s.getContext('2d'); const gr = g.createRadialGradient(16,16,0,16,16,16);
    gr.addColorStop(0, `rgba(${c},1)`); gr.addColorStop(.22, `rgba(${c},.55)`); gr.addColorStop(1, `rgba(${c},0)`); g.fillStyle = gr; g.fillRect(0,0,32,32); return s; }
  return {
    backend:'canvas2d',
    resize(cw, ch){ const d = Math.min(window.devicePixelRatio || 1, 2); w = cw; h = ch; canvas.width = Math.round(cw*d); canvas.height = Math.round(ch*d); ctx.setTransform(d,0,0,d,0,0); },
    tilt(){},
    render(p, dt){
      if (!p.frozen){ phase += dt * p.speed * 2.4; clock += dt; }
      const kk = p.colorA + p.colorB;
      if (kk !== key){ key = kk; const A = rgb(PALETTE[p.colorA]), B = rgb(PALETTE[p.colorB]); sprites = Array.from({length:12}, (_, j) => sprite([0,1,2].map(i => Math.round(A[i] + (B[i]-A[i]) * j/11)))); }
      ctx.globalCompositeOperation = 'source-over'; ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      const cx = w/2, cy = h/2, R = Math.min(w, h*1.6) * .44, n = Math.min(countFromDensity(p.density), w < 480 ? 1500 : 2600), base = Math.max(6, R/22);
      for (let i = 0; i < n; i++){
        const r = P[i*S], ph = P[i*S+1], h1 = P[i*S+2], h2 = P[i*S+3], h3 = P[i*S+4];
        const a = ph + phase * (.35/(r+.12)) + p.twist * r * 6;
        const rr = r + Math.sin(clock*1.7 + h3*TAU) * p.turb * .06;
        const x = cx + Math.cos(a)*rr*R, y = cy + Math.sin(a)*rr*R*.5 + (h1-.5)*R*.08*(1-r) + Math.sin(clock*2.3 + h3*9) * p.turb * R * .07;
        let k;
        switch (p.view){
          case 1: k = .5 + .5 * Math.sin(phase * 2); break;
          case 2: k = 1 - r; break;
          case 4: k = r; break;
          case 0: k = p.mix + (h2-.5)*.6 + Math.sin(clock*3 + r*6) * p.pulse * .45; break;
          default: k = h2;
        }
        const s = base*(.5 + (1-r)*.9)*(.6 + h1*.6) * p.size;
        ctx.drawImage(sprites[Math.round(Math.max(0, Math.min(1, k)) * 11)], x-s/2, y-s/2, s, s);
      }
    },
    dispose(){}
  };
}

/* Monta um vórtice: carrega a GPU só quando o canvas fica visível e o navegador está ocioso.
   WebGPU → WebGL2 (automático no WebGPURenderer) → Canvas 2D (timeout de 8 s ou erro). */
function mountVortex(canvas, getParams, onState, opts){
  let engine = null, booting = false, raf = 0, visible = false, last = 0, frames = 0, acc = 0;
  const size = () => { const r = canvas.getBoundingClientRect(); if (engine && r.width) engine.resize(r.width, r.height, window.devicePixelRatio || 1); };
  const tick = now => {
    const dt = last ? Math.min((now - last) / 1000, 0.1) : 0.016;
    // no worker, render() devolve false enquanto o quadro anterior não terminou: o FPS conta só o que foi desenhado
    if (engine.render(getParams(), dt) !== false){
      last = now; frames++; acc += dt;
      if (acc >= 0.5){ onState(engine.backend, Math.round(frames / acc), (acc / frames) * 1000); frames = 0; acc = 0; }
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
      try { r = await (await sinapse()).bootVortex(canvas, opts, 10000); }
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

/* ================= HERO ================= */
(() => {
  const params = baseParams();
  const canvas = document.getElementById('heroCanvas'), stage = document.getElementById('heroStage'), meta = document.getElementById('heroMeta');
  const bars = [1,2,3,4].map(i => document.getElementById('fq' + i));
  let t = 0;
  const hero = mountVortex(canvas, () => params, (backend, fps, ms) => {
    reportTelemetry(backend, fps, ms);
    meta.textContent = fps ? `three/webgpu r186 · ${BACKEND_SHORT[backend]} · ${fps} FPS` : `three/webgpu r186 · ${BACKEND_SHORT[backend]}`;
    t += 1; bars.forEach((b, i) => b.style.setProperty('--w', (40 + 45 * Math.abs(Math.sin(t * .7 + i * 1.3))) + '%'));
  });
  stage.addEventListener('pointermove', e => {
    const r = stage.getBoundingClientRect();
    hero.tilt((e.clientX - r.left) / r.width * 2 - 1, (e.clientY - r.top) / r.height * 2 - 1);
    params.mix = .2 + .5 * ((e.clientX - r.left) / r.width);
  });
})();

/* ================= PRISM STUDIO ================= */
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const hl = s => esc(s).replace(/(\/\/[^\n]*)|('[^'\n]*'|&quot;[^\n]*?&quot;)|\b(import|from|export|const|new|function|return|true|false|if)\b|\b(\d+(?:\.\d+)?)\b/g,
  (m, c, str, k, n) => c ? `<span class="c">${c}</span>` : str ? `<span class="s">${str}</span>` : k ? `<span class="k">${k}</span>` : `<span class="n">${n}</span>`);
const numbered = (src, owners) => src.replace(/\n$/, '').split('\n').map((l, i) => `<span class="l" data-ln="${i + 1}"${owners && owners[i] ? ` data-n="${owners[i]}"` : ''}>${hl(l) || ' '}</span>`).join('');
function download(name, text, type){
  const url = URL.createObjectURL(new Blob([text], { type: type || 'text/plain' }));
  const a = document.createElement('a'); a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

const Prism = (() => {
  const root = document.getElementById('studio');
  const graph = document.getElementById('graph'), svg = document.getElementById('wires');
  const ORIGINAL = '#4096-VORTEX';
  const state = { speed:.55, density:.45, colorA:'emerald', colorB:'violet', mix:.35, workspace:ORIGINAL, refractions:0,
                  mods:{}, bypass:{}, iso:null, lineage:[{ id:ORIGINAL, author:'Gabriel Mezzetti', kind:'root' }],
                  path:{ on:false, pts:[[.22,.3],[.78,.24],[.82,.76],[.2,.72]] } };
  let Collab = { push(){}, };
  let pathT = 0;
  const CORE_EDGES = [['time.tick','output.tick','exec'],['time.t','speed.t','val'],['speed.out','field.speed','val'],
                      ['density.out','field.count','val'],['color.out','field.color','vec'],['field.out','output.material','tsl']];
  const PRESETS = [
    { id:'emerald-bloom',  name:'EMERALD BLOOM',  speed:.4,  density:.55, colorA:'emerald', colorB:'violet', mix:.25, desc:'pkg.1' },
    { id:'copper-vortex',  name:'COPPER VORTEX',  speed:.9,  density:.4,  colorA:'copper',  colorB:'emerald', mix:.3, desc:'pkg.2' },
    { id:'violet-nebula',  name:'VIOLET NEBULA',  speed:.25, density:.85, colorA:'violet',  colorB:'copper', mix:.2, desc:'pkg.3' },
    { id:'cyan-telemetry', name:'CYAN TELEMETRY', speed:.65, density:.7,  colorA:'cyan',    colorB:'violet', mix:.3, desc:'pkg.4' }
  ];
  const PKG_DESC = {
    'pkg.1':'A slow emerald bloom drifting into violet. A calm starting point.',
    'pkg.2':'A fast copper vortex fading into emerald. High energy, lower density.',
    'pkg.3':'A dense violet nebula with copper highlights and a slow drift.',
    'pkg.4':'A cyan telemetry ring with violet depth, tuned for dashboards.'
  };
  const NAMES = { time:'Time', speed:'Speed', density:'Density', color:'Spectrum Color', field:'Vortex', output:'VFX Output',
                  turb:'Turbulence', twist:'Twist', pulse:'Pulse', size:'Scale' };
  const desktop = window.matchMedia('(min-width:1000px)');
  const nodes = {}; graph.querySelectorAll('.node').forEach(n => nodes[n.dataset.node] = n);
  let backend = 'pending', fpsNow = 0, msNow = 0, selected = null;

  /* parâmetros efetivos (bypass, modificadores e vista isolada aplicados) */
  function eff(){
    const by = state.bypass, p = baseParams();
    p.speed = by.speed ? 1 : state.speed;
    p.frozen = !!by.time;
    p.density = by.density ? .25 : state.density;
    if (!by.color){ p.colorA = state.colorA; p.colorB = state.colorB; p.mix = state.mix; }
    for (const [t, m] of Object.entries(state.mods)) if (!by[t]) p[t] = m.value;
    p.view = state.iso ? VIEW_IDS[state.iso] : 0;
    if (state.path.on) p.cam = camAt(pathT);
    return p;
  }
  const count = () => countFromDensity(eff().density);

  /* ---------- layout ---------- */
  const LAYOUT = { time:[0,.03], speed:[1,.03], density:[0,.265], color:[0,.55], field:[1,.40], output:[2,.30] };
  function clampNode(n, x, y){
    const W = graph.clientWidth, H = graph.clientHeight;
    n.style.left = Math.max(4, Math.min(W - n.offsetWidth - 4, x)) + 'px';
    n.style.top  = Math.max(4, Math.min(H - n.offsetHeight - 4, y)) + 'px';
  }
  function layout(){
    if (!desktop.matches){ Object.values(nodes).forEach(n => { n.style.left = n.style.top = ''; }); return; }
    const W = graph.clientWidth, H = graph.clientHeight;
    let modIdx = 0;
    for (const [id, n] of Object.entries(nodes)){
      const colW = (W - 40 - n.offsetWidth) / 2;
      if (n.dataset.moved){ clampNode(n, n.offsetLeft, n.offsetTop); continue; }
      const L = LAYOUT[id] || [2, .62 + .04 * modIdx++];
      clampNode(n, Math.round(20 + L[0] * colW), Math.round(L[1] * H));
    }
  }

  /* ---------- fios ---------- */
  const NS = 'http://www.w3.org/2000/svg';
  const edges = () => CORE_EDGES.concat(Object.keys(state.mods).map(t => [`${t}.out`, 'field.mods', 'val']));
  let wireEls = [];
  function buildWires(){
    svg.textContent = '';
    wireEls = edges().map(([a, b, type]) => {
      const glow = document.createElementNS(NS, 'path'); glow.setAttribute('class', `wire-glow w-${type}`);
      const main = document.createElementNS(NS, 'path'); main.setAttribute('class', `wire w-${type}` + (reduceMotion.matches ? '' : ' flow'));
      svg.append(glow, main);
      return { a, b, glow, main, src: a.split('.')[0] };
    });
    styleWires(); drawWires();
  }
  function styleWires(){ wireEls.forEach(w => { const m = !!state.bypass[w.src]; w.main.classList.toggle('is-muted', m); w.glow.classList.toggle('is-muted', m); }); }
  const sockEl = id => graph.querySelector(`[data-sock="${id}"]`);
  function drawWires(){
    if (!desktop.matches || graph.offsetParent === null) return;
    const g = graph.getBoundingClientRect();
    wireEls.forEach(w => {
      const sa = sockEl(w.a), sb = sockEl(w.b); if (!sa || !sb) return;
      const ra = sa.getBoundingClientRect(), rb = sb.getBoundingClientRect();
      const x0 = ra.left + ra.width/2 - g.left, y0 = ra.top + ra.height/2 - g.top, x3 = rb.left + rb.width/2 - g.left, y3 = rb.top + rb.height/2 - g.top;
      const dx = Math.max(50, Math.abs(x3 - x0) * .5);
      const d = `M${x0},${y0} C${x0+dx},${y0} ${x3-dx},${y3} ${x3},${y3}`;
      w.glow.setAttribute('d', d); w.main.setAttribute('d', d);
    });
  }
  let wireRaf = 0; const queueWires = () => { if (!wireRaf) wireRaf = requestAnimationFrame(() => { wireRaf = 0; drawWires(); }); };
  // pulso luminoso nos fios que saem do nó alterado
  function pulseFrom(src){
    if (reduceMotion.matches) return;
    wireEls.filter(w => w.src === src).forEach(w => [w.main, w.glow].forEach(el => {
      el.classList.remove('is-pulse'); requestAnimationFrame(() => el.classList.add('is-pulse'));
      clearTimeout(el._pt); el._pt = setTimeout(() => el.classList.remove('is-pulse'), 800);
    }));
  }

  /* ---------- seleção, bypass (M) e isolamento (Alt + clique) ---------- */
  const isoBadge = document.getElementById('isoBadge');
  function selectNode(id){ selected = id; Object.entries(nodes).forEach(([k, n]) => n.classList.toggle('is-selected', k === id)); renderPeek(id); }
  function toggleMute(id){
    if (id === 'field' || id === 'output'){ toast(UI[lang].core); return; }
    state.bypass[id] = !state.bypass[id];
    nodes[id].classList.toggle('is-muted', state.bypass[id]);
    styleWires(); changed(); Sound.click();
    toast((state.bypass[id] ? UI[lang].muted : UI[lang].unmuted)(NAMES[id]));
  }
  function toggleIso(id){
    if (!(id in VIEW_IDS)){ state.iso = null; toast(UI[lang].isoCore); }
    else state.iso = state.iso === id ? null : id;
    Object.entries(nodes).forEach(([k, n]) => n.classList.toggle('is-isolated', k === state.iso));
    isoBadge.hidden = !state.iso;
    isoBadge.textContent = state.iso ? `ISOLATED // ${NAMES[state.iso].toUpperCase()}` : '';
    if (state.iso) Sound.wave(3);
    changed();
  }

  /* ---------- interação de cada nó ---------- */
  function labelNode(n){
    const id = n.dataset.node, rm = n.querySelector('.rm');
    n.querySelector('.node-head').setAttribute('aria-label', UI[lang].node(NAMES[id], !!MOD_TYPES[id]));
    if (rm) rm.setAttribute('aria-label', UI[lang].rm(NAMES[id]));
  }
  langListeners.push(() => { Object.values(nodes).forEach(labelNode); graph.setAttribute('aria-label', UI[lang].graph); });
  function wireNode(n){
    const id = n.dataset.node, head = n.querySelector('.node-head');
    labelNode(n);
    let ox = 0, oy = 0, dragging = false;
    n.addEventListener('pointerdown', e => {
      if (e.altKey){ e.preventDefault(); toggleIso(id); return; }
      selectNode(id);
    });
    head.addEventListener('pointerdown', e => {
      if (e.altKey || !desktop.matches || e.button > 0 || e.target.closest('.rm')) return;
      dragging = true; try { head.setPointerCapture(e.pointerId); } catch(err){}
      n.classList.add('is-drag'); Sound.click();
      const g = graph.getBoundingClientRect(); ox = e.clientX - g.left - n.offsetLeft; oy = e.clientY - g.top - n.offsetTop;
    });
    head.addEventListener('pointermove', e => {
      if (!dragging) return;
      const g = graph.getBoundingClientRect();
      clampNode(n, e.clientX - g.left - ox, e.clientY - g.top - oy); n.dataset.moved = '1'; queueWires();
    });
    const end = () => { if (dragging) Collab.push(); dragging = false; n.classList.remove('is-drag'); };
    head.addEventListener('pointerup', end); head.addEventListener('pointercancel', end);
    head.addEventListener('focus', () => selectNode(id));
    n.addEventListener('pointerenter', () => renderPeek(id));
    n.addEventListener('pointerleave', () => renderPeek(selected));
    head.addEventListener('keydown', e => {
      if (!desktop.matches) return;
      const step = e.shiftKey ? 36 : 12, k = { ArrowLeft:[-step,0], ArrowRight:[step,0], ArrowUp:[0,-step], ArrowDown:[0,step] }[e.key];
      if (!k) return; e.preventDefault();
      clampNode(n, n.offsetLeft + k[0], n.offsetTop + k[1]); n.dataset.moved = '1'; queueWires(); Collab.push();
    });
    const rm = n.querySelector('.rm'); if (rm) rm.addEventListener('click', e => { e.stopPropagation(); removeMod(id); });
    n.querySelectorAll('input, select').forEach(el => el.addEventListener('input', () => onControl(el, id)));
  }

  /* ---------- controles ---------- */
  function onControl(el, id){
    if (el.dataset.bind){ const k = el.dataset.bind; state[k] = el.tagName === 'SELECT' ? el.value : parseFloat(el.value); }
    if (el.dataset.mod){ state.mods[el.dataset.mod].value = parseFloat(el.value); }
    changed(); pulseFrom(id);
  }
  function syncControls(){
    root.querySelectorAll('[data-bind]').forEach(el => { el.value = state[el.dataset.bind]; });
    root.querySelectorAll('[data-mod]').forEach(el => { el.value = state.mods[el.dataset.mod].value; });
    root.querySelector('[data-show="speed"]').textContent = state.speed.toFixed(2);
    root.querySelector('[data-show="density"]').textContent = state.density.toFixed(2);
    root.querySelector('[data-show="mix"]').textContent = state.mix.toFixed(2);
    root.querySelector('[data-show="count"]').textContent = count();
    Object.entries(state.mods).forEach(([t, m]) => { const o = root.querySelector(`[data-show="${t}"]`); if (o) o.textContent = m.value.toFixed(2); });
  }

  /* ---------- nós modificadores ---------- */
  function addMod(type, pos, opts){
    opts = opts || {};
    if (state.mods[type]){
      selectNode(type); nodes[type].querySelector('.node-head').focus({ preventScroll:true });
      if (!opts.silent) toast(UI[lang].exists(NAMES[type])); return;
    }
    const T = MOD_TYPES[type], value = opts.value != null ? opts.value : T.def;
    state.mods[type] = { value };
    const n = document.createElement('div');
    n.className = 'node node--mod'; n.dataset.node = type;
    n.innerHTML = `<div class="node-head" tabindex="0"><span class="eyebrow cat cat-${T.tag}">${T.tag}</span>${T.name}<button type="button" class="rm" aria-label="${UI[lang].rm(T.name)}">×</button></div>
      <div class="node-body">
        <label class="ctl"><span>${T.key} <output data-show="${type}">${value.toFixed(2)}</output></span><input type="range" min="${T.min}" max="${T.max}" step="0.01" value="${value}" data-mod="${type}"></label>
        <div class="port out"><span>${T.out}</span><i class="sock val" data-sock="${type}.out"></i></div>
      </div>`;
    graph.insertBefore(n, nodes.field);
    nodes[type] = n; wireNode(n);
    if (desktop.matches){
      if (pos){ clampNode(n, pos.x - n.offsetWidth / 2, pos.y - 40); n.dataset.moved = '1'; }
      else layout();
    }
    buildWires(); changed();
    if (!opts.silent){ selectNode(type); Sound.riff(); toast(UI[lang].added(T.name)); }
  }
  function removeMod(type, silent){
    if (!state.mods[type]) return;
    delete state.mods[type]; delete state.bypass[type];
    if (state.iso === type){ state.iso = null; isoBadge.hidden = true; }
    nodes[type].remove(); delete nodes[type];
    if (selected === type) selected = null;
    buildWires(); layout(); changed();
    if (!silent){ Sound.click(); toast(UI[lang].removed(NAMES[type])); }
  }

  /* ---------- Quick-Add: anel radial com busca fuzzy (Tab / Espaço) ---------- */
  const palette = document.getElementById('palette'), palInput = document.getElementById('paletteInput'), addBtn = document.getElementById('addNodeBtn');
  const palList = document.getElementById('palList');
  const opts = Object.entries(MOD_TYPES).map(([type, T], idx) => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'opt'; b.dataset.type = type;
    b.id = 'pal-' + type; b.setAttribute('role', 'option'); b.tabIndex = -1;   // o foco fica na busca; Tab/setas trocam a opção ativa
    const ang = -Math.PI / 2 + idx * Math.PI / 2;
    b.style.left = (50 + Math.cos(ang) * 41) + '%'; b.style.top = (50 + Math.sin(ang) * 41) + '%';
    b.addEventListener('click', () => insertFromPalette(type));
    palList.appendChild(b); return b;
  });
  let palPos = null, palFromCursor = false, palActive = 0, hover = null;
  graph.addEventListener('pointermove', e => { const g = graph.getBoundingClientRect(); hover = { x:e.clientX - g.left, y:e.clientY - g.top }; });
  graph.addEventListener('pointerleave', () => { hover = null; });
  function fuzzy(q, text){
    q = q.toLowerCase(); text = text.toLowerCase(); if (!q) return 1;
    let ti = 0, score = 0, streak = 0;
    for (const ch of q){ const f = text.indexOf(ch, ti); if (f < 0) return 0; streak = f === ti ? streak + 1 : 0; score += 1 + streak * 2 + (f === 0 ? 3 : 0); ti = f + 1; }
    return score;
  }
  function filterPal(){
    const q = palInput.value.trim();
    const ok = opts.map(o => { const T = MOD_TYPES[o.dataset.type]; return { o, s: fuzzy(q, `${T.name} ${T.tag} ${o.dataset.type}`) }; })
      .map(x => { x.o.classList.toggle('is-dim', x.s === 0); return x; })
      .filter(x => x.s > 0).sort((a, b) => b.s - a.s).map(x => x.o);
    palActive = Math.min(palActive, Math.max(0, ok.length - 1));
    opts.forEach(o => { const on = o === ok[palActive]; o.classList.toggle('is-active', on); o.setAttribute('aria-selected', String(on)); o.setAttribute('aria-hidden', String(!ok.includes(o))); });
    if (ok[palActive]) palInput.setAttribute('aria-activedescendant', ok[palActive].id); else palInput.removeAttribute('aria-activedescendant');
    return ok;
  }
  function openPalette(at){
    const g = graph.getBoundingClientRect(), W = graph.clientWidth, H = graph.clientHeight;
    palFromCursor = !!at;
    const p = at || { x: W / 2, y: Math.max(140, Math.min(H - 140, innerHeight / 2 - g.top)) };
    palPos = { x: Math.max(135, Math.min(W - 135, p.x)), y: Math.max(135, Math.min(H - 135, p.y)) };
    palette.style.left = palPos.x + 'px'; palette.style.top = palPos.y + 'px';
    opts.forEach(o => { const T = MOD_TYPES[o.dataset.type]; o.innerHTML = `<i></i>${T.name.toUpperCase()}${state.mods[o.dataset.type] ? ' <em>✓</em>' : ''}`; });
    palette.hidden = false; addBtn.setAttribute('aria-expanded', 'true'); palInput.setAttribute('aria-expanded', 'true');
    palInput.value = ''; palActive = 0; filterPal();
    palInput.focus({ preventScroll:true }); Sound.click();
  }
  function closePalette(refocus){ palette.hidden = true; addBtn.setAttribute('aria-expanded', 'false'); palInput.setAttribute('aria-expanded', 'false'); if (refocus) graph.focus({ preventScroll:true }); }
  // sob o cursor quando aberto por Tab/Espaço; sem cursor, vai para a coluna livre à direita
  function insertFromPalette(type){
    const pos = palFromCursor ? palPos : null; closePalette(); addMod(type, desktop.matches ? pos : null);
    if (nodes[type]) nodes[type].querySelector('.node-head').focus({ preventScroll:true });
  }
  palInput.addEventListener('input', () => { palActive = 0; filterPal(); });
  palInput.addEventListener('keydown', e => {
    const ok = filterPal();
    if (e.key === 'Escape'){ e.preventDefault(); closePalette(true); }
    else if (e.key === 'Enter'){ e.preventDefault(); if (ok[palActive]) insertFromPalette(ok[palActive].dataset.type); }
    else if (['ArrowDown','ArrowRight','Tab'].includes(e.key) && ok.length){ e.preventDefault(); palActive = (palActive + 1) % ok.length; filterPal(); }
    else if (['ArrowUp','ArrowLeft'].includes(e.key) && ok.length){ e.preventDefault(); palActive = (palActive - 1 + ok.length) % ok.length; filterPal(); }
  });
  addBtn.addEventListener('click', () => palette.hidden ? openPalette(null) : closePalette());
  document.addEventListener('pointerdown', e => { if (!palette.hidden && !palette.contains(e.target) && e.target !== addBtn) closePalette(); });
  graph.tabIndex = 0; graph.setAttribute('role', 'group');
  graph.setAttribute('aria-label', UI.en.graph);

  // Atalhos do editor (só quando o cursor ou o foco estão no estúdio)
  document.addEventListener('keydown', e => {
    if (e.defaultPrevented || e.ctrlKey || e.metaKey) return;
    const t = e.target;
    if (t.closest && (t.closest('input, select, textarea, [contenteditable], dialog') || t.closest('.ada'))) return;
    const over = graph.matches(':hover'), focusIn = root.contains(document.activeElement);
    if (!over && !focusIn) return;
    const k = e.key;
    if ((k === 'Tab' && over && !e.shiftKey) || (k === ' ' && (over || graph.contains(document.activeElement)) && !(t.closest && t.closest('button')))){
      e.preventDefault(); openPalette(over && hover ? hover : null); return;
    }
    if (!selected) { if (k === 'Escape' && state.iso) toggleIso(state.iso); return; }
    if (k === 'm' || k === 'M'){ e.preventDefault(); toggleMute(selected); }
    else if (k === 'i' || k === 'I'){ e.preventDefault(); toggleIso(selected); }
    else if ((k === 'Delete' || k === 'Backspace') && MOD_TYPES[selected]){ e.preventDefault(); removeMod(selected); }
    else if (k === 'Escape' && state.iso){ toggleIso(state.iso); }
  });

  /* ---------- gerador de TS (idêntico à TSL da prévia) ---------- */
  function genTS(){
    const p = eff(), A = PALETTE[p.colorA], B = PALETTE[p.colorB], n = countFromDensity(p.density);
    const used = Object.keys(state.mods).filter(t => !state.bypass[t]).map(t => MOD_TYPES[t].name);
    return [
`// SPDX-License-Identifier: Apache-2.0`,
`// ${state.workspace}: ejected from Expctral Prism Studio`,
...(state.lineage.length > 1 ? [`// Lineage: ${state.lineage.map(l => `${l.id} (${l.kind === 'you' ? 'you' : l.author})`).join(' -> ')}`] : []),
`// Depends only on standard Three.js (three/webgpu + three/tsl). 0% lock-in.`,
`// Same TSL that renders the live preview on https://mezzetti4096.github.io/expctral/`,
``,
`import * as THREE from 'three/webgpu';`,
`import { Fn, uniform, instancedArray, instanceIndex, hash, float, vec3, mix, clamp, sin, cos, uv, length, smoothstep } from 'three/tsl';`,
``,
`const TAU = 6.2831853;`,
``,
`// Density node${state.bypass.density ? ' (bypassed: default)' : ''}: particle count, multiple of the workgroup size (64)`,
`export const PARTICLE_COUNT = ${n};`,
``,
`// Speed node${state.bypass.speed ? ' (bypassed: 1.0)' : ''}`,
`export const SPEED = ${p.speed.toFixed(2)};`,
``,
`// Time node${p.frozen ? ' (bypassed: frozen)' : ''}`,
`export const FROZEN = ${p.frozen};`,
``,
`// Spectrum Color node${state.bypass.color ? ' (bypassed: default spectrum)' : ''}`,
`export const uMix = uniform(${p.mix.toFixed(2)});`,
`const uSpectrumA = uniform(new THREE.Color('${A}'));`,
`const uSpectrumB = uniform(new THREE.Color('${B}'));`,
``,
`// Modifier nodes (0 = not in the graph)${used.length ? ': ' + used.join(', ') : ''}`,
`export const uTurbulence = uniform(${p.turb.toFixed(2)});`,
`export const uTwist = uniform(${p.twist.toFixed(2)});`,
`export const uPulse = uniform(${p.pulse.toFixed(2)});`,
`export const uScale = uniform(${p.size.toFixed(2)});`,
``,
`// Time node: phase and clock accumulated on the CPU, read by the GPU`,
`export const uPhase = uniform(0);`,
`export const uClock = uniform(0);`,
``,
`const radius = (i) => hash(i).mul(0.92).add(0.08);`,
``,
`const vortex = Fn(([i]) => {`,
`  const r = radius(i);`,
`  const a = hash(i.add(7)).mul(TAU).add(uPhase.mul(0.35).div(r.add(0.12))).add(uTwist.mul(r).mul(6.0));`,
`  const n1 = sin(uClock.mul(1.7).add(hash(i.add(11)).mul(TAU)));`,
`  const n2 = sin(uClock.mul(2.3).add(hash(i.add(13)).mul(TAU)));`,
`  const rr = r.add(n1.mul(uTurbulence).mul(0.06));`,
`  const y = hash(i.add(3)).sub(0.5).mul(0.12).mul(float(1).sub(r)).add(n2.mul(uTurbulence).mul(0.14));`,
`  return vec3(cos(a).mul(rr), y, sin(a).mul(rr));`,
`});`,
``,
`// Compute Pass: storage buffer (vec3 uses a 16-byte stride)`,
`const positions = instancedArray(PARTICLE_COUNT, 'vec3');`,
`export const computeVortex = Fn(() => {`,
`  positions.element(instanceIndex).assign(vortex(instanceIndex));`,
`})().compute(PARTICLE_COUNT, [64]);`,
``,
`// Vortex node [VFX] -> Render Pass (TSL material)`,
`const k = clamp(uMix.add(hash(instanceIndex.add(1)).sub(0.5).mul(0.6))`,
`  .add(sin(uClock.mul(3.0).add(radius(instanceIndex).mul(6.0))).mul(uPulse).mul(0.45)), 0, 1);`,
`export const material = new THREE.SpriteNodeMaterial({ transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });`,
`material.positionNode = positions.toAttribute();`,
`material.colorNode = mix(uSpectrumA, uSpectrumB, k);`,
`material.opacityNode = float(1).sub(smoothstep(0, 0.5, length(uv().sub(0.5))));`,
`material.scaleNode = hash(instanceIndex.add(5)).mul(0.014).add(0.008).mul(uScale);`,
``,
`// VFX Output node [OUT]: call update(dt) once per frame (Time -> tick)`,
`export function createVortex(renderer: THREE.WebGPURenderer) {`,
`  const particles = new THREE.Sprite(material);`,
`  particles.count = PARTICLE_COUNT;`,
`  return {`,
`    object: particles,`,
`    update(dt: number) {`,
`      if (!FROZEN) {`,
`        uPhase.value += dt * SPEED * 2.4;`,
`        uClock.value += dt;`,
`      }`,
`      renderer.compute(computeVortex);`,
`    },`,
`  };`,
`}`,
...(state.path.on ? [
``,
`// Camera path (Path Editor "Trajeto"): closed Catmull-Rom curve around the vortex`,
`export const cameraPath = new THREE.CatmullRomCurve3([`,
...state.path.pts.map(pt => { const w = toWorld(pt); return `  new THREE.Vector3(${w.x.toFixed(2)}, ${w.y.toFixed(2)}, ${w.z.toFixed(2)}),`; }),
`], true, 'catmullrom', 0.5);`,
`export function cameraOnPath(camera: THREE.PerspectiveCamera, t: number) {`,
`  camera.position.copy(cameraPath.getPoint(((t % 1) + 1) % 1));`,
`  camera.lookAt(0, 0, 0);`,
`}`] : []),
``].join('\n');
  }
  let simPhase = 0;
  function genMath(){
    const p = eff();
    return JSON.stringify({
      orbit: state.workspace,
      'time.phase': +simPhase.toFixed(2), 'time.frozen': p.frozen,
      'speed.value': p.speed, 'density.value': p.density, 'density.count': countFromDensity(p.density),
      'spectrum.a': PALETTE[p.colorA], 'spectrum.b': PALETTE[p.colorB], 'spectrum.mix': p.mix,
      modifiers: Object.fromEntries(Object.entries(state.mods).map(([t, m]) => [t, +m.value.toFixed(2)])),
      bypass: Object.keys(state.bypass).filter(k => state.bypass[k]),
      isolated: state.iso,
      'output.material': 'SpriteNodeMaterial'
    }, null, 2);
  }
  function genGPU(){
    const n = count();
    const rows = [
      ['GPU memory (est.)', backend === 'webgpu' ? '≈ 256 KB storage buffer + sprite geometry' : backend === 'webgl2' ? 'no storage buffer (vertex path)' : '—'],
      ['Renderer', 'THREE.WebGPURenderer (three r186)'],
      ['Backend (live)', BACKEND_SHORT[backend] + (fpsNow ? ` · ${fpsNow} FPS · ${msNow.toFixed(1)} ms` : '')],
      ['Compute pass', backend === 'webgpu' ? 'computeVortex · storage buffer' : backend === 'webgl2' ? 'vertex stage (WebGL2 path)' : 'Canvas 2D fallback'],
      ['Particles', n.toLocaleString('en-US')],
      ['Workgroup size', '64'],
      ['Dispatch', `${16384 / 64} workgroups (16 384 slots)`],
      ['Storage buffer', '16 384 × 16 B = 256 KB'],
      ['Alignment', '16 bytes (vec3 → vec4 stride, std430)'],
      ['Modifiers', Object.keys(state.mods).map(t => MOD_TYPES[t].name).join(', ') || '—'],
      ['Isolated view', state.iso ? NAMES[state.iso] : '—'],
      ['Render pass', 'SpriteNodeMaterial · AdditiveBlending']
    ];
    return rows.map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join('');
  }
  const mathEl = document.getElementById('mathCode'), tslEl = document.getElementById('tslCode'), gpuEl = document.getElementById('gpuList');
  let activePanel = 'wave-visual';
  function renderPanels(){
    if (activePanel === 'wave-math') mathEl.innerHTML = hl(genMath());
    if (activePanel === 'wave-tsl'){ const src = genTS(); tslEl.innerHTML = numbered(src, ownersOf(src)); }
    renderPeek(peekId);
    if (activePanel === 'wave-gpu') gpuEl.innerHTML = genGPU();
  }

  /* ---------- abas das 4 frequências (com som) ---------- */
  const tabs = [...root.querySelectorAll('[role=tab]')];
  function selectTab(tab, focus){
    tabs.forEach(t => { const on = t === tab; t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; document.getElementById(t.getAttribute('aria-controls')).hidden = !on; });
    activePanel = tab.getAttribute('aria-controls');
    Sound.wave(tabs.indexOf(tab));
    if (focus) tab.focus();
    renderPanels();
    if (activePanel === 'wave-visual'){ layout(); drawWires(); } else closePalette();
  }
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => selectTab(t));
    t.addEventListener('keydown', e => {
      const to = { ArrowRight:i + 1, ArrowLeft:i - 1, Home:0, End:tabs.length - 1 }[e.key];
      if (to != null){ e.preventDefault(); selectTab(tabs[(to + tabs.length) % tabs.length], true); }
    });
  });

  const soundBtn = document.getElementById('soundBtn');
  soundBtn.setAttribute('aria-pressed', String(Sound.on));
  soundBtn.addEventListener('click', () => soundBtn.setAttribute('aria-pressed', String(Sound.toggle())));

  /* ---------- Primordial Spectra ---------- */
  const presetBtn = document.getElementById('presetBtn'), menu = document.getElementById('presetMenu');
  function applyPreset(p){ Object.assign(state, { speed:p.speed, density:p.density, colorA:p.colorA, colorB:p.colorB, mix:p.mix }); changed(); }
  PRESETS.forEach(p => {
    const b = document.createElement('button'); b.type = 'button'; b.setAttribute('role', 'menuitem');
    b.innerHTML = `<i style="--a:${PALETTE[p.colorA]};--b:${PALETTE[p.colorB]}"></i>${p.name}`;
    b.addEventListener('click', () => { applyPreset(p); closeMenu(true); Sound.riff(); toast(`${UI[lang].preset}: ${p.name}`); ['speed','density','color'].forEach(pulseFrom); });
    menu.appendChild(b);
  });
  function openMenu(){ menu.hidden = false; presetBtn.setAttribute('aria-expanded', 'true'); menu.querySelector('button').focus(); Sound.click(); }
  function closeMenu(refocus){ menu.hidden = true; presetBtn.setAttribute('aria-expanded', 'false'); if (refocus) presetBtn.focus(); }
  presetBtn.addEventListener('click', () => menu.hidden ? openMenu() : closeMenu());
  menu.addEventListener('keydown', e => {
    const items = [...menu.querySelectorAll('button')], i = items.indexOf(document.activeElement);
    if (e.key === 'Escape'){ e.preventDefault(); closeMenu(true); }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp'){ e.preventDefault(); items[(i + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length].focus(); }
  });
  document.addEventListener('click', e => { if (!menu.hidden && !menu.contains(e.target) && e.target !== presetBtn) closeMenu(); });

  /* ---------- Refração + linhagem ---------- */
  const wsName = document.getElementById('wsName'), refractTag = document.getElementById('refractTag'), lineageEl = document.getElementById('lineage');
  function renderLineage(){
    lineageEl.innerHTML = state.lineage.map((l, i) =>
      `<li class="${l.kind}" style="margin-left:${i * .9}rem"><b>${esc(l.id)}</b> · ${l.kind === 'you' ? UI[lang].you : esc(l.author)}${l.kind === 'root' ? ' · ' + UI[lang].primordial : ''}</li>`).join('');
    const rootL = state.lineage[0];
    refractTag.hidden = state.lineage.length < 2;
    refractTag.textContent = `⑂ REFRACTED FROM ${rootL.id} // AUTHOR: ${String(rootL.author).toUpperCase()}`;
    wsName.textContent = state.workspace;
  }
  function doRefract(silent){
    state.refractions++;
    const base = state.lineage[0].kind === 'root' && state.lineage[0].id.startsWith('#') ? state.lineage[0].id : '#' + state.lineage[0].id.replace(/\.exp$/, '').toUpperCase();
    state.workspace = `${base}-R${state.refractions}`;
    state.lineage.push({ id: state.workspace, author: 'you', kind: 'you' });
    renderLineage(); renderPanels(); Sound.wave(2);
    if (!silent) toast(UI[lang].refracted);
  }
  document.getElementById('refractBtn').addEventListener('click', () => doRefract());

  /* ---------- Eject (barra superior, estúdio e arquitetura) ---------- */
  const dlg = document.getElementById('ejectDlg'), ejectCode = document.getElementById('ejectCode');
  const fileName = () => `expctral-${state.workspace.replace('#', '').toLowerCase()}.ts`;
  document.querySelectorAll('[data-eject]').forEach(b => b.addEventListener('click', () => {
    const src = genTS(); ejectCode.innerHTML = numbered(src, ownersOf(src));
    document.getElementById('ejectFile').textContent = fileName(); document.getElementById('ejectTab').textContent = fileName();
    Sound.riff();
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
  }));
  document.getElementById('closeDlg').addEventListener('click', () => dlg.close ? dlg.close() : dlg.removeAttribute('open'));
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  document.getElementById('copyBtn').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(genTS()); toast(UI[lang].copied); Sound.click(); }
    catch(e){ const r = document.createRange(); r.selectNodeContents(ejectCode); const s = getSelection(); s.removeAllRanges(); s.addRange(r); toast(UI[lang].copyFail); }
  });
  document.getElementById('dlBtn').addEventListener('click', () => { download(fileName(), genTS()); toast(UI[lang].downloaded); });

  /* ---------- pacotes .exp (exportar / importar) ---------- */
  function toExp(src){
    const g = src || state;
    return JSON.stringify({
      format:'expctral.exp', version:1, license:'Apache-2.0',
      workspace: src ? `#${src.id.toUpperCase()}` : state.workspace,
      createdWith:'Expctral Prism Studio (landing prototype)',
      lineage: src ? [{ id:`${src.id}.exp`, author:'Gabriel Mezzetti', kind:'root' }] : state.lineage,
      graph:{ speed:g.speed, density:g.density, colorA:g.colorA, colorB:g.colorB, mix:g.mix,
              mods: src ? {} : Object.fromEntries(Object.entries(state.mods).map(([k, m]) => [k, m.value])),
              bypass: src ? {} : { ...state.bypass } }
    }, null, 2);
  }
  const num = (v, lo, hi, d) => { v = Number(v); return Number.isFinite(v) ? Math.max(lo, Math.min(hi, v)) : d; };
  function loadExp(obj){
    if (!obj || obj.format !== 'expctral.exp' || typeof obj.graph !== 'object') throw new Error('format');
    const g = obj.graph;
    Object.keys(state.mods).forEach(t => { nodes[t].remove(); delete nodes[t]; });
    state.mods = {}; state.bypass = {}; state.iso = null; isoBadge.hidden = true;
    Object.values(nodes).forEach(n => n.classList.remove('is-muted', 'is-isolated'));
    state.speed = num(g.speed, .05, 1.5, .55); state.density = num(g.density, 0, 1, .45); state.mix = num(g.mix, 0, 1, .35);
    state.colorA = PALETTE[g.colorA] ? g.colorA : 'emerald'; state.colorB = PALETTE[g.colorB] ? g.colorB : 'violet';
    Object.entries(g.mods || {}).forEach(([t, v]) => { if (MOD_TYPES[t]) addMod(t, null, { silent:true, value: num(v, MOD_TYPES[t].min, MOD_TYPES[t].max, MOD_TYPES[t].def) }); });
    Object.entries(g.bypass || {}).forEach(([t, v]) => { if (v && nodes[t] && t !== 'field' && t !== 'output'){ state.bypass[t] = true; nodes[t].classList.add('is-muted'); } });
    const lin = Array.isArray(obj.lineage) ? obj.lineage.slice(0, 20).map(l => ({ id: String(l.id || '?').slice(0, 48), author: String(l.author || '?').slice(0, 48), kind: ['root','you','ref'].includes(l.kind) ? l.kind : 'ref' })) : [];
    state.lineage = lin.length ? lin : [{ id: ORIGINAL, author: 'Gabriel Mezzetti', kind:'root' }];
    state.workspace = String(obj.workspace || ORIGINAL).slice(0, 48);
    state.refractions = state.lineage.filter(l => l.kind !== 'root').length;
    buildWires(); layout(); styleWires(); renderLineage(); changed();
  }
  document.getElementById('expExport').addEventListener('click', () => { download(`expctral-${state.workspace.replace('#', '').toLowerCase()}.exp`, toExp(), 'application/json'); toast(UI[lang].exported); });
  const drop = document.getElementById('drop'), fileIn = document.getElementById('expFile');
  async function readFile(f){
    if (!f) return;
    try { const txt = await f.text(); if (txt.length > 200000) throw new Error('size'); loadExp(JSON.parse(txt)); toast(UI[lang].imported(f.name)); Sound.riff(); document.getElementById('prism').scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth' }); }
    catch(e){ toast(UI[lang].badExp); }
  }
  ['dragenter','dragover'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.add('is-over'); }));
  ['dragleave','drop'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.remove('is-over'); }));
  drop.addEventListener('drop', e => readFile(e.dataTransfer.files[0]));
  fileIn.addEventListener('change', () => { readFile(fileIn.files[0]); fileIn.value = ''; });

  /* ---------- Spectral Registry: catálogo ---------- */
  const pkgsEl = document.getElementById('pkgs'), regSearch = document.getElementById('regSearch'), regEmpty = document.getElementById('regEmpty');
  PRESETS.forEach(p => {
    const a = document.createElement('article');
    a.className = 'pkg glass reticle hoverable'; a.dataset.id = p.id; a.style.setProperty('--c', PALETTE[p.colorA]);
    a.innerHTML = `<div class="pkg-swatch" style="--a:${PALETTE[p.colorA]};--b:${PALETTE[p.colorB]}"></div>
      <h3 class="h">${p.name}<small>${p.id}.exp</small></h3>
      <p data-i18n="${p.desc}">${PKG_DESC[p.desc]}</p>
      <p class="meta">Gabriel Mezzetti · Apache-2.0 · ${countFromDensity(p.density).toLocaleString('en-US')} particles</p>
      <div class="btns">
        <button type="button" class="btn btn--primary btn--sm btn--tac" data-refract="${p.id}">[ ⑂ REFRACT ]</button>
        <button type="button" class="btn btn--glass btn--sm" data-dl="${p.id}" data-i18n="reg.dl">Download .exp</button>
      </div>`;
    a.querySelector('[data-refract]').addEventListener('click', () => {
      if (state.iso) toggleIso(state.iso);
      Object.keys(state.mods).forEach(removeModSilently);
      Object.keys(state.bypass).forEach(k => { if (nodes[k]) nodes[k].classList.remove('is-muted'); });
      state.bypass = {}; styleWires(); layout();
      applyPreset(p);
      state.lineage = [{ id:`${p.id}.exp`, author:'Gabriel Mezzetti', kind:'root' }]; state.refractions = 0;
      doRefract(true); toast(UI[lang].refractedPkg(p.name));
      document.getElementById('prism').scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    });
    a.querySelector('[data-dl]').addEventListener('click', () => { download(`${p.id}.exp`, toExp(p), 'application/json'); toast(UI[lang].downloaded); });
    pkgsEl.appendChild(a);
  });
  function removeModSilently(t){ delete state.mods[t]; delete state.bypass[t]; nodes[t].remove(); delete nodes[t]; buildWires(); }
  let filter = 'all';
  function filterPkgs(){
    const q = regSearch.value.trim().toLowerCase(); let shown = 0;
    pkgsEl.querySelectorAll('.pkg').forEach(el => {
      const p = PRESETS.find(x => x.id === el.dataset.id);
      const hay = `${p.name} ${p.id} ${p.colorA} ${p.colorB} ${el.textContent}`.toLowerCase();
      const ok = (filter === 'all' || p.colorA === filter || p.colorB === filter) && (!q || hay.includes(q));
      el.hidden = !ok; if (ok) shown++;
    });
    regEmpty.hidden = shown > 0;
  }
  regSearch.addEventListener('input', filterPkgs);
  document.querySelectorAll('.fchip').forEach(b => b.addEventListener('click', () => {
    filter = b.dataset.filter; document.querySelectorAll('.fchip').forEach(x => x.setAttribute('aria-pressed', String(x === b))); filterPkgs();
  }));

  /* ---------- simulação do split 85/15 ---------- */
  const price = document.getElementById('price'), vC = document.getElementById('vCreator'), vP = document.getElementById('vPlatform');
  function renderSplit(){
    const loc = lang === 'pt' ? 'pt-BR' : lang === 'zh' ? 'zh-CN' : 'en-US';
    const f = new Intl.NumberFormat(loc, { style:'currency', currency:'BRL' }), v = Number(price.value);
    vC.textContent = f.format(v * .85); vP.textContent = f.format(v * .15);
    price.setAttribute('aria-valuetext', f.format(v));
  }
  price.addEventListener('input', renderSplit);

  /* ---------- prévia ao vivo ---------- */
  const statusEl = document.getElementById('gpuStatus'), outT = document.getElementById('outT');
  const renderStatus = () => { statusEl.dataset.state = backend; statusEl.querySelector('span').textContent = UI[lang].previewOn[backend] + (fpsNow ? ` · ${fpsNow} FPS` : ''); };
  langListeners.push(renderStatus, renderLineage, renderSplit);
  let lastMath = -1;
  const preview = mountVortex(document.getElementById('previewCanvas'), eff, (b, fps, ms) => {
    backend = b; fpsNow = fps; msNow = ms; renderStatus();
    if (fps) reportTelemetry(b, fps, ms);   // a telemetria do topo acompanha o canvas que estiver rodando
    if (activePanel === 'wave-gpu') gpuEl.innerHTML = genGPU();
  }, { wrangler:true });
  (function phaseLoop(prev){
    requestAnimationFrame(now => {
      const p = eff();
      const dtl = prev ? Math.min((now - prev) / 1000, .1) : 0;
      if (!p.frozen) simPhase += dtl * p.speed * 2.4;
      if (state.path.on && !reduceMotion.matches){ pathT = (pathT + dtl * .04 * (.5 + p.speed)) % 1; drawCamDot(); }
      if (activePanel === 'wave-visual' && !reduceMotion.matches) outT.textContent = simPhase.toFixed(2);
      if (activePanel === 'wave-math' && (now / 200 | 0) !== lastMath){ lastMath = now / 200 | 0; mathEl.innerHTML = hl(genMath()); }
      phaseLoop(now);
    });
  })(0);

  function changed(){ syncControls(); renderPanels(); preview.refresh(); Collab.push(); }
  Object.values(nodes).forEach(wireNode);
  new ResizeObserver(() => { layout(); drawWires(); }).observe(graph);
  desktop.addEventListener && desktop.addEventListener('change', () => { layout(); buildWires(); });
  document.fonts && document.fonts.ready.then(() => { layout(); drawWires(); });
  syncControls(); renderStatus(); layout(); buildWires(); renderLineage(); renderSplit();

  /* ---------- Sourcemap bidirecional: nó ↔ linhas de TSL ---------- */
  function ownersOf(src){
    let sec = null;
    return src.split('\n').map(l => {
      if (/^\/\/ Density node/.test(l)) sec = 'density';
      else if (/^\/\/ Speed node/.test(l)) sec = 'speed';
      else if (/^\/\/ Time node/.test(l)) sec = 'time';
      else if (/^\/\/ Spectrum Color node/.test(l)) sec = 'color';
      else if (/^\/\/ Modifier nodes/.test(l)) sec = 'mods';
      else if (/^const radius|^const vortex|^\/\/ Compute Pass|^\/\/ Vortex node/.test(l)) sec = 'field';
      else if (/^\/\/ VFX Output node/.test(l)) sec = 'output';
      else if (/^\/\/ Camera path/.test(l)) sec = 'path';
      else if (/^import|^\/\/ SPDX|^const TAU/.test(l)) sec = null;
      if (/uTurbulence/.test(l)) return 'turb';
      if (/uTwist/.test(l)) return 'twist';
      if (/uPulse/.test(l)) return 'pulse';
      if (/uScale/.test(l)) return 'size';
      if (/\bSPEED\b/.test(l) && sec === 'output') return 'speed';
      if (/FROZEN|uPhase\.value|uClock\.value/.test(l) && sec === 'output') return 'time';
      if (l.trim() === '' || sec === 'mods' || sec === 'path') return null;
      return sec;
    });
  }
  const peekEl = document.getElementById('peek'), peekName = document.getElementById('peekName');
  let peekId = 'field';
  function renderPeek(id){
    peekId = id || 'field';
    const src = genTS(), owners = ownersOf(src), lines = src.split('\n');
    let html = '', prev = -2;
    owners.forEach((o, i) => {
      if (o !== peekId) return;
      if (prev >= 0 && i !== prev + 1) html += '<span class="l" data-ln="⋮"> </span>';
      html += `<span class="l" data-ln="${i + 1}">${hl(lines[i]) || ' '}</span>`; prev = i;
    });
    peekEl.innerHTML = html || `<span class="l" data-ln="—">${esc('// ' + NAMES[peekId] + ': no TSL emitted')}</span>`;
    peekName.textContent = (NAMES[peekId] || '').toUpperCase();
  }
  const smapNode = document.getElementById('smapNode');
  tslEl.addEventListener('mouseover', e => {
    const l = e.target.closest('.l'); const n = l && l.dataset.n;
    tslEl.querySelectorAll('.l.is-hl').forEach(x => x.classList.remove('is-hl'));
    if (!n){ smapNode.textContent = ''; return; }
    tslEl.querySelectorAll(`.l[data-n="${n}"]`).forEach(x => x.classList.add('is-hl'));
    smapNode.textContent = `↔ ${NAMES[n].toUpperCase()}`;
  });
  tslEl.addEventListener('click', e => {
    const l = e.target.closest('.l'); const n = l && l.dataset.n;
    if (!n || !nodes[n]) return;
    selectTab(document.getElementById('tab-visual'));
    selectNode(n);
    const node = nodes[n]; node.classList.remove('is-flash'); requestAnimationFrame(() => node.classList.add('is-flash'));
    node.querySelector('.node-head').focus({ preventScroll:true });
    node.scrollIntoView({ block:'nearest', behavior: reduceMotion.matches ? 'auto' : 'smooth' });
  });

  /* ---------- Path Editor ("Trajeto"): trajetória da câmera em Catmull-Rom ---------- */
  const pathBtn = document.getElementById('pathBtn'), pathmap = document.getElementById('pathmap'), pathSvg = document.getElementById('pathSvg');
  const cr = (p0, p1, p2, p3, t) => { const t2 = t * t, t3 = t2 * t; return .5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3); };
  function pathPoint(t){
    const P = state.path.pts, n = P.length, s = (((t % 1) + 1) % 1) * n, i = Math.floor(s), u = s - i, g = k => P[((k % n) + n) % n];
    return [0, 1].map(c => cr(g(i - 1)[c], g(i)[c], g(i + 1)[c], g(i + 2)[c], u));
  }
  // mapa de cima: x → X, y → Z (±2.6), altura fixa 1.1, sempre olhando para o vórtice
  function toWorld([x, y]){ return { x:(x - .5) * 5.2, y:1.1, z:(y - .5) * 5.2 }; }
  function camAt(t){ return toWorld(pathPoint(t)); }
  const SVGNS = 'http://www.w3.org/2000/svg';
  const mk = (tag, attrs) => { const el = document.createElementNS(SVGNS, tag); Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v)); pathSvg.appendChild(el); return el; };
  mk('circle', { cx:50, cy:50, r:19, fill:'rgba(168,85,247,.16)', stroke:'rgba(168,85,247,.55)', 'stroke-width':1 });
  const curve = mk('polyline', { fill:'none', stroke:'#FF9F1C', 'stroke-width':1.3, 'stroke-dasharray':'3 2' });
  const handles = state.path.pts.map((_, i) => { const h = mk('circle', { class:'ph', r:5.5, tabindex:0, 'data-i':i, 'aria-label':`Path point ${i + 1}` }); return h; });
  const camDot = mk('circle', { r:3.6, fill:'#06B6D4' });
  function drawCamDot(){ const [x, y] = pathPoint(pathT); camDot.setAttribute('cx', x * 100); camDot.setAttribute('cy', y * 100); }
  function drawPath(){
    const pts = []; for (let k = 0; k <= 64; k++){ const [x, y] = pathPoint(k / 64); pts.push(`${(x * 100).toFixed(1)},${(y * 100).toFixed(1)}`); }
    curve.setAttribute('points', pts.join(' '));
    state.path.pts.forEach(([x, y], i) => { handles[i].setAttribute('cx', x * 100); handles[i].setAttribute('cy', y * 100); });
    drawCamDot();
  }
  let dragI = -1;
  const setPt = (i, x, y) => { state.path.pts[i] = [Math.max(.04, Math.min(.96, x)), Math.max(.04, Math.min(.96, y))]; drawPath(); preview.refresh(); };
  handles.forEach((h, i) => {
    h.addEventListener('pointerdown', e => { e.preventDefault(); dragI = i; try { pathSvg.setPointerCapture(e.pointerId); } catch(err){} });
    h.addEventListener('keydown', e => {
      const d = e.shiftKey ? .06 : .02, k = { ArrowLeft:[-d,0], ArrowRight:[d,0], ArrowUp:[0,-d], ArrowDown:[0,d] }[e.key];
      if (!k) return; e.preventDefault(); const [x, y] = state.path.pts[i]; setPt(i, x + k[0], y + k[1]); renderPanels(); Collab.push();
    });
  });
  pathSvg.addEventListener('pointermove', e => {
    if (dragI < 0) return;
    const r = pathSvg.getBoundingClientRect(); setPt(dragI, (e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height);
  });
  const endDrag = () => { if (dragI >= 0){ dragI = -1; renderPanels(); Collab.push(); } };
  pathSvg.addEventListener('pointerup', endDrag); pathSvg.addEventListener('pointercancel', endDrag);
  function syncPathUI(){ pathmap.hidden = !state.path.on; pathBtn.setAttribute('aria-pressed', String(state.path.on)); drawPath(); }
  pathBtn.addEventListener('click', () => {
    state.path.on = !state.path.on; syncPathUI(); changed(); Sound.wave(state.path.on ? 1 : 0);
    toast(state.path.on ? UI[lang].pathOn : UI[lang].pathOff);
  });
  syncPathUI();
  renderPeek('field');

  /* ---------- Multiplayer: CRDT Yjs entre abas (BroadcastChannel) + presença ---------- */
  Collab = (() => {
    const coBtn = document.getElementById('coBtn');
    if (!('BroadcastChannel' in window)){ coBtn.hidden = true; return { push(){} }; }
    const ch = new BroadcastChannel('expctral-orbit-v1');
    const COLORS = Object.values(PALETTE);
    const me = { id: Math.random().toString(16).slice(2, 10) };
    me.name = 'ORBIT-' + me.id.slice(0, 4).toUpperCase();
    me.color = COLORS[parseInt(me.id.slice(0, 2), 16) % COLORS.length];
    let Y = null, doc = null, ready = false, applying = false, pushRaf = 0, cursor = { x:null, y:null };
    const peers = new Map(), peerEls = new Map();
    const presence = document.getElementById('presence');

    function push(){
      if (!doc || !ready || applying) return;
      cancelAnimationFrame(pushRaf);
      pushRaf = requestAnimationFrame(() => doc.transact(() => {
        const g = doc.getMap('graph');
        ['speed','density','colorA','colorB','mix','workspace'].forEach(k => { if (g.get(k) !== state[k]) g.set(k, state[k]); });
        const path = JSON.stringify(state.path); if (g.get('path') !== path) g.set('path', path);
        const m = doc.getMap('mods');
        [...m.keys()].forEach(k => { if (!state.mods[k]) m.delete(k); });
        Object.entries(state.mods).forEach(([k, v]) => { if (m.get(k) !== v.value) m.set(k, v.value); });
        const b = doc.getMap('bypass');
        Object.keys(NAMES).forEach(k => { const v = !!state.bypass[k]; if (!!b.get(k) !== v) b.set(k, v); });
        if (desktop.matches){
          const pos = doc.getMap('positions');
          Object.entries(nodes).forEach(([k, n]) => {
            if (!n.dataset.moved) return;
            const v = [+(n.offsetLeft / graph.clientWidth).toFixed(4), +(n.offsetTop / graph.clientHeight).toFixed(4)], o = pos.get(k);
            if (!o || o[0] !== v[0] || o[1] !== v[1]) pos.set(k, v);
          });
        }
        const lin = doc.getArray('lineage');
        if (JSON.stringify(lin.toArray()) !== JSON.stringify(state.lineage)){ lin.delete(0, lin.length); lin.insert(0, state.lineage.map(l => ({ ...l }))); }
      }, 'local'));
    }
    function pull(){
      applying = true;
      try {
        const g = doc.getMap('graph');
        ['speed','density','mix'].forEach(k => { const v = g.get(k); if (typeof v === 'number') state[k] = num(v, 0, 1.5, state[k]); });
        ['colorA','colorB'].forEach(k => { const v = g.get(k); if (PALETTE[v]) state[k] = v; });
        if (typeof g.get('workspace') === 'string') state.workspace = g.get('workspace').slice(0, 48);
        try {
          const pth = JSON.parse(g.get('path') || 'null');
          if (pth && Array.isArray(pth.pts) && pth.pts.length === 4) state.path = { on: !!pth.on, pts: pth.pts.map(pt => [num(pt[0], 0, 1, .5), num(pt[1], 0, 1, .5)]) };
        } catch(e){}
        const m = doc.getMap('mods');
        Object.keys(state.mods).forEach(k => { if (!m.has(k)) removeMod(k, true); });
        m.forEach((v, k) => {
          const T = MOD_TYPES[k]; if (!T) return;
          const val = num(v, T.min, T.max, T.def);
          if (state.mods[k]) state.mods[k].value = val; else addMod(k, null, { silent:true, value:val });
        });
        const b = doc.getMap('bypass');
        Object.keys(nodes).forEach(k => { const v = !!b.get(k) && k !== 'field' && k !== 'output'; state.bypass[k] = v; nodes[k].classList.toggle('is-muted', v); });
        if (desktop.matches){
          doc.getMap('positions').forEach((v, k) => { const n = nodes[k]; if (n && Array.isArray(v)){ n.dataset.moved = '1'; clampNode(n, v[0] * graph.clientWidth, v[1] * graph.clientHeight); } });
        }
        const lin = doc.getArray('lineage').toArray();
        if (lin.length){
          state.lineage = lin.slice(0, 20).map(l => ({ id:String(l.id || '?').slice(0, 48), author:String(l.author || '?').slice(0, 48), kind:['root','you','ref'].includes(l.kind) ? l.kind : 'ref' }));
          state.refractions = state.lineage.filter(l => l.kind !== 'root').length;
        }
        syncPathUI(); renderLineage(); styleWires(); changed(); drawWires();
      } finally { applying = false; }
    }

    /* presença (awareness) */
    const safeColor = c => COLORS.includes(c) ? c : PALETTE.cyan;
    function beat(){ ch.postMessage({ t:'aw', id:me.id, name:me.name, color:me.color, x:cursor.x, y:cursor.y }); }
    function renderPeers(){
      const list = [{ id:me.id, name:me.name, color:me.color, me:true }, ...peers.values()];
      presence.hidden = peers.size === 0;
      presence.innerHTML = `<span>${UI[lang].orbitLive(list.length)}</span>` +
        list.map(p => `<span class="av" style="--c:${safeColor(p.color)}" title="${esc(p.name)}${p.me ? ' (you)' : ''}">${esc(String(p.name).slice(6, 8))}</span>`).join('');
      peers.forEach((p, k) => {
        let el = peerEls.get(k);
        if (!el){ el = document.createElement('div'); el.className = 'peer'; el.setAttribute('aria-hidden', 'true'); el.innerHTML = '<svg><use href="#i-cursor"/></svg><span></span>'; graph.appendChild(el); peerEls.set(k, el); }
        el.style.setProperty('--c', safeColor(p.color)); el.querySelector('span').textContent = String(p.name).slice(0, 16);
        const show = desktop.matches && typeof p.x === 'number' && typeof p.y === 'number' && activePanel === 'wave-visual';
        el.hidden = !show;
        if (show){ el.style.left = (p.x * graph.clientWidth) + 'px'; el.style.top = (p.y * graph.clientHeight) + 'px'; }
      });
      peerEls.forEach((el, k) => { if (!peers.has(k)){ el.remove(); peerEls.delete(k); } });
    }
    ch.onmessage = ({ data:m }) => {
      if (!m || typeof m !== 'object') return;
      if (m.t === 'aw' && typeof m.id === 'string'){ peers.set(m.id, { id:m.id, name:String(m.name || 'ORBIT'), color:m.color, x:m.x, y:m.y, seen:Date.now() }); renderPeers(); return; }
      if (m.t === 'bye'){ peers.delete(m.id); renderPeers(); return; }
      if (!doc) return;
      if (m.t === 'hello'){ if (ready) ch.postMessage({ t:'state', u:Y.encodeStateAsUpdate(doc) }); beat(); }
      else if ((m.t === 'state' || m.t === 'u') && m.u instanceof Uint8Array){ ready = true; Y.applyUpdate(doc, m.u, 'remote'); }
    };
    let lastBeat = 0;
    graph.addEventListener('pointermove', () => {
      if (!hover) return;
      cursor = { x:+(hover.x / graph.clientWidth).toFixed(4), y:+(hover.y / graph.clientHeight).toFixed(4) };
      const now = performance.now(); if (now - lastBeat > 50){ lastBeat = now; beat(); }
    });
    graph.addEventListener('pointerleave', () => { cursor = { x:null, y:null }; beat(); });
    setInterval(() => {
      beat();
      const now = Date.now(); let gone = false;
      peers.forEach((p, k) => { if (now - p.seen > 3500){ peers.delete(k); gone = true; } });
      if (gone) renderPeers();
    }, 1000);
    addEventListener('pagehide', () => ch.postMessage({ t:'bye', id:me.id }));
    langListeners.push(renderPeers);
    coBtn.addEventListener('click', () => {
      window.open(location.href.split('#')[0] + '#prism', '_blank');
      toast(UI[lang].coHint);
    });

    let started = false;
    new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || started) return; started = true;
      whenIdle(async () => {
        try {
          Y = await import('https://cdn.jsdelivr.net/npm/yjs@13.6.33/+esm');
          doc = new Y.Doc();
          doc.on('update', (u, origin) => { if (origin === 'remote') pull(); else ch.postMessage({ t:'u', u }); });
          ch.postMessage({ t:'hello', id:me.id }); beat();
          setTimeout(() => { if (!ready){ ready = true; push(); } }, 450);
        } catch (err){ console.warn('[Orbit] Yjs unavailable, multiplayer disabled:', err); coBtn.hidden = true; }
      });
    }, { rootMargin:'400px' }).observe(root);
    return { push };
  })();

  /* ---------- API para a Dra. Ada ---------- */
  function issues(){
    const W = ADA[lang].w, out = [], p = eff(), c = countFromDensity(p.density);
    const muted = Object.keys(state.bypass).filter(k => state.bypass[k]);
    if (muted.length) out.push({ fix:'muted', msg: W.muted(muted.map(k => NAMES[k]).join(', ')) });
    if (state.iso) out.push({ fix:'iso', msg: W.iso(NAMES[state.iso]) });
    if (!state.bypass.color && state.colorA === state.colorB) out.push({ fix:'flat', msg: W.flat });
    if (backend !== 'webgpu' && backend !== 'pending' && c > 9000) out.push({ fix:'heavy', msg: W.heavy(c.toLocaleString(lang === 'pt' ? 'pt-BR' : lang === 'zh' ? 'zh-CN' : 'en-US')) });
    else if (fpsNow && fpsNow < 40) out.push({ fix:'slow', msg: W.slow(fpsNow) });
    return out;
  }
  function diagnose(){
    const L = ADA[lang], p = eff(), c = countFromDensity(p.density);
    const d = { frozen:p.frozen, speed:p.speed.toFixed(2), count:c.toLocaleString(lang === 'pt' ? 'pt-BR' : lang === 'zh' ? 'zh-CN' : 'en-US'), wg:Math.ceil(c / 64), a:p.colorA, b:p.colorB, mix:p.mix.toFixed(2), backend:BACKEND_SHORT[backend], fps:fpsNow };
    const mods = Object.entries(state.mods).map(([t, m]) => `${MOD_TYPES[t].name} ${m.value.toFixed(2)}${state.bypass[t] ? ' (muted)' : ''}`);
    const w = issues();
    return `<p>${L.pipe(d)}</p><p>${mods.length ? L.mods(mods.join(', ')) : L.noMods}</p>` +
      (w.length ? `<p><b>${L.warn}</b></p><ul>${w.map(x => `<li class="warn">${x.msg}</li>`).join('')}</ul>` : `<p>${L.ok}</p>`);
  }
  function autofix(){
    let n = 0;
    for (const i of issues()){
      if (i.fix === 'muted'){ Object.keys(state.bypass).forEach(k => { if (state.bypass[k]){ state.bypass[k] = false; if (nodes[k]) nodes[k].classList.remove('is-muted'); n++; } }); }
      if (i.fix === 'iso'){ toggleIso(state.iso); n++; }
      if (i.fix === 'flat'){ const keys = Object.keys(PALETTE); state.colorB = keys[(keys.indexOf(state.colorA) + 2) % keys.length]; n++; }
      if (i.fix === 'heavy' || i.fix === 'slow'){ state.density = Math.min(state.density, .3); if (state.mods.size) state.mods.size.value = Math.min(state.mods.size.value, 1); n++; }
    }
    styleWires(); changed(); ['speed','density','color'].forEach(pulseFrom);
    return n;
  }
  return { diagnose, autofix };
})();

/* ================= DRA. ADA (prévia: diagnóstico por regras, no navegador) ================= */
(() => {
  const panel = document.getElementById('adaPanel'), toggle = document.getElementById('adaToggle'), log = document.getElementById('adaLog');
  let greeted = false;
  function say(html, you){ const d = document.createElement('div'); d.className = 'ada-msg' + (you ? ' ada-msg--you' : ''); d.innerHTML = html; log.appendChild(d); log.scrollTop = log.scrollHeight; }
  function setOpen(open){
    panel.hidden = !open; toggle.setAttribute('aria-expanded', String(open));
    if (open && !greeted){ greeted = true; say(ADA[lang].hello); }
    if (open) Sound.wave(3);
  }
  toggle.addEventListener('click', () => setOpen(panel.hidden));
  panel.addEventListener('keydown', e => { if (e.key === 'Escape'){ setOpen(false); toggle.focus(); } });
  document.getElementById('adaDiag').addEventListener('click', () => { say(esc(ADA[lang].askDiag), true); say(Prism.diagnose()); });
  document.getElementById('adaFix').addEventListener('click', () => { say(esc(ADA[lang].askFix), true); const n = Prism.autofix(); say(`<p>${ADA[lang].fixed(n)}</p>` + Prism.diagnose()); });
})();

/* ================= ATUALIZAÇÕES (lê atualizacoes/data.json) ================= */
(() => {
  const grid = document.getElementById('updGrid'); if (!grid) return;
  let D = null;
  const Lx = o => (o && (o[lang] || o.en)) || '';
  const W = { en:{ now:'NOW', next:'NEXT', phase:'PHASE', open:'OPEN FACE ↗' }, pt:{ now:'AGORA', next:'PRÓXIMA', phase:'FASE', open:'ABRIR FACE ↗' }, zh:{ now:'当前', next:'下一版', phase:'阶段', open:'查看模块 ↗' } };
  const NAME = { orbit:{ en:'Multiplayer / Orbit', pt:'Multiplayer / Órbita', zh:'多人协作 / 轨道' }, eject:{ en:'Code Ejection', pt:'Ejeção de Código', zh:'代码导出' }, governance:{ en:'Governance', pt:'Governança', zh:'治理' } };
  const name = f => NAME[f.id] ? Lx(NAME[f.id]) : f.name;
  const chip = s => `<span class="st" data-s="${s}" style="--sc:${D.statuses[s].color}">${esc(Lx(D.statuses[s]))}</span>`;
  const loc = () => lang === 'pt' ? 'pt-BR' : lang === 'zh' ? 'zh-CN' : 'en-US';
  const fmt = iso => new Intl.DateTimeFormat(loc(), { day:'2-digit', month:'long', year:'numeric', timeZone:'UTC' }).format(new Date(iso + 'T12:00:00Z'));
  function render(){
    if (!D) return;
    const w = W[lang] || W.en;
    document.getElementById('updDate').textContent = fmt(D.updated);
    const note = document.getElementById('updNote'); note.hidden = !D.note; if (D.note) note.textContent = Lx(D.note);
    grid.innerHTML = D.faces.map(f => `
      <a class="upd glass reticle hoverable" href="atualizacoes/#face-${f.id}" style="--c:${f.color}">
        <p class="eyebrow"><b>${esc(f.tag)}</b></p>
        <h3 class="h">${esc(name(f))} ${chip(f.status)}</h3>
        <p class="ver">${w.now} <b>${esc(Lx(f.now.version))}</b><br>→ ${w.next} <b>${esc(Lx(f.next.version))}</b> <span>· ${w.phase} ${f.next.phase}</span></p>
        <ul>${f.now.items.slice(0, 2).map(i => `<li>${esc(Lx(i.t))}</li>`).join('')}</ul>
        <span class="go">${w.open}</span>
      </a>`).join('');
    const last = D.changelog[0];
    document.getElementById('updLatestDate').textContent = fmt(last.date) + ' · ' + last.version;
    document.getElementById('updLatestTitle').textContent = Lx(last.title);
    // chips de status nos cards das 4 superfícies
    document.querySelectorAll('.cell[data-face]').forEach(cell => {
      const f = D.faces.find(x => x.id === cell.dataset.face); const eb = cell.querySelector('.eyebrow'); if (!f || !eb) return;
      let c = eb.querySelector('.st'); if (c) c.remove();
      eb.insertAdjacentHTML('beforeend', chip(f.status));
    });
  }
  fetch('atualizacoes/data.json', { cache:'no-cache' }).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(d => { D = d; render(); }).catch(err => console.warn('[Updates] data.json', err));
  langListeners.push(render);
})();

/* ================= IDIOMA INICIAL ================= */
// Rótulos técnicos que ficam em inglês nos três idiomas (EJECT TYPESCRIPT, VISUAL WAVE…): lang="en" faz o leitor de tela
// ler com a pronúncia certa quando a página está em português ou chinês (WCAG 3.1.2).
document.querySelectorAll('.eyebrow, .tac, .tool, .chip, .pill, .stage-label, .btn--tac, .fchip, .readout, .lbl').forEach(el => {
  if (!el.hasAttribute('data-i18n') && !el.querySelector('[data-i18n]') && !el.closest('[data-i18n]')) el.lang = 'en';
});
snapshotEn();
const q = new URLSearchParams(location.search).get('lang');
const navLang = (navigator.language || 'en').toLowerCase();
setLang(META[q] ? q : (store.get('expctral-lang') || (navLang.startsWith('pt') ? 'pt' : navLang.startsWith('zh') ? 'zh' : 'en')), false);
})();
