import * as mongoose from 'mongoose';
import { MONGO_CONNECTIONS } from 'src/common';

export const databaseProviders = [
  {
    provide: MONGO_CONNECTIONS.MAIN,
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(process.env.MONGO_URI),
  },
];
