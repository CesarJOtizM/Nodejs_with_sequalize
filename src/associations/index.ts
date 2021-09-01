import { vehicle } from '../models/Vehicle.model';
import { User } from '../models/User.model';
import { Role } from '../models/Role.model';

//un usuario puede tener muchos vehículos
User.hasMany(vehicle, { as: 'vehicle', foreignKey: 'user_id' });
vehicle.belongsTo(User, { as: 'user', foreignKey: 'user_id' });

//Roles de usuario
User.belongsToMany(Role, {
  as: 'rol',
  through: 'UserRole',
  foreignKey: 'user_id',
});
Role.belongsToMany(User, {
  as: 'users',
  through: 'UserRole',
  foreignKey: 'role_id',
});
