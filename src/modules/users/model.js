/* eslint func-names: ["error", "never"] */

import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
	cardId: {
		type: String,
		required: true,
		unique: true,
	},
	fullName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		required: true,
	},
	active: {
		type: Boolean,
		required: true,
	},
});

UserSchema.statics.removeUser = function (id) {
	return this.findByIdAndRemove(id).exec();
};

UserSchema.statics.activate = function (id) {
	return this.findByIdAndUpdate({ _id: id }, { $set: { active: true } }).exec();
};

UserSchema.statics.deactivate = function (id) {
	return this.findByIdAndUpdate({ _id: id }, { $set: { active: false } }).exec();
};

export default mongoose.model('User', UserSchema);
