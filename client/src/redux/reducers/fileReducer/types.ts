import {IUser} from "../userReducer/types";

export interface IFile{
    _id: string,
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

export enum FileViesEnum {
    LIST = 'LIST',
    PLATE = 'PLATE'
}



export interface FilesState {
    files: IFile[],
    currentDir: string | null,
    popupDisplay: PopupDisplayEnum,
    dirStack: string[],
    view: FileViesEnum
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
    PUSH_TO_STACK = 'PUSH_TO_STACK',
    DELETE_FILE = 'DELETE_FILE',
    SET_VIEW = 'SET_VIEW'
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

export interface PushToStackAction {
    type: FileActionsEnum.PUSH_TO_STACK,
    payload: string
}

export interface DeleteFileAction {
    type: FileActionsEnum.DELETE_FILE,
    payload: IFile,
}

export interface SetViesAction {
    type: FileActionsEnum.SET_VIEW,
    payload: FileViesEnum,
}


export type FileAction =
    SetFilesAction |
    SetCurrentDirAction |
    AddFileAction |
    SetPopupDisplayAction |
    PushToStackAction |
    DeleteFileAction |
    SetViesAction