# sarveshk.dev

A static engineering portfolio. No framework, client JavaScript, external fonts, analytics, package installation, or build step is required.

## Local preview

From the repository root, run:

```sh
python -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173/. The page, styles, and both SVG illustrations are served directly. Native HTML disclosures and anchors work without JavaScript.

## Content and design

The homepage uses a monochrome editorial layout with system fonts. CSS switches the conceptual execution illustration to a readable vertical variant on mobile. Both illustrations represent responsibilities, not Cisco's internal deployment topology.

Cisco experience is separate from independent projects. Personal contributions and shared team context are identified explicitly. No confidential performance figures or production availability guarantees are included.

## Publishing and rollback

Keep `CNAME` set to `sarveshk.dev`. The separate `resume.sarveshk.dev` site is not managed by this repository.

The existing repository uses GitHub Pages' `pages build and deployment` process. Confirm its branch and folder in Settings → Pages before merging. Retain that configuration; no new Actions workflow is required for these static files.

The redesign is prepared locally for review. It must not be merged or published until approved. Check desktop and mobile previews and verify contact, résumé, and project destinations first.

The pre-redesign commit is `ca7513c78c593dc8e0b8e58d67911ce08c3736e0`. To undo a published redesign, revert its merge/commit through normal Git history and let Pages redeploy. Do not force-push or change domain settings.
