// ==========================
// 🕷️ Tenebri MD — Menu Plugin
// 👑 Owner: MidknightMantra
// ==========================

import moment from 'moment-timezone'

// 📌 Tenebri doesn't rely on global.db for users, so we’ll simplify.
let handler = async (m, { conn, usedPrefix }) => {
  try {
    // 🕒 Date and Time
    const d = new Date()
    const locale = 'en'
    const date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    const uptime = clockString(process.uptime() * 1000)

    // 🧑 User info
    const taguser = '@' + m.sender.split('@')[0]
    const greeting = ucapan()
    const quote = quotes[Math.floor(Math.random() * quotes.length)]

    // 🕸 Bot info
    const botName = '🕷️ Tenebri'
    const owner = '👑 MidknightMantra'
    const platform = process.platform

    // 📌 Menu message
    const text = `
╭━━━⊰ *${botName}* ⊱━━━╮
┃ 👋 Hello, ${taguser}!
┃ ${greeting}
┃
┃ 📜 ${quote}
╰━━━━━━━━━━━━━━━╯

╭━━━⊰ *TODAY* ⊱━━━╮
┃ 📅 Date: ${date}
┃ ⏰ Time: ${moment().tz('Africa/Nairobi').format('HH:mm:ss')}
╰━━━━━━━━━━━━━━━╯

╭━━━⊰ *BOT INFO* ⊱━━━╮
┃ 🤖 Bot Name: ${botName}
┃ 👑 Owner: ${owner}
┃ 🖥️ Platform: ${platform}
┃ ⌨️ Prefix: ${usedPrefix}
┃ ⏱️ Uptime: ${uptime}
╰━━━━━━━━━━━━━━━╯

🧠 Type *${usedPrefix}list* to see all commands
`

    // 🔘 Buttons
    const buttons = [
      ['🔍 Commands', `${usedPrefix}list`],
      ['⚡ Ping', `${usedPrefix}ping`]
    ]

    // 🌐 URL buttons
    const urls = [
      ['💻 GitHub', 'https://github.com/MidknightMantra'],
      ['🎥 YouTube', 'https://youtube.com'],
      ['🕸️ Tenebri', 'https://github.com/MidknightMantra/Tenebri']
    ]

    // 🖼 Logo
    const logo = 'https://telegra.ph/file/adc46970456c26cad0c15.jpg'

    // 📩 Send menu message with buttons and links
    await conn.sendButton(
      m.chat,
      text.trim(),
      '© Tenebri MD | 2025',
      logo,
      buttons,
      null,
      urls,
      m
    )

    m.react('🤖')
  } catch (e) {
    console.error('[MENU ERROR]', e)
    await m.reply(
      `🕷️ *Tenebri Menu*\n\nUse these commands:\n• ${usedPrefix}help - Show all commands\n• ${usedPrefix}ping - Check bot speed\n• ${usedPrefix}alive - Bot status`
    )
  }
}

handler.help = ['menu', 'help', 'h']
handler.tags = ['main']
handler.command = ['menu', 'help', 'h']
handler.desc = 'Show the bot menu with time, uptime, and command list'

export default handler

// 🕒 Format uptime
function clockString(ms) {
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}

// 🌅 Greeting function
function ucapan() {
  const hour = parseInt(moment().tz('Africa/Nairobi').format('HH'))
  if (hour >= 0 && hour < 4) return 'Good Night 🌙'
  if (hour >= 4 && hour < 12) return 'Good Morning 🌄'
  if (hour >= 12 && hour < 16) return 'Good Afternoon ☀️'
  if (hour >= 16 && hour < 19) return 'Good Evening 🌇'
  return 'Good Night 🌙'
}

// 📝 Quotes Array
const quotes = [
  "I'm not lazy, I'm just on my energy saving mode.",
  'Life is short, smile while you still have teeth.',
  'I may be a bad influence, but darn I am fun!',
  "I'm on a whiskey diet. I've lost three days already.",
  "Why don't some couples go to the gym? Because some relationships don't work out.",
  'I told my wife she should embrace her mistakes... She gave me a hug.',
  "I'm great at multitasking. I can waste time, be unproductive, and procrastinate all at once.",
  'The early bird can have the worm because worms are gross and mornings are stupid.',
  "I'm not saying I'm Wonder Woman, I'm just saying no one has ever seen me and Wonder Woman in the same room together.",
  "If life gives you lemons, make lemonade. Then find someone whose life has given them vodka and have a party!",
  'Some people just need a high-five. In the face. With a chair.'
]
