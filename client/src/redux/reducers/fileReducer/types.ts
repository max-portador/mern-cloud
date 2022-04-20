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


export interface FilesState {
    files: IFile[],
    currentDir: string | null,
    popupDisplay: PopupDisplayEnum,
    dirStack: string[]
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
    POP_FROM_STACK = 'POP_FROM_STACK'
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
export interface PopFromStackAction {
    type: FileActionsEnum.POP_FROM_STACK,
}


export type FileAction =
    SetFilesAction |
    SetCurrentDirAction |
    AddFileAction |
    SetPopupDisplayAction |
    PushToStackAction |
    PopFromStackAction