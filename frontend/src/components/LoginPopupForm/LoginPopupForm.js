import PopupWithForm from '../PopupWithForm/PopupWithForm';
import React from 'react';
import { useFormWithValidation } from '../../utils/Validation/Validation';

function LoginPopupForm({ isOpened, onClose, handleLogin, onEscClose }) {
	const { values, handleChange, errors, isValid } = useFormWithValidation({});

	const onSubmit = (e) => {
		e.preventDefault();
		if (isValid) {
			console.log(values);
			handleLogin(values);
		}
	};

	return (
		<PopupWithForm
			onSubmit={onSubmit}
			button="Войти"
			name="login"
			title="Авторизация"
			isOpened={isOpened}
			onClose={onClose}
			onEscClose={onEscClose}
		>
			<input
				onChange={handleChange}
				placeholder="Почта"
				id="login-email-input"
				name="email"
				className="popup__input-item popup__input-item_el_email"
				type="email"
				required
				minLength="2"
				maxLength="40"
			/>
			<span className="input-error">
				{errors && errors['email'] !== '' && errors['email']}
			</span>
			<input
				onChange={handleChange}
				placeholder="Пароль"
				id="login-password-input"
				name="password"
				className="popup__input-item popup__input-item_el_password"
				type="password"
				required
				minLength="2"
				maxLength="40"
			/>
			<span className="input-error">
				{errors && errors['password'] !== '' && errors['password']}
			</span>
		</PopupWithForm>
	);
}

export default LoginPopupForm;
