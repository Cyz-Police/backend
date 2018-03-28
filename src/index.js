import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import morgan from 'morgan';
import dbConfig from './config/db';
<<<<<<< HEAD
import { UserRoutes, CitizenRoutes, CountyRoutes, TypeRoutes, CategoryRoutes, ItemRoutes } from './modules';
=======
import { UserRoutes, CitizenRoutes, CountyRoutes, TypeRoutes } from './modules';
>>>>>>> df7a137ba8d7da64424e4d165e9ebef83ddbb04d

const app = express();

/**
 * Database
 */
dbConfig();

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(morgan('dev'));
<<<<<<< HEAD
app.use('/api', [UserRoutes, CitizenRoutes, CountyRoutes, TypeRoutes, CategoryRoutes, ItemRoutes]);
=======
app.use('/api', [UserRoutes, CitizenRoutes, CountyRoutes, TypeRoutes]);
>>>>>>> df7a137ba8d7da64424e4d165e9ebef83ddbb04d

const PORT = 3000;

app.listen(PORT, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log('App is working');
	}
});
