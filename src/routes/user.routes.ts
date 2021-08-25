import express from 'express';
import {
  createUser,
  findAll,
  findOne,
  update,
  removeOne,
} from '../controllers/user.controller';

export const userRouter = (app: any) => {
  const router = express.Router();

  router.post('/', createUser);
  router.get('/', findAll);
  router.get('/:id', findOne);
  router.put('/:id', update);
  router.delete('/:id', removeOne);

  app.use('/user', router);
};
