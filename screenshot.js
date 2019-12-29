const puppeteer = require('puppeteer');
const url = process.argv[2];
if (!url) {
    throw "Please provide URL as a first argument";
}
async function run () {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({path: 'screenshot.png'});
    browser.close();
}
run();

// in your terminal, simply run:
// node screenshot.js 'insert url here with no quotations'
// ex: node screenshot.js https://google.com
// screenshot.js is simply the file name, can be anything. 