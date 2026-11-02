# sarveshk.dev

A static engineering portfolio served by GitHub Pages. The site is organized under one domain:

- `/` — introduction and selected professional work.
- `/work/` — professional work overview and three dedicated Cisco case studies.
- `/projects/` — two selected independent project stories, with a link to GitHub for the wider collection.
- `/resume/` — the full résumé and one-page PDF.

## Local preview

From the repository root, run:

```sh
python -m http.server 4173 --bind 127.0.0.1
```

Open `http://127.0.0.1:4173/`. The work, project, and résumé routes are available at `/work/`, `/projects/`, and `/resume/`.

## Content and design

The homepage is a concise profile: who Sarvesh is, how his career developed, selected Cisco contributions, and the engineering principles he cares about. The full résumé and independent repository collection live on their own routes.

Cisco experience is separate from independent projects. Personal contributions and shared team context are identified explicitly. The Projects page links to GitHub for work beyond the two featured stories.

The résumé route is a static copy of the built site from `sarveshk-dev`, with its assets and current one-page PDF. When the résumé changes, regenerate it from that repository, copy the updated build into `resume/`, and review the root, project, and résumé routes together.

Build the résumé application with `npm run generate:pdf` and `npm run build` in the adjacent `sarveshk-dev` checkout. Then run `node scripts/sync-resume.mjs` here. The script copies `dist/resume.html`, its assets, and the PDF into `/resume/`. The source repository's root redirect stays separate from its résumé application entry point.

The old catalogue files are retained as historical code, but are not loaded by the Projects page. Do not run the collection sync script to replace the curated page.

The homepage links to each project introduction. The project page preserves the Radar edition preview and local 1DotDev command example at their existing fragment URLs. The latter uses fictional in-memory notes; it never connects to the private assistant. `projects/radar-sample.json` records a dated published edition and a pinned source commit so it remains attributable as newer editions are published.

The résumé build renders complete HTML from its typed content. Browser JavaScript enhances navigation rather than constructing the page. Experience, projects, and education appear in that order. The shared social image is generated with `npm run generate:og` in `sarveshk-dev` and copied by the résumé sync step.

Run `node --test scripts/*.test.mjs` for content and behavior checks. `Verify published website` runs on main-branch publishes (or manual dispatch) and waits for the served content to match the release before continuing. It then checks the visitor journey and note example in Chrome, responsive layouts, and the résumé with JavaScript disabled. Its browser dependency is locked under `checks/`; hosting settings stay unchanged. A failed browser check uploads a diagnostic screenshot.

## Publishing and rollback

Keep `CNAME` set to `sarveshk.dev`. GitHub Pages publishes the repository root through its existing `pages build and deployment` process; these files do not need a new Actions workflow.

`resume.sarveshk.dev` forwards to `/resume/`. The Sites-hosted project copy remains available; `/projects/` is the canonical collection. DNS and hosting settings are not part of this repository.

To roll back, revert the published commit through normal Git history and let Pages redeploy. Do not force-push or change domain settings as part of a content rollback.
