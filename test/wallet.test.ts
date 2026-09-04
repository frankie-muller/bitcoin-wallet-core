// Checks this library's derivation against the official BIP84 test vector
// (https://github.com/bitcoin/bips/blob/master/bip-0084.mediawiki), so
// anyone auditing this repo can confirm the math matches the spec, not just
// "looks like a Bitcoin address."

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { deriveBtcAddress, BTC_DERIVATION_PATH } from '../src/wallet.js';

const BIP84_TEST_MNEMONIC =
  'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';
const BIP84_EXPECTED_ADDRESS = 'bc1qcr8te4kr609gcawutmrza0j4xv80jy8z306fyu';

test('matches the official BIP84 spec test vector', async () => {
  const { address } = await deriveBtcAddress(BIP84_TEST_MNEMONIC, BTC_DERIVATION_PATH);
  assert.equal(address, BIP84_EXPECTED_ADDRESS);
});

test('is deterministic: same mnemonic -> same address, every time', async () => {
  const a = await deriveBtcAddress(BIP84_TEST_MNEMONIC);
  const b = await deriveBtcAddress(BIP84_TEST_MNEMONIC);
  assert.equal(a.address, b.address);
});
