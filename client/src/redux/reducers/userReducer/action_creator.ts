import {IUser, LogoutAction, SetUserAction, UserActionsEnum} from "./types";


export const setUser = (user: IUser): SetUserAction => ({
    type: UserActionsEnum.SET_USER,
    payload: user
})

export const logout = (): LogoutAction => ({
    type: UserActionsEnum.LOGOUT,
})