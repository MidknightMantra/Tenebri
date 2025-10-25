// ==========================
// 🕷️ Tenebri MD — Plugin: Alive
// 👑 Owner: MidknightMantra
// ==========================
import { cmd } from '../command.js'

cmd({
  pattern: 'alive',
  desc: 'Check if Tenebri is alive.',
  category: 'main',
  react: '🕷️',
  filename: import.meta.url
},
async (conn, mek, m) => {
  const img = 'https://telegra.ph/file/adc46970456c26cad0c15.jpg'
  const message = `
🕸️ *TENEBRI MD IS ALIVE* 🕸️

👑 Owner: MidknightMantra
🕷️ Darkness is awake and listening.
`
  await conn.sendMessage(m.chat, {
    image: { url: img },
    caption: message
  }, { quoted: mek })
})
