import {IRecipe} from "../models/IRecipeModel/IRecipe.ts";
import {IRecipesResponseModelType} from "../models/IRecipeModel/IRecipesResponseModelType.ts";
import {axiosInstance} from "./api.service.ts";

export const loadAuthRecipes = async (skip: number, limit: number): Promise<IRecipe[]> => {
    const { data } = await axiosInstance.get<IRecipesResponseModelType>(`/recipes?skip=${skip}&limit=${limit}`);
    return data.recipes;
}

export const getRecipesByUserId = async (userId: number): Promise<IRecipe[]> => {
    const { data } = await axiosInstance.get<IRecipesResponseModelType>(`/recipes?userId=${userId}`);
    return data.recipes;
}

export const searchRecipes = async (query: string): Promise<IRecipe[]> => {
    const { data } = await axiosInstance.get<IRecipesResponseModelType>(`/recipes/search?q=${query}`);
    return data.recipes;
}

export const searchRecipesByTag = async (tag: string): Promise<IRecipe[]> => {
    const { data } = await axiosInstance.get<IRecipesResponseModelType>(`/recipes/search?q=${encodeURIComponent(tag)}`);
    return data.recipes.filter(recipe => recipe.tags.includes(tag));
}
