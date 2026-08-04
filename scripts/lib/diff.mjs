#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

function parseArgs(argv) {
  const args = { baseline: "visual/baseline", current: "visual/diff/current", out: "visual/diff", threshold: null, config: null };
  for (let i = 0; i < argv.length; i++) {
    let a = argv[i];
    let value;
    const eq = a.startsWith("--") ? a.indexOf("=") : -1;
    if (eq !== -1) {
      value = a.slice(eq + 1);
      a = a.slice(0, eq);
    }
    const next = () => (value !== undefined ? value : argv[++i]);
    if (a === "--baseline") args.baseline = next();
    else if (a === "--current") args.current = next();
    else if (a === "--out") args.out = next();
    else if (a === "--threshold") args.threshold = parseFloat(next());
    else if (a === "--config") args.config = next();
  }
  return args;
}

function walkPngs(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...walkPngs(full));
    else if (entry.name.endsWith(".png")) results.push(full);
  }
  return results;
}

function resolveThreshold(args) {
  if (args.threshold != null) return args.threshold;
  if (process.env.VISUAL_DIFF_THRESHOLD) return parseFloat(process.env.VISUAL_DIFF_THRESHOLD);
  if (args.config && fs.existsSync(args.config)) {
    const config = JSON.parse(fs.readFileSync(args.config, "utf8"));
    if (typeof config.diffThreshold === "number") return config.diffThreshold;
  }
  return 0.1;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const threshold = resolveThreshold(args);

  const baselineDir = path.resolve(process.cwd(), args.baseline);
  const currentDir = path.resolve(process.cwd(), args.current);
  const outDir = path.resolve(process.cwd(), args.out);

  const baselineFiles = walkPngs(baselineDir).map((f) => path.relative(baselineDir, f));
  const currentFiles = walkPngs(currentDir).map((f) => path.relative(currentDir, f));
  const allFiles = Array.from(new Set([...baselineFiles, ...currentFiles])).sort();

  const rows = [];
  for (const rel of allFiles) {
    const baselinePath = path.join(baselineDir, rel);
    const currentPath = path.join(currentDir, rel);
    const hasBaseline = fs.existsSync(baselinePath);
    const hasCurrent = fs.existsSync(currentPath);

    if (!hasBaseline || !hasCurrent) {
      rows.push({ image: rel, diffPercent: 100, note: !hasBaseline ? "added" : "removed", exceeds: true });
      continue;
    }

    const img1 = PNG.sync.read(fs.readFileSync(baselinePath));
    const img2 = PNG.sync.read(fs.readFileSync(currentPath));

    if (img1.width !== img2.width || img1.height !== img2.height) {
      rows.push({ image: rel, diffPercent: 100, note: "size-mismatch", exceeds: true });
      continue;
    }

    const { width, height } = img1;
    const diffPng = new PNG({ width, height });
    const diffPixels = pixelmatch(img1.data, img2.data, diffPng.data, width, height, { threshold: 0.1 });
    const diffPercent = (diffPixels / (width * height)) * 100;
    const exceeds = diffPercent > threshold;

    if (exceeds) {
      const diffOutPath = path.join(outDir, rel);
      fs.mkdirSync(path.dirname(diffOutPath), { recursive: true });
      fs.writeFileSync(diffOutPath, PNG.sync.write(diffPng));
    }

    rows.push({ image: rel, diffPercent: Number(diffPercent.toFixed(4)), note: null, exceeds });
  }

  rows.sort((a, b) => b.diffPercent - a.diffPercent);

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "report.json"), JSON.stringify({ threshold, rows }, null, 2));

  const failing = rows.filter((r) => r.exceeds);

  console.log(`\nVisual diff report (threshold: ${threshold}%)\n`);
  for (const row of rows) {
    const marker = row.exceeds ? "FAIL" : "ok  ";
    const note = row.note ? ` [${row.note}]` : "";
    console.log(`  ${marker}  ${row.diffPercent.toFixed(2).padStart(7)}%  ${row.image}${note}`);
  }

  if (failing.length > 0) {
    console.log(`\n${failing.length} image(s) exceeded the ${threshold}% threshold. Annotated diffs in ${path.relative(process.cwd(), outDir)}/\n`);
    process.exit(1);
  }
  console.log(`\nAll ${rows.length} images within threshold.\n`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
