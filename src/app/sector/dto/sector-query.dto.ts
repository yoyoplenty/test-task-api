import { ObjectId } from 'mongodb';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SectorQueryDto {
  @ApiPropertyOptional({ description: 'The sector id' })
  _id?: number;

  @ApiPropertyOptional({ description: 'The sector name' })
  name?: string;

  @ApiPropertyOptional({ description: 'The sector sector id' })
  parentSector?: ObjectId;
}
