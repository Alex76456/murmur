import React from 'react';
import './Main.css';
import Murm from '../Murm/Murm';
//import { /*murms, curUser */} from '../../data/data';
import { useState } from 'react';

function Main({
	murms,
	editClick,
	addClick,
	avatarClick,
	confirmClick,
	onMurmLike,
	curUser,
	isloggedIn
}) {
	const [ visibleMurms, setVisibleMurms ] = useState(3);

	function showMoreMurms() {
		setVisibleMurms(visibleMurms + 3);
	}

	return (
		<main className="main">
			<section className="profile">
				<div className="profile__avatar-container" onClick={avatarClick}>
					<img className="profile__avatar" src={curUser.avatar} alt="аватар" />
				</div>
				<div className="profile__info">
					<h2 className="profile__title">{curUser.name}</h2>

					<p className="profile__subtitle">{curUser.link}</p>
				</div>
				{isloggedIn && (
					<button className="profile__edit-button" type="button" onClick={editClick}>
						редактировать
					</button>
				)}

				{isloggedIn && (
					<button className="profile__add-button" type="button" onClick={addClick}>
						мурм
					</button>
				)}
			</section>

			<section className="murms">
				<ul className="murms__list">
					{murms.map((item, i) => {
						return (
							i < visibleMurms && (
								<Murm
									murm={item}
									key={i}
									user={curUser}
									confirmClick={confirmClick}
									onMurmLike={onMurmLike}
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
