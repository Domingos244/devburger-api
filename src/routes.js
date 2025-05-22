import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import authMiddleware from './middlewares/auth';


import UserController from './app/models/controllers/UserControllers';
import SessionController from './app/models/controllers/SessionController';
import ProductController from './app/models/controllers/ProductController';
import CategoryController from './app/models/controllers/CategoryController copy';

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

routes.use(authMiddleware);
routes.post('/products', upload.single('file'), ProductController.store);
routes.get('/products', ProductController.index);

routes.post('/categories', CategoryController.store);
routes.get('/categories', CategoryController.index);


export default routes;
