import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PostEntity } from '../schemas/post.schema';
import { Model } from 'mongoose';
import { CreatePostDto } from './dtos/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(PostEntity.name) private postModel: Model<PostEntity>,
  ) {}

  async createPost(postDto: CreatePostDto) {
    const post = new this.postModel(postDto);
    return post.save();
  }

  findAll() {
    return this.postModel.find();
  }
}
