const isAdmin = require("../lib/isAdmin");

async function demoteCommand(sock, chatId, mentionedJids, message) {
  try {
    // First check if it's a group
    if (!chatId.endsWith("@g.us")) {
      await sock.sendMessage(chatId, {
        text: "🌑 This rite echoes only within gatherings, not solitary whispers.",
      });
      return;
    }

    // Check admin status first, before any other operations
    try {
      const adminStatus = await isAdmin(
        sock,
        chatId,
        message.key.participant || message.key.remoteJid,
      );

      if (!adminStatus.isBotAdmin) {
        await sock.sendMessage(chatId, {
          text: "🕯️ Tenebri must be granted guardian powers to strip rank from the fallen.",
        });
        return;
      }

      if (!adminStatus.isSenderAdmin) {
        await sock.sendMessage(chatId, {
          text: "⚔️ Only guardians may cast down those who falter in their duty.",
        });
        return;
      }
    } catch (adminError) {
      console.error("Error checking admin status:", adminError);
      await sock.sendMessage(chatId, {
        text: "❌ Error: Please make sure the bot is an admin of this group.",
      });
      return;
    }

    let userToDemote = [];

    // Check for mentioned users
    if (mentionedJids && mentionedJids.length > 0) {
      userToDemote = mentionedJids;
    }
    // Check for replied message
    else if (message.message?.extendedTextMessage?.contextInfo?.participant) {
      userToDemote = [
        message.message.extendedTextMessage.contextInfo.participant,
      ];
    }

    // If no user found through either method
    if (userToDemote.length === 0) {
      await sock.sendMessage(chatId, {
        text: "👁️ Mark the fallen guardian — mention or reply to revoke their power.",
      });
      return;
    }

    // Add delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await sock.groupParticipantsUpdate(chatId, userToDemote, "demote");

    // Get usernames for each demoted user
    const usernames = await Promise.all(
      userToDemote.map(async (jid) => {
        return `@${jid.split("@")[0]}`;
      }),
    );

    // Add delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const demotionMessage =
      `┏━━━『 💀 𝐃𝐄𝐒𝐂𝐄𝐍𝐒𝐈𝐎𝐍 𝐑𝐈𝐓𝐄 』━━━┓\n\n` +
      `🌑 *Fallen Guardian${userToDemote.length > 1 ? "s" : ""}:*\n` +
      `${usernames.map((name) => `  ◈ ${name}`).join("\n")}\n\n` +
      `⚔️ *Decreed By:* @${message.key.participant ? message.key.participant.split("@")[0] : message.key.remoteJid.split("@")[0]}\n` +
      `📅 *Time:* ${new Date().toLocaleString()}\n\n` +
      `_The shadows reclaim their power..._`;

    await sock.sendMessage(chatId, {
      text: demotionMessage,
      mentions: [
        ...userToDemote,
        message.key.participant || message.key.remoteJid,
      ],
    });
  } catch (error) {
    console.error("Error in demote command:", error);
    if (error.data === 429) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      try {
        await sock.sendMessage(chatId, {
          text: "🕯️ The void overwhelms... Too many rituals at once. Wait, then invoke again.",
        });
      } catch (retryError) {
        console.error("Error sending retry message:", retryError);
      }
    } else {
      try {
        await sock.sendMessage(chatId, {
          text: "💀 The demotion rite falters... Ensure Tenebri wields guardian authority.",
        });
      } catch (sendError) {
        console.error("Error sending error message:", sendError);
      }
    }
  }
}

// Function to handle automatic demotion detection
async function handleDemotionEvent(sock, groupId, participants, author) {
  try {
    // Safety check for participants
    if (!Array.isArray(participants) || participants.length === 0) {
      return;
    }

    // Add delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Get usernames for demoted participants
    const demotedUsernames = await Promise.all(
      participants.map(async (jid) => {
        // Handle case where jid might be an object or not a string
        const jidString =
          typeof jid === "string" ? jid : jid.id || jid.toString();
        return `@${jidString.split("@")[0]}`;
      }),
    );

    let demotedBy;
    let mentionList = participants.map((jid) => {
      // Ensure all mentions are proper JID strings
      return typeof jid === "string" ? jid : jid.id || jid.toString();
    });

    if (author && author.length > 0) {
      // Ensure author has the correct format
      const authorJid =
        typeof author === "string" ? author : author.id || author.toString();
      demotedBy = `@${authorJid.split("@")[0]}`;
      mentionList.push(authorJid);
    } else {
      demotedBy = "System";
    }

    // Add delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const demotionMessage =
      `*『 GROUP DEMOTION 』*\n\n` +
      `👤 *Demoted User${participants.length > 1 ? "s" : ""}:*\n` +
      `${demotedUsernames.map((name) => `• ${name}`).join("\n")}\n\n` +
      `👑 *Demoted By:* ${demotedBy}\n\n` +
      `📅 *Date:* ${new Date().toLocaleString()}`;

    await sock.sendMessage(groupId, {
      text: demotionMessage,
      mentions: mentionList,
    });
  } catch (error) {
    console.error("Error handling demotion event:", error);
    if (error.data === 429) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
}

module.exports = { demoteCommand, handleDemotionEvent };
