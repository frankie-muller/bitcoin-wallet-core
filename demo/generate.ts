// Run with: npm run demo
//
// Generates a brand-new, real, valid mainnet Bitcoin wallet. Nothing here
// is a mock or a placeholder: the mnemonic is drawn from a CSPRNG and the
// address is real BIP84 (native SegWit) math, so it would accept a real
// on-chain deposit.
//
// It is also brand new and has never touched a network, so nobody but you
// (right now, on this machine) has ever seen this mnemonic. Fund it if you
// want to prove it to yourself — just don't paste the mnemonic anywhere.

import { createWallet } from '../src/wallet.js';

const wallet = await createWallet();

console.log('\nNew Bitcoin wallet (mainnet, BIP84 native SegWit)\n');
console.log('  mnemonic     ', wallet.mnemonic);
console.log('  path         ', wallet.path);
console.log('  address      ', wallet.btcAddress);
console.log('  public key   ', wallet.publicKey);
console.log('\nThis address is real and spendable-format. Its mnemonic exists');
console.log('only in this terminal output — treat it as live key material.\n');
