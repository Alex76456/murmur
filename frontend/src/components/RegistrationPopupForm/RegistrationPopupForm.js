import PopupWithForm from '../PopupWithForm/PopupWithForm';
import React from 'react';
import { useFormWithValidation } from '../../utils/validation';

function RegistrationPopupForm({ isOpened, onClose, handleRegister, onEscClose }) {
	const { values, handleChange, errors, isValid,resetForm } = useFormWithValidation({});

	const onSubmit = (e) => {
		e.preventDefault();
		if (isValid) {
			handleRegister(values);
			resetForm();
		}
		resetForm();
	};

	return (
		<PopupWithForm
			onSubmit={onSubmit}
			button="Зарегистрироваться"
			name="registration"
			title="Регистрация"
			isOpened={isOpened}
			onClose={onClose}
			onEscClose={onEscClose}
		>
			<input
				onChange={handleChange}
				placeholder="Почта"
				id="registration-email-input"
				name="email"
				className="popup__input-item popup__input-item_el_email"
				type="email"
				required
				minLength="2"
				maxLength="40"
				pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
			/>
			<span className="input-error">
				{errors && errors['email'] !== '' && errors['email']}
			</span>
			<input
				onChange={handleChange}
				placeholder="Имя"
				id="input-name"
				name="name"
				className="popup__input-item popup__input-item_el_name"
				type="text"
				required
				minLength="2"
				maxLength="40"
			/>
			<span className="input-error">{errors && errors['name'] !== '' && errors['name']}</span>
			<input
				onChange={handleChange}
				placeholder="@Линк"
				id="input-login"
				name="link"
				className="popup__input-item popup__input-item_el_link"
				type="text"
				required
				minLength="2"
				maxLength="15"
				pattern="^@[-a-zA-Z0-9]{1,15}"
			/>
			<span className="input-error">{errors && errors['link'] !== '' && errors['link']}</span>
			<input
				onChange={handleChange}
				placeholder="Пароль"
				id="registration-password-input"
				name="password"
				className="popup__input-item popup__input-item_el_password"
				type="password"
				required
				minLength="8"
				maxLength="16"
			/>
			<span className="input-error">
				{errors && errors['password'] !== '' && errors['password']}
			</span>
		</PopupWithForm>
	);
}

export default RegistrationPopupForm;
