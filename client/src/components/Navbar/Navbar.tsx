import React, {FC} from 'react';
import {NavLink} from "react-router-dom";
import "./Navbar.css";
import Logo from '../../assets/navbar-logo.svg'
import {useTypedSelector} from "../../hooks/useTypedDispatch";
import {useDispatch} from "react-redux";
import {logout} from "../../store/reducers/userReducer/action_creator";

const Navbar: FC = () => {
    const { isAuth }  = useTypedSelector(state => state.user)
    const dispatch = useDispatch();
    return (
        <div className='navbar'>
            <div className='container'>
                <img src={Logo} alt='' className='navbar__logo'/>
               <div className='navbar__header'>MERN CLOUD</div>
                { !isAuth && <div className='navbar__login'>
                    <NavLink to='/login'>Войти</NavLink>
                </div> }
                { !isAuth && <div className='navbar__registration'>
                    <NavLink to='/registration'>Регистрация</NavLink>
                </div> }
                { isAuth && <div className='navbar__login'
                            onClick={() => dispatch(logout())}
                            >Выйти </div>  }
            </div>
        </div>
    );
};

export default Navbar;