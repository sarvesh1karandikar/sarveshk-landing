# sarveshk.dev

A static engineering portfolio served by GitHub Pages. The site is organized under one domain:

- `/` — introduction and selected professional work.
- `/projects/` — searchable public repository collection, with a saved snapshot and an optional live refresh from GitHub.
- `/resume/` — the full résumé and one-page PDF.

## Local preview

From the repository root, run:

```sh
python -m http.server 4173 --bind 127.0.0.1
```

Open `http://127.0.0.1:4173/`. The project and résumé routes are available at `/projects/` and `/resume/`.

## Content and design

The homepage is a concise profile: who Sarvesh is, how his career developed, selected Cisco contributions, and the engineering principles he cares about. The full résumé and independent repository collection live on their own routes.

Cisco experience is separate from independent projects. Personal contributions and shared team context are identified explicitly. The project collection reads only public repositories from GitHub; the checked-in snapshot remains available if GitHub cannot be reached.

The résumé route is a static copy of the built site from `sarveshk-dev`, with its assets and current one-page PDF. When the résumé changes, regenerate it from that repository, copy the updated build into `resume/`, and review the root, project, and résumé routes together.

## Publishing and rollback

Keep `CNAME` set to `sarveshk.dev`. GitHub Pages publishes the repository root through its existing `pages build and deployment` process; these files do not need a new Actions workflow.

`resume.sarveshk.dev` forwards to `/resume/`. The Sites-hosted project copy remains available; `/projects/` is the canonical collection. DNS and hosting settings are not part of this repository.

To roll back, revert the published commit through normal Git history and let Pages redeploy. Do not force-push or change domain settings as part of a content rollback.
