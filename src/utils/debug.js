import environments from '@/constants/environment';
const { LOCAL, TEST } = environments;
import { connectToDatabase } from '@/database/connection';
const AVAILABLE_ENVIRONMENTS = [LOCAL, TEST];
const isLocal = AVAILABLE_ENVIRONMENTS.includes(process.env.NODE_ENV);

export const runLocal = async (app) => {
  if (!isLocal) return;
  const { PORT } = process.env;
  await connectToDatabase();
  app.listen(PORT || 3000, async () => {
    console.log(`App listening on port ${process.env.PORT}!`);
  });
};
