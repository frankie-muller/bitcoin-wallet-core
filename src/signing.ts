// Sign and verify arbitrary payloads with a secp256k1 key derived by
// deriveSigningKey(). Uses @noble/hashes so this file runs unmodified on
// Node, in a browser, or in React Native — the app itself may swap in a
// platform-native hasher for speed, but the math here is what the server
// verifies against.

import { sha256 } from '@noble/hashes/sha2.js';
import * as secp256k1 from '@bitcoinerlab/secp256k1';
import { Buffer } from 'node:buffer';

export interface SignedPayload {
  signature: string;
  publicKey: string;
}

function hashPayload(payload: unknown): Uint8Array {
  return sha256(Buffer.from(JSON.stringify(payload)));
}

export function signPayload(privateKey: Uint8Array, publicKeyHex: string, payload: unknown): SignedPayload {
  const hash = hashPayload(payload);
  const signature = secp256k1.sign(hash, privateKey);
  return { signature: Buffer.from(signature).toString('hex'), publicKey: publicKeyHex };
}

export function verifyPayload(publicKeyHex: string, signatureHex: string, payload: unknown): boolean {
  const hash = hashPayload(payload);
  return secp256k1.verify(hash, Buffer.from(publicKeyHex, 'hex'), Buffer.from(signatureHex, 'hex'));
}
