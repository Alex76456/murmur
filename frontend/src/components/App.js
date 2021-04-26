import React from 'react';
import './App.css';
import Header from './Header/Header';
import Main from './Main/Main';
import { useState } from 'react';
import RegistrationPopupForm from './RegistrationPopupForm/RegistrationPopupForm';
import LoginPopupForm from './LoginPopupForm/LoginPopupForm';
import EditPopupForm from './EditPopupForm/EditPopupForm';
import AddMurmPopupForm from './AddMurmPopupForm/AddMurmPopupForm';
import AvatarPopupForm from './AvatarPopupForm/AvatarPopupForm';
import ConfirmDeletePopup from './ConfirmDeletePopup/ConfirmDeletePopup';

function App() {
	const [ isRegisterOpened, setIsRegisterOpened ] = useState(false);
	const [ isLoginOpened, setIsLoginOpened ] = useState(false);
	const [ isEditOpened, setIsEditOpened ] = useState(false);
	const [ isAddOpened, setIsAddOpened ] = useState(false);
	const [ isAvatarOpened, setIsAvatarOpened ] = useState(false);
	const [ isConfirmOpened, setIsConfirmOpened ] = useState(false);

	function handleRegisterClick() {
		setIsRegisterOpened(true);
	}
	function handleLoginClick() {
		setIsLoginOpened(true);
	}
	function handleEditClick() {
		setIsEditOpened(true);
	}
	function handleAddClick() {
		setIsAddOpened(true);
	}
	function handleAvatarClick() {
		setIsAvatarOpened(true);
	}
	function handleConfirmClick() {
		setIsConfirmOpened(true);
	}

	function closeAllPopups() {
		setIsRegisterOpened(false);
		setIsLoginOpened(false);
		setIsEditOpened(false);
		setIsAddOpened(false);
		setIsAvatarOpened(false);
		setIsConfirmOpened(false);
	}
	return (
		<div className="root">
			<div className="page">
				<Header registrationClick={handleRegisterClick} loginClick={handleLoginClick} />
				<Main
					editClick={handleEditClick}
					addClick={handleAddClick}
					avatarClick={handleAvatarClick}
					confirmClick={handleConfirmClick}
				/>
				<RegistrationPopupForm isOpened={isRegisterOpened} onClose={closeAllPopups} />
				<LoginPopupForm isOpened={isLoginOpened} onClose={closeAllPopups} />
				<EditPopupForm isOpened={isEditOpened} onClose={closeAllPopups} />
				<AddMurmPopupForm isOpened={isAddOpened} onClose={closeAllPopups} />
				<AvatarPopupForm isOpened={isAvatarOpened} onClose={closeAllPopups} />
				<ConfirmDeletePopup isOpened={isConfirmOpened} onClose={closeAllPopups} />
			</div>{' '}
		</div>
	);
}

export default App;
