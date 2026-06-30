const puppeteer = require('puppeteer');
const OUT = '/tmp/claude-0/-home-user-regenpro/0347c4fc-85aa-5363-8662-beacbb53a3a3/scratchpad';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/opt/pw-browsers/chromium',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto('file:///home/user/regenpro/index.html', { waitUntil: 'networkidle0', timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));

  const sections = ['hero','problema','debito','errori','soluzione','formula','aspettati','per-te','faq','cta-finale'];
  for (const id of sections) {
    await page.evaluate(id => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'instant' });
    }, id);
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: `${OUT}/new-${id}.png` });
  }

  await page.screenshot({ path: `${OUT}/new-full.png`, fullPage: true });
  await browser.close();
  console.log('done');
})();
