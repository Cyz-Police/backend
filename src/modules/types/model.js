/* eslint func-names: ["error", "never"] */
import mongoose, { Schema } from 'mongoose';

const TypeSchema = new Schema({
	title: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: 'Category',
		required: true,
	},
});

TypeSchema.statics.updateType = function (id, newTitle) {
	return this.findByIdAndUpdate(id, { $set: { title: newTitle } }).exec();
};

export default mongoose.model('Type', TypeSchema);
