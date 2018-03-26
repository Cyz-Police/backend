/* eslint prefer-template: "error" */
/* eslint-env es6 */
import Item from './model';
import { User } from '../users';
import { County } from '../countys';
import { Counter } from '../counters';

export const createItem = async (req, res) => {
	const { category, author, type, owner, photo, extra } = req.body;
};

export const a = async (req, res) => {

};

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
