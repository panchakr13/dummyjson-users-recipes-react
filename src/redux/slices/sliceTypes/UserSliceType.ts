import {IUser} from "../../../models/IUserModel/IUser.ts";

export type UserSliceType = {
    users: IUser[];
    user: IUser | null,
    loadState: boolean;
}