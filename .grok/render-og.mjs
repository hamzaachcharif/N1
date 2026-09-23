import { chromium } from "playwright";
import { pathToFileURL } from "node:url";
import { mkdirSync } from "node:fs";

const html = "/workspace/.grok/og-card.html";
const out = "/workspace/.grok/card-raw.png";
const favOut = "/workspace/.grok/favicon-qc.png";

mkdirSync("/workspace/.grok", { recursive: true });

const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.goto(pathToFileURL(html).href, { waitUntil: "load", timeout: 30000 });
  await page.evaluate(async () => {
    await document.fonts.ready;
    const img = document.querySelector("img");
    if (img && !img.complete) {
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => reject(new Error("hero image failed"));
      });
    }
  });
  await page.waitForTimeout(200);
  await page.screenshot({ path: out, type: "png", clip: { x: 0, y: 0, width: 1200, height: 630 } });

  const favPage = await browser.newPage({
    viewport: { width: 160, height: 48 },
    deviceScaleFactor: 1,
  });
  await favPage.setContent(`<!DOCTYPE html>
<html><head><style>
  body { margin:0; background:#ddd; display:flex; gap:16px; align-items:center; padding:8px; }
  img { image-rendering: auto; background:#fff; }
</style></head>
<body>
  <img src="${pathToFileURL("/workspace/.grok/favicon.svg.tmp").href}" width="16" height="16" />
  <img src="${pathToFileURL("/workspace/.grok/favicon.svg.tmp").href}" width="32" height="32" />
  <img src="${pathToFileURL("/workspace/.grok/favicon.svg.tmp").href}" width="64" height="64" />
</body></html>`);
  await favPage.waitForTimeout(150);
  await favPage.screenshot({ path: favOut, type: "png" });
  console.log(JSON.stringify({ ok: true, out, favOut }));
} finally {
  await browser.close();
}
