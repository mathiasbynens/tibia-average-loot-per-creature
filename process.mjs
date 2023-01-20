import * as fs from 'node:fs/promises';
import { toPrettyName } from './normalize-names.mjs';

const readJsonFile = async (fileName) => {
	const json = await fs.readFile(fileName, 'utf8');
	const data = JSON.parse(json);
	return data;
};

const writeJsonFile = async (fileName, data) => {
	const json = JSON.stringify(data, null, '\t') + '\n';
	await fs.writeFile(fileName, json);
};

const rawData = await readJsonFile('./data/raw-data.json');
const map = new Map(); // name → averageLootValue
const uglyNames = [];
for (const entry of rawData) {
	const uglyName = entry.n;
	uglyNames.push(uglyName);
	const prettyName = toPrettyName(uglyName);
	const value = entry.v;
	map.set(prettyName, value);
}

await writeJsonFile(
	'./data/average-loot-per-creature.json',
	Object.fromEntries(map.entries())
);

uglyNames.sort();
await writeJsonFile(`./data/ugly-names.json`, uglyNames);
