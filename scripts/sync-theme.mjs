import { readFile, writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const check = args.includes("--check");
const targetArg = args.find(arg => arg !== "--check");
if (!targetArg) throw new Error("Usage: node scripts/sync-theme.mjs <sarveshk-dev checkout> [--check]");
const source = resolve(dirname(fileURLToPath(import.meta.url)), "../theme.css");
const targetRoot = resolve(targetArg);
const manifest = JSON.parse(await readFile(resolve(targetRoot, "package.json"), "utf8"));
if (manifest.name !== "sarveshk-dev") throw new Error("Target must be the sarveshk-dev checkout.");
const target = resolve(targetRoot, "public/theme.css");
const canonical = await readFile(source, "utf8");
if (check) {
  if (await readFile(target, "utf8") !== canonical) throw new Error("Themes differ. Run sync without --check.");
  console.log("Shared themes match.");
} else {
  await writeFile(target, canonical, "utf8");
  console.log("Copied the canonical theme to sarveshk-dev/public/theme.css.");
}
