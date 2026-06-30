import {
	array,
	check,
	digits,
	integer,
	length,
	literal,
	minValue,
	number,
	object,
	pipe,
	string,
	transform,
	union,
} from 'valibot';

const HolidayItemSchema = pipe(
	object({
		dateKind: literal('01'),
		dateName: string(),
		isHoliday: literal('Y'),
		locdate: pipe(
			number(),
			integer(),
			transform(String),
			digits(),
			length(8),
			transform((v) => `${v.slice(0, 4)}-${v.slice(4, 6)}-${v.slice(6, 8)}`),
		),
		seq: pipe(number(), integer(), minValue(1)),
	}),
	transform((v) => ({
		yyyy_mm_dd: v.locdate,
		seq: v.seq,
		name: v.dateName,
	})),
);

export const ResponseSchema = pipe(
	object({
		response: object({
			header: object({
				resultCode: literal('00'),
				resultMsg: literal('NORMAL SERVICE.'),
			}),
			body: pipe(
				object({
					items: pipe(
						union([
							pipe(
								literal(''),
								transform(() => []),
							),
							pipe(
								object({
									item: union([
										HolidayItemSchema, //
										array(HolidayItemSchema),
									]),
								}),
								transform((v) => (Array.isArray(v.item) ? v.item : [v.item])),
							),
						]),
						transform((v) => v),
					),
					numOfRows: pipe(number(), integer(), minValue(1)), // 페이지당 항목수
					pageNo: literal(1), // 페이지
					totalCount: pipe(number(), integer(), minValue(0)), // 모든 항목수
				}),
				check((v) => v.totalCount <= v.numOfRows),
			),
		}),
	}),
	transform((v) => v.response.body.items),
);
