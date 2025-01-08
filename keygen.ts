import { Keypair } from "@solana/web3.js";
import fs from "node:fs";

const kp = Keypair.generate();

console.log(`You've generated a new Solana wallet: ${kp.publicKey.toBase58()}`);
console.log(`[${kp.secretKey}]`)

// Write to file if export flag is passed
const shouldExport = process.argv[2] === "export";
if (shouldExport) {
  try {
    fs.writeFileSync("dev-wallet.json", JSON.stringify(Array.from(kp.secretKey)), { flag: "wx"});
  } catch {
    console.info("A wallet already exists. Skipping...");
  }
}
