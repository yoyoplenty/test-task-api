import { PartialType } from '@nestjs/swagger';
import { CreateUserSectorDto } from './create-user-sector.dto';

export class UpdateUserSectorDto extends PartialType(CreateUserSectorDto) {}
