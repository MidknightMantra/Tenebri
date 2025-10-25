// ==========================
// 🕷️ Tenebri MD — Command Handler
// 👑 Owner: MidknightMantra
// ==========================

export const commands = []

export function cmd(info, func) {
  const data = { ...info }
  data.function = func
  if (!('dontAddCommandList' in data)) data.dontAddCommandList = false
  if (!data.desc) data.desc = ''
  if (!data.fromMe) data.fromMe = false
  if (!data.category) data.category = 'misc'
  if (!data.filename) data.filename = import.meta.url
  if (!data.pattern) throw new Error('command.pattern is required')
  commands.push(data)
  return data
}
