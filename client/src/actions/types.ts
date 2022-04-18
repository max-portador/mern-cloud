import {FileAction} from "../store/reducers/fileReducer/types";
import {IUser, UserAction} from "../store/reducers/userReducer/types";

export interface IResponse {
    message: String
}

export interface IUserResponse {
    token: string,
    user: IUser
}

export type ActionsTypes = FileAction | UserAction