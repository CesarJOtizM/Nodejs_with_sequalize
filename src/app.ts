import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import sequelize from './config/database.config';
import { userRouter } from './routes/user.routes';
import { vehicleRouter } from './routes/vehicle.routes';

import './associations/';

const app = express();

//middleware's
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rutas
userRouter(app);
vehicleRouter(app);

(async () => {
  try {
    await sequelize.sync();
    console.log('Connect to DB');
  } catch (error) {
    console.error(`Some error occurred ${error}`);
  }
})();

export default app;
