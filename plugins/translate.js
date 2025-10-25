// ==========================
// 🕷️ Tenebri MD — Plugin: Translator
// 👑 Owner: MidknightMantra
// ==========================
import axios from 'axios'
import { cmd } from '../command.js'

cmd({
  pattern: 'trt',
  desc: '🌍 Translate text between languages',
  category: 'tools',
  react: '🌐',
  filename: import.meta.url
},
async (conn, mek, m, { args, reply }) => {
  try {
    if (args.length < 2) {
      return reply('❗ Usage: `.trt [language code] [text]`\nExample: `.trt fr Hello world`')
    }

    const targetLang = args[0]
    const textToTranslate = args.slice(1).join(' ')
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=en|${targetLang}`

    const response = await axios.get(url)
    const translation = response.data.responseData.translatedText

    const message = `
🌍 *Translation* 🌍

🔤 *Original*: ${textToTranslate}
🔠 *Translated*: ${translation}
🌐 *Language*: ${targetLang.toUpperCase()}

> Tenebri-MD
`
    reply(message)
  } catch (e) {
    console.log(e)
    reply('⚠️ An error occurred while translating the text. Please try again later.')
  }
})
