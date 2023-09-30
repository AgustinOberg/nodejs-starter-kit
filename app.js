import 'dotenv/config';
import serverless from 'serverless-http';
import app from './src/server';
import { connectToDatabase } from './src/database/connection';
import { runLocal } from './src/utils/debug';

runLocal(app);

module.exports.handler = async (event, context) => {
  await connectToDatabase();
  const serverlessApp = serverless(app);
  const response = await serverlessApp(event, context);
  return response;
};
