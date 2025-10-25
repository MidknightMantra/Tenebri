// ==========================
// 🕷️ Tenebri MD - About Plugin
// 👑 Owner: MidknightMantra
// ==========================

import config from '../config.js'
import { cmd, commands } from '../command.js'
import { runtime } from '../lib/utils.js'

cmd({
  pattern: 'about',
  desc: 'Displays Tenebri bot information.',
  react: 'ℹ️',
  category: 'main',
  filename: import.meta.url
}, 
async (conn, mek, m, {
  from, pushname, senderNumber, reply
}) => {
  try {
    const uptime = runtime(process.uptime())
    const totalCommands = commands.length

    const about = `
🕸️ *T͟E͟N͟E͟B͟R͟I͟ ͟M͟D͟ ͟-͟ ͟A͟B͟O͟U͟T͟* 🕸️

👤 *Hello, ${pushname || senderNumber}!*  

✨ Tenebri is a modern, dark-themed multi-purpose WhatsApp bot —  
crafted to be fast, reliable, and powerful.

📊 *Bot Information:*
────────────────────
🕒 Uptime: ${uptime}
📦 Commands Loaded: ${totalCommands}
👑 Owner: MidknightMantra
📞 Owner Number: ${config.BOT_NUMBER}
💻 GitHub: github.com/MidknightMantra
────────────────────

🖤 Thank you for using *Tenebri MD*.  
Your presence strengthens the darkness.

*© Tenebri MD — All rights reserved*
`

    await conn.sendMessage(
      from,
      {
        image: { url: config.ALIVE_IMG || 'https://telegra.ph/file/adc46970456c26cad0c15.jpg' },
        caption: about
      },
      { quoted: mek }
    )
  } catch (e) {
    console.error(e)
    reply(`❌ Error: ${e.message}`)
  }
})
