import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostEntity, PostSchema } from '../schemas/post.schema';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { UserEntity, UserSchema } from '../schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PostEntity.name,
        schema: PostSchema,
      },
      {
        name: UserEntity.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
