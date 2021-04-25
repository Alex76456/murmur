import React from 'react';
import './Murm.css';

function Murm({ murm, user }) {
	const isOwn = murm.owner === user._id;
	const isLiked = murm.likes.some((i) => i === user._id);

	const cardDeleteButtonClassName = `murms__delete-button ${isOwn
		? 'murms__delete-button_visible'
		: 'murms__delete-button_hidden'}`;

	const cardLikeButtonClassName = `murms__caption-like ${isLiked
		? 'murms__caption-like_color_black'
		: 'murms__caption-like_color_white'}`;

	/*const user = React.useContext(CurrentUserContext);

	function handleClick() {
		onCardClick(card);
	}

	function handleLikeClick() {
		onCardLike(card, isLiked);
	}

	function handleDeleteClick() {
		onCardDelete(card);
	}
*/
	return (
		<li className="murms__list-item">
			<button className={cardDeleteButtonClassName} /* onClick={handleDeleteClick} */ />
			<div className="murms__owner-container">
				<h3 className="murms__owner-name">{murm.name}</h3>
				<p className="murms__owner-link">{murm.link}</p>
			</div>
			<p className="murms__text">{murm.text}</p>
			<div className="murms__like-container">
				<button
					className={cardLikeButtonClassName}
					type="button"
					/*onClick={handleLikeClick}*/
				/>
				<p className="murms__likes-number">{murm.likes.length}</p>
			</div>
		</li>
	);
}

export default Murm;
