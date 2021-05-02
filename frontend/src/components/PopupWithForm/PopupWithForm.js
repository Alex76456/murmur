import closeBtn from '../../images/close.svg';
import './PopupWithForm.css';
import { useEffect } from 'react';


function PopupWithForm({ name, title, isOpened, onClose, onEscClose, children, onSubmit, button }) {
	useEffect(
		() => {
			if (!isOpened) return;
			const handleEscapeClose = (event) => {
				if (event.key === 'Escape') {
					onClose();
				}
			};
			document.addEventListener('keydown', handleEscapeClose);
			return () => {
				document.removeEventListener('keydown', handleEscapeClose);
			};
		},
		[ isOpened, onClose ]
	);

	return (
		<section
			className={`popup popup_type_${name} ${isOpened && 'popup_opened'}`}
			onClick={onEscClose}
		>
			<form
				onSubmit={onSubmit}
				name={`${name}-popup`}
				className="popup__container"
				noValidate
			>
				<h3 className="popup__heading">{title}</h3>
				{children}
				<button className="popup__button popup__button_add" type="submit">
					{button}
				</button>
				<button
					className="popup__button popup__button_close"
					type="reset"
					onClick={onClose}
				>
					<img className="popup__close-image" src={closeBtn} alt="закрыть форму" />
				</button>
			</form>
		</section>
	);
}

export default PopupWithForm;
