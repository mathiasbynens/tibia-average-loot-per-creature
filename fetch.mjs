import * as fs from 'node:fs/promises';
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('https://tibia.fandom.com/wiki/List_of_Creatures_by_Average_Loot_Value');
const lootValueData = await page.evaluate(() => {
	return globalThis.lootValueData;
});
await browser.close();

const stringify = (object) => {
	return JSON.stringify(object, null, '\t') + '\n';
};

await fs.writeFile(
	`./data/raw-data.json`,
	stringify(lootValueData)
);
