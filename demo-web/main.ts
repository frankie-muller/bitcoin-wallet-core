// Wires the button on docs/index.html to the exact same createWallet() the
// CLI demo and the test suite use — this file is the entire client-side
// logic behind the GitHub Pages demo, bundled by `npm run build:web` into
// docs/bundle.js.
//
// Generating a wallet makes zero network calls — open the Network tab and
// click "Generate real wallet" to confirm nothing fires. Verifying one is
// the one deliberate exception: a separate, opt-in button that asks a
// public block explorer's API whether the address is real. It's not part
// of generation, so the "nothing fires" claim above still holds for that.

import { createWallet } from '../src/wallet.js';

const button = document.querySelector<HTMLButtonElement>('#generate')!;
const output = document.querySelector<HTMLDivElement>('#output')!;

function row(label: string, value: string): string {
  return `<div class="row"><span class="label">${label}</span><code>${value}</code></div>`;
}

interface MempoolAddressInfo {
  chain_stats: { tx_count: number; funded_txo_sum: number };
}

async function verifyAddress(address: string): Promise<void> {
  const verifyBtn = document.querySelector<HTMLButtonElement>('#verify')!;
  const resultEl = document.querySelector<HTMLDivElement>('#verify-result')!;

  verifyBtn.disabled = true;
  verifyBtn.textContent = 'Checking mempool.space…';
  resultEl.innerHTML = '';

  const explorerLink = `<a href="https://mempool.space/address/${address}" target="_blank" rel="noopener">View on mempool.space ↗</a>`;

  try {
    const res = await fetch(`https://mempool.space/api/address/${address}`);
    if (!res.ok) throw new Error(`mempool.space responded with ${res.status}`);
    const data = (await res.json()) as MempoolAddressInfo;

    resultEl.innerHTML =
      `<p class="evidence">&#10003; mempool.space recognizes this as a valid mainnet address ` +
      `&mdash; ${data.chain_stats.tx_count} on-chain transaction(s), ${data.chain_stats.funded_txo_sum} sats received. ` +
      `Zero of both is expected: it was generated seconds ago and has never been funded.</p>` +
      explorerLink;
  } catch (err) {
    resultEl.innerHTML =
      `<p class="error">Could not reach mempool.space (${err instanceof Error ? err.message : String(err)}). ` +
      `Check it yourself instead:</p>` +
      explorerLink;
  } finally {
    verifyBtn.disabled = false;
    verifyBtn.textContent = 'Verify on mempool.space';
  }
}

button.addEventListener('click', async () => {
  button.disabled = true;
  button.textContent = 'Generating…';

  try {
    const wallet = await createWallet();

    output.hidden = false;
    output.innerHTML =
      row('mnemonic', wallet.mnemonic) +
      row('path', wallet.path) +
      row('address', wallet.btcAddress) +
      row('public key', wallet.publicKey) +
      '<p class="warn">Real, spendable-format mainnet address. It has now been shown on screen — treat it as burned, never fund it.</p>' +
      '<div class="verify-block">' +
      '<button id="verify" type="button" class="secondary">Verify on mempool.space</button>' +
      '<span class="verify-note">— the one button on this page that makes a network call, and only when you click it.</span>' +
      '<div id="verify-result"></div>' +
      '</div>';

    document.querySelector<HTMLButtonElement>('#verify')!.addEventListener('click', () => verifyAddress(wallet.btcAddress));

    button.textContent = 'Generate another';
  } catch (err) {
    output.hidden = false;
    output.innerHTML = `<p class="error">Something went wrong generating a wallet: ${
      err instanceof Error ? err.message : String(err)
    }</p>`;
    button.textContent = 'Try again';
  } finally {
    button.disabled = false;
  }
});
