import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database.config';

interface vehicleAttributes {
  id: number;
  placa: string;
  ano: number;
}

interface vehicleCreateAtributes extends Optional<vehicleAttributes, 'id'> {}

interface vehicleInstancia
  extends Model<vehicleAttributes, vehicleCreateAtributes>,
    vehicleAttributes {}

export const vehicle = sequelize.define<vehicleInstancia>('Vehicle', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  placa: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Debe introducir un placa' },
      notNull: { msg: 'Debe introducir un placa' },
      len: {
        args: [6, 10],
        msg: 'La placa debe contener de 6 a 10 caracteres.',
      },
    },
  },

  ano: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Debe introducir el año del vehiculo.' },
      notNull: { msg: 'Debe introducir el año del vehiculo.' },
      len: {
        args: [4, 4],
        msg: 'El año debe contener 4 dígitos.',
      },
    },
  },
});
