# Engineering Journal theme — v1.0.0

The homepage, project collection, and résumé route share a restrained monochrome system:

- Background `#0B0B0B`, text `#F5F2EB`, secondary text `#C9C6BF`.
- Georgia headlines, system sans-serif body, and monospace labels.
- A 1200px maximum content width, fine gray dividers, visible focus, and generous spacing.
- No gradients, colored accents, external fonts, background animation, or scroll-reveal gates.

## One source of truth

The canonical theme is `theme.css` in this repository. The `/resume/` route imports that file directly. The project collection keeps the same token values in its page stylesheet so its editorial layout remains self-contained.

The original `resume.sarveshk.dev` repository still has a local copy at `public/theme.css`. Keep that copy synchronized when the theme changes:

```sh
node scripts/sync-theme.mjs ../sarveshk-dev
node scripts/sync-theme.mjs ../sarveshk-dev --check
```

The helper verifies the destination repository before copying. Review the root site, project collection, and résumé route together before publishing theme changes.

Keep page-specific layouts in their existing stylesheets. New pages should reuse the shared colors, fonts, spacing, controls, and focus behavior while choosing a layout appropriate for their content.
