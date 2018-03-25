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
	county: {
		type: Schema.Types.ObjectId,
		ref: 'County',
		required: true,
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

UserSchema.static.removeUser = function (id) {
	return this.find({ _id: id }).remove().exec();
};

UserSchema.statics.activate = function (id) {
	return this.findByIdAndUpdate(id, { $set: { active: true } }).exec();
};

UserSchema.statics.deactivate = function (id) {
	return this.findByIdAndUpdate(id, { $set: { active: false } }).exec();
};

UserSchema.statics.promoteToAdmin = function (id) {
	return this.findByIdAndUpdate(id, { $set: { role: '[ADMIN]' } }).exec();
};

UserSchema.statics.promoteToSuperUser = function (id) {
	return this.findByIdAndUpdate(id, { $set: { role: '[SUPER]' } }).exec();
};

UserSchema.static.promoteToUser = function (id) {
	return this.findByIdAndUpdate(id, { $set: { role: '[USER]' } }).exec();
};

UserSchema.static.getUserCountyID = function (id) {
	return this.findOne(id, { county: 1, _id: 0 }).exec();
};

export default mongoose.model('User', UserSchema);
