import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import morgan from 'morgan';
import dbConfig from './config/db';
import { UserRoutes, CitizenRoutes } from './modules';

const app = express();

/**
 * Database
 */
dbConfig();

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(morgan('dev'));
app.use('/api', [UserRoutes, CitizenRoutes]);

const PORT = 3000;

app.listen(PORT, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log('App is working');
	}
});
