import {FileAction, FilesState} from "./types";


const initialState: FilesState = {

}

export default function fileReducer(state: FilesState=initialState, action: FileAction): FilesState {
    switch (action.type) {
        default:
            return state
    }
}