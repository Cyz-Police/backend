import bodyParser from 'body-parser';
import passport from 'passport';
import morgan from 'morgan';

export default (app) => {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(morgan('dev'));
	app.use(passport.initialize());
};
