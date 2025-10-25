// ==========================
// 🕷️ Tenebri MD — Plugin: Random Quotes
// 👑 Owner: MidknightMantra
// ==========================
import axios from 'axios'
import { cmd } from '../command.js'

cmd({
  pattern: 'quote',
  desc: 'Get a random inspiring quote.',
  category: 'fun',
  react: '💬',
  filename: import.meta.url
},
async (conn, mek, m, { reply }) => {
  try {
    const response = await axios.get('https://api.quotable.io/random')
    const quote = response.data
    const message = `
💬 "${quote.content}"
— ${quote.author}

🕷️ Tenebri-MD
`
    reply(message)
  } catch (e) {
    console.error('QUOTE ERROR', e)
    reply('⚠️ Could not fetch a quote. Please try again later.')
  }
})
