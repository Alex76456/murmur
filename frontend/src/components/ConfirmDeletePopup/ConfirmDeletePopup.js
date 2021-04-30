import PopupWithForm from '../PopupWithForm/PopupWithForm';
import React from 'react';

function ConfirmDeletePopup({ isOpened, onClose, onDeleteCard, onEscClose }) {
	function handleSubmit(e) {
		e.preventDefault();
		onDeleteCard();
	}
	return (
		<PopupWithForm
			onSubmit={handleSubmit}
			button="Да"
			name="confirm"
			title="Удалить мурм?"
			isOpened={isOpened}
			onClose={onClose}
			onEscClose={onEscClose}
		/>
	);
}

export default ConfirmDeletePopup;
