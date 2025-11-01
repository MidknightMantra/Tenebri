const os = require("os");
const settings = require("../settings.js");

function formatTime(seconds) {
  const days = Math.floor(seconds / (24 * 60 * 60));
  seconds = seconds % (24 * 60 * 60);
  const hours = Math.floor(seconds / (60 * 60));
  seconds = seconds % (60 * 60);
  const minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);

  let time = "";
  if (days > 0) time += `${days}d `;
  if (hours > 0) time += `${hours}h `;
  if (minutes > 0) time += `${minutes}m `;
  if (seconds > 0 || time === "") time += `${seconds}s`;

  return time.trim();
}

async function pingCommand(sock, chatId, message) {
  try {
    const start = Date.now();
    await sock.sendMessage(chatId, { text: "👁️ *Awakening the eternal sentinel...*" }, { quoted: message });
    const end = Date.now();
    const ping = Math.round((end - start) / 2);

    const uptimeInSeconds = process.uptime();
    const uptimeFormatted = formatTime(uptimeInSeconds);

    // Determine speed status with gothic flair
    let speedStatus;
    if (ping < 100) {
      speedStatus = "⚡ *Swift as shadow*";
    } else if (ping < 300) {
      speedStatus = "🌫️ *Steady through mist*";
    } else {
      speedStatus = "🕯️ *Lurking in darkness*";
    }

    const botInfo = `
╔═══════════════════════════╗
║   🕯️ 𝐓𝐄𝐍𝐄𝐁𝐑𝐈 - 𝐒𝐄𝐍𝐓𝐈𝐍𝐄𝐋 𝐒𝐓𝐀𝐓𝐔𝐒   🕯️
╚═══════════════════════════╝

┏━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 👁️ *Response Time*
┃    ${speedStatus}
┃    └─ ${ping}ms
┃
┃ 🌑 *Vigil Duration*  
┃    └─ ${uptimeFormatted}
┃
┃ 💀 *Version*
┃    └─ v${settings.version}
┃
┃ ⚔️ *Platform*
┃    └─ ${os.platform().toUpperCase()}
┗━━━━━━━━━━━━━━━━━━━━━━━━━┛

🕯️ _"From the abyss, Tenebri watches..."_
⚔️ _Brave sentinel, guardian of shadows_`.trim();

    // Reply to the original message with the bot info
    await sock.sendMessage(chatId, { text: botInfo }, { quoted: message });
  } catch (error) {
    console.error("Error in ping command:", error);
    await sock.sendMessage(chatId, { text: "💀 The void trembles... The sentinel's echo fades into darkness." });
  }
}

module.exports = pingCommand;
