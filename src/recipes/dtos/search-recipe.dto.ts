import {IsEnum, IsString} from "class-validator";
import {CuisineType, DifficultyType} from "../../enums/cuisine-type.enum";

export class SearchRecipeDto{
    @IsString()
    name:string

    @IsEnum(CuisineType)
    cuisine:CuisineType

    @IsEnum(DifficultyType)
    difficulty:DifficultyType
}