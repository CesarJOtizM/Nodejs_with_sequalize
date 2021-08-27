import { Sequelize } from 'sequelize';
import { config } from './ConfigDB';

const sequelize = new Sequelize(config.DB, config.userDB, config.password, {
  host: config.host,
  dialect: 'mysql',
  pool: {
    max: 100,
    min: 0,
    idle: 200000,
    acquire: 1000000,
  },
});
export default sequelize;
