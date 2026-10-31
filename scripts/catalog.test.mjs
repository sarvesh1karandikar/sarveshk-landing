import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { normalize, selectRepositories, renderRow } from '../projects/catalog.js';
const snapshot = normalize(JSON.parse(await readFile(new URL('../projects/projects.json', import.meta.url), 'utf8')));

test('featured systems are grouped once and useful tools lead the archive', () => {
  const rows = selectRepositories(snapshot);
  assert.equal(rows.length, 11);
  assert.deepEqual(rows.slice(0, 3).map(row => row.name), ['chromadb', 'workout', 'alpacabot-dashboard']);
  assert.equal(rows.some(row => row.name.startsWith('drivesuite') || row.name === 'DriveSuite'), false);
});
test('search matches curated descriptions and combines with category filters', () => {
  assert.deepEqual(selectRepositories(snapshot, 'Tools & apps', 'centroid').map(row => row.name), ['chromadb']);
  assert.equal(selectRepositories(snapshot, 'Websites', 'centroid').length, 0);
  assert.equal(selectRepositories(snapshot, 'Websites').length, 2);
  assert.equal(selectRepositories(snapshot, 'ML experiments').length, 6);
});
test('malformed refresh payloads are rejected and duplicate repos normalized', () => {
  for (const value of [{}, [null], [{name: '<script>'}]]) assert.throws(() => normalize(value));
  assert.equal(normalize([{name: 'one'}, {name: 'one'}, {name: 'forked', fork: true}]).length, 1);
});
test('untrusted descriptions are escaped and links stay on the owner repository', () => {
  const row = renderRow({name: 'new-project', description: '<img src=x onerror=alert(1)>', language: '<script>'});
  assert.ok(row.includes('&lt;img'));
  assert.ok(!row.includes('<img'));
  assert.ok(row.includes('https://github.com/sarvesh1karandikar/new-project'));
});
test('the no-JavaScript HTML collection matches the runtime catalogue', async () => {
  const html = await readFile(new URL('../projects/index.html', import.meta.url), 'utf8');
  const content = html.match(/<div id="archive">([\s\S]*?)<\/div>(?=\s*<div id="empty")/)[1].trim();
  assert.equal(content, selectRepositories(snapshot).map(renderRow).join('\n'));
});
