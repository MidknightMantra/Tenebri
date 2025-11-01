const yts = require("yt-search");
const axios = require("axios");

async function playCommand(sock, chatId, message) {
  try {
    const text =
      message.message?.conversation ||
      message.message?.extendedTextMessage?.text;
    const searchQuery = text.split(" ").slice(1).join(" ").trim();

    if (!searchQuery) {
      return await sock.sendMessage(chatId, {
        text: "🎵 *Whisper the name of the melody you seek...*",
      });
    }

    // Search for the song
    const { videos } = await yts(searchQuery);
    if (!videos || videos.length === 0) {
      return await sock.sendMessage(chatId, {
        text: "🌑 *The void yields no such melody...*\n\n_Try another incantation._",
      });
    }

    // Send loading message
    await sock.sendMessage(chatId, {
      text: "🕯️ *Summoning the song from the abyss...*\n\n_The shadows work their magic..._",
    });

    // Get the first video result
    const video = videos[0];
    const urlYt = video.url;

    // Fetch audio data from API
    const response = await axios.get(
      `https://apis-keith.vercel.app/download/dlmp3?url=${urlYt}`,
    );
    const data = response.data;

    if (!data || !data.status || !data.result || !data.result.downloadUrl) {
      return await sock.sendMessage(chatId, {
        text: "💀 *The melody escaped the void's grasp...*\n\n_The API spirits remain silent._",
      });
    }

    const audioUrl = data.result.downloadUrl;
    const title = data.result.title;

    // Send the audio with better error handling
    try {
      await sock.sendMessage(
        chatId,
        {
          audio: { url: audioUrl },
          mimetype: "audio/mpeg",
          fileName: `${title}.mp3`,
        },
        { quoted: message },
      );
    } catch (sendError) {
      console.error("🕯️ Audio transmission failed:", sendError.message);
      await sock.sendMessage(chatId, {
        text: `💀 *The melody escaped into darkness...*\n\n🎵 *Song:* ${title}\n🔗 *Link:* ${video.url}\n\n_Network spirits are restless. Try again._`,
      });
    }
  } catch (error) {
    console.error("🌑 Play command failed:", error.message);
    await sock.sendMessage(chatId, {
      text: "💀 *The shadows refuse to yield the song...*\n\n_Network connection to the void falters._",
    });
  }
}

module.exports = playCommand;

/*Powered by TENEBRI*/
