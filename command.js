// ===============================
// 🧠 Tenebri — Command Loader
// 👑 Owner: MidknightMantra
// ===============================

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { commands, addCommand } from './lib/commandRegistry.js'

// To allow ESM to use __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * 📦 Load all plugins from the /plugins folder
 */
export function loadPlugins() {
  const pluginDir = path.join(__dirname, 'plugins')

  if (!fs.existsSync(pluginDir)) {
    fs.mkdirSync(pluginDir)
  }

  const files = fs.readdirSync(pluginDir).filter(f => f.endsWith('.js'))
  console.log(`📦 Loading Plugins...`)

  for (const file of files) {
    try {
      const pluginPath = path.join(pluginDir, file)
      const pluginModule = await import(`file://${pluginPath}`)

      // If the plugin exports a default object or function, add it
      if (pluginModule.default) {
        const cmd = pluginModule.default
        addCommand(cmd)
      }

      console.log(`✅ Loaded ${file}`)
    } catch (err) {
      console.error(`❌ Failed to load ${file}`, err)
    }
  }

  console.log(`✨ ${commands.length} plugins loaded successfully`)
}
