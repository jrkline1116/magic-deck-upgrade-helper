# Upgrade Scraper

Import your Commander decks and find upgrades from new card releases: cards that do the same job for less mana, or a stronger job for the same mana, with current prices.

**Three modes**
- **New set**: checks one release (plus its Commander precons) against your deck.
- **Coming back**: every new card printed since the date you last played.
- **Full review**: any Commander-legal card, for a deck you just built.

**Two ways to judge upgrades**
- **Free**: matches cards by role (ramp, draw, removal…), mana cost and EDHREC popularity. No account needed.
- **AI review**: optional. Uses your own Anthropic API key, which is stored only in your browser and sent only to Anthropic.

## Setup (GitHub Pages)
1. Create a repo and upload `index.html`, `manifest.webmanifest`, `sw.js`, `icon-192.png`, `icon-512.png`.
2. Settings → Pages → Deploy from branch → `main` / root.
3. Open the Pages URL. On a phone, use "Add to Home Screen" to install it.

## Importing decks
Paste an export from Moxfield, Archidekt, MTGGoldfish or Arena. Put your commander under a `Commander` line, or pick it after import. Archidekt links also work when Archidekt allows browser requests; if not, paste the text export.

## Data
Card data, images and prices come from the [Scryfall API](https://scryfall.com/docs/api). Decks, role tags and your API key are saved in your browser's local storage only.

Unofficial Fan Content permitted under the Wizards of the Coast Fan Content Policy. Not approved or endorsed by Wizards.

☕ [Buy me a coffee](https://buymeacoffee.com/jrkline1116)
