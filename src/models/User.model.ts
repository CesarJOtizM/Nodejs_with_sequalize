import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database.config';

interface UserAttributes {
  id: number;
  name: string;
  lastName: string;
  password: string;
  email: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

export const User = sequelize.define<UserInstance>('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Debe tener un valor' },
      isAlpha: { msg: 'Solo debe tener letras' },
      len: {
        args: [2, 255],
        msg: 'El nombre tiene que ser como mínimo de dos caracteres',
      },
    },
  },

  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Debe tener un valor' },
      isAlpha: { msg: 'Solo debe tener letras' },
      len: {
        args: [2, 255],
        msg: 'El nombre tiene que ser como mínimo de dos caracteres',
      },
    },
  },

  password: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Debe tener un valor' },
      isEmail: { msg: 'Deber ser un email valido' },
    },
  },
});
