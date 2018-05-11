import moment from 'moment';
import Item from './model';
import json2csv from '../../config/csvConverter';
import { User } from '../users';
import { County } from '../countys';
import { Counter } from '../counters';

const getMarkId = async (countyId) => {
	try {
		const year = new Date().getFullYear().toString();
		const countyAssignedId = await County.getAssignedId(countyId);
		const counter = await Counter.getNextSequence(year, countyId);
		const formatedCounter = '0'.repeat(5 - counter.length) + counter;
		return `${countyAssignedId}-${formatedCounter}-${year.slice(-2)}`;
	} catch (e) {
		return false;
	}
};

export const createItem = async (req, res) => {
	const {
		category, type, owner, photo, extra,
	} = req.body;
	const author = req.user.id;
	const date = moment().format('YYYY-MM-DD');
	try {
		const countyCreated = await User.getUserCountyId(author);
		const markId = await getMarkId(countyCreated);
		if (!markId) throw new Error();
		const newItem = new Item({
			category, author, type, owner, photo, extra, markId, countyCreated, date,
		});
		await newItem.save();
		return res.status(201).json({ message: 'Item was created', mark: markId });
	} catch (e) {
		return res.status(404).json({ error: true, message: 'Can not create new item ' });
	}
};

export const getItemById = async (req, res) => {
	try {
		const { markId } = req.params;
		const item = await Item.findOne({ markId })
			.populate('author', 'email')
			.populate('category', 'title')
			.populate('type', 'title')
			.populate('owner')
			.exec();
		return res.status(200).json(item);
	} catch (e) {
		return res.status(400).json({ error: true, message: 'Can not fetch item '});
	}
};

export const makeCsv = async (req, res) => {
	try {
		const userCountyId = await User.getUserCountyId(req.user.id);
		const data = await Item.find({ countyCreated: userCountyId })
			.populate('author', 'fullName')
			.populate('category', 'title')
			.populate('category', 'title')
			.populate('type', 'title')
			.populate('owner')
			.exec();
		res.setHeader('Content-Type', 'text/csv', 'charset=utf-8');
		res.attachment('Data.csv');
		return res.send(json2csv(data));
	} catch (e) {
		return res.status(404).json({ error: true, message: 'a' });
	}
};
