import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type TokenDocument = HydratedDocument<Token>;

const tokenType = ['forgot-password', 'email-verification'];

@Schema({ collection: 'tokens', versionKey: false, timestamps: true })
export class Token {
  @Prop({ required: true, unique: true, trim: true })
  token: string;

  @Prop({ enum: tokenType, trim: true })
  tokenType: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
