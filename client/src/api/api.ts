import axios from "axios";
import { IResponse, IUserResponse} from "./types";
import { ActionsTypes, RootState } from "../redux";
import { ThunkAction } from "redux-thunk";
import { setUser } from "../redux/reducers/userReducer/action_creator";
import {setFilesAction} from "../redux/reducers/fileReducer/action_creators";
import {IFile} from "../redux/reducers/fileReducer/types";

const instance = axios.create({
    baseURL: 'http://localhost:5555/api/',
})

export const userAPI = {
    registration: async (email: string, password: string): Promise<void> => {
            try {
                const response = await instance.post<IResponse>('auth/registration', {
                    email,
                    password
                })
                alert(response.data.message)
            } catch (e: any) {
                alert(e.response.data.message)
            }
        },

    login: (email: string, password: string): ThunkAction<Promise<void>, RootState, unknown, ActionsTypes> =>
            async (dispatch) => {
                try {
                    const response = await instance.post<IUserResponse>('auth/login', {
                        email,
                        password
                    })

                    dispatch(setUser(response.data.user))
                    localStorage.setItem('token', response.data.token)
                    console.log(response.data)
                }
                catch (e:any){
                    alert(e)
                }
            },

    auth: (): ThunkAction<Promise<void>, RootState, unknown, ActionsTypes> =>
        async (dispatch) => {
            try {
                const response = await instance.get<IUserResponse>('auth/auth', {
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                })

                dispatch(setUser(response.data.user))
                localStorage.setItem('token', response.data.token)
                console.log(response.data)
            }
            catch (e){
                alert(e);
                localStorage.removeItem('token')
            }
        }
}

export const filesAPI = {
    getFile: (dirId: string): ThunkAction<Promise<void>, RootState, unknown, ActionsTypes> =>
        async (dispatch) => {
            try {
                const response = await instance.get<IFile[]>(
                    `files${(dirId ? '?parent=' + dirId : '')}`,
                    { headers: {Authorization: `Bearer ${localStorage.getItem('token')}` }})

                dispatch(setFilesAction(response.data))
            }
            catch (e) {
                alert(e)
            }
        }
}