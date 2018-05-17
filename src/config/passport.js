import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from '../modules/users';
import config from './config';

const JwtOpts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.SECRET,
};

const jwtUser = new Strategy(JwtOpts, async (payload, done) => {
	try {
		const user = await User.findById(payload.id);
		if (!user) {
			return done(null, false);
		} else if (user.active === false) {
			return done(null, false);
		} else if (user.role === '[SUPERADMIN]') {
			return done(null, false);
		}
		return done(null, user);
	} catch (e) {
		return done(e, false);
	}
});

const jwtAdmin = new Strategy(JwtOpts, async (payload, done) => {
	try {
		const user = await User.findById(payload.user.id);
		if (!user) {
			return done(null, false);
		} else if (user.active === false) {
			return done(null, false);
		} else if (user.role !== '[ADMIN]') {
			return done(null, false);
		}
		return done(null, user);
	} catch (e) {
		return done(e, false);
	}
});

const jwtSuperadmin = new Strategy(JwtOpts, async (payload, done) => {
	try {
		const user = await User.findById(payload.id);
		if (!user) {
			return done(null, false);
		} else if (user.active === false) {
			return done(null, false);
		} else if (user.role !== '[SUPERADMIN]') {
			return done(null, false);
		}
		return done(null, user);
	} catch (e) {
		return done(e, false);
	}
});

export default (passport) => {
	passport.use('USER', jwtUser);
	passport.use('ADMIN', jwtAdmin);
	passport.use('SUPERADMIN', jwtSuperadmin);
};
