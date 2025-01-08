import bs58 from "bs58";
import { Keypair } from "@solana/web3.js";
import promptSync from "prompt-sync";

(() => {
  console.info(
    "Small utility to help you convert from/to base58 encoded secret keys.",
  );

  const input = promptSync();

  const raw = input(
    "[+] Please enter your private key (in base58 or array uint8): \n> ",
  );

  if (raw.startsWith("[")) {
    const uint8Array = new Uint8Array(JSON.parse(raw));
    const keypair = Keypair.fromSecretKey(uint8Array);
    const privateKey = uint8Array.slice(0, 32);
    const publicKeyBs58 = bs58.encode(keypair.publicKey.toBuffer());
    const privateKeyBs58 = bs58.encode(privateKey);
    const secretKeyBs58 = bs58.encode(keypair.secretKey);

    console.info("Public Key (bs58): %s", publicKeyBs58);
    console.info("Secret Key (phantom): %s", secretKeyBs58);
    console.info("Private Key (bs58): %s", privateKeyBs58);
    console.info("Secret key (uint8[]): %s", Array.from(uint8Array));
  } else {
    const uint8Array = bs58.decode(raw);
    const keypair = Keypair.fromSecretKey(uint8Array);
    const privateKey = uint8Array.slice(0, 32);
    const publicKeyBs58 = bs58.encode(keypair.publicKey.toBuffer());
    const privateKeyBs58 = bs58.encode(privateKey);
    const secretKeyBs58 = bs58.encode(keypair.secretKey);

    console.info("Public Key (bs58): %s", publicKeyBs58);
    console.info("Secret Key (phantom): %s", secretKeyBs58);
    console.info("Private Key (bs58): %s", privateKeyBs58);
    console.info("Secret key (uint8[]): %s", Array.from(uint8Array));
  }
})();
