import { Mongoose } from 'mongoose';
import { MONGO_CONNECTIONS } from 'src/common';
import { Admins, AdminsSchema } from 'src/schemas/mongoDB/admins.schema';

export const adminsProvider = [
  {
    provide: Admins.name,
    useFactory: (mongoose: Mongoose) =>
      mongoose.model(Admins.name, AdminsSchema),
    inject: [MONGO_CONNECTIONS.MAIN],
  },
];
