import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('register')
  async registerUser(@Body(ValidationPipe) registerDto: CreateUserDto) {
    try {
      return await this.usersService.createUser(registerDto);
    } catch (error) {
      throw error;
    }
  }

  @Get('all')
  getAll() {
    return this.usersService.findAll();
  }
}
