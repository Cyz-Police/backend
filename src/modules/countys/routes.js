import { Router } from 'express';

import * as CountyController from './controller';

const routes = new Router();

routes.post('/county/create', CountyController.createCounty);
routes.post('/county/update', CountyController.updateCounty);
routes.post('/county/validateTitle', CountyController.validateCountyTitle);
routes.post('/county/validateId', CountyController.validateCountyId);
routes.get('/county/getAll', CountyController.getAllCounties);

export default routes;
