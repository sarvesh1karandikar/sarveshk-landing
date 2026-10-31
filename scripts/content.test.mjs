import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { escapeHTML } from '../projects/catalog.js';
const root = new URL('../',import.meta.url);
const read = path => readFile(new URL(path,root),'utf8');
test('résumé has useful static content and experience appears before education',async()=>{
  const html=await read('resume/index.html');
  assert.ok(html.includes('Senior Software Engineer — AI Canvas'));
  assert.ok(html.includes('ChromaDB Retrieval'));
  assert.ok(['exp','proj','edu'].every(id=>html.includes(`id="${id}"`)));
  assert.ok(html.indexOf('id="exp"')<html.indexOf('id="proj"'));
  assert.ok(html.indexOf('id="proj"')<html.indexOf('id="edu"'));
  assert.ok(!html.includes('<div id="app"></div>'));
});
test('project evidence stays dated, attributed, and connected to homepage previews',async()=>{
  const html=await read('projects/index.html');
  const home=await read('index.html');
  const sample=JSON.parse(await read('projects/radar-sample.json'));
  assert.equal(sample.mode,'live');
  assert.match(sample.sourceURL,/\/blob\/[a-f0-9]{40}\//);
  assert.ok(html.includes(`datetime="${sample.date}"`));
  for(const item of sample.items) assert.ok(html.includes(escapeHTML(item.title))&&html.includes(escapeHTML(item.url)));
  for(const anchor of ['assistant-demo','radar-demo']) {assert.ok(html.includes(`id="${anchor}"`));assert.ok(home.includes(`/projects/#${anchor}`));}
  assert.ok(html.includes('fictional data'));
});
test('canonical pages share valid preview assets and are included in discovery files',async()=>{
  for(const path of ['index.html','projects/index.html','resume/index.html']) {
    const html=await read(path);
    assert.ok(html.includes('property="og:image" content="https://sarveshk.dev/assets/social-preview.png"'));
    assert.ok(html.includes('name="twitter:card" content="summary_large_image"'));
  }
  const image=await readFile(new URL('assets/social-preview.png',root));
  assert.equal(image.subarray(1,4).toString(),'PNG');
  assert.equal(image.readUInt32BE(16),1200);assert.equal(image.readUInt32BE(20),630);
  const sitemap=await read('sitemap.xml');
  for(const route of ['','projects/','resume/'])assert.ok(sitemap.includes(`<loc>https://sarveshk.dev/${route}</loc>`));
  assert.ok((await read('robots.txt')).includes('Sitemap: https://sarveshk.dev/sitemap.xml'));
});
