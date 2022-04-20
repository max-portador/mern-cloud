import {IUser} from "../userReducer/types";

export interface IFile{
    _id: number,
    name: string,
    type: string,
    accessLink?: string,
    size: number
    path: string,
    user: IUser,
    parent: IFile,
    children: IFile[],
    date: string
}


export interface FilesState {
    files: IFile[],
    currentDir: string | null,
    popupDisplay: PopupDisplayEnum
}

export enum PopupDisplayEnum {
    HIDE = 'none',
    SHOW = 'flex'
}

export enum FileActionsEnum {
    SET_FILES = "SET_FILES",
    SET_CURRENT_DIR = "SET_CURRENT_DIR",
    ADD_FILE = 'ADD_FILE',
    SET_POPUP_DISPLAY = 'SET_POPUP_DISPLAY',
}

export interface SetFilesAction {
    type: FileActionsEnum.SET_FILES,
    payload: IFile[]
}

export interface SetCurrentDirAction {
    type: FileActionsEnum.SET_CURRENT_DIR,
    payload: string
}

export interface AddFileAction {
    type: FileActionsEnum.ADD_FILE,
    payload: IFile
}

export interface SetPopupDisplayAction {
    type: FileActionsEnum.SET_POPUP_DISPLAY,
    payload: PopupDisplayEnum
}

export type FileAction =
    SetFilesAction |
    SetCurrentDirAction |
    AddFileAction |
    SetPopupDisplayAction