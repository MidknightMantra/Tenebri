// ==========================
// 🕷️ Tenebri MD — Message Parser
// 👑 Owner: MidknightMantra
// ==========================

import { downloadContentFromMessage } from '@whiskeysockets/baileys'
import fs from 'fs'
import path from 'path'
import { getRandom } from './utils.js'

/**
 * 📨 Normalize incoming messages for easy handling
 * @param {object} conn - WhatsApp connection
 * @param {object} mek - Incoming Baileys message
 */
export function sms(conn, mek) {
  if (!mek) return {}

  const m = {}
  m.key = mek.key
  m.message = mek.message
  m.type = getContentType(mek.message)
  m.from = mek.key.remoteJid
  m.isGroup = m.from?.endsWith('@g.us') || false
  m.id = mek.key.id
  m.pushName = mek.pushName || 'Unknown'
  m.sender = mek.key.fromMe ? conn.user.id : (mek.key.participant || mek.key.remoteJid)
  m.text = extractText(mek.message)
  m.mentionedJid = extractMentionedJid(mek.message)
  m.isOwner = false // 👑 Set dynamically in handler

  // 🧾 Quoted message
  m.quoted = mek.message?.extendedTextMessage?.contextInfo?.quotedMessage
    ? parseQuoted(mek)
    : null

  m.isMedia = isMediaType(m.type)
  m.isQuotedMedia = m.quoted && isMediaType(m.quoted?.mtype)

  /**
   * 📥 Download message media
   */
  m.download = async (filename = getRandom()) => {
    if (!m.isMedia) return null
    return await downloadMedia(m.message[m.type], m.type, filename)
  }

  /**
   * 📥 Download quoted message media
   */
  m.downloadQuoted = async (filename = getRandom()) => {
    if (!m.isQuotedMedia) return null
    return await downloadMedia(m.quoted.msg[m.quoted.mtype], m.quoted.mtype, filename)
  }

  return m
}

/**
 * 🧾 Get message content type
 */
export function getContentType(message) {
  if (!message) return null
  const keys = Object.keys(message)
  return keys.length > 0 ? keys[0] : null
}

/**
 * 📝 Extract text content from message
 */
function extractText(message) {
  if (!message) return ''
  const mtype = getContentType(message)
  switch (mtype) {
    case 'conversation':
      return message.conversation
    case 'extendedTextMessage':
      return message.extendedTextMessage?.text || ''
    case 'imageMessage':
      return message.imageMessage?.caption || ''
    case 'videoMessage':
      return message.videoMessage?.caption || ''
    case 'buttonsResponseMessage':
      return (
        message.buttonsResponseMessage?.selectedButtonId ||
        message.buttonsResponseMessage?.selectedDisplayText ||
        ''
      )
    case 'listResponseMessage':
      return message.listResponseMessage?.singleSelectReply?.selectedRowId || ''
    case 'templateButtonReplyMessage':
      return message.templateButtonReplyMessage?.selectedId || ''
    default:
      return ''
  }
}

/**
 * 🧍 Extract mentioned JIDs from a message
 */
function extractMentionedJid(message) {
  const ctx = message?.extendedTextMessage?.contextInfo
  return ctx?.mentionedJid || []
}

/**
 * 🧾 Parse quoted message into normalized structure
 */
function parseQuoted(mek) {
  const context = mek.message.extendedTextMessage.contextInfo
  const quoted = context.quotedMessage
  const mtype = getContentType(quoted)

  return {
    key: {
      remoteJid: context.remoteJid || mek.key.remoteJid,
      fromMe: context.fromMe || false,
      id: context.stanzaId
    },
    mtype,
    msg: quoted,
    text: extractText(quoted),
    sender: context.participant || mek.key.remoteJid
  }
}

/**
 * 🖼 Check if a message type is media
 */
function isMediaType(type) {
  return ['imageMessage', 'videoMessage', 'audioMessage', 'stickerMessage', 'documentMessage'].includes(type)
}

/**
 * 📥 Helper: Download media to buffer or file
 */
async function downloadMedia(msg, type, filename) {
  const stream = await downloadContentFromMessage(msg, type.replace('Message', ''))
  let buffer = Buffer.from([])
  for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk])

  // Save to file if filename is provided
  if (filename) {
    const filePath = path.join('./temp', filename)
    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    fs.writeFileSync(filePath, buffer)
    return filePath
  }

  return buffer
}
