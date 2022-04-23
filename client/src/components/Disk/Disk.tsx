import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux";
import {useTypedSelector} from "../../hooks/useTypedDispatch";
import {filesAPI} from "../../api/api";
import './Disc.css'
import FileList from "./FileList/FileList";
import Popup from "./Popup";
import {setCurrentDir, setPopupDisplay, setView} from "../../redux/reducers/fileReducer/action_creators";
import {FileViesEnum, PopupDisplayEnum} from "../../redux/reducers/fileReducer/types";
import Uploader from "./Uploader/Uploader";

const Disk:FC = ()  => {
    const dispatch = useDispatch<AppDispatch>()
    const { currentDir, dirStack } = useTypedSelector(state => state.files);
    const { isLoading } = useTypedSelector(state => state.app);
    const [dragEnter, setDragEnter] = useState(false);
    const [sort, setSort] = useState('type');

    useEffect(() => { dispatch(filesAPI.getFile(currentDir, sort)) } , [currentDir, sort])

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
    function dragEnterHandler(event: React.DragEvent<HTMLDivElement>): void{
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
    }
    function dragLeaveHandler(event: React.DragEvent<HTMLDivElement>){
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)
    }
    function dropHandler(event: React.DragEvent<HTMLDivElement>){
        event.preventDefault()
        event.stopPropagation()
        const files = event.dataTransfer.files
        for (let i = 0; i < files.length; i++) {
            let file = files.item(i) as File;
            dispatch(filesAPI.uploadFile(file, currentDir))
        }

        setDragEnter(false)
    }

    if (isLoading) {
        return ( <React.Fragment>
                <div className="loader">
                    <div className="lds-dual-ring"/>
                </div>
            </React.Fragment>
        )
    }


    return ( !dragEnter
            ?
        <div className='disk'
             onDragEnter={dragEnterHandler}
             onDragLeave={dragLeaveHandler}
             onDragOver={dragEnterHandler}
        >
            <div className="disk__btns">
                <div className="disk__left">
                    <button className="disk__back" onClick={() => backClickHandler()} >Назад</button>
                    <button className="disk__create" onClick={() => showPopup()} >Создать папку</button>
                    <div className="disk__upload">
                        <label htmlFor="disk__upload-input" className="disk__upload-label">Загрузить файл</label>
                        <input multiple={true} onChange={(event) => { fileUploadHandler(event) }}
                               type="file"
                               id='disk__upload-input'
                               className="disk__upload-input"/>
                    </div>
                </div>
                <div className="disk__right">
                    <select
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setSort(e.target.value)}
                        value={sort}
                        className="disk__select">
                        <option value="name">По имени</option>
                        <option value="type">По типу</option>
                        <option value="date">По дате</option>
                    </select>
                    <button className="disk__plate" onClick={() => dispatch(setView(FileViesEnum.PLATE))}/>
                    <button className="disk__list" onClick={() => dispatch(setView(FileViesEnum.LIST))}/>
                </div>
            </div>
            <FileList/>
            <Popup/>
            <Uploader/>
        </div>
            :
        <div className='drop-area'
             onDragEnter={dragEnterHandler}
             onDragLeave={dragLeaveHandler}
             onDragOver={dragEnterHandler}
             onDrop={dropHandler}
        >
            Перетащите файлы сюда
        </div>
    );
};


export default Disk;