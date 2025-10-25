// ==========================
// 🕷️ Tenebri MD — Dark Edition
// 👑 Owner: MidknightMantra
// ==========================

import * as baileys from '@whiskeysockets/baileys'
import fs from 'fs'
import express from 'express'
import P from 'pino'
import dotenv from 'dotenv'
import qrcode from 'qrcode-terminal'
import { File } from 'megajs'
import path from 'path'

// 🧰 Utilities
import { getGroupAdmins, runtime, getPlatform, startTempCleaner } from './lib/utils.js'
import { sms } from './lib/msg.js'
import { backupSession } from './session-manager.js'

// ==========================
// 📦 Baileys Core
// ==========================
const {
  default: makeWASocket,
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  Browsers
} = baileys

// ==========================
// 🌿 Environment Variables
// ==========================
dotenv.config()

const BOT_NAME = process.env.BOT_NAME || 'Tenebri'
const OWNER_NAME = process.env.OWNER_NAME || 'MidknightMantra'
const OWNER_NUMBER = process.env.OWNER_NUMBER || '254700000000'
const MODE = process.env.MODE || 'public' // public | private | groups | inbox
const PREFIX = process.env.PREFIX || '.'
const SESSION_PATH = './auth_info_baileys'
const BOT_NUMBER = process.env.BOT_NUMBER || OWNER_NUMBER
const SESSION_ID = process.env.SESSION_ID || null

// 🧭 Global connection reference (used in hot reload)
let globalConn = null

// ==========================
// 🧹 Start Temp Cleaner
// ==========================
startTempCleaner('./temp', 10 * 60 * 1000)

// ==========================
// 💾 Restore Session from MEGA (Optional)
// ==========================
if (!fs.existsSync(`${SESSION_PATH}/creds.json`) && SESSION_ID) {
  console.log(`\x1b[36m🌐 Restoring session from MEGA link...\x1b[0m`)
  const file = File.fromURL(`https://mega.nz/file/${SESSION_ID}`)
  file.download((err, data) => {
    if (err) {
      console.error('❌ Session download failed:', err)
    } else {
      fs.mkdirSync(SESSION_PATH, { recursive: true })
      fs.writeFileSync(`${SESSION_PATH}/creds.json`, data)
      console.log(`✅ Session restored successfully.`)
    }
  })
}

// ==========================
// 🌐 Express Keep-Alive Server
// ==========================
const app = express()
const port = process.env.PORT || 8000
app.get('/', (req, res) => res.send(`🖤 ${BOT_NAME} by ${OWNER_NAME} is Alive 🕷️`))
app.listen(port, () => console.log(`✅ Server listening at http://localhost:${port}`))

// ==========================
// 🧩 Plugin Loader
// ==========================
export async function loadPlugins() {
  console.log(`\n📦 Loading Plugins...`)
  const folder = './plugins'
  const files = fs.readdirSync(folder).filter(f => f.endsWith('.js'))

  for (const file of files) {
    try {
      await import(`./plugins/${file}?update=${Date.now()}`)
      console.log(`✅ Loaded: ${file}`)
    } catch (err) {
      console.error(`❌ Failed to load plugin: ${file}`, err)
    }
  }

  console.log(`✨ ${files.length} plugins loaded successfully\n`)
}

// ==========================
// 🌡️ Hot Reload Plugins + Owner Notify 🧠
// ==========================
fs.watch('./plugins', (event, filename) => {
  if (filename && filename.endsWith('.js')) {
    console.log(`♻️ Reloading plugin: ${filename}`)

    import(`./plugins/${filename}?update=${Date.now()}`)
      .then(async () => {
        console.log(`✅ Reloaded: ${filename}`)

        // 📩 Notify Owner if bot is connected
        if (globalConn) {
          await globalConn.sendMessage(`${OWNER_NUMBER}@s.whatsapp.net`, {
            text: `♻️ Plugin *${filename}* reloaded successfully ✅`
          })
        }
      })
      .catch(async (err) => {
        console.error(`❌ Reload failed: ${filename}`, err)

        if (globalConn) {
          await globalConn.sendMessage(`${OWNER_NUMBER}@s.whatsapp.net`, {
            text: `❌ Failed to reload plugin *${filename}*\n\`\`\`${err.message}\`\`\``
          })
        }
      })
  }
})

// ==========================
// 🤖 WhatsApp Connection
// ==========================
async function connectToWA() {
  console.log(`\n\x1b[35m[${BOT_NAME}]\x1b[0m 🕷️ Connecting to WhatsApp...`)

  const { state, saveCreds } = await useMultiFileAuthState(SESSION_PATH)
  const { version } = await fetchLatestBaileysVersion()

  const conn = makeWASocket({
    logger: P({ level: 'silent' }),
    printQRInTerminal: false,
    browser: Browsers.macOS('Tenebri'),
    auth: state,
    syncFullHistory: true,
    version
  })

  // 🔗 Store global connection reference
  globalConn = conn

  conn.ev.on('connection.update', async (update) => {
    const { connection, qr, lastDisconnect } = update

    if (qr) {
      console.log('\n==================================================')
      console.log(`📸 \x1b[36mQR Code Mode Enabled\x1b[0m`)
      console.log(`👉 Scan the QR with WhatsApp → Linked Devices`)
      console.log('==================================================')
      qrcode.generate(qr, { small: true })
    }

    if (connection === 'close') {
      const status = lastDisconnect?.error?.output?.statusCode
      if (status !== DisconnectReason.loggedOut) {
        console.log(`\x1b[31m❌ Connection closed (${status}), reconnecting in 5s...\x1b[0m`)
        setTimeout(connectToWA, 5000)
      } else {
        console.log(`\x1b[31m💀 Logged out. Please clear session or re-pair.\x1b[0m`)
      }
    } else if (connection === 'open') {
      console.log(`\x1b[32m✅ ${BOT_NAME} Connected to WhatsApp\x1b[0m`)
      console.log(`🧠 Platform: ${getPlatform()}`)
      await backupSession()
      sendStartupMessage(conn)
    }
  })

  conn.ev.on('creds.update', saveCreds)

  // ==========================
  // 📨 Message Handler
  // ==========================
  conn.ev.on('messages.upsert', async (m) => {
    try {
      const mek = m.messages[0]
      if (!mek.message) return

      const msg = sms(conn, mek)
      const body = msg.text || ''
      const isCmd = body.startsWith(PREFIX)
      const cmdName = isCmd ? body.slice(PREFIX.length).split(' ')[0].toLowerCase() : ''
      const args = body.trim().split(/ +/).slice(1)
      const q = args.join(' ')
      const from = msg.from
      const sender = msg.sender
      const senderNumber = sender.split('@')[0]
      const isGroup = msg.isGroup
      const botNumber2 = conn.user.id.split(':')[0]
      const groupMetadata = isGroup ? await conn.groupMetadata(from).catch(() => {}) : {}
      const groupAdmins = isGroup ? getGroupAdmins(groupMetadata.participants) : []
      const isBotAdmins = isGroup ? groupAdmins.includes(`${botNumber2}@s.whatsapp.net`) : false
      const isAdmins = isGroup ? groupAdmins.includes(sender) : false
      const isOwner = [OWNER_NUMBER, botNumber2].includes(senderNumber)
      const reply = (text) => conn.sendMessage(from, { text }, { quoted: mek })

      // ⚠️ Mode Restrictions
      if (!isOwner && MODE === 'private') return
      if (!isOwner && isGroup && MODE === 'inbox') return
      if (!isOwner && !isGroup && MODE === 'groups') return

      // ⚡ Command Execution
      if (isCmd) {
        const { commands } = await import(`./command.js`)
        const found = commands.find(c => c.pattern === cmdName)
        if (found) {
          await found.function(conn, mek, m, {
            from, args, q, reply, msg, sender, senderNumber,
            groupMetadata, groupAdmins, isBotAdmins, isAdmins, isOwner,
            PREFIX, isGroup
          })
          console.log(`⚡ Command executed: ${cmdName}`)
        } else {
          reply(`⚠️ Unknown command: *${cmdName}*`)
        }
      }
    } catch (err) {
      console.error('❌ Message handler error:', err)
    }
  })
}

// ==========================
// 🖤 Startup DM to Owner
// ==========================
async function sendStartupMessage(conn) {
  const up = runtime(process.uptime())
  const caption = `
🕷️ *${BOT_NAME} MD Connected Successfully* 🖤

👑 Owner: ${OWNER_NAME}
🛰 Mode: ${MODE}
⏳ Uptime: ${up}
🪟 Platform: ${getPlatform()}

Welcome to the darkness.
  `
  try {
    await conn.sendMessage(`${BOT_NUMBER}@s.whatsapp.net`, {
      image: { url: 'https://telegra.ph/file/adc46970456c26cad0c15.jpg' },
      caption
    })
  } catch (err) {
    console.error('❌ Failed to send startup message', err)
  }
}

// ==========================
// 🚀 Main Startup Function
// ==========================
async function main() {
  await loadPlugins()
  await connectToWA()
}

main().catch(err => {
  console.error('❌ Fatal Error in main():', err)
})
