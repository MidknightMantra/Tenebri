// ==========================
// 🕷️ Tenebri MD — Plugin: Fun Facts
// 👑 Owner: MidknightMantra
// ==========================

import axios from 'axios'
import { cmd } from '../command.js'

cmd({
  pattern: 'fact',
  desc: '🧠 Get a random fun fact',
  react: '🤓',
  category: 'fun',
  filename: import.meta.url
},
async (conn, mek, m, { reply }) => {
  try {
    // 🌐 Fetch random fun fact
    const url = 'https://uselessfacts.jsph.pl/random.json?language=en'
    const response = await axios.get(url)
    const fact = response.data.text

    // 🕸️ Tenebri-styled fact message
    const funFact = `
🧠 *Random Fun Fact* 🕸️

${fact}

✨ Knowledge hides even in the shadows.
    `

    return reply(funFact)
  } catch (e) {
    console.error('[FACT ERROR]', e)
    reply('⚠️ An error occurred while fetching a fun fact. Please try again later.')
  }
})
