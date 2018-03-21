import { Router } from 'express';

import * as UserController from './controller';

const routes = new Router();

routes.post('/user/activate', UserController.activateUser);
routes.post('/user/deactivate', UserController.deactivateUser);
routes.get('/user/hi', (req, res) => {return res.json({ message: 'hi' }); });

export default routes;
