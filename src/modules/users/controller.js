import User from './model';

export const activateUser = async (req, res) => {
	const { userId } = req.body.userId;

	try {
		await User.findByIdAndUpdate(
			{ _id: userId },
			{ $set: { active: true } },
		);
		return res.status(201).json({ message: 'User was activated' });
	} catch (e) {
		return res.status(e.status).json({ error: true, message: 'Cant activate user' });
	}
};

export const deactivateUser = async (req, res) => {
	const { userId } = req.body.userId;

	try {
		await User.findByIdAndUpdate(
			{ _id: userId },
			{ $set: { active: false } },
		);
		return res.status(201).json({ message: 'User was deactivated' });
	} catch (e) {
		return res.status(e.status).json({ error: true, message: 'Cant deactivate user' });
	}
};
