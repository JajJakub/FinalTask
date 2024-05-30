import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Ingredient {
  @Prop({ required: true })
  product: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  measureType: string;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);
