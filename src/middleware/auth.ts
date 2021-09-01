import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { any } from 'sequelize/types/lib/operators';
import { authConfig } from '../config/authConfig';
import { User } from '../models/User.model';

export const Auth = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (authorization) {
    const token = authorization.split(' ')[1];

    verify(token, authConfig.secret, async (err, decoded) => {
      if (err) {
        res.status(500).json({
          msg: 'Ha ocurrido un problema al decodificar el token',
          err,
        });
      } else {
        const findUser: any = await User.findByPk(decoded?.user.id, {
          include: 'rol',
        });
        req.user = findUser;

        next();
      }
    });
  } else {
    res.status(401).json({ msg: 'Acceso no autorizado' });
  }
};
