export interface IUploadFile {
    _id?: string,
    name: string,
    progress: number
}

export interface UploaderState {
    isVisible: boolean,
    files: IUploadFile[]
}

export enum UploaderActionsEnum {
    SHOW_UPLOADER = 'SHOW_UPLOADER',
    HIDE_UPLOADER = 'HIDE_UPLOADER',
    ADD_UPLOAD_FILE = 'ADD_UPLOAD_FILE',
    REMOVE_UPLOAD_FILE = 'REMOVE_UPLOAD_FILE',
    CHANGE_UPLOAD_FILE = 'CHANGE_UPLOAD_FILE',
}

export interface ShowUploaderAction {
    type: UploaderActionsEnum.SHOW_UPLOADER
}

export interface HideUploaderAction {
    type: UploaderActionsEnum.HIDE_UPLOADER
}

export interface AddUploaderFileAction {
    type: UploaderActionsEnum.ADD_UPLOAD_FILE
    payload: IUploadFile
}

export interface AddUploaderFileAction {
    type: UploaderActionsEnum.ADD_UPLOAD_FILE
    payload: IUploadFile
}

export interface RemoveUploaderFileAction {
    type: UploaderActionsEnum.REMOVE_UPLOAD_FILE
    payload: string
}

export interface ChangeUploaderFileAction {
    type: UploaderActionsEnum.CHANGE_UPLOAD_FILE
    payload: IUploadFile
}

export type UploaderActions =
    ShowUploaderAction |
    HideUploaderAction |
    AddUploaderFileAction |
    RemoveUploaderFileAction |
    ChangeUploaderFileAction