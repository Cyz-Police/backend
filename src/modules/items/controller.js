import Item from './model';
import { User } from '../users';
import { County } from '../countys';

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
	const coutyId = getUserCountyId(authorId);
};
