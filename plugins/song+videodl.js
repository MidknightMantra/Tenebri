// ==========================
// 🕷️ Tenebri MD — Plugin: YouTube Song + Video Downloader
// 👑 Owner: MidknightMantra
// ==========================
import { cmd } from '../command.js'
import fg from 'api-dylux'
import yts from 'yt-search'

cmd({
  pattern: 'song',
  desc: '🎵 Download songs from YouTube.',
  category: 'download',
  react: '🎧',
  filename: import.meta.url
},
async (conn, mek, m, { args, reply }) => {
  try {
    if (!args[0]) return reply('❗ Please provide a song title or URL.')

    const search = await yts(args.join(' '))
    const data = search.videos[0]
    const url = data.url

    const desc = `
🕸️ *T͟E͟N͟E͟B͟R͟I͟ ͟M͟D͟ - SONG DOWNLOADER* 🕸️

🎧 *Title:* ${data.title}
⏳ Duration: ${data.timestamp}
👀 Views: ${data.views}
📅 Uploaded: ${data.ago}
🔗 Link: ${data.url}
`

    await conn.sendMessage(m.chat, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek })

    const down = await fg.yta(url)
    await conn.sendMessage(m.chat, { audio: { url: down.dl_url }, mimetype: 'audio/mpeg' }, { quoted: mek })
  } catch (e) {
    console.log(e)
    reply(`${e}`)
  }
})

cmd({
  pattern: 'video',
  desc: '🎥 Download videos from YouTube.',
  category: 'download',
  react: '🎬',
  filename: import.meta.url
},
async (conn, mek, m, { args, reply }) => {
  try {
    if (!args[0]) return reply('❗ Please provide a video title or URL.')

    const search = await yts(args.join(' '))
    const data = search.videos[0]
    const url = data.url

    const desc = `
🕸️ *T͟E͟N͟E͟B͟R͟I͟ ͟M͟D͟ - VIDEO DOWNLOADER* 🕸️

🎥 *Title:* ${data.title}
⏳ Duration: ${data.timestamp}
👀 Views: ${data.views}
📅 Uploaded: ${data.ago}
🔗 Link: ${data.url}
`

    await conn.sendMessage(m.chat, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek })

    const down = await fg.ytv(url)
    await conn.sendMessage(m.chat, { video: { url: down.dl_url }, mimetype: 'video/mp4' }, { quoted: mek })
  } catch (e) {
    console.log(e)
    reply(`${e}`)
  }
})
