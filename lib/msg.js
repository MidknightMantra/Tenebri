// ==========================
// 💬 Tenebri — Message Utility
// 👑 Owner: MidknightMantra
// ==========================

import { jidNormalizedUser, downloadMediaMessage } from '@whiskeysockets/baileys'

/**
 * 📌 getContentType(message)
 * A helper to get the message type safely (e.g. conversation, imageMessage, videoMessage, etc.)
 */
export function getContentType(message) {
  if (!message || typeof message !== 'object') return ''
  return Object.keys(message)[0]
}

/**
 * 📨 sms(conn, mek)
 * Extracts and formats useful data from the incoming WhatsApp message
 */
export function sms(conn, mek) {
  const type = getContentType(mek.message)
  const content = JSON.stringify(mek.message)
  const from = mek.key.remoteJid
  const msgType = type
  const isGroup = from.endsWith('@g.us')
  const sender = mek.key.fromMe
    ? jidNormalizedUser(conn.user.id)
    : mek.key.participant || from
  const pushName = mek.pushName || 'Sin Nombre'

  const text =
    type === 'conversation'
      ? mek.message.conversation
      : type === 'extendedTextMessage'
      ? mek.message.extendedTextMessage.text
      : type === 'imageMessage' && mek.message.imageMessage.caption
      ? mek.message.imageMessage.caption
      : type === 'videoMessage' && mek.message.videoMessage.caption
      ? mek.message.videoMessage.caption
      : ''

  const quoted =
    type === 'extendedTextMessage' &&
    mek.message.extendedTextMessage?.contextInfo?.quotedMessage
      ? mek.message.extendedTextMessage.contextInfo
      : null

  return {
    from,
    msgType,
    text,
    sender,
    pushName,
    isGroup,
    mek,
    content,
    quoted
  }
}

/**
 * 📥 downloadQuotedMedia(quoted)
 * Downloads quoted media and returns buffer and MIME type
 */
export async function downloadQuotedMedia(quoted) {
  try {
    if (!quoted?.quotedMessage) return null
    const mimeType = getContentType(quoted.quotedMessage)
    const buffer = await downloadMediaMessage(
      {
        message: quoted.quotedMessage,
        key: quoted.stanzaId ? { id: quoted.stanzaId } : {}
      },
      'buffer',
      {},
      { logger: console }
    )
    return { buffer, mimeType }
  } catch (err) {
    console.error('❌ Failed to download quoted media:', err)
    return null
  }
}
