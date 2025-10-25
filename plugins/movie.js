// ==========================
// 🕷️ Tenebri MD — Plugin: Movie Info
// 👑 Owner: MidknightMantra
// ==========================

import axios from 'axios'
import { cmd } from '../command.js'
import config from '../config.js' // Make sure OMDB_API_KEY is set in config.js or .env

cmd({
  pattern: 'movie',
  desc: '🎬 Fetch detailed information about a movie.',
  category: 'other',
  react: '🎥',
  filename: import.meta.url
}, async (conn, mek, m, { from, args, reply }) => {
  try {
    const movieName = args.join(' ')
    if (!movieName) return reply('📽️ Please provide the name of the movie.')

    const apiUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${config.OMDB_API_KEY}`
    const response = await axios.get(apiUrl)
    const data = response.data

    if (data.Response === 'False') {
      return reply('🚫 Movie not found. Please check the spelling and try again.')
    }

    const movieInfo = `🕸️ *T͟E͟N͟E͟B͟R͟I͟ ͟M͟D͟ - Movie Info* 🕸️

🎬 *Title:* ${data.Title}
📅 *Year:* ${data.Year}
🌟 *Rated:* ${data.Rated}
📆 *Released:* ${data.Released}
⏳ *Runtime:* ${data.Runtime}
🎭 *Genre:* ${data.Genre}
🎬 *Director:* ${data.Director}
✍️ *Writer:* ${data.Writer}
🎭 *Actors:* ${data.Actors}
📝 *Plot:* ${data.Plot}
🌍 *Language:* ${data.Language}
🇺🇸 *Country:* ${data.Country}
🏆 *Awards:* ${data.Awards}
⭐ *IMDB Rating:* ${data.imdbRating}
🗳️ *IMDB Votes:* ${data.imdbVotes}

> 🖤 Powered by Tenebri MD`

    // Poster image fallback
    const imageUrl = data.Poster && data.Poster !== 'N/A' ? data.Poster : config.ALIVE_IMG

    await conn.sendMessage(from, {
      image: { url: imageUrl },
      caption: movieInfo
    }, { quoted: mek })
  } catch (e) {
    console.error('[MOVIE ERROR]', e)
    reply(`❌ Error: ${e.message}`)
  }
})
