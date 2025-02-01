import axios from "axios";
import { IUserWithTokens } from "../models/IUserWithTokens.ts";
import { ITokenPair } from "../models/ITokenPair.ts";
import { retriveLocalStorage } from "./helpers.ts";
import { IUser } from "../models/IUser.ts";
import { IUsersResponseModelType } from "../models/IUsersResponseModelType.ts";
import { IRecipe } from "../models/IRecipe.ts";
import { IRecipesResponseModelType } from "../models/IRecipesResponseModelType.ts";

const axiosInstance = axios.create({
    baseURL: 'https://dummyjson.com/auth',
    headers: {}
});

axiosInstance.interceptors.request.use((requestObject) => {
    if (requestObject.method?.toUpperCase() === "GET") {
        requestObject.headers.Authorization =
            'Bearer ' + retriveLocalStorage<IUserWithTokens>('user').accessToken;
    }
    return requestObject;
});

type loginData = {
    username: string;
    password: string;
    expiresInMins: number;
}

export const login = async ({ username, password, expiresInMins }: loginData): Promise<IUserWithTokens> => {
    const { data: userWithTokens } = await axiosInstance.post<IUserWithTokens>('/login', {
        username,
        password,
        expiresInMins
    });
    console.log(userWithTokens);
    localStorage.setItem('user', JSON.stringify(userWithTokens));
    return userWithTokens;
}

export const loadAuthUsers = async (skip: number, limit: number): Promise<IUser[]> => {
    const { data } = await axiosInstance.get<IUsersResponseModelType>(`/users?skip=${skip}&limit=${limit}`);
    return data.users;
}

export const loadAuthRecipes = async (skip: number, limit: number): Promise<IRecipe[]> => {
    const { data } = await axiosInstance.get<IRecipesResponseModelType>(`/recipes?skip=${skip}&limit=${limit}`);
    return data.recipes;
}

export const getUserById = async (id: number): Promise<IUser> => {
    const { data } = await axiosInstance.get<IUser>(`/users/${id}`);
    return data;
}


export const getRecipesByUserId = async (userId: number): Promise<IRecipe[]> => {
    const { data } = await axiosInstance.get<IRecipesResponseModelType>(`/recipes?userId=${userId}`);
    return data.recipes;
}

export const searchUsers = async (query: string): Promise<IUser[]> => {
    const { data } = await axiosInstance.get<IUsersResponseModelType>(`/users/search?q=${query}`);
    return data.users;
}

export const searchRecipes = async (query: string): Promise<IRecipe[]> => {
    const { data } = await axiosInstance.get<IRecipesResponseModelType>(`/recipes/search?q=${query}`);
    return data.recipes;
}

export const searchRecipesByTag = async (tag: string): Promise<IRecipe[]> => {
    const { data } = await axiosInstance.get<IRecipesResponseModelType>(`/recipes/search?q=${encodeURIComponent(tag)}`);
    return data.recipes.filter(recipe => recipe.tags.includes(tag));
}


export const refresh = async (): Promise<void> => {
    const iUserWithTokens = retriveLocalStorage<IUserWithTokens>('user');
    const { data: { accessToken, refreshToken } } = await axiosInstance.post<ITokenPair>('/refresh', {
        refreshToken: iUserWithTokens.refreshToken,
        expiresInMins: 60
    });
    iUserWithTokens.accessToken = accessToken;
    iUserWithTokens.refreshToken = refreshToken;
    localStorage.setItem('user', JSON.stringify(iUserWithTokens));
}

