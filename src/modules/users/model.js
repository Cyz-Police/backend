/* eslint func-names: ["error", "never"] */
import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
	fullName: {
		type: String,
		required: true,
		lowercase: true,
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
		select: false,
	},
	role: {
		type: String,
		default: '[USER]',
	},
	active: {
		type: Boolean,
		default: false,
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

UserSchema.statics.promoteToUser = function (id) {
	return this.findByIdAndUpdate(id, { $set: { role: '[USER]' } }).exec();
};

UserSchema.statics.getUserCountyId = function (id) {
	return this.findById(id).exec().then(user => user.county);
};

UserSchema.statics.changeRole = function (id, role) {
	return this.findByIdAndUpdate(id, { $set: { role } }).exec();
};

UserSchema.statics.findByEmail = function (userEmail) {
	return this.findOne({ email: userEmail });
};

export default mongoose.model('User', UserSchema);
