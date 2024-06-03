import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PostEntity } from '../schemas/post.schema';
import { Model, Types } from 'mongoose';
import { CreatePostDto } from './dtos/create-post.dto';
import { UserEntity } from '../schemas/user.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(PostEntity.name) private postModel: Model<PostEntity>,
    @InjectModel(UserEntity.name) private userModel: Model<UserEntity>,
  ) {}

  async createPost({ authorId, ...postDto }: CreatePostDto) {
    const user = await this.userModel.findById(authorId);

    if (!user) throw new UnauthorizedException();

    const post = new this.postModel(postDto);
    const savedPost = await post.save();

    try {
      await user.updateOne({
        $push: {
          posts: savedPost._id,
        },
      });
    } catch (error) {
      throw error;
    }
    return savedPost;
  }

  async findPostById(postId: string) {
    if (!Types.ObjectId.isValid(postId))
      throw new BadRequestException('Invalid post ID');

    try {
      return (
        (await this.postModel
          .findById(postId, '-__v -ingredients._id')
          .lean()) || { msg: 'No post with this ID' }
      );
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return this.postModel.find({}, '-__v -ingredients._id').lean();
  }
}
