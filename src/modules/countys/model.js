/* eslint func-names: ["error", "never"] */
import mongoose, { Schema } from 'mongoose';

const CountySchema = new Schema({
	title: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
	assignedId: {
		type: Number,
		required: true,
		unique: true,
	},
});

CountySchema.statics.update = function (id, title) {
	return this.findByIdAndUpdate(id, { $set: { title } }).exec();
};

CountySchema.statics.getAssignedId = async function (id) {
	return this.findOne(id).exec().then(county => county.assignedId);
};

export default mongoose.model('County', CountySchema);
