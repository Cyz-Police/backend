/* eslint func-names: ["error", "never"] */
import mongoose, { Schema } from 'mongoose';

const CountySchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	assignedId: {
		type: Number,
		required: true,
		unique: true,
	},
});

CountySchema.statics.update = function (id, newName) {
	return this.findByIdAndUpdate(id, { $set: { name: newName } }).exec();
};

CountySchema.static.getAssignedId = async function (id) {
	return this.findOne(id, { assignedId: 1, _id: 0 }).exec();
};

export default mongoose.model('County', CountySchema);
