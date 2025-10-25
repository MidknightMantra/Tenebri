// ==========================
// 🕷️ Tenebri MD — Help Command
// 👑 Owner: MidknightMantra
// ==========================

let handler = async (m, { conn, args, usedPrefix }) => {
  try {
    // 🧠 Dynamically import the commands from the main registry
    const { commands } = await import('../command.js')

    if (!commands || commands.length === 0) {
      return await m.reply('⚠️ No commands found.')
    }

    // 📌 If user typed `.help <command>`
    if (args[0]) {
      const name = args[0].toLowerCase()
      const cmd =
        commands.find(c => c.pattern === name) ||
        commands.find(c => c.alias && c.alias.includes(name))

      if (!cmd) {
        return await m.reply(`❌ Command *${name}* not found.`)
      }

      let info = `🕷️ *Command Help*\n\n`
      info += `✨ *Name:* ${cmd.pattern}\n`
      if (cmd.alias) info += `🪄 *Alias:* ${cmd.alias.join(', ')}\n`
      if (cmd.desc) info += `📝 *Description:* ${cmd.desc}\n`
      if (cmd.tags) info += `📂 *Category:* ${cmd.tags.join(', ')}\n`
      info += `⌨️ *Usage:* ${usedPrefix}${cmd.pattern}\n`

      return await m.reply(info.trim())
    }

    // 📜 Otherwise, list all commands by category
    const categorized = {}
    for (const c of commands) {
      const tags = c.tags || ['misc']
      for (const t of tags) {
        if (!categorized[t]) categorized[t] = []
        categorized[t].push(c)
      }
    }

    let menu = `🕷️ *Tenebri MD — Command List*\n\n`
    menu += `⌨️ Prefix: *${usedPrefix}*\n`
    menu += `📜 Total Commands: *${commands.length}*\n\n`

    for (const [tag, cmds] of Object.entries(categorized)) {
      menu += `╭━━━⊰ *${tag.toUpperCase()}* ⊱━━━╮\n`
      cmds.forEach(c => {
        menu += `┃ ✨ ${usedPrefix}${c.pattern}`
        if (c.desc) menu += ` — ${c.desc}`
        menu += `\n`
      })
      menu += `╰━━━━━━━━━━━━━━━╯\n\n`
    }

    menu += `🕸️ Type *${usedPrefix}help <command>* for details.\n`
    menu += `👑 Owner: MidknightMantra`

    await conn.sendMessage(m.chat, { text: menu.trim() }, { quoted: m })
    m.react('🕷️')
  } catch (e) {
    console.error('[HELP PLUGIN ERROR]', e)
    await m.reply('❌ Error displaying help menu.')
  }
}

handler.help = ['help [command]']
handler.tags = ['main']
handler.command = ['help', 'h']
handler.desc = 'Show all commands or help for a specific command'

export default handler
