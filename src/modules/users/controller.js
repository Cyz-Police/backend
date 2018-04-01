import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './model';
import config from '../../config/config';
import County from '../countys';

export const createUser = async (req, res) => {
	const {
		cardId, fullName, email, county, passwordCandidate,
	} = req.body;
	const role = '[USER]';
	const active = false;
	try {
		const password = bcrypt.hashSync(passwordCandidate, 16); // Hashing password
		const newUser = new User({
			cardId, fullName, email, county, password, role, active,
		});
		return res.status(201).json({ user: await newUser.save() });
	} catch (e) {
		return res.status(404).json({ error: true, message: 'Can not create user' });
	}
};

export const authenticateUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findByEmail(email);
		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			return res.status(404).json({ error: true, message: 'Wrong email adress or password' });
		}
		const payload = {
			id: user.id,
			fullName: user.fullName,
		};
		const token = await jwt.sign(payload, config.SECRET, { expiresIn: 86400 });
		return res.status(201).json({ JWTtoken: token });
	} catch (e) {
		return res.status(404).json({ error: true, message: 'Wrong email adress or password' });
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
