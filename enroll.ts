import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Program, Wallet, AnchorProvider } from "@coral-xyz/anchor";
import { IDL, type Turbin3Prereq } from "./programs/turbin3_prereq";
import wallet from "./Turbin3-wallet.json";

const signer = Keypair.fromSecretKey(new Uint8Array(wallet));
console.log("pk", signer.publicKey.toBase58());
const connection = new Connection("https://api.devnet.solana.com");
const github = Buffer.from("alaazorkane", "utf8");
const provider = new AnchorProvider(connection, new Wallet(signer), {
  commitment: "confirmed",
});

const program: Program<Turbin3Prereq> = new Program(IDL, provider);

const enrollmentSeeds = [Buffer.from("prereq"), signer.publicKey.toBuffer()];
const [enrollmentKey, _bump] = PublicKey.findProgramAddressSync(
  enrollmentSeeds,
  program.programId,
);

console.log("enrollmentKey", enrollmentKey.toBase58());

(async () => {
  try {
    const txhash = await program.methods
      .complete(github)
      .accounts({
        signer: signer.publicKey,
      })
      .signers([signer])
      .rpc();
    console.log(`Success! Check out your TX here:
  https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
