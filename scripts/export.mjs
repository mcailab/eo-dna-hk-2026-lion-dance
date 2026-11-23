import puppeteer from 'puppeteer-core';
import { spawn } from 'node:child_process';
const [,, url, out, fpsArg] = process.argv;
const fps = Number(fpsArg || 30);
const linux = process.platform === 'linux';
const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH || (linux ? '/usr/bin/google-chrome' : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'),
  headless: 'new', args: [...(linux ? ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--no-sandbox'] : ['--use-angle=metal']), '--hide-scrollbars', '--window-size=1920,1080'],
  defaultViewport: { width: 1920, height: 1080, deviceScaleFactor: 1 },
});
const page = await browser.newPage();
await page.goto(url, { waitUntil: 'networkidle0', timeout: 120000 });
await page.waitForFunction('window.__ready === true', { timeout: 120000 });
await page.evaluate(() => document.fonts.ready);
const END = await page.evaluate(() => window.__END);
const n = Math.round(END * fps);
const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-framerate', String(fps), '-i', '-',
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
for (let f = 0; f < n; f++) {
  await page.evaluate((t) => window.__render(t), f / fps);
  const buf = await page.screenshot({ type: 'jpeg', quality: 95 });
  if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
  if (f % 60 === 0) console.log(`frame ${f}/${n}`);
}
ff.stdin.end();
await new Promise(r => ff.on('close', r));
await browser.close();
console.log('done', out, n, 'frames');
