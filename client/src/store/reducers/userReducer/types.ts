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
    SET_IS_AUTH= "SET_IS_AUTH"
}

export interface SetIsAuthAction {
    type: UserActionsEnum.SET_IS_AUTH
}

export type UserAction =
    SetIsAuthAction