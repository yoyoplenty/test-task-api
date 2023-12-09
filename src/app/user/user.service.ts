import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { MSG_TYPES } from 'src/utils/helpers/msg-types';
import { ServiceResponse } from 'src/utils/types';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(data: Record<string, any>): Promise<UserDocument> {
    return await this.userModel.create(data);
  }

  async findAll(query: Record<string, any>): Promise<UserDocument[]> {
    return await this.userModel.find(query);
  }

  async findOne(query: Record<string, any>): Promise<UserDocument> {
    return await this.userModel.findOne(query);
  }

  async findUserProfile(user: UserDocument): Promise<{ data: UserDocument; message: string }> {
    return { data: user, message: MSG_TYPES.FETCHED };
  }

  async editProfile(user: User, editProfilePayload: UpdateUserDto): Promise<ServiceResponse> {
    const { email } = user;

    const updatedUser = await this.userModel.updateOne({ email }, editProfilePayload);

    return { data: updatedUser, message: MSG_TYPES.UPDATED };
  }

  async deleteAccount(userId: ObjectId): Promise<ServiceResponse> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new BadRequestException('user not found');

    await this.userModel.findByIdAndDelete(user._id);

    return { data: null, message: MSG_TYPES.DELETED };
  }
}
