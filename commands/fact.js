// commands/fact.js
const axios = require("axios");

module.exports = {
  name: "fact", // 🔹 Main command
  alias: ["funfact", "randomfact"], // 🔸 Command aliases
  desc: "Sends a random useless fact",
  category: "fun", // 📂 Used for help/menu organization
  usage: ".fact",
  cooldown: 5, // 🕒 Optional: 5s cooldown between uses

  /**
   * Executes the command
   * @param {object} sock - Baileys socket instance
   * @param {object} m - Message object (from chat)
   * @param {object} store - Optional database/store
   */
  async exec(sock, m, store) {
    try {
      // 🛰️ Fetch a random fact from the API
      const { data } = await axios.get(
        "https://uselessfacts.jsph.pl/random.json?language=en",
      );
      const fact = data?.text || "No fact available at the moment.";

      // 💬 Send formatted response
      await sock.sendMessage(
        m.chat,
        { text: `💡 *Random Fact:*\n\n${fact}` },
        { quoted: m },
      );
    } catch (err) {
      console.error("❌ Error fetching fact:", err.message);
      await sock.sendMessage(
        m.chat,
        {
          text: "⚠️ Sorry, I could not fetch a fact right now. Please try again later.",
        },
        { quoted: m },
      );
    }
  },
};
