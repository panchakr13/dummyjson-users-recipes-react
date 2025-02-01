import {IUser} from "./IUser.ts";

export interface IUsersResponseModelType{
    users: IUser[];
    total: number;
    skip: number;
    limit: number;
}