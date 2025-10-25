// ==========================
// 🕷️ Tenebri MD — Plugin: GitHub Repository Info
// 👑 Owner: MidknightMantra
// ==========================

import axios from 'axios'
import { cmd } from '../command.js'

cmd({
  pattern: 'srepo',
  desc: 'Fetch information about a GitHub repository.',
  category: 'other',
  react: '📁',
  filename: import.meta.url
}, async (conn, mek, m, { from, args, reply }) => {
  try {
    const repo = args.join(' ')
    if (!repo || !repo.includes('/')) {
      return reply('⚠️ Please provide a valid repository in the format:\n\n`srepo owner/repo`')
    }

    const apiUrl = `https://api.github.com/repos/${repo}`
    const res = await axios.get(apiUrl)
    const data = res.data

    const caption = `
🕸️ *T͟E͟N͟E͟B͟R͟I͟ ͟-͟ ͟G͟I͟T͟H͟U͟B͟ ͟R͟E͟P͟O͟ ͟I͟N͟F͟O͟* 🕸️

📦 *Name:* ${data.full_name}
📝 *Description:* ${data.description || 'No description'}
⭐ *Stars:* ${data.stargazers_count}
🍴 *Forks:* ${data.forks_count}
🐛 *Open Issues:* ${data.open_issues_count}
🧠 *Language:* ${data.language || 'Unknown'}
📅 *Created:* ${new Date(data.created_at).toLocaleDateString()}
♻️ *Updated:* ${new Date(data.updated_at).toLocaleDateString()}

🔗 *URL:* ${data.html_url}

✨ Knowledge forged in code, whispered through shadows.
    `.trim()

    await conn.sendMessage(from, {
      image: { url: data.owner.avatar_url },
      caption
    }, { quoted: mek })

  } catch (e) {
    console.error('[SREPO ERROR]', e)
    if (e.response && e.response.status === 404) {
      reply('🚫 Repository not found. Check the spelling and try again.')
    } else {
      reply(`❌ Error fetching repository info: ${e.message}`)
    }
  }
})
