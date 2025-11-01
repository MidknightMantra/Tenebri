/**
 * =========================================================
 *  🕯️ TENEBRI — Configuration File
 *  Purpose:
 *    Defines API endpoints, keys, and base behavioral constants.
 *    These are Tenebri's conduits — do not expose them carelessly.
 * =========================================================
 */

require("dotenv").config();

/* 🌑 EXTERNAL API REGISTRY — Tenebri’s Gateways */
global.APIs = {
  xteam: "https://api.xteam.xyz",
  dzx: "https://api.dhamzxploit.my.id",
  lol: "https://api.lolhuman.xyz",
  violetics: "https://violetics.pw",
  neoxr: "https://api.neoxr.my.id",
  zenzapis: "https://zenzapis.xyz",
  akuari: "https://api.akuari.my.id",
  akuari2: "https://apimu.my.id",
  nrtm: "https://fg-nrtm.ddns.net",
  bg: "http://bochil.ddns.net",
  fgmods: "https://api-fgmods.ddns.net",
};

/* ⚙️ API KEYS — Stored in .env (fallbacks included for safety) */
global.APIKeys = {
  "https://api.xteam.xyz": process.env.XTEAM_KEY || "d90a9e986e18778b",
  "https://api.lolhuman.xyz":
    process.env.LOLHUMAN_KEY || "85faf717d0545d14074659ad",
  "https://api.neoxr.my.id": process.env.NEOXR_KEY || "yourkey",
  "https://violetics.pw": process.env.VIOLETICS_KEY || "beta",
  "https://zenzapis.xyz": process.env.ZENZ_KEY || "yourkey",
  "https://api-fgmods.ddns.net": process.env.FGMODS_KEY || "fg-dylux",
};

/* 🩸 BASE SETTINGS — Warning system and helpers */
const WARN_COUNT = 3;

/**
 * 🦇 getApiUrl(apiName, path, params)
 * Builds a complete API URL from the registry using the stored key.
 * @param {string} apiName - The shorthand key for the API (e.g., 'xteam', 'lol')
 * @param {string} path - The endpoint path (e.g., '/api/random')
 * @param {string} [params] - Optional extra query parameters
 * @returns {string} - Full URL including API key
 */
function getApiUrl(apiName, path = "", params = "") {
  const base = global.APIs[apiName];
  if (!base) throw new Error(`⚠️ Unknown API name: ${apiName}`);
  const key = global.APIKeys[base];
  if (!key) throw new Error(`⚠️ No API key configured for: ${apiName}`);
  const separator = params ? "&" : "";
  return `${base}${path}${path.includes("?") ? "&" : "?"}apikey=${key}${separator}${params}`;
}

/* 💀 Exported Configuration Object */
module.exports = {
  WARN_COUNT,
  APIs: global.APIs,
  APIKeys: global.APIKeys,
  getApiUrl,
};
