import { Router } from 'express';
import * as TypeController from './controller';

const routes = new Router();

routes.post('/type/create', TypeController.createType);
routes.post('/type/update', TypeController.updateType);

export default routes;
