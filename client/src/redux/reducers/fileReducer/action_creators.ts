import {FileActionsEnum, IFile, SetCurrentDirAction, SetFilesAction} from "./types";

export const setFilesAction = (files: IFile[]): SetFilesAction => ({
    type: FileActionsEnum.SET_FILES,
    payload: files,
})

export const setCurrentDirAction = (dir: string): SetCurrentDirAction => ({
    type: FileActionsEnum.SET_CURRENT_DIR,
    payload: dir,
})