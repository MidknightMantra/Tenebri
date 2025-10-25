// ==========================
// 📜 Tenebri MD — Help Command
// 👑 Owner: MidknightMantra
// ==========================

import { cmd } from '../command.js'
import { listCommands } from '../lib/commandRegistry.js'

cmd(
  {
    pattern: 'help',
    desc: 'Displays the list of all available commands',
    category: 'system'
  },
  async (conn, mek, { reply, PREFIX }) => {
    const allCommands = listCommands()

    if (allCommands.length === 0) {
      return reply('⚠️ No commands found.')
    }

    // 🧭 Group commands by category
    const categorized = {}
    for (const c of allCommands) {
      const category = c.category || 'misc'
      if (!categorized[category]) categorized[category] = []
      categorized[category].push(c)
    }

    // 📝 Build help message
    let menu = `🕷️ *Tenebri MD Command List*\n\n`
    for (const [category, cmds] of Object.entries(categorized)) {
      menu += `*${category.toUpperCase()}* (${cmds.length})\n`
      for (const c of cmds) {
        menu += ` • ${PREFIX}${c.pattern}${c.desc ? ` — ${c.desc}` : ''}\n`
      }
      menu += `\n`
    }

    menu += `👑 *Owner:* MidknightMantra\n`
    menu += `🖥️ Type *.help [command]* for details (optional)\n`

    reply(menu)
  }
)
