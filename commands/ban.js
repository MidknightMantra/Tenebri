const fs = require("fs");
const { channelInfo } = require("../lib/messageConfig");
const isAdmin = require("../lib/isAdmin");
const { isSudo } = require("../lib/index");

async function banCommand(sock, chatId, message) {
  // Restrict in groups to admins; in private to owner/sudo
  const isGroup = chatId.endsWith("@g.us");
  if (isGroup) {
    const senderId = message.key.participant || message.key.remoteJid;
    const { isSenderAdmin, isBotAdmin } = await isAdmin(sock, chatId, senderId);
    if (!isBotAdmin) {
      await sock.sendMessage(
        chatId,
        { text: "🕯️ Tenebri must be anointed as guardian to seal fates eternally.", ...channelInfo },
        { quoted: message },
      );
      return;
    }
    if (!isSenderAdmin && !message.key.fromMe) {
      await sock.sendMessage(
        chatId,
        { text: "⚔️ Only realm guardians may condemn souls to eternal exile.", ...channelInfo },
        { quoted: message },
      );
      return;
    }
  } else {
    const senderId = message.key.participant || message.key.remoteJid;
    const senderIsSudo = await isSudo(senderId);
    if (!message.key.fromMe && !senderIsSudo) {
      await sock.sendMessage(
        chatId,
        {
          text: "Only owner/sudo can use .ban in private chat",
          ...channelInfo,
        },
        { quoted: message },
      );
      return;
    }
  }
  let userToBan;

  // Check for mentioned users
  if (
    message.message?.extendedTextMessage?.contextInfo?.mentionedJid?.length > 0
  ) {
    userToBan = message.message.extendedTextMessage.contextInfo.mentionedJid[0];
  }
  // Check for replied message
  else if (message.message?.extendedTextMessage?.contextInfo?.participant) {
    userToBan = message.message.extendedTextMessage.contextInfo.participant;
  }

  if (!userToBan) {
    await sock.sendMessage(chatId, {
      text: "👁️ Mark the cursed soul — mention or reply to seal their eternal fate.",
      ...channelInfo,
    });
    return;
  }

  // Prevent banning the bot itself
  try {
    const botId = sock.user.id.split(":")[0] + "@s.whatsapp.net";
    if (
      userToBan === botId ||
      userToBan === botId.replace("@s.whatsapp.net", "@lid")
    ) {
      await sock.sendMessage(
        chatId,
        { text: "💀 The eternal sentinel cannot be banished... Tenebri endures.", ...channelInfo },
        { quoted: message },
      );
      return;
    }
  } catch {}

  try {
    // Add user to banned list
    const bannedUsers = JSON.parse(fs.readFileSync("./data/banned.json"));
    if (!bannedUsers.includes(userToBan)) {
      bannedUsers.push(userToBan);
      fs.writeFileSync(
        "./data/banned.json",
        JSON.stringify(bannedUsers, null, 2),
      );

      await sock.sendMessage(chatId, {
        text: `💀 @${userToBan.split("@")[0]} has been condemned to eternal exile!\n\n_The void claims another soul..._`,
        mentions: [userToBan],
        ...channelInfo,
      });
    } else {
      await sock.sendMessage(chatId, {
        text: `🕯️ @${userToBan.split("@")[0]} already dwells in darkness... eternally banished.`,
        mentions: [userToBan],
        ...channelInfo,
      });
    }
  } catch (error) {
    console.error("Error in ban command:", error);
    await sock.sendMessage(chatId, {
      text: "⚔️ The exile ritual crumbles... Dark forces intervene.",
      ...channelInfo,
    });
  }
}

module.exports = banCommand;
