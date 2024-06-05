import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Ingredient, IngredientSchema } from './ingredient.schema';
import { Comment, CommentSchema } from './comment.schema';
import { CuisineType } from '../enums/cuisine-type.enum';

@Schema({ collection: 'recipes', versionKey: false })
export class RecipeEntity {
  @Prop({ required: true })
  name: string;

  @Prop({ type: String, enum: CuisineType, required: true })
  cuisine: CuisineType;

  @Prop({ type: [IngredientSchema], required: true })
  ingredients: Ingredient[];

  @Prop({ required: true })
  steps: string[];

  @Prop({ required: true })
  photos: string[];

  @Prop({ type: [CommentSchema] })
  comments: Comment[];
}

export const RecipeSchema = SchemaFactory.createForClass(RecipeEntity);
