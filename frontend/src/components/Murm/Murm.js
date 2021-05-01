import React from 'react';
import './Murm.css';
import { useState } from 'react';

function Murm({ murm, user, confirmClick, onMurmLike, onCommentSubmit }) {
	const [ isOpenedCommints, setIsOpenedCommints ] = useState(false);
	const [ commentInput, setCommentInput ] = useState('');

	const isOwn = murm.owner === user._id;
	const isLiked = murm.likes.some((i) => i === user._id);

	const murmDeleteButtonClassName = `murms__delete-button ${isOwn
		? 'murms__delete-button_visible'
		: 'murms__delete-button_hidden'}`;

	const murmLikeButtonClassName = `murms__caption-like ${isLiked
		? 'murms__caption-like_color_black'
		: 'murms__caption-like_color_white'}`;
	

	function handleCommentClick() {
		setIsOpenedCommints(!isOpenedCommints);
	}

	function handleCommentInputChange(e) {
		setCommentInput(e.target.value);
	}

	function handleClick() {
		confirmClick(murm);
	}

	function handleLikeClick() {
		onMurmLike(murm, isLiked);
	}

	function handleSubmit(e) {
		e.preventDefault();
		onCommentSubmit(murm._id, commentInput);

	}

	return (
		<li className="murms__list-item">
			<button className={murmDeleteButtonClassName} onClick={handleClick} />
			<div className="murms__owner-container">
				<h3 className="murms__owner-name">{murm.name}</h3>
				<p className="murms__owner-link">{murm.link}</p>
			</div>
			<p className="murms__text">{murm.text}</p>

			<div className="murms__buttons-container">
				<div className="murms__button-container">
					<button
						className="murms__comment-button"
						type="button"
						onClick={handleCommentClick}
					/>
					<p className="murms__values-number">{murm.comments.length}</p>
				</div>
				{isOpenedCommints && (
					<div className="comments">
						<ul className="comments__list">
							{murm.comments.map((item, i) => {
								return (
									<li className="comments__list-item">
										<p className="comments__title" key={i}>
											{item.name}: {item.text}
										</p>
									</li>
								);
							})}
						</ul>
						<form className="comments__form" onSubmit={handleSubmit} noValidate>
							<label className="comments__form-field">
								<input
									className="comments__input"
									type="text"
									name="comments-input"
									placeholder="Напишите свой комментарий"
									required
									value={commentInput}
									onChange={handleCommentInputChange}
								/>
							</label>

							<button
								className="comments__submit"
								type="submit"
								disabled={commentInput !== '' ? false : true}
							>
								Отправить
							</button>
						</form>
					</div>
				)}

				<div className="murms__button-container">
					<button
						className={murmLikeButtonClassName}
						type="button"
						onClick={handleLikeClick}
					/>
					<p className="murms__values-number">{murm.likes.length}</p>
				</div>
			</div>
		</li>
	);
}

export default Murm;
