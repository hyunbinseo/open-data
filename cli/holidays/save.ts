import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parse } from 'valibot';
import { env } from '../env.ts';
import { root } from '../utilities.ts';
import { 공휴일_정보_조회 } from './index.ts';
import { ResponseSchema } from './schema.ts';
import { format } from 'oxfmt';

for (let year = 2004; year <= new Date().getFullYear() + 1; year += 1) {
	const yyyy = String(year);
	const holidays: Record<string, string[]> = {};

	for (let month = 1; month <= 12; month += 1) {
		const mm = String(month).padStart(2, '0');
		console.log(`${yyyy}-${mm}`);

		const crawlOutDir = resolve(root, './data.go.kr/B090041/getRestDeInfo', `./${yyyy}`);
		mkdirSync(crawlOutDir, { recursive: true });

		const data = await 공휴일_정보_조회(yyyy, mm, env.API_KEY_DATA_GO_KR);
		writeFileSync(resolve(crawlOutDir, `${mm}.json`), JSON.stringify(data, null, '\t') + '\n');

		for (const item of parse(ResponseSchema, data)) {
			(holidays[item.yyyy_mm_dd] ??= []).push(item.name);
		}
	}

	const filename = `${yyyy}.json`;
	const formatted = await format(filename, JSON.stringify(holidays), { useTabs: true });

	const yearOutDir = resolve(root, './data/holidays');
	mkdirSync(yearOutDir, { recursive: true });
	writeFileSync(resolve(yearOutDir, filename), formatted.code);
}
