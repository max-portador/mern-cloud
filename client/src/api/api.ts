import axios from "axios";
import { IResponse, IUserResponse} from "./types";
import { ActionsTypes, RootState } from "../redux";
import { ThunkAction } from "redux-thunk";
import { setUser } from "../redux/reducers/userReducer/action_creator";
import {addFile, deleteFile, setFiles} from "../redux/reducers/fileReducer/action_creators";
import {IFile} from "../redux/reducers/fileReducer/types";
import File from "../components/Disk/FileList/File/File";
import file from "../components/Disk/FileList/File/File";
import {addUploaderFile, changeUploaderFile, showUploader} from "../redux/reducers/uploadReducer/action-creators";

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

                const uploadFile = {name: file.name, progress: 0, _id: Date.now().toString()}
                dispatch(showUploader())
                dispatch(addUploaderFile(uploadFile))

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

                            if (totalLength) {
                                uploadFile.progress = Math.round((event.loaded * 100) / totalLength)
                                dispatch(changeUploaderFile(uploadFile))
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

    deleteFile: (file: IFile): ThunkAction<Promise<void>, RootState, unknown, ActionsTypes> =>
        async (dispatch) => {
            try {

                const response = await instance.delete<IResponse>(`files/delete?id=${file._id}`,
                    {
                        headers: {Authorization: `Bearer ${localStorage.getItem('token')}` },
                    },

                )
                dispatch(deleteFile(file))
               alert(response.data.message)
            }
            catch (e: any) {
                alert(e.response.data.message)
            }
        },

    downloadFile: async (file: IFile): Promise<void>  => {
        const response = await fetch(`http://localhost:5555/api/files/download?id=${file._id}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}` }
        })

        if (response.status === 200) {
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = file.name;
            document.body.append(link);
            link.click();
            link.remove();
        }
    }
}