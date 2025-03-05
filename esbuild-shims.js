const path = require("path");

// Check if __dirname is undefined and define it
if (typeof __dirname === "undefined") {
  global.__dirname = path.resolve();
}

if (typeof __filename === "undefined") {
  global.__filename = path.join(global.__dirname, "dist", "extension.js"); // ✅ Manually set filename
}
