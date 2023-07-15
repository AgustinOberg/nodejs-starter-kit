import mongoose from 'mongoose';
import { isTrue } from '../utils/typeUtil';

let cachedDB = null;

const connectToDatabase = async () => {
  const {
    MONGO_CONNECTION_TYPE,
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOST,
    MONGO_DATABASE,
    MONGO_SSL,
  } = process.env;

  if (cachedDB) {
    const hasAConnection = mongoose.connections.find(
      (connection) => connection.readyState === 1
    );
    if (hasAConnection) {
      console.log('Reusing connection');
      return;
    }
  }

  mongoose.set('strictQuery', false);

  const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000,
    ssl: isTrue(MONGO_SSL),
    authSource: 'admin',
    socketTimeoutMS: 10000,
    family: 4,
  };

  const mongooseInstance = await mongoose.connect(
    `${MONGO_CONNECTION_TYPE}://${
      MONGO_USERNAME && `${MONGO_USERNAME}:${MONGO_PASSWORD}@`
    }${MONGO_HOST}/${MONGO_DATABASE}?retryWrites=true&w=majority`,
    mongoOptions
  );

  console.log('Connected to database');

  cachedDB = mongooseInstance;
};

export default { connectToDatabase };
