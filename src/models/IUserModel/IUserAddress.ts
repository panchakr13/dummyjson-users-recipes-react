import {Coordinates} from "./IUserCoordinates.ts";

export interface Address {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: Coordinates;
    country: string;
}