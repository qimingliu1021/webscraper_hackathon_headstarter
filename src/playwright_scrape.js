const { chromium } = require("playwright");
const cheerio = require("cheerio");

(async () => {
  // The URL of the webpage you want to scrape
  const url =
    "https://www.alibaba.com/factory/index.html?spm=a2700.product_home_l0.home-tab.manufacturers"; // Replace with your target URL

  // Launch a headless browser using Playwright
  // const browser = await chromium.launch({headless: false});
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Navigate to the URL
  await page.goto(url);

  // Get the HTML content of the page
  const html = await page.content();

  // Load the HTML content into Cheerio
  const $ = cheerio.load(html);

  // Example: Extract the text inside all <h3> elements
  const headings = [];
  $("h3").each((index, element) => {
    const heading = $(element).text();
    headings.push(heading);
  });

  // Print the extracted headings to the console
  console.log("Headings found:", headings);

  // Close the browser
  await browser.close();
})();
