import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { env } from '../env.ts';
import { root } from '../utilities.ts';
import { 공휴일_정보_조회 } from './index.ts';

for (let year = 2004; year <= new Date().getFullYear() + 1; year += 1) {
	for (let month = 1; month <= 12; month += 1) {
		const yyyy = String(year);
		const mm = String(month).padStart(2, '0');
		console.log(`${yyyy}-${mm}`);

		const outDir = resolve(root, './data.go.kr/B090041/getRestDeInfo', `./${yyyy}`);
		mkdirSync(outDir, { recursive: true });

		const data = await 공휴일_정보_조회(yyyy, mm, env.API_KEY_DATA_GO_KR);
		writeFileSync(resolve(outDir, `${mm}.json`), JSON.stringify(data, null, '\t') + '\n');
	}
}
