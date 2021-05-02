import PopupWithForm from '../PopupWithForm/PopupWithForm';
import React from 'react';
import './AddMurmPopupForm.css';
import { useFormWithValidation } from '../../utils/validation';

function AddMurmPopupForm({ isOpened, onClose, onAddMurm, onEscClose }) {
	const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation({});

	const onSubmit = (e) => {
		e.preventDefault();
		if (isValid) {
			onAddMurm(values.murm);
			resetForm()
		}
		resetForm()
	};

	return (
		<PopupWithForm
			onSubmit={onSubmit}
			button="Создать"
			name="add-murm"
			title="Замурмить мурм"
			isOpened={isOpened}
			onClose={onClose}
			onEscClose={onEscClose}
		>
			<input
				onChange={handleChange}
				placeholder="Введите текст"
				id="add-input"
				name="murm"
				className="popup__input-item"
				type="text"
				required
				minLength="1"
				maxLength="75"
			/>
			<span className="input-error">{errors && errors['murm'] !== '' && errors['murm']}</span>
		</PopupWithForm>
	);
}

export default AddMurmPopupForm;
