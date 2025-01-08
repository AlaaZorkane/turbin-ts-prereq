import { Keypair } from "@solana/web3.js";
import fs from "node:fs";
import bs58 from "bs58";

try {
  const file = fs.readFileSync("dev-wallet.json", "utf8");

  const wallet = JSON.parse(file);
  const keypair = Keypair.fromSecretKey(Uint8Array.from(wallet));
  console.log("public key (base58):", keypair.publicKey.toBase58());
  console.log("private key (base58):", bs58.encode(keypair.secretKey));
} catch {
  console.error(
    "Failed to parse wallet. Please run `pnpm keygen:export` to generate a wallet.",
  );
  process.exit(1);
}
