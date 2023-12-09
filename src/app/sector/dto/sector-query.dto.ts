import { ObjectId } from 'mongodb';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SectorQueryDto {
  @ApiPropertyOptional({ description: 'The category id' })
  _id?: number;

  @ApiPropertyOptional({ description: 'The category name' })
  name?: string;

  @ApiPropertyOptional({ description: 'The category sector id' })
  parentSector?: ObjectId;
}
