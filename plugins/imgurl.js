// plugins/imgurl.js
// Upload or rehost images (Imgur preferred, telegra.ph fallback)
// Supports: .imgurl <url>  OR  reply to an image/video/sticker with .imgurl
import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'
import path from 'path'
import { cmd } from '../command.js'

const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID || null
const TELEGRAPH_UPLOAD = 'https://telegra.ph/upload'

// helper: upload buffer to Imgur (anonymous)
async function uploadToImgur(buffer) {
  if (!IMGUR_CLIENT_ID) throw new Error('No IMGUR_CLIENT_ID configured')
  const b64 = buffer.toString('base64')
  const res = await axios.post(
    'https://api.imgur.com/3/image',
    { image: b64, type: 'base64' },
    { headers: { Authorization: `Client-ID ${IMGUR_CLIENT_ID}` } }
  )
  if (res?.data?.success) return res.data.data.link
  throw new Error('Imgur upload failed')
}

// helper: upload buffer to telegra.ph
async function uploadToTelegraph(buffer, filename = 'file') {
  const form = new FormData()
  form.append('file', buffer, { filename })
  const res = await axios.post(TELEGRAPH_UPLOAD, form, { headers: form.getHeaders(), maxContentLength: Infinity, maxBodyLength: Infinity })
  // telegra.ph returns array of { src: '/file/...' }
  if (Array.isArray(res.data) && res.data[0]?.src) {
    // telegraph returns path without host
    return 'https://telegra.ph' + res.data[0].src
  }
  throw new Error('Telegraph upload failed')
}

// helper: detect simple image url
function isImageUrl(url) {
  if (!url) return false
  try {
    const u = new URL(url)
    const ext = path.extname(u.pathname).toLowerCase()
    if (ext && ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.mp4'].includes(ext)) return true
    // known hosts we accept as already hosted
    if (u.hostname.includes('imgur.com') || u.hostname.includes('cdn.wallpapersafari.com') || u.hostname.includes('i.imgur.com') || u.hostname.includes('telegra.ph')) return true
  } catch (e) {
    return false
  }
  return false
}

cmd({
  pattern: 'imgurl',
  desc: 'Upload/rehost an image. Usage: .imgurl <url> OR reply to an image/video/sticker with .imgurl',
  category: 'util',
  react: '🖼️',
  filename: import.meta.url
}, async (conn, mek, m, { from, q, args, reply }) => {
  try {
    await m.react?.('🕸️').catch(() => {})
    // 1) if user supplied url
    let targetUrl = q?.trim()
    let buffer = null
    let filename = `tenebri_${Date.now()}.jpg`

    if (targetUrl && isImageUrl(targetUrl)) {
      // if it's already an acceptable host, just return it
      const parsed = new URL(targetUrl)
      if (parsed.hostname.includes('imgur.com') || parsed.hostname.includes('cdn.wallpapersafari.com') || parsed.hostname.includes('i.imgur.com') || parsed.hostname.includes('telegra.ph')) {
        return reply(`✅ Hosted URL:\n${targetUrl}`)
      }
      // otherwise download the remote image to buffer then rehost
      const res = await axios.get(targetUrl, { responseType: 'arraybuffer', timeout: 20000 })
      buffer = Buffer.from(res.data)
      // try to extract extension for filename
      const ext = path.extname(parsed.pathname) || '.jpg'
      filename = `tenebri_${Date.now()}${ext}`
    } else {
      // 2) if the user replied to an image/video/sticker message, download it
      // the `m` param is your wrapped sms() result in your system; fallback to mek if needed
      const quoted = m.quoted || mek?.message?.extendedTextMessage?.contextInfo?.quotedMessage
      // In some setups, the original message object is in mek (prefix differs). We'll attempt a few ways:
      const messageObj = mek || m
      // Determine if user replied to a media message
      let quotedMsg = null
      try {
        quotedMsg = (messageObj && messageObj.quoted) ? messageObj.quoted : (messageObj && messageObj.message && messageObj.message.extendedTextMessage && messageObj.message.extendedTextMessage.contextInfo && messageObj.message.extendedTextMessage.contextInfo.quotedMessage) ? messageObj.message.extendedTextMessage.contextInfo.quotedMessage : null
      } catch (e) {
        quotedMsg = null
      }

      // prefer `m.quoted` or `mek.quoted` which some wrappers provide
      if (!buffer && messageObj && messageObj.quoted && (messageObj.quoted.type === 'image' || messageObj.quoted.type === 'video' || messageObj.quoted.type === 'sticker' || messageObj.quoted.type === 'document')) {
        // try download via conn.downloadMediaMessage or conn.downloadContentFromMessage
        try {
          // baileys v6: conn.downloadContentFromMessage(m.message, type)
          // message object shape varies; try a few methods
          const quotedFull = messageObj.quoted?.message || messageObj.quoted
          const ctype = Object.keys(quotedFull)[0] // e.g., 'imageMessage'
          const mediaType = ctype?.replace('Message', '') // 'image', 'video', etc.
          // attempt v6 download function names
          if (conn.downloadContentFromMessage) {
            const stream = await conn.downloadContentFromMessage(quotedFull, mediaType)
            const chunks = []
            for await (const chunk of stream) chunks.push(chunk)
            buffer = Buffer.concat(chunks)
          } else if (conn.downloadAndProcessProfilePicture) {
            // fallback - unlikely
            buffer = Buffer.from([])
          } else if (conn.downloadMediaMessage) {
            // older wrapper helper
            buffer = await conn.downloadMediaMessage(quotedFull)
            if (buffer && buffer.buffer) buffer = buffer.buffer
          }
        } catch (e) {
          // ignore and continue
          buffer = null
        }
      }

      // if still no buffer, try to find attachment in the original message itself
      if (!buffer) {
        try {
          const original = mek?.message || m?.message || {}
          const type = Object.keys(original)[0]
          if (type && (type.includes('image') || type.includes('video') || type.includes('sticker') || type.includes('document'))) {
            // try to download
            if (conn.downloadContentFromMessage) {
              const stream = await conn.downloadContentFromMessage(original, type.replace('Message', ''))
              const chunks = []
              for await (const chunk of stream) chunks.push(chunk)
              buffer = Buffer.concat(chunks)
            } else if (conn.downloadMediaMessage) {
              buffer = await conn.downloadMediaMessage(original)
              if (buffer && buffer.buffer) buffer = buffer.buffer
            }
          }
        } catch (e) {
          buffer = null
        }
      }

      if (!buffer) {
        return reply('❗ No valid image/video/sticker found. Use `.imgurl <url>` or reply to an image/video/sticker with `.imgurl`')
      }
    }

    // Now we have buffer (or we previously downloaded it to buffer). Rehost it.
    let hosted = null
    let errors = []

    // 1) Try Imgur if configured
    if (IMGUR_CLIENT_ID && buffer) {
      try {
        hosted = await uploadToImgur(buffer)
        return reply(`✅ Uploaded to Imgur:\n${hosted}`)
      } catch (e) {
        errors.push(`Imgur: ${e.message}`)
      }
    }

    // 2) Try telegra.ph
    if (buffer) {
      try {
        hosted = await uploadToTelegraph(buffer, filename)
        return reply(`✅ Uploaded to telegra.ph:\n${hosted}`)
      } catch (e) {
        errors.push(`telegra.ph: ${e.message}`)
      }
    }

    // 3) If we only had a direct URL and we couldn't rehost, return original
    if (targetUrl) return reply(`⚠️ Couldn't rehost, but here's the original URL:\n${targetUrl}\n\nErrors: ${errors.join(' | ')}`)

    // final fallback
    return reply(`❌ Upload failed. Errors: ${errors.join(' | ')}`)
  } catch (err) {
    console.error('[IMGURL ERROR]', err)
    try { await m.react?.('❌').catch(() => {}) } catch {}
    return reply(`❌ Error: ${err.message || err}`)
  }
})
