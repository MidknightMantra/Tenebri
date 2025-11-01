const fetch = require("node-fetch");

async function dareCommand(sock, chatId, message) {
  try {
    const shizokeys = "shizo";
    const res = await fetch(
      `https://shizoapi.onrender.com/api/texts/dare?apikey=${shizokeys}`,
    );

    if (!res.ok) {
      throw await res.text();
    }

    const json = await res.json();
    const dareMessage = json.result;

    // Send the dare message with gothic flair
    await sock.sendMessage(chatId, { text: `⚔️ *The Void Challenges You, Brave Soul*\n\n${dareMessage}\n\n_Will you accept fate's gauntlet?_` }, { quoted: message });
  } catch (error) {
    console.error("Error in dare command:", error);
    await sock.sendMessage(
      chatId,
      { text: "💀 The trial master remains in shadow... Call upon them again." },
      { quoted: message },
    );
  }
}

module.exports = { dareCommand };
