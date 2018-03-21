import mongoose, { Schema } from 'mongoose';

const ItemSchema = new Schema({
	category: [{ types: Schema.Types.ObjectId, ref: 'Category' }],
	author: [{ types: Schema.Types.ObjectId, ref: 'User' }],
	type: [{ types: Schema.Types.ObjectId, ref: 'Type' }],
	owner: [{ types: Schema.Types.ObjectId, ref: 'Citizen' }],
	photo: {
		type: String,
		required: true,
		unique: true,
	},
	extra: {
		type: String,
		required: false,
	},
}, { timestamps: true });

export default mongoose.model('Item', ItemSchema);
