/* eslint func-names: ["error", "never"] */
import mongoose, { Schema } from 'mongoose';

const CounterSchema = new Schema({
	seq: {
		type: Number,
		required: true,
	},
});

CounterSchema.statics.getNextSequence = async function (year) {
	try {
		const counter = await this.findOne(year).exec();
		if (!counter) {
			const Counter = mongoose.model('Counter', CounterSchema);
			const newCounter = new Counter({ _id: year, seq: 1 });
			await newCounter.save();
			return 1;
		}
		const ret = await this.findAndModify({
			query: { _id: year },
			update: { $inc: { seq: 1 } },
			new: true,
		}).exec();
		return ret.seq;
	} catch (e) {
		return false;
	}
};

export default mongoose.model('Counter', CounterSchema);
