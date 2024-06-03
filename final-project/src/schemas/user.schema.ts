import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { PostEntity } from './post.schema';

@Schema({ collection: 'users' })
export class UserEntity {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PostEntity' }] })
  posts: PostEntity[];
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
