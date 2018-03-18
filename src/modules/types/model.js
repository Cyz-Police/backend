import mongoose, { Schema } from 'mongoose';

const TypeSchema = new Schema({
	title: {
		type: String,
		required: true,
		unique: true,
	},
});

export default mongoose.model('Type', TypeSchema);
