import { ObjectId } from 'mongodb';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UserSectorQueryDto {
  @ApiPropertyOptional({ description: 'The sector id' })
  _id?: number;

  @ApiPropertyOptional({ description: 'The sector id' })
  sector?: ObjectId;

  @ApiPropertyOptional({ description: 'The user id' })
  user?: ObjectId;
}
