// ==========================
// 🕷️ Tenebri MD — Plugin: Currency Converter
// 👑 Owner: MidknightMantra
// ==========================

import axios from 'axios'
import { cmd } from '../command.js'

cmd({
  pattern: 'convert',
  desc: 'Convert an amount from one currency to another.',
  category: 'tools',
  react: '💱',
  filename: import.meta.url
},
async (conn, mek, m, { args, reply }) => {
  try {
    if (args.length < 3) {
      return reply(
        `🪙 *Usage:* \`.convert <amount> <from_currency> <to_currency>\`\n\n` +
        `Example: \`.convert 100 USD KES\``
      )
    }

    const amount = parseFloat(args[0])
    const fromCurrency = args[1].toUpperCase()
    const toCurrency = args[2].toUpperCase()

    if (isNaN(amount)) return reply('⚠️ Please provide a valid number for the amount.')

    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
    const response = await axios.get(apiUrl)
    const data = response.data

    if (!data.rates[toCurrency]) {
      return reply(`❌ Conversion rate for *${toCurrency}* not found.`)
    }

    const rate = data.rates[toCurrency]
    const convertedAmount = (amount * rate).toFixed(2)

    const conversionInfo = `
🕸️ *T͟E͟N͟E͟B͟R͟I͟ ͟M͟D͟ - Currency Conversion* 🕸️

💵 *Amount*: ${amount.toLocaleString()} ${fromCurrency}
🔄 *Converted*: ${convertedAmount.toLocaleString()} ${toCurrency}
📈 *Exchange Rate*: 1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}

✨ *Embrace the flow of currency through the shadows.*
    `

    await conn.sendMessage(m.chat, { text: conversionInfo }, { quoted: mek })
  } catch (e) {
    console.error('[CURRENCY ERROR]', e)
    reply('❌ Error fetching conversion data. Please try again later.')
  }
})
