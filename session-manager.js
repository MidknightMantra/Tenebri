// ===============================
// 🕷️ Tenebri MD — Session Backup & Restore
// 👑 Owner: MidknightMantra
// ===============================

import fs from 'fs'
import path from 'path'
import { File } from 'megajs'

// 📂 Folder that holds Baileys session data
const SESSION_PATH = './auth_info_baileys'

// 🪄 Utility: compress session into a single file
export async function backupSession() {
  try {
    if (!fs.existsSync(SESSION_PATH)) {
      console.log('❌ No session found to back up.')
      return
    }

    const files = fs.readdirSync(SESSION_PATH)
    const archive = {}

    for (const file of files) {
      const filePath = path.join(SESSION_PATH, file)
      const data = fs.readFileSync(filePath, 'utf8')
      archive[file] = data
    }

    fs.writeFileSync('./session_backup.json', JSON.stringify(archive, null, 2))
    console.log('✅ Session backed up successfully → session_backup.json')
  } catch (err) {
    console.error('❌ Failed to back up session:', err)
  }
}

// 🪄 Restore session from backup file
export async function restoreSession() {
  try {
    if (!fs.existsSync('./session_backup.json')) {
      console.log('❌ No backup file found.')
      return
    }

    const archive = JSON.parse(fs.readFileSync('./session_backup.json', 'utf8'))
    if (!fs.existsSync(SESSION_PATH)) fs.mkdirSync(SESSION_PATH)

    for (const [file, data] of Object.entries(archive)) {
      fs.writeFileSync(path.join(SESSION_PATH, file), data)
    }

    console.log('✅ Session restored successfully from session_backup.json')
  } catch (err) {
    console.error('❌ Failed to restore session:', err)
  }
}

// 📤 Optional: Upload session to MEGA
export async function uploadSessionToMega(email, password) {
  try {
    if (!fs.existsSync('./session_backup.json')) {
      console.log('❌ No backup file found.')
      return
    }

    const megaFile = fs.readFileSync('./session_backup.json')

    const mega = await new Promise((resolve, reject) => {
      const storage = new File.Storage({ email, password })
      storage.on('ready', () => resolve(storage))
      storage.on('error', reject)
    })

    const uploaded = await new Promise((resolve, reject) => {
      mega.upload('tenebri_session_backup.json', megaFile, (err, file) => {
        if (err) reject(err)
        else resolve(file)
      })
    })

    console.log('✅ Session uploaded to MEGA successfully!')
    console.log(`🔗 Shareable Link: ${await uploaded.link()}`)
  } catch (err) {
    console.error('❌ Failed to upload to MEGA:', err)
  }
}
