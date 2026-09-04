# Third-party licenses

This file exists because of `docs/bundle.js`, not because of anything in
`package.json`. Consuming this repo as an npm package pulls in each
dependency separately, license included — nothing extra to do there. The
web demo is different: `npm run build:web` compiles the actual source of
every package below into one file and ships it to every visitor of
[the live demo](https://frankie-muller.github.io/bitcoin-wallet-core/).
That's redistribution, and MIT/BSD/ISC all require the original copyright
notice to travel with the code. This is that notice.

62 packages, because a BIP32/BIP39/secp256k1 stack pulls in a long tail of
small, single-purpose helpers most consumers never see the names of.
Every one of them is a runtime dependency actually compiled into
`docs/bundle.js` (verified by inspecting the bundle's own module map) — no
dev tooling (esbuild, TypeScript, tsx) is included below, since none of
that ships to a visitor's browser.

| Package | Version | License | Copyright |
|---|---|---|---|
| `@bitcoinerlab/secp256k1` | 1.2.0 | MIT | Copyright Jose-Luis Landabaso |
| `@noble/curves` | 1.9.7 | MIT | Copyright (c) 2022 Paul Miller (https://paulmillr.com) |
| `@noble/hashes` | 1.8.0 | MIT | Copyright (c) 2022 Paul Miller (https://paulmillr.com) |
| `@scure/base` | 1.2.6 | MIT | Copyright (c) 2022 Paul Miller (https://paulmillr.com) |
| `@scure/bip32` | 1.7.0 | MIT | Copyright (c) 2022 Patricio Palladino, Paul Miller (paulmillr.com) |
| `@scure/bip39` | 1.6.0 | MIT | Copyright (c) 2022 Patricio Palladino, Paul Miller (paulmillr.com) |
| `available-typed-arrays` | 1.0.7 | MIT | Copyright (c) 2020 Inspect JS |
| `base-x` | 4.0.1 | MIT | Copyright (c) 2018 base-x contributors |
| `base64-js` | 1.5.1 | MIT | Copyright (c) 2014 Jameson Little |
| `bech32` | 2.0.0 | MIT | Copyright (c) 2017 Pieter Wuille |
| `bip174` | 2.1.1 | MIT | Copyright (c) 2019 Jonathan Underwood and BitcoinJS team |
| `bip32` | 4.0.0 | MIT | Copyright (c) 2011-2018 bitcoinjs-lib contributors |
| `bitcoinjs-lib` | 6.1.7 | MIT | Copyright (c) 2011-2020 bitcoinjs-lib contributors |
| `bs58` | 5.0.0 | MIT | Copyright (c) 2018 cryptocoinjs |
| `bs58check` | 3.0.1 | MIT | Copyright (c) 2017 Daniel Cousens |
| `buffer` | 6.0.3 | MIT | Copyright (c) Feross Aboukhadijeh, and other contributors. |
| `call-bind` | 1.0.9 | MIT | Copyright (c) 2020 Jordan Harband |
| `call-bind-apply-helpers` | 1.0.2 | MIT | Copyright (c) 2024 Jordan Harband |
| `call-bound` | 1.0.4 | MIT | Copyright (c) 2024 Jordan Harband |
| `cipher-base` | 1.0.7 | MIT | Copyright (c) 2017 crypto-browserify contributors |
| `core-util-is` | 1.0.3 | MIT | Copyright Node.js contributors. All rights reserved. |
| `create-hash` | 1.2.0 | MIT | Copyright (c) 2017 crypto-browserify contributors |
| `define-data-property` | 1.1.4 | MIT | Copyright (c) 2023 Jordan Harband |
| `dunder-proto` | 1.0.1 | MIT | Copyright (c) 2024 ECMAScript Shims |
| `es-define-property` | 1.0.1 | MIT | Copyright (c) 2024 Jordan Harband |
| `es-errors` | 1.3.0 | MIT | Copyright (c) 2024 Jordan Harband |
| `es-object-atoms` | 1.1.2 | MIT | Copyright (c) 2024 Jordan Harband |
| `events` | 3.3.0 | MIT | Copyright Joyent, Inc. and other Node contributors. |
| `for-each` | 0.3.5 | MIT | Copyright (c) 2012 Raynos. |
| `function-bind` | 1.1.2 | MIT | Copyright (c) 2013 Raynos. |
| `get-intrinsic` | 1.3.0 | MIT | Copyright (c) 2020 Jordan Harband |
| `get-proto` | 1.0.1 | MIT | Copyright (c) 2025 Jordan Harband |
| `gopd` | 1.2.0 | MIT | Copyright (c) 2022 Jordan Harband |
| `has-property-descriptors` | 1.0.2 | MIT | Copyright (c) 2022 Inspect JS |
| `has-symbols` | 1.1.0 | MIT | Copyright (c) 2016 Jordan Harband |
| `has-tostringtag` | 1.0.2 | MIT | Copyright (c) 2021 Inspect JS |
| `hash-base` | 3.1.2 | MIT | Copyright (c) 2016 Kirill Fomichev |
| `hasown` | 2.0.4 | MIT | Copyright (c) Jordan Harband and contributors |
| `ieee754` | 1.2.1 | BSD-3-Clause | Copyright 2008 Fair Oaks Labs, Inc. |
| `inherits` | 2.0.4 | ISC | Copyright (c) Isaac Z. Schlueter |
| `is-callable` | 1.2.7 | MIT | Copyright (c) 2015 Jordan Harband |
| `is-typed-array` | 1.1.15 | MIT | Copyright (c) 2015 Jordan Harband |
| `isarray` | 1.0.0 | MIT | Copyright Julian Gruber |
| `math-intrinsics` | 1.1.0 | MIT | Copyright (c) 2024 ECMAScript Shims |
| `md5.js` | 1.3.5 | MIT | Copyright (c) 2016 Kirill Fomichev |
| `possible-typed-array-names` | 1.1.0 | MIT | Copyright (c) 2024 Jordan Harband |
| `process` | 0.11.10 | MIT | Copyright (c) 2013 Roman Shtylman <shtylman@gmail.com> |
| `process-nextick-args` | 2.0.1 | MIT | Copyright (c) 2015 Calvin Metcalf |
| `readable-stream` | 2.3.8 | MIT | Copyright Node.js contributors. All rights reserved. |
| `ripemd160` | 2.0.3 | MIT | Copyright (c) 2016 crypto-browserify |
| `safe-buffer` | 5.2.1 | MIT | Copyright (c) Feross Aboukhadijeh |
| `set-function-length` | 1.2.2 | MIT | Copyright (c) Jordan Harband and contributors |
| `sha.js` | 2.4.12 | MIT AND BSD-3-Clause | Copyright (c) 2013-2018 sha.js contributors |
| `stream-browserify` | 3.0.0 | MIT | Copyright (c) James Halliday |
| `string_decoder` | 1.1.1 | MIT | Copyright Node.js contributors. All rights reserved. |
| `to-buffer` | 1.2.2 | MIT | Copyright (c) 2016 Mathias Buus |
| `typed-array-buffer` | 1.0.3 | MIT | Copyright (c) 2023 Jordan Harband |
| `typeforce` | 1.18.0 | MIT | Copyright (c) 2018 Daniel Cousens |
| `util-deprecate` | 1.0.2 | MIT | Copyright (c) 2014 Nathan Rajlich <nathan@tootallnate.net> |
| `varuint-bitcoin` | 1.1.2 | MIT | Copyright (c) 2016 Kirill Fomichev |
| `which-typed-array` | 1.1.22 | MIT | Copyright (c) 2015 Jordan Harband |
| `wif` | 2.0.6 | MIT | Copyright (c) 2015 Daniel Cousens |

The copyright line above pairs with one of the three license texts below —
`sha.js` carries both, since it's dual-licensed.

## MIT

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## BSD-3-Clause

_(`ieee754`)_

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice,
   this list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.
3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from this
   software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
POSSIBILITY OF SUCH DAMAGE.

## ISC

_(`inherits`)_

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
