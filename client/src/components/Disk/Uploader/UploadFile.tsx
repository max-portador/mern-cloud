import React, {FC} from 'react';
import './Uploader.css'
import {IUploadFile} from "../../../redux/reducers/uploadReducer/types";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../redux";
import {removeUploaderFile} from "../../../redux/reducers/uploadReducer/action-creators";

type PropsType = {
    file: IUploadFile
}

const UploadFile: FC<PropsType> = ({file}) => {
    const dispatch = useDispatch<AppDispatch>()

    return (
        <div className='upload-file'>
            <header className="upload-file__header">
                <div className="upload-file__name">{file.name}</div>
                <button
                    className="upload-file__remove"
                    onClick={() => dispatch(removeUploaderFile(`${file._id}`))}
                >X</button>
            </header>
            <div className="upload-file__progress-bar">
                <div className="upload-file__upload-bar" style={ {width: file.progress + '%'} }/>
                <div className="upload-file__percent">{file.progress}</div>
            </div>
        </div>
    );
};

export default UploadFile;