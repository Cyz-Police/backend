import { Router } from 'express';
import passport from 'passport';
import * as UserController from './controller';

const routes = new Router();

routes.post('/user/activate', UserController.activateUser);
routes.post('/user/deactivate', UserController.deactivateUser);
routes.post('/user/create', UserController.createUser);
routes.post('/user/changeRole', UserController.changeUsersRole);
routes.post('/user/authenticate', UserController.authenticateUser);
routes.get('/user/getAll', UserController.getAllUsers);

export default routes;
