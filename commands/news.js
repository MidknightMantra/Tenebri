const axios = require("axios");

module.exports = async function (sock, chatId) {
  try {
    const apiKey = "dcd720a6f1914e2d9dba9790c188c08c"; // Replace with your NewsAPI key
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`,
    );
    const articles = response.data.articles.slice(0, 5); // Get top 5 articles
    let newsMessage = "📰 *Chronicles from the Mortal Realm*\n\n_The shadows bring forth tales from beyond..._\n\n";
    articles.forEach((article, index) => {
      newsMessage += `${index + 1}. ⚔️ *${article.title}*\n   ${article.description || 'The tale remains veiled...'}\n\n`;
    });
    newsMessage += "_~Tenebri's watch never sleeps_";
    await sock.sendMessage(chatId, { text: newsMessage });
  } catch (error) {
    console.error("Error fetching news:", error);
    await sock.sendMessage(chatId, {
      text: "🕯️ The messengers from distant realms have not arrived... Summon them again.",
    });
  }
};
