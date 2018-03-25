/* eslint func-names: ["error", "never"] */
import mongoose, { Schema } from 'mongoose';

const CountySchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
});

CountySchema.statics.update = function (id, newName) {
	return this.findByIdAndUpdate(id, { $set: { name: newName } }).exec();
};

export default mongoose.model('County', CountySchema);
