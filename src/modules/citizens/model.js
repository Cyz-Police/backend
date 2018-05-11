/* eslint func-names: ["error", "never"] */
import mongoose, { Schema } from 'mongoose';

const CitizenSchema = new Schema({
	personalId: { // Personal ID number
		type: Number,
		unique: true,
		required: true,
		validate: {
			validator: Number.isInteger,
			message: '{VALUE} is not an integer',
		},
	},
});

CitizenSchema.static.findByPersonalId = function (personalId) {
	return this.findOne({ personalId });
};

export default mongoose.model('Citizen', CitizenSchema);
