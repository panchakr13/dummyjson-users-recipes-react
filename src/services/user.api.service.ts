import {IUser} from "../models/IUserModel/IUser.ts";
import {IUsersResponseModelType} from "../models/IUserModel/IUsersResponseModelType.ts";
import {axiosInstance} from "./api.service.ts";



export const loadAuthUsers = async (skip: number, limit: number): Promise<IUser[]> => {
    const { data } = await axiosInstance.get<IUsersResponseModelType>(`/users?skip=${skip}&limit=${limit}`);
    return data.users;
}


export const getUserById = async (id: number): Promise<IUser> => {
    const { data } = await axiosInstance.get<IUser>(`/users/${id}`);
    return data;
}

export const searchUsers = async (query: string): Promise<IUser[]> => {
    const { data } = await axiosInstance.get<IUsersResponseModelType>(`/users/search?q=${query}`);
    return data.users;
}
