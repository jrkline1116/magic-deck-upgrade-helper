// Upgrade Scraper import helper (Cloudflare Worker, free tier).
// Lets the app read deck links from Moxfield and MTGGoldfish, which block
// other websites from reading their decks directly. Only these hosts are allowed,
// so it can't be used as an open proxy.
const ALLOWED_HOSTS = ["archidekt.com", "api2.moxfield.com", "www.mtggoldfish.com"];
const ALLOWED_ORIGIN = "https://jrkline1116.github.io";

export default {
  async fetch(request) {
    const cors = {
      "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Vary": "Origin"
    };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (request.method !== "GET") return new Response("GET only", { status: 405, headers: cors });

    let target;
    try { target = new URL(new URL(request.url).searchParams.get("url")); }
    catch { return new Response("Add ?url=<deck link>", { status: 400, headers: cors }); }
    if (target.protocol !== "https:" || !ALLOWED_HOSTS.includes(target.hostname)) {
      return new Response("That site isn't allowed", { status: 403, headers: cors });
    }

    const upstream = await fetch(target.toString(), {
      headers: {
        "User-Agent": "UpgradeScraper/1.0 (+https://jrkline1116.github.io/magic-deck-upgrade-helper/)",
        "Accept": "application/json, text/plain, */*"
      },
      cf: { cacheTtl: 300, cacheEverything: true }
    });
    return new Response(await upstream.text(), {
      status: upstream.status,
      headers: { ...cors, "Content-Type": upstream.headers.get("Content-Type") || "text/plain", "Cache-Control": "public, max-age=300" }
    });
  }
};
