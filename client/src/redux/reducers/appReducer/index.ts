import {AppReducerActionEnum, AppReducerActions, AppReducerState} from "./types";

const initialState: AppReducerState = {
    isLoading: false,
}

export default function appReducer(state = initialState, action: AppReducerActions): AppReducerState {
    switch (action.type){
        case AppReducerActionEnum.SHOW_LOADER:
            return {...state, isLoading: true};
        case AppReducerActionEnum.HIDE_LOADER:
            return {...state, isLoading: false};
        default:
            return state
    }
}