import React, {ChangeEvent, FC, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux";
import {useTypedSelector} from "../../hooks/useTypedDispatch";
import { filesAPI } from "../../api/api";
import './Disc.css'
import FileList from "./FileList/FileList";
import Popup from "./Popup";
import {setCurrentDir, setPopupDisplay} from "../../redux/reducers/fileReducer/action_creators";
import {PopupDisplayEnum} from "../../redux/reducers/fileReducer/types";

const Disk:FC = ()  => {
    const dispatch = useDispatch<AppDispatch>()
    const { currentDir, dirStack } = useTypedSelector(state => state.files)

    useEffect(() => {
        dispatch(filesAPI.getFile(currentDir))
    } , [currentDir])

    function showPopup() {
        dispatch(setPopupDisplay(PopupDisplayEnum.SHOW))
    }
    
    function backClickHandler() {
        const backDirId = dirStack.pop()
        dispatch(setCurrentDir(backDirId as string))
    }

    function fileUploadHandler(event: ChangeEvent<HTMLInputElement>) {
        const files = event.target.files as FileList
        for (let i = 0; i < files.length; i++) {
            let file = files.item(i) as File;
            dispatch(filesAPI.uploadFile(file, currentDir))
        }
    }

    return (
        <div className='disk'>
            <div className="disk__btns">
                <button className="disk__back" onClick={() => backClickHandler()} >Назад</button>
                <button className="disk__create" onClick={() => showPopup()} >Создать папку</button>
                <div className="disk__upload">
                    <label htmlFor="disk__upload-input" className="disk__upload-label">Загрузить файл</label>
                    <input multiple={true} onChange={(event) => { fileUploadHandler(event) }} type="file" id='disk__upload-input' className="disk__upload-input"/>
                </div>
            </div>
            <FileList/>
            <Popup/>
        </div>
    );
};


export default Disk;