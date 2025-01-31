import {createAsyncThunk, createSlice, isFulfilled, isRejected, PayloadAction} from "@reduxjs/toolkit";
import {IRecipe} from "../../models/IRecipe.ts";
import {loadAuthRecipes} from "../../services/api.service.ts";

type RecipeSliceType = {
    recipes: IRecipe[];
    recipe: IRecipe | null,
    loadState: boolean;
}


const initialState: RecipeSliceType = {recipes: [], recipe: null, loadState: false};


const loadRecipes = createAsyncThunk(
    'recipeSlice/loadRecipes',
    async (_, thunkAPI) => {

        try {
            const recipes = await loadAuthRecipes()
            // thunkAPI.dispatch(userSliceActions.changeLoadState(true));

            return thunkAPI.fulfillWithValue(recipes);
            // throw new Error();
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('some error');
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
                state.recipes = action.payload
            })
            .addCase(loadRecipes.rejected, (state, action) => {
                console.log(state);
                console.log(action);
            })
            .addMatcher(isFulfilled(loadRecipes), (state) => {
                state.loadState = true;
            })
            .addMatcher(isRejected(loadRecipes), (state) => {
                console.log(state);
            })


});

export const recipeSliceActions = {
    ...recipeSlice.actions, loadRecipes
}