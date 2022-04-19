import React, { FC, useState } from 'react';
import { userAPI } from '../../api/api';
import Input from "../../utils/Input/Input";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux";
import './Authorization.css'


const Login: FC = () => {
    const [email, SetEmail] = useState<string>("")
    const [password, SetPassword] = useState<string>("")
    const dispatch = useDispatch<AppDispatch>()

    return (
        <div className='authorization'>
            <div className="authorization__header">Авторизация</div>
            <Input
                type='text'
                value={email}
                setValue={SetEmail}
                placeholder='Введите email...'/>
            <Input
                type='password'
                value={password}
                setValue={SetPassword}
                placeholder='Введите пароль...'/>
            <button
                className="authorization__btn"
                onClick={() => dispatch(userAPI.login(email, password))}
            >
                Войти
            </button>
        </div>
    );
};

export default Login;