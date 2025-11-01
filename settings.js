/**
 * =========================================================
 *  🕯️ TENEBRI — Eternal Bindings
 *  Version: 1.6.4
 *  Author: Midknight Mantra
 *  Description:
 *    Forged in the abyss, Tenebri rises — brave sentinel of shadows,
 *    wielding unyielding truth against the void's cruel embrace.
 * =========================================================
 */

require("dotenv").config();

const settings = {
  // Arcane Identity
  packname: "Tenebri",
  author: "Midknight Mantra",
  botName: "Tenebri",

  // Dominion of the Void
  botOwner: "Midknight Mantra",
  ownerNumber: process.env.OWNER_NUMBER || "254758925674", // Fallback if the shadows hide the .env

  // Forbidden Keys (Guard them well, lest the abyss claim them)
  giphyApiKey: process.env.GIPHY_API_KEY || "qnl7ssQChTdPjsKta2Ax2LMaGXz303tq",

  // Vigilant Operations
  commandMode: process.env.COMMAND_MODE || "public", // "public" | "private" | "admin-only" — Choose your realm wisely
  maxStoreMessages: 20,
  storeWriteInterval: 10000, // In milliseconds, the rhythm of shadowed archives

  // Lore of the Sentinel
  description:
    "Forged in the abyss, Tenebri rises — brave sentinel of shadows, wielding unyielding truth against the void's cruel embrace.",
  version: "1.6.4",
  updateZipUrl:
    "https://github.com/MidknightMantra/Tenebri/archive/refs/heads/main.zip",

  // Shadows & Essences — Infuse the theme with dark valor
  theme: {
    emoji: {
      skull: "💀",
      candle: "🕯️",
      raven: "🪶",
      eye: "👁️",
      sword: "⚔️", // Added for brave theme
      moon: "🌑", // Enhanced spooky essence
    },
    palette: {
      primary: "#0a0a0a", // Eternal void
      accent: "#3a8296", // Mystic fog
      blood: "#8b0000", // Crimson valor
    },
    tone: {
      greet: "🕯️ Hail, brave wanderer. The abyss stirs at your call.",
      farewell: "⚔️ The shadows reclaim you. Until the next dawnless eve.",
      error: "👁️ A curse upon the rite! Invoke again, undaunted soul.",
    },
  },

  // Essence Toggles — Shape Tenebri’s spirit in the forge of night
  persona: {
    aggressive: false, // If true, commands with fierce, unyielding tone
    poetic: true, // If true, weaves responses with ancient lore and verse
    silentMode: false, // If true, whispers only the essentials, cloaked in mystery
    braveMode: true, // New: Enables motivational, courageous phrasing in replies
  },
};

module.exports = settings;