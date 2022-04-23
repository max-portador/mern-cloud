import {AppReducerActionEnum, HideLoaderAction, ShowLoaderAction} from "./types";

export const showLoader = (): ShowLoaderAction => ({
    type: AppReducerActionEnum.SHOW_LOADER
})

export const hideLoader = (): HideLoaderAction => ({
    type: AppReducerActionEnum.HIDE_LOADER
})