import { Router } from 'express';

import * as CategoryController from './controller';

const routes = new Router();

routes.post('/category/create', CategoryController.createCategory);
routes.post('/category/update', CategoryController.updateCategory);
routes.get('/category/getAll', CategoryController.getAllCategories);
routes.post('/category/validateTitle', CategoryController.validateCategoryTitle);

export default routes;
