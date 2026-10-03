import fs from 'node:fs';
import path from 'node:path';

const [id, sourceName] = process.argv.slice(2);
const file = path.join(import.meta.dirname, 'unique-art-plan.json');
const plan = JSON.parse(fs.readFileSync(file, 'utf8'));
const slot = plan.slots.find((entry) => entry.objectId === id);
if (!slot || slot.status !== 'pending') throw new Error(`No pending slot: ${id}`);
if (!/^exec-[0-9a-f-]+\.png$/.test(sourceName)) throw new Error('Unexpected generated image name');
const destination = path.resolve(import.meta.dirname, '../..', slot.path);
const bytes = fs.readFileSync(destination);
if (bytes[0] !== 0xff || bytes[1] !== 0xd8 || bytes.at(-2) !== 0xff || bytes.at(-1) !== 0xd9) throw new Error(`Invalid JPEG: ${slot.path}`);
slot.status = 'generated';
slot.sourceImage = sourceName;
fs.writeFileSync(file, JSON.stringify(plan, null, 2) + '\n');
