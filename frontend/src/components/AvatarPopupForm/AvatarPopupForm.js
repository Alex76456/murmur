import PopupWithForm from '../PopupWithForm/PopupWithForm';
import React from 'react';
import { useFormWithValidation } from '../../utils/validation';

function AvatarPopupForm({ isOpened, onClose, onUpdateAvatar, onEscClose }) {
	// const [ avatar, setAvatar ] = useState('');

	// function handleAvatar(e) {
	// 	setAvatar(e.target.value);
	// }

	// function handleSubmit(e) {
	// 	e.preventDefault();
	// 	console.log('SUBMIT');
	// }

	const { values, handleChange, errors, isValid,resetForm } = useFormWithValidation({});

	const onSubmit = (e) => {
		e.preventDefault();
		if (isValid) {
			onUpdateAvatar(values);
			resetForm();
		}
		resetForm();
	};

	return (
		<PopupWithForm
			onSubmit={onSubmit}
			button="Сохранить"
			name="avatar"
			title="Обновить аватар"
			isOpened={isOpened}
			onClose={onClose}
			onEscClose={onEscClose}
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
			/>
			<span className="input-error">{errors && errors['link'] !== '' && errors['link']}</span>
		</PopupWithForm>
	);
}

export default AvatarPopupForm;
