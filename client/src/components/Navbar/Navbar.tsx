import React, {FC} from 'react';
import "./Navbar.css"

const Navbar: FC = () => {
    return (
        <div className='navbar'>
            <img src='' alt='' className='navbar__logo'/>
            <div className='navbar__header'>MERN CLOUD</div>
            <div className='navbar__login'></div>
            <div className='navbar__registration'></div>
        </div>
    );
};

export default Navbar;