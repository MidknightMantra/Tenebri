// ==========================
// 🕷️ Tenebri MD — Command Registry
// 👑 Owner: MidknightMantra
// ==========================

export const commandRegistry = new Map()

/**
 * Register a command with pattern and handler
 * @param {string} pattern - Command pattern (e.g. "ping")
 * @param {Function} handler - Function to execute when command is triggered
 * @param {Object} [options] - Optional metadata for menus/help
 */
export function registerCommand(pattern, handler, options = {}) {
  const lower = pattern.toLowerCase()

  if (commandRegistry.has(lower)) {
    console.warn(`⚠️ Command "${lower}" is already registered. Skipping duplicate.`)
    return
  }

  commandRegistry.set(lower, {
    pattern: lower,
    handler,
    ...options
  })
}

/**
 * Retrieve a command by pattern
 * @param {string} pattern
 * @returns {object|undefined}
 */
export function getCommand(pattern) {
  return commandRegistry.get(pattern.toLowerCase())
}

/**
 * Get all registered commands
 * Useful for dynamic help menus
 */
export function listCommands() {
  return Array.from(commandRegistry.values())
}

/**
 * Unregister a command (if needed)
 */
export function unregisterCommand(pattern) {
  const lower = pattern.toLowerCase()
  if (commandRegistry.has(lower)) {
    commandRegistry.delete(lower)
    console.log(`🧹 Unregistered command: ${lower}`)
  }
}
