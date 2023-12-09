import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserSectorDto } from './dto/create-user-sector.dto';
import { UpdateUserSectorDto } from './dto/update-user-sector.dto';
import { ServiceResponse } from 'src/utils/types';
import { MSG_TYPES } from 'src/utils/helpers/msg-types';
import { UserSector, UserSectorDocument } from './schemas/user-sector.schema';

@Injectable()
export class UserSectorService {
  constructor(@InjectModel(UserSector.name) private userSector: Model<UserSectorDocument>) {}

  async createUserSector(createUserSectorPayload: CreateUserSectorDto): Promise<ServiceResponse> {
    const data = await this.userSector.create(createUserSectorPayload);

    return { data, message: MSG_TYPES.FETCHED };
  }

  async getUserSectors(filter: any): Promise<ServiceResponse> {
    const userSectors = await this.userSector.find(filter);
    if (!userSectors || userSectors.length < 1) throw new NotFoundException('userSectors not found');

    return { data: userSectors, message: MSG_TYPES.FETCHED };
  }

  async getUserSectorById(_id: string): Promise<ServiceResponse> {
    const userSector = await this.userSector.findOne({ _id });
    if (!userSector) throw new NotFoundException('userSector not found');

    return { data: userSector, message: MSG_TYPES.FETCHED };
  }

  async getUserSector(filter: any): Promise<ServiceResponse> {
    const userSector = await this.userSector.findOne(filter);
    if (!userSector) throw new NotFoundException('userSector not found');

    return { data: userSector, message: MSG_TYPES.FETCHED };
  }

  async updateUserSector(_id: string, updateUserSectorPayload: UpdateUserSectorDto): Promise<ServiceResponse> {
    const userSector = await this.userSector.findOne({ _id });
    if (!userSector) throw new NotFoundException('userSector not found');

    await this.userSector.updateOne({ _id }, updateUserSectorPayload);

    return { data: null, message: MSG_TYPES.UPDATED };
  }

  async deleteUserSector(_id: string): Promise<ServiceResponse> {
    const userSector = await this.userSector.findOne({ _id });
    if (!userSector) throw new NotFoundException('userSector not found');

    await this.userSector.deleteOne({ _id });

    return { data: null, message: MSG_TYPES.UPDATED };
  }
}
