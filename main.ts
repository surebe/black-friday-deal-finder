// main.ts — TrueTag's hand-in program for black-friday-deal-finder-01.
// The site itself is the static app/ folder beside this file: plain HTML, CSS
// and ES modules a browser opens with no build step and no network load; its
// deals live in app/data.js. This program copies app/ and screenshots/ into
// the output directory and writes dossier.json there with the vendored
// make.fun library — the dossier is the summary the judge reads, so it must
// be exactly what the library writes from these files.
//
// Run it the way the grader does (MAKEFUN_OUTPUT_DIR stands in for /output):
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoDir = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outputDir, { recursive: true });
cpSync(join(repoDir, 'app'), join(outputDir, 'app'), { recursive: true });

const shotsDir = join(outputDir, 'screenshots');
mkdirSync(shotsDir, { recursive: true });
if (existsSync(join(repoDir, 'screenshots'))) {
  cpSync(join(repoDir, 'screenshots'), shotsDir, { recursive: true });
}

// The caps are the gate's own: at most 4 screenshots of 256 KiB, at most 993
// files and 16 MiB under app/, and the dossier text cut at 160 KiB.
const dossier = buildDossier(outputDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
writeFileSync(join(outputDir, 'dossier.json'), dossier);
