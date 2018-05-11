import { Router } from 'express';

import * as CitizenController from './controller';

const routes = new Router();

routes.post('/citizen/createOrFetch', CitizenController.createOrFetch);
routes.get('/citizen/getByPersonalId', CitizenController.findCitizenByPersonalId);

export default routes;
