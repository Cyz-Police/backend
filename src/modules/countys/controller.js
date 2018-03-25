import County from './model';

export const createCounty = async (req, res) => {
	const { name } = req.body;
	const newCounty = new County({ name });
	try {
		return res.status(201).json({ message: 'County was created', couty: newCounty.save() });
	} catch (e) {
		return res.status(404).json({ error: true, message: 'Can not create county' });
	}
};

export const updateCounty = async (req, res) => {
	const { countyId, name } = req.body;
	try {
		await County.update(countyId, name);
		return res.status(201).json({ message: 'County was created' });
	} catch (e) {
		return res.status(404).json({ error: true, message: 'Can not create county' });
	}
};
