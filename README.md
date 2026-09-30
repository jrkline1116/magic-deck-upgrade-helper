# Upgrade Scraper

Import your Commander decks and find upgrades from new card releases, with current prices. Free, no account or API key needed.

**Three modes**
- **New set**: checks one release (plus its Commander precons) against your deck.
- **Coming back**: every new card printed since the date you last played.
- **Full review**: any Commander-legal card, for a deck you just built.

**How upgrades are picked**
- **Fits your commander**: cards that EDHREC decks with your commander play a lot, swapped for the least-played card in the same role.
- **Cheaper mana**: does the same job (ramp, draw, removal…) for less mana.
- **More played**: same mana cost, played in far more Commander decks.
- **Fits your theme**: brand-new cards with no play data yet are matched to your deck's themes (Auras, tokens, counters, a creature type…) by reading their rules text. Once EDHREC catches up, they move to "Fits your commander."

## Setup (GitHub Pages)
1. Create a repo and upload `index.html`, `manifest.webmanifest`, `sw.js`, `icon-192.png`, `icon-512.png`.
2. Settings → Pages → Deploy from branch → `main` / root.
3. Open the Pages URL. On a phone, use "Add to Home Screen" to install it.

## Importing decks
Paste either a deck link or the decklist itself into the one import box. Text exports from Moxfield, Archidekt, MTGGoldfish and Arena all work. Put your commander under a `Commander` line, or pick it after import.

Links from Archidekt, Moxfield and MTGGoldfish work once the import helper is set up (below). Without it, only Archidekt links may work, and the app tells you how to paste the text export instead.

## Import helper (optional, free)
Moxfield and MTGGoldfish don't let other websites read their decks, so links from them need a tiny relay. `worker.js` is that relay. It also fetches EDHREC's commander data, and it only talks to those three deck sites and EDHREC.
1. Sign in at [dash.cloudflare.com](https://dash.cloudflare.com) → Workers & Pages → Create → Create Worker → name it `deck-import` → Deploy.
2. Click Edit code, replace everything with `worker.js`, and click Deploy.
3. Copy the worker's address (like `https://deck-import.yourname.workers.dev`).
4. In `index.html`, set `const IMPORT_HELPER = "https://deck-import.yourname.workers.dev";` and push.

The free tier covers 100,000 requests a day. Moxfield sometimes blocks automated requests; if a Moxfield link fails, paste its text export.

## Google Sheets buy list (optional)
Signed-in users get a spreadsheet in their own Google Drive with one tab per deck. They can save any upgrade to it, along with the card it replaces and a plan (Swap, Keep both, Undecided). Decks sync between devices through a hidden `_app` tab. The app uses the `drive.file` permission, so it can only see the spreadsheet it created.

One-time setup for the app owner:
1. [console.cloud.google.com](https://console.cloud.google.com) → create a project (e.g. "Upgrade Scraper").
2. APIs & Services → Library → enable **Google Sheets API** and **Google Drive API**.
3. Google Auth Platform (OAuth consent screen) → Get started → External. Add app name and support email.
4. Data Access → Add scopes: `.../auth/drive.file`, `openid`, `.../auth/userinfo.email`. All three are non-sensitive, so no Google review is needed.
5. Clients → Create client → Web application → Authorized JavaScript origins: `https://jrkline1116.github.io`. Copy the Client ID.
6. Audience → Publish app, so anyone can sign in (in Testing mode only listed test users can).
7. In `index.html`, set `const GOOGLE_CLIENT_ID = "<your client ID>";` and push.

The Client ID is public by design; no secret goes in the app. If it's left blank, the Sheets features stay hidden.

## Data
Card data, images and prices come from the [Scryfall API](https://scryfall.com/docs/api). Commander play data comes from [EDHREC](https://edhrec.com) (unofficial data, so it may change). Decks and cached card data are saved in your browser's local storage only.

Unofficial Fan Content permitted under the Wizards of the Coast Fan Content Policy. Not approved or endorsed by Wizards.

☕ [Buy me a coffee](https://buymeacoffee.com/jrkline1116)
