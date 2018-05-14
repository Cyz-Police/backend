import { Parser } from 'json2csv';

const fields = [
	{
		label: 'Žymėjimo ID',
		value: 'markId',
	}, {
		label: 'Kategorija',
		value: 'category.title',
	}, {
		label: 'Tipas / Modelis',
		value: 'type.title',
	}, {
		label: 'Pastebėjimai',
		value: 'extra',
		default: '---',
	}, {
		label: 'Savininko A.K.',
		value: 'owner.personalId',
	}, {
		label: 'Pareigūno el. paštas',
		value: 'author.email',
	}, {
		label: 'Sukūrimo data',
		value: 'date',
	},
];

export default (data) => {
	const json2csvParser = new Parser({ fields });
	return `\uFEFF${json2csvParser.parse(data)}`;
};
