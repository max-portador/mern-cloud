import React, {FC} from 'react';
import {IFile} from "../../../../redux/reducers/fileReducer/types";
import './File.css';
import dirLogo from '../../../../assets/img/dir.svg'
import fileLogo from '../../../../assets/img/file.svg'
import {useTypedSelector} from "../../../../hooks/useTypedDispatch";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../../redux";
import { pushToStack, setCurrentDir} from "../../../../redux/reducers/fileReducer/action_creators";
import {filesAPI} from "../../../../api/api";

type PropsType = {
    file: IFile;
}

const File: FC<PropsType> = ({file}) => {
    const dispatch = useDispatch<AppDispatch>()
    const { currentDir } = useTypedSelector(state => state.files)

    function openDirHandler(file: IFile):void {
        if (file.type === 'dir') {
            dispatch(pushToStack(currentDir as string))
            dispatch(setCurrentDir(file._id))
        }
    }

    function downloadHandler(event: React.MouseEvent<HTMLButtonElement>) {
        event.stopPropagation();
        filesAPI.downloadFile(file)
    }

    function deleteHandler(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation()
        dispatch( filesAPI.deleteFile(file) )
    }

    return (
        <div className='file' onClick={ () => openDirHandler(file) } >
            <img src={file.type === 'dir' ? dirLogo : fileLogo} alt='' className='file__img'/>
            <div className="file__name">{file.name}</div>
            <div className="file__date">{file.date.slice(0, 10)}</div>
            <div className="file__size">{file.size}</div>
            {file.type !== 'dir' &&
                <button className="file__btn file__download"
                        onClick={(e) => downloadHandler(e)}
                >Скачать</button>}
            <button className="file__btn file__delete"
                    onClick={(e) => deleteHandler(e)}
            >Удалить</button>
        </div>
    );
};

export default File;