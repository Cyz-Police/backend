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

CitizenSchema.statics.update = function (citizenId, fullname, citizenAdress, phonenumber) {
	return this.findByIdAndUpdate(
		citizenId,
		{ $set: { fullName: fullname, adress: citizenAdress, phoneNumber: phonenumber } },
	).exec();
};

CitizenSchema.static.findByPersonalId = function (personalID) {
	return this.findOne({ personalId: personalID });
};

export default mongoose.model('Citizen', CitizenSchema);
