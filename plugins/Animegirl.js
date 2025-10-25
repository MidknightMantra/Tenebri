// ==========================
// 👧 Tenebri MD - Anime Girl Command
// 👑 Owner: MidknightMantra
// ==========================

import axios from 'axios'
import { cmd } from '../command.js'

cmd({
  pattern: 'animegirl',
  desc: 'Fetch a random anime girl image.',
  category: 'fun',
  react: '👧',
  filename: import.meta.url
},
async (conn, mek, m, { from, reply }) => {
  try {
    // 🌸 Random anime girl image API
    const apiUrl = 'https://api.waifu.pics/sfw/waifu'
    const response = await axios.get(apiUrl)
    const data = response.data

    if (!data || !data.url) {
      return reply('⚠️ Failed to fetch image. Try again later.')
    }

    // 🖼️ Send image with dark caption
    await conn.sendMessage(from, {
      image: { url: data.url },
      caption: `👧 *Random Anime Girl* 👧\n🕸️ *From Tenebri MD* 🕸️\n\n✨ Embrace the beauty of the void.`
    }, { quoted: mek })

  } catch (e) {
    console.error('[ANIMEGIRL ERROR]', e)
    reply('❌ Failed to fetch anime image. Try again later.')
  }
})
