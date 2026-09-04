// Pure BIP39 → BIP32 → BIP84 derivation. No storage, no network, no platform
// APIs — this file only does math. Given a mnemonic it is fully deterministic:
// same mnemonic in, same address out, every time, on any machine.
//
// This is the derivation a production wallet would use to create a user's
// address, minus any key-storage step — storage is app-specific and out of
// scope for a public library that only does math.

import * as bip39 from '@scure/bip39';
import { wordlist as englishWordlist } from '@scure/bip39/wordlists/english';
import { BIP32Factory } from 'bip32';
import * as ecc from '@bitcoinerlab/secp256k1';
import * as bitcoin from 'bitcoinjs-lib';
import { HDKey } from '@scure/bip32';
import { Buffer } from 'buffer';

const bip32 = BIP32Factory(ecc);

/** BIP84 (native SegWit, bech32) — account 0, external chain, index 0. */
export const BTC_DERIVATION_PATH = "m/84'/0'/0'/0/0";

export interface BtcWallet {
  mnemonic: string;
  path: string;
  btcAddress: string;
  publicKey: string;
}

/** A fresh, cryptographically random 12-word BIP39 mnemonic. */
export function generateMnemonic(): string {
  return bip39.generateMnemonic(englishWordlist);
}

/**
 * Derives a real, valid mainnet Bitcoin address from a mnemonic.
 * Deterministic — the same mnemonic always yields the same address.
 */
export async function deriveBtcAddress(
  mnemonic: string,
  path: string = BTC_DERIVATION_PATH,
  network: bitcoin.Network = bitcoin.networks.bitcoin,
): Promise<{ address: string; publicKey: string }> {
  const seed = await bip39.mnemonicToSeed(mnemonic);
  const root = bip32.fromSeed(Buffer.from(seed), network);
  const node = root.derivePath(path);

  const { address } = bitcoin.payments.p2wpkh({ pubkey: node.publicKey, network });
  if (!address) throw new Error('Failed to derive BTC address.');

  return { address, publicKey: Buffer.from(node.publicKey).toString('hex') };
}

/**
 * Generates a brand-new mnemonic and derives its BIP84 Bitcoin address in
 * one call. The mnemonic is the only secret here — treat it like the
 * password to real funds, because on mainnet it is one.
 */
export async function createWallet(
  network: bitcoin.Network = bitcoin.networks.bitcoin,
): Promise<BtcWallet> {
  const mnemonic = generateMnemonic();
  const { address, publicKey } = await deriveBtcAddress(mnemonic, BTC_DERIVATION_PATH, network);
  return { mnemonic, path: BTC_DERIVATION_PATH, btcAddress: address, publicKey };
}

/**
 * Derives a secp256k1 keypair from a mnemonic at an arbitrary path — used by
 * the app for a non-Bitcoin "in-app signing" identity key, kept generic here
 * since the path itself isn't sensitive (security comes from the mnemonic).
 */
export async function deriveSigningKey(
  mnemonic: string,
  path: string,
): Promise<{ privateKey: Uint8Array; publicKey: string }> {
  const seed = await bip39.mnemonicToSeed(mnemonic);
  const root = HDKey.fromMasterSeed(seed);
  const node = root.derive(path);

  if (!node.privateKey || !node.publicKey) {
    throw new Error(`Failed to derive signing key at ${path}.`);
  }

  return {
    privateKey: node.privateKey,
    publicKey: Buffer.from(node.publicKey).toString('hex'),
  };
}
