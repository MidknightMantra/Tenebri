/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 🕷️ Tenebri MD - Config (ESM version)
// 👑 Owner: MidknightMantra
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import fs from 'fs'
import dotenv from 'dotenv'

// Load config.env if present
if (fs.existsSync('config.env')) {
  dotenv.config({ path: './config.env' })
}

/**
 * Convert text to boolean value safely.
 * Example: convertToBool("true") -> true
 */
function convertToBool(text, fault = 'true') {
  return String(text).toLowerCase() === String(fault).toLowerCase()
}

/**
 * Normalize a phone number string: removes all non-digits.
 */
function normalizeNumber(num) {
  return num.replace(/\D/g, '')
}

export default {
  // ==========================
  // 🔐 Core Config
  // ==========================
  SESSION_ID: process.env.SESSION_ID || '',
  BOT_NUMBER: normalizeNumber(process.env.BOT_NUMBER || '254758925674'),
  PHONE_NUMBER: normalizeNumber(process.env.PHONE_NUMBER || '254758925674'),

  // ==========================
  // 🌐 General Settings
  // ==========================
  MODE: process.env.MODE || 'public', // public | private | groups | inbox
  AUTO_READ_STATUS: convertToBool(process.env.AUTO_READ_STATUS || 'true'),
  READ_CMD: convertToBool(process.env.READ_CMD || 'true'),

  // ==========================
  // 🖼 Alive Message
  // ==========================
  ALIVE_IMG: process.env.ALIVE_IMG || 'https://telegra.ph/file/adc46970456c26cad0c15.jpg',
  ALIVE_MSG: process.env.ALIVE_MSG ||
    "👋 Hello there, *Tenebri* is alive and running!\n\n" +
    "👑 *Owner:* MidknightMantra\n\n" +
    "🖤 Thanks for using *Tenebri*\n\n" +
    "📎 GitHub: github.com/MidknightMantra",

  // ==========================
  // 👑 Owner Settings
  // ==========================
  OWNER_NUMBERS: (process.env.OWNER_NUMBERS || '254758925674')
    .split(',')
    .map(normalizeNumber)
    .filter(Boolean),
  OWNER_REACT: process.env.OWNER_REACT || '🔆',

  // ==========================
  // 🧰 APIs & Keys
  // ==========================
  OMDB_API_KEY: process.env.OMDB_API_KEY || '76cb7f39'
}
