import React, {FC, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux";
import {useTypedSelector} from "../../hooks/useTypedDispatch";
import { filesAPI } from "../../api/api";
import './Disc.css'
import FileList from "./FileList/FileList";
import Popup from "./Popup";
import {setPopupDisplay} from "../../redux/reducers/fileReducer/action_creators";
import {PopupDisplayEnum} from "../../redux/reducers/fileReducer/types";

const Disk:FC = ()  => {
    const dispatch = useDispatch<AppDispatch>()
    const { currentDir } = useTypedSelector(state => state.files)

    useEffect(() => {
        dispatch(filesAPI.getFile(currentDir))
    } , [currentDir])

    function showPopup() {
        dispatch(setPopupDisplay(PopupDisplayEnum.SHOW))
    }

    return (
        <div className='disk'>
            <div className="disk__btns">
                <button className="disk__back">Назад</button>
                <button className="disk__create" onClick={() => showPopup()} >Создать папку</button>
            </div>
            <FileList/>
            <Popup/>
        </div>
    );
};


export default Disk;