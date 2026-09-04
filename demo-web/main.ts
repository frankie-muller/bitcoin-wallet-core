// Wires the button on docs/index.html to the exact same createWallet() the
// CLI demo and the test suite use — this file is the entire client-side
// logic behind the GitHub Pages demo, bundled by `npm run build:web` into
// docs/bundle.js. No server, no API calls: open the Network tab while using
// the page and you will see nothing fire after the initial page load.

import { createWallet } from '../src/wallet.js';

const button = document.querySelector<HTMLButtonElement>('#generate')!;
const output = document.querySelector<HTMLDivElement>('#output')!;

function row(label: string, value: string): string {
  return `<div class="row"><span class="label">${label}</span><code>${value}</code></div>`;
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
      '<p class="warn">Real, spendable-format mainnet address. It has now been shown on screen — treat it as burned, never fund it.</p>';

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
