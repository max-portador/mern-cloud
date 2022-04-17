import axios, {AxiosResponse} from "axios";
import {IResponse} from "./types";

const instance = axios.create({
    baseURL: 'http://localhost:5000/api/',
})

export const registration = async (email: string, password: string): Promise<void> => {
    try {
        const response = await instance.post<IResponse>('auth/registration', {
            email,
            password
        })
        alert(response.data.message)
    }
    catch (e:any){
        alert(e.response.data.message)
    }
}