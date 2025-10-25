// ==========================
// 🧠 Tenebri MD - AI Command
// 👑 Owner: MidknightMantra
// ==========================

import config from '../config.js'
import { cmd } from '../command.js'
import { fetchJson } from '../lib/utils.js'

cmd({
  pattern: 'ai',
  desc: "Talk to Tenebri's AI.",
  react: '🧠',
  category: 'other',
  filename: import.meta.url
},
async (conn, mek, m, {
  q, pushname, senderNumber, reply
}) => {
  try {
    // 🕸️ Empty input check
    if (!q || q.trim().length === 0) {
      return reply(
        "🕸️ *Tenebri AI*: Please ask me something...\nExample: `.ai tell me a dark story`"
      )
    }

    // 🌐 Call AI API
    const url = `https://chatgptforprabath-md.vercel.app/api/gptv1?q=${encodeURIComponent(q)}`
    const data = await fetchJson(url)

    // ⚠️ Handle API failure
    if (!data || !data.data) {
      return reply("⚠️ Tenebri AI could not respond right now. Please try again later.")
    }

    // 🤖 Response formatting
    const response = `🕸️ *Tenebri AI*\n\n👤 *${pushname || senderNumber}:* ${q}\n\n🤖 *AI:* ${data.data}`
    reply(response)

  } catch (e) {
    console.error('[AI ERROR]', e)
    reply('❌ An error occurred while processing your request. Please try again later.')
  }
})
