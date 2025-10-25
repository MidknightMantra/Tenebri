// ==========================
// 🕷️ Tenebri MD — Command List Plugin
// 👑 Owner: MidknightMantra
// ==========================

let handler = async (m, { conn, usedPrefix }) => {
  try {
    // 🧠 Dynamically import command registry
    const { commands } = await import('../command.js')

    if (!commands || commands.length === 0) {
      return await m.reply('⚠️ No commands registered.')
    }

    // 🧾 Group commands by tag (category)
    const categorized = {}
    for (const cmd of commands) {
      const tags = cmd.tags || ['other']
      for (const tag of tags) {
        if (!categorized[tag]) categorized[tag] = []
        categorized[tag].push(cmd)
      }
    }

    // ✨ Build output string
    let list = `🕷️ *Tenebri MD Command List*\n\n`
    list += `⌨️ Prefix: *${usedPrefix}*\n`
    list += `📜 Total Commands: *${commands.length}*\n\n`

    for (const [tag, cmds] of Object.entries(categorized)) {
      list += `╭━━━⊰ *${tag.toUpperCase()}* ⊱━━━╮\n`
      cmds.forEach(cmd => {
        const pattern = Array.isArray(cmd.pattern) ? cmd.pattern[0] : cmd.pattern
        list += `┃ ✨ ${usedPrefix}${pattern}\n`
      })
      list += `╰━━━━━━━━━━━━━━━╯\n\n`
    }

    list += `🕸️ Type *${usedPrefix}help <command>* for detailed usage.\n`
    list += `👑 Owner: MidknightMantra`

    await conn.sendMessage(m.chat, { text: list.trim() }, { quoted: m })
    m.react('📜')
  } catch (e) {
    console.error('[LIST PLUGIN ERROR]', e)
    await m.reply('❌ Failed to load command list.')
  }
}

handler.help = ['list']
handler.tags = ['main']
handler.command = ['list', 'commands']
handler.desc = 'Show all available commands organized by category'

export default handler
