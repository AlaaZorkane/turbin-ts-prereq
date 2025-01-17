import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import wallet from "./dev-wallet.json";

const from = Keypair.fromSecretKey(new Uint8Array(wallet));
const to = new PublicKey("GLtaTaYiTQrgz411iPJD79rsoee59HhEy18rtRdrhEUJ");

const connection = new Connection("https://api.devnet.solana.com");

const transfer = async () => {
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: from.publicKey,
      toPubkey: to,
      lamports: LAMPORTS_PER_SOL / 100,
    }),
  );
  transaction.recentBlockhash = (
    await connection.getLatestBlockhash("confirmed")
  ).blockhash;

  transaction.feePayer = from.publicKey;
  // Sign transaction, broadcast, and confirm
  const signature = await sendAndConfirmTransaction(connection, transaction, [
    from,
  ]);
  console.log(
    `Success! Check out your TX here: https://explorer.solana.com/tx/${signature}?cluster=devnet`,
  );
};

const drain = async () => {
  const balance = await connection.getBalance(from.publicKey);
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: from.publicKey,
      toPubkey: to,
      lamports: balance,
    }),
  );
  transaction.recentBlockhash = (
    await connection.getLatestBlockhash("confirmed")
  ).blockhash;

  transaction.feePayer = from.publicKey;

  const fee =
    (
      await connection.getFeeForMessage(
        transaction.compileMessage(),
        "confirmed",
      )
    ).value || 0;
  transaction.instructions.pop();

  transaction.add(
    SystemProgram.transfer({
      fromPubkey: from.publicKey,
      toPubkey: to,
      lamports: balance - fee,
    }),
  );

  const signature = await sendAndConfirmTransaction(connection, transaction, [
    from,
  ]);

  console.log(
    `Draining successfully: https://explorer.solana.com/tx/${signature}?cluster=devnet`,
  );
};

(async () => {
  try {
    await transfer();
  } catch (e) {
    console.error(`Oops, something went wrong with transferring: ${e}`);
    process.exit(1);
  }

  try {
    await drain();
  } catch (e) {
    console.error(`Oops, something went wrong with draining: ${e}`);
    process.exit(1);
  }
})();
