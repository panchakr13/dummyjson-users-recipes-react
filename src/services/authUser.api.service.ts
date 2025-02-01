import {axiosInstance, loginData} from "./api.service.ts";
import {IUserWithTokens} from "../models/IUserModel/IUserWithTokens.ts";
import {retriveLocalStorage} from "./helpers.ts";
import {ITokenPair} from "../models/ITokenPairModel/ITokenPair.ts";


axiosInstance.interceptors.request.use((requestObject) => {
    if (requestObject.method?.toUpperCase() === "GET") {
        requestObject.headers.Authorization =
            'Bearer ' + retriveLocalStorage<IUserWithTokens>('user').accessToken;
    }
    return requestObject;
});

export const login = async ({ username, password, expiresInMins }: loginData): Promise<IUserWithTokens> => {
    const { data: userWithTokens } = await axiosInstance.post<IUserWithTokens>('/login', {
        username,
        password,
        expiresInMins
    });
    localStorage.setItem('user', JSON.stringify(userWithTokens));
    return userWithTokens;
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