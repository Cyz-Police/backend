import { Router } from 'express';
import createItem from './controller';

const routes = new Router();

routes.post('/item/create', createItem);

export default routes;
