import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';

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
}
