import { connectToDatabase } from '@/database/connection';

export const runApp = async (app) => {
  if (!process.env.SERVERLESS_ACTIVE) return;
  const { PORT } = process.env;
  await connectToDatabase();
  app.listen(PORT || 3000, async () => {
    console.log(`App listening on port ${process.env.PORT}!`);
  });
};
