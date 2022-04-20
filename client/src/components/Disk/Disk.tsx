import React, {FC, useEffect} from 'react';
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

    return (
        <div className='disk'>
            <div className="disk__btns">
                <button className="disk__back" onClick={() => backClickHandler()} >Назад</button>
                <button className="disk__create" onClick={() => showPopup()} >Создать папку</button>
            </div>
            <FileList/>
            <Popup/>
        </div>
    );
};


export default Disk;