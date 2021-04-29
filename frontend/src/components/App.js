import React from 'react';
import './App.css';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import { useState, useEffect } from 'react'; // <--  хуки лучше так импортировать, так проще понять, что используется чем всматриваться в текст
import RegistrationPopupForm from './RegistrationPopupForm/RegistrationPopupForm';
import LoginPopupForm from './LoginPopupForm/LoginPopupForm';
import EditPopupForm from './EditPopupForm/EditPopupForm';
import AddMurmPopupForm from './AddMurmPopupForm/AddMurmPopupForm';
import AvatarPopupForm from './AvatarPopupForm/AvatarPopupForm';
import ConfirmDeletePopup from './ConfirmDeletePopup/ConfirmDeletePopup';
import api from '../utils/api';

function App() {
	const [ currentUser, setCurrentUser ] = useState({});
	const [ murms, setMurms ] = useState([]);

	const [ isRegisterOpened, setIsRegisterOpened ] = useState(false);
	const [ isLoginOpened, setIsLoginOpened ] = useState(false);
	const [ isEditOpened, setIsEditOpened ] = useState(false);
	const [ isAddOpened, setIsAddOpened ] = useState(false);
	const [ isAvatarOpened, setIsAvatarOpened ] = useState(false);
	const [ isConfirmOpened, setIsConfirmOpened ] = useState(false);

	const [ murmToDelete, setMurmToDelete ] = useState({});

	useEffect(() => {
		Promise.all([ api.getUser(), api.getMurms() ])
			.then(([ userData, murmsData ]) => {
				setCurrentUser(userData);
				setMurms(murmsData);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	function handleMurmLike(murm, isLiked) {
		(!isLiked ? api.setLikeMurm(murm._id) : api.deleteLikeMurm(murm._id))
			.then((newMurm) => {
				const newMurms = murms.map((c) => (c._id === murm._id ? newMurm : c));
				setMurms(newMurms);
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				closeAllPopups();
			});
	}

	function handleMurmDelete(murm) {
		setIsConfirmOpened(true);
		setMurmToDelete(murm);
	}

	function handleMurmCardSubmit() {
		api
			.deleteMurm(murmToDelete._id)
			.then(() => {
				const newMurms = murms.filter((c) => c._id !== murmToDelete._id);
				setMurms(newMurms);
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				closeAllPopups();
				setMurmToDelete({});
			});
	}

	function handleAddMurmSubmit(inputsValues) {
		api
			.setNewMurm(inputsValues)
			.then((newMurm) => {
				setMurms([ newMurm, ...murms ]);
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				closeAllPopups();
			});
	}

	function handleUpdateUser(inputsValues) {
		api
			.setUser(inputsValues)
			.then((res) => {
				setCurrentUser(res);
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				closeAllPopups();
			});
	}

	function handleUpdateAvatar(newAvatar) {
		api
			.setUserAvatar(newAvatar)
			.then((res) => {
				setCurrentUser(res);
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				closeAllPopups();
			});
	}

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
					murms={murms}
					curUser={currentUser}
					editClick={handleEditClick}
					addClick={handleAddClick}
					avatarClick={handleAvatarClick}
					confirmClick={handleMurmDelete}
					onMurmLike={handleMurmLike}
				/>
				{/* {!loggedIn && <Footer />} */}
				<Footer />
				<RegistrationPopupForm isOpened={isRegisterOpened} onClose={closeAllPopups} />
				<LoginPopupForm isOpened={isLoginOpened} onClose={closeAllPopups} />
				<EditPopupForm
					isOpened={isEditOpened}
					onClose={closeAllPopups}
					onUpdateUser={handleUpdateUser}
				/>
				<AddMurmPopupForm
					isOpened={isAddOpened}
					onClose={closeAllPopups}
					onAddMurm={handleAddMurmSubmit}
				/>
				<AvatarPopupForm
					isOpened={isAvatarOpened}
					onClose={closeAllPopups}
					onUpdateAvatar={handleUpdateAvatar}
				/>
				<ConfirmDeletePopup
					isOpened={isConfirmOpened}
					onClose={closeAllPopups}
					onDeleteCard={handleMurmCardSubmit}
				/>
			</div>
		</div>
	);
}

export default App;
