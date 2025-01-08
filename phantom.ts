import bs58 from "bs58";
import { Keypair } from "@solana/web3.js";

(() => {
  console.info(
    "Small utility to help you convert from/to base58 encoded secret keys.",
  );

  // const input = promptSync();

  // const raw = input(
  //   "[+] Please enter your private key (in base58 or array uint8): \n> ",
  // );
  // const raw =
  //   "[58,0,140,60,7,56,25,209,243,59,213,164,86,244,146,209,155,37,250,122,217,226,179,97,172,56,135,86,245,19,16,108,79,107,133,90,255,115,218,156,255,163,157,65,194,82,89,33,173,26,29,225,230,5,154,25,33,127,53,79,221,26,96,35]";
  const raw =
    "2AG4MDMsHNV5vU9a6VsGQG6j4kRPQu7HQ82pMDYow8G1modZ5VTCuUAPP83QDSgRPXHoEF3z5mrbRJJu6HTXSmsQ";

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
