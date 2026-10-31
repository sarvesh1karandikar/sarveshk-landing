import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';
const root = fileURLToPath(new URL('../', import.meta.url));
const base = new URL(process.argv[2] || process.env.SITE_URL || 'https://sarveshk.dev/');
const resume = await readFile(resolve(root, 'resume/index.html'), 'utf8');
assert.ok(resume.includes('Senior Software Engineer — AI Canvas'), 'Résumé must include its content before JavaScript runs');
assert.ok(['exp','edu'].every(id=>resume.includes(`id="${id}"`)), 'Résumé sections must exist');
assert.ok(resume.indexOf('id="exp"') < resume.indexOf('id="edu"'), 'Experience must precede education');
const assets = [...resume.matchAll(/(?:src|href)="\.\/(assets\/[^\"]+)"/g)].map(match => 'resume/' + match[1]);
const files = ['index.html','theme.css','styles.css','projects/index.html','projects/archive.js','projects/catalog.js','projects/experience.css','projects/demo.js','projects/note-example.js','projects/radar-sample.json','projects/projects.json','resume/index.html',...assets,'resume/sarvesh-karandikar.pdf','assets/social-preview.png','robots.txt','sitemap.xml'];
const attempts = Number(process.env.SMOKE_ATTEMPTS || 6);
assert.ok(Number.isInteger(attempts) && attempts > 0 && attempts <= 10, 'SMOKE_ATTEMPTS must be 1–10');
let failures = [];
for (let attempt=1; attempt<=attempts; attempt++) {
  const results = await Promise.all(files.map(async path => {
    try {
      const url = new URL(path.replace(/index\.html$/, ''), base);
      const response = await fetch(url, {cache:'no-store', signal:AbortSignal.timeout(12000)});
      assert.equal(response.status, 200, `HTTP ${response.status}`);
      const actual = Buffer.from(await response.arrayBuffer());
      const expected = await readFile(resolve(root,path));
      if (/\.(png|pdf)$/.test(path)) assert.ok(actual.equals(expected), 'Published binary differs from the prepared asset');
      else assert.equal(actual.toString('utf8').replaceAll('\r\n','\n'), expected.toString('utf8').replaceAll('\r\n','\n'), 'Published content differs from the checked-out release');
      return null;
    } catch(error) { return {path,error:error.message.split('\n')[0]}; }
  }));
  failures=results.filter(Boolean);
  if (!failures.length) {console.log(`All ${files.length} deployed pages and assets match this release.`);break;}
  console.log(`Attempt ${attempt}/${attempts}: ${failures.length} content checks pending.`, failures);
  if(attempt<attempts) await new Promise(resolve=>setTimeout(resolve,10000));
}
assert.equal(failures.length,0,'Published content checks failed');
