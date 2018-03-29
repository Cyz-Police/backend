/* eslint prefer-template: "error" */
/* eslint func-names: ["error", "never"] */
import Item from './model';
import { User } from '../users';
import { County } from '../countys';
import { Counter } from '../counters';

const getMarkId = async (authorId) => {
	try {
		const year = new Date().getFullYear().toString();
		const countyId = await User.getUserCountyId(authorId);
		const countyAssignedId = await County.getAssignedId(countyId);
		const counter = await Counter.getNextSequence(year, countyId);
		const formatedCounter = '0'.repeat(5 - counter.length) + counter;
		return `${countyAssignedId}-${formatedCounter}-${year.slice(-2)}`;
	} catch (e) {
		return false;
	}
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
		await newItem.validate();
		return res.status(201).json({ message: 'Item was created', mark: markId });
	} catch (e) {
		return res.status(404).json({ error: true, message: 'Can not create new item ' });
	}
};

export default createItem;
