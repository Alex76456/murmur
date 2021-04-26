import React from 'react';
import './App.css';
import Header from './Header/Header';
import Main from './Main/Main';
import RegistrationPopupForm from './RegistrationPopupForm/RegistrationPopupForm'
import LoginPopupForm from './LoginPopupForm/LoginPopupForm';

function App() {
	const [isRegisterOpened, setIsRegisterOpened] = React.useState(false);
	const [isLoginOpened, setIsLoginOpened] = React.useState('');


	function handleRegisterClick() {
		setIsRegisterOpened(true);
	}
	function handleLoginClick() {
		setIsLoginOpened(true);
	}

	function closeAllPopups() {
		setIsRegisterOpened(false);
		setIsLoginOpened(false);
	}
	return (
		<div className="page">
			<Header
				registrationClick={handleRegisterClick}
				loginClick={handleLoginClick}
			/>
			<Main />
			<RegistrationPopupForm isOpened={isRegisterOpened} onClose={closeAllPopups} />
			<LoginPopupForm isOpened={isLoginOpened} onClose={closeAllPopups} />
		</div>

	);
}

export default App;
