// ==========================
// 🧽 Tenebri MD — Clear Temp Command
// 👑 Owner: MidknightMantra
// ==========================

import fs from 'fs'
import path from 'path'
import { cmd } from '../command.js'

cmd(
  {
    pattern: 'cleartemp',
    desc: 'Manually clear temporary files.',
    category: 'system',
    fromMe: true // 👑 Only the owner can run this
  },
  async (conn, mek, { reply }) => {
    const tempDir = './temp'

    try {
      if (!fs.existsSync(tempDir)) {
        return reply('⚠️ Temp folder does not exist.')
      }

      const files = fs.readdirSync(tempDir)
      if (files.length === 0) {
        return reply('✨ Temp folder is already clean.')
      }

      for (const file of files) {
        const filePath = path.join(tempDir, file)
        fs.unlinkSync(filePath)
      }

      reply(`🧽 Cleared ${files.length} temp file(s) successfully.`)
      console.log(`🧹 Manual temp cleanup executed by owner.`)
    } catch (err) {
      console.error('❌ ClearTemp error:', err)
      reply('❌ Failed to clear temp folder. Check logs.')
    }
  }
)
