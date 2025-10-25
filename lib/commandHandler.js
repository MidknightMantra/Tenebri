// ==========================
// 🧠 Tenebri Command Handler
// ==========================
import { commands } from './commandRegistry.js'

/**
 * Handles executing a registered command
 */
export async function handleCommand(cmdName, context) {
  const cmd = commands.find(
    c => c.pattern === cmdName || (c.alias && c.alias.includes(cmdName))
  )
  if (!cmd) return false
  try {
    if (cmd.react && context.conn) {
      await context.conn.sendMessage(context.from, {
        react: { text: cmd.react, key: context.mek.key }
      })
    }
    await cmd.function(context)
    return true
  } catch (e) {
    console.error(`❌ Command ${cmdName} failed:`, e)
    await context.reply(`❌ Error executing command: ${e.message}`)
    return true
  }
}
