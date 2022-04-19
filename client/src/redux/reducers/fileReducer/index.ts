import {FileAction, FileActionsEnum, FilesState} from "./types";


const initialState: FilesState = {
    files: [],
    currentDir: ''
}

export default function fileReducer(state: FilesState=initialState, action: FileAction): FilesState {
    switch (action.type) {
        case FileActionsEnum.SET_FILES:
            return {...state, files: action.payload}
        case FileActionsEnum.SET_CURRENT_DIR:
            return {...state, currentDir: action.payload}
        default:
            return state
    }
}