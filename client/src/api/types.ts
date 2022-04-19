import { IUser } from "../store/reducers/userReducer/types";

export interface IResponse {
    message: String
}

export interface IUserResponse {
    token: string,
    user: IUser
}

