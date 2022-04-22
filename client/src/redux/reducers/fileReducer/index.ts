import {FileAction, FileActionsEnum, FilesState, PopupDisplayEnum} from "./types";


const initialState: FilesState = {
    files: [],
    currentDir: null,
    popupDisplay: PopupDisplayEnum.HIDE,
    dirStack: [],
}

export default function fileReducer(state: FilesState=initialState, action: FileAction): FilesState {
    switch (action.type) {
        case FileActionsEnum.SET_FILES:
            return {...state, files: action.payload}

        case FileActionsEnum.SET_CURRENT_DIR:
            return {...state, currentDir: action.payload}

        case FileActionsEnum.ADD_FILE:
            return {...state, files: [ ...state.files, action.payload]}

        case FileActionsEnum.SET_POPUP_DISPLAY:
            return {...state, popupDisplay: action.payload}

        case FileActionsEnum.PUSH_TO_STACK:
            return {...state, dirStack: [...state.dirStack, action.payload]}

        case FileActionsEnum.DELETE_FILE:
            return {...state, files: state.files.filter(file => file._id !== action.payload._id)}

        default:
            return state
    }
}