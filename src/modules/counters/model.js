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

CounterSchema.statics.getNextSequence = async function (year, county) {
	try {
		const counter = await this.findOne({ year, county }).exec();
		if (!counter) {
			const Counter = mongoose.model('Counter', CounterSchema);
			const newCounter = new Counter({ year, county, seq: 1 });
			await newCounter.save();
			return '1';
		}
		const ret = await this.findOneAndUpdate(
			{ year, county },
			{ $inc: { seq: 1 } },
		).exec();
		console.log(ret.seq.toString());
		return ret.seq.toString();
	} catch (e) {
		console.log(e);
		return false;
	}
};

export default mongoose.model('Counter', CounterSchema);
