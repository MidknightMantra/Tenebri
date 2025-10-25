// ==========================
// 🕷️ Tenebri MD — Plugin: Restart Bot
// 👑 Owner: MidknightMantra
// ==========================

import { cmd } from '../command.js'
import { sleep } from '../lib/utils.js'
import { exec } from 'child_process'

cmd({
  pattern: 'restart',
  desc: 'Restart the Tenebri bot instance (Owner only).',
  react: '💢',
  category: 'owner',
  filename: import.meta.url
}, async (conn, mek, m, { isOwner, reply }) => {
  try {
    if (!isOwner) return reply('❌ Only the owner can restart the bot.')

    reply('♻️ *Restarting Tenebri MD...*\n🕸️ The shadows will rise again.')

    await sleep(1500)

    exec('pm2 restart all', (error, stdout, stderr) => {
      if (error) {
        console.error('[RESTART ERROR]', error)
        return reply(`❌ Failed to restart:\n${error.message}`)
      }

      console.log('[RESTART SUCCESS]', stdout || stderr)
    })
  } catch (e) {
    console.error('[RESTART COMMAND ERROR]', e)
    reply(`❌ ${e.message}`)
  }
})
