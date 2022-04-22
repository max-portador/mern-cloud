import {UploaderActions, UploaderActionsEnum, UploaderState} from "./types";

const initialState: UploaderState = {
    isVisible: false,
    files: []
}

export  default  function uploaderReducer(state = initialState, action: UploaderActions): UploaderState {
    switch (action.type){
        case UploaderActionsEnum.SHOW_UPLOADER:
            return {...state, isVisible: true}

        case UploaderActionsEnum.HIDE_UPLOADER:
            return {...state, isVisible: false}

        case UploaderActionsEnum.ADD_UPLOAD_FILE:
            return {
                ...state,
                files: [...state.files, action.payload ]
            }

        case UploaderActionsEnum.REMOVE_UPLOAD_FILE:
            return {
                ...state,
                files: state.files.filter(file => file._id !== action.payload)
            }

        case UploaderActionsEnum.CHANGE_UPLOAD_FILE:
            return {
                ...state,
                files: state.files.map( file => file._id === action.payload._id
                    ? {...file, progress: action.payload.progress}
                    : file
                )
            }
        default:
            return state;
    }
}