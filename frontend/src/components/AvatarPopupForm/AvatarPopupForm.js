import PopupWithForm from '../PopupWithForm/PopupWithForm';
import React from 'react';
import { useState } from 'react';
import { useFormWithValidation } from '../../utils/Validation/Validation';

function AvatarPopupForm({ isOpened, onClose, onUpdateAvatar }) {
	// const [ avatar, setAvatar ] = useState('');

	// function handleAvatar(e) {
	// 	setAvatar(e.target.value);
	// }

	// function handleSubmit(e) {
	// 	e.preventDefault();
	// 	console.log('SUBMIT');
	// }

	const { values, handleChange, errors, isValid } = useFormWithValidation({});

	const onSubmit = (e) => {
		e.preventDefault();
		if (isValid) {
			onUpdateAvatar(values);
		}
	};

	return (
		<PopupWithForm
			onSubmit={onSubmit}
			button="Сохранить"
			name="avatar"
			title="Обновить аватар"
			isOpened={isOpened}
			onClose={onClose}
		>
			<input
				onChange={handleChange}
				placeholder="Введите ссылку"
				id="avatar-input"
				name="avatar"
				className="popup__input-item"
				type="url"
				required
				minLength="2"
				maxLength="40"
			/>
			<span className="input-error">{errors && errors['link'] !== '' && errors['link']}</span>
		</PopupWithForm>
	);
}

export default AvatarPopupForm;
