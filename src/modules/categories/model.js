/* eslint func-names: ["error", "never"] */
import mongoose, { Schema } from 'mongoose';

const CategorySchema = new Schema({
	title: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
});

CategorySchema.statics.updateCategory = function (id, newTitle) {
	return this.findByIdAndUpdate(id, { $set: { title: newTitle } }).exec();
};

export default mongoose.model('Category', CategorySchema);
