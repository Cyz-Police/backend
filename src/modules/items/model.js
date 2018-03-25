import mongoose, { Schema } from 'mongoose';

const ItemSchema = new Schema({
	category: {
		type: Schema.Types.ObjectId,
		ref: 'Category',
		required: true,
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	type: {
		type: Schema.Types.ObjectId,
		ref: 'Type',
		required: true,
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'Citizen',
		required: true,
	},
	photo: {
		type: String,
		required: true,
		unique: true,
	},
	extra: {
		type: String,
		required: false,
	},
	markId: {
		type: Number,
		required: true,
		validate: {
			validator: Number.isInteger,
		},
	},
}, { timestamps: true });

export default mongoose.model('Item', ItemSchema);
