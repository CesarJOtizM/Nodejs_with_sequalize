import app from './app';
import { config } from './config/configDB';

function Main() {
  app.listen(config.port);
  console.log(`Listening http://localhost:${config.port}`);
}

Main();
