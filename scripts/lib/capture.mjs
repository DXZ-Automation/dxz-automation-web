#!/usr/bin/env node
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

function parseArgs(argv) {
  const args = { mode: "baseline", config: "visual.config.json", out: null };
  for (let i = 0; i < argv.length; i++) {
    let a = argv[i];
    let value;
    const eq = a.startsWith("--") ? a.indexOf("=") : -1;
    if (eq !== -1) {
      value = a.slice(eq + 1);
      a = a.slice(0, eq);
    }
    if (a === "--mode") args.mode = value !== undefined ? value : argv[++i];
    else if (a === "--config") args.config = value !== undefined ? value : argv[++i];
    else if (a === "--out") args.out = value !== undefined ? value : argv[++i];
  }
  return args;
}

function slugify(input) {
  return input.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "root";
}

async function waitForAnimations(locator) {
  const start = Date.now();
  while (Date.now() - start < 1000) {
    const running = await locator
      .evaluate((el) => {
        const anims = el.getAnimations ? el.getAnimations({ subtree: true }) : [];
        return anims.some((a) => a.playState === "running");
      })
      .catch(() => false);
    if (!running) return;
    await new Promise((r) => setTimeout(r, 50));
  }
}

const DEFAULT_HOVER_SELECTORS = [
  { name: "default", selector: "button, a[role='button'], [data-hover-card]" },
];

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const configPath = path.resolve(process.cwd(), args.config);
  if (!fs.existsSync(configPath)) {
    console.error(`capture: config not found at ${configPath}`);
    process.exit(1);
  }
  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  const outDir = args.out
    ? path.resolve(process.cwd(), args.out)
    : path.resolve(process.cwd(), "visual", args.mode === "baseline" ? "baseline" : "diff/current");

  if (!config.routes || config.routes.length === 0) {
    console.error("capture: config.routes is empty");
    process.exit(1);
  }

  const browser = await chromium.launch();
  try {
    for (const route of config.routes) {
      for (const viewport of config.viewports) {
        const page = await browser.newPage({ viewport: { width: viewport, height: 900 } });
        const url = new URL(route.path, config.baseURL).toString();
        await page.goto(url, { waitUntil: "networkidle" });
        await page.evaluate(() => document.fonts && document.fonts.ready).catch(() => {});

        const dir = path.join(outDir, route.name, `${viewport}px`);
        fs.mkdirSync(dir, { recursive: true });

        await page.screenshot({ path: path.join(dir, "full-page.png"), fullPage: true });

        for (const target of route.scrollTargets || []) {
          const locator = page.locator(target).first();
          if ((await locator.count()) === 0) {
            console.warn(`capture: scrollTarget "${target}" not found on ${route.path} @ ${viewport}px, skipping`);
            continue;
          }
          await locator.scrollIntoViewIfNeeded();
          await waitForAnimations(locator);
          await page.screenshot({ path: path.join(dir, `scroll-${slugify(target)}.png`) });
        }

        const hoverSelectors =
          route.hoverSelectors && route.hoverSelectors.length ? route.hoverSelectors : DEFAULT_HOVER_SELECTORS;
        for (const { name, selector } of hoverSelectors) {
          const locator = page.locator(selector).first();
          if ((await locator.count()) === 0) {
            console.warn(`capture: hoverSelector "${selector}" (${name}) not found on ${route.path} @ ${viewport}px, skipping`);
            continue;
          }
          await locator.scrollIntoViewIfNeeded();
          await waitForAnimations(locator);
          await locator.screenshot({ path: path.join(dir, `component-${name}.png`) });

          await locator.hover();
          await waitForAnimations(locator);
          await locator.screenshot({ path: path.join(dir, `hover-${name}.png`) });
        }

        await page.close();
      }
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
