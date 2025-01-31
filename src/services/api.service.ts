import axios from "axios";
import {IUserWithTokens} from "../models/IUserWithTokens.ts";
import {ITokenPair} from "../models/ITokenPair.ts";
import {retriveLocalStorage} from "./helpers.ts";
import {IUser} from "../models/IUser.ts";
import {IUsersResponseModelType} from "../models/IUsersResponseModelType.ts";
import {IRecipe} from "../models/IRecipe.ts";
import {IRecipesResponseModelType} from "../models/IRecipesResponseModelType.ts";

const axiosInstance = axios.create({
    baseURL: 'https://dummyjson.com/auth',
    headers: {}
});


axiosInstance.interceptors.request.use((requestObject) => {//перехоплюємо get - запити
    if (requestObject.method?.toUpperCase() === "GET") {
        requestObject.headers.Authorization = 'Bearer ' + retriveLocalStorage<IUserWithTokens>('user').accessToken;
    }
    return requestObject;
})

type loginData = {
    username: string;
    password: string;
    expiresInMins: number;
}

export const login = async ({username, password, expiresInMins}: loginData): Promise<IUserWithTokens> => {
    const {data: userWithTokens} = await axiosInstance.post<IUserWithTokens>('/login', {
        username,
        password,
        expiresInMins
    });
    console.log(userWithTokens);
    localStorage.setItem('user', JSON.stringify(userWithTokens));//відправляємо дані в сховище на зберігання
    return userWithTokens;
}
// на цей запит повернеться відповідь що буде містити юзерів з токенами
export const loadAuthUsers = async (skip:number, limit: number): Promise<IUser[]> => {
    const {data} = await axiosInstance.get<IUsersResponseModelType>(`/users?skip=${skip}&limit=${limit}`);
    return data.users;
}

export const loadAuthRecipes = async (skip: number, limit: number): Promise<IRecipe[]> => {
    const {data} = await axiosInstance.get<IRecipesResponseModelType>(`/recipes?skip=${skip}&limit=${limit}`);
    return data.recipes;
}

export const refresh = async (): Promise<void> => {
// достаємо зі сховища рефреш-токен
    const iUserWithTokens = retriveLocalStorage<IUserWithTokens>('user');//дістали юзера зі сховища
    const {data: {accessToken, refreshToken}} = await axiosInstance.post<ITokenPair>('/refresh', {refreshToken:iUserWithTokens.refreshToken,
            expiresInMins: 60// оновили для юзера токени
        })
    ;
    console.log(accessToken);
    console.log(refreshToken);
    iUserWithTokens.accessToken = accessToken;//замінили токени
    iUserWithTokens.refreshToken = refreshToken;
    localStorage.setItem('user', JSON.stringify(iUserWithTokens));// повернули назад у сховище(localStorage)
}

