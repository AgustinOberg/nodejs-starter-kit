import 'dotenv/config';
import serverless from 'serverless-http';
import { connectToDatabase } from './src/database/connection';
import app from './src/server';
import { runApp } from './src/utils/debug';

runApp(app);

module.exports.handler = async (event, context) => {
  await connectToDatabase();
  const serverlessApp = serverless(app);
  const response = await serverlessApp(event, context);
  return response;
};
