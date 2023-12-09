import { ObjectId } from 'mongodb';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsString, IsMongoId, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateUserSectorDto {
  @ApiProperty({ description: 'The name of the model', example: 'Example Name' })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name cannot be empty' })
  readonly name: string;

  @ApiProperty({ description: 'The MongoDB ObjectId of the sector', example: '609c1d67f0a42c001f6b6412' })
  @IsMongoId({ message: 'Sector must be a valid MongoDB ObjectId' })
  @IsNotEmpty()
  readonly sector: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsNotEmpty()
  readonly agreedTerms: boolean;

  @ApiHideProperty()
  user?: ObjectId;
}
