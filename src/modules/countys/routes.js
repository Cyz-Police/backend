import { Router } from 'express';

import * as CountyController from './controller';

const routes = new Router();

routes.post('/county/create', CountyController.createCounty);
routes.post('/county/update', CountyController.updateCounty);

export default routes;
