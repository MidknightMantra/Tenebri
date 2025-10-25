// ==========================
// 🧰 Tenebri Utility Functions
// 👑 Owner: MidknightMantra
// ==========================

import axios from 'axios'
import fs from 'fs'
import path from 'path'

// ==========================
// 📥 getBuffer — Download file as Buffer
// ==========================
export async function getBuffer(url, options = {}) {
  try {
    const res = await axios({
      method: 'get',
      url,
      headers: {
        'DNT': 1,
        'Upgrade-Insecure-Request': 1
      },
      responseType: 'arraybuffer',
      ...options
    })
    return res.data
  } catch (err) {
    console.error(`❌ [getBuffer] Failed to fetch ${url}:`, err.message)
    throw err
  }
}

// ==========================
// 🧑 getGroupAdmins — Returns array of admin IDs
// ==========================
export function getGroupAdmins(participants) {
  const admins = []
  for (const p of participants) {
    if (p.admin) admins.push(p.id)
  }
  return admins
}

// ==========================
// ⏳ runtime — Format seconds into human-readable time
// ==========================
export function runtime(seconds) {
  seconds = Number(seconds)
  const d = Math.floor(seconds / (3600 * 24))
  const h = Math.floor((seconds % (3600 * 24)) / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)

  const dDisplay = d > 0 ? `${d} ${d === 1 ? 'day' : 'days'}, ` : ''
  const hDisplay = h > 0 ? `${h} ${h === 1 ? 'hour' : 'hours'}, ` : ''
  const mDisplay = m > 0 ? `${m} ${m === 1 ? 'minute' : 'minutes'}, ` : ''
  const sDisplay = s > 0 ? `${s} ${s === 1 ? 'second' : 'seconds'}` : ''
  return (dDisplay + hDisplay + mDisplay + sDisplay).replace(/,\s*$/, '')
}

// ==========================
// 🧹 ensureDir — Make sure a directory exists
// ==========================
export function ensureDir(dir) {
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
  } catch (err) {
    console.error(`❌ [ensureDir] Failed to create ${dir}:`, err.message)
  }
}

// ==========================
// 🧼 startTempCleaner — Periodically clean temp folder
// ==========================
export function startTempCleaner(tempPath = './temp', interval = 10 * 60 * 1000) {
  ensureDir(tempPath)
  setInterval(() => {
    const files = fs.readdirSync(tempPath)
    for (const file of files) {
      const filePath = path.join(tempPath, file)
      fs.unlink(filePath, (err) => {
        if (err) console.error(`⚠️ Failed to delete temp file: ${file}`, err.message)
      })
    }
  }, interval)
  console.log(`🧹 Temp cleaner active for: ${tempPath}`)
}
