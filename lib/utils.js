// ==========================
// 🧠 Tenebri Utils
// ==========================

import os from 'os'

/**
 * 🌍 Detects the OS/platform name
 */
export function getPlatform() {
  return `${os.type()} ${os.release()} (${os.arch()})`
}

/**
 * 🧑 Extract group admins
 */
export function getGroupAdmins(participants) {
  const admins = []
  for (const p of participants) {
    if (p.admin) admins.push(p.id)
  }
  return admins
}

/**
 * ⏳ Convert seconds to readable runtime string
 */
export function runtime(seconds) {
  seconds = Number(seconds)
  const d = Math.floor(seconds / (3600 * 24))
  const h = Math.floor((seconds % (3600 * 24)) / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)

  const dDisplay = d > 0 ? `${d}d ` : ''
  const hDisplay = h > 0 ? `${h}h ` : ''
  const mDisplay = m > 0 ? `${m}m ` : ''
  const sDisplay = s > 0 ? `${s}s` : ''
  return dDisplay + hDisplay + mDisplay + sDisplay
}

/**
 * 🧹 Start periodic temp folder cleaner
 */
import fs from 'fs'
import path from 'path'
export function startTempCleaner(tempPath = './temp', interval = 10 * 60 * 1000) {
  if (!fs.existsSync(tempPath)) fs.mkdirSync(tempPath, { recursive: true })
  setInterval(() => {
    const files = fs.readdirSync(tempPath)
    for (const file of files) {
      fs.unlink(path.join(tempPath, file), err => {
        if (err) console.error(`⚠️ Failed to delete temp file: ${file}`)
      })
    }
  }, interval)
}
