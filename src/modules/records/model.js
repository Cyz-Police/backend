import mongoose, { Schema } from 'mongoose';

const RecordSchema = new Schema({
	author: [{ types: Schema.Types.ObjectId, ref: 'User' }],
	action: {
		type: String,
		required: true,
	},
});

export default mongoose.mode('Record', RecordSchema);
