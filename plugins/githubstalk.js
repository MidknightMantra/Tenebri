// ==========================
// 🕷️ Tenebri MD — Plugin: GitHub Stalk
// 👑 Owner: MidknightMantra
// ==========================

import axios from 'axios'
import { cmd } from '../command.js'

cmd({
  pattern: 'githubstalk',
  desc: 'Fetch detailed GitHub user profile information.',
  category: 'other',
  react: '🖥️',
  filename: import.meta.url
},
async (conn, mek, m, { from, args, reply }) => {
  try {
    const username = args[0]
    if (!username) {
      return reply('🕸️ *Usage:* `.githubstalk <username>`\nExample: `.githubstalk MidknightMantra`')
    }

    // 🌐 Fetch user data from GitHub API
    const apiUrl = `https://api.github.com/users/${username}`
    const response = await axios.get(apiUrl)
    const data = response.data

    // 📅 Format joined date
    const createdDate = new Date(data.created_at).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })

    // 🕷️ Tenebri-styled profile info
    const userInfo = `
🕸️ *T͟E͟N͟E͟B͟R͟I͟ ͟M͟D͟ - GitHub Stalk* 🕸️

👤 *Username:* ${data.name || data.login}
🔗 *Profile:* ${data.html_url}
📝 *Bio:* ${data.bio || 'No bio available'}
🏙️ *Location:* ${data.location || 'Unknown'}
📊 *Public Repos:* ${data.public_repos}
🌀 *Followers:* ${data.followers} | Following: ${data.following}
📂 *Public Gists:* ${data.public_gists}
📅 *Joined:* ${createdDate}

✨ Data gathered from the depths of GitHub.
    `

    // 📸 Send profile with avatar
    await conn.sendMessage(from, {
      image: { url: data.avatar_url },
      caption: userInfo
    }, { quoted: mek })
  } catch (e) {
    console.error('[GITHUB STALK ERROR]', e)
    if (e.response && e.response.status === 404) {
      return reply('🚫 *User not found.* Please check the username and try again.')
    }
    return reply(`⚠️ An error occurred: ${e.message}`)
  }
})
