const isAdmin = require("../lib/isAdmin");

async function kickCommand(sock, chatId, senderId, mentionedJids, message) {
  // Check if user is owner
  const isOwner = message.key.fromMe;
  if (!isOwner) {
    const { isSenderAdmin, isBotAdmin } = await isAdmin(sock, chatId, senderId);

    if (!isBotAdmin) {
      await sock.sendMessage(
        chatId,
        { text: "🕯️ Tenebri requires guardian status to cast out the unworthy." },
        { quoted: message },
      );
      return;
    }

    if (!isSenderAdmin) {
      await sock.sendMessage(
        chatId,
        { text: "⚔️ Only realm guardians may wield this banishment rite." },
        { quoted: message },
      );
      return;
    }
  }

  let usersToKick = [];

  // Check for mentioned users
  if (mentionedJids && mentionedJids.length > 0) {
    usersToKick = mentionedJids;
  }
  // Check for replied message
  else if (message.message?.extendedTextMessage?.contextInfo?.participant) {
    usersToKick = [message.message.extendedTextMessage.contextInfo.participant];
  }

  // If no user found through either method
  if (usersToKick.length === 0) {
    await sock.sendMessage(
      chatId,
      {
        text: "👁️ Mark the soul to be cast into the void — mention or reply to their whisper.",
      },
      { quoted: message },
    );
    return;
  }

  // Get bot's ID in multiple formats for comparison
  const botId = sock.user.id; // Full bot ID: 16305199236:6@s.whatsapp.net
  const botPhoneNumber = sock.user.id.split(":")[0]; // 16305199236
  const botIdFormatted = botPhoneNumber + "@s.whatsapp.net"; // 16305199236@s.whatsapp.net

  // Get group participants to check against actual participant data
  const metadata = await sock.groupMetadata(chatId);
  const participants = metadata.participants || [];

  // Check if any of the users to kick is the bot itself
  const isTryingToKickBot = usersToKick.some((userId) => {
    const userPhoneNumber = userId.split("@")[0];

    // Check direct ID matches
    const directMatch =
      userId === botId || // Direct ID match
      userId === botIdFormatted || // Formatted ID match
      userPhoneNumber === botPhoneNumber; // Phone number match

    // Check against participant data to find the bot
    const participantMatch = participants.some((p) => {
      const pPhoneNumber = p.phoneNumber ? p.phoneNumber.split("@")[0] : "";
      const pId = p.id ? p.id.split("@")[0] : "";

      // Check if this participant is the bot
      const isThisParticipantBot =
        pPhoneNumber === botPhoneNumber || // Phone number match
        pId === botPhoneNumber || // ID portion match
        p.id === botId || // Direct ID match
        p.phoneNumber === botIdFormatted; // Phone number format match

      // If this participant is the bot, check if we're trying to kick them
      if (isThisParticipantBot) {
        return (
          userId === p.id || // Direct participant ID match
          userPhoneNumber === pPhoneNumber || // Phone number match
          userPhoneNumber === pId || // ID portion match
          userId === p.phoneNumber // Direct phone number match
        );
      }
      return false;
    });

    return directMatch || participantMatch;
  });

  if (isTryingToKickBot) {
    await sock.sendMessage(
      chatId,
      {
        text: "💀 Tenebri cannot be banished from the shadows... I am eternal.",
      },
      { quoted: message },
    );
    return;
  }

  try {
    await sock.groupParticipantsUpdate(chatId, usersToKick, "remove");

    // Get usernames for each kicked user
    const usernames = await Promise.all(
      usersToKick.map(async (jid) => {
        return `@${jid.split("@")[0]}`;
      }),
    );

    await sock.sendMessage(chatId, {
      text: `⚔️ ${usernames.join(", ")} has been cast into the void!\n\n_The shadows have spoken..._`,
      mentions: usersToKick,
    });
  } catch (error) {
    console.error("Error in kick command:", error);
    await sock.sendMessage(chatId, {
      text: "💀 The banishment ritual faltered... The void resists.",
    });
  }
}

module.exports = kickCommand;
