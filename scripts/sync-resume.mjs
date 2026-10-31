import { cp, readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const build = resolve(process.argv[2] || resolve(root, '../sarveshk-dev/dist'));
const html = await readFile(resolve(build, 'resume.html'), 'utf8');
if (!html.includes('id="app"') || !html.includes('./assets/')) {
  throw new Error('Expected the résumé application build. Run npm run build in sarveshk-dev first.');
}
await mkdir(resolve(root, 'resume/assets'), { recursive: true });
await cp(resolve(build, 'assets'), resolve(root, 'resume/assets'), { recursive: true });
await cp(resolve(build, 'resume/sarvesh-karandikar.pdf'), resolve(root, 'resume/sarvesh-karandikar.pdf'));
await cp(resolve(build, 'og.png'), resolve(root, 'resume/og.png'));
await mkdir(resolve(root, 'assets'), { recursive: true });
await cp(resolve(build, 'og.png'), resolve(root, 'assets/social-preview.png'));
await writeFile(resolve(root, 'resume/index.html'), html
  .replace('href="./theme.css"', 'href="../theme.css"')
  .replace('href="./favicon.svg"', 'href="../favicon.svg"'));
console.log('Updated /resume/ application, assets, and PDF.');
