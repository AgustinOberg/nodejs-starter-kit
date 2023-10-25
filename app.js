import 'dotenv/config';
import serverless from 'serverless-http';
import { connectToDatabase } from './src/database/connection';
import app from './src/server';
import { runApp } from './src/utils/debug';

runApp(app);
let serverlesApp;

async function asyncTasks() {
  try {
    await connectToDatabase();
  } catch (err) {
    console.log(err);
  }
}

async function setup(event, context) {
  await asyncTasks();
  serverlesApp = serverless(app);
  const response = await serverlesApp(event, context);
  return response;
}

module.exports.handler = async (event, context) => {
  if (serverlesApp) {
    const res = await serverlesApp(event, context);
    return res;
  }

  return setup(event, context);
};
