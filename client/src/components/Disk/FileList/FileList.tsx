import React, {FC} from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {useTypedSelector} from "../../../hooks/useTypedDispatch";
import file from "./File/File";
import File from "./File/File";
import './FileList.css'

const FileList:FC = () => {

    const files = useTypedSelector(state => state.files).files
    const { isLoading } = useTypedSelector(state => state.app)

    if (!files.length) {
        return (<React.Fragment>
            <div className="loader">Файлы не найдены</div>
        </React.Fragment>)
    }


    return (
        <div className='filelist'>
            <div className="filelist__header">
                <div className="filelist__name">Название</div>
                <div className="filelist__date">Дата</div>
                <div className="filelist__size">Размер</div>
            </div>
            <TransitionGroup>
            {!isLoading &&  files.map( file =>
                <CSSTransition
                    key={file._id}
                    timeout={5000}
                    classNames={'file'}
                    exit={false}
                >
                <File file={file}/>
                </CSSTransition>
            )}


            </TransitionGroup>
        </div>
    );
};

export default FileList;