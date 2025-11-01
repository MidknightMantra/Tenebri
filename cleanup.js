// basic cleanup script for Tenebri
const fs = require("fs");

function cleanDir(path) {
  if (fs.existsSync(path)) {
    fs.rmSync(path, { recursive: true, force: true });
    console.log(`🧹 Cleared: ${path}`);
  }
}

console.log("🕯️ Cleaning temporary directories...");
cleanDir("./session");
cleanDir("./.cache");
cleanDir("./temp");
console.log("✅ Cleanup complete.");
