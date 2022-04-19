export interface IUser {
    email: string,
    password: string,
    diskSpace: number,
    usedSpace: number,
    avatar?: string
    files?: File,
}

export interface UsersState {
    currentUser: IUser | {},
    isAuth: boolean
}


export enum UserActionsEnum {
    LOGOUT = "LOGOUT",
    SET_USER = "SET_USER",
}

export interface LogoutAction {
    type: UserActionsEnum.LOGOUT
}

export interface SetUserAction {
    type: UserActionsEnum.SET_USER,
    payload: IUser,
}


export type UserAction =
    LogoutAction | SetUserAction