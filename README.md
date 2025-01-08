<img src="https://turbin3.com/turbine-logo-text.svg" alt="Turbin3" width="200">

**Turbin3 Typescript Prereq - Anchor Version**

## What do you mean by "anchor version"?
I had some time after finishing up this version (which follows exactly the instructions in the prereq document) and I was looking for something to learn, so I made a codama and web3js v2 version [here](https://github.com/AlaaZorkane/turbin3-ts-prereq-v2).

## Structure
- `phantom.ts`: Phantom key converter, helps you convert from/to base58 encoded secret keys, `prompt-sync` is wonky though.
- `keygen.ts`: Keygen, simple script to generate a `dev-wallet.json`, it doesn't overwrite the file if it already exists
- `airdrop.ts`: Airdrop, simple script to airdrop SOL to your `dev-wallet.json`
- `transfer.ts`: The transfer script, it uses the `dev-wallet.json` to transfer SOL to the specified address and later to drain the wallet to turbin3's address.
- `enroll.ts`: Uses Anchor's IDL to call the confirm function with my github username.

### Setup

- Make sure you have `node` & `pnpm` installed
- You can also use `yarn`

### Keygen

```bash
pnpm keygen
```

To export the file into a `dev-wallet.json`:

```bash
pnpm keygen:export
```

### Airdrop

```bash
pnpm airdrop
```

### Transfer

CAUTION: this drains the wallet, so maybe call `enroll` first to prevent airdrop 429.

```bash
pnpm transfer
```

### Enroll

You need to have a `Turbin3-wallet.json` file in the root of the project.

```bash
pnpm enroll
```
