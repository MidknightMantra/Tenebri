const fetch = require("node-fetch");

async function truthCommand(sock, chatId, message) {
  try {
    const shizokeys = "shizo";
    const res = await fetch(
      `https://shizoapi.onrender.com/api/texts/truth?apikey=${shizokeys}`,
    );

    if (!res.ok) {
      throw await res.text();
    }

    const json = await res.json();
    const truthMessage = json.result;

    // Send the truth message with dark mystique
    await sock.sendMessage(chatId, { text: `👁️ *The Abyss Demands Honesty*\n\n${truthMessage}\n\n_Speak true, or face the shadows..._` }, { quoted: message });
  } catch (error) {
    console.error("Error in truth command:", error);
    await sock.sendMessage(
      chatId,
      { text: "🕯️ The truth-seeker vanishes into mist... Summon them once more." },
      { quoted: message },
    );
  }
}

module.exports = { truthCommand };
