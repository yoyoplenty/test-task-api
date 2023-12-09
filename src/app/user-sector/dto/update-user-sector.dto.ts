import { PartialType } from '@nestjs/mapped-types';
import { CreateUserSectorDto } from './create-user-sector.dto';

export class UpdateUserSectorDto extends PartialType(CreateUserSectorDto) {}
