import mongoose, { Schema } from 'mongoose';

const TypeSchema = new Schema({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	category: [{ types: Schema.Types.ObjectId, ref: 'Category' }],
});

export default mongoose.model('Type', TypeSchema);
