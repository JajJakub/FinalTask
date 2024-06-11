import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeEntity, RecipeSchema } from '../schemas/recipe.schema';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { UserEntity, UserSchema } from '../schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RecipeEntity.name,
        schema: RecipeSchema,
      },
      {
        name: UserEntity.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}
