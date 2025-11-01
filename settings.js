/**
 * =========================================================
 *  🕯️ TENEBRI — Core Settings
 *  Version: 1.5.0
 *  Author: Midknight Mantra
 *  Description:
 *    In the silence of the void, he found the truth—
 *    cold, cruel, and inevitable.
 * =========================================================
 */

require("dotenv").config();

const settings = {
  // Basic Identity
  packname: "Tenebri",
  author: "Midknight Mantra",
  botName: "Tenebri",

  // Ownership
  botOwner: "Midknight Mantra",
  ownerNumber: process.env.OWNER_NUMBER || "254758925674", // fallback if .env missing

  // API Keys (never commit real ones)
  giphyApiKey: process.env.GIPHY_API_KEY || "qnl7ssQChTdPjsKta2Ax2LMaGXz303tq",

  // Operational Mode
  commandMode: process.env.COMMAND_MODE || "public", // "public" | "private" | "admin-only"
  maxStoreMessages: 20,
  storeWriteInterval: 10000, // in ms

  // Meta
  description:
    "In the silence of the void, he found the truth—cold, cruel, and inevitable.",
  version: "1.6.1",
  updateZipUrl:
    "https://github.com/MidknightMantra/Tenebri/archive/refs/heads/main.zip",

  // Theming & Persona
  theme: {
    emoji: {
      skull: "💀",
      candle: "🕯️",
      raven: "🪶",
      eye: "👁️",
    },
    palette: {
      primary: "#0a0a0a",
      accent: "#3a8296",
      blood: "#8b0000",
    },
    tone: {
      greet: "🕯️ Greetings, wanderer. The void acknowledges you.",
      farewell: "💀 The night reclaims your presence.",
      error: "👁️ The ritual faltered. Try again, mortal.",
    },
  },

  // Personality toggles — adapt Tenebri’s behavior or tone
  persona: {
    aggressive: false, // if true, uses sharper, commanding tone
    poetic: true, // if true, uses lore-infused lines
    silentMode: false, // when true, suppresses non-essential messages
  },
};

module.exports = settings;
