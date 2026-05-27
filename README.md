# ⚽ WC 2026 Sweepstakes

A full-featured World Cup 2026 sweepstakes app with snake draft, spinning wheel, fixture tracker and live leaderboard.

---

## Deploy to Vercel (free, takes ~5 minutes)

### Option A — Deploy via GitHub (recommended, easiest to update)

1. **Create a GitHub account** at github.com if you don't have one
2. **Create a new repository** — click the + icon → New repository → name it `wc2026-sweepstakes` → Create
3. **Upload this folder** — on the repo page click "uploading an existing file", drag everything in this zip, commit
4. **Go to vercel.com** → Sign up free with your GitHub account
5. Click **"Add New Project"** → Import your `wc2026-sweepstakes` repo
6. Leave all settings as default → click **Deploy**
7. In ~60 seconds you'll get a URL like `wc2026-sweepstakes.vercel.app` — share that with everyone!

### Option B — Deploy via Vercel CLI (no GitHub needed)

1. Install Node.js from nodejs.org if you don't have it
2. Open Terminal (Mac) or Command Prompt (Windows)
3. Run these commands one by one:

```bash
npm install -g vercel
cd path/to/this/folder
vercel
```

4. Follow the prompts — it'll give you a live URL in under a minute

---

## Local development (optional)

```bash
npm install
npm run dev
```

Then open http://localhost:5173

---

## How the app works

- **Setup** — enter 24 player names
- **Draft** — randomises a snake draft order (1st pick in Group A = last pick in Group B)
- **Wheel** — spinning wheel assigns teams; auto-assigns on landing, no confirm needed
- **Leaderboard** — live points updated as you enter fixture results
- **Fixtures** — all 104 games pre-loaded; click any to enter the score
- **Reset** — wipe everything for a trial run

## Scoring

| Stage | Points |
|---|---|
| Group stage win (Group A) | 3 pts |
| Group stage draw (Group A) | 1 pt |
| Group stage win (Group B) | 6 pts (×2) |
| Group stage draw (Group B) | 2 pts (×2) |
| Round of 32 win | 4 pts |
| Round of 16 win | 6 pts |
| Quarter-Final win | 8 pts |
| Semi-Final win | 10 pts |
| Final win (Champion) | 15 pts |

Data is saved to browser localStorage — it persists across sessions on the same device/browser. Whoever is updating scores should use the same browser each time.
