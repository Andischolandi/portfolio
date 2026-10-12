// Generates src/styles/tokens.css from tokens/figma-tokens.json
// Run: npm run tokens   (also runs automatically before dev/build)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const t = JSON.parse(readFileSync(new URL('../tokens/figma-tokens.json', import.meta.url)));
const slug = (s) => s.toLowerCase().replace(/[\s/]+/g, '-');
const lines = [];
lines.push('/* AUTO-GENERATED from tokens/figma-tokens.json — do not edit by hand. */', '');

// 1 · Primitives + dimensions
lines.push(':root {');
for (const [k, v] of Object.entries(t.primitives)) lines.push(`  --${slug(k)}: ${v};`);
for (const [k, v] of Object.entries(t.dimension)) lines.push(`  --${slug(k)}: ${v}px;`);
lines.push('}', '');

// 2 · Semantic per mode (= section theme)
const modeSel = { 'Warm White': ':root, [data-theme="warm-white"]', Night: '[data-theme="night"]', Sand: '[data-theme="sand"]', Earth: '[data-theme="earth"]' };
t.modes.forEach((mode, i) => {
  lines.push(`${modeSel[mode]} {`);
  for (const [k, vals] of Object.entries(t.semantic)) lines.push(`  --color-${slug(k)}: var(--color-${slug(vals[i])});`);
  lines.push('  color: var(--color-text-primary);');
  lines.push('}', '');
});

// 3 · Text styles as utility classes
const cls = (n) => 't-' + slug(n);
for (const s of t.text) {
  lines.push(`.${cls(s.n)} {`);
  lines.push(`  font-family: var(--font-sans);`);
  lines.push(`  font-weight: ${s.w};`);
  if (s.style) lines.push(`  font-style: ${s.style};`);
  lines.push(`  font-size: ${s.size / 16}rem;`);
  lines.push(`  line-height: ${(s.lh / s.size).toFixed(3)};`);
  if (s.ls) lines.push(`  letter-spacing: ${s.ls / 100}em;`);
  if (s.upper) lines.push('  text-transform: uppercase;');
  lines.push('}');
}
lines.push('');
for (const [bp, q] of [['tablet', '(max-width: 1023px)'], ['mobile', '(max-width: 743px)']]) {
  lines.push(`@media ${q} {`);
  for (const [n, r] of Object.entries(t.responsive)) if (r[bp]) lines.push(`  .${cls(n)} { font-size: ${r[bp] / 16}rem; }`);
  lines.push('}');
}
mkdirSync(new URL('../src/styles/', import.meta.url), { recursive: true });
writeFileSync(new URL('../src/styles/tokens.css', import.meta.url), lines.join('\n') + '\n');
console.log('tokens.css written');
