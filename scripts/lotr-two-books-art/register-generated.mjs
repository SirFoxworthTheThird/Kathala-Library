import fs from 'node:fs';
import path from 'node:path';

const [numberText, source] = process.argv.slice(2);
const number = Number(numberText);
if (!Number.isInteger(number) || !source) throw new Error('Usage: node register-generated.mjs NUMBER SOURCE_PNG');
const root = path.resolve(import.meta.dirname, '../..');
const manifestPath = path.join(import.meta.dirname, 'manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const asset = manifest.assets.find((row) => row.number === number);
if (!asset) throw new Error(`Unknown asset ${number}`);
const target = path.join(root, asset.masterPath);
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.copyFileSync(source, target);
asset.status = 'generated_png';
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(`Registered ${number}: ${asset.name} -> ${asset.masterPath}`);
