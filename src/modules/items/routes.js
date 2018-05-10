import { Router } from 'express';
import passport from 'passport';
import * as ItemController from './controller';

const routes = new Router();

routes.post('/item/create', passport.authenticate('USER', { session: false }), ItemController.createItem);
routes.get('/item/pull', ItemController.makeCsv);

export default routes;
