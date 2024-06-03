import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dtos/login-user.dto';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './auth.constants';
import { FlattenMaps } from 'mongoose';
import { UserEntity } from '../schemas/user.schema';
import { CreateUserDto } from '../users/dtos/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(userDto: CreateUserDto) {
    const ifInDB: boolean = await this.usersService.checkIfInDB(
      userDto.username,
      userDto.email,
    );

    if (ifInDB) {
      throw new ConflictException(
        'User with this username or email already exists',
      );
    }

    const user = await this.usersService.createUser(userDto);
    const { password, ...result } = JSON.parse(
      JSON.stringify(user, (key, value) => (key === '__v' ? undefined : value)),
    );

    return {
      ...result,
      access_token: await this.createJwt(user._id.toString(), user.username),
    };
  }

  async validateUser(userDto: LoginUserDto) {
    const user = await this.usersService
      .getUserByUsername(userDto.username)
      .lean();

    if (user && (await bcrypt.compare(userDto.password, user.password))) {
      return user;
    }
    return null;
  }

  async loginUser(user: FlattenMaps<UserEntity> & { _id: string }) {
    const { password, ...result } = user;
    return {
      ...result,
      access_token: await this.createJwt(user._id, user.username),
    };
  }

  async createJwt(userId: string, username: string) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        username: username,
      },
      { secret: jwtConstants.secret, expiresIn: jwtConstants.secret_time },
    );
  }
}
