import PopupWithForm from '../PopupWithForm/PopupWithForm';
import React from 'react';
import { useState } from 'react';

function AvatarPopupForm({ isOpened, onClose }) {
	const [ avatar, setAvatar ] = useState('');

	function handleAvatar(e) {
		setAvatar(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		console.log('SUBMIT');
	}
	return (
		<PopupWithForm
			onSubmit={handleSubmit}
			button="Сохранить"
			name="avatar"
			title="Обновить аватар"
			isOpened={isOpened}
			onClose={onClose}
		>
			<input
				value={avatar}
				onChange={handleAvatar}
				placeholder="Введите ссылку"
				id="avatar-input"
				name="profileAvatarInput"
				className="popup__input-item"
				type="text"
				required
				minLength="2"
				maxLength="40"
			/>
			<span id="avatar-input-error" className="error" />
		</PopupWithForm>
	);
}

export default AvatarPopupForm;
