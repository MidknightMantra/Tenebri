// plugins/hack.js
// ==========================
// 🕷️ Tenebri MD — Plugin: Hacking Simulation (fun)
// 👑 Owner: MidknightMantra
// ==========================

import { cmd } from '../command.js'

// in-memory tracker for active "hacks" { chatId: true }
const activeHacks = new Map()

cmd({
  pattern: 'hack',
  desc: "Playful 'hacking' animation (fun). Use .stophack to cancel.",
  category: 'fun',
  react: '💻',
  filename: import.meta.url
}, async (conn, mek, m, {
  from, quoted, body, isCmd, command, args, q,
  isGroup, sender, senderNumber, botNumber2, botNumber,
  pushname, isMe, isOwner, groupMetadata, groupName, participants,
  groupAdmins, isBotAdmins, isAdmins, reply
}) => {
  try {
    // prevent multiple concurrent hacks in same chat
    if (activeHacks.get(from)) {
      return reply('⚠️ A hacking sequence is already running in this chat. Send `.stophack` to cancel it first.')
    }
    activeHacks.set(from, true)

    const steps = [
      '💻 *HACK STARTING...*',
      '🛠️ Initializing tools and proxies...',
      '🌐 Connecting to secure nodes...',
      '⌛ Bypassing firewall layers...',
      '',
      '```[█.........] 10%```',
      '```[███.......] 25%```',
      '```[██████....] 50%```',
      '```[████████..] 75%```',
      '```[██████████] 100% ✅```',
      '',
      '🔓 *System Breach: Successful!*',
      '🚀 *Command Execution: Complete!*',
      '📡 Transmitting results to secure channel...',
      '🕵️‍♂️ Erasing logs and traces...',
      '',
      '⚠️ *This is a playful simulation only.*',
      '🛡️ Ethical hacking and consent are essential.',
      '',
      '🕸️ *T͟E͟N͟E͟B͟R͟I͟ - Hacking Simulation Complete* 🕸️'
    ]

    // configurable delay (ms) per step
    const delayMs = parseInt(args[0]) || 1200 // optional: `.hack 500` to speed up

    // iterate through steps and send each, but check for cancellation
    for (let i = 0; i < steps.length; i++) {
      // check if cancelled
      if (!activeHacks.get(from)) {
        // gracefully exit
        await conn.sendMessage(from, { text: '❌ Hacking simulation cancelled.' }, { quoted: mek }).catch(() => {})
        return
      }

      // send the step (quoted to the original message for context)
      await conn.sendMessage(from, { text: steps[i] }, { quoted: mek }).catch(() => {})

      // wait (but allow cancellation to be effective between steps)
      await new Promise((resolve) => setTimeout(resolve, delayMs))
    }

    // finished, clean up
    activeHacks.delete(from)
  } catch (e) {
    console.error('[HACK ERROR]', e)
    activeHacks.delete(from)
    try { reply(`❌ Error while running hack simulation: ${e?.message || e}`) } catch {}
  }
})

/**
 * Companion command: .stophack
 * Cancels any running hack sequence in the chat.
 */
cmd({
  pattern: 'stophack',
  desc: 'Stop the running hacking simulation in this chat.',
  category: 'fun',
  react: '✋',
  filename: import.meta.url
}, async (conn, mek, m, {
  from, reply
}) => {
  try {
    if (!activeHacks.get(from)) {
      return reply('ℹ️ No hacking simulation is running in this chat.')
    }
    activeHacks.delete(from)
    return reply('🛑 Hacking simulation cancelled.')
  } catch (e) {
    console.error('[STOPHACK ERROR]', e)
    return reply('❌ Failed to cancel hacking simulation.')
  }
})
