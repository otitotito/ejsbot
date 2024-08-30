const puppeteer = require("puppeteer");

(async () => {
  // Menjalankan Puppeteer dalam mode headless
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Navigasi ke URL atau file lokal
  const url = "http://localhost:24001"; // Ganti dengan URL yang sesuai

  await page.goto(url, { waitUntil: "networkidle2" });

  // Mengambil screenshot
  await page.screenshot({ path: "screenshot.png", fullPage: true });

  // Menutup browser
  await browser.close();
})();
