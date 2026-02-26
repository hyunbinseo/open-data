import { resolve } from 'node:path';
import { loadEnvFile } from 'node:process';
import { nonEmpty, object, parse, pipe, string } from 'valibot';
import { root } from './utilities.ts';

loadEnvFile(resolve(root, '.env'));

export const env = parse(
	object({
		API_KEY_DATA_GO_KR: pipe(string(), nonEmpty()),
	}),
	process.env,
);
