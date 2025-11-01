/**
 * ╔═══════════════════════════════════════════════╗
 *  🕯️ Tenebri v1.6.3 — Forged in Eternal Shadows
 *  by Midknight Mantra
 * ╚═══════════════════════════════════════════════╝
 */

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const readline = require("readline");
const yargs = require("yargs");
const cluster = require("cluster");
const cfonts = require("cfonts");
const { say } = cfonts;
const { join } = path;

// Import for QR handling
const QRCode = require("qrcode");

// Import config
require("./config");
const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, DisconnectReason, Boom } = require("@whiskeysockets/baileys");

// ===============================
// 🧠 Globals
// ===============================
let isRunning = false;
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const ask = (text) => new Promise((resolve) => rl.question(text, resolve));

// Enhanced Banner function with spooky flair
function showBanner() {
  console.clear();
  say("Tenebri", {
    font: "chrome",
    align: "center",
    gradient: ["#8a2be2", "#000000"],
  });

  say("Forged in Eternal Shadows — Midknight Mantra", {
    font: "console",
    align: "center",
    colors: ["red"],
  });

  // Add a spooky ASCII art for theme immersion
  console.log(chalk.magentaBright(`
    🌑⚔️  In the depths of night, courage awakens...
    Beware the void, for Tenebri watches. 🕯️
  `));
}

// ===============================
// 🕯️ Login Method Handling
// ===============================
async function startLauncher() {
  showBanner();
  console.log(chalk.yellowBright("—◉ Awakening Tenebri from the abyss...\n"));

  // Ensure auth folder exists
  const authPath = path.join(__dirname, "session");
  if (!fs.existsSync(authPath)) fs.mkdirSync(authPath, { recursive: true });

  // If creds exist, skip asking and log themed message
  if (fs.existsSync(path.join(authPath, "creds.json"))) {
    console.log(chalk.dim("—◉ Ancient credentials detected. Summoning the core..."));
    startTenebriCore();
    return;
  }

  // Ask user for login method with themed prompts
  const option = await ask(
    chalk.yellowBright("—◉ Choose your path through the shadows (enter number only):\n") +
      chalk.white("1. QR Code (Scan the ethereal glyph)\n2. 8-digit Text Code (Whisper the forbidden digits)\n—> ")
  );

  if (option === "2") {
    const phone = await ask(
      chalk.yellowBright("\n—◉ Invoke your WhatsApp number from the void:\n") +
        chalk.white("Example: +254758925674\n—> ")
    );

    process.argv.push("--method=code");
    process.argv.push("--phone=" + phone);
  } else {
    process.argv.push("--method=qr");
  }

  rl.close();
  startTenebriCore();
}

// Custom themed logger without external dependencies
function createThemedLogger(baseLevel) {
  const levels = {
    trace: 10,
    debug: 20,
    info: 30,
    warn: 40,
    error: 50,
    fatal: 60,
    silent: Infinity
  };

  const currentLevel = levels[baseLevel] || levels.warn;

  return function logger(bindings = {}) {
    const log = (levelKey, msg, extra = {}) => {
      if (levels[levelKey] < currentLevel) return;

      const className = bindings.class || extra.class || 'Void';
      let color;
      switch (levelKey) {
        case 'trace': color = chalk.gray; break;
        case 'debug': color = chalk.blue; break;
        case 'info': color = chalk.cyan; break;
        case 'warn': color = chalk.yellow; break;
        case 'error': color = chalk.red; break;
        case 'fatal': color = chalk.redBright; break;
        default: color = chalk.white;
      }

      console.log(color(`—◉ [${className.toUpperCase()}] ${msg}`));
      if (Object.keys(extra).length > 0) {
        console.log(chalk.dim(JSON.stringify(extra, null, 2)));
      }
    };

    return {
      trace: (msg, extra) => log('trace', msg, extra),
      debug: (msg, extra) => log('debug', msg, extra),
      info: (msg, extra) => log('info', msg, extra),
      warn: (msg, extra) => log('warn', msg, extra),
      error: (msg, extra) => log('error', msg, extra),
      fatal: (msg, extra) => log('fatal', msg, extra),
      level: baseLevel,
      child: (newBindings) => createThemedLogger(baseLevel)({ ...bindings, ...newBindings })
    };
  };
}

// ===============================
// 🕯️ Core Bot Starter
// ===============================
async function startTenebriCore() {
  if (isRunning) return;
  isRunning = true;

  const pairingCode = process.argv.includes("--method=code");
  const qrMode = process.argv.includes("--method=qr");
  const phoneArg = process.argv.find((a) => a.startsWith("--phone="));
  const phoneNumber = phoneArg ? phoneArg.split("=")[1] : null;

  // Parse args for logging level
  const args = yargs.argv;
  const logLevel = args.verbose ? 'debug' : (args.quiet ? 'silent' : 'warn');

  try {
    const { state, saveCreds } = await useMultiFileAuthState("./session");
    const { version } = await fetchLatestBaileysVersion();

    // Create themed logger
    const logger = createThemedLogger(logLevel)();

    const conn = makeWASocket({
      auth: state,
      browser: ["Tenebri", "Chrome", "1.6.3"],
      version,
      logger, // Use custom themed logger
      getMessage: async (key) => {
        // Optional: For message retrieval if needed for resends, etc.
        return { conversation: "Echo from the void..." };
      },
    });

    // Handle connection updates for QR and status (enhanced for deprecation)
    conn.ev.on("connection.update", async (update) => {
      const { connection, lastDisconnect, qr } = update;

      if (qr) {
        console.log(chalk.yellowBright("\n—◉ Behold the ethereal glyph from the void:"));
        console.log(await QRCode.toString(qr, { type: "terminal", small: true }));
        console.log(chalk.dim("—◉ Scan this arcane symbol with your WhatsApp app to bind Tenebri."));
      }

      if (connection === "close") {
        const shouldReconnect = (lastDisconnect?.error instanceof Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
        console.log(chalk.redBright(`—◉ Connection severed from the shadows: ${lastDisconnect?.error?.message || "Unknown curse"}`));
        if (shouldReconnect) {
          console.log(chalk.yellowBright("—◉ Resurrecting the bond..."));
          startTenebriCore(); // Recursive restart for reliability
        } else {
          console.log(chalk.redBright("—◉ The bond is broken. Purge the session folder and summon anew."));
          process.exit(0);
        }
      } else if (connection === "open") {
        console.log(chalk.greenBright("—◉ Tenebri is bound to your essence! The void obeys."));
        console.log(chalk.dim("—◉ Syncing ancient whispers and shadows..."));
      }
    });

    // Text Pairing Code with themed output
    if (pairingCode && phoneNumber && !conn.authState.creds.registered) {
      setTimeout(async () => {
        try {
          const code = await conn.requestPairingCode(phoneNumber);
          console.log(chalk.yellowBright(`\n—◉ Arcane pairing code for ${phoneNumber} revealed:\n`));
          console.log(chalk.greenBright(`   ${code}\n`));
          console.log(
            chalk.dim(
              "—◉ Bind this code in WhatsApp → Linked Devices → Link with phone number. The shadows await."
            )
          );
        } catch (err) {
          console.error(chalk.red("—◉ Curse upon the void! Failed to summon pairing code:"), err);
        }
      }, 2000);
    }

    // Load Tenebri core handlers
    const { handleMessages, handleGroupParticipantUpdate, handleStatus } = require("./main");

    // Attach handlers with themed logging
    conn.ev.on("messages.upsert", (m) => {
      console.log(chalk.dim("—◉ Whispers from the ether detected..."));
      handleMessages(conn, m, true);
    });
    conn.ev.on("group-participants.update", (u) => {
      console.log(chalk.dim("—◉ Shadows shift in the gathering..."));
      handleGroupParticipantUpdate(conn, u);
    });
    conn.ev.on("presence.update", (s) => {
      console.log(chalk.dim("—◉ A presence stirs in the darkness..."));
      handleStatus(conn, s);
    });
    conn.ev.on("creds.update", saveCreds);

    // Additional event for chat/messages load (themed)
    conn.ev.on("chats.set", () => {
      console.log(chalk.dim("—◉ The gathering of souls is complete..."));
    });
    conn.ev.on("messages.set", () => {
      console.log(chalk.dim("—◉ Echoes of past whispers have been archived..."));
    });

    console.log(chalk.greenBright("\n🕯️ Tenebri rises from the abyss, bound and vigilant...\n"));
  } catch (error) {
    console.error(chalk.red("🔥 Cataclysmic error awakening Tenebri:"), error);
    process.exit(1);
  }
}

// ===============================
// 🔁 Restart / Uptime Messaging
// ===============================
if (cluster.isPrimary) {
  cluster.fork();

  cluster.on("exit", (worker, code, signal) => {
    console.log(chalk.redBright(`—◉ Tenebri's essence fades (${code || signal}). Resurrecting from the void...`));
    setTimeout(() => cluster.fork(), 1000);
  });

  // Pass stdin to worker
  rl.on("line", (line) => {
    for (const id in cluster.workers) {
      cluster.workers[id].send(line.trim());
    }
  });
} else {
  // Parse CLI args with yargs for better options handling (enhanced with verbose/quiet)
  yargs
    .option("method", {
      describe: "Login method: qr or code",
      type: "string",
    })
    .option("phone", {
      describe: "Phone number for pairing code",
      type: "string",
    })
    .option("verbose", {
      describe: "Enable detailed logging from the shadows",
      type: "boolean",
      default: false,
    })
    .option("quiet", {
      describe: "Silence the whispers, show only essentials",
      type: "boolean",
      default: false,
    })
    .argv;

  startLauncher();
}