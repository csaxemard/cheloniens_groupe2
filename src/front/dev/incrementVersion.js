// incrementVersion.js
// Usage: node incrementVersion.js

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

console.log("\n--- incrementVersion.js ---\n")

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Chemin mis à jour
const filePath = path.join(__dirname, "..", "src", "APP_VERSION.js");

let content = fs.readFileSync(filePath, "utf8");

// Cherche version
const match = content.match(/const\s+APP_VERSION\s*=\s*"(\d+)\.(\d+)\.(\d+)"/);

if (!match) {
    console.error("Version not found");
    process.exit(1);
}

let [_, major, minor, patch] = match.map(Number);
let oldVersion = `${major}.${minor}.${patch}`

// Incrémente le patch
patch += 1;
const newVersion = `${major}.${minor}.${patch}`;

// Remplace version
content = content.replace(
    /const\s+APP_VERSION\s*=\s*"\d+\.\d+\.\d+"/,
    `const APP_VERSION = "${newVersion}"`
);

// Met à jour le commentaire "Last version : X.Y.Z"
content = content.replace(
    /\/\/.+/,
    `// Last version : ${oldVersion} (line edited by dev/incrementVersion.js)`
);

fs.writeFileSync(filePath, content, "utf8");

console.log(`Version mise à jour : ${oldVersion} -> ${newVersion}\n`);



// Ajoute tag au commit, push, push --tags

try {
    execSync(`git tag ${oldVersion}`, { stdio: "inherit" });
    console.log(`Git tag ${oldVersion} ajouté au dernier commit\n`);
} catch (err) {
    console.error("Erreur lors de git tag :", err.message);
}

