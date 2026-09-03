# open.ac.rs static GitHub Pages export

Generated from `open-ac-rs.sql`.

- 75 published public Joomla articles/pages exported.
- Main navigation converted to static HTML.
- News/conference Joomla module positions converted to static article lists.
- Static browser search added at `/pretrazivanje/`.
- `images/.gitkeep` is included so the images folder remains visible.

## Images
Copy the CONTENTS of the original Joomla `images` directory into this repository's `images` directory. Do not create `images/images/...`.

## Forms
The database contains Visforms modules. GitHub Pages cannot run Joomla/PHP forms, so those forms need a static-compatible replacement.

## Publish
1. Create a new GitHub repository.
2. Upload the CONTENTS of this folder to the repository root.
3. Confirm that `index.html` is at the repository root.
4. Go to Settings → Pages.
5. Choose Deploy from a branch.
6. Select `main` and `/ (root)`.
7. Save and wait for deployment.

Do NOT upload the SQL dump to the public repository.
