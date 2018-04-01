import { Router } from 'express';

import * as CitizenController from './controller';

const routes = new Router();

routes.post('/citizen/create', CitizenController.createCitizen);
routes.post('/citizen/update', CitizenController.updateCitizen);
routes.get('/citizen/getByPersonalId', CitizenController.findCitizenByPersonalId);

export default routes;
