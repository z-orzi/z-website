# AI Maintenance Guide

## Tech Stack

Static HTML, CSS, and vanilla JavaScript.

## Architecture

- Page content and project metadata: `dist/index.html`
- Design tokens and responsive styling: `dist/styles.css`
- Language dictionary and interactions: `dist/app.js`
- Image assets: `dist/assets/`

## Maintenance Rules

1. Read only the file needed for the requested change.
2. Preserve the yellow, slate-blue, cream, and ink visual system.
3. Keep Chinese and English copy in sync.
4. Project statuses can only be `building`, `released`, or `archived` in this version.
5. Preserve the fixed-per-load glitch strings and the decode interaction.
6. Preserve keyboard access, reduced-motion handling, and mobile layouts.
7. Do not add a framework or dependency for a local change.

## Common Tasks

- Change project content: edit the matching `article.project-card` data attributes in `dist/index.html`.
- Change translations: edit the `translations` object in `dist/app.js`.
- Change colors: edit the custom properties at the top of `dist/styles.css`.
- Replace the hero image: add the asset under `dist/assets/` and update the image path and alt text in `dist/index.html`.
