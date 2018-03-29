/* eslint prefer-template: "error" */
/* eslint func-names: ["error", "never"] */
import Item from './model';
import { User } from '../users';
import { County } from '../countys';
import { Counter } from '../counters';

const getUserCountyId = async (id) => {
	try {
		const countyId = await User.getUserCountyId(id);
		console.log(countyId);
		return County.getAssignedId(countyId);
	} catch (e) {
		return false;
	}
};

const getMarkId = async (authorId) => {
	const year = new Date().getFullYear();
	const currentYear = year.toString();
	const countyID = await User.getUserCountyId(authorId);
	const coutyId = await getUserCountyId(authorId);
	const counter = await Counter.getNextSequence(currentYear, countyID);
	const formatedCounter = '0'.repeat(5 - counter.length) + counter;
	const lastDidgits = currentYear.slice(-2);
	return `${coutyId}-${formatedCounter}-${lastDidgits}`;
};

const createItem = async (req, res) => {
	const {
		category, author, type, owner, photo, extra,
	} = req.body;

	const markId = await getMarkId(author);

	const newItem = new Item({
		category, author, type, owner, photo, extra, markId,
	});

	try {
		await newItem.save();
		return res.status(201).json({ message: 'Item was created', mark: markId });
	} catch (e) {
		return res.status(404).json({ error: true, message: 'Can not create new item ' });
	}
};

export default createItem;
