// ==========================
// 🕷️ Tenebri MD — Plugin: Random Video (Pexels API)
// 👑 Owner: MidknightMantra
// ==========================

import axios from 'axios'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { cmd } from '../command.js'
import config from '../config.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

cmd({
  pattern: 'rvideo',
  desc: 'Fetch and send a random video from Pexels.',
  category: 'fun',
  react: '🎥',
  filename: import.meta.url
}, async (conn, mek, m, { from, reply }) => {
  try {
    // 🎬 Notify the user
    await conn.sendMessage(from, { text: '⏳ *Summoning shadows... fetching a random video* 🕷️' }, { quoted: mek })

    // 🛰️ Pexels API Request
    const randomPage = Math.floor(Math.random() * 100) + 1
    const apiUrl = `https://api.pexels.com/videos/search?query=random&per_page=1&page=${randomPage}`
    const res = await axios.get(apiUrl, { headers: { Authorization: config.PEXELS_API_KEY } })

    const video = res.data.videos?.[0]
    if (!video || !video.video_files || video.video_files.length === 0) {
      throw new Error('No video found. Try again.')
    }

    const videoUrl = video.video_files[0].link
    const videoTitle = video.user?.name || 'Unknown Creator'

    // 📥 Download video temporarily
    const tempPath = path.join(__dirname, `tenebri_temp_${Date.now()}.mp4`)
    const writer = fs.createWriteStream(tempPath)
    const responseVideo = await axios.get(videoUrl, { responseType: 'stream' })

    responseVideo.data.pipe(writer)

    writer.on('finish', async () => {
      await conn.sendMessage(from, { text: '✅ *Dark media forged successfully.*' }, { quoted: mek })

      const caption = `
🕸️ *T͟E͟N͟E͟B͟R͟I͟ ͟-͟ ͟R͟A͟N͟D͟O͟M͟ ͟V͟I͟D͟E͟O͟* 🕸️

🎥 *Creator:* ${videoTitle}
📡 *Source:* Pexels

✨ The shadows breathe in motion.
      `.trim()

      await conn.sendMessage(from, {
        video: { url: tempPath },
        caption,
        fileName: `tenebri_random.mp4`,
        mimetype: 'video/mp4'
      }, { quoted: mek })

      // 🧹 Clean up temp file
      fs.unlinkSync(tempPath)
    })

    writer.on('error', (err) => {
      console.error('[VIDEO WRITE ERROR]', err)
      reply(`❌ Failed to write video: ${err.message}`)
    })
  } catch (e) {
    console.error('[RVIDEO ERROR]', e)
    reply(`❌ Error fetching video: ${e.message}`)
  }
})
