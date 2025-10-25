// ==========================
// 🕷️ Tenebri MD — Plugin: Group Management
// 👑 Owner: MidknightMantra
// ==========================

import config from '../config.js'
import { cmd } from '../command.js'

/**
 * 🕸️ Promote Command
 */
cmd({
  pattern: 'promote',
  desc: 'Promote a member to admin.',
  category: 'group',
  react: '🔼',
  filename: import.meta.url
},
async (conn, mek, m, { from, isGroup, isBotAdmins, isAdmins, reply }) => {
  try {
    if (!isGroup) return reply('⚠️ This command can only be used in a group.')
    if (!isBotAdmins) return reply('🤖 I must be an admin to use this command.')
    if (!isAdmins) return reply('🛡️ You must be an admin to use this command.')

    const user = m.mentionUser?.[0] || m.quoted?.sender
    if (!user) return reply('👤 Please tag or reply to a user to promote.')

    await conn.groupParticipantsUpdate(from, [user], 'promote')
    await reply(`🕸️ @${user.split('@')[0]} has been *promoted to admin*.`, { mentions: [user] })
  } catch (e) {
    console.error(e)
    reply(`❌ ${e.message}`)
  }
})

/**
 * 🕸️ Demote Command
 */
cmd({
  pattern: 'demote',
  desc: 'Demote an admin to member.',
  category: 'group',
  react: '🔽',
  filename: import.meta.url
},
async (conn, mek, m, { from, isGroup, isBotAdmins, isAdmins, reply }) => {
  try {
    if (!isGroup) return reply('⚠️ This command can only be used in a group.')
    if (!isBotAdmins) return reply('🤖 I must be an admin to use this command.')
    if (!isAdmins) return reply('🛡️ You must be an admin to use this command.')

    const user = m.mentionUser?.[0] || m.quoted?.sender
    if (!user) return reply('👤 Please tag or reply to a user to demote.')

    await conn.groupParticipantsUpdate(from, [user], 'demote')
    await reply(`🕸️ @${user.split('@')[0]} has been *demoted to member*.`, { mentions: [user] })
  } catch (e) {
    console.error(e)
    reply(`❌ ${e.message}`)
  }
})

/**
 * 🕸️ Remove Command
 */
cmd({
  pattern: 'remove',
  desc: 'Remove a member from the group.',
  category: 'group',
  react: '🚫',
  filename: import.meta.url
},
async (conn, mek, m, { from, isGroup, isBotAdmins, isAdmins, reply }) => {
  try {
    if (!isGroup) return reply('⚠️ This command can only be used in a group.')
    if (!isBotAdmins) return reply('🤖 I must be an admin to use this command.')
    if (!isAdmins) return reply('🛡️ You must be an admin to use this command.')

    const user = m.mentionUser?.[0] || m.quoted?.sender
    if (!user) return reply('👤 Please tag or reply to a user to remove.')

    await conn.groupParticipantsUpdate(from, [user], 'remove')
    await reply(`🕸️ @${user.split('@')[0]} has been *removed from the group*.`, { mentions: [user] })
  } catch (e) {
    console.error(e)
    reply(`❌ ${e.message}`)
  }
})

/**
 * 🕸️ Add Command
 */
cmd({
  pattern: 'add',
  desc: 'Add a member to the group.',
  category: 'group',
  react: '➕',
  filename: import.meta.url
},
async (conn, mek, m, { from, q, isGroup, isBotAdmins, isAdmins, reply }) => {
  try {
    if (!isGroup) return reply('⚠️ This command can only be used in a group.')
    if (!isBotAdmins) return reply('🤖 I must be an admin to use this command.')
    if (!isAdmins) return reply('🛡️ You must be an admin to use this command.')

    const user = q.replace(/\D/g, '')
    if (!user) return reply('📱 Please provide a phone number to add. Example: `.add 2547xxxxxxx`')

    await conn.groupParticipantsUpdate(from, [`${user}@s.whatsapp.net`], 'add')
    await reply(`🕸️ @${user} has been *added to the group*.`, { mentions: [`${user}@s.whatsapp.net`] })
  } catch (e) {
    console.error(e)
    reply(`❌ ${e.message}`)
  }
})

/**
 * 🕸️ Set Goodbye Message
 */
cmd({
  pattern: 'setgoodbye',
  desc: 'Set the goodbye message for the group.',
  category: 'group',
  react: '👋',
  filename: import.meta.url
},
async (conn, mek, m, { from, q, isGroup, isBotAdmins, isAdmins, reply }) => {
  try {
    if (!isGroup) return reply('⚠️ This command can only be used in a group.')
    if (!isBotAdmins) return reply('🤖 I must be an admin to use this command.')
    if (!isAdmins) return reply('🛡️ You must be an admin to use this command.')

    if (!q) return reply('✍️ Please provide a goodbye message.')
    await conn.sendMessage(from, { image: { url: config.ALIVE_IMG }, caption: `👋 ${q}` })
    await reply('✅ Goodbye message has been set.')
  } catch (e) {
    console.error(e)
    reply(`❌ ${e.message}`)
  }
})

/**
 * 🕸️ Set Welcome Message
 */
cmd({
  pattern: 'setwelcome',
  desc: 'Set the welcome message for the group.',
  category: 'group',
  react: '👋',
  filename: import.meta.url
},
async (conn, mek, m, { from, q, isGroup, isBotAdmins, isAdmins, reply }) => {
  try {
    if (!isGroup) return reply('⚠️ This command can only be used in a group.')
    if (!isBotAdmins) return reply('🤖 I must be an admin to use this command.')
    if (!isAdmins) return reply('🛡️ You must be an admin to use this command.')

    if (!q) return reply('✍️ Please provide a welcome message.')
    await conn.sendMessage(from, { image: { url: config.ALIVE_IMG }, caption: `🎉 ${q}` })
    await reply('✅ Welcome message has been set.')
  } catch (e) {
    console.error(e)
    reply(`❌ ${e.message}`)
  }
})

/**
 * 🕸️ Get Group Picture
 */
cmd({
  pattern: 'getpic',
  desc: 'Get the group profile picture.',
  category: 'group',
  react: '🖼️',
  filename: import.meta.url
},
async (conn, mek, m, { from, isGroup, reply }) => {
  try {
    if (!isGroup) return reply('⚠️ This command can only be used in a group.')

    const groupPic = await conn.profilePictureUrl(from, 'image').catch(() => null)
    if (!groupPic) return reply('🚫 No profile picture found for this group.')

    await conn.sendMessage(from, { image: { url: groupPic }, caption: '🖼️ *Group Profile Picture*' })
  } catch (e) {
    console.error(e)
    reply(`❌ ${e.message}`)
  }
})
