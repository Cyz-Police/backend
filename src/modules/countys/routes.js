import { Router } from 'express';

import * as CountyController from './controller';

const routes = new Router();

routes.post('/county/create', CountyController.createCounty);
routes.post('/county/update', CountyController.updateCounty);
routes.post('/county/validate', CountyController.validateCounty);
routes.get('/county/getAll', CountyController.getAllCounties);

export default routes;
