import { createAsyncThunk, createSlice, isFulfilled, isRejected, PayloadAction } from "@reduxjs/toolkit";
import { IRecipe } from "../../models/IRecipe.ts";
import { loadAuthRecipes, getRecipesByUserId, searchRecipes, searchRecipesByTag } from "../../services/api.service.ts";

type RecipeSliceType = {
    recipes: IRecipe[];
    recipe: IRecipe | null;
    loadState: boolean;
}

const initialState: RecipeSliceType = { recipes: [], recipe: null, loadState: false };

const loadRecipes = createAsyncThunk(
    'recipeSlice/loadRecipes',
    async ({ skip, limit }: { skip: number; limit: number }, thunkAPI) => {
        try {
            const recipes = await loadAuthRecipes(skip, limit);
            return thunkAPI.fulfillWithValue(recipes);
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('some error');
        }
    }
);


const loadRecipesByUserId = createAsyncThunk(
    'recipeSlice/loadRecipesByUserId',
    async ({ userId }: { userId: number }, thunkAPI) => {
        try {
            const recipes = await getRecipesByUserId(userId);
            return recipes;
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('error loading recipes for user');
        }
    }
);

const searchRecipesThunk = createAsyncThunk(
    'recipeSlice/searchRecipes',
    async (query: string, thunkAPI) => {
        try {
            const recipes = await searchRecipes(query);
            return recipes;
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('error searching recipes');
        }
    }
);

const searchRecipesByTagThunk = createAsyncThunk(
    'recipeSlice/searchRecipesByTag',
    async (tag: string, thunkAPI) => {
        try {
            const recipes = await searchRecipesByTag(tag);
            return recipes;
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('error searching recipes by tag');
        }
    }
)

export const recipeSlice = createSlice({
    name: "recipeSlice",
    initialState: initialState,
    reducers: {
        changeLoadState: (state, action: PayloadAction<boolean>) => {
            state.loadState = action.payload;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(loadRecipes.fulfilled, (state, action: PayloadAction<IRecipe[]>) => {
                state.recipes = action.payload;
            })
            .addCase(loadRecipesByUserId.fulfilled, (state, action: PayloadAction<IRecipe[]>) => {
                state.recipes = action.payload;
            })
            .addCase(searchRecipesThunk.fulfilled, (state, action: PayloadAction<IRecipe[]>) => {
                state.recipes = action.payload;
            })
            .addCase(searchRecipesByTagThunk.fulfilled, (state, action: PayloadAction<IRecipe[]>) => {
                state.recipes = action.payload;
            })
            .addMatcher(isFulfilled(loadRecipes), (state) => {
                state.loadState = true;
            })
            .addMatcher(isRejected(loadRecipes), (state) => {
                console.log(state);
            })
});

export const recipeSliceActions = {
    ...recipeSlice.actions,
    loadRecipes,
    loadRecipesByUserId,
    searchRecipes: searchRecipesThunk,
    searchRecipesByTag: searchRecipesByTagThunk
};
