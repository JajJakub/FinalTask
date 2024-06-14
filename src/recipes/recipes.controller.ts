import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { isNumber } from '@nestjs/common/utils/shared.utils';
import { UniversalIdDto } from '../dtos/universal-id.dto';
import { AddCommentDto } from './dtos/add-comment.dto';
import {SearchRecipeDto} from "./dtos/search-recipe.dto";


@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/addRecipe')
  async addRecipe(@Body(ValidationPipe) recipeDto: CreateRecipeDto) {
    try {
      return await this.recipesService.createRecipe(recipeDto);
    } catch (error) {
      throw error;
    }
  }

  @Get('/all')
  getAll() {
    return this.recipesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/addComment')
  async addComment(@Body(ValidationPipe) addCommentDto: AddCommentDto) {
    try {
      return await this.recipesService.addComment(addCommentDto);
    } catch (error) {
      throw error;
    }
  }

  @Post('/getById')
  async findRecipe(@Body(ValidationPipe) recipeId: UniversalIdDto) {
    if (!recipeId || isNumber(recipeId))
      throw new BadRequestException('Recipe ID has to be a string');

    try {
      return this.recipesService.findRecipeById(recipeId);
    } catch (error) {
      throw error;
    }
  }

  @Post('/search')
  async search(@Body(ValidationPipe) searchDto: SearchRecipeDto ) {
    try {
      return this.recipesService.findRecipes(searchDto.name, searchDto.cuisine, searchDto.difficulty);
    } catch (error) {
      throw error;
    }
  }
}
