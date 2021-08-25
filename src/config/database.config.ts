import { Sequelize } from 'sequelize';
import { config } from './ConfigDB';

const sequelize = new Sequelize(config.DB, config.userDB, config.password, {
  host: 'localhost',
  dialect: 'mysql',
});
export default sequelize;
