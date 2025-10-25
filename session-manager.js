// ==========================
// 🕷️ Tenebri MD — Session Manager
// 👑 Owner: MidknightMantra
// ==========================

import fs from 'fs'
import path from 'path'

const SESSION_FILE = path.resolve('./session_backup.json')

/**
 * 💾 Backup session creds after successful login
 */
export async function backupSession() {
  try {
    if (fs.existsSync('./tenebri_session/creds.json')) {
      const sessionData = fs.readFileSync('./tenebri_session/creds.json')
      fs.writeFileSync(SESSION_FILE, sessionData)
      console.log('✅ Session backed up successfully → session_backup.json')
    }
  } catch (err) {
    console.error('❌ Failed to backup session:', err)
  }
}

/**
 * ♻️ Restore session creds on startup (if available)
 */
export async function restoreSession() {
  try {
    if (fs.existsSync(SESSION_FILE)) {
      const backupData = fs.readFileSync(SESSION_FILE)
      fs.mkdirSync('./tenebri_session', { recursive: true })
      fs.writeFileSync('./tenebri_session/creds.json', backupData)
      console.log('✅ Session restored from backup.')
    } else {
      console.log('⚠️ No session backup found. QR code login required.')
    }
  } catch (err) {
    console.error('❌ Failed to restore session:', err)
  }
}
