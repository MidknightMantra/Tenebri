// ==========================
// 🕷️ Tenebri MD — Plugin: TikTok Downloader
// 👑 Owner: MidknightMantra
// ==========================
import { cmd } from '../command.js'
import { ttdl } from 'ruhend-scraper'

cmd({
  pattern: 'tt',
  desc: 'Download TikTok videos.',
  category: 'download',
  react: '🎥',
  filename: import.meta.url
},
async (conn, mek, m, { args, reply }) => {
  try {
    if (!args[0]) return reply('❗ Usage: `.tt <tiktok_url>`')

    await m.react('🕒')
    let res
    try {
      res = await ttdl(args[0])
    } catch (error) {
      console.error('[TIKTOK ERROR: SCRAPER]', error)
      return reply('⚠️ Failed to fetch video.')
    }

    const video = res?.video || res?.nowm
    if (!video) return reply('🚫 No video found for the provided link.')

    await m.react('✅')
    const caption = `
🕸️ *T͟E͟N͟E͟B͟R͟I͟ ͟M͟D͟ - TikTok Downloader* 🕸️

🎬 Your video has been pulled from the shadows.
🔗 Source: TikTok
✨ Enjoy the darkness.
`

    await conn.sendMessage(m.chat, {
      video: { url: video },
      caption,
      fileName: 'tenebri_tt.mp4',
      mimetype: 'video/mp4'
    }, { quoted: mek })
  } catch (e) {
    console.error('[TIKTOK COMMAND ERROR]', e)
    reply(`❌ ${e.message}`)
  }
})
