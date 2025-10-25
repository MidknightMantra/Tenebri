// ==========================
// 🕷️ Tenebri MD — Plugin: Instagram Downloader
// 👑 Owner: MidknightMantra
// ==========================
import { cmd } from '../command.js'
import { igdl } from 'ruhend-scraper'

function sanitizeFilename(str) {
  return str
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '_')
    .trim()
    .substring(0, 30)
}

cmd({
  pattern: 'ig',
  desc: '📸 Download Instagram reels, videos, and images.',
  category: 'download',
  react: '📥',
  filename: import.meta.url
},
async (conn, mek, m, { args, reply }) => {
  try {
    const link = args[0]
    if (!link || !link.includes('instagram.com')) {
      return reply('⚠️ Please provide a valid Instagram link.\nExample: `.ig https://www.instagram.com/reel/xyz123/`')
    }

    await m.react('🕒')
    let res
    try {
      res = await igdl(link)
    } catch (error) {
      console.error('[IGDL ERROR]', error)
      await m.react('❌')
      return reply('❌ Failed to fetch media. Maybe private or invalid link.')
    }

    const result = res.data
    if (!result || result.length === 0) {
      await m.react('❌')
      return reply('🚫 No media found.')
    }

    let captionText = result[0]?.caption || ''
    let safeFileName = captionText ? sanitizeFilename(captionText) : `tenebri_${Date.now()}`

    const caption = `
🕸️ *T͟E͟N͟E͟B͟R͟I͟ ͟M͟D͟ - Instagram Downloader* 🕸️

📝 *Caption*: ${captionText || 'No caption found'}
📸 *Media Count*: ${result.length}
📥 *Status*: ✅ Downloaded Successfully
🔗 *Source*: Instagram
`

    for (let i = 0; i < result.length; i++) {
      const media = result[i]
      const index = i + 1
      const fileName = `${safeFileName}_${index}`

      if (media.type === 'image') {
        await conn.sendMessage(m.chat, {
          image: { url: media.url },
          caption: `${caption}\n🖼️ File: ${fileName}.jpg`
        }, { quoted: mek })
      } else if (media.type === 'video') {
        await conn.sendMessage(m.chat, {
          video: { url: media.url },
          caption: `${caption}\n🎥 File: ${fileName}.mp4`,
          fileName: `${fileName}.mp4`,
          mimetype: 'video/mp4'
        }, { quoted: mek })
      }
    }

    await m.react('✅')
  } catch (e) {
    console.error('[INSTAGRAM ERROR]', e)
    await m.react('❌')
    reply(`❌ An error occurred: ${e.message}`)
  }
})
