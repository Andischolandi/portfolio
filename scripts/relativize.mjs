// Rewrites root-absolute URLs in dist/ to relative ones so the built site works
// from any sub-folder (preview artifact). Not needed for the real IONOS deploy.
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
const root = new URL('../dist/', import.meta.url).pathname;
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
for (const file of walk(root)) {
  if (file.endsWith('.html')) {
    const depth = relative(root, dirname(file)).split('/').filter(Boolean).length;
    const pre = depth ? '../'.repeat(depth) : './';
    let s = readFileSync(file, 'utf8');
    s = s.replace(/(href|src|action)="\/(?!\/)([^"]*)"/g, (m, a, p) => {
      let u = pre + p;
      if (a === 'href' && (p === '' || p.endsWith('/'))) u += 'index.html';
      else if (a === 'href' && /\/#/.test(p)) u = u.replace('/#', '/index.html#');
      return `${a}="${u}"`;
    });
    s = s.replace(/srcset="([^"]*)"/g, (m, v) => `srcset="${v.replace(/(^|,\s*)\/(?!\/)/g, `$1${pre}`)}"`);
    s = s.replace(/url\(\/(?!\/)/g, `url(${pre}`);
    writeFileSync(file, s);
  } else if (file.endsWith('.css')) {
    let s = readFileSync(file, 'utf8');
    s = s.replace(/url\(\/_astro\//g, 'url(./');
    writeFileSync(file, s);
  }
}
console.log('relativized');
