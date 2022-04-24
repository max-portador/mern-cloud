import React, {ChangeEvent, FC} from 'react';
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux";
import {filesAPI} from "../../api/api";

const Profile:FC = () => {
    const dispatch = useDispatch<AppDispatch>()

    function changeHandler(e: ChangeEvent<HTMLInputElement>) {
        const files = e.target.files as FileList
        console.log(files[0])
        dispatch(filesAPI.uploadAvatar(files[0]))
    }

    return (
        <div>
            <button onClick={() => dispatch(filesAPI.deleteAvatar())} >Удалить аватар</button>
            <input accept='image/*' type="file" placeholder='Загрузить аватар' onChange={(e) => changeHandler(e)}/>
        </div>
    );
};

export default Profile;