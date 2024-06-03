import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { isNumber } from '@nestjs/common/utils/shared.utils';

@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('addPost')
  async addPost(@Body(ValidationPipe) postDto: CreatePostDto) {
    try {
      return await this.postsService.createPost(postDto);
    } catch (error) {
      throw error;
    }
  }

  @Get('all')
  getAll() {
    return this.postsService.findAll();
  }

  @Post('search')
  async findPost(@Body() body: { postId: string }) {
    if (!body.postId || isNumber(body.postId))
      throw new BadRequestException('Post ID is required as string!');

    try {
      return this.postsService.findPostById(body.postId);
    } catch (error) {
      throw error;
    }
  }
}
