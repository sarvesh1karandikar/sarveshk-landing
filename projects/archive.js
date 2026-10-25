const owner = "sarvesh1karandikar";
const featured = new Set(["1DotDev", "ai-radar", "DriveSuite", "drivesuite-agent", "drivesuite-mcp", "drivesuite-infra", "drivesuite-docs"]);
const details = {
  "alpacabot-dashboard": { title: "AlpacaBot Dashboard", description: "A dashboard for a trading-agent project, exploring monitoring and control." },
  chromadb: { title: "ChromaDB RAG", description: "Experiments in document ingestion, semantic retrieval, and collection routing." },
  workout: { title: "Workout", description: "A lightweight personal workout tracking tool." },
  "sarveshk-dev": { title: "Personal Website", description: "The source for my résumé and portfolio." },
  "sarveshk-landing": { title: "sarveshk.dev", description: "A portfolio for my engineering work." },
  "cricket-excitement-nlp": { title: "Cricket Excitement NLP" },
  "offspring-face-gan": { title: "Offspring Face GAN" },
  "satellite-road-detection": { title: "Satellite Road Detection" },
  "lstm-text-generator": { title: "LSTM Text Generator" },
  "cifar-dcgan": { title: "CIFAR Image Generation" },
  "cifar-image-classifier": { title: "CIFAR Image Classification" },
};

const archive = document.querySelector("#archive");
const search = document.querySelector("#search");
const count = document.querySelector("#count");
const repoTotal = document.querySelector("#repo-total");
const empty = document.querySelector("#empty");
const status = document.querySelector("#data-status");
const refreshButton = document.querySelector("#refresh");
let repositories = [];
let activeFilter = "All";

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

function category(repository) {
  if (/^(sarveshk-dev|sarveshk-landing)$/.test(repository.name)) return "Websites";
  if (/cricket|offspring|satellite|lstm|cifar/.test(repository.name)) return "ML experiments";
  return "Tools & apps";
}

function render() {
  const query = search.value.trim().toLowerCase();
  const visible = repositories
    .filter((repository) => !featured.has(repository.name))
    .filter((repository) => activeFilter === "All" || category(repository) === activeFilter)
    .filter((repository) => [repository.name, repository.description, repository.language, ...(repository.topics || [])].join(" ").toLowerCase().includes(query))
    .sort((a, b) => a.name.localeCompare(b.name));

  archive.innerHTML = visible.map((repository) => {
    const title = details[repository.name]?.title || repository.name;
    const description = details[repository.name]?.description || repository.description || "Explore the source and latest work on GitHub.";
    const language = repository.language || "Documentation";
    const url = `https://github.com/${owner}/${encodeURIComponent(repository.name)}`;
    return `<article class="archive-row" data-category="${escapeHTML(category(repository))}"><span class="row-category">${escapeHTML(category(repository))}</span><div><h3><a target="_blank" rel="noopener noreferrer" href="${url}">${escapeHTML(title)} <span aria-hidden="true">↗</span></a></h3><p>${escapeHTML(description)}</p></div><div class="row-meta"><span class="status">Public repo</span><span>${escapeHTML(language)}</span></div></article>`;
  }).join("");

  count.textContent = `${visible.length} of ${repositories.filter((repository) => !featured.has(repository.name)).length} additional projects`;
  repoTotal.textContent = `${repositories.length} public repositories overall`;
  empty.hidden = visible.length !== 0;
}

document.querySelectorAll("[data-filter]").forEach((button) => button.addEventListener("click", () => {
  activeFilter = button.dataset.filter;
  document.querySelectorAll("[data-filter]").forEach((item) => {
    item.classList.toggle("selected", item === button);
    item.setAttribute("aria-pressed", String(item === button));
  });
  render();
}));
search.addEventListener("input", render);
document.querySelector("#reset").addEventListener("click", () => {
  search.value = "";
  document.querySelector('[data-filter="All"]').click();
  search.focus();
});

async function fetchPublicRepositories() {
  const all = [];
  for (let page = 1; page <= 10; page += 1) {
    const response = await fetch(`https://api.github.com/users/${owner}/repos?per_page=100&sort=updated&page=${page}`, { signal: AbortSignal.timeout(12000) });
    if (!response.ok) throw new Error("GitHub repository list unavailable");
    const pageItems = await response.json();
    if (!Array.isArray(pageItems)) throw new Error("Unexpected repository response");
    all.push(...pageItems);
    if (pageItems.length < 100) break;
  }
  return all;
}

async function refresh() {
  refreshButton.disabled = true;
  refreshButton.textContent = "Refreshing…";
  try {
    repositories = await fetchPublicRepositories();
    render();
    status.textContent = `Synced with public GitHub repositories on ${new Date().toLocaleDateString(undefined, { month: "short", day: "numeric" })}.`;
  } catch {
    status.textContent = repositories.length ? "Showing the saved collection. Live refresh is temporarily unavailable." : "Could not load projects. Try again or browse GitHub.";
  } finally {
    refreshButton.disabled = false;
    refreshButton.textContent = "Refresh ↻";
  }
}

refreshButton.addEventListener("click", refresh);
(async () => {
  try {
    const response = await fetch("./projects.json");
    if (response.ok) repositories = await response.json();
  } catch {}
  render();
  status.textContent = repositories.length ? `Showing the saved collection (${repositories.length} public repositories); checking GitHub…` : "Loading public repositories from GitHub…";
  await refresh();
})();
