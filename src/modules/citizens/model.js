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
	fullName: {
		type: String,
		required: true,
	},
	adress: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: Number,
		required: true,
		validate: {
			validator: Number.isInteger,
			message: '{VALUE} is not an integer',
		},
	},
});

CitizenSchema.statics.update = function (args) {
	this.findOneAndUpdate(
		{ _id: args.id },
		{ $set: { fullName: args.fullName, adress: args.adress, phoneNumber: args.phoneNumber } },
	).exec();
};

export default mongoose.model('Citizen', CitizenSchema);
