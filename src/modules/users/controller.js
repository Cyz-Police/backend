import bcrypt from 'bcrypt';
import User from './model';

export const createUser = async (req, res) => {
	const {
		cardId, fullName, email, passwordCandidate,
	} = req.body;

	const role = '[USER]';
	const active = false;
	const password = bcrypt.hashSync(passwordCandidate, 16); // Hashing password

	const newUser = new User({
		cardId, fullName, email, password, role, active,
	});

	try {
		return res.status(201).json({ user: await newUser.save() });
	} catch (e) {
		return res.status(404).json({ error: true, message: 'Can not create user' });
	}
};

export const removeUser = async (req, res) => {
	const { userId } = req.body;
	try {
		await User.removeUser(userId);
		return res.status(201).json({ message: 'User was deleted' });
	} catch (e) {
		return res.status(404).json({ error: true, message: 'Can not delete user', err: e });
	}
};

export const activateUser = async (req, res) => {
	const { userId } = req.body;
	try {
		await User.activate(userId);
		return res.status(201).json({ message: 'User was activated' });
	} catch (e) {
		return res.status(403).json({ error: true, message: 'Cant activate user' });
	}
};

export const deactivateUser = async (req, res) => {
	const { userId } = req.body;
	try {
		await User.deactivate(userId);
		return res.status(201).json({ message: 'User was deactivated' });
	} catch (e) {
		return res.status(404).json({ error: true, message: 'Cant deactivate user' });
	}
};
