// ==========================
// 🕷️ Tenebri MD — Plugin: System & Uptime Info
// 👑 Owner: MidknightMantra
// ==========================

import os from 'os'
import { cmd } from '../command.js'
import { runtime } from '../lib/utils.js'
import config from '../config.js'

// ==========================
// 📡 SYSTEM STATUS
// ==========================
cmd({
  pattern: 'system',
  alias: ['status', 'botinfo'],
  desc: 'Check system uptime, RAM usage and bot info.',
  category: 'main',
  filename: import.meta.url
}, async (conn, mek, m, { reply }) => {
  try {
    const usedRam = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
    const totalRam = (os.totalmem() / 1024 / 1024).toFixed(2)
    const freeRam = (os.freemem() / 1024 / 1024).toFixed(2)

    const status = `
🕸️ *T͟E͟N͟E͟B͟R͟I͟ ͟-͟ ͟S͟Y͟S͟T͟E͟M͟ ͟S͟T͟A͟T͟U͟S͟* 🕸️

⏳ *Uptime:* ${runtime(process.uptime())}
💾 *RAM Used:* ${usedRam} MB
🧠 *RAM Free:* ${freeRam} MB
🖥️ *RAM Total:* ${totalRam} MB

💻 *Host:* ${os.hostname()}
⚡ *Platform:* ${os.platform().toUpperCase()}
🪙 *Architecture:* ${os.arch()}
👑 *Owner:* ${config.OWNER_NAME || 'MidknightMantra'}
    `.trim()

    return reply(status)
  } catch (e) {
    console.error('[SYSTEM ERROR]', e)
    reply(`❌ ${e.message}`)
  }
})

// ==========================
// ⏳ RUNTIME COMMAND
// ==========================
cmd({
  pattern: 'runtime',
  alias: ['uptime'],
  desc: 'Check bot uptime.',
  category: 'main',
  filename: import.meta.url
}, async (conn, mek, m, { reply }) => {
  try {
    const up = runtime(process.uptime())
    const msg = `🕒 *Uptime:* ${up}\n✨ The darkness never sleeps.`
    return reply(msg)
  } catch (e) {
    console.error('[RUNTIME ERROR]', e)
    reply(`❌ ${e.message}`)
  }
})
