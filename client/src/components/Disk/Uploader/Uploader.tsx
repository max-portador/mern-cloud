import React, {FC} from 'react';
import UploadFile from "./UploadFile";
import {useTypedSelector} from "../../../hooks/useTypedDispatch";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../redux";
import {hideUploader} from "../../../redux/reducers/uploadReducer/action-creators";
import './Uploader.css'

const Uploader: FC = () => {
    const { files, isVisible } = useTypedSelector(state => state.uploader);
    const dispatch = useDispatch<AppDispatch>()

    return ( <>
        {isVisible &&
            <div className='uploader'>
                <header className="uploader__header">
                    <div className="uploader__title">Загрузки</div>
                    <button className="uploader__close"
                            onClick={() => dispatch(hideUploader())}
                    >X</button>
                </header>
                {files.map( file => <UploadFile file={file} key={file._id}/>)}
            </div>}
        </>
            );
    };

            export default Uploader;