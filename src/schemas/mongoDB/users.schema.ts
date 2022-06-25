import { Document, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UsersDocument = Users & Document;

@Schema({
  collection: 'Users',
  timestamps: true,
})
export class Users {
  @Prop({
    required: true,
    type: SchemaTypes.String,
  })
  email: string;

  @Prop({
    required: true,
    type: SchemaTypes.String,
  })
  password: string;

  @Prop({
    required: false,
    type: SchemaTypes.String,
  })
  fname: string;

  @Prop({
    required: false,
    type: SchemaTypes.String,
  })
  lname: string;

  @Prop({
    required: false,
    default: true,
    type: SchemaTypes.Boolean,
  })
  isAvailable: boolean;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
