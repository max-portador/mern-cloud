import React, {FC, useState} from 'react';
import Input from "../../utils/Input/Input";
import './Disc.css'
import {useTypedSelector} from "../../hooks/useTypedDispatch";
import {setPopupDisplay} from "../../redux/reducers/fileReducer/action_creators";
import {PopupDisplayEnum} from "../../redux/reducers/fileReducer/types";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux";
import {filesAPI} from "../../api/api";

const Popup: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const [dirname, SetDirName] = useState('')
    const { currentDir, popupDisplay } = useTypedSelector(state => state.files)

    function closePopup() {
        dispatch(setPopupDisplay(PopupDisplayEnum.HIDE))
    }

    async function createDieHandler() {
        await dispatch(filesAPI.createDir(currentDir, dirname))
        SetDirName('')
        closePopup()
    }

    return (
        <div className='popup' style={ {display: popupDisplay}}>
             <div className="popup__content" onClick={(event) => event.stopPropagation()}>
                 <div className="popup__header">
                     <div className="popup__title">Создать новую папку</div>
                     <button className="popup__close" onClick={() => closePopup()} >X</button>
                 </div>
                 <Input
                     type='text'
                     placeholder='Введите название папки...'
                     value={dirname}
                     setValue={SetDirName}
                 />
                 <button className="popup__create" onClick={() => createDieHandler()}>Создать</button>
             </div>
        </div>
    );
};

export default Popup;

