const { chromium } = require('playwright');

const urls = [
  'https://sanand0.github.io/tdsdata/js_table/?seed=72',
  'https://sanand0.github.io/tdsdata/js_table/?seed=73',
  'https://sanand0.github.io/tdsdata/js_table/?seed=74',
  'https://sanand0.github.io/tdsdata/js_table/?seed=75',
  'https://sanand0.github.io/tdsdata/js_table/?seed=76',
  'https://sanand0.github.io/tdsdata/js_table/?seed=77',
  'https://sanand0.github.io/tdsdata/js_table/?seed=78',
  'https://sanand0.github.io/tdsdata/js_table/?seed=79',
  'https://sanand0.github.io/tdsdata/js_table/?seed=80',
  'https://sanand0.github.io/tdsdata/js_table/?seed=81'
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  let grandTotal = 0;

  for (const url of urls) {
    console.log(`\nProcessing ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle' });
    
    // Wait a bit for JS tables to render
    await page.waitForTimeout(2000);
    
    const tableSum = await page.evaluate(() => {
      const tables = document.querySelectorAll('table');
      let sum = 0;
      
      tables.forEach(table => {
        const cells = table.querySelectorAll('td, th');
        cells.forEach(cell => {
          const text = cell.textContent.trim().replace(/,/g, '');
          const num = parseFloat(text);
          if (!isNaN(num)) {
            sum += num;
          }
        });
      });
      
      return sum;
    });
    
    console.log(`Sum for seed ${url.split('=')[1]}: ${tableSum}`);
    grandTotal += tableSum;
  }

  console.log(`\n========================================`);
  console.log(`TOTAL SUM OF ALL TABLES: ${grandTotal}`);
  console.log(`========================================\n`);

  await browser.close();
})();
