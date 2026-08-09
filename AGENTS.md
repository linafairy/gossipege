# Project Instructions & Rules

## General Guidelines
- **Application Scope**: "Сплетница: ЕГЭ Пунктуация" — interactive Gossip Girl-themed quest for Russian High School Exam (ЕГЭ) Punctuation (Tasks 16–21).
- **Design Aesthetic**: Premium editorial dark theme (`#0A0A0B` background, gold `#C5A059` accents, burgundy `#800020` highlights, elegant serif font Playfair Display / Cormorant Garamond, crisp Plus Jakarta Sans body text).
- **Strict Grading Rule**: To complete a room and unlock its reward key & sticker, all questions in the room must be answered with 100% accuracy without any mistakes. If mistakes are made, the user must restart the room's questions.

## Build & Deployment Standards
- **Node Environment**: Use Node.js version 22 in CI/CD workflows (`.github/workflows/deploy.yml`) to prevent Node 20 deprecation issues.
- **Package Lock**: Always maintain `package-lock.json` tracked in version control for reliable `npm ci` builds.
- **Deploy Script**: Include `"deploy": "npm run build && gh-pages -d dist"` script in `package.json`.
- **Single-File Bundling**: If `vite-plugin-singlefile` is introduced, ensure `{ viteSingleFile }` is correctly imported from `'vite-plugin-singlefile'`.
