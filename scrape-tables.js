const { chromium } = require('playwright');

const urls = [
  'https://your-domain.com/seed/72',
  'https://your-domain.com/seed/73',
  'https://your-domain.com/seed/74',
  'https://your-domain.com/seed/75',
  'https://your-domain.com/seed/76',
  'https://your-domain.com/seed/77',
  'https://your-domain.com/seed/78',
  'https://your-domain.com/seed/79',
  'https://your-domain.com/seed/80',
  'https://your-domain.com/seed/81'
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  let grandTotal = 0;

  for (const url of urls) {
    console.log(`\nProcessing ${url}...`);
    await page.goto(url);
    
    // Extract all numbers from all tables
    const tableSum = await page.evaluate(() => {
      const tables = document.querySelectorAll('table');
      let sum = 0;
      
      tables.forEach(table => {
        const cells = table.querySelectorAll('td, th');
        cells.forEach(cell => {
          const num = parseFloat(cell.textContent.trim());
          if (!isNaN(num)) {
            sum += num;
          }
        });
      });
      
      return sum;
    });
    
    console.log(`Sum for ${url}: ${tableSum}`);
    grandTotal += tableSum;
  }

  console.log(`\n========================================`);
  console.log(`TOTAL SUM OF ALL TABLES: ${grandTotal}`);
  console.log(`========================================\n`);

  await browser.close();
})();
