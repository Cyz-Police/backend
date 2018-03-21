import express from 'express';
import dbConfig from './config/db';
import { UserRoutes } from './modules';

const app = express();

/**
 * Database
 */
dbConfig();

app.use('/api/', [UserRoutes]);

const PORT = process.env || 3000;

app.listen(PORT, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log('App is working');
	}
});
