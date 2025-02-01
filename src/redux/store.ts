import {configureStore} from "@reduxjs/toolkit";
import {userSlice} from "./slices/userSlice.ts";
import {recipeSlice} from "./slices/recipeSlice.ts";
import authSlice from "./slices/authSlice.ts";

export const store = configureStore({
    reducer: {
        userSlice: userSlice.reducer,
        recipeSlice: recipeSlice.reducer,
        authSlice: authSlice.reducer
    }
})