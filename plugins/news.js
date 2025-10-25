// ==========================
// 🕷️ Tenebri MD — Plugin: News Headlines
// 👑 Owner: MidknightMantra
// ==========================

import axios from 'axios'
import { cmd } from '../command.js'
import config from '../config.js' // optional — can store API key here

cmd({
  pattern: 'news',
  desc: '📰 Get the latest news headlines.',
  category: 'other',
  react: '🕸️',
  filename: import.meta.url
}, async (conn, mek, m, { from, reply }) => {
  try {
    // 🧠 API key (either hardcoded or from config)
    const apiKey = config.NEWS_API_KEY || '0f2c43ab11324578a7b1709651736382'

    const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`)
    const articles = response.data.articles

    if (!articles || articles.length === 0) {
      return reply('🚫 No news articles found at the moment.')
    }

    for (let i = 0; i < Math.min(articles.length, 5); i++) {
      const article = articles[i]

      const message = `🕸️ *T͟E͟N͟E͟B͟R͟I͟ ͟M͟D͟ - News* 🕸️

📰 *${article.title || 'Untitled'}*
⚠️ _${article.description || 'No description available'}_
🔗 ${article.url || 'No link available'}

📅 ${new Date(article.publishedAt).toLocaleString()}
📝 Source: ${article.source?.name || 'Unknown'}

> 🖤 Powered by Tenebri MD`

      if (article.urlToImage) {
        await conn.sendMessage(from, {
          image: { url: article.urlToImage },
          caption: message
        }, { quoted: mek })
      } else {
        await conn.sendMessage(from, { text: message }, { quoted: mek })
      }
    }
  } catch (e) {
    console.error('[NEWS ERROR]', e)
    reply('❌ Could not fetch news. Please try again later.')
  }
})
