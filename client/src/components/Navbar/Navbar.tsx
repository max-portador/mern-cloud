import React, {FC, useState} from 'react';
import {NavLink} from "react-router-dom";
import Logo from '../../assets/navbar-logo.svg'
import {useTypedSelector} from "../../hooks/useTypedDispatch";
import {useDispatch} from "react-redux";
import {logout} from "../../redux/reducers/userReducer/action_creator";
import {filesAPI} from "../../api/api";
import {AppDispatch} from "../../redux";
import "./Navbar.css";

const Navbar: FC = () => {
    const { isAuth }  = useTypedSelector(state => state.user)
    const { currentDir }  = useTypedSelector(state => state.files)
    const [searchName, setSearchName] = useState<string>('')
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | boolean>(false)
    const dispatch = useDispatch<AppDispatch>();

    function searchHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const searchName = e.target.value
        setSearchName(searchName)
        if (searchTimeout != false){
            clearTimeout(searchTimeout as NodeJS.Timeout)

        }
        if (searchName.trim() !== ''){
            setTimeout((value: string) => {
                dispatch(filesAPI.search(value))
            }, 500, searchName)
        }
        else {
            dispatch(filesAPI.getFile(currentDir, ''))
        }

    }

    return (
        <div className='navbar'>
            <div className='container'>
                <img src={Logo} alt='' className='navbar__logo'/>
               <div className='navbar__header'>MERN CLOUD</div>
                {isAuth && <input
                    type="text"
                    value={searchName}
                    onChange={(e) => searchHandler(e)}
                    className='navbar__search'
                    placeholder='Название файла' />}
                { !isAuth &&
                    <div className='navbar__login'><NavLink to='/login'>Войти</NavLink></div> }
                { !isAuth &&
                    <div className='navbar__registration'><NavLink to='/registration'>Регистрация</NavLink></div> }
                { isAuth &&
                    <div className='navbar__login' onClick={() => dispatch(logout())}>Выйти </div>
                }
            </div>
        </div>
    );
};

export default Navbar;