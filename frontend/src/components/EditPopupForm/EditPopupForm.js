import PopupWithForm from '../PopupWithForm/PopupWithForm';
import React from 'react';
import { useFormWithValidation } from '../../utils/validation';

function EditPopupForm({ isOpened, onClose, onUpdateUser, onEscClose }) {
	const { values, handleChange, errors, isValid } = useFormWithValidation({});

	const onSubmit = (e) => {
		e.preventDefault();
		if (isValid) {
			onUpdateUser(values);

		}
	};
	return (
		<PopupWithForm
			onSubmit={onSubmit}
			button="Сохранить"
			name="edit"
			title="Редактировать профиль"
			isOpened={isOpened}
			onClose={onClose}
			onEscClose={onEscClose}
		>
			<input
				onChange={handleChange}
				placeholder="Ваше имя"
				id="edit-input"
				name="name"
				className="popup__input-item "
				type="text"
				required
				minLength="2"
				maxLength="40"
			/>
			<span className="input-error">{errors && errors['name'] !== '' && errors['name']}</span>
			{/* <input
				onChange={handleChange}
				placeholder="@Линк"
				id="link-input"
				name="link"
				className="popup__input-item "
				type="text"
				minLength="8"
				maxLength="16"
			/>
			<span className="input-error">
				{errors && errors['link'] !== '' && errors['link']}
			</span> */}
		</PopupWithForm>
	);
}

export default EditPopupForm;
