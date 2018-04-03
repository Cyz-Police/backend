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
		label: 'Savininkas',
		value: 'owner.fullName',
	}, {
		label: 'Telefono numeris',
		value: 'owner.phoneNumber',
	}, {
		label: 'Pareigūnas',
		value: 'author.fullName',
	}, {
		label: 'Sukūrimo data',
		value: 'date',
	},
];

export default (data) => {
	const json2csvParser = new Parser({ fields });
	return `\uFEFF${json2csvParser.parse(data)}`;
};
