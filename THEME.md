# Engineering Journal theme — v1.0.0

The homepage and résumé use the same shared CSS foundations:
- Background: #0B0B0B; text: #F5F2EB; secondary text: #C9C6BF.
- Georgia headlines, system sans-serif body at 18px, monospace labels.
- A 1200px maximum content width, fine gray dividers, visible focus, and the same name/header treatment.
- No gradients, colored accents, external fonts, background animation, or scroll-reveal gates.

## One source, two local copies

The canonical file is `theme.css` in `sarvesh1karandikar/sarveshk-landing`.
The résumé includes an identical copy at `public/theme.css` in `sarvesh1karandikar/sarveshk-dev`.
Each site serves its own copy; neither site downloads CSS from the other domain.

From the landing checkout, after updating the canonical file:
```sh
node scripts/sync-theme.mjs ../sarveshk-dev
node scripts/sync-theme.mjs ../sarveshk-dev --check
```

Update the version comment for future theme releases. Commit the canonical change and the synchronized copy in paired pull requests. Review both previews together, then publish their approved changes together. The helper verifies the destination repository before copying.

Keep page-specific layouts in each site's existing stylesheet. New pages should reuse the shared colors, fonts, spacing, controls, and focus behavior while choosing a layout appropriate for their content.

The résumé's content data, PDF documents, domain configuration, package lock, and deployment workflow are preserved by this theme update.
