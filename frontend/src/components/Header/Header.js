import React from 'react';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import './Header.css';
import SearchForm from '../SearchForm/SearchForm';

function Header(props) {
    const [loggedIn,setLoggedIn] = React.useState(null);
    const [userName, setUserName] = React.useState('');

    function logOut(){
        localStorage.removeItem('jwt');
        setLoggedIn(false);
    }
    return (
        <>
            <header className="header">
                <div className="header__container_logo"> 
                <img src={logo} alt="Логотип 'Murmur' " className="header__logo" />
                <span className="header__title">Murmur</span>
                </div>
                <SearchForm />
                <div className="header__container_nav">
                {loggedIn && (<div className='header__nav'>
                <span className='header__username'>{userName}</span>
                    <Link className='header__link' to="/" onClick={logOut}>Выйти</Link>
                </div>)}
               <button className='header__link' onClick={props.loginClick} >Войти</button>
                <button className='header__link' onClick={props.registrationClick} >Зарегистрироваться</button>
                </div>
            </header>
        </>
    )
}
export default Header;