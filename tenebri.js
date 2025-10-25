// ==========================
// 🕷️ Tenebri MD — Stable Core (ESM)
// 👑 Owner: MidknightMantra
// ==========================

import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason,
  jidNormalizedUser,
  getContentType,
  fetchLatestBaileysVersion,
  Browsers
} from '@whiskeysockets/baileys'

import { getBuffer, getGroupAdmins, runtime } from './lib/functions.js'
import fs from 'fs'
import P from 'pino'
import config from './config.js'
import qrcode from 'qrcode-terminal'
import axios from 'axios'
import { sms } from './lib/msg.js'
import { File } from 'megajs'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

// 🧭 Required for __dirname in ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const prefix = '.'
const ownerNumber = config.OWNER_NUMBERS
const sessionPath = path.join(__dirname, 'auth_info_baileys')
const port = process.env.PORT || 8000

// ==========================
// 💾 Restore Session from MEGA or fallback to QR
// ==========================
;(async () => {
  if (!fs.existsSync(`${sessionPath}/creds.json`)) {
    if (config.SESSION_ID) {
      console.log('🌐 No local session found. Restoring from MEGA...')
      try {
        const sessdata = config.SESSION_ID
        const file = File.fromURL(`https://mega.nz/file/${sessdata}`)
        await new Promise((resolve, reject) => {
          file.download((err, data) => {
            if (err) reject(err)
            else {
              fs.mkdirSync(sessionPath, { recursive: true })
              fs.writeFileSync(`${sessionPath}/creds.json`, data)
              console.log('✅ Session restored from MEGA successfully.')
              resolve()
            }
          })
        })
      } catch (err) {
        console.log('❌ Failed to restore session from MEGA:', err)
        console.log('⚠️ Falling back to QR login...')
      }
    } else {
      console.log('⚠️ No SESSION_ID provided — starting QR login mode...')
    }
  }
})()

// ==========================
// 🌐 Keep-alive server
// ==========================
const app = express()
app.get('/', (req, res) => res.send('🕷️ Tenebri MD is Alive ✅'))
app.listen(port, () => console.log(`✅ Server listening at http://localhost:${port}`))

// ==========================
// 🧩 Plugin Loader
// ==========================
export async function loadPlugins() {
  console.log('📦 Loading Plugins...')
  const folder = './plugins'
  if (!fs.existsSync(folder)) fs.mkdirSync(folder)

  const files = fs.readdirSync(folder).filter(f => f.endsWith('.js'))
  for (const file of files) {
    try {
      await import(`${folder}/${file}?update=${Date.now()}`)
      console.log(`✅ Loaded: ${file}`)
    } catch (err) {
      console.error(`❌ Failed to load ${file}`, err)
    }
  }
  console.log(`✨ ${files.length} plugins loaded successfully`)
}

// ==========================
// 🤖 WhatsApp Connection
// ==========================
async function connectToWA() {
  console.log('🕸️ Connecting Tenebri...')

  const { state, saveCreds } = await useMultiFileAuthState(sessionPath)
  const { version } = await fetchLatestBaileysVersion()

  const conn = makeWASocket({
    logger: P({ level: 'silent' }),
    printQRInTerminal: false,
    browser: Browsers.macOS('Tenebri'),
    syncFullHistory: true,
    auth: state,
    version
  })

  // 🔐 Handle connection
  conn.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update

    if (qr) {
      console.log('\n==================================================')
      console.log('📸 Scan this QR to log in')
      console.log('👉 Open WhatsApp → Linked Devices')
      console.log('==================================================')
      qrcode.generate(qr, { small: true })
    }

    if (connection === 'close') {
      const status = lastDisconnect?.error?.output?.statusCode
      if (status !== DisconnectReason.loggedOut) {
        console.log('⚠️ Reconnecting in 5 seconds...')
        setTimeout(connectToWA, 5000)
      } else {
        console.log('❌ Session logged out. Re-pair required.')
      }
    } else if (connection === 'open') {
      console.log('✅ Tenebri Connected to WhatsApp')
      await loadPlugins()
      sendStartupMessage(conn)
    }
  })

  conn.ev.on('creds.update', saveCreds)

  // ==========================
  // 📩 Message Handler
  // ==========================
  conn.ev.on('messages.upsert', async (mek) => {
    mek = mek.messages[0]
    if (!mek.message) return
    mek.message =
      getContentType(mek.message) === 'ephemeralMessage'
        ? mek.message.ephemeralMessage.message
        : mek.message

    // Auto-read statuses
    if (
      mek.key &&
      mek.key.remoteJid === 'status@broadcast' &&
      config.AUTO_READ_STATUS === 'true'
    ) {
      await conn.readMessages([mek.key])
    }

    const m = sms(conn, mek)
    const type = getContentType(mek.message)
    const from = mek.key.remoteJid
    const body =
      (type === 'conversation')
        ? mek.message.conversation
        : (type === 'extendedTextMessage')
          ? mek.message.extendedTextMessage.text
          : (type === 'imageMessage' && mek.message.imageMessage.caption)
            ? mek.message.imageMessage.caption
            : (type === 'videoMessage' && mek.message.videoMessage.caption)
              ? mek.message.videoMessage.caption
              : ''

    const isCmd = body.startsWith(prefix)
    const command = isCmd ? body.slice(prefix.length).trim().split(' ')[0].toLowerCase() : ''
    const args = body.trim().split(/ +/).slice(1)
    const q = args.join(' ')
    const isGroup = from.endsWith('@g.us')
    const sender = mek.key.fromMe
      ? (conn.user.id.split(':')[0] + '@s.whatsapp.net' || conn.user.id)
      : (mek.key.participant || mek.key.remoteJid)
    const senderNumber = sender.split('@')[0]
    const botNumber = conn.user.id.split(':')[0]
    const pushname = mek.pushName || 'Unknown'
    const isMe = botNumber.includes(senderNumber)
    const isOwner = ownerNumber.includes(senderNumber) || isMe
    const botNumber2 = await jidNormalizedUser(conn.user.id)
    const groupMetadata = isGroup ? await conn.groupMetadata(from).catch(() => {}) : ''
    const groupName = isGroup ? groupMetadata.subject : ''
    const participants = isGroup ? groupMetadata.participants : []
    const groupAdmins = isGroup ? getGroupAdmins(participants) : []
    const isBotAdmins = isGroup ? groupAdmins.includes(botNumber2) : false
    const isAdmins = isGroup ? groupAdmins.includes(sender) : false
    const reply = (teks) => conn.sendMessage(from, { text: teks }, { quoted: mek })

    // ⚔️ Mode restrictions
    if (!isOwner && config.MODE === 'private') return
    if (!isOwner && isGroup && config.MODE === 'inbox') return
    if (!isOwner && !isGroup && config.MODE === 'groups') return

    // 🧠 Command Execution
    const { commands } = await import('./command.js')
    const cmd =
      commands.find(c => c.pattern === command) ||
      commands.find(c => c.alias && c.alias.includes(command))

    if (isCmd && cmd) {
      if (cmd.react) conn.sendMessage(from, { react: { text: cmd.react, key: mek.key } })
      try {
        await cmd.function(conn, mek, m, {
          from, args, q, body, isCmd, command, sender,
          senderNumber, botNumber2, botNumber, pushname,
          isMe, isOwner, groupMetadata, groupName,
          participants, groupAdmins, isBotAdmins,
          isAdmins, reply
        })
      } catch (e) {
        console.error('[PLUGIN ERROR]', e)
        reply(`❌ Plugin Error:\n${e}`)
      }
    }
  })
}

// ==========================
// 🖤 Startup DM to Owner
// ==========================
function sendStartupMessage(conn) {
  const up = runtime(process.uptime())
  const msg = `
🕷️ *Tenebri MD Connected Successfully!* ✅

👑 Owner: ${ownerNumber}
⏳ Uptime: ${up}
⚔️ Prefix: ${prefix}

*Welcome to Tenebri Dark Mode.*
  `
  conn.sendMessage(config.BOT_NUMBER + '@s.whatsapp.net', {
    image: { url: 'https://telegra.ph/file/adc46970456c26cad0c15.jpg' },
    caption: msg
  })
}

// ==========================
// 🚀 Startup
// ==========================
setTimeout(connectToWA, 3000)
