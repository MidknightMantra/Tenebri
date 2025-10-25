// ==========================
// 🕷️ Tenebri MD — Utility Functions
// 👑 Owner: MidknightMantra
// ==========================

import os from 'os'
import axios from 'axios'
import fs from 'fs'
import fetch from 'node-fetch'
import path from 'path'

/**
 * 🧠 Detect platform / OS for bot info
 */
export function getPlatform() {
  const platform = os.platform()
  switch (platform) {
    case 'win32': return 'Windows 🪟'
    case 'darwin': return 'macOS 🍎'
    case 'linux': return 'Linux 🐧'
    default: return platform
  }
}

/**
 * 📥 Download buffer from URL
 */
export async function getBuffer(url, options = {}) {
  try {
    const res = await fetch(url, options)
    if (!res.ok) throw new Error(`Failed to fetch ${url} (${res.status})`)
    return Buffer.from(await res.arrayBuffer())
  } catch (err) {
    console.error(`❌ getBuffer error:`, err)
    throw err
  }
}

/**
 * 👑 Get group admins from participants
 */
export function getGroupAdmins(participants = []) {
  return participants
    .filter(p => p.admin === 'admin' || p.admin === 'superadmin')
    .map(p => p.id)
}

/**
 * 🎲 Generate random string or filename
 */
export function getRandom(ext = '') {
  return `${Math.floor(Math.random() * 10000)}${ext}`
}

/**
 * 🔸 Human friendly number format (e.g., 1.2K / 3.4M)
 */
export function h2k(num) {
  if (isNaN(num)) return '0'
  if (num < 1000) return num.toString()
  if (num < 1_000_000) return (num / 1000).toFixed(1) + 'K'
  if (num < 1_000_000_000) return (num / 1_000_000).toFixed(1) + 'M'
  return (num / 1_000_000_000).toFixed(1) + 'B'
}

/**
 * 🌐 Validate URL format
 */
export function isUrl(url) {
  const regex = /^(https?:\/\/[^\s/$.?#].[^\s]*)$/i
  return regex.test(url)
}

/**
 * ⏳ Convert seconds to readable uptime
 */
export function runtime(seconds) {
  seconds = Number(seconds)
  const d = Math.floor(seconds / (3600 * 24))
  const h = Math.floor((seconds % (3600 * 24)) / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)

  const parts = []
  if (d) parts.push(`${d} ${d === 1 ? 'day' : 'days'}`)
  if (h) parts.push(`${h} ${h === 1 ? 'hour' : 'hours'}`)
  if (m) parts.push(`${m} ${m === 1 ? 'minute' : 'minutes'}`)
  if (s) parts.push(`${s} ${s === 1 ? 'second' : 'seconds'}`)
  return parts.join(', ')
}

/**
 * 💤 Sleep helper
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 🌍 Fetch JSON from a URL easily
 */
export async function fetchJson(url, options = {}) {
  try {
    const res = await axios({
      method: options.method || 'GET',
      url,
      headers: options.headers || {},
      data: options.body || null
    })
    return res.data
  } catch (err) {
    console.error(`❌ fetchJson error:`, err)
    throw err
  }
}

/**
 * 🧾 Save buffer to file
 */
export async function saveBuffer(buffer, filename) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, buffer, (err) => {
      if (err) return reject(err)
      resolve(true)
    })
  })
}

/**
 * 🕒 Convert ms to hh:mm:ss
 */
export function formatUptime(ms) {
  const h = Math.floor(ms / 3600000)
  const m = Math.floor(ms / 60000) % 60
  const s = Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}

/**
 * 🧭 Pick random element from array
 */
export function pickRandom(list = []) {
  return list[Math.floor(Math.random() * list.length)]
}

/**
 * 🧹 Temp file auto cleanup
 * Deletes files older than maxAgeMs (default: 10 minutes)
 */
export function startTempCleaner(tempDir = './temp', maxAgeMs = 10 * 60 * 1000) {
  // Ensure temp folder exists
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true })
  }

  setInterval(() => {
    try {
      const now = Date.now()
      const files = fs.readdirSync(tempDir)

      for (const file of files) {
        const filePath = path.join(tempDir, file)
        const stats = fs.statSync(filePath)
        const age = now - stats.mtimeMs

        if (age > maxAgeMs) {
          fs.unlinkSync(filePath)
          console.log(`🧹 TempCleaner: deleted ${file}`)
        }
      }
    } catch (err) {
      console.error('❌ TempCleaner error:', err)
    }
  }, 60 * 1000) // runs every 1 minute
}
