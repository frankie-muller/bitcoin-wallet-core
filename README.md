# bitcoin-wallet-core

Standards-based Bitcoin wallet derivation, built to be read, run, and
checked against the spec entirely on its own — no app, no account, and no
network connection required.

No mocks, no placeholders: `npm run demo` generates a real 12-word BIP39
mnemonic and derives its real, valid mainnet BIP84 (native SegWit) Bitcoin
address, offline, in about a second.

**[Try it in the browser](https://frankie-muller.github.io/bitcoin-wallet-core/)**
— same generation, no install, runs entirely client-side (check your Network
tab; nothing fires on generation). It also has a "Verify" button that checks
the address against [mempool.space](https://mempool.space)'s public API —
the one deliberate, opt-in exception to "no network calls," with the
evidence shown inline and a link to the full explorer page.

## Why this is public

Wallet software is supposed to be auditable. The security of a Bitcoin
address never depends on the derivation algorithm being secret — only the
mnemonic is secret ([Kerckhoffs's principle](https://en.wikipedia.org/wiki/Kerckhoffs%27s_principle)).
This repo has nothing to hide: standard, spec-compliant key derivation
using audited open-source libraries
([`@scure/bip39`](https://github.com/paulmillr/scure-bip39),
[`bip32`](https://github.com/bitcoinjs/bip32),
[`bitcoinjs-lib`](https://github.com/bitcoinjs/bitcoinjs-lib)).

What's deliberately **not** here: key storage and network I/O. Where you
persist a mnemonic (device keychain, HSM, encrypted disk — never plaintext,
never a server) and whatever you build on top of a wallet are integration
decisions for whoever uses this library, not this library's job.

## Quick start

```bash
npm install
npm run demo
```

```
New Bitcoin wallet (mainnet, BIP84 native SegWit)

  mnemonic      <12 random words>
  path          m/84'/0'/0'/0/0
  address       bc1q...
  public key    03...
```

That address is real and in spendable format — it would accept an actual
on-chain deposit. It's also brand new, so the mnemonic printed to your
terminal is the only copy that has ever existed. Don't paste it anywhere;
once a mnemonic has been shown on screen, shared, or logged, treat it as
burned and never fund it.

## Usage

```ts
import { createWallet, deriveBtcAddress } from 'bitcoin-wallet-core';

// Generate a new mnemonic + address in one call
const wallet = await createWallet();
// { mnemonic, path, btcAddress, publicKey }

// Or derive the address for a mnemonic you already have
const { address } = await deriveBtcAddress(existingMnemonic);
```

## Derivation

- **Mnemonic**: BIP39, 12 words, English wordlist, drawn from a CSPRNG.
- **Path**: `m/84'/0'/0'/0/0` — BIP84, account 0, external chain, index 0.
- **Address**: P2WPKH (native SegWit, `bc1...`), mainnet by default; pass any
  `bitcoinjs-lib` `Network` to derive on testnet/regtest instead.

## Web demo

`docs/` is the static site behind the GitHub Pages link above —
`demo-web/main.ts` bundled by esbuild into a single dependency-free
`docs/bundle.js` (`npm run build:web`). It's the same `createWallet()` as
everywhere else in this repo, just running in a browser tab instead of
Node, plus a "Verify" button that cross-checks the generated address
against mempool.space's API.

## Correctness

`npm test` checks this library's output against the
[official BIP84 test vector](https://github.com/bitcoin/bips/blob/master/bip-0084.mediawiki)
from the spec itself — not just "looks like a Bitcoin address."

## Security notes

- This library never persists or transmits a mnemonic or private key. What
  you do with the value `createWallet()` returns is entirely on the caller —
  a hardware-backed device keychain is a reasonable choice, an unencrypted
  file is not.
- `deriveSigningKey` / `signPayload` / `verifyPayload` derive a separate,
  non-Bitcoin secp256k1 identity key — useful for signing your own app's API
  requests. It doesn't touch funds; it's here for completeness.
- This is derivation code, not a wallet app. It has no UI, no key storage,
  and does no network I/O — by design, so there's nothing here that could
  exfiltrate a key.

## License

MIT for the code in this repo. `docs/bundle.js` also compiles in 62
open-source packages (bitcoinjs-lib, the `@scure`/`@noble`/`@bitcoinerlab`
stack, and their transitive dependencies) — see
[THIRD-PARTY-LICENSES.md](THIRD-PARTY-LICENSES.md) for the full list and
license texts.
