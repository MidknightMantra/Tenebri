// ==========================
// 🕷️ Tenebri MD — Plugin: Facebook Downloader
// 👑 Owner: MidknightMantra
// ==========================
import { cmd } from '../command.js'
import { igdl } from 'ruhend-scraper'

cmd({
  pattern: 'fb',
  desc: '📽️ Download Facebook videos easily.',
  category: 'download',
  react: '📥',
  filename: import.meta.url
},
async (conn, mek, m, { args, reply }) => {
  try {
    if (!args[0]) return reply('❗ Usage: `.fb <facebook_url>`')

    await m.react('🕒')
    let res
    try {
      res = await igdl(args[0])
    } catch (error) {
      console.error('[FB ERROR: SCRAPER]', error)
      return reply('⚠️ Failed to fetch video data.')
    }

    const result = res.data
    if (!result || result.length === 0) return reply('🚫 No results found.')

    const videoData =
      result.find(i => i.resolution === '720p (HD)') ||
      result.find(i => i.resolution === '360p (SD)')

    if (!videoData) return reply('❌ No downloadable video found.')

    await m.react('✅')
    const caption = `
🕸️ *T͟E͟N͟E͟B͟R͟I͟ ͟M͟D͟ - Facebook Downloader* 🕸️

📽️ Resolution: ${videoData.resolution}
🔗 Source: Facebook
✨ Darkness delivers your video.
`

    await conn.sendMessage(m.chat, {
      video: { url: videoData.url },
      caption,
      fileName: 'tenebri_fb.mp4',
      mimetype: 'video/mp4'
    }, { quoted: mek })
  } catch (e) {
    console.error('[FB COMMAND ERROR]', e)
    reply(`❌ ${e.message}`)
  }
})
