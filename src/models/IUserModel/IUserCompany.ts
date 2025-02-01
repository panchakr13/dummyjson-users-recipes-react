import {Address} from "./IUserAddress.ts";

export interface Company {
    department: string;
    name: string;
    title: string;
    address: Address;
}