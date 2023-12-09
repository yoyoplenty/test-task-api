import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

import { ROLE } from 'src/enums';

export class RegisterDto {
  @ApiProperty({ description: 'User email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User first name' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'User last name' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'User middle name' })
  @IsString()
  @IsOptional()
  middleName: string;

  @ApiProperty({ enum: ROLE, description: 'User role (admin or user)' })
  @IsEnum(ROLE)
  role: ROLE;

  @ApiProperty({ description: 'User password' })
  @Length(7, 20)
  @IsString()
  @IsNotEmpty()
  password: string;
}
