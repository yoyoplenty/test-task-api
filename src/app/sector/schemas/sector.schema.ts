import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type SectorDocument = HydratedDocument<Sector>;

@Schema({ collection: 'Sectors', versionKey: false, timestamps: true })
export class Sector {
  @ApiProperty()
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Sector' })
  parentSector: mongoose.Schema.Types.ObjectId;
}

export const SectorSchema = SchemaFactory.createForClass(Sector);
