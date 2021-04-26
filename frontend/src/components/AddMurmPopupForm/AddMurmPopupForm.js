import PopupWithForm from '../PopupWithForm/PopupWithForm';
import React from 'react';
import { useState } from 'react';

function AddMurmPopupForm({ isOpened, onClose }) {
	const [ text, setText ] = useState('');

	function handleText(e) {
		setText(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		console.log('SUBMIT');
	}
	return (
		<PopupWithForm
			onSubmit={handleSubmit}
			button="Создать"
			name="add-murm"
			title="Замурмить мурм"
			isOpened={isOpened}
			onClose={onClose}
		>
			<input
				value={text}
				onChange={handleText}
				placeholder="Введите текст"
				id="edit-input"
				name="profileMurmInput"
				className="popup__input-item "
				type="text"
				required
				minLength="2"
				maxLength="40"
			/>
			<span id="add-input-error" className="error" />
		</PopupWithForm>
	);
}

export default AddMurmPopupForm;
