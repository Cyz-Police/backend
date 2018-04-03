import { Router } from 'express';
import passport from 'passport';
import * as ItemController from './controller';

const routes = new Router();

routes.post('/item/create', ItemController.createItem);
routes.get('/item/pull', passport.authenticate('USER', { session: false }), ItemController.makeCsv);

export default routes;
