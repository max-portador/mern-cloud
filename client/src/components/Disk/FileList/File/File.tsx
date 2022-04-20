import React, {FC} from 'react';
import {IFile} from "../../../../redux/reducers/fileReducer/types";
import './File.css';
import dirLogo from '../../../../assets/img/dir.svg'
import fileLogo from '../../../../assets/img/file.svg'
import {useTypedSelector} from "../../../../hooks/useTypedDispatch";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../../redux";
import {pushToStack, setCurrentDir} from "../../../../redux/reducers/fileReducer/action_creators";

type PropsType = {
    file: IFile;
}

const File: FC<PropsType> = ({file}) => {
    const dispatch = useDispatch<AppDispatch>()
    const { currentDir } = useTypedSelector(state => state.files)

    function openDirHandler():void {
        dispatch(pushToStack(currentDir as string))
        dispatch(setCurrentDir(file._id))
    }

    return (
        <div className='file' onClick={file.type === 'dir' ? () => openDirHandler() : () => {}} >
            <img src={file.type === 'dir' ? dirLogo : fileLogo} alt='' className='file__img'/>
            <div className="file__name">{file.name}</div>
            <div className="file__date">{file.date.slice(0, 10)}</div>
            <div className="file__size">{file.size}</div>

        </div>
    );
};

export default File;