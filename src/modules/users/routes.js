import { Router } from 'express';
import passport from 'passport';
import * as UserController from './controller';

const routes = new Router();

routes.post('/user/activate', passport.authenticate('ADMIN', { session: false }), UserController.activateUser);
routes.post('/user/deactivate', passport.authenticate('ADMIN', { session: false }), UserController.deactivateUser);
routes.post('/user/create', UserController.createUser);
routes.post('/user/changeRole', UserController.changeUsersRole);
routes.post('/user/authenticate', UserController.authenticateUser);
routes.post('/user/validateEmail', UserController.validateUserEmail);
routes.get('/user/getAll', UserController.getAllUsers);
routes.get('/user/getByCounty', passport.authenticate('ADMIN', { session: false }), UserController.getUsersByCounty);

export default routes;
