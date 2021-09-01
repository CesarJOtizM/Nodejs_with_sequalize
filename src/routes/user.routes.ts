import { Router } from 'express';
import { createUser, singIn } from '../controllers/authController';

export const userRouter = (app: any) => {
  const router = Router();

  router.post('/', createUser);
  router.post('/login', singIn);

  app.use('/api/user', router);
};
