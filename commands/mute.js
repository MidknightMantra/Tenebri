const isAdmin = require("../lib/isAdmin");

async function muteCommand(sock, chatId, senderId, message, durationInMinutes) {
  const { isSenderAdmin, isBotAdmin } = await isAdmin(sock, chatId, senderId);
  if (!isBotAdmin) {
    await sock.sendMessage(
      chatId,
      { text: "🕯️ Tenebri must be granted guardian powers to silence the realm." },
      { quoted: message },
    );
    return;
  }

  if (!isSenderAdmin) {
    await sock.sendMessage(
      chatId,
      { text: "⚔️ Only guardians may invoke the silence of shadows." },
      { quoted: message },
    );
    return;
  }

  try {
    // Mute the group
    await sock.groupSettingUpdate(chatId, "announcement");

    if (durationInMinutes !== undefined && durationInMinutes > 0) {
      const durationInMilliseconds = durationInMinutes * 60 * 1000;
      await sock.sendMessage(
        chatId,
        { text: `🌑 *Silence falls upon the realm for ${durationInMinutes} minutes...*\n\n_Only guardians may speak in the void._` },
        { quoted: message },
      );

      // Set timeout to unmute after duration
      setTimeout(async () => {
        try {
          await sock.groupSettingUpdate(chatId, "not_announcement");
          await sock.sendMessage(chatId, {
            text: "🕯️ The shadows recede... voices may rise once more.",
          });
        } catch (unmuteError) {
          console.error("Error unmuting group:", unmuteError);
        }
      }, durationInMilliseconds);
    } else {
      await sock.sendMessage(
        chatId,
        { text: "🌑 *The realm falls silent...*\n\n_Only guardians may pierce the darkness._" },
        { quoted: message },
      );
    }
  } catch (error) {
    console.error("Error muting/unmuting the group:", error);
    await sock.sendMessage(
      chatId,
      {
        text: "💀 The silencing ritual wavers... The void resists control.",
      },
      { quoted: message },
    );
  }
}

module.exports = muteCommand;
