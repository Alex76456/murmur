import React from 'react';
import './App.css';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import { useState } from 'react'; // <--  хуки лучше так импортировать, так проще понять, что используется чем всматриваться в текст
import RegistrationPopupForm from './RegistrationPopupForm/RegistrationPopupForm';
import LoginPopupForm from './LoginPopupForm/LoginPopupForm';
import EditPopupForm from './EditPopupForm/EditPopupForm';
import AddMurmPopupForm from './AddMurmPopupForm/AddMurmPopupForm';
import AvatarPopupForm from './AvatarPopupForm/AvatarPopupForm';
import ConfirmDeletePopup from './ConfirmDeletePopup/ConfirmDeletePopup';
import api from '../utils/api';
import { testUser /*murmsList */ } from '../data/data';
import * as auth from '../utils/auth';
function App() {
	const [ currentUser, setCurrentUser ] = useState({});
	const [ murms, setMurms ] = useState([]);
	const [ loggedIn, setLoggedIn ] = React.useState(null);
	const [ registerState, setRegisterState ] = React.useState(false);
	const [ userName, setUsername ] = React.useState('');

	const [ isRegisterOpened, setIsRegisterOpened ] = useState(false);
	const [ isLoginOpened, setIsLoginOpened ] = useState(false);
	const [ isEditOpened, setIsEditOpened ] = useState(false);
	const [ isAddOpened, setIsAddOpened ] = useState(false);
	const [ isAvatarOpened, setIsAvatarOpened ] = useState(false);
	const [ isConfirmOpened, setIsConfirmOpened ] = useState(false);

	const [ murmToDelete, setMurmToDelete ] = useState({});

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
			.setNewMurm(inputsValues, currentUser)
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

	function handleAddCommentSubmit(murmId, inputsValues) {
		api
			.setNewComment(murmId, inputsValues, currentUser)
			.then((newMurm) => {
				console.log(newMurm);

				const newMurms = murms.map((c) => (c._id === murmId ? newMurm : c));
				setMurms(newMurms);
			})
			.catch((err) => {
				console.error(err);
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

	function handleRegister(data) {
		auth
			.register(data)
			.then((res) => {
				console.log(res);
				if (res) {
					setRegisterState(false);
					closeAllPopups();
				} else {
					setRegisterState(true);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function handleLogin(data) {
		auth
			.authorize(data)
			.then((res) => {
				if (res.token) {
					console.log(data);
					localStorage.setItem('jwt', res.token);
					setLoggedIn(true);
					setUsername(data.email);
					setCurrentUser(data);
					closeAllPopups();
				} else {
					setLoggedIn(false);
					setRegisterState(false);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}
	function handleLogout() {
		localStorage.removeItem('jwt');
		setLoggedIn(false);
		setCurrentUser(testUser);
	}
	function handleTokenCheck(jwt) {
		auth.checkToken(jwt).then((res) => {
			setUsername(res.email);
			//console.log(res);
			setCurrentUser(res);

			if (res) {
				setLoggedIn(true);
			}
		});
	}

	React.useEffect(
		() => {
			if (loggedIn) {
				const jwt = localStorage.getItem('jwt');
				handleTokenCheck(jwt);
			}
		},
		[ loggedIn ]
	);

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

	React.useEffect(() => {
		const jwt = localStorage.getItem('jwt');
		api.getMurms().then((r) => {
			setMurms(r.reverse());
		});
		if (jwt) {
			handleTokenCheck(jwt);
		} else {
			setCurrentUser(testUser);
		}
		// eslint-disable-next-line
	}, []);

	return (
		<div className="root">
			<div className="page">
				<Header
					handleLogout={handleLogout}
					userName={userName}
					state={loggedIn}
					registerState={registerState}
					registrationClick={handleRegisterClick}
					loginClick={handleLoginClick}
				/>
				<Main
					isloggedIn={loggedIn}
					murms={murms}
					curUser={currentUser}
					editClick={handleEditClick}
					addClick={handleAddClick}
					avatarClick={handleAvatarClick}
					confirmClick={handleMurmDelete}
					onMurmLike={handleMurmLike}
					onCommentSubmit={handleAddCommentSubmit}
				/>
				{/* {!loggedIn && <Footer />} */}
				<Footer />
				<RegistrationPopupForm
					handleRegister={handleRegister}
					isOpened={isRegisterOpened}
					onClose={closeAllPopups}
				/>
				<LoginPopupForm
					handleLogin={handleLogin}
					isOpened={isLoginOpened}
					onClose={closeAllPopups}
				/>
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
