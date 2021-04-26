import PopupWithForm from '../PopupWithForm/PopupWithForm';
import React from 'react';
import { useState } from 'react';

function EditPopupForm({ isOpened, onClose }) {
	const [ name, setName ] = useState('');
	const [ link, setLink ] = useState('');

	function handleName(e) {
		setName(e.target.value);
	}
	function handleLink(e) {
		setLink(e.target.value);
	}
	function handleSubmit(e) {
		e.preventDefault();
		console.log('SUBMIT');
	}
	return (
		<PopupWithForm
			onSubmit={handleSubmit}
			button="Сохранить"
			name="edit"
			title="Редактировать профиль"
			isOpened={isOpened}
			onClose={onClose}
		>
			<input
				value={name}
				onChange={handleName}
				placeholder="Ваше имя"
				id="edit-input"
				name="profileEmailInput"
				className="popup__input-item "
				type="text"
				required
				minLength="2"
				maxLength="40"
			/>
			<span id="name-input-error" className="error" />
			<input
				value={link}
				onChange={handleLink}
				placeholder="Линк"
				id="link-input"
				name="profilePasswordInput"
				className="popup__input-item "
				type="text"
				required
				minLength="2"
				maxLength="40"
			/>
			<span id="link-input-error" className="error" />
		</PopupWithForm>
	);
}

export default EditPopupForm;
