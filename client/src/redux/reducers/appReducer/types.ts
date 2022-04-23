export interface AppReducerState{
    isLoading: boolean
}

export enum AppReducerActionEnum {
    SHOW_LOADER = 'SHOW_LOADER',
    HIDE_LOADER = 'HIDE_LOADER'
}

export interface ShowLoaderAction {
    type: AppReducerActionEnum.SHOW_LOADER
}

export interface HideLoaderAction {
    type: AppReducerActionEnum.HIDE_LOADER
}

export type AppReducerActions =
    ShowLoaderAction |
    HideLoaderAction