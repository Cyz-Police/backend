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

export const getAllCategories = async (req, res) => {
	try {
		const categories = await Category.find({});
		return res.status(200).json(categories);
	} catch (e) {
		return res.status(400).json({ error: true, message: 'Can not retrieve categories' });
	}
};

export const validateCategoryTitle = async (req, res) => {
	const { title } = req.body;
	Category.find({ title }).exec((err, categories) => {
		if (err) return res.status(400).json({ error: true, message: 'Error while validating category' });
		if (!categories.length) {
			return res.status(200).json({ message: 'Can update with this title' });
		} return res.status(200).json({ error: true, message: 'Category with this title exists' });
	});
};
