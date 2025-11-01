const fetch = require("node-fetch");

module.exports = async function quoteCommand(sock, chatId, message) {
  try {
    const shizokeys = "shizo";
    const res = await fetch(
      `https://shizoapi.onrender.com/api/texts/quotes?apikey=${shizokeys}`,
    );

    if (!res.ok) {
      throw await res.text();
    }

    const json = await res.json();
    const quoteMessage = json.result;

    // Send the quote message with gothic enhancement
    await sock.sendMessage(chatId, { text: `📜 *Ancient wisdom whispers from the void...*\n\n_"${quoteMessage}"_\n\n⚔️ _~Echoes of the brave_` }, { quoted: message });
  } catch (error) {
    console.error("Error in quote command:", error);
    await sock.sendMessage(
      chatId,
      { text: "💀 The oracle's voice fades into darkness... Invoke again, brave soul." },
      { quoted: message },
    );
  }
};
