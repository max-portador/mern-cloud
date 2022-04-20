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
        case FileActionsEnum.POP_FROM_STACK:
            const newDirStack = Array.from(state.dirStack).slice(0, state.dirStack.length - 1)
            return {...state, dirStack: newDirStack}
        default:
            return state
    }
}