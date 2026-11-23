# VAULT MVP 0.1.1

A bilingual (English/French), mobile-first collection-game PWA prototype.

## Included
- Four screens: Home, Archive, Challenge, Profile
- 10 fixed artifacts unlocked by XP milestones
- One fixed daily logic challenge (+50 XP), with the full sequence and clear instructions; once per local calendar day
- Local browser save (localStorage)
- English/French toggle
- PWA manifest and versioned service worker with app-shell offline caching

## Run locally
Open `index.html` in a browser for a basic preview. For service-worker/PWA testing, serve the folder over localhost (for example with VS Code Live Server or `python -m http.server 8000`) and visit `http://localhost:8000`.

## Publish free with GitHub Pages
1. Create/sign in to a GitHub account.
2. Create a new **public** repository named `vault-app`.
3. Upload the contents of this folder to the repository root (not the enclosing folder).
4. In the repository, open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Choose branch **main** and folder **/(root)**, then Save.
7. Wait for the Pages deployment. The site URL appears in Settings → Pages.
8. Open that URL on Android Chrome. Use the browser menu → **Install app** or **Add to Home screen** if offered.

## Important limitations
- Progress is stored only in the current browser/device. Clearing site data can erase it.
- There are no accounts, server database, global leaderboard, purchases, cash prizes, or payments.
- The challenge is a fixed prototype puzzle, not a secure competitive game. Do not offer prizes based on its score.
- The Google Fonts import is optional; the app uses fallback fonts if offline.


## Update an existing GitHub Pages deployment
1. Extract the new ZIP.
2. Open your existing `vault-app` repository and choose **Add file → Upload files**.
3. Upload the contents of the `vault-mvp` folder to the repository root, allowing GitHub to replace files with the same names.
4. Commit the changes to `main`.
5. Open the published URL while online and reload it. Wait a few seconds, then reload once more so the updated service worker takes control.
6. To test offline, open VAULT once while online, then enable Airplane mode and reopen the installed app.

The service worker only controls the published HTTPS site (or localhost during development), not a `file://` preview. The Google Fonts import is optional; the app uses local fallback fonts when offline.
