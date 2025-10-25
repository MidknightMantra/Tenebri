// ==========================
// 🕷️ Tenebri MD — Plugin: Owner Commands
// 👑 Owner: MidknightMantra
// ==========================

import { exec } from 'child_process'
import { cmd } from '../command.js'
import config from '../config.js'

// 1. 🛑 Shutdown Bot
cmd({
  pattern: 'shutdown',
  desc: 'Shutdown the bot.',
  category: 'owner',
  react: '🛑',
  filename: import.meta.url
}, async (conn, mek, m, { isOwner, reply }) => {
  if (!isOwner) return reply('❌ You are not the owner!')
  await reply('🛑 *Shutting down...*')
  process.exit()
})

// 2. 📢 Broadcast Message to All Groups
cmd({
  pattern: 'broadcast',
  desc: 'Broadcast a message to all groups.',
  category: 'owner',
  react: '📢',
  filename: import.meta.url
}, async (conn, mek, m, { isOwner, args, reply }) => {
  if (!isOwner) return reply('❌ You are not the owner!')
  if (args.length === 0) return reply('📢 Please provide a message to broadcast.')

  const message = args.join(' ')
  const groups = Object.keys(await conn.groupFetchAllParticipating())

  for (const groupId of groups) {
    await conn.sendMessage(groupId, { text: `🕸️ *BROADCAST*\n\n${message}` })
  }

  reply(`📢 Message broadcasted to *${groups.length} groups*.`)
})

// 3. 🖼️ Set Bot Profile Picture
cmd({
  pattern: 'setpp',
  desc: 'Set bot profile picture.',
  category: 'owner',
  react: '🖼️',
  filename: import.meta.url
}, async (conn, mek, m, { isOwner, quoted, reply }) => {
  if (!isOwner) return reply('❌ You are not the owner!')
  if (!quoted || !quoted.message.imageMessage) return reply('❌ Please reply to an image.')

  try {
    const media = await conn.downloadMediaMessage(quoted)
    await conn.updateProfilePicture(conn.user.id, media)
    reply('🖼️ *Profile picture updated successfully!*')
  } catch (error) {
    reply(`❌ Error updating profile picture: ${error.message}`)
  }
})

// 4. 🚫 Block User
cmd({
  pattern: 'block',
  desc: 'Block a user.',
  category: 'owner',
  react: '🚫',
  filename: import.meta.url
}, async (conn, mek, m, { isOwner, quoted, reply }) => {
  if (!isOwner) return reply('❌ You are not the owner!')
  if (!quoted) return reply('❌ Please reply to the user you want to block.')

  const user = quoted.sender
  try {
    await conn.updateBlockStatus(user, 'block')
    reply(`🚫 User @${user.split('@')[0]} blocked successfully.`, { mentions: [user] })
  } catch (error) {
    reply(`❌ Error blocking user: ${error.message}`)
  }
})

// 5. ✅ Unblock User
cmd({
  pattern: 'unblock',
  desc: 'Unblock a user.',
  category: 'owner',
  react: '✅',
  filename: import.meta.url
}, async (conn, mek, m, { isOwner, quoted, reply }) => {
  if (!isOwner) return reply('❌ You are not the owner!')
  if (!quoted) return reply('❌ Please reply to the user you want to unblock.')

  const user = quoted.sender
  try {
    await conn.updateBlockStatus(user, 'unblock')
    reply(`✅ User @${user.split('@')[0]} unblocked successfully.`, { mentions: [user] })
  } catch (error) {
    reply(`❌ Error unblocking user: ${error.message}`)
  }
})

// 6. 🧹 Clear All Chats
cmd({
  pattern: 'clearchats',
  desc: 'Clear all chats from the bot.',
  category: 'owner',
  react: '🧹',
  filename: import.meta.url
}, async (conn, mek, m, { isOwner, reply }) => {
  if (!isOwner) return reply('❌ You are not the owner!')
  try {
    const chats = Object.keys(conn.chats)
    for (const chatId of chats) {
      await conn.chatModify({ clear: { messages: [{ id: 'ALL' }] } }, chatId, [])
    }
    reply('🧹 All chats cleared successfully!')
  } catch (error) {
    reply(`❌ Error clearing chats: ${error.message}`)
  }
})

// 7. 🤖 Get Bot JID
cmd({
  pattern: 'jid',
  desc: "Get the bot's JID.",
  category: 'owner',
  react: '🤖',
  filename: import.meta.url
}, async (conn, mek, m, { isOwner, reply }) => {
  if (!isOwner) return reply('❌ You are not the owner!')
  reply(`🤖 *Bot JID:* ${conn.user.id}`)
})

// 8. 📝 List All Group JIDs
cmd({
  pattern: 'gjid',
  desc: 'Get the list of JIDs for all groups the bot is in.',
  category: 'owner',
  react: '📝',
  filename: import.meta.url
}, async (conn, mek, m, { isOwner, reply }) => {
  if (!isOwner) return reply('❌ You are not the owner!')

  const groups = await conn.groupFetchAllParticipating()
  const groupJids = Object.keys(groups)

  if (groupJids.length === 0) return reply('📭 No group JIDs found.')

  reply(`📝 *Group JIDs:*\n\n${groupJids.join('\n')}`)
})
