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
    currentDir: string,
}

export enum FileActionsEnum {
    SET_FILES = "SET_FILES",
    SET_CURRENT_DIR = "SET_CURRENT_DIR",
}

export interface SetFilesAction {
    type: FileActionsEnum.SET_FILES,
    payload: IFile[]
}

export interface SetCurrentDirAction {
    type: FileActionsEnum.SET_CURRENT_DIR,
    payload: string
}

export type FileAction =
    SetFilesAction | SetCurrentDirAction