// ==========================
// 🕷️ Tenebri MD — Plugin: Weather Information
// 👑 Owner: MidknightMantra
// ==========================

import axios from 'axios'
import { cmd } from '../command.js'
import config from '../config.js'

cmd({
  pattern: 'weather',
  desc: '🌤 Get weather information for a location',
  react: '🌤',
  category: 'other',
  filename: import.meta.url
}, async (conn, mek, m, { q, reply }) => {
  try {
    if (!q) {
      return reply(
`⚠️ *Usage:*
\`.weather [city name]\`

🌍 *Example:*
\`.weather Nairobi\`
\`.weather Paris\``
      )
    }

    const apiKey = config.OPENWEATHER_API_KEY || '2d61a72574c11c4f36173b627f8cb177' // fallback key
    const city = q
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`

    const response = await axios.get(url)
    const data = response.data

    const weatherInfo = `
🕸️ *T͟E͟N͟E͟B͟R͟I͟ ͟-͟ ͟W͟E͟A͟T͟H͟E͟R͟ ͟R͟E͟P͟O͟R͟T͟* 🕸️

📍 *Location:* ${data.name}, ${data.sys.country}
🌡️ *Temperature:* ${data.main.temp}°C
🔥 *Feels Like:* ${data.main.feels_like}°C
🌡️ *Min Temp:* ${data.main.temp_min}°C
🌡️ *Max Temp:* ${data.main.temp_max}°C
💧 *Humidity:* ${data.main.humidity}%
🌫️ *Condition:* ${data.weather[0].main} (${data.weather[0].description})
💨 *Wind Speed:* ${data.wind.speed} m/s
🔽 *Pressure:* ${data.main.pressure} hPa

🕯️ The winds whisper through the darkness.
⛈️ Powered by OpenWeatherMap
    `.trim()

    return reply(weatherInfo)
  } catch (e) {
    console.error('[WEATHER ERROR]', e)
    if (e.response && e.response.status === 404) {
      return reply('🚫 City not found. Please check the spelling and try again.')
    }
    reply('❌ An error occurred while fetching weather information. Try again later.')
  }
})
