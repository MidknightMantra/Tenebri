// ==========================
// 🐶 Tenebri MD — Plugin: Dog
// 👑 Owner: MidknightMantra
// ==========================

import axios from 'axios'
import { cmd } from '../command.js'

cmd({
  pattern: 'dog',
  desc: 'Fetch a random dog image.',
  category: 'fun',
  react: '🐶',
  filename: import.meta.url
},
async (conn, mek, m, { from, reply }) => {
  try {
    // 🐾 Fetch random dog image from Dog CEO API
    const apiUrl = 'https://dog.ceo/api/breeds/image/random'
    const response = await axios.get(apiUrl)
    const data = response.data

    // 🖼️ Send the image with a Tenebri theme caption
    await conn.sendMessage(from, {
      image: { url: data.message },
      caption: `🐶 *Random Dog* 🐾\n🕸️ *From Tenebri MD* 🕸️\n\n✨ May the goodest boy bless your day.`
    }, { quoted: mek })
  } catch (e) {
    console.error('[DOG ERROR]', e)
    reply('❌ Failed to fetch dog image. Please try again later.')
  }
})
