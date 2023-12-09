import { Injectable } from '@nestjs/common';
import { CreateUserSectorDto } from './dto/create-user-sector.dto';
import { UpdateUserSectorDto } from './dto/update-user-sector.dto';

@Injectable()
export class UserSectorService {
  create(createUserSectorDto: CreateUserSectorDto) {
    return 'This action adds a new userSector';
  }

  findAll() {
    return `This action returns all userSector`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userSector`;
  }

  update(id: number, updateUserSectorDto: UpdateUserSectorDto) {
    return `This action updates a #${id} userSector`;
  }

  remove(id: number) {
    return `This action removes a #${id} userSector`;
  }
}
