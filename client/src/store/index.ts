import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import thunk, {ThunkDispatch} from "redux-thunk";
import { composeWithDevTools } from '@redux-devtools/extension';
import userReducer from "./reducers/userReducer";
import fileReducer from "./reducers/fileReducer";
import {Dispatch} from "react";
import {FileAction} from "./reducers/fileReducer/types";
import {UserAction} from "./reducers/userReducer/types";

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
// const composeEnhancers = composeWithDevTools({
//     // Specify here name, actionsDenylist, actionsCreators and other options
// });

const rootReducer = combineReducers( {
    user: userReducer,
    files: fileReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export type ActionsTypes = FileAction | UserAction

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = Dispatch<ActionsTypes> & ThunkDispatch<RootState, void, ActionsTypes>