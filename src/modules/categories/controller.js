import Category from './model';

export const createCategory = async (req, res) => {
	const { title } = req.body;
	const newCategory = new Category({ title });

	try {
		await newCategory.save();
		return res.status(201).json({ message: 'New category was created' });
	} catch (e) {
		return res.status(404).json({ error: true, message: 'Can not create category' });
	}
};

export const updateCategory = async (req, res) => {
	const { id, title } = req.body;

	try {
		await Category.updateCategory(id, title);
		return res.status(201).json({ message: 'Category was updated' });
	} catch (e) {
		return res.status(404).json({ error: true, message: 'Can not update category' });
	}
};

