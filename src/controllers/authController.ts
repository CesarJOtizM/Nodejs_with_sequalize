import { Request, Response } from 'express';
import { hashSync, compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { authConfig } from '../config/authConfig';

import { User } from '../models/User.model';

export const createUser = async (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }
  const { name, lastName, password, email } = req.body;

  if (password.length >= 6) {
    const passHash = hashSync(password, +authConfig.rounds);

    const user = { name, lastName, password: passHash, email };

    try {
      const data = await User.create(user);

      const token = sign({ user: data }, authConfig.secret, {
        expiresIn: authConfig.expires,
      });

      res.send({ status: 201, data, token });
    } catch (error) {
      res.status(500).send({
        message: error || 'Some error occurred while creating the User.',
      });
    }
  } else {
    res.status(404).send({
      message: 'contraseña invalida.',
    });
  }
};

export const singIn = async (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }
  const { password, email } = req.body;

  // Buscar usuario
  try {
    const findUser = await User.findOne({
      where: {
        email,
      },
    });
    if (findUser) {
      if (compareSync(password, findUser.password)) {
        const token = sign({ user: findUser }, authConfig.secret, {
          expiresIn: authConfig.expires,
        });
        res.send({ status: 200, data: findUser, token });
      } else {
        res.status(401).send({
          error: 'Contraseña invalida',
          message: 'La contraseña es incorrecta ',
        });
      }
    } else {
      res.status(404).send({
        error: 'Email invalido',
        message: 'El email ingresado no es correcto',
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error || 'Some error occurred while creating the User.',
    });
  }
};
