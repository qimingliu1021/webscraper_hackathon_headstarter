const { chromium } = require("playwright");
const cheerio = require("cheerio");
const Heading = require("./mongodb");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
  // The URL of the webpage you want to scrape
  const url =
    "https://www.alibaba.com/factory/index.html?spm=a2700.product_home_l0.home-tab.manufacturers"; // Replace with your target URL

  // Launch a headless browser using Playwright
  const browser = await chromium.launch({ headless: false });
  // const browser = await chromium.launch();
  const page = await browser.newPage();

  // Navigate to the URL
  try {
    await page.goto(url);

    // Handle 404 error
    const pageTitle = await page.title();
    if (pageTitle.includes("404") || pageTitle.includes("Not Found")) {
      console.error("Page not found - 404 NOT FOUND. exiting...");
    }

    await sleep(3000);

    // Get the HTML content of the page
    const html = await page.content();

    // Load the HTML content into Cheerio
    const $ = cheerio.load(html);

    // Example: Extract the text inside all <h3> elements
    const headings = [];
    $("h3").each((index, element) => {
      const heading = $(element).text();
      headings.push(heading);

      const headingDocument = new Heading({ heading });
      headingDocument
        .save()
        .then(() => console.log("Heading saved: ", heading))
        .catch((err) => console.error("Error saving to MongoDB: ", err));
      headings.push(heading);
    });

    // Print the extracted headings to the console
    console.log("Headings found:", headings);
  } catch (error) {
    console.error("An error occured during scraping: ", error);
  } finally {
    // Close the browser
    await browser.close();
  }
})();
