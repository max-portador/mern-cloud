import React, {FC, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux";
import {useTypedSelector} from "../../hooks/useTypedDispatch";
import {filesAPI} from "../../api/api";
import './Disc.css'
import FileList from "./FileList/FileList";

const Disk:FC = ()  => {
    const dispatch = useDispatch<AppDispatch>()
    const { currentDir } = useTypedSelector(state => state.files)

    useEffect(() => {
        dispatch(filesAPI.getFile(currentDir))
    } , [currentDir])

    return (
        <div className='disk'>
            <div className="disk__btns">
                <button className="disk__back">Назад</button>
                <button className="disk__create">Создать папку</button>
            </div>
            <FileList/>
        </div>
    );
};


export default Disk;