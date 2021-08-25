import { Request, Response } from 'express';
import { user } from '../models/user.model';
import { Op } from 'sequelize';

export const createUser = async (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }
  const { id, nombre, apellido, celular, identificacion } = req.body;

  const User = {
    ...req.body,
    id: id,
    nombre: nombre,
    apellido: apellido,
    celular: celular,
    identificacion: identificacion,
  };

  try {
    const data = await user.create(User);
    res.send({ status: 201, datos: data });
  } catch (error) {
    res.status(500).send({
      message: error || 'Some error occurred while creating the User.',
    });
  }
};

export const findAll = async (req: Request, res: Response) => {
  const celular = req.query.celular;

  let condition = celular
    ? { celular: { [Op.like]: `%${celular}%` } }
    : undefined;

  try {
    const data = await user.findAll({ where: condition });
    res.send({ status: 200, datos: data });
  } catch (error) {
    res.status(500).send({
      message: error || 'Some error occurred while creating the User.',
    });
  }
};

export const findOne = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const data = await user.findByPk(id);
    res.send({
      status: 200,
      datos: data ? data : `User with id: ${id} not found`,
    });
  } catch (error) {
    res.status(500).send({
      message: error || 'Some error occurred while creating the User.',
    });
  }
};

export const update = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const data = await user.update(req.body, {
      where: { id: id },
    });
    if (data[0] == 1) {
      res.send({
        status: 200,
        message: `User with id: ${id} was updated successfully.`,
      });
    } else {
      res.send({
        status: 400,
        message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error || 'Error updating User with id=' + id,
    });
  }
};

export const removeOne = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const data = await user.destroy({
      where: { id: id },
    });
    if (data == 1) {
      res.send({
        status: 200,
        message: `User with id: ${id} was deleted successfully.`,
      });
    } else {
      res.send({
        status: 400,
        message: `Cannot deleted User with id=${id}. Maybe User was not found or not exist!`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error || 'Error updating User with id=' + id,
    });
  }
};
