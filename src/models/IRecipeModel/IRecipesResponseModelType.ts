import {IRecipe} from "./IRecipe.ts";

export interface IRecipesResponseModelType{
    recipes: IRecipe[];
    total: number;
    skip: number;
    limit: number;
}