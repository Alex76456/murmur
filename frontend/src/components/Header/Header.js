import React from 'react';
import logo from '../../images/logo.svg';
import './Header.css';
import SearchForm from '../SearchForm/SearchForm';


function Header(props) {
    const [loggedIn,setLoggedIn] = React.useState(null);
    const [userName, setUserName] = React.useState('');

    function logOut(){
        localStorage.removeItem('jwt');
        setLoggedIn(false);
        setUserName('');
    }
    return (
        <>
            <header className="header">
                <div className="header__container_logo"> 
                <img src={logo} alt="Логотип 'Murmur' " className="header__logo" />
                <span className="header__title">Murmur</span>
                </div>
                <SearchForm handleSetCurrentUser={props.handleSetCurrentUser} handleSetMurms={props.handleSetMurms} setUserName ={setUserName} />
                <div className="header__container_nav">
                {props.state && (<div className='header__nav'>
                <span className='header__username'>{props.userName}</span>
                    <button className='header__link' to="/" onClick={props.handleLogout}>Выйти</button>
                </div>)}
                {loggedIn && (<div className='header__nav'>
                <span className='header__username'>{userName}</span>
                    <button className='header__link' to="/" onClick={logOut}>Выйти</button>
                </div>)}
                {!props.state && (<button className='header__link' onClick={props.loginClick} >Войти</button>)}
                {!props.state && (<button className='header__link' onClick={props.registrationClick} >Зарегистрироваться</button>)}
                </div>
            </header>
        </>
    )
}
export default Header;