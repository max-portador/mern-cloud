import axios from "axios";
import { IResponse, IUserResponse} from "./types";
import { ActionsTypes, RootState } from "../redux";
import { ThunkAction } from "redux-thunk";
import { setUser } from "../redux/reducers/userReducer/action_creator";
import {addFile, setFiles} from "../redux/reducers/fileReducer/action_creators";
import {IFile} from "../redux/reducers/fileReducer/types";
import File from "../components/Disk/FileList/File/File";

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
    getFile: (dirId: string | null): ThunkAction<Promise<void>, RootState, unknown, ActionsTypes> =>
        async (dispatch) => {
            try {
                const response = await instance.get<IFile[]>(
                    `files${(dirId ? '?parent=' + dirId : '')}`,
                    { headers: {Authorization: `Bearer ${localStorage.getItem('token')}` }})

                dispatch(setFiles(response.data))
            }
            catch (e) {
                alert(e)
            }
        },

    createDir: (dirId: string | null, name: string): ThunkAction<Promise<void>, RootState, unknown, ActionsTypes> =>
        async (dispatch) => {
            try {
                const response = await instance.post<IFile>(`files`,
                    {
                        name,
                        parent: dirId,
                        type: 'dir'
                    },
                    { headers: {Authorization: `Bearer ${localStorage.getItem('token')}` }}
                )

                dispatch(addFile(response.data))
            }
            catch (e) {
                alert(e)
            }
        },

    uploadFile: (file: File, dirId: string | null): ThunkAction<Promise<void>, RootState, unknown, ActionsTypes> =>
        async (dispatch) => {
            try {
                const formData = new FormData();
                formData.append('file', file)

                if (dirId) {
                    formData.append('parent', dirId)
                }

                const response = await instance.post<IFile>(`files/upload`,
                    formData,
                    {
                        headers: {Authorization: `Bearer ${localStorage.getItem('token')}` },
                        onUploadProgress: (event: ProgressEvent<XMLHttpRequest>) => {
                            let totalLength;
                            const target = event.target as XMLHttpRequest
                            if (event.lengthComputable){
                                totalLength = event.total
                            }
                            else {
                                let contentLength = target.getResponseHeader('content-length')
                                let decompressedContentLength = target.getResponseHeader('x-decompressed-content-length')
                                totalLength = Number(contentLength || decompressedContentLength);
                            }

                            console.log('total', totalLength);
                            if (totalLength) {
                                let progress = Math.round((event.loaded * 100) / totalLength)
                                console.log(progress)
                            }
                        }
                    },

                )
                console.log(response.data)
                dispatch(addFile(response.data))
            }
            catch (e) {
                alert(e)
            }
        },
}