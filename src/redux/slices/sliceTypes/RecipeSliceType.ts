import {IRecipe} from "../../../models/IRecipeModel/IRecipe.ts";

export type RecipeSliceType = {
    recipes: IRecipe[];
    recipe: IRecipe | null;
    loadState: boolean;
}