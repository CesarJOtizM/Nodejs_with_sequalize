import { Request, Response, NextFunction } from 'express';
import { vehicle } from '../models/Vehicle.model';
import { Op } from 'sequelize';

export const register = async (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }
  const { placa, ano, vencimiento_soat, vencimiento_tecno } = req.body;

  const Vehicle = {
    ...req.body,
    placa,
    ano,
    vencimiento_soat,
    vencimiento_tecno,
  };
  try {
    const data = await vehicle.create(Vehicle);
    res.send({ status: 201, res: 'OK', datos: data });
    console.log(`El vehiculo de placa ${placa} ha sido registrado.`);
  } catch (error) {
    res.status(500).send({
      status: 500,
      mensaje: error || `Error al registrar vehiculo de placa ${placa}.`,
    });
    console.log(`Error al registrar vehiculo de placa ${placa}.`);
  }
};

export const findAll = async (req: Request, res: Response) => {
  const { placa } = req.query;

  let condition = placa ? { placa: { [Op.like]: `%${placa}%` } } : undefined;

  try {
    const data = await vehicle.findAll({ where: condition });
    res.send({ status: 200, res: 'OK', datos: data });
  } catch (error) {
    res.status(500).send({
      res: 'ERROR',
      mensaje: error || 'Error al listar los vehículos.',
    });
  }
};

export const findOne = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const data = await vehicle.findByPk(id);
    res.send({
      status: 200,
      datos: data || `El usuario con ID: ${id} no se encontró`,
    });
  } catch (error) {
    res.status(500).send({
      message: error || 'Ocurrió un error al buscar el usuario',
    });
  }
};

export const edit = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const data = await vehicle.update(req.body, {
      where: { id },
    });
    if (data[0] === 1) {
      res.send({
        status: 200,
        mensaje: `Vehículo con id ${id} actualizado correctamente.`,
      });
    } else {
      res.send({
        status: 400,
        mensaje: `No pudo actualizarse el Vehículo con el id ${id}. Puede que no se haya encontrado el Vehículo o la solicitud es incorrecta.`,
      });
    }
  } catch (error) {
    res.status(500).send({
      mensaje: error || `Error al editar el Vehículo con el id ${id}.`,
    });
  }
};

export const deleteOne = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const data = await vehicle.destroy({
      where: { id },
    });
    if (data == 1) {
      res.send({
        status: 200,
        mensaje: `El vehiculo con id ${id} ha sio eliminado correctamente.`,
      });
    } else {
      res.send({
        status: 400,
        mensaje: `Cannot deleted Vehicle with id=${id}. Maybe Usuario was not found or not exist!`,
      });
    }
  } catch (error) {
    res.status(500).send({
      mensaje: error || 'Error delete vehicle with id=' + id,
    });
  }
};
