import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './model';
import config from '../../config/config';
import County from '../countys';

export const createUser = async (req, res) => {
	const {
		fullName, email, county, password,
	} = req.body.user;
	if (email.substr(email.length - 12) !== '@policija.lt') {
		return res.status(400).json({ error: true, message: 'Invalid email adress' });
	}
	try {
		const passwordHashed = await bcrypt.hashSync(password, 16); // Hashing password
		const newUser = new User({
			fullName, email, county, password: passwordHashed,
		});
		return res.status(201).json({ user: await newUser.save() });
	} catch (e) {
		return res.status(400).json({ error: true, message: 'Can not create user' });
	}
};

export const authenticateUser = async (req, res) => {
	try {
		const { email, password } = req.body.user;
		const user = await User.findByEmail(email).select('+password');
		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			return res.status(400).json({ error: true, message: 'Wrong email adress or password' });
		} else if (!user.active) {
			return res.status(400).json({ error: true, message: 'User is not activated' });
		}
		const payload = {
			user: {
				fullName: user.fullName,
				role: user.role,
				id: user.id,
			},
		};
		const token = await jwt.sign(payload, config.SECRET, { expiresIn: '5d' });
		return res.status(201).json({ token });
	} catch (e) {
		return res.status(400).json({ error: true, message: 'Wrong email adress or password' });
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
	const { id } = req.user;
	const { userId } = req.body;
	try {
		if (userId === id) throw new Error();
		await User.activate(userId);
		return res.status(201).json({ message: 'User was activated' });
	} catch (e) {
		return res.status(400).json({ error: true, message: 'Cant activate user' });
	}
};

export const deactivateUser = async (req, res) => {
	try {
		const { id } = req.user;
		const { userId } = req.body;
		if (userId === id) throw new Error();
		await User.deactivate(userId);
		return res.status(201).json({ message: 'User was deactivated' });
	} catch (e) {
		return res.status(400).json({ error: true, message: 'Cant deactivate user' });
	}
};

export const changeUsersRole = async (req, res) => {
	const { userId, role } = req.body;
	try {
		if (role === '[USER]' || role === '[ADMIN]' || role === '[SUPERADMIN]') {
			await User.changeRole(userId, role);
			return res.status(201).json({ message: "User's role was changed" });
		} throw new Error();
	} catch (e) {
		return res.status(400).json({ error: true, message: 'Can not update users role' });
	}
};

export const getUserCountyId = async (id) => {
	try {
		const userCountyID = await this.getUserCountyId(id);
		return await County.getUserCountyId(userCountyID);
	} catch (e) {
		return false;
	}
};

export const validateUser = async (id, role) => {
	try {
		const user = await User.findById(id);
		if (user.active === true && user.role === role) {
			return true;
		} return false;
	} catch (e) {
		return false;
	}
};

export const validateUserEmail = async (req, res) => {
	const { email } = req.body;
	if (email.substr(email.length - 12) !== '@policija.lt') {
		return res.status(200).json({ error: true, message: 'Invalid email adress' });
	}
	User.find({ email }).exec((err, users) => {
		if (err) return res.status(400).json({ error: true, message: 'Error while validating email' });
		if (!users.length) {
			return res.status(200).json({ message: 'Email is avalible' });
		} return res.status(200).json({ error: true, message: 'This email adress is taken' });
	});
	return res.status(400).json({ error: true, message: 'Error while validating email' });
};

export const getAllUsers = async (req, res) => {
	try {
		const users = await User.find({ });
		return res.status(201).json(users);
	} catch (e) {
		return res.status(400).json({ error: true, message: 'Cannot detch users' });
	}
};

export const getUsersByCounty = async (req, res) => {
	const { county, id } = req.user;
	try {
		const users = await User.find({ county, _id: { $ne: id }, role: '[USER]' });
		return res.status(200).json(users);
	} catch (e) {
		return res.status(400).json({ error: true, message: 'Can not fetch users' });
	}
};
