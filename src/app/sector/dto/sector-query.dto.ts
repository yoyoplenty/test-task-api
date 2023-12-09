import { ApiPropertyOptional } from '@nestjs/swagger';

export class SectorQueryDto {
  @ApiPropertyOptional({ description: 'The sector id' })
  _id?: string;

  @ApiPropertyOptional({ description: 'The sector name' })
  name?: string;

  @ApiPropertyOptional({ description: 'The sector sector id' })
  parentSector?: string;
}
