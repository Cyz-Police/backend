import { Router } from 'express';
import passport from 'passport';
import * as UserController from './controller';

const routes = new Router();

routes.post('/user/activate', passport.authenticate('ADMIN', { session: false }), UserController.activateUser);
routes.post('/user/deactivate', UserController.deactivateUser);
routes.post('/user/create', UserController.createUser);
routes.post('/user/remove', UserController.removeUser);
routes.post('/user/authenticate', UserController.authenticateUser);

export default routes;
