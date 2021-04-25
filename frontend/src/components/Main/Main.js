import React from 'react';
import './Main.css';
import Murm from '../Murm/Murm';
import { murms, testUser } from '../../data/data';

function Main() {
	return (
		<main className="main">
			<section className="profile">
				<div className="profile__avatar-container" /*onClick={onEditAvatar}*/>
					<img
						className="profile__avatar"
						src="https://sun9-20.userapi.com/impf/6fMvMYimCizkrkuu3J2kxmhSNFBG527eDdpxtw/5_W3AOyaePo.jpg?size=960x651&quality=96&proxy=1&sign=60ccc3506cd000b53c36cfa635035129&c_uniq_tag=Rt_H9HOb4LdM66_3x4uLEo40O4LL3zUyMzqdxDo_hnw&type=album"
						alt="аватар"
					/>
				</div>
				<div className="profile__info">
					<h2 className="profile__title">тайный кот</h2>

					<p className="profile__subtitle">@spy</p>
				</div>
				<button
					className="profile__edit-button"
					type="button"
					/*onClick={onEditProfile}*/
				>
					редактировать
				</button>

				<button className="profile__add-button" type="button" /*onClick={onAddPlace} */>
					мурмнуть
				</button>
			</section>

			<section className="murms">
				<ul className="murms__list">
					{murms.map((item, i) => {
						return <Murm murm={item} key={i} user={testUser} />;
					})}
				</ul>
			</section>
		</main>
	);
}

export default Main;
