// ==========================
// 🕷️ Tenebri MD — Main Menu Command
// 👑 Owner: MidknightMantra
// ==========================

import config from '../config.js'
import { cmd, commands } from '../command.js'
import { runtime } from '../lib/utils.js'

cmd(
  {
    pattern: 'menu',
    desc: 'Shows the main menu with categorized commands.',
    category: 'system'
  },
  async (conn, mek, { from, pushname, reply }) => {
    try {
      const username = pushname || 'User'
      const botName = config.BOT_NAME || 'Tenebri MD'
      const ownerName = config.OWNER_NAME || 'MidknightMantra'

      // 🕓 Time-based greeting
      const now = new Date()
      const hour = now.getHours()
      let greeting
      if (hour >= 5 && hour < 12) greeting = '🌅 Good Morning'
      else if (hour >= 12 && hour < 18) greeting = '☀️ Good Afternoon'
      else if (hour >= 18 && hour < 21) greeting = '🌆 Good Evening'
      else greeting = '🌙 Good Night'

      // 🕒 Format time and date
      const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true }
      const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
      const currentTime = now.toLocaleTimeString('en-US', timeOptions)
      const currentDate = now.toLocaleDateString('en-US', dateOptions)

      // 🧭 Command categories
      const menu = {
        main: { label: '🔧 Main Menu', list: '' },
        download: { label: '📥 Download Menu', list: '' },
        group: { label: '👥 Group Menu', list: '' },
        owner: { label: '🔒 Owner Menu', list: '' },
        convert: { label: '🔄 Convert Menu', list: '' },
        search: { label: '🔍 Search Menu', list: '' },
        fun: { label: '🎉 Fun Menu', list: '' },
        other: { label: '⚙️ Other Menu', list: '' }
      }

      // 🧾 Categorize commands
      for (const c of commands) {
        if (c.pattern && !c.dontAddCommandList) {
          const cat = menu[c.category] ? c.category : 'other'
          menu[cat].list += `.${c.pattern}\n`
        }
      }

      // 🕸️ Build the menu caption
      let madeMenu = `
🕷️👑 ${botName} 👑🕷️

${greeting}, *${username}* 👋
🕒 ${currentTime} | 📅 ${currentDate}

✨ Welcome to *${botName}* ✨

📊 *Bot Information*
────────────────────
🤖 *Bot Name:* ${botName}
👑 *Owner:* ${ownerName}
📞 *Bot Number:* ${config.BOT_NUMBER}
⏳ *Uptime:* ${runtime(process.uptime())}
────────────────────
`

      for (const key of Object.keys(menu)) {
        const section = menu[key]
        if (section.list.trim().length > 0) {
          const count = section.list.split('\n').filter(Boolean).length
          madeMenu += `${section.label} (${count})\n${section.list}\n`
        }
      }

      madeMenu += `
────────────────────
*© ${botName}*
👑 ${ownerName}
💻 github.com/MidknightMantra
`

      await conn.sendMessage(
        from,
        {
          image: { url: config.ALIVE_IMG },
          caption: madeMenu
        },
        { quoted: mek }
      )
    } catch (e) {
      console.error('[MENU ERROR]', e)
      reply(`❌ ${e.message}`)
    }
  }
)
