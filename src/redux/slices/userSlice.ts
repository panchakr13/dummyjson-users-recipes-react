import {IUser} from "../../models/IUser.ts";
import {createAsyncThunk, createSlice, isFulfilled, isRejected, PayloadAction} from "@reduxjs/toolkit";
import {loadAuthUsers} from "../../services/api.service.ts";

type UserSliceType = {
    users: IUser[];
    user: IUser | null,
    loadState: boolean;
}


const initialState: UserSliceType = {users: [], user: null, loadState: false};


const loadUsers = createAsyncThunk(
    'userSlice/loadUsers',
    async ({skip, limit}: {skip: number; limit: number}, thunkAPI) => {

        try {
            const users = await loadAuthUsers(skip, limit)

            return thunkAPI.fulfillWithValue(users);
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('some error');
        }
    }
)



export const userSlice = createSlice({
    name: "userSlice",
    initialState: initialState,
    reducers: {
        changeLoadState: (state, action: PayloadAction<boolean>) => {
            state.loadState = action.payload;

        }
    },
    extraReducers: builder =>
        builder
            .addCase(loadUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
                state.users = action.payload
            })
            .addCase(loadUsers.rejected, (state, action) => {
                console.log(state);
                console.log(action);
            })
            .addMatcher(isFulfilled(loadUsers), (state) => {
                state.loadState = true;
            })
            .addMatcher(isRejected( loadUsers), (state) => {
                console.log(state);
            })


});

export const userSliceActions = {
    ...userSlice.actions,
    loadUsers
}