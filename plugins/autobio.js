// ==========================
// 🕷️ Tenebri MD — Plugin: AutoBio (Dark Edition)
// 👑 Owner: MidknightMantra
// ==========================

import { cmd } from '../command.js'
import fs from 'fs'
import path from 'path'
import moment from 'moment-timezone'
import axios from 'axios'

// 🕯️ Local dark quote fallback
const localQuotes = [
  "“We live in the ruins of the future.”",
  "“The abyss isn’t empty. It stares back.”",
  "“Hope is the cruelest torture.”",
  "“Even stars burn out in silence.”",
  "“Light dies, but the shadows remember.”",
  "“To feel nothing is the ultimate freedom.”",
  "“Monsters aren’t born. They’re made.”",
  "“In the end, we all become stories.”",
  "“The silence knows all your secrets.”",
  "“There’s comfort in the dark. It never lies.”"
]

// 💾 Persistent state file
const stateFile = path.join(process.cwd(), 'data', 'autobio_state.json')
let autoBioInterval = null
let autoBioStatus = false
let customTemplate = null
let useApi = true

// 🧠 Load previous state
if (fs.existsSync(stateFile)) {
  try {
    const saved = JSON.parse(fs.readFileSync(stateFile))
    autoBioStatus = saved.status || false
    customTemplate = saved.template || null
    useApi = saved.useApi ?? true
  } catch (err) {
    console.error('❌ Failed to load autobio state:', err)
  }
}

// 📝 Save state
function saveState() {
  fs.mkdirSync(path.dirname(stateFile), { recursive: true })
  fs.writeFileSync(stateFile, JSON.stringify({
    status: autoBioStatus,
    template: customTemplate,
    useApi
  }, null, 2))
}

// 🌐 Get quote (API or fallback)
async function getQuote() {
  if (useApi) {
    try {
      const res = await axios.get('https://api.quotable.io/random?tags=dark|wisdom|life')
      if (res.data?.content) return `“${res.data.content}” — ${res.data.author || 'Unknown'}`
    } catch {
      console.warn('⚠️ Failed to fetch from API, using local fallback.')
    }
  }
  return localQuotes[Math.floor(Math.random() * localQuotes.length)]
}

// 🕸️ Format template
function formatTemplate(quote) {
  const currentTime = moment().tz('Africa/Nairobi').format('HH:mm:ss')
  const currentDate = moment().tz('Africa/Nairobi').format('DD/MM/YYYY')
  const base = customTemplate || quote
  return base.replace('{time}', currentTime).replace('{date}', currentDate)
}

// 🕷️ Start autobio
function startAutoBio(conn) {
  if (autoBioInterval) clearInterval(autoBioInterval)
  autoBioInterval = setInterval(async () => {
    try {
      const quote = await getQuote()
      const newBio = formatTemplate(quote)
      await conn.updateProfileStatus(newBio)
      console.log(`[AUTOBIO] Updated: ${newBio}`)
    } catch (err) {
      console.error('❌ Error updating bio:', err)
    }
  }, 1000 * 60 * 30) // every 30 minutes
}

// 📩 Command
cmd({
  pattern: 'autobio',
  desc: 'Enable/disable automatic dark quote bio updates with live or local quotes.',
  category: 'owner',
  react: '🕷️',
  filename: import.meta.url  // ✅ ESM-safe
}, async (conn, mek, m, { q, args, isOwner, reply }) => {
  if (!isOwner) return reply('❌ Only the owner can use this command.')

  if (!q) {
    return reply(`🕸️ *AutoBio Settings*

.autobio on — Enable AutoBio
.autobio off — Disable AutoBio
.autobio set <text> — Set custom template
.autobio random — Revert to random quotes
.autobio api on/off — Toggle live API

📌 Placeholders:
{time} → Current time
{date} → Current date

Status: ${autoBioStatus ? '🟢 ON' : '🔴 OFF'}
Quote source: ${useApi ? '🌐 Live API' : '📜 Local'}
${customTemplate ? `📝 Template: ${customTemplate}` : '🕯️ Using random quotes'}`)
  }

  const option = args[0].toLowerCase()

  if (option === 'on') {
    if (autoBioStatus) return reply('✅ AutoBio is already running.')
    autoBioStatus = true
    saveState()
    startAutoBio(conn)
    return reply('🟢 AutoBio enabled. Dark quotes activated.')
  }

  if (option === 'off') {
    if (!autoBioStatus) return reply('❌ AutoBio is not active.')
    autoBioStatus = false
    clearInterval(autoBioInterval)
    autoBioInterval = null
    saveState()
    return reply('🔴 AutoBio disabled.')
  }

  if (option === 'set') {
    const template = q.replace('set', '').trim()
    if (!template) return reply('✍️ Example: .autobio set Tenebri 🕷️ | {time} | {date}')
    customTemplate = template
    saveState()
    return reply(`✅ Template updated to:\n\`${customTemplate}\``)
  }

  if (option === 'random') {
    customTemplate = null
    saveState()
    return reply('🌑 AutoBio reverted to random dark quotes.')
  }

  if (option === 'api') {
    const mode = args[1]?.toLowerCase()
    if (mode === 'on') {
      useApi = true
      saveState()
      return reply('🌐 Live API quotes *enabled*.')
    } else if (mode === 'off') {
      useApi = false
      saveState()
      return reply('📜 Live API quotes *disabled*. Using local quotes.')
    } else {
      return reply('⚙️ Use: .autobio api on/off')
    }
  }

  reply('❌ Invalid option.\nUse: .autobio on | off | set <text> | random | api on/off')
})

// ♻️ Auto restore after restart
export default (conn) => {
  if (autoBioStatus) {
    console.log('🕷️ AutoBio restored after restart.')
    startAutoBio(conn)
  }
}
