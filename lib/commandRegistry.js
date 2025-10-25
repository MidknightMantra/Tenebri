// ==========================
// 🧩 Tenebri Command Registry
// ==========================

export const commands = []

/**
 * 📜 Register a new command
 * @param {object} command - { pattern, desc, react, function }
 */
export function addCommand(command) {
  commands.push(command)
}
