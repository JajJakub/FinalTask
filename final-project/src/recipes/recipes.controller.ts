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

@UseGuards(JwtAuthGuard)
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post('addRecipe')
  async addRecipe(@Body(ValidationPipe) recipeDto: CreateRecipeDto) {
    try {
      return await this.recipesService.createRecipe(recipeDto);
    } catch (error) {
      throw error;
    }
  }

  @Get('all')
  getAll() {
    return this.recipesService.findAll();
  }

  @Post('/addComment')
  async addComment(@Body(ValidationPipe) addCommentDto: AddCommentDto) {
    try {
      return await this.recipesService.addComment(addCommentDto);
    } catch (error) {
      throw error;
    }
  }

  @Post('search')
  async findRecipe(@Body() recipeId: UniversalIdDto) {
    if (!recipeId || isNumber(recipeId))
      throw new BadRequestException('Recipe ID is required as string!');

    try {
      return this.recipesService.findRecipeById(recipeId);
    } catch (error) {
      throw error;
    }
  }
}
