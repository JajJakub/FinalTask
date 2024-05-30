import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Ingredient, IngredientSchema } from './ingredient.schema';

@Schema({ collection: 'posts' })
export class PostEntity {
  @Prop({ required: true })
  name: string;
  @Prop({ type: [IngredientSchema], required: true })
  ingredients: Ingredient[];
  @Prop({ required: true })
  steps: string[];
  @Prop({ required: true })
  photos: string[];
}

export const PostSchema = SchemaFactory.createForClass(PostEntity);
