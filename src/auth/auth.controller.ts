import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dtos/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    description:
      'Require unique login, strong password and unique email in JSON format',
    schema: {
      example: {
        login: 'username',
        password: 'zaq1@WSX',
        email: 'email@email.com',
      },
    },
  })
  @Post('register')
  async registerUser(@Body(ValidationPipe) registerDto: CreateUserDto) {
    try {
      return await this.authService.registerUser(registerDto);
    } catch (error) {
      throw error;
    }
  }

  @ApiBody({
    description: 'Require login and strong password in JSON format',
    schema: {
      example: {
        login: 'username',
        password: 'zaq1@WSX',
      },
    },
  })
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async loginUser(@Request() req: any) {
    return await this.authService.loginUser(req.user);
  }
}
