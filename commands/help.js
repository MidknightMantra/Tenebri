const settings = require("../settings");
const fs = require("fs");
const path = require("path");

async function helpCommand(sock, chatId, message) {
  const helpMessage = `
┏━━━━━━━━━━━━━━━━━━━┓
   *🕯️ ${settings.botName || "Tenebri"} 🕯️*  
   ⚡ Version: *${settings.version || "1.6.4"}*
   👤 Forged by: *${settings.botOwner || "MidknightMantra"}*
   📺 YT: *${global.ytch}*
┗━━━━━━━━━━━━━━━━━━━┛

*⚔️ Invocations from the Abyss ⚔️*

┏━━━『 🌑 *General Rites* 』
┃ ◈ .help | .menu
┃ ◈ .ping
┃ ◈ .alive
┃ ◈ .tts <text>
┃ ◈ .owner
┃ ◈ .joke
┃ ◈ .quote
┃ ◈ .fact
┃ ◈ .weather <city>
┃ ◈ .news
┃ ◈ .attp <text>
┃ ◈ .lyrics <song>
┃ ◈ .8ball <question>
┃ ◈ .groupinfo
┃ ◈ .staff | .admins
┃ ◈ .vv
┃ ◈ .trt <text> <lang>
┃ ◈ .ss <link>
┃ ◈ .jid
┃ ◈ .url
┗━━━━━━━━━━━━━━━━━━━

┏━━━『 ⚔️ *Guardian Commands* 』
┃ ◈ .ban @user
┃ ◈ .promote @user
┃ ◈ .demote @user
┃ ◈ .mute <minutes>
┃ ◈ .unmute
┃ ◈ .delete | .del
┃ ◈ .kick @user
┃ ◈ .warnings @user
┃ ◈ .warn @user
┃ ◈ .antilink
┃ ◈ .antibadword
┃ ◈ .clear
┃ ◈ .tag <message>
┃ ◈ .tagall
┃ ◈ .tagnotadmin
┃ ◈ .hidetag <message>
┃ ◈ .chatbot
┃ ◈ .resetlink
┃ ◈ .antitag <on/off>
┃ ◈ .welcome <on/off>
┃ ◈ .goodbye <on/off>
┃ ◈ .setgdesc <desc>
┃ ◈ .setgname <name>
┃ ◈ .setgpp (reply)
┗━━━━━━━━━━━━━━━━━━━

┏━━━『 💀 *Sovereign Rites* 』
┃ ◈ .mode <public/private>
┃ ◈ .clearsession
┃ ◈ .antidelete
┃ ◈ .cleartmp
┃ ◈ .update
┃ ◈ .settings
┃ ◈ .setpp (reply)
┃ ◈ .autoreact <on/off>
┃ ◈ .autostatus <on/off>
┃ ◈ .autostatus react <on/off>
┃ ◈ .autotyping <on/off>
┃ ◈ .autoread <on/off>
┃ ◈ .anticall <on/off>
┃ ◈ .pmblocker <on/off/status>
┃ ◈ .pmblocker setmsg <text>
┃ ◈ .setmention (reply)
┃ ◈ .mention <on/off>
┗━━━━━━━━━━━━━━━━━━━

┏━━━『 🎨 *Shadow Arts* 』
┃ ◈ .blur <image>
┃ ◈ .simage (reply)
┃ ◈ .sticker (reply)
┃ ◈ .removebg
┃ ◈ .remini
┃ ◈ .crop (reply)
┃ ◈ .tgsticker <link>
┃ ◈ .meme
┃ ◈ .take <packname>
┃ ◈ .emojimix <emj1>+<emj2>
┃ ◈ .igs <insta link>
┃ ◈ .igsc <insta link>
┗━━━━━━━━━━━━━━━━━━━

┏━━━『 🖼️ *Pies Summons* 』
┃ ◈ .pies <country>
┃ ◈ .china
┃ ◈ .indonesia
┃ ◈ .japan
┃ ◈ .korea
┃ ◈ .hijab
┗━━━━━━━━━━━━━━━━━━━

┏━━━『 🎮 *Trials of the Void* 』
┃ ◈ .tictactoe @user
┃ ◈ .hangman
┃ ◈ .guess <letter>
┃ ◈ .trivia
┃ ◈ .answer <answer>
┃ ◈ .truth
┃ ◈ .dare
┗━━━━━━━━━━━━━━━━━━━

┏━━━『 🧠 *Arcane Intelligence* 』
┃ ◈ .gpt <question>
┃ ◈ .gemini <question>
┃ ◈ .imagine <prompt>
┃ ◈ .flux <prompt>
┃ ◈ .sora <prompt>
┗━━━━━━━━━━━━━━━━━━━

┏━━━『 🎭 *Dark Amusements* 』
┃ ◈ .compliment @user
┃ ◈ .insult @user
┃ ◈ .flirt
┃ ◈ .shayari
┃ ◈ .goodnight
┃ ◈ .roseday
┃ ◈ .character @user
┃ ◈ .wasted @user
┃ ◈ .ship @user
┃ ◈ .simp @user
┃ ◈ .stupid @user [text]
┗━━━━━━━━━━━━━━━━━━━

┏━━━『 ✍️ *Runic Inscriptions* 』
┃ ◈ .metallic <text>
┃ ◈ .ice <text>
┃ ◈ .snow <text>
┃ ◈ .impressive <text>
┃ ◈ .matrix <text>
┃ ◈ .light <text>
┃ ◈ .neon <text>
┃ ◈ .devil <text>
┃ ◈ .purple <text>
┃ ◈ .thunder <text>
┃ ◈ .leaves <text>
┃ ◈ .1917 <text>
┃ ◈ .arena <text>
┃ ◈ .hacker <text>
┃ ◈ .sand <text>
┃ ◈ .blackpink <text>
┃ ◈ .glitch <text>
┃ ◈ .fire <text>
┗━━━━━━━━━━━━━━━━━━━

┏━━━『 📥 *Void Harvester* 』
┃ ◈ .play <song>
┃ ◈ .song <song>
┃ ◈ .spotify <query>
┃ ◈ .instagram <link>
┃ ◈ .facebook <link>
┃ ◈ .tiktok <link>
┃ ◈ .video <song>
┃ ◈ .ytmp4 <link>
┗━━━━━━━━━━━━━━━━━━━

┏━━━『 🌀 *Miscellaneous Dark Arts* 』
┃ ◈ .heart
┃ ◈ .horny
┃ ◈ .circle
┃ ◈ .lgbt
┃ ◈ .lolice
┃ ◈ .its-so-stupid
┃ ◈ .namecard
┃ ◈ .oogway
┃ ◈ .tweet
┃ ◈ .ytcomment
┃ ◈ .comrade
┃ ◈ .gay
┃ ◈ .glass
┃ ◈ .jail
┃ ◈ .passed
┃ ◈ .triggered
┗━━━━━━━━━━━━━━━━━━━

┏━━━『 🌸 *Anime Realm* 』
┃ ◈ .neko
┃ ◈ .waifu
┃ ◈ .loli
┃ ◈ .nom
┃ ◈ .poke
┃ ◈ .cry
┃ ◈ .kiss
┃ ◈ .pat
┃ ◈ .hug
┃ ◈ .wink
┃ ◈ .facepalm
┗━━━━━━━━━━━━━━━━━━━

┏━━━『 💻 *Source Codex* 』
┃ ◈ .git | .github
┃ ◈ .sc | .script
┃ ◈ .repo
┗━━━━━━━━━━━━━━━━━━━

*🕯️ Whisper to the shadows for more...*`;

  try {
    const imagePath = path.join(__dirname, "../assets/bot_image.jpg");

    // Try to send with image first
    if (fs.existsSync(imagePath)) {
      try {
        const imageBuffer = fs.readFileSync(imagePath);

        await sock.sendMessage(
          chatId,
          {
            image: imageBuffer,
            caption: helpMessage,
            contextInfo: {
              forwardingScore: 1,
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: "0029Vb74Dlf4CrfoqpAEBC2T@newsletter",
                newsletterName: "Tenebri",
                serverMessageId: -1,
              },
            },
          },
          { quoted: message },
        );
        return; // Success, exit function
      } catch (imageError) {
        // Image upload failed, fall through to text-only
        console.error("🕯️ Image upload to the void failed, sending text only:", imageError.message);
      }
    }

    // Fallback: Send text-only message
    await sock.sendMessage(chatId, {
      text: helpMessage,
      contextInfo: {
        forwardingScore: 1,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "0029Vb74Dlf4CrfoqpAEBC2T@newsletter",
          newsletterName: "Tenebri by Midknight Mantra",
          serverMessageId: -1,
        },
      },
    });
  } catch (error) {
    // Final fallback: bare text message
    console.error("💀 Error in help command:", error);
    try {
      await sock.sendMessage(chatId, { text: helpMessage });
    } catch (finalError) {
      console.error("⚔️ Complete failure in help command:", finalError);
    }
  }
}

module.exports = helpCommand;
