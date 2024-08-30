const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const cron = require("node-cron");

const mediaDir = path.join(__dirname, "../media");

// Buat folder media jika belum ada
if (!fs.existsSync(mediaDir)) {
  fs.mkdirSync(mediaDir, { recursive: true });
}

// Fungsi untuk menjalankan Puppeteer
async function takeScreenshot() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const url = "http://localhost:24001"; // Ganti dengan URL yang sesuai

  await page.goto(url, { waitUntil: "networkidle2" });

  // Path screenshot dengan menggunakan __dirname
  const screenshotPath = path.join(mediaDir, "screenshot.png");

  console.log("Taking screenshot...");
  await page.screenshot({ path: screenshotPath, fullPage: true });

  console.log("Screenshot taken and saved.");
  await browser.close();
}

// Jadwalkan tugas untuk berjalan setiap 5 menit
cron.schedule("*/1 * * * *", () => {
  console.log("Running scheduled task...");
  takeScreenshot().catch(console.error);
});

console.log("Scheduler is running...");
