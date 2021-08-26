import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import sequelize from './config/database.config';
import { userRouter } from './routes/user.routes';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async () => {
  try {
    await sequelize.sync();
    console.log('Connect to DB');
  } catch (error) {
    console.error(`Some error occurred ${error}`);
  }
})();

userRouter(app);

export default app;
