import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserEntity } from '../schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UniversalIdDto } from '../dtos/universal-id.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserEntity.name) private userModel: Model<UserEntity>,
  ) {}

  async createUser(userDto: CreateUserDto) {
    userDto.password = await bcrypt.hash(userDto.password, 10);

    try {
      const user = new this.userModel(userDto);
      return user.save();
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    try {
      return this.userModel.find();
    } catch (error) {
      throw error;
    }
  }

  getUserById(userId: UniversalIdDto) {
    const isValid = mongoose.Types.ObjectId.isValid(userId.id);
    if (!isValid)
      throw new BadRequestException('Provided ID is not valid MongoDB _id');

    try {
      return this.userModel.findById(userId.id);
    } catch (error) {
      throw error;
    }
  }

  getUserByUsername(username: string) {
    try {
      return this.userModel
        .findOne({
          username: username,
        })
        .lean();
    } catch (error) {
      throw error;
    }
  }

  updateUser(userId: string, dto: UpdateUserDto) {
    try {
      return this.userModel.findByIdAndUpdate(userId, dto, { new: true });
    } catch (error) {
      throw error;
    }
  }

  async checkIfInDB(username: string, email: string): Promise<boolean> {
    try {
      const exists = await this.userModel.exists({
        $or: [{ username: username }, { email: email }],
      });

      return !!exists;
    } catch (error) {
      throw error;
    }
  }
}
