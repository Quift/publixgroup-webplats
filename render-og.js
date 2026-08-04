const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  const absPath = path.resolve('site/assets/_og-image.html');
  const url = 'file:///' + absPath.split(path.sep).join('/');
  console.log('loading:', url);
  await page.goto(url, { waitUntil: 'networkidle0' });
  await page.screenshot({
    path: 'site/assets/og-image.jpg',
    type: 'jpeg',
    quality: 92,
    clip: { x: 0, y: 0, width: 1200, height: 630 }
  });
  await browser.close();
  console.log('written: site/assets/og-image.jpg');
})();
