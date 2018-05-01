import County from './model';

export const createCounty = async (req, res) => {
	const { title, assignedId } = req.body;
	const newCounty = new County({ title, assignedId });
	try {
		return res.status(201).json({ message: 'County was created', couty: await newCounty.save() });
	} catch (e) {
		return res.status(404).json({ error: true, message: 'Can not create county' });
	}
};

export const updateCounty = async (req, res) => {
	const { id, title } = req.body;
	try {
		await County.update(id, title);
		return res.status(201).json({ message: 'County was created' });
	} catch (e) {
		return res.status(404).json({ error: true, message: 'Can not update county' });
	}
};

export const validateCountyTitle = async (req, res) => {
	const { title } = req.body;
	County.find({ title }).exec((err, counties) => {
		if (err) return res.status(400).json({ error: true, message: 'Error while validating county' });
		if (!counties.length) {
			return res.status(200).json({ message: 'Can update with this title' });
		} return res.status(200).json({ error: true, message: 'County with this title exicts' });
	});
};

export const validateCountyId = async (req, res) => {
	const { id } = req.body;
	County.find({ assignedId: id }).exec((err, counties) => {
		if (err) return res.status(400).json({ error: true, message: 'Error while validating county' });
		if (!counties.length) {
			return res.status(200).json({ message: 'Can update with this id' });
		} return res.status(200).json({ error: true, message: 'County with this id exicts' });
	});
};

export const getAllCounties = async (req, res) => {
	try {
		const counties = await County.find({});
		return res.status(201).json(counties);
	} catch (e) {
		return res.status(400).json({ error: true, message: 'Can not fetch counties' });
	}
};
