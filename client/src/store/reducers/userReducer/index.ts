import {IUser, UserAction, UsersState} from "./types";
import {FileAction} from "../fileReducer/types";


const initialState: UsersState = {
    currentUser: {},
    isAuth: false
}

export default function userReducer(state: UsersState=initialState, action: UserAction): UsersState {
    switch (action.type) {
        default:
            return state
    }
}

