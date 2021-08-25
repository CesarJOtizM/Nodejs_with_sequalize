import express from 'express';
import cors from 'cors';
import { config } from './config/ConfigDB';
import sequelize from './config/database.config';
import { userRouter } from './routes/user.routes';

const app = express();

app.use(cors());
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

app.listen(config.port, () => {
  console.log(`Listening http://localhost:${config.port}`);
});
