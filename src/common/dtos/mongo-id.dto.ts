import { IsDefined, IsMongoId, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class MongoObjectIdDto {
  @IsNotEmpty()
  @IsDefined()
  @IsMongoId()
  id: mongoose.Types.ObjectId;
}
