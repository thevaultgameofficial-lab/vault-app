# VAULT MVP 0.1

A bilingual (English/French), mobile-first collection-game PWA prototype.

## Included
- Four screens: Home, Archive, Challenge, Profile
- 10 fixed artifacts unlocked by XP milestones
- One fixed daily logic challenge (+50 XP), once per local calendar day
- Local browser save (localStorage)
- English/French toggle
- PWA manifest and service worker for install/offline caching

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
