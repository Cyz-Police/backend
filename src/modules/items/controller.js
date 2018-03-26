/* eslint prefer-template: "error" */
/* eslint func-names: ["error", "never"] */
import Item from './model';
import { User } from '../users';
import { County } from '../countys';
import { Counter } from '../counters';

const getUserCountyId = async (id) => {
	try {
		const userCountyID = await User.getUserCountyId(id);
		return await County.getUserCountyId(userCountyID);
	} catch (e) {
		return false;
	}
};

const getMarkId = async (authorId) => {
	const currentYear = new Date().getFullYear;
	const coutyId = await getUserCountyId(authorId);
	const counter = await Counter.getNextSequence(currentYear);
	const lastDidgits = currentYear.slice(-2);
	return `${coutyId}-${counter}-${lastDidgits}`;
};

const createItem = async (req, res) => {
	const {
		category,
		author,
		type,
		owner,
		photo,
		extra,
	} = req.body;
	const markId = getMarkId(author);

	const newItem = new Item({
		category, author, type, owner, photo, extra, markId,
	});

	try {
		await newItem.save();
		return res.status(201).json({ message: 'Item was created', id: markId });
	} catch (e) {
		return res.status(404).json({ error: true, message: 'Can not create item' });
	}
};

export default createItem;
