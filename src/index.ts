import app from './app';
import { connectDb } from './db/connect-db';

const PORT = process.env.NODE_ENV || process.env.PORT;

const start = async () => {
  await connectDb();

  app.listen(PORT, () => {
    console.log(`APP is running on PORT ${PORT}`);
  });
};

start();
