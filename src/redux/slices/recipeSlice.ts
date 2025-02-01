// import { createAsyncThunk, createSlice, isFulfilled, isRejected, PayloadAction } from "@reduxjs/toolkit";
// import { IRecipe } from "../../models/IRecipe.ts";
// import { loadAuthRecipes, getRecipesByUserId, searchRecipes } from "../../services/api.service.ts";
//
// type RecipeSliceType = {
//     recipes: IRecipe[];
//     recipe: IRecipe | null,
//     loadState: boolean;
// }
//
// const initialState: RecipeSliceType = { recipes: [], recipe: null, loadState: false };
//
// const loadRecipes = createAsyncThunk(
//     'recipeSlice/loadRecipes',
//     async ({ skip, limit }: { skip: number; limit: number }, thunkAPI) => {
//         try {
//             const recipes = await loadAuthRecipes(skip, limit);
//             return thunkAPI.fulfillWithValue(recipes);
//         } catch (e) {
//             console.log(e);
//             return thunkAPI.rejectWithValue('some error');
//         }
//     }
// );
//
// // Приклад існуючого thunk для завантаження рецептів за userId
// const loadRecipesByUserId = createAsyncThunk(
//     'recipeSlice/loadRecipesByUserId',
//     async ({ userId }: { userId: number }, thunkAPI) => {
//         try {
//             const recipes = await getRecipesByUserId(userId);
//             // Якщо бажаєте – можна просто замінити список, або об’єднати з існуючими
//             return recipes;
//         } catch (e) {
//             console.log(e);
//             return thunkAPI.rejectWithValue('error loading recipes for user');
//         }
//     }
// );
//
// // Новий thunk для пошуку рецептів
// const searchRecipesThunk = createAsyncThunk(
//     'recipeSlice/searchRecipes',
//     async (query: string, thunkAPI) => {
//         try {
//             const recipes = await searchRecipes(query);
//             return recipes;
//         } catch (e) {
//             console.log(e);
//             return thunkAPI.rejectWithValue('error searching recipes');
//         }
//     }
// );
//
//
//
// export const recipeSlice = createSlice({
//     name: "recipeSlice",
//     initialState: initialState,
//     reducers: {
//         changeLoadState: (state, action: PayloadAction<boolean>) => {
//             state.loadState = action.payload;
//         }
//     },
//     extraReducers: builder =>
//         builder
//             .addCase(loadRecipes.fulfilled, (state, action: PayloadAction<IRecipe[]>) => {
//                 state.recipes = action.payload;
//             })
//             .addCase(loadRecipesByUserId.fulfilled, (state, action: PayloadAction<IRecipe[]>) => {
//                 // Для пошуку або завантаження рецептів за користувачем замінюємо список:
//                 state.recipes = action.payload;
//             })
//             .addCase(searchRecipesThunk.fulfilled, (state, action: PayloadAction<IRecipe[]>) => {
//                 // Замінюємо список рецептів на результати пошуку
//                 state.recipes = action.payload;
//             })
//             .addMatcher(isFulfilled(loadRecipes), (state) => {
//                 state.loadState = true;
//             })
//             .addMatcher(isRejected(loadRecipes), (state) => {
//                 console.log(state);
//             })
// });
//
// export const recipeSliceActions = {
//     ...recipeSlice.actions,
//     loadRecipes,
//     loadRecipesByUserId,
//     searchRecipes: searchRecipesThunk // експортуємо thunk пошуку
// };

// recipeSlice.ts
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

// Існуючий thunk для завантаження рецептів за userId
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

// Існуючий thunk для пошуку рецептів (за запитом)
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

// Новий thunk для пошуку рецептів за тегом
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
                // Замінюємо список рецептів для конкретного користувача:
                state.recipes = action.payload;
            })
            .addCase(searchRecipesThunk.fulfilled, (state, action: PayloadAction<IRecipe[]>) => {
                // Замінюємо список рецептів на результати пошуку за запитом:
                state.recipes = action.payload;
            })
            .addCase(searchRecipesByTagThunk.fulfilled, (state, action: PayloadAction<IRecipe[]>) => {
                // Замінюємо список рецептів на результати пошуку за тегом:
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
    searchRecipesByTag: searchRecipesByTagThunk  // експортуємо новий thunk
};
