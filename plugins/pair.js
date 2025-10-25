// ==========================
// 🕷️ Tenebri MD — Plugin: Pairing Code Generator
// 👑 Owner: MidknightMantra
// ==========================

import { cmd } from '../command.js'
import config from '../config.js'

cmd({
  pattern: 'pair',
  desc: 'Generate a new WhatsApp pairing code',
  category: 'owner',
  fromMe: true, // ✅ Only bot owner can use
  react: '📲',
  filename: import.meta.url
}, async (conn, mek, m, { reply }) => {
  try {
    const phone = (config.PHONE_NUMBER || '').replace(/[^\d]/g, '')
    if (!phone) {
      return reply('⚠️ Please set `PHONE_NUMBER` in your `.env` or `config.js` first.')
    }

    if (conn.authState.creds.registered) {
      return reply('✅ *Session already active.* No need to generate a pairing code.')
    }

    const code = await conn.requestPairingCode(phone)

    reply(`🕸️ *T͟E͟N͟E͟B͟R͟I͟ ͟-͟ Pairing Code* 🕸️

📲 *Your Code:* \`\`\`${code}\`\`\`

👉 Open *WhatsApp* → *Linked Devices* → *Link with phone number* and enter the code above to pair this session.

⚠️ This code will expire soon. Use it immediately.`)
  } catch (err) {
    console.error('[PAIR COMMAND ERROR]', err)
    reply('❌ Failed to generate pairing code.\nPlease check your network or try again later.')
  }
})
