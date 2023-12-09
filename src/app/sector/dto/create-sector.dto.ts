import { IsString, IsMongoId, IsOptional, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSectorDto {
  @ApiProperty({ description: 'The name of the sector', maxLength: 50, example: 'Technology' })
  @MaxLength(50, { message: 'Name cannot be longer than 50 characters' })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name cannot be empty' })
  readonly name: string;

  @ApiProperty({
    description: 'The MongoDB ObjectId of the parent sector (optional)',
    example: '609c1d67f0a42c001f6b6412',
  })
  @IsMongoId({ message: 'Parent sector must be a valid MongoDB ObjectId' })
  @IsOptional()
  readonly parentSector?: string;
}
