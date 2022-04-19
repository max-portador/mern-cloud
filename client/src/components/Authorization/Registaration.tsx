import React, {FC, useState} from 'react';
import './Authorization.css'
import Input from "../../utils/Input/Input";
import { userAPI } from '../../api/api';


const Registaration: FC = () => {
    const [email, SetEmail] = useState<string>("")
    const [password, SetPassword] = useState<string>("")

    return (
        <div className='authorization'>
            <div className="authorization__header">Регистрация</div>
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
                onClick={() => { userAPI.registration(email, password) }}
            >
                Зарегистрироваться
            </button>
        </div>
    );
};

export default Registaration;