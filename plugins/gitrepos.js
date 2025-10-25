// ==========================
// 🕷️ Tenebri MD — Plugin: GitHub Repositories
// 👑 Owner: MidknightMantra
// ==========================

import axios from 'axios'
import { cmd } from '../command.js'

cmd({
  pattern: 'gitrepos',
  desc: 'List public GitHub repositories of a user with stars and languages.',
  category: 'other',
  react: '📁',
  filename: import.meta.url
},
async (conn, mek, m, { from, args, reply }) => {
  try {
    const username = args[0]
    if (!username) {
      return reply('🕸️ *Usage:* `.gitrepos <username>`\nExample: `.gitrepos MidknightMantra`')
    }

    // 🌐 Fetch repos from GitHub API
    const apiUrl = `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
    const response = await axios.get(apiUrl)
    const repos = response.data

    if (!repos || repos.length === 0) {
      return reply(`🚫 No public repositories found for *${username}*.`)
    }

    const maxRepos = 10
    let repoList = `🕸️ *T͟E͟N͟E͟B͟R͟I͟ ͟M͟D͟ - GitHub Repositories* 🕸️

📁 *User:* ${username}
📊 *Total Repositories:* ${repos.length}

🌟 Showing the latest ${Math.min(repos.length, maxRepos)} repositories:\n`

    repos.slice(0, maxRepos).forEach((repo, index) => {
      repoList += `
${index + 1}. 📂 *${repo.name}*
   🌐 ${repo.html_url}
   🧠 Language: ${repo.language || 'Unknown'}
   ⭐ Stars: ${repo.stargazers_count}
   🕒 Updated: ${new Date(repo.updated_at).toLocaleDateString()}
`
    })

    if (repos.length > maxRepos) {
      repoList += `\n...and ${repos.length - maxRepos} more repos.`
    }

    repoList += `\n\n✨ Data forged from the depths of GitHub.`

    await conn.sendMessage(from, { text: repoList }, { quoted: mek })
  } catch (e) {
    console.error('[GITREPOS ERROR]', e)
    if (e.response && e.response.status === 404) {
      return reply('🚫 *User not found.* Please check the username and try again.')
    }
    return reply(`⚠️ Error fetching repositories: ${e.message}`)
  }
})
