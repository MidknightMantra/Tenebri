// ==========================
// 🕷️ Tenebri MD — About Plugin
// 👑 Owner: MidknightMantra
// ==========================

import config from '../config.js'
import { runtime } from '../lib/functions.js' // you already have runtime in functions.js

let handler = async (m, { conn }) => {
  try {
    const { commands } = await import('../command.js')
    const uptime = runtime(process.uptime())
    const totalCommands = commands.length

    const pushname = m.pushName || m.sender.split('@')[0]

    const about = `
🕸️ *T͟E͟N͟E͟B͟R͟I͟ ͟M͟D͟ ͟-͟ ͟A͟B͟O͟U͟T͟* 🕸️

👤 *Hello, ${pushname}!*  

✨ *Tenebri* is a dark-themed, modern multi-purpose WhatsApp bot —
crafted to be fast, reliable, and powerful.

📊 *Bot Information:*
────────────────────
🕒 Uptime: ${uptime}
📦 Commands Loaded: ${totalCommands}
👑 Owner: MidknightMantra
📞 Owner Number: ${config.BOT_NUMBER}
💻 GitHub: https://github.com/MidknightMantra/Tenebri
────────────────────

🖤 Thank you for using *Tenebri MD*.
Your presence strengthens the darkness.

*© Tenebri MD — All rights reserved*
    `.trim()

    await conn.sendMessage(
      m.chat,
      {
        image: { url: config.ALIVE_IMG },
        caption: about
      },
      { quoted: m }
    )

    m.react('ℹ️')
  } catch (e) {
    console.error('[ABOUT PLUGIN ERROR]', e)
    await m.reply(`❌ Error: ${e.message}`)
  }
}

handler.help = ['about']
handler.tags = ['main']
handler.command = ['about', 'info']
handler.desc = 'Display information about the Tenebri bot'

export default handler
