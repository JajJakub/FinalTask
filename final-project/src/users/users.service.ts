import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserEntity } from '../schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserEntity.name) private userModel: Model<UserEntity>,
  ) {}

  async createUser(userDto: CreateUserDto) {
    userDto.password = await bcrypt.hash(userDto.password, 10);
    const user = new this.userModel(userDto);
    return user.save();
  }

  findAll() {
    return this.userModel.find();
  }

  getUserById(userId: string) {
    const isValid = mongoose.Types.ObjectId.isValid(userId);
    return this.userModel.findById(userId);
  }

  getUserByUsername(username: string) {
    return this.userModel
      .findOne(
        {
          username: username,
        },
        '-__v',
      )
      .lean();
  }

  updateUser(userId: string, dto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(userId, dto, { new: true });
  }

  async checkIfInDB(username: string, email: string): Promise<boolean> {
    const exists = await this.userModel.exists({
      $or: [{ username: username }, { email: email }],
    });
    return !!exists;
  }
}
