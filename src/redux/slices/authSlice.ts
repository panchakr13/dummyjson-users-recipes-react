import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserWithTokens } from '../../models/IUserModel/IUserWithTokens.ts';

type AuthSliceType = {
    user: IUserWithTokens | null;
    isAuthenticated: boolean;
};

const initialState: AuthSliceType = {
    user: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setAuthenticatedUser: (state, action: PayloadAction<IUserWithTokens>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

export const authSliceActions = authSlice.actions;

export default authSlice;
