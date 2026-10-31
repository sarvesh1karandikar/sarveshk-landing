export const owner = 'sarvesh1karandikar';
export const featured = new Set(['1DotDev', 'ai-radar', 'DriveSuite', 'drivesuite-agent', 'drivesuite-mcp', 'drivesuite-infra', 'drivesuite-docs']);
const curated = {
  chromadb: ['ChromaDB Retrieval', 'A document ingestion and retrieval prototype with centroid-based collection routing.', 'Tools & apps', 'Prototype'],
  workout: ['Workout', 'An offline-first workout tracker built with React and TypeScript.', 'Tools & apps', 'Implemented'],
  'alpacabot-dashboard': ['AlpacaBot Dashboard', 'A terminal-style dashboard for a trading-agent project, exploring monitoring and control.', 'Tools & apps', 'Implemented'],
  'cricket-excitement-nlp': ['Cricket Excitement NLP', 'A classifier exploring match excitement through commentary and match features.', 'ML experiments', 'Experiment'],
  'satellite-road-detection': ['Satellite Road Detection', 'A classical computer-vision pipeline for road extraction from satellite imagery.', 'ML experiments', 'Experiment'],
  'lstm-text-generator': ['RNN & LSTM Text Generation', 'NumPy implementations exploring recurrent networks, LSTMs, and text generation.', 'ML experiments', 'Experiment'],
  'cifar-image-classifier': ['CIFAR Image Classification', 'A CNN experiment classifying CIFAR-10 images into ten categories.', 'ML experiments', 'Experiment'],
  'cifar-dcgan': ['CIFAR Image Generation', 'An experiment generating CIFAR-10 images with a DCGAN.', 'ML experiments', 'Experiment'],
  'offspring-face-gan': ['Offspring Face Generator', 'An experimental exploration of face synthesis using family photo inputs.', 'ML experiments', 'Experiment'],
  'sarveshk-landing': ['sarveshk.dev', 'Source for this portfolio and its project collection.', 'Websites', 'Website source'],
  'sarveshk-dev': ['Résumé Website', 'Source for the online résumé and downloadable PDF.', 'Websites', 'Website source'],
};
const order = Object.keys(curated);
export function metadata(repo) {
  const [title, description, category, status] = curated[repo.name] || [repo.name, repo.description || 'Explore the source and latest work on GitHub.', 'Tools & apps', repo.archived ? 'Archived' : 'Public repo'];
  return { title, description, category, status, order: order.includes(repo.name) ? order.indexOf(repo.name) : 99 };
}
export function normalize(items) {
  if (!Array.isArray(items) || items.some(item => !item || typeof item.name !== 'string' || !/^[\w.-]+$/.test(item.name))) throw new Error('Invalid repository collection');
  return [...new Map(items.filter(item => !item.fork).map(item => [item.name, item])).values()];
}
export function selectRepositories(repositories, filter = 'All', search = '') {
  const query = search.trim().toLowerCase();
  return repositories.filter(repo => !featured.has(repo.name)).filter(repo => {
    const info = metadata(repo);
    const text = [repo.name, info.title, info.description, info.category, info.status, repo.language, ...(Array.isArray(repo.topics) ? repo.topics : [])].join(' ').toLowerCase();
    return (filter === 'All' || info.category === filter) && text.includes(query);
  }).sort((a, b) => metadata(a).order - metadata(b).order || a.name.localeCompare(b.name));
}
export function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}
export function renderRow(repo) {
  const info = metadata(repo);
  return `<article class="archive-row" data-name="${escapeHTML(repo.name)}" data-language="${escapeHTML(repo.language || '')}"><span class="row-category">${escapeHTML(info.category)}</span><div><h3><a target="_blank" rel="noopener noreferrer" href="https://github.com/${owner}/${encodeURIComponent(repo.name)}">${escapeHTML(info.title)} <span aria-hidden="true">↗</span></a></h3><p>${escapeHTML(info.description)}</p></div><div class="row-meta"><span class="status">${escapeHTML(info.status)}</span><span>${escapeHTML(repo.language || 'Documentation')}</span></div></article>`;
}
