// ==========================
// 🕷️ Tenebri MD — Command Handler
// 👑 Owner: MidknightMantra
// ==========================

import { registerCommand } from './lib/commandRegistry.js'

/**
 * @type {Array<Object>}
 * This keeps a list of all registered commands
 * — Useful for menus, help commands, etc.
 */
export const commands = []

/**
 * Register a command
 * @param {Object} info - Command metadata (pattern, desc, category, etc.)
 * @param {Function} func - Command handler
 */
export function cmd(info, func) {
  const data = { ...info }

  // ✅ Basic validation
  if (!data.pattern) throw new Error('❌ command.pattern is required')

  // 🧠 Default metadata
  data.function = func
  if (!('dontAddCommandList' in data)) data.dontAddCommandList = false
  if (!data.desc) data.desc = ''
  if (!data.fromMe) data.fromMe = false
  if (!data.category) data.category = 'misc'
  if (!data.filename) data.filename = import.meta.url

  // 🪝 Register to command registry for fast lookup
  registerCommand(data.pattern, async (conn, mek, context) => {
    try {
      await func(conn, mek, context)
    } catch (err) {
      console.error(`❌ [COMMAND ERROR: ${data.pattern}]`, err)
      context.reply(`❌ Error executing *${data.pattern}* command.`)
    }
  }, {
    desc: data.desc,
    category: data.category,
    fromMe: data.fromMe
  })

  // 📝 Add to legacy command list (optional help/menu support)
  if (!data.dontAddCommandList) {
    commands.push(data)
  }

  return data
}
