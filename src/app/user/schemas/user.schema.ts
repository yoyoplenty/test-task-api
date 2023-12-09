import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ROLE } from 'src/enums';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users', versionKey: false, timestamps: true })
export class User {
  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: String })
  middleName: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true, default: ROLE.USER })
  role: ROLE;

  @Prop({ type: Boolean, default: false })
  verified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
