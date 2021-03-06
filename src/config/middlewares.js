import bodyParser from 'body-parser';
import passport from 'passport';
import morgan from 'morgan';
import cors from 'cors';
import passportConfig from './passport';

export default (app) => {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(morgan('dev'));
	app.use(cors());
	app.use(passport.initialize());
	passportConfig(passport);
};
