import PopupWithForm from '../PopupWithForm/PopupWithForm';
import React from 'react';
import { useState } from 'react';
import { useFormWithValidation } from '../../utils/Validation/Validation'


function AddMurmPopupForm({ isOpened, onClose }) {
	// const [ text, setText ] = useState('');

	// function handleText(e) {
	// 	setText(e.target.value);
	// }

	// function handleSubmit(e) {
	// 	e.preventDefault();
	// 	console.log('SUBMIT');
	// }

	const { value, handleChange, errors, isValid } = useFormWithValidation({});

	const onSubmit = (e) => {
		e.preventDefault();
		if (isValid) {
			console.log('Success');
		}
	}

	return (
		<PopupWithForm
			onSubmit={onSubmit}
			button="Создать"
			name="add-murm"
			title="Замурмить мурм"
			isOpened={isOpened}
			onClose={onClose}
		>
			<input
				onChange={handleChange}
				placeholder="Введите текст"
				id="edit-input"
				name="murm"
				className="popup__input-item "
				type="text"
				required
				minLength="2"
				maxLength="75"
			/>
			<span className="input-error">{errors && errors['murm'] !== '' && errors['murm']}</span>
		</PopupWithForm>
	);
}

export default AddMurmPopupForm;
