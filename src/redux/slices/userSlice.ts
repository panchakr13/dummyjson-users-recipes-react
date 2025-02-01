import { IUser } from "../../models/IUser.ts";
import { createAsyncThunk, createSlice, isFulfilled, isRejected, PayloadAction } from "@reduxjs/toolkit";
import { loadAuthUsers, getUserById, searchUsers } from "../../services/api.service.ts";

type UserSliceType = {
    users: IUser[];
    user: IUser | null,
    loadState: boolean;
}

const initialState: UserSliceType = { users: [], user: null, loadState: false };

const loadUsers = createAsyncThunk(
    'userSlice/loadUsers',
    async ({ skip, limit }: { skip: number; limit: number }, thunkAPI) => {
        try {
            const users = await loadAuthUsers(skip, limit);
            return thunkAPI.fulfillWithValue(users);
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('some error');
        }
    }
);

const loadUser = createAsyncThunk(
    'userSlice/loadUser',
    async ({ id }: { id: number }, thunkAPI) => {
        try {
            const user = await getUserById(id);
            return user;
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('error loading user');
        }
    }
);

const searchUsersThunk = createAsyncThunk(
    'userSlice/searchUsers',
    async (query: string, thunkAPI) => {
        try {
            const users = await searchUsers(query);
            return users;
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('error searching users');
        }
    }
);

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
                state.users = action.payload;
            })
            .addCase(loadUser.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.user = action.payload;
                if (!state.users.find(u => u.id === action.payload.id)) {
                    state.users.push(action.payload);
                }
            })
            .addCase(searchUsersThunk.fulfilled, (state, action: PayloadAction<IUser[]>) => {
                state.users = action.payload;
            })
            .addMatcher(isFulfilled(loadUsers), (state) => {
                state.loadState = true;
            })
            .addMatcher(isRejected(loadUsers), (state) => {
                console.log(state);
            })
});

export const userSliceActions = {
    ...userSlice.actions,
    loadUsers,
    loadUser,
    searchUsers: searchUsersThunk
};

