const { execFileSync } = require('node:child_process');
const fs = require('node:fs');

const files = execFileSync('git', ['ls-tree', '-r', '--name-only', 'HEAD', 'library'], { encoding: 'utf8' })
  .split(/\r?\n/)
  .filter((file) => file === 'library/index.json' || file.endsWith('.pwk'));

for (const file of files) {
  const bytes = execFileSync('git', ['show', `HEAD:${file}`], { encoding: null, maxBuffer: 100 * 1024 * 1024 });
  fs.writeFileSync(file, bytes);
}

console.log(`Restored ${files.length} catalogue files from canonical Git blobs.`);
