import {IUser, UserAction, UserActionsEnum, UsersState} from "./types";


const initialState: UsersState = {
    currentUser: {} as IUser,
    isAuth: false
}

export default function userReducer(state: UsersState=initialState, action: UserAction): UsersState {
    switch (action.type) {
        case UserActionsEnum.SET_USER:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true,
            }
        case UserActionsEnum.LOGOUT:
            return {
                ...state,
                currentUser: {} as IUser,
                isAuth: false,
            }
        default:
            return state
    }
}

