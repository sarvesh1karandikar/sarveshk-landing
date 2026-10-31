import { createRequire } from 'node:module';
import { existsSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
const require = createRequire(new URL('../checks/package.json',import.meta.url));
const puppeteer = require('puppeteer-core');
const executablePath = [process.env.CHROME_PATH,'/usr/bin/google-chrome','/usr/bin/chromium','C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(path=>path&&existsSync(path));
if(!executablePath)throw new Error('Chrome/Chromium is required for browser smoke checks. Set CHROME_PATH.');
const base = (process.argv[2] || process.env.SITE_URL || 'https://sarveshk.dev').replace(/\/$/,'');
await mkdir('checks-output',{recursive:true});
const browser=await puppeteer.launch({executablePath,headless:true});
const page=await browser.newPage();
try {
  await page.setViewport({width:1280,height:900});
  await page.goto(base+'/',{waitUntil:'networkidle0'});
  assert.equal(await page.$eval('h1',e=>e.textContent),'I build infrastructure for AI agents.');
  await page.click('a[href="#work"].button');
  await page.click('.case-study summary');
  assert.equal(await page.$eval('.case-study',e=>e.open),true);
  await page.goto(base+'/projects/',{waitUntil:'networkidle0'});
  await page.waitForSelector('#search:not([disabled])');
  await page.type('#search','centroid');
  await page.waitForFunction(()=>document.querySelector('#archive').textContent.includes('ChromaDB Retrieval')&&document.querySelectorAll('#archive article').length===1);
  await page.click('#search');await page.keyboard.down('Control');await page.keyboard.press('A');await page.keyboard.up('Control');
  await page.type('#search','no-such-project-smoke');
  await page.waitForFunction(()=>!document.querySelector('#empty').hidden);
  await page.click('#reset');await page.click('[data-filter="Websites"]');
  assert.equal(await page.$$eval('#archive article',els=>els.length),2);
  await page.click('#note-demo-form button[type="submit"]');
  await page.waitForFunction(()=>document.querySelector('#note-demo-log').textContent.includes('*Notes matching "session"*'));
  await page.type('#note-command','/note Smoke check note');await page.click('#note-demo-form button[type="submit"]');
  await page.type('#note-command','/notes search Smoke check');await page.click('#note-demo-form button[type="submit"]');
  assert.match(await page.$eval('#note-demo-log',e=>e.lastElementChild.textContent),/Smoke check note/);
  for(const width of [1280,390]) {
    await page.setViewport({width,height:900});
    for(const route of ['/','/projects/','/resume/']) {
      await page.goto(base+route,{waitUntil:'networkidle0'});
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`Overflow: ${route} at ${width}`);
      assert.equal(await page.$$eval('h1',els=>els.length),1);
    }
  }
  const plain=await browser.newPage();await plain.setJavaScriptEnabled(false);
  await plain.goto(base+'/resume/',{waitUntil:'networkidle0'});
  assert.match(await plain.$eval('#exp',e=>e.textContent),/Senior Software Engineer/);
  assert.deepEqual(await plain.$$eval('main > section',els=>els.slice(0,3).map(e=>e.id)),['exp','proj','edu']);
  console.log('Live browser smoke checks passed, including the résumé without JavaScript.');
} catch(error) {
  await page.screenshot({path:'checks-output/failure.png',fullPage:true}).catch(()=>{});
  throw error;
} finally {await browser.close();}
