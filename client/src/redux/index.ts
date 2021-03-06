import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk, {ThunkDispatch} from "redux-thunk";
import { composeWithDevTools } from '@redux-devtools/extension';
import userReducer from "./reducers/userReducer";
import fileReducer from "./reducers/fileReducer";
import {Dispatch} from "react";
import {FileAction} from "./reducers/fileReducer/types";
import {UserAction} from "./reducers/userReducer/types";
import uploaderReducer from "./reducers/uploadReducer";
import {UploaderActions} from "./reducers/uploadReducer/types";
import {AppReducerActions} from "./reducers/appReducer/types";
import appReducer from "./reducers/appReducer";

const rootReducer = combineReducers( {
    user: userReducer,
    files: fileReducer,
    uploader: uploaderReducer,
    app: appReducer
})

export type ActionsTypes =
    FileAction |
    UserAction |
    UploaderActions |
    AppReducerActions

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = Dispatch<ActionsTypes> & ThunkDispatch<RootState, void, ActionsTypes>