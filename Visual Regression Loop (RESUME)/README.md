# Visual Regression Loop — RESUME

Paused here on 2026-08-03. This note is the single source of truth for picking the work
back up — read it before touching visual regression files again.

## What this is

A reusable Playwright + pixelmatch visual regression toolkit: capture screenshots of key
routes/viewports/hover states, diff them against a committed baseline, and block commits
that touch styling-relevant files if the diff exceeds threshold.

Built in two repos:

- **`DXZ-Operating-System`** — the reusable template (source of truth for the toolkit itself)
- **`DXZ Automation-web`** — first real install of that template (this repo)

## Branches

- `DXZ-Operating-System` → `feat/visual-regression-template` (10 commits, template complete)
- `DXZ Automation-web` → `feat/visual-regression-loop` (this repo, mid-install — this commit)

## Done

**Template (`DXZ-Operating-System`, `templates/visual-regression/`)** — fully built and committed:
1. Config schema + README (`visual.config.json` shape, install instructions)
2. Capture engine (`scripts/lib/capture.mjs`) — Playwright screenshots per route/viewport/hover
3. Diff engine (`scripts/lib/diff.mjs`) — pixelmatch comparison, threshold gate
4. `visual-baseline.sh` — orchestration script to (re)generate the baseline
5. `visual-diff.sh` — orchestration script to diff current state against baseline
6. `.githooks/pre-commit` — blocks commits touching `.tsx/.jsx/.css/.scss/tailwind.config/globals.css` if diff exceeds threshold
7. Documented in the repo map (`e69c972`)

**Install into `DXZ Automation-web`** (Task 7, steps 1–7 of 9 — see
`DXZ-Operating-System/docs/superpowers/plans/2026-08-03-visual-regression-loop.md`):
- [x] Step 1: Copied `scripts/` (`visual-baseline.sh`, `visual-diff.sh`, `lib/capture.mjs`, `lib/diff.mjs`) and `.githooks/pre-commit`
- [x] Step 2: Wrote real `visual.config.json` — routes: `/` (home), viewports 390/768/1440, scroll targets `#hero #services #process #contact`, hover selectors for hero CTA / nav book-call / service-card-1, threshold 0.1
- [x] Step 3: Added `id="hero"` to `AetherFlowHero` root div (`src/components/ui/aether-flow-hero.tsx`)
- [x] Step 4: Wired `package.json` — `visual:baseline` and `visual:diff` scripts, added `pixelmatch`/`playwright`/`pngjs` devDependencies
- [x] Step 5: `.gitignore` — added `visual/diff/` (baseline is committed, diff output is not)
- [x] Step 6: Installed deps (`node_modules` has pixelmatch/playwright/pngjs) and Chromium (`~/Library/Caches/ms-playwright`)
- [x] Step 7: Wired hook path — `git config core.hooksPath` = `.githooks` (verified)

## Not done — pick up here

- [ ] **Step 8: Generate the baseline against the real dev server** — `visual/baseline/` does
      not exist yet. Only `visual/diff/report.json` exists (empty `rows: []`, stale/gitignored,
      not meaningful). Run:
      ```
      npm run dev   # in one terminal, confirm it's up on localhost:3000
      npm run visual:baseline   # in another
      ```
      Review the captured PNGs in `visual/baseline/` before committing them.
- [ ] **Step 9: Commit the baseline** — `git add visual/baseline` + commit. (This resume commit
      covers the toolkit wiring; the baseline images are a separate commit since they need
      visual review first.)
- [ ] **Task 8: Verify the pre-commit gate actually blocks a regression** — introduce a
      deliberate visible change, stage it, attempt a commit, confirm it's blocked with
      annotated diff PNGs in `visual/diff/`, confirm a non-UI commit is NOT gated, then revert
      the deliberate regression.
- [ ] **Task 9: Demo — 4 parallel hero variants** — ask for 4 short hero variant descriptions,
      create 4 git worktrees, dispatch 4 parallel implementation agents.
- [ ] **Task 10: Capture all 4 variants and assemble a comparison report** — boot each
      variant's dev server on its own port, capture with the toolkit, copy captures into main
      repo, write report, present path + worktree cleanup command.

Full step-by-step detail for all of the above (exact commands, acceptance checks) lives in
`DXZ-Operating-System/docs/superpowers/plans/2026-08-03-visual-regression-loop.md` — read
Task 7 Steps 8–9 and Tasks 8–10 before resuming.

## Known noise in this repo (not part of this work)

Untracked at pause time and unrelated to the visual regression loop — do not sweep these
into a visual-regression commit: `.agents/`, `.claude-flow/`, `.codex/`, `.swarm/`,
`ruvector.db`. Left untouched.

## Quick resume checklist

1. `cd "DXZ Automation-web"`, confirm still on `feat/visual-regression-loop`
2. `npm run dev` in one terminal
3. `npm run visual:baseline` in another, review `visual/baseline/*.png`
4. `git add visual/baseline && git commit` (baseline commit)
5. Deliberately break a style, confirm `git commit` gets blocked, revert
6. Move on to the 4-variant demo (Tasks 9–10)
