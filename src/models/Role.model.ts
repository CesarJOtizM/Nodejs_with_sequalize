import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database.config';

interface RoleAttributes {
  id: number;
  name: string;
}

interface RoleCreationAttributes extends Optional<RoleAttributes, 'id'> {}

interface RoleInstance
  extends Model<RoleAttributes, RoleCreationAttributes>,
    RoleAttributes {}

export const Role = sequelize.define<RoleInstance>(
  'Role',
  {
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
      },
    },
  },
  {
    tableName: 'Rol',
  }
);
