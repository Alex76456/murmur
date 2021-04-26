import PopupWithForm from '../PopupWithForm/PopupWithForm';
import React from 'react';

function ConfirmDeletePopup({ isOpened, onClose }) {
	function handleSubmit(e) {
		e.preventDefault();
		console.log('SUBMIT');
	}
	return (
		<PopupWithForm
			onSubmit={handleSubmit}
			button="Да"
			name="confirm"
			title="Удалить мурм?"
			isOpened={isOpened}
			onClose={onClose}
		/>
	);
}

export default ConfirmDeletePopup;
