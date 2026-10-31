import { owner, featured, normalize, selectRepositories, renderRow } from './catalog.js';
const archive = document.querySelector('#archive');
const search = document.querySelector('#search');
const count = document.querySelector('#count');
const repoTotal = document.querySelector('#repo-total');
const empty = document.querySelector('#empty');
const status = document.querySelector('#data-status');
const refreshButton = document.querySelector('#refresh');
// The HTML collection stays searchable if its JSON snapshot cannot be loaded.
let repositories = [...archive.querySelectorAll('[data-name]')].map(row => ({ name: row.dataset.name, language: row.dataset.language }));
let activeFilter = 'All';
let source = 'saved';
let total = null;
function render() {
  const visible = selectRepositories(repositories, activeFilter, search.value);
  archive.innerHTML = visible.map(renderRow).join('');
  count.textContent = `${visible.length} of ${repositories.filter(repo => !featured.has(repo.name)).length} additional projects`;
  if (total !== null) repoTotal.textContent = `${total} public repositories overall`;
  empty.hidden = visible.length !== 0;
}
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(item => {
    item.classList.toggle('selected', item === button);
    item.setAttribute('aria-pressed', String(item === button));
  });
  render();
}));
search.addEventListener('input', render);
document.querySelector('#reset').addEventListener('click', () => {
  search.value = '';
  document.querySelector('[data-filter="All"]').click();
  search.focus();
});
async function fetchPublicRepositories() {
  const all = [];
  for (let page = 1; page <= 10; page += 1) {
    const response = await fetch(`https://api.github.com/users/${owner}/repos?per_page=100&sort=updated&page=${page}`, { signal: AbortSignal.timeout(12000) });
    if (!response.ok) throw new Error('GitHub unavailable');
    const items = await response.json();
    all.push(...normalize(items));
    if (items.length < 100) return normalize(all);
  }
  throw new Error('Repository pagination incomplete');
}
async function refresh() {
  refreshButton.disabled = true;
  refreshButton.textContent = 'Refreshing…';
  status.textContent = 'Checking public repositories on GitHub…';
  try {
    const next = await fetchPublicRepositories();
    repositories = next;
    total = next.length;
    source = 'GitHub';
    render();
    status.textContent = `Updated from GitHub on ${new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}.`;
  } catch {
    status.textContent = `GitHub refresh is unavailable. Keeping the ${source === 'saved' ? 'saved collection' : 'last successful GitHub collection'}.`;
  } finally {
    refreshButton.disabled = false;
    refreshButton.textContent = 'Refresh from GitHub ↻';
  }
}
// Wait for hydration before enabling refresh to prevent a response race.
refreshButton.disabled = true;
render();
try {
  const response = await fetch('./projects.json', { signal: AbortSignal.timeout(5000) });
  if (!response.ok) throw new Error('Snapshot unavailable');
  const saved = normalize(await response.json());
  repositories = saved;
  total = saved.length;
  render();
  status.textContent = 'Showing the saved collection. Refresh from GitHub for the latest public repositories.';
} catch {
  status.textContent = 'Showing the collection included with this page. You can still search and filter it, or refresh from GitHub.';
} finally {
  refreshButton.disabled = false;
}
refreshButton.addEventListener('click', refresh);
document.querySelectorAll('[data-filter], #search').forEach(control => { control.disabled = false; });
