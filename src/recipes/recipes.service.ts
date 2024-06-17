import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RecipeEntity } from '../schemas/recipe.schema';
import { Model, Types } from 'mongoose';
import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { UserEntity } from '../schemas/user.schema';
import { UniversalIdDto } from '../dtos/universal-id.dto';
import { AddCommentDto } from './dtos/add-comment.dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(RecipeEntity.name) private recipeModel: Model<RecipeEntity>,
    @InjectModel(UserEntity.name) private userModel: Model<UserEntity>,
  ) {}

  async createRecipe({ authorId, ...recipeDto }: CreateRecipeDto) {
    const user = await this.userModel.findById(authorId);
    if (!user) throw new UnauthorizedException();

    try {
      const recipe = new this.recipeModel(recipeDto);
      const savedRecipe = await recipe.save();

      await user.updateOne({
        $push: {
          recipes: savedRecipe._id,
        },
      });

      return savedRecipe;
    } catch (error) {
      throw error;
    }
  }

  async addComment({ recipeId, ...commentDto }: AddCommentDto) {
    if (!Types.ObjectId.isValid(recipeId))
      throw new BadRequestException('Invalid recipe ID');
    const recipe = await this.recipeModel.findById(recipeId);
    if (!recipe)
      throw new BadRequestException('There is no recipe with this ID');

    try {
      return await this.recipeModel.findOneAndUpdate( {_id: recipe.id}, {$push:{
          comments:commentDto
        }}, {new: true, lean: true}
      )

    } catch (error) {
      throw error;
    }
  }

  async findRecipeById(recipeId: UniversalIdDto) {
    if (!Types.ObjectId.isValid(recipeId.id))
      throw new BadRequestException('Invalid recipe ID');

    try {
      return (
        (await this.recipeModel.findById(recipeId.id).lean()) || {
          msg: 'No recipe with this ID',
        }
      );
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return this.recipeModel.find().lean();
  }

  async findRecipes(searchString:string, cuisine:string, difficulty:string ){
    try {
      const query: any = {};

      if (searchString && searchString.length>0) {
        query.name = { $regex: searchString, $options: 'i' };
      }
      if (cuisine && cuisine.length>0 && cuisine!='all') {
        query.cuisine = cuisine;
      }
      if (difficulty && difficulty.length>0 && difficulty!='all') {
        query.difficulty = difficulty;
      }

      return await this.recipeModel.find(query);
    } catch (error){
      throw error
    }
  }

  async  findUserRecipes (userId:string){
    try {
      const user = await this.userModel.findById(userId).populate('recipes').lean()
      if (!user) throw new BadRequestException("User with this ID does not exists!")

      return user.recipes
    } catch (error){
      throw error
    }
  }

}
