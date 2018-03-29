/* eslint func-names: ["error", "never"] */
import mongoose, { Schema } from 'mongoose';

const CounterSchema = new Schema({
	year: {
		type: String,
		required: true,
	},
	county: {
		type: Schema.Types.ObjectId,
		ref: 'County',
		required: true,
	},
	seq: {
		type: Number,
		required: true,
	},
});

CounterSchema.statics.getNextSequence = async function (Year, countyId) {
	try {
		const counter = await this.findOne({ year: Year, county: countyId }).exec();
		if (!counter) {
			const Counter = mongoose.model('Counter', CounterSchema);
			const newCounter = new Counter({ year: Year, county: countyId, seq: 1 });
			await newCounter.save();
			return '1';
		}
		const ret = await this.findOneAndUpdate(
			{ year: Year, county: countyId },
			{ $inc: { seq: 1 } },
		).exec();
		return ret.seq.toString();
	} catch (e) {
		return false;
	}
};

export default mongoose.model('Counter', CounterSchema);
