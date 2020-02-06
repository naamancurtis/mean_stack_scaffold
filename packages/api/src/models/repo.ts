import mongoose from 'mongoose';
import { logger } from '../utils/logger';

export default (): void => {
  const mongoUri = process.env.MONGO_HOST || 'localhost:27017';
  const mongoDb = process.env.MONGO_INITDB_DATABASE || 'testDb';
  const mongoUser = process.env.MONGO_USER || '';
  let mongoPw = process.env.MONGO_PASSWORD || '';
  if (mongoPw !== '') {
    mongoPw = `:${mongoPw}@`;
  }

  const connect = (): void => {
    logger.info(
      `Trying to Connect on: mongodb://${mongoUser}:${mongoPw}${mongoUri}/${mongoDb}`
    );
    mongoose
      .connect(`mongodb://${mongoUser}${mongoPw}${mongoUri}/${mongoDb}`, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
      .then(() => {
        return logger.info('=== Connected to Database ===');
      })
      .catch((err: Error) => {
        logger.error(err);
        return process.exit(1);
      });
  };

  connect();
  mongoose.connection.on('disconnected', connect);
};
