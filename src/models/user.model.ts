import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database.config';

interface UserAttributes {
  id: number;
  nombre: string;
  apellido: string;
  celular: number;
  identificacion: number;
  email: string;
  foto: string;
  salario: number;
  comisión: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

export const user = sequelize.define<UserInstance>('usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Debe tener un valor' },
    },
  },

  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Debe tener un valor' },
    },
  },
  celular: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Debe tener un valor' },
      isNumeric: { msg: 'Deben ser números' },
    },
  },
  identificacion: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Debe tener un valor' },
      isNumeric: { msg: 'Deben ser números' },
    },
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: { msg: 'Debe tener un valor' },
      isEmail: { msg: 'Deber ser un email valido' },
    },
  },
  foto: {
    type: DataTypes.STRING,
  },
  salario: {
    type: DataTypes.INTEGER,
  },
  comisión: {
    type: DataTypes.INTEGER,
  },
});
