import express from 'express';
import dbConfig from './config/db';
import middlewaresConfig from './config/middlewares';
import { UserRoutes, CitizenRoutes, CountyRoutes, TypeRoutes, CategoryRoutes, ItemRoutes } from './modules';

const app = express();

/**
 * Database
 */
dbConfig();

/**
 * Middlewares
 */
middlewaresConfig(app);

app.use('/api', [UserRoutes, CitizenRoutes, CountyRoutes, TypeRoutes, CategoryRoutes, ItemRoutes]);

const PORT = 3000;

app.listen(PORT, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log('App is working');
	}
});
