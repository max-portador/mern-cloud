import React, {FC} from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {useTypedSelector} from "../../../hooks/useTypedDispatch";
import file from "./File/File";
import File from "./File/File";
import './FileList.css'
import {FileViesEnum} from "../../../redux/reducers/fileReducer/types";

const FileList:FC = () => {

    const { files, view } = useTypedSelector(state => state.files)
    const { isLoading } = useTypedSelector(state => state.app)

    if (!files.length) {
        return (<React.Fragment>
            <div className="loader">Файлы не найдены</div>
        </React.Fragment>)
    }

    if (view === FileViesEnum.LIST) {
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
    }


    return (
        <div className='fileplate'>
            {!isLoading &&  files.map( file =>
                <File key={file._id} file={file}/>
            )}
        </div>
    );
};

export default FileList;