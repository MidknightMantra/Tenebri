async function unmuteCommand(sock, chatId) {
  await sock.groupSettingUpdate(chatId, "not_announcement"); // Unmute the group
  await sock.sendMessage(chatId, { text: "🕯️ *The darkness lifts... all souls may speak freely.*\n\n_The void's grip loosens..._" });
}

module.exports = unmuteCommand;
