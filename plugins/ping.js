// ==========================
// 🏓 Ping Command for Tenebri MD
// 👑 Owner: MidknightMantra
// ==========================
import os from 'os'
import { exec } from 'child_process'
import speed from 'performance-now'
import { cmd } from '../lib/commandHandler.js' // 👈 ✅ Correct path to handler

cmd(
  {
    pattern: 'ping',
    alias: ['speed', 'pong'],
    desc: 'Check bot latency, uptime, and system status',
    category: 'main',
  },
  async (m, conn) => {
    const fgg = {
      key: { fromMe: false, participant: `0@s.whatsapp.net`, remoteJid: 'status@broadcast' },
      message: {
        contactMessage: {
          displayName: 'GURU-BOT',
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:'GURU-BOT'\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
        },
      },
    }

    // ⏳ Send initial message
    const pingMsg = await conn.sendMessage(m.chat, { text: '🏓 Pinging...' }, { quoted: fgg })
    const start = speed()

    exec('neofetch --stdout', async (error, stdout) => {
      const end = speed()
      const latency = (end - start).toFixed(2)

      // 🕒 Uptime formatting
      const uptimeSeconds = process.uptime()
      const hours = Math.floor(uptimeSeconds / 3600)
      const minutes = Math.floor((uptimeSeconds % 3600) / 60)
      const seconds = Math.floor(uptimeSeconds % 60)
      const uptime = `${hours}h ${minutes}m ${seconds}s`

      // 💾 RAM usage
      const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2)
      const freeMem = (os.freemem() / 1024 / 1024 / 1024).toFixed(2)
      const usedMem = (totalMem - freeMem).toFixed(2)

      let response = `✅ *Pong!*\n`
      response += `⏳ *Latency:* ${latency} ms\n`
      response += `🕒 *Uptime:* ${uptime}\n`
      response += `💻 *RAM:* ${usedMem} GB / ${totalMem} GB\n`

      if (!error && stdout.trim().length > 0) {
        response += `\n\`\`\`${stdout.trim()}\`\`\``
      } else {
        response += `\n⚠️ neofetch not installed or failed to run`
      }

      // ✨ Edit original message
      await conn.relayMessage(
        m.chat,
        {
          protocolMessage: {
            key: pingMsg.key,
            type: 14,
            editedMessage: { conversation: response },
          },
        },
        {}
      )
    })
  }
)
