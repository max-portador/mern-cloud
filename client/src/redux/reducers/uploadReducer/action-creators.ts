import {
    AddUploaderFileAction, ChangeUploaderFileAction,
    HideUploaderAction, IUploadFile,
    RemoveUploaderFileAction,
    ShowUploaderAction,
    UploaderActionsEnum
} from "./types";

export const showUploader = (): ShowUploaderAction => ({
    type: UploaderActionsEnum.SHOW_UPLOADER
})

export const hideUploader = (): HideUploaderAction => ({
    type: UploaderActionsEnum.HIDE_UPLOADER
})

export const addUploaderFile = (file: IUploadFile): AddUploaderFileAction => ({
    type: UploaderActionsEnum.ADD_UPLOAD_FILE,
    payload: file
})

export const removeUploaderFile = (id: string): RemoveUploaderFileAction => ({
    type: UploaderActionsEnum.REMOVE_UPLOAD_FILE,
    payload: id
})


export const changeUploaderFile = (file: IUploadFile): ChangeUploaderFileAction => ({
    type: UploaderActionsEnum.CHANGE_UPLOAD_FILE,
    payload: file
})

