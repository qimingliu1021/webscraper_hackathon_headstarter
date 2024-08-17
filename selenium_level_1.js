const { Builder, By } = require("selenium-webdriver");
const cheerio = require("cheerio");
const { InterceptResolutionAction } = require("puppeteer-core");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
  // The URL of the webpage you want to scrape
  const url =
    "https://www.alibaba.com/factory/index.html?spm=a2700.product_home_l0.home-tab.manufacturers";

  // Launch a browser using Selenium
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Navigate to the URL
    await driver.get(url);

    // Locate the div with the class name 'contain-content'
    const containContentDiv = await driver.findElement(
      By.className("contain-content")
    );

    const divHtml = await containContentDiv.getAttribute("outerHTML");

    // Load the HTML content into Cheerio
    const $ = cheerio.load(divHtml);

    console.log("Opened the browser. Now let it open for 3s. ");
    await sleep(3000);

    // Extract the text inside all <h3> elements
    const headings = [];
    $("h3").each((index, element) => {
      const heading = $(element).text();
      headings.push(heading);
    });

    // Print the extracted headings to the console
    console.log("Headings found:", headings);
  } finally {
    // Close the browser
    await driver.quit();
  }
})();
