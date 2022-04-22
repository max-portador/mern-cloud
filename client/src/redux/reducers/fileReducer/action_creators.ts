import {
    AddFileAction, DeleteFileAction,
    FileActionsEnum,
    IFile, PopupDisplayEnum, PushToStackAction,
    SetCurrentDirAction,
    SetFilesAction,
    SetPopupDisplayAction
} from "./types";

export const setFiles = (files: IFile[]): SetFilesAction => ({
    type: FileActionsEnum.SET_FILES,
    payload: files,
})

export const setCurrentDir = (dir: string): SetCurrentDirAction => ({
    type: FileActionsEnum.SET_CURRENT_DIR,
    payload: dir,
})

export const addFile = (file: IFile): AddFileAction => ({
    type: FileActionsEnum.ADD_FILE,
    payload: file,
})

export const setPopupDisplay = (display: PopupDisplayEnum): SetPopupDisplayAction => ({
    type: FileActionsEnum.SET_POPUP_DISPLAY,
    payload: display,
})

export const pushToStack = (dir: string): PushToStackAction => ({
    type: FileActionsEnum.PUSH_TO_STACK,
    payload: dir,
})

export const deleteFile = (file: IFile): DeleteFileAction => ({
    type: FileActionsEnum.DELETE_FILE,
    payload: file,
})