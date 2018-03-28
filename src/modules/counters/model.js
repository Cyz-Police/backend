/* eslint func-names: ["error", "never"] */
import mongoose, { Schema } from 'mongoose';

const CounterSchema = new Schema({
	_id: String,
	seq: {
		type: Number,
		required: true,
	},
});

CounterSchema.statics.getNextSequence = async function (year) {
	try {
		const counter = await this.findById(year).exec();
		if (!counter) {
			const Counter = mongoose.model('Counter', CounterSchema);
			const newCounter = new Counter({ _id: year, seq: 1 });
			await newCounter.save();
			return 1;
		}
		const ret = await this.findByIdAndUpdate(
			year,
			{ $inc: { seq: 1 } },
		).exec();
		console.log(ret.seq);
		return ret.seq.toString();
	} catch (e) {
		console.log(e);
		return false;
	}
};

export default mongoose.model('Counter', CounterSchema);
