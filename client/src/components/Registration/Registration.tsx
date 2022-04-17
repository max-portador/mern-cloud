import React, {FC, useState} from 'react';
import './Registration.css'
import Input from "../../utils/Input/Input";
import { registration } from '../../actions/user';


const Registration: FC = () => {
    const [email, SetEmail] = useState<string>("")
    const [password, SetPassword] = useState<string>("")

    return (
        <div className='registration'>
            <div className="registration__header">Регистрация</div>
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
                className="registration__btn"
                onClick={() => { registration(email, password) }}
            >
                Войти
            </button>
        </div>
    );
};

export default Registration;