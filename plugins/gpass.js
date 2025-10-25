// ==========================
// 🕷️ Tenebri MD — Plugin: Password Generator
// 👑 Owner: MidknightMantra
// ==========================
import crypto from 'crypto'
import { cmd } from '../command.js'

cmd({
  pattern: 'gpass',
  desc: 'Generate a strong and secure password.',
  category: 'tools',
  react: '🔐',
  filename: import.meta.url
},
async (conn, mek, m, { args, reply }) => {
  const length = args[0] ? parseInt(args[0]) : 16
  if (isNaN(length) || length < 8) {
    return reply('⚠️ Please provide a valid length for the password (minimum 8 characters). Example: `.gpass 16`')
  }

  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?'
  let password = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, charset.length)
    password += charset[randomIndex]
  }

  const notifyMsg = `
🕸️ *T͟E͟N͟E͟B͟R͟I͟ ͟M͟D͟ - Password Generator* 🕸️

✅ A strong password has been forged in the shadows.
🧠 *Length:* ${length} characters
⚔️ Keep it safe — trust no one.

⚠️ *This password will not be stored or retrievable again.*
  `

  await conn.sendMessage(m.chat, { text: notifyMsg }, { quoted: mek })
  await conn.sendMessage(m.chat, { text: `🔐 *Generated Password:*\n\`\`\`${password}\`\`\`` }, { quoted: mek })
})
