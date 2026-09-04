// esbuild --inject target: some transitive dependency (bitcoinjs-lib's hash
// backends) reads the bare globals `process`/`Buffer` at module load time,
// which don't exist in a browser. This file's exports are substituted in by
// esbuild wherever those identifiers appear, browser-only, build-time only —
// nothing here ships if you consume this repo from Node.

import process from 'process';
import { Buffer } from 'buffer';

export { process, Buffer };
