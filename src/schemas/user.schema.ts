import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { RecipeEntity } from './recipe.schema';

@Schema({ collection: 'users', versionKey: false })
export class UserEntity {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RecipeEntity' }],
  })
  recipes: RecipeEntity[];
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
