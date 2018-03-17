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

CitizenSchema.statics.createOrUpdate = async function createOrUpdate(args) {
	try {
		const citizen = await this.findOne({
			personalId: args.personalId,
		});
		if (!citizen) {
			return await this.create(args);
		} else if (citizen.phoneNumber !== args.phoneNumber || citizen.adress !== args.adress) {
			return await CitizenSchema.findOneAndUpdate(
				{ personalId: args.personalId },
				{ $set: { adress: args.adress, phoneNumber: args.phoneNumber } },
				{ new: true },
			);
		}
		return citizen;
	} catch (e) {
		return e;
	}
};

export default mongoose.model('Citizen', CitizenSchema);
