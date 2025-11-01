const axios = require("axios");

module.exports = async function (sock, chatId, message, city) {
  try {
    const apiKey = "4902c0f2550f58298ad4146a92b65e10"; // Replace with your OpenWeather API Key
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
    );
    const weather = response.data;
    const weatherText = `🌑 *The Skies Above ${weather.name}*\n\n🌫️ Conditions: ${weather.weather[0].description}\n🌡️ Temperature: ${weather.main.temp}°C\n💨 Wind: ${weather.wind.speed} m/s\n\n_~The elements reveal their secrets..._`;
    await sock.sendMessage(chatId, { text: weatherText }, { quoted: message });
  } catch (error) {
    console.error("Error fetching weather:", error);
    await sock.sendMessage(
      chatId,
      { text: "☁️ The atmospheric spirits elude Tenebri's grasp... Invoke again." },
      { quoted: message },
    );
  }
};
