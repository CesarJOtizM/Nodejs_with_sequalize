import { Router, Request, Response, NextFunction } from 'express';
import {
  register,
  findAll,
  findOne,
  edit,
  deleteOne,
} from '../controllers/Vehicle.controller';
import { Auth } from '../middleware/auth';

export const vehicleRouter = (app: any) => {
  const router = Router();

  router.post('/', Auth, register);
  router.get('/', Auth, findAll);
  router.get('/:id', Auth, findOne);
  router.put('/:id', Auth, edit);
  router.delete('/:id', Auth, deleteOne);

  app.use('/api/vehicle', router);
};
