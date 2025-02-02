import {IUserWithTokens} from "../../../models/IUserModel/IUserWithTokens.ts";

export type AuthSliceType = {
    user: IUserWithTokens | null;
    isAuthenticated: boolean;
};