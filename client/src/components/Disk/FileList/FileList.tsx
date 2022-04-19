import React, {FC} from 'react';
import './FileList.css'
import {useTypedSelector} from "../../../hooks/useTypedDispatch";
import file from "./File/File";
import File from "./File/File";

const FileList:FC = () => {

    const files = useTypedSelector(state => state.files).files
        .map( file =>  <File key={file._id} file={file}/>)

    return (
        <div className='filelist'>
            <div className="filelist__header">
                <div className="filelist__name">Название</div>
                <div className="filelist__date">Дата</div>
                <div className="filelist__size">Размер</div>
            </div>
            {files}
        </div>
    );
};

export default FileList;