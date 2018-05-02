import { Router } from 'express';
import * as ItemController from './controller';

const routes = new Router();

routes.post('/item/create', ItemController.createItem);
routes.get('/item/pull', ItemController.makeCsv);

export default routes;
