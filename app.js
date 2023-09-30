import {} from 'dotenv/config';
import connection from './src/database/connection';
import serverless from 'serverless-http';
import app from './src/server';
const { connectToDatabase } = connection;
const { PORT } = process.env;

(async () => {
  await connectToDatabase();
  app.listen(PORT || 3000, async () => {
    console.log(`App listening on port ${process.env.PORT}!`);
  });
})();

module.exports = app;
module.exports.handler = serverless(app);
