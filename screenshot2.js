// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality.
// Any number of plugins can be added through `puppeteer.use()`
const puppeteer = require('puppeteer-extra')
 
// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
 
// Add adblocker plugin to block all ads and trackers (saves bandwidth)
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(AdblockerPlugin({ blockTrackers: true }))
 
// That's it, the rest is puppeteer usage as normal 😊
puppeteer.launch({ headless: true }).then(async browser => {
  const page = await browser.newPage()
  await page.setViewport({ width: 800, height: 600 })
 
//   console.log(`Testing adblocker plugin..`)
//   await page.goto('https://www.vanityfair.com')
//   await page.waitFor(1000)
//   await page.screenshot({ path: 'adblocker.png', fullPage: true })
 
  console.log(`Testing the stealth plugin..`)
  await page.goto('https://footlocker.com/product/Nike-Air-Foamposite-Pro---Men-s/V0369001.html')
  await page.waitFor(5000);

//   await page.evaluate(() => {
//     Array.from(document.querySelectorAll( '.c-form-field')).filter(element => 
//       element.textContent == '08.0' )[0].click();
//  });

// await page.evaluate(() => {
//     let elements = document.getElementsByClassName('.c-form-field')[0];
//     for (let element of elements)
//         element.click();
// });



const query = "07.5";

page.evaluate(query => {
  const elements = [...document.querySelectorAll('.c-form-field')];

  // Either use .find or .filter, comment one of these
  // find element with find
  const targetElement = elements.find(e => e.innerText.includes(query));

  // OR, find element with filter
  // const targetElement = elements.filter(e => e.innerText.includes(query))[0];

  // make sure the element exists, and only then click it
  targetElement && targetElement.click();
}, query)



//this here below is how I would click on a button to go to next page if it has a unique selector
// await page.waitForSelector('#ProductDetails > div.ProductDetails-form__info > div.ProductDetails-form__sizes > fieldset > div > div.c-form-field.c-form-field--radio.c-form-field--checked.ProductSize', 10000) 
// await page.click('#ProductDetails > div.ProductDetails-form__info > div.ProductDetails-form__sizes > fieldset > div > div.c-form-field.c-form-field--radio.c-form-field--checked.ProductSize');





//   let selector = 'c-form-field'[2];
//   await page.evaluate((selector) => document.querySelector(selector).click(), selector); 


  await page.screenshot({ path: 'stealth2.png', fullPage: true })
 
  console.log(`All done, check the screenshots. ✨`)
  await browser.close()
})