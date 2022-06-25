import * as mongoose from 'mongoose';

export interface IUSER {
  _id: mongoose.Types.ObjectId;
  fname: string;
  lname: string;
  email: string;
  password: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}
