import React, {Dispatch, FC, useState} from 'react';
import './Authorization.css'
import Input from "../../utils/Input/Input";
import {useDispatch} from "react-redux";
import { login } from '../../actions/user';


const Login: FC = () => {
    const [email, SetEmail] = useState<string>("")
    const [password, SetPassword] = useState<string>("")
    const dispatch = useDispatch<any>()

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
                onClick={() => dispatch(login(email, password))}
            >
                Зарегистрироваться
            </button>
        </div>
    );
};

export default Login;