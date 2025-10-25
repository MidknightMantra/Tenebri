// ==========================
// 🕷️ Tenebri MD — Plugin: Random Joke
// 👑 Owner: MidknightMantra
// ==========================

import axios from 'axios'
import { cmd } from '../command.js'

cmd({
  pattern: 'joke',
  desc: '😂 Get a random joke.',
  react: '🤣',
  category: 'fun',
  filename: import.meta.url
}, async (conn, mek, m, { reply }) => {
  try {
    const url = 'https://official-joke-api.appspot.com/random_joke' // API for random jokes
    const response = await axios.get(url)
    const joke = response.data

    const jokeMessage = `😂 *Here’s a random joke for you!* 😂

*${joke.setup}*

${joke.punchline} 😄

🕸️ *T͟E͟N͟E͟B͟R͟I͟ ͟M͟D͟*
👑 Owner: MidknightMantra
💻 GitHub: github.com/MidknightMantra/Tenebri
`

    return reply(jokeMessage)
  } catch (e) {
    console.error('[JOKE ERROR]', e)
    return reply('⚠️ Couldn’t fetch a joke right now. Please try again later.')
  }
})
