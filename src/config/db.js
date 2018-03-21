import mongoose from 'mongoose';

import config from './config';

export default () => {
	mongoose.Promise = global.Promise;
	mongoose.connect(config.DB_URL);
	mongoose.connection
		.once('open', () => console.log('MongoDB is running'))
		.on('error', err => console.log(err));
};
