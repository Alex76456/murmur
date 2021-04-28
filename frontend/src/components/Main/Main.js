import React from 'react';
import './Main.css';
import Murm from '../Murm/Murm';
import { murms, testUser } from '../../data/data';
import { useState } from 'react';

function Main({ editClick, addClick, avatarClick, confirmClick }) {
	const [ visibleMurms, setVisibleMurms ] = useState(3);

	function showMoreMurms() {
		setVisibleMurms(visibleMurms + 3);
	}

	return (
		<main className="main">
			<section className="profile">
				<div className="profile__avatar-container" onClick={avatarClick}>
					<img className="profile__avatar" src={testUser.avatar} alt="аватар" />
				</div>
				<div className="profile__info">
					<h2 className="profile__title">{testUser.name}</h2>

					<p className="profile__subtitle">{testUser.link}</p>
				</div>
				<button className="profile__edit-button" type="button" onClick={editClick}>
					редактировать
				</button>

				<button className="profile__add-button" type="button" onClick={addClick}>
					мурм
				</button>
			</section>

			<section className="murms">
				<ul className="murms__list">
					{murms.map((item, i) => {
						return (
							i < visibleMurms && (
								<Murm
									murm={item}
									key={i}
									user={testUser}
									confirmClick={confirmClick}
								/>
							)
						);
					})}
				</ul>
				{murms.length > visibleMurms && (
					<button className="murms__help-button" type="button" onClick={showMoreMurms}>
						показать еще...
					</button>
				)}
				{window.pageYOffset > 10 && (
					<button
						className="murms__help-button"
						type="button"
						onClick={() => {
							window.scrollTo({ top: 0, behavior: 'smooth' });
						}}
					>
						Вернуться
					</button>
				)}
			</section>
		</main>
	);
}

export default Main;
