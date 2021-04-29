import PopupWithForm from '../PopupWithForm/PopupWithForm';
import React from 'react';
import { useState } from 'react';
import { useFormWithValidation } from '../../utils/Validation/Validation';

function EditPopupForm({ isOpened, onClose, onUpdateUser }) {
	// const [ name, setName ] = useState('');
	// const [ link, setLink ] = useState('');

	// function handleName(e) {
	// 	setName(e.target.value);
	// }
	// function handleLink(e) {
	// 	setLink(e.target.value);
	// }
	// function handleSubmit(e) {
	// 	e.preventDefault();
	// 	console.log('SUBMIT');
	// }
	const { values, handleChange, errors, isValid } = useFormWithValidation({});

	const onSubmit = (e) => {
		e.preventDefault();
		if (isValid) {
			onUpdateUser(values);
			//console.log(values);
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
			<input
				onChange={handleChange}
				placeholder="Линк"
				id="link-input"
				name="link"
				className="popup__input-item "
				type="text"
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

export default EditPopupForm;
