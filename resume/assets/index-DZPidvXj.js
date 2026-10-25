(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function e(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(i){if(i.ep)return;i.ep=!0;const n=e(i);fetch(i.href,n)}})();const o={links:{github:"https://github.com/sarvesh1karandikar",linkedin:"https://www.linkedin.com/in/sarveshkarandikar/",email:"sarvesh1karandikar@gmail.com",resume:"/resume/sarvesh-karandikar.pdf"},experience:[{id:"ai-canvas",className:"ai",role:"Senior Software Engineer — AI Canvas",period:"Oct 2025 — present",company:"Cisco Systems",productLink:{text:"AI Canvas",href:"https://blogs.cisco.com/ai/ai-canvas-controlled-availability"},evidence:[{key:"SHIPPED",text:"Multimodal deep agents — vision, docs, network captures"},{key:"PLATFORM",text:"Self-serve partner SDK + MCP server registration"},{key:"PIPELINE",text:"gRPC → S3 streaming file pipeline, SSRF-guarded"}],bullets:["Built multimodal Canvas Deep Agent — reasons over images, documents, and network captures across fast and plan-execute modes.","Designed a secure file pipeline: gRPC → presigned S3 streaming (SSRF-guarded), Redis manifest store, MCP file-reader tooling.","Own the Knowledge-Base SDK and skill/MCP-server registration powering self-serve partner onboarding."],chips:["Claude Agent SDK","MCP","Python","gRPC","Redis","AWS"]},{id:"nexus-dashboard",className:"infra",role:"Software Engineer — Nexus Dashboard",period:"Nov 2023 — Sep 2025",company:"Cisco Systems",productLink:{text:"Nexus Dashboard",href:"https://www.cisco.com/c/en/us/products/data-center-analytics/nexus-dashboard/index.html"},evidence:[{key:"BUILT",text:"K8s PKI certificate management system"},{key:"SHIPPED",text:"Java leader-election framework (SPI-based)"},{key:"INTEGRATED",text:"External CA onboarding for XE/XR devices"}],bullets:["Designed a Certificate Management System for automated CA creation and secure signing across Kubernetes communications.","Enhanced external-CA integration to onboard Cisco XE/XR devices; built an agent-based Postgres/TSDB management interface.","Implemented an SPI-based Java leader-election framework for active-standby configurations."],chips:["Java","Go","Kubernetes","Postgres","PKI"]},{id:"cloud-network-controller",className:"infra",role:"Software Engineer — Cloud Network Controller",period:"Jul 2020 — Oct 2023",company:"Cisco Systems",productLink:{text:"Cloud Network Controller",href:"https://www.cisco.com/c/en/us/solutions/data-center-virtualization/application-centric-infrastructure/cloud-network-controller.html"},evidence:[{key:"MULTI-CLOUD",text:"GCP integration + AWS + Azure ACI"},{key:"SECURITY",text:"L4–L7 config-drift detection engine"},{key:"IaC",text:"Terraform resource collection → graph DB"}],bullets:["Integrated GCP into the ACI model-based cloud-networking solution for multi-cloud compatibility and scale.","Built config-drift security detection across L4–L7 service chains and a Terraform collection service feeding a unified graph database.","Created a firewall-configuration analysis service using Binary Decision Diagrams to assess connectivity and traffic flows."],chips:["Python","Terraform","GCP","AWS","Azure","Dgraph"]},{id:"wordpress",className:"web",role:"WordPress Developer",period:"2019 — 2020",company:"USC Supply Chain",evidence:[{key:"BUILT",text:"Custom themes, plugins, and client sites"},{key:"STACK",text:"PHP · JavaScript · MySQL · REST APIs"}],bullets:["Developed and maintained WordPress sites with custom themes and plugins for university supply-chain projects.","Built REST API integrations connecting WordPress to backend inventory and logistics systems.","Managed hosting, deployments, and performance optimization across multiple client sites."],chips:["WordPress","PHP","JavaScript","MySQL","REST APIs"]},{id:"circlelink",className:"infra",role:"ML Engineer Intern",period:"2019 — 2020",company:"Circle Link (fintech)",evidence:[{key:"ML",text:"NER + OCR/MICR fine-tuning for loan documents"}],bullets:["Built NER models classifying entities in loan documents with Elasticsearch indexing; fine-tuned OCR/MICR check recognition."],chips:["Python","NLP","Elasticsearch","OCR"]}],projects:[{id:"alpaca",icon:"▣",githubUrl:"https://github.com/sarvesh1karandikar/alpacabot-dashboard",title:"AlpacaBot",description:"Weekly-options trading agent with Alpaca execution, Telegram control, and a terminal dashboard — running on AWS.",live:!0,chips:["Python","AWS","LLM","Telegram"],caseStudy:{problem:"I wanted an automated weekly-options strategy I could monitor and control from my phone — without babysitting a terminal.",approach:"Built a trading agent that executes via the Alpaca API on a schedule, with an LLM layer for decision support, a Telegram bot for control, and a terminal-style dashboard for live monitoring — all running on AWS.",outcome:"Runs autonomously on EC2; controlled entirely over Telegram with positions and PnL visible on the dashboard in real time."}},{id:"chroma",icon:"⬡",githubUrl:"https://github.com/sarvesh1karandikar/chromadb",title:"chromadb RAG",description:"FastAPI ingest + semantic retrieval with centroid-based collection routing.",chips:["FastAPI","RAG","ChromaDB","PyTorch"],caseStudy:{problem:"RAG systems get slow and noisy as document collections grow and topics drift apart.",approach:"A FastAPI ingest + retrieval backend that chunks and embeds documents, then routes queries using centroid-based collection clustering so each query only searches the most relevant cluster.",outcome:"Cleaner retrieval and faster queries at scale; model-agnostic so it plugs into any LLM endpoint."}},{id:"drive",icon:"◈",githubUrl:"https://github.com/sarvesh1karandikar/DriveSuite",title:"DriveSuite",description:"WhatsApp → Jellyfin/Sonarr media bridge — local Llama for intent parsing, Claude for complex reasoning.",live:!0,chips:["Node.js","Docker","Ollama","Claude"],caseStudy:{problem:"I wanted to manage my home media server (Jellyfin/Sonarr/Radarr) by just texting it on WhatsApp.",approach:"A Node bridge connecting the WhatsApp Cloud API to the media stack, with smart model routing — local Llama 3.1 for cheap intent parsing, Claude for the calls that need real reasoning — all Docker-orchestrated.",outcome:'"Add Breaking Bad" over WhatsApp queues the download and reports status. Cost-efficient by keeping routine parsing local.'}}],academic:[{name:"DCGAN Image Synthesis",description:"Generative adversarial net, CIFAR-10",tech:"TensorFlow"},{name:"FAQ Chatbot (LLaMA 2-7B)",description:"Local RAG over PDFs",tech:"Python · LLaMA"},{name:"CIFAR-10 Classifier",description:"CNN, ~75% test accuracy",tech:"TensorFlow"},{name:"LSTM Text Generator",description:"From-scratch NumPy RNN/LSTM",tech:"NumPy"},{name:"Satellite Road Detection",description:"Classical CV road extraction",tech:"MATLAB"},{name:"Offspring Face GAN",description:"Conditional face generation",tech:"TensorFlow"}],education:[{school:"University of Southern California",degree:"MS, Computer Science",year:"2020"},{school:"SRM Institute of Science and Technology",degree:"BTech, Computer Science & Engineering",year:"2019"}],skills:[{world:"⬡ Backend & Infrastructure",sub:"The foundation — 5 years deep",className:"infra",groups:[{heading:"Languages",items:["Go","Java","C++","GraphQL"]},{heading:"Orchestration",items:["Docker","Kubernetes","OCI","Stacker"]},{heading:"Cloud · Data",items:["AWS","Azure","GCP","Terraform","Dgraph","Postgres"]}]},{world:"✦ AI & Machine Learning",sub:"Where it's all heading",className:"ai",groups:[{heading:"Agents · LLM",items:["Claude Agent SDK","MCP","RAG","Bedrock"]},{heading:"Frameworks",items:["TensorFlow","PyTorch","NumPy","Pandas","NLTK"]},{heading:"Shared bridge",items:["Python","gRPC","Redis"]}]}]};function a(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function l(s){return s.map(t=>`<span class="chip">${a(t)}</span>`).join("")}function p(s){return`
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header nav wrap">
    <a class="wordmark" href="https://sarveshk.dev">Sarvesh Karandikar<span aria-hidden="true">.</span></a>
    <nav class="links" aria-label="Résumé navigation">
      <a href="#edu">Education</a>
      <a href="#exp">Experience</a>
      <a href="#proj">Projects</a>
      <a href="#acad">Academic</a>
      <a href="#skills">Skills</a>
      <a href="${a(s.resume)}" class="resume-link" download>PDF résumé <span aria-hidden="true">↓</span></a>
    </nav>
  </header>`}function h(s){return`
  <header class="hero wrap" id="top">
    <div class="hero-copy">
      <p class="eyebrow">Curriculum vitae / Cisco Systems</p>
      <h1 class="big">Infrastructure roots.<br><em>Agentic AI</em> in practice.</h1>
      <p class="lead">Senior Software Engineer at Cisco. My work spans infrastructure, multimodal agents, developer platforms, and the tooling behind AI applications.</p>
      <div class="row">
        <a href="#exp" class="b1">Explore my experience <span aria-hidden="true">↓</span></a>
        <a href="${a(s.resume)}" class="b2" download>Download résumé <span aria-hidden="true">↓</span></a>
      </div>
    </div>
    <aside class="career-note" aria-label="Career progression">
      <p class="eyebrow">The throughline</p>
      <div class="step"><p class="yr">2019 — 2023</p><p class="nm">Backend &amp; infrastructure</p></div>
      <div class="step"><p class="yr">2023 — 2025</p><p class="nm">Platform &amp; security</p></div>
      <div class="step"><p class="yr">2025 — now</p><p class="nm">Agentic AI</p></div>
      <a href="https://sarveshk.dev" class="portfolio-link">Selected engineering work <span aria-hidden="true">↗</span></a>
    </aside>
  </header>`}function u(s){return`
  <section class="exp" id="exp">
    <div class="wrap reveal">
      <div class="label">02 — Experience</div>
      <h2>The throughline</h2>
      <p class="section-lead">Each role built on the last: infrastructure, platform engineering, then AI. Selected contributions within the teams I worked with.</p>
      <div class="timeline">${s.map(e=>`
    <div class="job ${e.className}">
      <div class="jobcard">
        <div class="head">
          <h3 class="role">${a(e.role)}</h3>
          <span class="when">${a(e.period)}</span>
        </div>
        <div class="co">
          ${a(e.company)}
          ${e.productLink?`<a href="${a(e.productLink.href)}" class="plink" target="_blank" rel="noopener">${a(e.productLink.text)} ↗</a>`:""}
        </div>
        <div class="evidence">
          ${e.evidence.map(r=>`<span class="ev"><span class="k">${a(r.key)}</span> ${a(r.text)}</span>`).join("")}
        </div>
        <ul>
          ${e.bullets.map(r=>`<li>${a(r)}</li>`).join("")}
        </ul>
        <div class="chips">${l(e.chips)}</div>
      </div>
    </div>`).join("")}</div>
    </div>
  </section>`}function m(s){return`
  <section class="proj" id="proj">
    <div class="wrap reveal">
      <div class="label">03 — Projects</div>
      <h2>Full-stack proof — built &amp; shipped solo</h2>
      <p class="section-lead">Things I designed and shipped myself, AI work first.</p>
      <div class="projlist">${s.map(e=>`
    <div class="projcard">
      <div class="projcard-header">
        <div class="projcard-title">
          <span class="projcard-icon">${a(e.icon)}</span>
          <h3>${a(e.title)}</h3>
          ${e.live?'<span class="projcard-live"><span class="projcard-live-dot"></span>Live</span>':""}
        </div>
        <a href="${a(e.githubUrl)}" class="projcard-gh" target="_blank" rel="noopener">View on GitHub ↗</a>
      </div>

      <p class="projcard-desc">${a(e.description)}</p>

      <div class="projcard-body">
        <div class="projcard-section">
          <div class="projcard-section-label">Problem</div>
          <p>${a(e.caseStudy.problem)}</p>
        </div>
        <div class="projcard-section">
          <div class="projcard-section-label">Approach</div>
          <p>${a(e.caseStudy.approach)}</p>
        </div>
        <div class="projcard-section">
          <div class="projcard-section-label">Outcome</div>
          <p>${a(e.caseStudy.outcome)}</p>
        </div>
      </div>

      <div class="projcard-tags">
        ${l(e.chips)}
      </div>
    </div>`).join("")}</div>
    </div>
  </section>`}function v(s,t){return`
  <section class="acad" id="acad">
    <div class="wrap reveal">
      <div class="label">04 — Academic &amp; ML</div>
      <h2>Where the AI foundation started</h2>
      <p class="section-lead">USC &amp; SRM coursework and research — the ML groundwork that made the pivot natural.</p>
      <div class="mini">${s.map(r=>`
    <div class="minicard">
      <h3 class="n">${a(r.name)}</h3>
      <div class="d">${a(r.description)}</div>
      <div class="t">${a(r.tech)}</div>
    </div>`).join("")}</div>
      <a class="ghlink" href="${a(t)}" target="_blank" rel="noopener">All repos on GitHub ↗</a>
    </div>
  </section>`}function g(s){return`
  <section class="edu" id="edu">
    <div class="wrap reveal">
      <div class="label">01 — Education</div>
      <h2>The academic foundation</h2>
      <p class="section-lead">Degrees that grounded the engineering and ML work above.</p>
      <div class="edulist">${s.map(e=>`
    <div class="edurow">
      <h3 class="edusch">${a(e.school)}</h3>
      <div class="edudeg">${a(e.degree)}</div>
      <div class="eduyr">${a(e.year)}</div>
    </div>`).join("")}</div>
    </div>
  </section>`}function f(s){return`
  <section class="skills" id="skills">
    <div class="wrap reveal">
      <div class="label">05 — Toolkit</div>
      <h2>Fluent in both worlds</h2>
      <p class="section-lead">The whole point: a stack that spans infrastructure AND AI — that's what full-stack-AI means here.</p>
      <div class="skillmap">${s.map(e=>`
    <div class="skillcol ${e.className}">
      <h3 class="world">${a(e.world)}</h3>
      <div class="wsub">${a(e.sub)}</div>
      ${e.groups.map(r=>`
      <div class="grp">
        <div class="gh">${a(r.heading)}</div>
        <div class="items">${l(r.items)}</div>
      </div>`).join("")}
    </div>`).join("")}</div>
      <p class="bridge">Python · gRPC · AWS — the bridge that ties both worlds together.</p>
    </div>
  </section>`}function b(s){return`
  <section class="contact" id="contact">
    <div class="wrap reveal">
      <div class="label">Get in touch</div>
      <h2>Let’s talk systems.</h2>
      <div class="row">
        <a href="mailto:${a(s.email)}" class="b1">${a(s.email)}</a>
        <a href="${a(s.linkedin)}" class="b2" target="_blank" rel="noopener">LinkedIn</a>
        <a href="${a(s.github)}" class="b2" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
  </section>`}function k(){return'<footer class="site-footer wrap"><p>© 2026 Sarvesh Karandikar</p><p>Built with care. Kept simple.</p><a href="https://sarveshk.dev">Portfolio ↗</a><a href="#top">Back to top ↑</a></footer>'}const y=document.getElementById("app");y.innerHTML=p(o.links)+'<main id="main" tabindex="-1">'+h(o.links)+g(o.education)+u(o.experience)+m(o.projects)+v(o.academic,o.links.github)+f(o.skills)+b(o.links)+"</main>"+k();const d=[{id:"edu",link:'a[href="#edu"]'},{id:"exp",link:'a[href="#exp"]'},{id:"proj",link:'a[href="#proj"]'},{id:"acad",link:'a[href="#acad"]'},{id:"skills",link:'a[href="#skills"]'}],w=new IntersectionObserver(s=>{for(const t of s){const e=t.target,r=d.find(n=>e.id===n.id);if(!r)continue;const i=document.querySelector(`.nav .links ${r.link}`);i&&i.classList.toggle("active",t.isIntersecting)}},{threshold:.3,rootMargin:"-80px 0px 0px 0px"});d.forEach(s=>{const t=document.getElementById(s.id);t&&w.observe(t)});
