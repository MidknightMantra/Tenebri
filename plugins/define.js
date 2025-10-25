// ==========================
// 🕷️ Tenebri MD — Plugin: Dictionary
// 👑 Owner: MidknightMantra
// ==========================

import axios from 'axios'
import { cmd } from '../command.js'

cmd({
  pattern: 'define',
  desc: '📚 Get the definition of a word.',
  react: '🔍',
  category: 'tools',
  filename: import.meta.url
},
async (conn, mek, m, { q, reply }) => {
  try {
    if (!q) {
      return reply(
        '❗ *Usage:* `.define [word]`\n' +
        'Example: `.define shadow`'
      )
    }

    const word = q.trim()
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    const response = await axios.get(url)
    const data = response.data[0]

    const meaning = data.meanings?.[0]
    const def = meaning?.definitions?.[0]?.definition || 'No definition found.'
    const example = meaning?.definitions?.[0]?.example || 'No example available.'
    const synonymsArr = meaning?.definitions?.[0]?.synonyms || []
    const synonyms = synonymsArr.length > 0 ? synonymsArr.join(', ') : 'No synonyms available.'

    const wordInfo = `
🕸️ *T͟E͟N͟E͟B͟R͟I͟ ͟M͟D͟ - Dictionary* 🕸️

📚 *Word*: ${data.word}
🔍 *Definition*: ${def}
📝 *Example*: ${example}
🔗 *Synonyms*: ${synonyms}

✨ Powered by Tenebri MD
    `

    return reply(wordInfo)

  } catch (e) {
    console.error('[DEFINE ERROR]', e)
    if (e.response && e.response.status === 404) {
      return reply('🚫 Word not found. Please check the spelling and try again.')
    }
    return reply('⚠️ An error occurred while fetching the definition. Please try again later.')
  }
})
