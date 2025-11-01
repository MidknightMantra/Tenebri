/**
 * =========================================================
 *  🕯️ TENEBRI — Core Sentinel
 *  Version: 1.6.4
 *  Author: Midknight Mantra
 *  Description:
 *    From the abyss awakens Tenebri — brave guardian of shadows,
 *    wielding unyielding valor against the void's eternal grasp.
 * =========================================================
 */

// 🧹 Ward Against ENOSPC / Temp Overflow in Hosted Realms
const fs = require("fs");
const path = require("path");

// Redirect temp essence away from mortal /tmp
const customTemp = path.join(process.cwd(), "temp");
if (!fs.existsSync(customTemp)) fs.mkdirSync(customTemp, { recursive: true });
process.env.TMPDIR = customTemp;
process.env.TEMP = customTemp;
process.env.TMP = customTemp;

// Eternal Vigil: Auto-Cleanse Every 3 Hours
setInterval(
  () => {
    fs.readdir(customTemp, (err, files) => {
      if (err) return;
      for (const file of files) {
        const filePath = path.join(customTemp, file);
        fs.stat(filePath, (err, stats) => {
          if (!err && Date.now() - stats.mtimeMs > 3 * 60 * 60 * 1000) {
            fs.unlink(filePath, () => {});
          }
        });
      }
    });
    console.log("🌑🧹 Shadows cleansed from the temp crypt");
  },
  3 * 60 * 60 * 1000,
);

const settings = require("./settings");
require("./config.js");
const { isBanned } = require("./lib/isBanned");
const yts = require("yt-search");
const { fetchBuffer } = require("./lib/myfunc");
const fetch = require("node-fetch");
const ytdl = require("ytdl-core");
const axios = require("axios");
const ffmpeg = require("fluent-ffmpeg");
const { isSudo } = require("./lib/index");
const {
  autotypingCommand,
  isAutotypingEnabled,
  handleAutotypingForMessage,
  handleAutotypingForCommand,
  showTypingAfterCommand,
} = require("./commands/autotyping");
const {
  autoreadCommand,
  isAutoreadEnabled,
  handleAutoread,
} = require("./commands/autoread");

// Command imports — Forged in the Abyss
const tagAllCommand = require("./commands/tagall");
const helpCommand = require("./commands/help");
const banCommand = require("./commands/ban");
const { promoteCommand } = require("./commands/promote");
const { demoteCommand } = require("./commands/demote");
const muteCommand = require("./commands/mute");
const unmuteCommand = require("./commands/unmute");
const stickerCommand = require("./commands/sticker");
const isAdmin = require("./lib/isAdmin");
const warnCommand = require("./commands/warn");
const warningsCommand = require("./commands/warnings");
const ttsCommand = require("./commands/tts");
const {
  tictactoeCommand,
  handleTicTacToeMove,
} = require("./commands/tictactoe");
const { incrementMessageCount, topMembers } = require("./commands/topmembers");
const ownerCommand = require("./commands/owner");
const deleteCommand = require("./commands/delete");
const {
  handleAntilinkCommand,
  handleLinkDetection,
} = require("./commands/antilink");
const {
  handleAntitagCommand,
  handleTagDetection,
} = require("./commands/antitag");
const { Antilink } = require("./lib/antilink");
const {
  handleMentionDetection,
  mentionToggleCommand,
  setMentionCommand,
} = require("./commands/mention");
const memeCommand = require("./commands/meme");
const tagCommand = require("./commands/tag");
const tagNotAdminCommand = require("./commands/tagnotadmin");
const hideTagCommand = require("./commands/hidetag");
const jokeCommand = require("./commands/joke");
const quoteCommand = require("./commands/quote");
const factCommand = require("./commands/fact");
const weatherCommand = require("./commands/weather");
const newsCommand = require("./commands/news");
const kickCommand = require("./commands/kick");
const simageCommand = require("./commands/simage");
const attpCommand = require("./commands/attp");
const { startHangman, guessLetter } = require("./commands/hangman");
const { startTrivia, answerTrivia } = require("./commands/trivia");
const { complimentCommand } = require("./commands/compliment");
const { insultCommand } = require("./commands/insult");
const { eightBallCommand } = require("./commands/eightball");
const { lyricsCommand } = require("./commands/lyrics");
const { dareCommand } = require("./commands/dare");
const { truthCommand } = require("./commands/truth");
const { clearCommand } = require("./commands/clear");
const pingCommand = require("./commands/ping");
const aliveCommand = require("./commands/alive");
const blurCommand = require("./commands/img-blur");
const { welcomeCommand, handleJoinEvent } = require("./commands/welcome");
const { goodbyeCommand, handleLeaveEvent } = require("./commands/goodbye");
const githubCommand = require("./commands/github");
const {
  handleAntiBadwordCommand,
  handleBadwordDetection,
} = require("./lib/antibadword");
const antibadwordCommand = require("./commands/antibadword");
const {
  handleChatbotCommand,
  handleChatbotResponse,
} = require("./commands/chatbot");
const takeCommand = require("./commands/take");
const { flirtCommand } = require("./commands/flirt");
const characterCommand = require("./commands/character");
const wastedCommand = require("./commands/wasted");
const shipCommand = require("./commands/ship");
const groupInfoCommand = require("./commands/groupinfo");
const resetlinkCommand = require("./commands/resetlink");
const staffCommand = require("./commands/staff");
const unbanCommand = require("./commands/unban");
const emojimixCommand = require("./commands/emojimix");
const { handlePromotionEvent } = require("./commands/promote");
const { handleDemotionEvent } = require("./commands/demote");
const viewOnceCommand = require("./commands/viewonce");
const clearSessionCommand = require("./commands/clearsession");
const {
  autoStatusCommand,
  handleStatusUpdate,
} = require("./commands/autostatus");
const { simpCommand } = require("./commands/simp");
const { stupidCommand } = require("./commands/stupid");
const stickerTelegramCommand = require("./commands/stickertelegram");
const textmakerCommand = require("./commands/textmaker");
const {
  handleAntideleteCommand,
  handleMessageRevocation,
  storeMessage,
} = require("./commands/antidelete");
const clearTmpCommand = require("./commands/cleartmp");
const setProfilePicture = require("./commands/setpp");
const {
  setGroupDescription,
  setGroupName,
  setGroupPhoto,
} = require("./commands/groupmanage");
const instagramCommand = require("./commands/instagram");
const facebookCommand = require("./commands/facebook");
const spotifyCommand = require("./commands/spotify");
const playCommand = require("./commands/play");
const tiktokCommand = require("./commands/tiktok");
const songCommand = require("./commands/song");
const aiCommand = require("./commands/ai");
const urlCommand = require("./commands/url");
const { handleTranslateCommand } = require("./commands/translate");
const { handleSsCommand } = require("./commands/ss");
const { addCommandReaction, handleAreactCommand } = require("./lib/reactions");
const { goodnightCommand } = require("./commands/goodnight");
const { shayariCommand } = require("./commands/shayari");
const { rosedayCommand } = require("./commands/roseday");
const imagineCommand = require("./commands/imagine");
const videoCommand = require("./commands/video");
const sudoCommand = require("./commands/sudo");
const { miscCommand, handleHeart } = require("./commands/misc");
const { animeCommand } = require("./commands/anime");
const { piesCommand, piesAlias } = require("./commands/pies");
const stickercropCommand = require("./commands/stickercrop");
const updateCommand = require("./commands/update");
const removebgCommand = require("./commands/removebg");
const { reminiCommand } = require("./commands/remini");
const { igsCommand } = require("./commands/igs");
const {
  anticallCommand,
  readState: readAnticallState,
} = require("./commands/anticall");
const {
  pmblockerCommand,
  readState: readPmBlockerState,
} = require("./commands/pmblocker");
const settingsCommand = require("./commands/settings");
const soraCommand = require("./commands/sora");

// Eternal Bindings — Global Essences
global.packname = settings.packname;
global.author = settings.author;
global.channelLink = "https://whatsapp.com/channel/0029Vb74Dlf4CrfoqpAEBC2T";
global.ytch = "MidknightMantra";

// Channel Ward — Forwarded from the Void
const channelInfo = {
  contextInfo: {
    forwardingScore: 1,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "0029Vb74Dlf4CrfoqpAEBC2T@newsletter",
      newsletterName: "Tenebri",
      serverMessageId: -1,
    },
  },
};

async function handleMessages(sock, messageUpdate, printLog) {
  try {
    const { messages, type } = messageUpdate;
    if (type !== "notify") return;

    const message = messages[0];
    if (!message?.message) return;

    // Vigil of the Autoread
    await handleAutoread(sock, message);

    // Archive Essence for Antidelete Ward
    if (message.message) {
      storeMessage(sock, message);
    }

    // Detect Revocation in the Shadows
    if (message.message?.protocolMessage?.type === 0) {
      await handleMessageRevocation(sock, message);
      return;
    }

    const chatId = message.key.remoteJid;
    const senderId = message.key.participant || message.key.remoteJid;
    const isGroup = chatId.endsWith("@g.us");
    const senderIsSudo = await isSudo(senderId);

    const userMessage = (
      message.message?.conversation?.trim() ||
      message.message?.extendedTextMessage?.text?.trim() ||
      message.message?.imageMessage?.caption?.trim() ||
      message.message?.videoMessage?.caption?.trim() ||
      ""
    )
      .toLowerCase()
      .replace(/\.\s+/g, ".")
      .trim();

    // Preserve Raw Invocation for Tags and Rituals
    const rawText =
      message.message?.conversation?.trim() ||
      message.message?.extendedTextMessage?.text?.trim() ||
      message.message?.imageMessage?.caption?.trim() ||
      message.message?.videoMessage?.caption?.trim() ||
      "";

    // Chronicle Command Invocations
    if (userMessage.startsWith(".")) {
      console.log(
        `🌑⚔️ Invocation in ${isGroup ? "gathering" : "solitude"}: ${userMessage}`,
      );
    }

    // Enforce Solitary Mode — Shadows Guard the Unworthy
    try {
      const data = JSON.parse(fs.readFileSync("./data/messageCount.json"));
      // Permit Sovereign/Sudo Passage
      if (!data.isPublic && !message.key.fromMe && !senderIsSudo) {
        return; // Vanish into silence
      }
    } catch (error) {
      console.error("Curse upon mode vigilance:", error);
      // Default to public realm if shadows falter
    }

    // Banish the Cursed (Except for Unban Rite)
    if (isBanned(senderId) && !userMessage.startsWith(".unban")) {
      // Whisper Warning Sparingly
      if (Math.random() < 0.1) {
        await sock.sendMessage(chatId, {
          text: "💀 You are exiled from the void. Seek redemption from a guardian.",
          ...channelInfo,
        });
      }
      return;
    }

    // PM Ward: Block Intruders When Awakened (No Eternal Ban)
    if (!isGroup && !message.key.fromMe && !senderIsSudo) {
      try {
        const pmState = readPmBlockerState();
        if (pmState.enabled) {
          // Herald the Barrier, Pause, Then Seal
          await sock.sendMessage(chatId, {
            text:
              pmState.message ||
              "Whispers from the mortal realm are forbidden. Approach in gatherings only.",
          });
          await new Promise((r) => setTimeout(r, 1500));
          try {
            await sock.updateBlockStatus(chatId, "block");
          } catch (e) {}
          return;
        }
      } catch (e) {}
    }

    // Detect Game Trials First
    if (
      /^[1-9]$/.test(userMessage) ||
      userMessage.toLowerCase() === "surrender"
    ) {
      await handleTicTacToeMove(sock, chatId, senderId, userMessage);
      return;
    }

    if (!message.key.fromMe) incrementMessageCount(chatId, senderId);

    // Scan for Forbidden Words — Before All Else
    if (isGroup && userMessage) {
      await handleBadwordDetection(
        sock,
        chatId,
        message,
        userMessage,
        senderId,
      );

      await Antilink(message, sock);
    }

    // If No Invocation Prefix, Process Whispers
    if (!userMessage.startsWith(".")) {
      // Manifest Typing Aura if Awakened
      await handleAutotypingForMessage(sock, chatId, userMessage);

      if (isGroup) {
        // Commune with the Void
        await handleChatbotResponse(
          sock,
          chatId,
          message,
          userMessage,
          senderId,
        );
        await handleTagDetection(sock, chatId, message, senderId);
      }
      return;
    }

    // Guardian Commands — Wielded by the Elite
    const adminCommands = [
      ".mute",
      ".unmute",
      ".ban",
      ".unban",
      ".promote",
      ".demote",
      ".kick",
      ".tagall",
      ".tagnotadmin",
      ".hidetag",
      ".antilink",
      ".antitag",
      ".setgdesc",
      ".setgname",
      ".setgpp",
    ];
    const isAdminCommand = adminCommands.some((cmd) =>
      userMessage.startsWith(cmd),
    );

    // Sovereign Commands — Bound to the Chosen
    const ownerCommands = [
      ".mode",
      ".autostatus",
      ".antidelete",
      ".cleartmp",
      ".setpp",
      ".clearsession",
      ".areact",
      ".autoreact",
      ".autotyping",
      ".autoread",
      ".pmblocker",
    ];
    const isOwnerCommand = ownerCommands.some((cmd) =>
      userMessage.startsWith(cmd),
    );

    let isSenderAdmin = false;
    let isBotAdmin = false;

    // Verify Guardian Status for Elite Rites in Gatherings
    if (isGroup && isAdminCommand) {
      const adminStatus = await isAdmin(sock, chatId, senderId, message);
      isSenderAdmin = adminStatus.isSenderAdmin;
      isBotAdmin = adminStatus.isBotAdmin;

      if (!isBotAdmin) {
        await sock.sendMessage(
          chatId,
          {
            text: "🕯️ Elevate Tenebri to guardian status to invoke elite rites.",
            ...channelInfo,
          },
          { quoted: message },
        );
        return;
      }

      if (
        userMessage.startsWith(".mute") ||
        userMessage === ".unmute" ||
        userMessage.startsWith(".ban") ||
        userMessage.startsWith(".unban") ||
        userMessage.startsWith(".promote") ||
        userMessage.startsWith(".demote")
      ) {
        if (!isSenderAdmin && !message.key.fromMe) {
          await sock.sendMessage(
            chatId,
            {
              text: "⚔️ Only realm guardians may wield this power.",
              ...channelInfo,
            },
            { quoted: message },
          );
          return;
        }
      }
    }

    // Verify Sovereign Status for Chosen Rites
    if (isOwnerCommand) {
      if (!message.key.fromMe && !senderIsSudo) {
        await sock.sendMessage(
          chatId,
          { text: "💀 This rite is sealed to the sovereign and chosen alone!" },
          { quoted: message },
        );
        return;
      }
    }

    // Invocation Handlers — Execute Without Delay
    // Manifest Aura Post-Rite if Awakened
    let commandExecuted = false;

    switch (true) {
      case userMessage === ".simage": {
        const quotedMessage =
          message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        if (quotedMessage?.stickerMessage) {
          await simageCommand(sock, quotedMessage, chatId);
        } else {
          await sock.sendMessage(
            chatId,
            {
              text: "👁️ Reply to a glyph with .simage to transmute it.",
              ...channelInfo,
            },
            { quoted: message },
          );
        }
        commandExecuted = true;
        break;
      }
      case userMessage.startsWith(".kick"):
        const mentionedJidListKick =
          message.message.extendedTextMessage?.contextInfo?.mentionedJid || [];
        await kickCommand(
          sock,
          chatId,
          senderId,
          mentionedJidListKick,
          message,
        );
        break;
      case userMessage.startsWith(".mute"):
        {
          const parts = userMessage.trim().split(/\s+/);
          const muteArg = parts[1];
          const muteDuration =
            muteArg !== undefined ? parseInt(muteArg, 10) : undefined;
          if (
            muteArg !== undefined &&
            (isNaN(muteDuration) || muteDuration <= 0)
          ) {
            await sock.sendMessage(
              chatId,
              {
                text: "⚔️ Provide a valid span of minutes or invoke .mute alone to silence now.",
                ...channelInfo,
              },
              { quoted: message },
            );
          } else {
            await muteCommand(sock, chatId, senderId, message, muteDuration);
          }
        }
        break;
      case userMessage === ".unmute":
        await unmuteCommand(sock, chatId, senderId);
        break;
      case userMessage.startsWith(".ban"):
        if (!isGroup) {
          if (!message.key.fromMe && !senderIsSudo) {
            await sock.sendMessage(
              chatId,
              { text: "💀 Only sovereign/chosen may ban in solitude." },
              { quoted: message },
            );
            break;
          }
        }
        await banCommand(sock, chatId, message);
        break;
      case userMessage.startsWith(".unban"):
        if (!isGroup) {
          if (!message.key.fromMe && !senderIsSudo) {
            await sock.sendMessage(
              chatId,
              { text: "💀 Only sovereign/chosen may unban in solitude." },
              { quoted: message },
            );
            break;
          }
        }
        await unbanCommand(sock, chatId, message);
        break;
      case userMessage === ".help" ||
        userMessage === ".menu" ||
        userMessage === ".bot" ||
        userMessage === ".list":
        await helpCommand(sock, chatId, message, global.channelLink);
        commandExecuted = true;
        break;
      case userMessage === ".sticker" || userMessage === ".s":
        await stickerCommand(sock, chatId, message);
        commandExecuted = true;
        break;
      case userMessage.startsWith(".warnings"):
        const mentionedJidListWarnings =
          message.message.extendedTextMessage?.contextInfo?.mentionedJid || [];
        await warningsCommand(sock, chatId, mentionedJidListWarnings);
        break;
      case userMessage.startsWith(".warn"):
        const mentionedJidListWarn =
          message.message.extendedTextMessage?.contextInfo?.mentionedJid || [];
        await warnCommand(
          sock,
          chatId,
          senderId,
          mentionedJidListWarn,
          message,
        );
        break;
      case userMessage.startsWith(".tts"):
        const text = userMessage.slice(4).trim();
        await ttsCommand(sock, chatId, text, message);
        break;
      case userMessage.startsWith(".delete") || userMessage.startsWith(".del"):
        await deleteCommand(sock, chatId, message, senderId);
        break;
      case userMessage.startsWith(".attp"):
        await attpCommand(sock, chatId, message);
        break;

      case userMessage === ".settings":
        await settingsCommand(sock, chatId, message);
        break;
      case userMessage.startsWith(".mode"):
        // Verify Sovereign
        if (!message.key.fromMe && !senderIsSudo) {
          await sock.sendMessage(
            chatId,
            { text: "⚔️ Only the sovereign may alter the mode!", ...channelInfo },
            { quoted: message },
          );
          return;
        }
        // Divine Current Essence
        let data;
        try {
          data = JSON.parse(fs.readFileSync("./data/messageCount.json"));
        } catch (error) {
          console.error("Curse upon mode divination:", error);
          await sock.sendMessage(chatId, {
            text: "💀 Failed to divine bot mode",
            ...channelInfo,
          });
          return;
        }

        const action = userMessage.split(" ")[1]?.toLowerCase();
        // Reveal Status if No Decree
        if (!action) {
          const currentMode = data.isPublic ? "public" : "private";
          await sock.sendMessage(
            chatId,
            {
              text: `🌑 Current realm mode: *${currentMode}*\n\nDecree: .mode public/private\n\nVision:\n.mode public - Welcome all souls\n.mode private - Seal to sovereign alone`,
              ...channelInfo,
            },
            { quoted: message },
          );
          return;
        }

        if (action !== "public" && action !== "private") {
          await sock.sendMessage(
            chatId,
            {
              text: "Decree: .mode public/private\n\nVision:\n.mode public - Welcome all souls\n.mode private - Seal to sovereign alone",
              ...channelInfo,
            },
            { quoted: message },
          );
          return;
        }

        try {
          // Transmute Mode
          data.isPublic = action === "public";

          // Etch into the Archive
          fs.writeFileSync(
            "./data/messageCount.json",
            JSON.stringify(data, null, 2),
          );

          await sock.sendMessage(chatId, {
            text: `🕯️ Realm now bound in *${action}* mode`,
            ...channelInfo,
          });
        } catch (error) {
          console.error("Curse upon mode transmutation:", error);
          await sock.sendMessage(chatId, {
            text: "💀 Failed to transmute realm mode",
            ...channelInfo,
          });
        }
        break;
      case userMessage.startsWith(".anticall"):
        if (!message.key.fromMe && !senderIsSudo) {
          await sock.sendMessage(
            chatId,
            { text: "⚔️ Only sovereign/chosen may invoke anticall." },
            { quoted: message },
          );
          break;
        }
        {
          const args = userMessage.split(" ").slice(1).join(" ");
          await anticallCommand(sock, chatId, message, args);
        }
        break;
      case userMessage.startsWith(".pmblocker"):
        if (!message.key.fromMe && !senderIsSudo) {
          await sock.sendMessage(
            chatId,
            { text: "⚔️ Only sovereign/chosen may invoke pmblocker." },
            { quoted: message },
          );
          commandExecuted = true;
          break;
        }
        {
          const args = userMessage.split(" ").slice(1).join(" ");
          await pmblockerCommand(sock, chatId, message, args);
        }
        commandExecuted = true;
        break;
      case userMessage === ".owner":
        await ownerCommand(sock, chatId);
        break;
      case userMessage === ".tagall":
        await tagAllCommand(sock, chatId, senderId, message);
        break;
      case userMessage === ".tagnotadmin":
        await tagNotAdminCommand(sock, chatId, senderId, message);
        break;
      case userMessage.startsWith(".hidetag"):
        {
          const messageText = rawText.slice(8).trim();
          const replyMessage =
            message.message?.extendedTextMessage?.contextInfo?.quotedMessage ||
            null;
          await hideTagCommand(
            sock,
            chatId,
            senderId,
            messageText,
            replyMessage,
            message,
          );
        }
        break;
      case userMessage.startsWith(".tag"):
        const messageText = rawText.slice(4).trim(); // Preserve raw for casing
        const replyMessage =
          message.message?.extendedTextMessage?.contextInfo?.quotedMessage ||
          null;
        await tagCommand(
          sock,
          chatId,
          senderId,
          messageText,
          replyMessage,
          message,
        );
        break;
      case userMessage.startsWith(".antilink"):
        if (!isGroup) {
          await sock.sendMessage(
            chatId,
            {
              text: "⚔️ This rite binds only in gatherings.",
              ...channelInfo,
            },
            { quoted: message },
          );
          return;
        }
        if (!isBotAdmin) {
          await sock.sendMessage(
            chatId,
            {
              text: "🕯️ Elevate Tenebri to guardian first.",
              ...channelInfo,
            },
            { quoted: message },
          );
          return;
        }
        await handleAntilinkCommand(
          sock,
          chatId,
          userMessage,
          senderId,
          isSenderAdmin,
          message,
        );
        break;
      case userMessage.startsWith(".antitag"):
        if (!isGroup) {
          await sock.sendMessage(
            chatId,
            {
              text: "⚔️ This rite binds only in gatherings.",
              ...channelInfo,
            },
            { quoted: message },
          );
          return;
        }
        if (!isBotAdmin) {
          await sock.sendMessage(
            chatId,
            {
              text: "🕯️ Elevate Tenebri to guardian first.",
              ...channelInfo,
            },
            { quoted: message },
          );
          return;
        }
        await handleAntitagCommand(
          sock,
          chatId,
          userMessage,
          senderId,
          isSenderAdmin,
          message,
        );
        break;
      case userMessage === ".meme":
        await memeCommand(sock, chatId, message);
        break;
      case userMessage === ".joke":
        await jokeCommand(sock, chatId, message);
        break;
      case userMessage === ".quote":
        await quoteCommand(sock, chatId, message);
        break;
      case userMessage === ".fact":
        await factCommand(sock, chatId, message, message);
        break;
      case userMessage.startsWith(".weather"):
        const city = userMessage.slice(9).trim();
        if (city) {
          await weatherCommand(sock, chatId, message, city);
        } else {
          await sock.sendMessage(
            chatId,
            {
              text: "🌑 Name a realm, e.g., .weather Shadowvale",
              ...channelInfo,
            },
            { quoted: message },
          );
        }
        break;
      case userMessage === ".news":
        await newsCommand(sock, chatId);
        break;
      case userMessage.startsWith(".ttt") ||
        userMessage.startsWith(".tictactoe"):
        const tttText = userMessage.split(" ").slice(1).join(" ");
        await tictactoeCommand(sock, chatId, senderId, tttText);
        break;
      case userMessage.startsWith(".move"):
        const position = parseInt(userMessage.split(" ")[1]);
        if (isNaN(position)) {
          await sock.sendMessage(
            chatId,
            {
              text: "⚔️ Provide a valid mark for the trial.",
              ...channelInfo,
            },
            { quoted: message },
          );
        } else {
          tictactoeMove(sock, chatId, senderId, position);
        }
        break;
      case userMessage === ".topmembers":
        topMembers(sock, chatId, isGroup);
        break;
      case userMessage.startsWith(".hangman"):
        startHangman(sock, chatId);
        break;
      case userMessage.startsWith(".guess"):
        const guessedLetter = userMessage.split(" ")[1];
        if (guessedLetter) {
          guessLetter(sock, chatId, guessedLetter);
        } else {
          sock.sendMessage(
            chatId,
            {
              text: "👁️ Divine a letter: .guess <rune>",
              ...channelInfo,
            },
            { quoted: message },
          );
        }
        break;
      case userMessage.startsWith(".trivia"):
        startTrivia(sock, chatId);
        break;
      case userMessage.startsWith(".answer"):
        const answer = userMessage.split(" ").slice(1).join(" ");
        if (answer) {
          answerTrivia(sock, chatId, answer);
        } else {
          sock.sendMessage(
            chatId,
            {
              text: "⚔️ Offer wisdom: .answer <revelation>",
              ...channelInfo,
            },
            { quoted: message },
          );
        }
        break;
      case userMessage.startsWith(".compliment"):
        await complimentCommand(sock, chatId, message);
        break;
      case userMessage.startsWith(".insult"):
        await insultCommand(sock, chatId, message);
        break;
      case userMessage.startsWith(".8ball"):
        const question = userMessage.split(" ").slice(1).join(" ");
        await eightBallCommand(sock, chatId, question);
        break;
      case userMessage.startsWith(".lyrics"):
        const songTitle = userMessage.split(" ").slice(1).join(" ");
        await lyricsCommand(sock, chatId, songTitle, message);
        break;
      case userMessage.startsWith(".simp"):
        const quotedMsg =
          message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        const mentionedJid =
          message.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
        await simpCommand(sock, chatId, quotedMsg, mentionedJid, senderId);
        break;
      case userMessage.startsWith(".stupid") ||
        userMessage.startsWith(".itssostupid") ||
        userMessage.startsWith(".iss"):
        const stupidQuotedMsg =
          message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        const stupidMentionedJid =
          message.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
        const stupidArgs = userMessage.split(" ").slice(1);
        await stupidCommand(
          sock,
          chatId,
          stupidQuotedMsg,
          stupidMentionedJid,
          senderId,
          stupidArgs,
        );
        break;
      case userMessage === ".dare":
        await dareCommand(sock, chatId, message);
        break;
      case userMessage === ".truth":
        await truthCommand(sock, chatId, message);
        break;
      case userMessage === ".clear":
        if (isGroup) await clearCommand(sock, chatId);
        break;
      case userMessage.startsWith(".promote"):
        const mentionedJidListPromote =
          message.message.extendedTextMessage?.contextInfo?.mentionedJid || [];
        await promoteCommand(sock, chatId, mentionedJidListPromote, message);
        break;
      case userMessage.startsWith(".demote"):
        const mentionedJidListDemote =
          message.message.extendedTextMessage?.contextInfo?.mentionedJid || [];
        await demoteCommand(sock, chatId, mentionedJidListDemote, message);
        break;
      case userMessage === ".ping":
        await pingCommand(sock, chatId, message);
        break;
      case userMessage === ".alive":
        await aliveCommand(sock, chatId, message);
        break;
      case userMessage.startsWith(".mention "):
        {
          const args = userMessage.split(" ").slice(1).join(" ");
          const isOwner = message.key.fromMe || senderIsSudo;
          await mentionToggleCommand(sock, chatId, message, args, isOwner);
        }
        break;
      case userMessage === ".setmention":
        {
          const isOwner = message.key.fromMe || senderIsSudo;
          await setMentionCommand(sock, chatId, message, isOwner);
        }
        break;
      case userMessage.startsWith(".blur"):
        const quotedMessage =
          message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        await blurCommand(sock, chatId, message, quotedMessage);
        break;
      case userMessage.startsWith(".welcome"):
        if (isGroup) {
          // Verify Guardian if Unseen
          if (!isSenderAdmin) {
            const adminStatus = await isAdmin(sock, chatId, senderId);
            isSenderAdmin = adminStatus.isSenderAdmin;
          }

          if (isSenderAdmin || message.key.fromMe) {
            await welcomeCommand(sock, chatId, message);
          } else {
            await sock.sendMessage(
              chatId,
              {
                text: "⚔️ Only guardians may invoke this.",
                ...channelInfo,
              },
              { quoted: message },
            );
          }
        } else {
          await sock.sendMessage(
            chatId,
            {
              text: "🌑 This rite thrives in gatherings alone.",
              ...channelInfo,
            },
            { quoted: message },
          );
        }
        break;
      case userMessage.startsWith(".goodbye"):
        if (isGroup) {
          // Verify Guardian if Unseen
          if (!isSenderAdmin) {
            const adminStatus = await isAdmin(sock, chatId, senderId);
            isSenderAdmin = adminStatus.isSenderAdmin;
          }

          if (isSenderAdmin || message.key.fromMe) {
            await goodbyeCommand(sock, chatId, message);
          } else {
            await sock.sendMessage(
              chatId,
              {
                text: "⚔️ Only guardians may invoke this.",
                ...channelInfo,
              },
              { quoted: message },
            );
          }
        } else {
          await sock.sendMessage(
            chatId,
            {
              text: "🌑 This rite thrives in gatherings alone.",
              ...channelInfo,
            },
            { quoted: message },
          );
        }
        break;
      case userMessage === ".git":
      case userMessage === ".github":
      case userMessage === ".sc":
      case userMessage === ".script":
      case userMessage === ".repo":
        await githubCommand(sock, chatId, message);
        break;
      case userMessage.startsWith(".antibadword"):
        if (!isGroup) {
          await sock.sendMessage(
            chatId,
            {
              text: "🌑 This ward binds only in gatherings.",
              ...channelInfo,
            },
            { quoted: message },
          );
          return;
        }

        const adminStatus = await isAdmin(sock, chatId, senderId);
        isSenderAdmin = adminStatus.isSenderAdmin;
        isBotAdmin = adminStatus.isBotAdmin;

        if (!isBotAdmin) {
          await sock.sendMessage(
            chatId,
            { text: "*🕯️ Tenebri must guard to wield this ward*", ...channelInfo },
            { quoted: message },
          );
          return;
        }

        await antibadwordCommand(
          sock,
          chatId,
          message,
          senderId,
          isSenderAdmin,
        );
        break;
      case userMessage.startsWith(".chatbot"):
        if (!isGroup) {
          await sock.sendMessage(
            chatId,
            {
              text: "🌑 This rite thrives in gatherings alone.",
              ...channelInfo,
            },
            { quoted: message },
          );
          return;
        }

        // Verify Guardian or Sovereign
        const chatbotAdminStatus = await isAdmin(sock, chatId, senderId);
        if (!chatbotAdminStatus.isSenderAdmin && !message.key.fromMe) {
          await sock.sendMessage(
            chatId,
            {
              text: "*⚔️ Only guardians or sovereign may invoke this*",
              ...channelInfo,
            },
            { quoted: message },
          );
          return;
        }

        const match = userMessage.slice(8).trim();
        await handleChatbotCommand(sock, chatId, message, match);
        break;
      case userMessage.startsWith(".take") || userMessage.startsWith(".steal"):
        {
          const isSteal = userMessage.startsWith(".steal");
          const sliceLen = isSteal ? 6 : 5; // '.steal' vs '.take'
          const takeArgs = rawText.slice(sliceLen).trim().split(" ");
          await takeCommand(sock, chatId, message, takeArgs);
        }
        break;
      case userMessage === ".flirt":
        await flirtCommand(sock, chatId, message);
        break;
      case userMessage.startsWith(".character"):
        await characterCommand(sock, chatId, message);
        break;
      case userMessage.startsWith(".waste"):
        await wastedCommand(sock, chatId, message);
        break;
      case userMessage === ".ship":
        if (!isGroup) {
          await sock.sendMessage(
            chatId,
            {
              text: "🌑 This rite thrives in gatherings alone!",
              ...channelInfo,
            },
            { quoted: message },
          );
          return;
        }
        await shipCommand(sock, chatId, message);
        break;
      case userMessage === ".groupinfo" ||
        userMessage === ".infogp" ||
        userMessage === ".infogrupo":
        if (!isGroup) {
          await sock.sendMessage(
            chatId,
            {
              text: "🌑 This rite thrives in gatherings alone!",
              ...channelInfo,
            },
            { quoted: message },
          );
          return;
        }
        await groupInfoCommand(sock, chatId, message);
        break;
      case userMessage === ".resetlink" ||
        userMessage === ".revoke" ||
        userMessage === ".anularlink":
        if (!isGroup) {
          await sock.sendMessage(
            chatId,
            {
              text: "🌑 This rite thrives in gatherings alone!",
              ...channelInfo,
            },
            { quoted: message },
          );
          return;
        }
        await resetlinkCommand(sock, chatId, senderId);
        break;
      case userMessage === ".staff" ||
        userMessage === ".admins" ||
        userMessage === ".listadmin":
        if (!isGroup) {
          await sock.sendMessage(
            chatId,
            {
              text: "🌑 This rite thrives in gatherings alone!",
              ...channelInfo,
            },
            { quoted: message },
          );
          return;
        }
        await staffCommand(sock, chatId, message);
        break;
      case userMessage.startsWith(".tourl") || userMessage.startsWith(".url"):
        await urlCommand(sock, chatId, message);
        break;
      case userMessage.startsWith(".emojimix") ||
        userMessage.startsWith(".emix"):
        await emojimixCommand(sock, chatId, message);
        break;
      case userMessage.startsWith(".tg") ||
        userMessage.startsWith(".stickertelegram") ||
        userMessage.startsWith(".tgsticker") ||
        userMessage.startsWith(".telesticker"):
        await stickerTelegramCommand(sock, chatId, message);
        break;

      case userMessage === ".vv":
        await viewOnceCommand(sock, chatId, message);
        break;
      case userMessage === ".clearsession" || userMessage === ".clearsesi":
        await clearSessionCommand(sock, chatId, message);
        break;
      case userMessage.startsWith(".autostatus"):
        const autoStatusArgs = userMessage.split(" ").slice(1);
        await autoStatusCommand(sock, chatId, message, autoStatusArgs);
        break;
      case userMessage.startsWith(".simp"):
        await simpCommand(sock, chatId, message);
        break;
      case userMessage.startsWith(".metallic"):
        await textmakerCommand(sock, chatId, message, userMessage, "metallic");
        break;
      case userMessage.startsWith(".ice"):
        await textmakerCommand(sock, chatId, message, userMessage, "ice");
        break;
      case userMessage.startsWith(".snow"):
        await textmakerCommand(sock, chatId, message, userMessage, "snow");
        break;
      case userMessage.startsWith(".impressive"):
        await textmakerCommand(
          sock,
          chatId,
          message,
          userMessage,
          "impressive",
        );
        break;
      case userMessage.startsWith(".matrix"):
        await textmakerCommand(sock, chatId, message, userMessage, "matrix");
        break;
      case userMessage.startsWith(".light"):
        await textmakerCommand(sock, chatId, message, userMessage, "light");
        break;
      case userMessage.startsWith(".neon"):
        await textmakerCommand(sock, chatId, message, userMessage, "neon");
        break;
      case userMessage.startsWith(".devil"):
        await textmakerCommand(sock, chatId, message, userMessage, "devil");
        break;
      case userMessage.startsWith(".purple"):
        await textmakerCommand(sock, chatId, message, userMessage, "purple");
        break;
      case userMessage.startsWith(".thunder"):
        await textmakerCommand(sock, chatId, message, userMessage, "thunder");
        break;
      case userMessage.startsWith(".leaves"):
        await textmakerCommand(sock, chatId, message, userMessage, "leaves");
        break;
      case userMessage.startsWith(".1917"):
        await textmakerCommand(sock, chatId, message, userMessage, "1917");
        break;
      case userMessage.startsWith(".arena"):
        await textmakerCommand(sock, chatId, message, userMessage, "arena");
        break;
      case userMessage.startsWith(".hacker"):
        await textmakerCommand(sock, chatId, message, userMessage, "hacker");
        break;
      case userMessage.startsWith(".sand"):
        await textmakerCommand(sock, chatId, message, userMessage, "sand");
        break;
      case userMessage.startsWith(".blackpink"):
        await textmakerCommand(sock, chatId, message, userMessage, "blackpink");
        break;
      case userMessage.startsWith(".glitch"):
        await textmakerCommand(sock, chatId, message, userMessage, "glitch");
        break;
      case userMessage.startsWith(".fire"):
        await textmakerCommand(sock, chatId, message, userMessage, "fire");
        break;
      case userMessage.startsWith(".antidelete"):
        const antideleteMatch = userMessage.slice(11).trim();
        await handleAntideleteCommand(sock, chatId, message, antideleteMatch);
        break;
      case userMessage === ".surrender":
        // Yield in the Trial
        await handleTicTacToeMove(sock, chatId, senderId, "surrender");
        break;
      case userMessage === ".cleartmp":
        await clearTmpCommand(sock, chatId, message);
        break;
      case userMessage === ".setpp":
        await setProfilePicture(sock, chatId, message);
        break;
      case userMessage.startsWith(".setgdesc"):
        {
          const text = rawText.slice(9).trim();
          await setGroupDescription(sock, chatId, senderId, text, message);
        }
        break;
      case userMessage.startsWith(".setgname"):
        {
          const text = rawText.slice(9).trim();
          await setGroupName(sock, chatId, senderId, text, message);
        }
        break;
      case userMessage.startsWith(".setgpp"):
        await setGroupPhoto(sock, chatId, senderId, message);
        break;
      case userMessage.startsWith(".instagram") ||
        userMessage.startsWith(".insta") ||
        userMessage === ".ig" ||
        userMessage.startsWith(".ig "):
        await instagramCommand(sock, chatId, message);
        break;
      case userMessage.startsWith(".igsc"):
        await igsCommand(sock, chatId, message, true);
        break;
      case userMessage.startsWith(".igs"):
        await igsCommand(sock, chatId, message, false);
        break;
      case userMessage.startsWith(".fb") || userMessage.startsWith(".facebook"):
        await facebookCommand(sock, chatId, message);
        break;
      case userMessage.startsWith(".music"):
        await playCommand(sock, chatId, message);
        break;
      case userMessage.startsWith(".spotify"):
        await spotifyCommand(sock, chatId, message);
        break;
      case userMessage.startsWith(".play") ||
        userMessage.startsWith(".mp3") ||
        userMessage.startsWith(".ytmp3") ||
        userMessage.startsWith(".song"):
        await songCommand(sock, chatId, message);
        break;
      case userMessage.startsWith(".video") || userMessage.startsWith(".ytmp4"):
        await videoCommand(sock, chatId, message);
        break;
      case userMessage.startsWith(".tiktok") || userMessage.startsWith(".tt"):
        await tiktokCommand(sock, chatId, message);
        break;
      case userMessage.startsWith(".gpt") || userMessage.startsWith(".gemini"):
        await aiCommand(sock, chatId, message);
        break;
      case userMessage.startsWith(".translate") ||
        userMessage.startsWith(".trt"):
        const commandLength = userMessage.startsWith(".translate") ? 10 : 4;
        await handleTranslateCommand(
          sock,
          chatId,
          message,
          userMessage.slice(commandLength),
        );
        return;
      case userMessage.startsWith(".ss") ||
        userMessage.startsWith(".ssweb") ||
        userMessage.startsWith(".screenshot"):
        const ssCommandLength = userMessage.startsWith(".screenshot")
          ? 11
          : userMessage.startsWith(".ssweb")
            ? 6
            : 3;
        await handleSsCommand(
          sock,
          chatId,
          message,
          userMessage.slice(ssCommandLength).trim(),
        );
        break;
      case userMessage.startsWith(".areact") ||
        userMessage.startsWith(".autoreact") ||
        userMessage.startsWith(".autoreaction"):
        const isOwnerOrSudo = message.key.fromMe || senderIsSudo;
        await handleAreactCommand(sock, chatId, message, isOwnerOrSudo);
        break;
      case userMessage.startsWith(".sudo"):
        await sudoCommand(sock, chatId, message);
        break;
      case userMessage === ".goodnight" ||
        userMessage === ".lovenight" ||
        userMessage === ".gn":
        await goodnightCommand(sock, chatId, message);
        break;
      case userMessage === ".shayari" || userMessage === ".shayri":
        await shayariCommand(sock, chatId, message);
        break;
      case userMessage === ".roseday":
        await rosedayCommand(sock, chatId, message);
        break;
      case userMessage.startsWith(".imagine") ||
        userMessage.startsWith(".flux") ||
        userMessage.startsWith(".dalle"):
        await imagineCommand(sock, chatId, message);
        break;
      case userMessage === ".jid":
        await groupJidCommand(sock, chatId, message);
        break;
      case userMessage.startsWith(".autotyping"):
        await autotypingCommand(sock, chatId, message);
        commandExecuted = true;
        break;
      case userMessage.startsWith(".autoread"):
        await autoreadCommand(sock, chatId, message);
        commandExecuted = true;
        break;
      case userMessage.startsWith(".heart"):
        await handleHeart(sock, chatId, message);
        break;
      case userMessage.startsWith(".horny"):
        {
          const parts = userMessage.trim().split(/\s+/);
          const args = ["horny", ...parts.slice(1)];
          await miscCommand(sock, chatId, message, args);
        }
        break;
      case userMessage.startsWith(".circle"):
        {
          const parts = userMessage.trim().split(/\s+/);
          const args = ["circle", ...parts.slice(1)];
          await miscCommand(sock, chatId, message, args);
        }
        break;
      case userMessage.startsWith(".lgbt"):
        {
          const parts = userMessage.trim().split(/\s+/);
          const args = ["lgbt", ...parts.slice(1)];
          await miscCommand(sock, chatId, message, args);
        }
        break;
      case userMessage.startsWith(".lolice"):
        {
          const parts = userMessage.trim().split(/\s+/);
          const args = ["lolice", ...parts.slice(1)];
          await miscCommand(sock, chatId, message, args);
        }
        break;
      case userMessage.startsWith(".simpcard"):
        {
          const parts = userMessage.trim().split(/\s+/);
          const args = ["simpcard", ...parts.slice(1)];
          await miscCommand(sock, chatId, message, args);
        }
        break;
      case userMessage.startsWith(".tonikawa"):
        {
          const parts = userMessage.trim().split(/\s+/);
          const args = ["tonikawa", ...parts.slice(1)];
          await miscCommand(sock, chatId, message, args);
        }
        break;
      case userMessage.startsWith(".its-so-stupid"):
        {
          const parts = userMessage.trim().split(/\s+/);
          const args = ["its-so-stupid", ...parts.slice(1)];
          await miscCommand(sock, chatId, message, args);
        }
        break;
      case userMessage.startsWith(".namecard"):
        {
          const parts = userMessage.trim().split(/\s+/);
          const args = ["namecard", ...parts.slice(1)];
          await miscCommand(sock, chatId, message, args);
        }
        break;

      case userMessage.startsWith(".oogway2"):
      case userMessage.startsWith(".oogway"):
        {
          const parts = userMessage.trim().split(/\s+/);
          const sub = userMessage.startsWith(".oogway2") ? "oogway2" : "oogway";
          const args = [sub, ...parts.slice(1)];
          await miscCommand(sock, chatId, message, args);
        }
        break;
      case userMessage.startsWith(".tweet"):
        {
          const parts = userMessage.trim().split(/\s+/);
          const args = ["tweet", ...parts.slice(1)];
          await miscCommand(sock, chatId, message, args);
        }
        break;
      case userMessage.startsWith(".ytcomment"):
        {
          const parts = userMessage.trim().split(/\s+/);
          const args = ["youtube-comment", ...parts.slice(1)];
          await miscCommand(sock, chatId, message, args);
        }
        break;
      case userMessage.startsWith(".comrade"):
      case userMessage.startsWith(".gay"):
      case userMessage.startsWith(".glass"):
      case userMessage.startsWith(".jail"):
      case userMessage.startsWith(".passed"):
      case userMessage.startsWith(".triggered"):
        {
          const parts = userMessage.trim().split(/\s+/);
          const sub = userMessage.slice(1).split(/\s+/)[0];
          const args = [sub, ...parts.slice(1)];
          await miscCommand(sock, chatId, message, args);
        }
        break;
      case userMessage.startsWith(".animu"):
        {
          const parts = userMessage.trim().split(/\s+/);
          const args = parts.slice(1);
          await animeCommand(sock, chatId, message, args);
        }
        break;
      // animu aliases
      case userMessage.startsWith(".nom"):
      case userMessage.startsWith(".poke"):
      case userMessage.startsWith(".cry"):
      case userMessage.startsWith(".kiss"):
      case userMessage.startsWith(".pat"):
      case userMessage.startsWith(".hug"):
      case userMessage.startsWith(".wink"):
      case userMessage.startsWith(".facepalm"):
      case userMessage.startsWith(".face-palm"):
      case userMessage.startsWith(".animuquote"):
      case userMessage.startsWith(".quote"):
      case userMessage.startsWith(".loli"):
        {
          const parts = userMessage.trim().split(/\s+/);
          let sub = parts[0].slice(1);
          if (sub === "facepalm") sub = "face-palm";
          if (sub === "quote" || sub === "animuquote") sub = "quote";
          await animeCommand(sock, chatId, message, [sub]);
        }
        break;
      case userMessage === ".crop":
        await stickercropCommand(sock, chatId, message);
        commandExecuted = true;
        break;
      case userMessage.startsWith(".pies"):
        {
          const parts = rawText.trim().split(/\s+/);
          const args = parts.slice(1);
          await piesCommand(sock, chatId, message, args);
          commandExecuted = true;
        }
        break;
      case userMessage === ".china":
        await piesAlias(sock, chatId, message, "china");
        commandExecuted = true;
        break;
      case userMessage === ".indonesia":
        await piesAlias(sock, chatId, message, "indonesia");
        commandExecuted = true;
        break;
      case userMessage === ".japan":
        await piesAlias(sock, chatId, message, "japan");
        commandExecuted = true;
        break;
      case userMessage === ".korea":
        await piesAlias(sock, chatId, message, "korea");
        commandExecuted = true;
        break;
      case userMessage === ".hijab":
        await piesAlias(sock, chatId, message, "hijab");
        commandExecuted = true;
        break;
      case userMessage.startsWith(".update"):
        {
          const parts = rawText.trim().split(/\s+/);
          const zipArg =
            parts[1] && parts[1].startsWith("http") ? parts[1] : "";
          await updateCommand(sock, chatId, message, senderIsSudo, zipArg);
        }
        commandExecuted = true;
        break;
      case userMessage.startsWith(".removebg") ||
        userMessage.startsWith(".rmbg") ||
        userMessage.startsWith(".nobg"):
        await removebgCommand.exec(
          sock,
          message,
          userMessage.split(" ").slice(1),
        );
        break;
      case userMessage.startsWith(".remini") ||
        userMessage.startsWith(".enhance") ||
        userMessage.startsWith(".upscale"):
        await reminiCommand(
          sock,
          chatId,
          message,
          userMessage.split(" ").slice(1),
        );
        break;
      case userMessage.startsWith(".sora"):
        await soraCommand(sock, chatId, message);
        break;
      default:
        if (isGroup) {
          // Commune Whispers if Essence Present
          if (userMessage) {
            await handleChatbotResponse(
              sock,
              chatId,
              message,
              userMessage,
              senderId,
            );
          }
          await handleTagDetection(sock, chatId, message, senderId);
          await handleMentionDetection(sock, chatId, message);
        }
        commandExecuted = false;
        break;
    }

    // Manifest Aura Post-Rite if Awakened
    if (commandExecuted !== false) {
      await showTypingAfterCommand(sock, chatId);
    }

    // Rite to Divine Group JID
    async function groupJidCommand(sock, chatId, message) {
      const groupJid = message.key.remoteJid;

      if (!groupJid.endsWith("@g.us")) {
        return await sock.sendMessage(chatId, {
          text: "💀 This rite echoes in gatherings alone.",
        });
      }

      await sock.sendMessage(
        chatId,
        {
          text: `🕯️ Realm JID: ${groupJid}`,
        },
        {
          quoted: message,
        },
      );
    }

    if (userMessage.startsWith(".")) {
      // Etch Reaction Upon Successful Rite
      await addCommandReaction(sock, message);
    }
  } catch (error) {
    console.error("💀 Curse in whisper handler:", error.message);
    // Herald Failure if Realm Exists
    if (chatId) {
      await sock.sendMessage(chatId, {
        text: "⚔️ Rite shattered!",
        ...channelInfo,
      });
    }
  }
}

async function handleGroupParticipantUpdate(sock, update) {
  try {
    const { id, participants, action, author } = update;

    // Guard: Only in Gatherings
    if (!id.endsWith("@g.us")) return;

    // Honor Realm Mode: Announce Ascensions/Descents in Public Realms
    let isPublic = true;
    try {
      const modeData = JSON.parse(fs.readFileSync("./data/messageCount.json"));
      if (typeof modeData.isPublic === "boolean") isPublic = modeData.isPublic;
    } catch (e) {
      // Default to public if shadows falter
    }

    // Herald Ascensions
    if (action === "promote") {
      if (!isPublic) return;
      await handlePromotionEvent(sock, id, participants, author);
      return;
    }

    // Herald Descents
    if (action === "demote") {
      if (!isPublic) return;
      await handleDemotionEvent(sock, id, participants, author);
      return;
    }

    // Welcome New Souls
    if (action === "add") {
      await handleJoinEvent(sock, id, participants);
    }

    // Bid Farewell to Departed
    if (action === "remove") {
      await handleLeaveEvent(sock, id, participants);
    }
  } catch (error) {
    console.error("💀 Curse in gathering vigil:", error);
  }
}

// Export the Sentinels — With Status Vigil
module.exports = {
  handleMessages,
  handleGroupParticipantUpdate,
  handleStatus: async (sock, status) => {
    await handleStatusUpdate(sock, status);
  },
};