import Type from './model';

export const createType = async (req, res) => {
	const { title, category } = req.body;
	const newType = new Type({
		title,
		category,
	});

	try {
		await newType.save();
		return res.status(201).json({ message: 'Type was created' });
	} catch (e) {
		return res.status(404).json({ error: true, message: 'Can not create type' });
	}
};

export const updateType = async (req, res) => {
	const { id, title } = req.body;
	try {
		await Type.updateType(id, title);
		return res.status(201).json({ message: 'Type was updated' });
	} catch (e) {
		return res.status(404).json({ error: true, message: 'Can not update type' });
	}
};
