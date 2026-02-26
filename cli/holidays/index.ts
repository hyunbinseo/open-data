import { digits, length, parse, pipe, regex, string } from 'valibot';

// See https://www.data.go.kr/data/15012690/openapi.do
export const 공휴일_정보_조회 = async (yyyy: string, mm: string, API_KEY: string) => {
	const solYear = parse(pipe(string(), length(4), digits()), yyyy);
	const solMonth = parse(pipe(string(), length(2), digits(), regex(/^(0[1-9]|1[0-2])$/)), mm);

	const url = new URL(
		'/B090041/openapi/service/SpcdeInfoService/getRestDeInfo',
		'https://apis.data.go.kr',
	);

	url.searchParams.set('_type', 'json');
	url.searchParams.set('numOfRows', '100');
	url.searchParams.set('serviceKey', API_KEY);
	url.searchParams.set('solYear', solYear);
	url.searchParams.set('solMonth', solMonth);

	const response = await fetch(url);
	if (!response.ok) throw new Error(`HTTP ${response.status}`);
	return await response.json();
};
