const axios = require("axios");

module.exports = async function (sock, chatId) {
  try {
    const response = await axios.get("https://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" },
    });
    const joke = response.data.joke;
    await sock.sendMessage(chatId, { text: `🎭 *From the shadows, a jest emerges...*\n\n${joke}\n\n_~Tenebri's dark humor_` });
  } catch (error) {
    console.error("Error fetching joke:", error);
    await sock.sendMessage(chatId, {
      text: "🕯️ The comedic spirits remain silent... Try summoning them again.",
    });
  }
};
