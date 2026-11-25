// THE WORLD — Wednesday 25 November 2026 (Node 22, standard library only):
// its image is the entry.png beside this file, and the program copies it to
// /output/entry.png. The gate takes a whole PNG or JPEG of at most 1 MiB and
// 1024 by 1024 pixels, and the judge sees exactly the bytes copied.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dest = join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png');
copyFileSync(new URL('./entry.png', import.meta.url), dest);
// Fail loudly if the copied entry is empty or over the 1 MiB gate limit,
// instead of handing the grader a bad file.
const size = statSync(dest).size;
if (size === 0 || size > 1024 * 1024) throw new Error(`entry.png is ${size} bytes, outside the 0..1 MiB gate`);
