

export interface FilesState {

}

export enum FileActionsEnum {
    ADD_FILE= "ADD_FILE"
}

export interface AddFileAction {
    type: FileActionsEnum.ADD_FILE
}

export type FileAction =
    AddFileAction