import { Mongoose } from 'mongoose';
import { MONGO_CONNECTIONS } from 'src/common';
import { Users, UsersSchema } from 'src/schemas/mongoDB/users.schema';

export const usersProviders = [
  {
    provide: Users.name,
    useFactory: (mongoose: Mongoose) => mongoose.model(Users.name, UsersSchema),
    inject: [MONGO_CONNECTIONS.MAIN],
  },
];
