const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const files = [
    { html: 'cv.html', pdf: 'cv.pdf' },
    { html: 'cv_en.html', pdf: 'cv_en.pdf' }
  ];

  for (const file of files) {
    const filePath = path.resolve(__dirname, file.html);
    await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0' });

    await page.pdf({
      path: file.pdf,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        bottom: '20mm',
        left: '15mm',
        right: '15mm'
      }
    });

    console.log(`✅ Generated ${file.pdf}`);
  }

  await browser.close();
})();